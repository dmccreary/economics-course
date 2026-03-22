// Platform Economics Simulator MicroSim
// Two-sided platform market simulator showing network effects
// MicroSim template version 2026.03

let canvasWidth = 400;
let drawHeight = 480;
let controlHeight = 130;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 140;

// Controls
let subsidyASlider, subsidyBSlider;
let feeASlider, feeBSlider;
let launchButton, presetSelect;

// Simulation state
let running = false;
let tick = 0;
let maxTicks = 200;

// Platform metrics
let sideA = 5;  // buyers/riders/users
let sideB = 5;  // sellers/drivers/creators
let matches = 0;
let revenue = 0;
let totalRevenue = 0;
let criticalMass = 30;
let platformFailed = false;
let platformSucceeded = false;
let history = [];

// Particles for visualization
let buyerParticles = [];
let sellerParticles = [];
let matchLines = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  let cy = drawHeight + 8;

  presetSelect = createSelect();
  presetSelect.position(10, cy);
  presetSelect.option('Custom');
  presetSelect.option('Uber Model');
  presetSelect.option('Amazon Model');
  presetSelect.option('Facebook Model');
  presetSelect.selected('Custom');
  presetSelect.style('font-size', '12px');
  presetSelect.changed(applyPreset);

  launchButton = createButton('Launch Platform');
  launchButton.position(canvasWidth - 130, cy);
  launchButton.mousePressed(launchPlatform);
  launchButton.style('font-size', '12px');

  subsidyASlider = createSlider(0, 10, 2, 1);
  subsidyASlider.position(sliderLeftMargin, cy + 28);
  subsidyASlider.size(canvasWidth / 2 - sliderLeftMargin - 10);

  subsidyBSlider = createSlider(0, 10, 2, 1);
  subsidyBSlider.position(canvasWidth / 2 + sliderLeftMargin - 40, cy + 28);
  subsidyBSlider.size(canvasWidth / 2 - sliderLeftMargin + 20);

  feeASlider = createSlider(0, 10, 1, 1);
  feeASlider.position(sliderLeftMargin, cy + 55);
  feeASlider.size(canvasWidth / 2 - sliderLeftMargin - 10);

  feeBSlider = createSlider(0, 10, 1, 1);
  feeBSlider.position(canvasWidth / 2 + sliderLeftMargin - 40, cy + 55);
  feeBSlider.size(canvasWidth / 2 - sliderLeftMargin + 20);

  initParticles();

  describe('Platform economics simulator showing two-sided market dynamics and network effects', LABEL);
}

function applyPreset() {
  let p = presetSelect.value();
  if (p === 'Uber Model') {
    subsidyASlider.value(1);
    subsidyBSlider.value(8);
    feeASlider.value(2);
    feeBSlider.value(3);
  } else if (p === 'Amazon Model') {
    subsidyASlider.value(5);
    subsidyBSlider.value(5);
    feeASlider.value(0);
    feeBSlider.value(5);
  } else if (p === 'Facebook Model') {
    subsidyASlider.value(7);
    subsidyBSlider.value(7);
    feeASlider.value(0);
    feeBSlider.value(0);
  }
}

function launchPlatform() {
  running = true;
  tick = 0;
  sideA = 5;
  sideB = 5;
  matches = 0;
  revenue = 0;
  totalRevenue = 0;
  platformFailed = false;
  platformSucceeded = false;
  history = [];
  initParticles();
}

function initParticles() {
  buyerParticles = [];
  sellerParticles = [];
  matchLines = [];
  for (let i = 0; i < 5; i++) {
    buyerParticles.push({ x: random(margin + 20, canvasWidth / 3 - 20), y: random(100, drawHeight - 100) });
    sellerParticles.push({ x: random(canvasWidth * 2 / 3 + 20, canvasWidth - margin - 20), y: random(100, drawHeight - 100) });
  }
}

function draw() {
  // Backgrounds
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(18);
  text('Platform Economics Simulator', canvasWidth / 2, 8);

  // Simulation step
  if (running && !platformFailed && !platformSucceeded && frameCount % 3 === 0) {
    simulateStep();
  }

  // Draw platform visualization
  drawPlatformViz();

  // Draw metrics
  drawMetrics();

  // Draw history chart
  if (history.length > 1) {
    drawHistory();
  }

  // Status message
  if (platformFailed) {
    noStroke();
    fill('crimson');
    textAlign(CENTER, CENTER);
    textSize(16);
    text('Platform Failed - Not enough users on both sides!', canvasWidth / 2, drawHeight - 35);
    textSize(11);
    text('Try increasing subsidies or reducing fees. Click Launch to retry.', canvasWidth / 2, drawHeight - 15);
  } else if (platformSucceeded) {
    noStroke();
    fill('darkgreen');
    textAlign(CENTER, CENTER);
    textSize(16);
    text('Critical Mass Reached! Growth is self-sustaining!', canvasWidth / 2, drawHeight - 35);
    textSize(11);
    text('Network effects now drive growth. You can reduce subsidies.', canvasWidth / 2, drawHeight - 15);
  } else if (!running) {
    noStroke();
    fill('gray');
    textAlign(CENTER, CENTER);
    textSize(13);
    text('Set subsidies and fees, choose a strategy, then Launch!', canvasWidth / 2, drawHeight - 25);
  }

  // Control labels
  noStroke();
  fill('black');
  textSize(10);
  textAlign(LEFT, CENTER);
  let cy = drawHeight + 8;
  text('Subsidy Buyers: $' + subsidyASlider.value(), 10, cy + 38);
  text('Subsidy Sellers: $' + subsidyBSlider.value(), canvasWidth / 2 + 10, cy + 38);
  text('Fee Buyers: $' + feeASlider.value(), 10, cy + 65);
  text('Fee Sellers: $' + feeBSlider.value(), canvasWidth / 2 + 10, cy + 65);

  // Insight
  noStroke();
  fill('darkslategray');
  textSize(10);
  textAlign(CENTER, CENTER);
  let insight = getInsight();
  text(insight, canvasWidth / 2, drawHeight + controlHeight - 12);
}

function simulateStep() {
  tick++;

  let subA = subsidyASlider.value();
  let subB = subsidyBSlider.value();
  let feeA = feeASlider.value();
  let feeB = feeBSlider.value();

  // Network effect: more on other side attracts users
  let attractA = sideB * 0.15 + subA * 0.5 - feeA * 0.3;
  let attractB = sideA * 0.15 + subB * 0.5 - feeB * 0.3;

  // Growth with some randomness
  let growthA = attractA * 0.1 + random(-0.5, 0.5);
  let growthB = attractB * 0.1 + random(-0.5, 0.5);

  // Churn: users leave if other side is too small
  if (sideB < 3) growthA -= 1;
  if (sideA < 3) growthB -= 1;

  // After critical mass, organic growth kicks in
  if (sideA > criticalMass && sideB > criticalMass) {
    growthA += 1.5;
    growthB += 1.5;
    if (!platformSucceeded) platformSucceeded = true;
  }

  sideA = max(0, sideA + growthA);
  sideB = max(0, sideB + growthB);

  // Matches
  matches = min(sideA, sideB) * 0.6;
  revenue = matches * (feeA + feeB) - (sideA * subA + sideB * subB) * 0.1;
  totalRevenue += revenue;

  // Failure condition
  if (tick > 30 && (sideA < 2 || sideB < 2)) {
    platformFailed = true;
  }

  // Update particles
  updateParticles();

  // Record history
  if (tick % 3 === 0) {
    history.push({ a: sideA, b: sideB, m: matches, r: totalRevenue });
  }
}

function updateParticles() {
  let targetA = Math.round(min(sideA, 40));
  let targetB = Math.round(min(sideB, 40));

  while (buyerParticles.length < targetA) {
    buyerParticles.push({ x: random(margin + 20, canvasWidth / 3 - 20), y: random(100, drawHeight - 100) });
  }
  while (buyerParticles.length > targetA && buyerParticles.length > 0) {
    buyerParticles.pop();
  }
  while (sellerParticles.length < targetB) {
    sellerParticles.push({ x: random(canvasWidth * 2 / 3 + 20, canvasWidth - margin - 20), y: random(100, drawHeight - 100) });
  }
  while (sellerParticles.length > targetB && sellerParticles.length > 0) {
    sellerParticles.pop();
  }

  // Animate particles slightly
  for (let p of buyerParticles) {
    p.x += random(-1, 1);
    p.y += random(-1, 1);
    p.x = constrain(p.x, margin + 10, canvasWidth / 3 - 10);
    p.y = constrain(p.y, 90, drawHeight - 110);
  }
  for (let p of sellerParticles) {
    p.x += random(-1, 1);
    p.y += random(-1, 1);
    p.x = constrain(p.x, canvasWidth * 2 / 3 + 10, canvasWidth - margin - 10);
    p.y = constrain(p.y, 90, drawHeight - 110);
  }

  // Match lines
  matchLines = [];
  let numMatches = min(buyerParticles.length, sellerParticles.length, Math.round(matches));
  for (let i = 0; i < numMatches; i++) {
    if (i < buyerParticles.length && i < sellerParticles.length) {
      matchLines.push({ b: buyerParticles[i], s: sellerParticles[i] });
    }
  }
}

function drawPlatformViz() {
  let cx = canvasWidth / 2;
  let cy = 55;

  // Side labels
  noStroke();
  fill('dodgerblue');
  textSize(13);
  textAlign(CENTER, TOP);
  text('Buyers / Users', canvasWidth / 6, 35);
  fill('coral');
  text('Sellers / Creators', canvasWidth * 5 / 6, 35);

  // Platform center
  let platW = 80;
  let platH = drawHeight - 140;
  fill(240, 240, 255);
  stroke('slategray');
  strokeWeight(2);
  rect(cx - platW / 2, 55, platW, platH, 10);

  noStroke();
  fill('slategray');
  textSize(11);
  textAlign(CENTER, CENTER);
  text('PLATFORM', cx, 70);

  // Critical mass indicator
  let progressA = min(sideA / criticalMass, 1);
  let progressB = min(sideB / criticalMass, 1);

  // Bar for side A
  fill('lightgray');
  rect(cx - 30, 85, 25, 80, 3);
  fill('dodgerblue');
  let barH = progressA * 80;
  rect(cx - 30, 85 + 80 - barH, 25, barH, 3);

  // Bar for side B
  fill('lightgray');
  rect(cx + 5, 85, 25, 80, 3);
  fill('coral');
  barH = progressB * 80;
  rect(cx + 5, 85 + 80 - barH, 25, barH, 3);

  noStroke();
  fill('black');
  textSize(8);
  text('Critical', cx, 175);
  text('Mass', cx, 185);

  // Match lines
  for (let ml of matchLines) {
    stroke(100, 200, 100, 100);
    strokeWeight(1);
    line(ml.b.x, ml.b.y, ml.s.x, ml.s.y);
  }

  // Buyer particles
  for (let p of buyerParticles) {
    fill('dodgerblue');
    noStroke();
    circle(p.x, p.y, 10);
  }

  // Seller particles
  for (let p of sellerParticles) {
    fill('coral');
    noStroke();
    circle(p.x, p.y, 10);
  }
}

function drawMetrics() {
  let mx = canvasWidth / 2 - 35;
  let my = 200;

  noStroke();
  fill('black');
  textSize(9);
  textAlign(CENTER, TOP);

  text('A: ' + Math.round(sideA), mx + 12, my);
  text('B: ' + Math.round(sideB), mx + 47, my);
  text('Matches: ' + Math.round(matches), mx + 30, my + 14);
  text('Rev: $' + Math.round(totalRevenue), mx + 30, my + 28);
}

function drawHistory() {
  let chartX = canvasWidth / 2 - 35;
  let chartY = 250;
  let chartW = 70;
  let chartH = 70;

  // Chart background
  fill(255, 255, 255, 180);
  stroke('silver');
  strokeWeight(1);
  rect(chartX - 5, chartY - 5, chartW + 10, chartH + 15, 4);

  noStroke();
  fill('black');
  textSize(8);
  textAlign(CENTER, TOP);
  text('Growth Over Time', chartX + chartW / 2, chartY - 3);

  let maxVal = 1;
  for (let h of history) {
    maxVal = max(maxVal, h.a, h.b);
  }

  // Side A line
  stroke('dodgerblue');
  strokeWeight(1.5);
  noFill();
  beginShape();
  for (let i = 0; i < history.length; i++) {
    let x = map(i, 0, max(history.length - 1, 1), chartX, chartX + chartW);
    let y = map(history[i].a, 0, maxVal, chartY + chartH, chartY + 10);
    vertex(x, y);
  }
  endShape();

  // Side B line
  stroke('coral');
  beginShape();
  for (let i = 0; i < history.length; i++) {
    let x = map(i, 0, max(history.length - 1, 1), chartX, chartX + chartW);
    let y = map(history[i].b, 0, maxVal, chartY + chartH, chartY + 10);
    vertex(x, y);
  }
  endShape();
}

function getInsight() {
  if (!running) return 'You need both sides - the chicken-and-egg problem of platforms';
  if (platformFailed) return 'Without enough users on both sides, no matches happen and the platform dies';
  if (platformSucceeded) return 'Once you hit critical mass, growth becomes self-sustaining - platform power!';
  if (sideA > sideB * 2) return 'Too many buyers, not enough sellers - increase seller subsidies!';
  if (sideB > sideA * 2) return 'Too many sellers, not enough buyers - increase buyer subsidies!';
  return 'Subsidies can jumpstart growth, but you need both sides to match';
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);

  let cy = drawHeight + 8;
  launchButton.position(canvasWidth - 130, cy);
  subsidyASlider.position(sliderLeftMargin, cy + 28);
  subsidyASlider.size(canvasWidth / 2 - sliderLeftMargin - 10);
  subsidyBSlider.position(canvasWidth / 2 + sliderLeftMargin - 40, cy + 28);
  subsidyBSlider.size(canvasWidth / 2 - sliderLeftMargin + 20);
  feeASlider.position(sliderLeftMargin, cy + 55);
  feeASlider.size(canvasWidth / 2 - sliderLeftMargin - 10);
  feeBSlider.position(canvasWidth / 2 + sliderLeftMargin - 40, cy + 55);
  feeBSlider.size(canvasWidth / 2 - sliderLeftMargin + 20);

  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasHeight = drawHeight + controlHeight;
}
