// Production Function Explorer MicroSim
// Visualize diminishing marginal returns by adding workers to a pizza shop

let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 55;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Production data: [workers, total output]
let baseOutput = [0, 0, 20, 45, 65, 80, 90, 96, 98];
let doubleOvenOutput = [0, 0, 30, 65, 95, 120, 138, 150, 156];

let numWorkers = 0;
let hasSecondOven = false;
let addBtn, removeBtn, ovenBtn, resetBtn;
let animProgress = 1;

let comments = [
  '',
  'Lots of space to work!',
  'Specialization helps!',
  'Good teamwork!',
  'Getting a bit crowded...',
  'Bumping into each other!',
  'Way too crowded!',
  'Can barely move!',
  'Too many cooks!'
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  addBtn = createButton('Add Worker');
  addBtn.mousePressed(() => { if (numWorkers < 8) { numWorkers++; animProgress = 0; } });

  removeBtn = createButton('Remove Worker');
  removeBtn.mousePressed(() => { if (numWorkers > 0) { numWorkers--; animProgress = 0; } });

  ovenBtn = createButton('Add Second Oven');
  ovenBtn.mousePressed(() => { hasSecondOven = !hasSecondOven; });

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => { numWorkers = 0; hasSecondOven = false; });

  positionControls();
  describe('Production function explorer showing diminishing marginal returns in a pizza shop', LABEL);
}

function positionControls() {
  let y = drawHeight + 12;
  let x = 10;
  addBtn.position(x, y); x += 110;
  removeBtn.position(x, y); x += 130;
  ovenBtn.position(x, y); x += 140;
  resetBtn.position(x, y);
}

function getOutput(w) {
  let data = hasSecondOven ? doubleOvenOutput : baseOutput;
  if (w >= 0 && w < data.length) return data[w];
  return data[data.length - 1];
}

function getMarginal(w) {
  if (w <= 0) return 0;
  return getOutput(w) - getOutput(w - 1);
}

function draw() {
  animProgress = min(1, animProgress + 0.05);

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(20);
  text('Production Function Explorer', canvasWidth / 2, 6);
  textSize(12);
  fill('gray');
  text('Pizza Shop - Diminishing Marginal Returns', canvasWidth / 2, 28);

  let totalOutput = getOutput(numWorkers);
  let mp = getMarginal(numWorkers);

  // Layout
  let shopW = min(280, canvasWidth * 0.4);
  let chartX = shopW + 30;
  let chartW = canvasWidth - chartX - 30;

  // --- Pizza Shop Scene ---
  let shopX = 15, shopY = 50;
  let shopH = 160;

  // Shop background
  fill(255, 248, 230);
  stroke('tan');
  strokeWeight(1);
  rect(shopX, shopY, shopW - 20, shopH, 5);

  // Oven(s)
  fill('firebrick');
  noStroke();
  rect(shopX + 10, shopY + 10, 50, 40, 3);
  noStroke();
  fill('white');
  textSize(10);
  textAlign(CENTER, CENTER);
  text('OVEN', shopX + 35, shopY + 30);

  if (hasSecondOven) {
    fill('firebrick');
    noStroke();
    rect(shopX + 70, shopY + 10, 50, 40, 3);
    fill('white');
    noStroke();
    textSize(10);
    text('OVEN 2', shopX + 95, shopY + 30);
  }

  // Workers
  for (let i = 0; i < numWorkers; i++) {
    let wx = shopX + 15 + (i % 4) * 55;
    let wy = shopY + 70 + floor(i / 4) * 50;
    let crowding = numWorkers > 4 ? map(numWorkers, 5, 8, 0, 1) : 0;
    let r = map(crowding, 0, 1, 100, 220);
    let g = map(crowding, 0, 1, 150, 100);
    fill(r, g, 80);
    noStroke();
    circle(wx, wy, 22);
    fill('white');
    textSize(9);
    noStroke();
    textAlign(CENTER, CENTER);
    text(i + 1, wx, wy);
  }

  // Speech bubble
  if (numWorkers > 0) {
    let bubbleX = shopX + shopW - 50;
    let bubbleY = shopY + shopH - 30;
    fill(255, 255, 255, 220);
    stroke('gray');
    strokeWeight(1);
    rect(bubbleX - 60, bubbleY - 12, 120, 22, 8);
    noStroke();
    fill('black');
    textSize(9);
    textAlign(CENTER, CENTER);
    text(comments[numWorkers], bubbleX, bubbleY);
  }

  // Stats below shop
  let statsY = shopY + shopH + 15;
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Workers: ' + numWorkers, shopX, statsY);
  text('Total Pizzas: ' + totalOutput, shopX, statsY + 20);
  fill(mp >= 15 ? 'green' : mp >= 5 ? 'darkorange' : 'red');
  text('Marginal Product: ' + (numWorkers > 0 ? '+' + mp : '--'), shopX, statsY + 40);

  if (hasSecondOven) {
    fill('firebrick');
    textSize(11);
    text('(With second oven)', shopX + 150, statsY);
  }

  // --- Charts ---
  let chartTop = 55;
  let chartBottom = drawHeight - 60;
  let chartRight = canvasWidth - 20;
  let maxOut = 160;

  // Chart axes
  stroke('black');
  strokeWeight(1);
  line(chartX, chartTop, chartX, chartBottom);
  line(chartX, chartBottom, chartRight, chartBottom);

  noStroke();
  fill('black');
  textSize(10);
  textAlign(CENTER, TOP);
  text('Workers', (chartX + chartRight) / 2, chartBottom + 3);

  push();
  translate(chartX - 15, (chartTop + chartBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  textSize(10);
  text('Output', 0, 0);
  pop();

  // Tick marks
  let data = hasSecondOven ? doubleOvenOutput : baseOutput;
  let barW = (chartRight - chartX - 10) / 9;

  // Grid
  for (let v = 0; v <= maxOut; v += 40) {
    let y = map(v, 0, maxOut, chartBottom, chartTop);
    stroke('lightgray');
    strokeWeight(0.5);
    line(chartX, y, chartRight, y);
    noStroke();
    fill('gray');
    textSize(9);
    textAlign(RIGHT, CENTER);
    text(v, chartX - 3, y);
  }

  // Total product line
  stroke('steelblue');
  strokeWeight(2);
  noFill();
  beginShape();
  for (let w = 0; w < data.length; w++) {
    let x = chartX + 5 + w * barW + barW / 2;
    let y = map(data[w], 0, maxOut, chartBottom, chartTop);
    vertex(x, y);
  }
  endShape();

  // Total product dots
  for (let w = 0; w < data.length; w++) {
    let x = chartX + 5 + w * barW + barW / 2;
    let y = map(data[w], 0, maxOut, chartBottom, chartTop);
    fill(w === numWorkers ? 'red' : 'steelblue');
    noStroke();
    circle(x, y, w === numWorkers ? 10 : 6);
  }

  // Marginal product bars
  for (let w = 1; w < data.length; w++) {
    let mpVal = data[w] - data[w - 1];
    let x = chartX + 5 + w * barW;
    let barH = map(mpVal, 0, 40, 0, 60);
    let barY = chartBottom + 25;
    let c = mpVal >= 15 ? 'green' : mpVal >= 5 ? 'darkorange' : 'red';
    fill(w === numWorkers ? c : color(200));
    noStroke();
    rect(x + 2, barY + 60 - barH, barW - 4, barH, 2);
  }

  // MP label
  noStroke();
  fill('black');
  textSize(10);
  textAlign(CENTER, TOP);
  text('Marginal Product', (chartX + chartRight) / 2, chartBottom + 88);

  // Worker labels on x-axis
  for (let w = 0; w < data.length; w++) {
    let x = chartX + 5 + w * barW + barW / 2;
    noStroke();
    fill('black');
    textSize(9);
    textAlign(CENTER, TOP);
    text(w, x, chartBottom + 2);
  }

  // Legend
  let legX = chartX + 5;
  let legY = chartTop - 5;
  noStroke();
  fill('steelblue');
  textSize(10);
  textAlign(LEFT, CENTER);
  circle(legX, legY, 6);
  fill('black');
  text('Total Output', legX + 8, legY);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasHeight = drawHeight + controlHeight;
}
