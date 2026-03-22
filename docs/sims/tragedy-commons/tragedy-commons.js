// Tragedy of the Commons Simulator MicroSim
// Multiple fishers harvesting a shared lake - shows individual vs collective incentive
// MicroSim template version 2026.03

let canvasWidth = 580;
let drawHeight = 440;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;
let sliderLeftMargin = 130;

// Simulation parameters
let fishPop = 1000;
let startPop = 1000;
let reproRate = 0.20;
let maxPop = 1500;
let year = 0;
let pricePerFish = 5;
let collapsed = false;

// Player fishing rate
let playerRate = 25;

// AI fisher behaviors
let aiBehaviors = ['Moderate', 'Moderate', 'Moderate'];
let aiRates = [25, 25, 25]; // fish/year each

// History
let popHistory = [];
let maxHistory = 50;

// Controls
let playerSlider, ai1Select, ai2Select, ai3Select;
let advance1Btn, run10Btn, resetBtn;

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  playerSlider = createSlider(0, 80, 25, 1);

  ai1Select = createSelect();
  ai2Select = createSelect();
  ai3Select = createSelect();
  for (let sel of [ai1Select, ai2Select, ai3Select]) {
    sel.option('Conservative');
    sel.option('Moderate');
    sel.option('Aggressive');
    sel.selected('Moderate');
  }
  ai1Select.changed(() => updateAI(0, ai1Select.value()));
  ai2Select.changed(() => updateAI(1, ai2Select.value()));
  ai3Select.changed(() => updateAI(2, ai3Select.value()));

  advance1Btn = createButton('Advance 1 Year');
  advance1Btn.mousePressed(() => advanceYear(1));

  run10Btn = createButton('Run 10 Years');
  run10Btn.mousePressed(() => advanceYear(10));

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(resetSim);

  popHistory.push(fishPop);
  positionControls();
  describe('Tragedy of the commons fishing simulation showing individual vs collective incentives', LABEL);
}

function updateAI(idx, behavior) {
  aiBehaviors[idx] = behavior;
  if (behavior === 'Conservative') aiRates[idx] = 15;
  else if (behavior === 'Moderate') aiRates[idx] = 30;
  else aiRates[idx] = 50;
}

function positionControls() {
  let y1 = drawHeight + 8;
  let y2 = drawHeight + 38;
  playerSlider.position(sliderLeftMargin, y1);
  playerSlider.size(120);
  advance1Btn.position(sliderLeftMargin + 140, y1);
  run10Btn.position(sliderLeftMargin + 270, y1);
  resetBtn.position(sliderLeftMargin + 370, y1);

  ai1Select.position(sliderLeftMargin, y2);
  ai2Select.position(sliderLeftMargin + 120, y2);
  ai3Select.position(sliderLeftMargin + 240, y2);
}

function advanceYear(n) {
  for (let i = 0; i < n; i++) {
    if (collapsed) break;

    playerRate = playerSlider.value();

    // Reproduction (logistic growth)
    let reproduction = reproRate * fishPop * (1 - fishPop / maxPop);
    reproduction = max(0, reproduction);

    // Total harvest
    let totalHarvest = playerRate + aiRates[0] + aiRates[1] + aiRates[2];
    // Can't catch more than exist
    totalHarvest = min(totalHarvest, fishPop);

    // Player's share of catch (proportional)
    let totalRequested = playerRate + aiRates[0] + aiRates[1] + aiRates[2];
    let playerCatch = totalRequested > 0 ? (playerRate / totalRequested) * totalHarvest : 0;

    fishPop = fishPop + reproduction - totalHarvest;
    fishPop = max(0, round(fishPop));

    // Collapse check
    if (fishPop < 50) {
      collapsed = true;
      fishPop = 0;
    }

    year++;
    popHistory.push(fishPop);
    if (popHistory.length > maxHistory) popHistory.shift();
  }
}

function resetSim() {
  fishPop = startPop;
  year = 0;
  collapsed = false;
  popHistory = [fishPop];
  playerSlider.value(25);
}

function draw() {
  playerRate = playerSlider.value();

  // Background
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill('black');
  textSize(18);
  textAlign(CENTER, TOP);
  text('Tragedy of the Commons: Fishing', canvasWidth / 2, 8);

  // Lake visualization (left side)
  let lakeX = margin + 10;
  let lakeY = 45;
  let lakeW = 200;
  let lakeH = 160;

  // Lake
  fill(100, 160, 220);
  noStroke();
  ellipse(lakeX + lakeW / 2, lakeY + lakeH / 2, lakeW, lakeH);

  // Fish (dots in lake)
  let fishToDraw = min(60, round(fishPop / 20));
  fill('gold');
  noStroke();
  for (let i = 0; i < fishToDraw; i++) {
    let angle = (i / fishToDraw) * TWO_PI + frameCount * 0.005;
    let r = random(15, lakeW * 0.35);
    // Use deterministic positions based on index
    let fx = lakeX + lakeW / 2 + cos(angle + i * 0.5) * (r * 0.8);
    let fy = lakeY + lakeH / 2 + sin(angle + i * 0.3) * (r * 0.5);
    ellipse(fx, fy, 6, 4);
  }

  // Fish count on lake
  fill('white');
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  text(fishPop + ' fish', lakeX + lakeW / 2, lakeY + lakeH / 2);

  if (collapsed) {
    fill('red');
    textSize(20);
    text('COLLAPSED!', lakeX + lakeW / 2, lakeY + lakeH / 2 + 25);
  }

  // Boats around lake
  let boatPositions = [
    { x: lakeX + 20, y: lakeY + lakeH + 10, label: 'You', rate: playerRate, color: 'steelblue' },
    { x: lakeX + 75, y: lakeY + lakeH + 10, label: 'AI 1', rate: aiRates[0], color: 'green' },
    { x: lakeX + 130, y: lakeY + lakeH + 10, label: 'AI 2', rate: aiRates[1], color: 'darkorange' },
    { x: lakeX + 185, y: lakeY + lakeH + 10, label: 'AI 3', rate: aiRates[2], color: 'purple' }
  ];

  for (let b of boatPositions) {
    fill(b.color);
    noStroke();
    // Simple boat shape
    beginShape();
    vertex(b.x, b.y + 12);
    vertex(b.x + 10, b.y + 20);
    vertex(b.x + 35, b.y + 20);
    vertex(b.x + 45, b.y + 12);
    endShape(CLOSE);

    fill('white');
    textSize(8);
    textAlign(CENTER, CENTER);
    text(b.label, b.x + 22, b.y + 15);

    fill(b.color);
    noStroke();
    textSize(9);
    textAlign(CENTER, TOP);
    text(b.rate + '/yr', b.x + 22, b.y + 24);
  }

  // Population history graph (right side)
  let graphX = lakeX + lakeW + 30;
  let graphY = 45;
  let graphW = canvasWidth - graphX - 15;
  let graphH = 160;

  // Graph background
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(graphX, graphY, graphW, graphH, 3);

  noStroke();
  fill('black');
  textSize(12);
  textAlign(CENTER, TOP);
  text('Fish Population Over Time', graphX + graphW / 2, graphY - 15);

  // Sustainability line
  let sustainY = map(maxPop / 2, 0, maxPop, graphY + graphH, graphY);
  stroke('green');
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(graphX, sustainY, graphX + graphW, sustainY);
  drawingContext.setLineDash([]);

  noStroke();
  fill('green');
  textSize(9);
  textAlign(RIGHT, BOTTOM);
  text('Sustainable', graphX + graphW - 3, sustainY - 2);

  // Danger line
  let dangerY = map(100, 0, maxPop, graphY + graphH, graphY);
  stroke('red');
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(graphX, dangerY, graphX + graphW, dangerY);
  drawingContext.setLineDash([]);

  noStroke();
  fill('red');
  textSize(9);
  textAlign(RIGHT, TOP);
  text('Danger', graphX + graphW - 3, dangerY + 2);

  // Population line
  if (popHistory.length > 1) {
    stroke('steelblue');
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < popHistory.length; i++) {
      let px = map(i, 0, max(popHistory.length - 1, 1), graphX + 5, graphX + graphW - 5);
      let py = map(popHistory[i], 0, maxPop, graphY + graphH - 5, graphY + 5);
      vertex(px, py);
    }
    endShape();
  }

  // Stats panel (below lake and graph)
  let statsY = lakeY + lakeH + 55;
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, TOP);
  text('Year: ' + year, margin + 10, statsY);

  let totalHarvest = playerRate + aiRates[0] + aiRates[1] + aiRates[2];
  let reproduction = round(reproRate * fishPop * (1 - fishPop / maxPop));
  let maxSustainable = round(reproRate * maxPop / 4); // max at half capacity

  textSize(12);
  let col1 = margin + 10;
  let col2 = margin + 180;
  let col3 = margin + 360;

  text('Reproduction: +' + max(0, reproduction) + ' fish/yr', col1, statsY + 22);
  text('Total Harvest: -' + totalHarvest + ' fish/yr', col2, statsY + 22);
  let netChange = reproduction - totalHarvest;
  fill(netChange >= 0 ? 'green' : 'red');
  text('Net Change: ' + (netChange >= 0 ? '+' : '') + netChange + ' fish/yr', col3, statsY + 22);

  fill('black');
  text('Max Sustainable Yield: ~' + maxSustainable + ' fish/yr', col1, statsY + 42);

  let playerCatchPct = totalHarvest > 0 ? playerRate / totalHarvest : 0;
  let actualPlayerCatch = round(playerCatchPct * min(totalHarvest, fishPop));
  text('Your Catch: ' + actualPlayerCatch + ' fish', col2, statsY + 42);
  text('Your Profit: $' + (actualPlayerCatch * pricePerFish), col3, statsY + 42);

  // Warning
  if (fishPop < 200 && fishPop > 0) {
    fill('red');
    textSize(13);
    textAlign(CENTER, TOP);
    text('\u26a0 WARNING: Fish population dangerously low!', canvasWidth / 2, statsY + 65);
  } else if (totalHarvest > reproduction && fishPop > 200) {
    fill('darkorange');
    textSize(12);
    textAlign(CENTER, TOP);
    text('Harvesting faster than reproduction \u2014 population declining', canvasWidth / 2, statsY + 65);
  } else if (fishPop > 0 && !collapsed) {
    fill('green');
    textSize(12);
    textAlign(CENTER, TOP);
    text('Sustainable harvesting \u2014 population stable or growing', canvasWidth / 2, statsY + 65);
  }

  // Key insight at bottom
  noStroke();
  fill('gray');
  textSize(11);
  textAlign(CENTER, TOP);
  let insightY = statsY + 85;
  text('Each fisher profits by catching more, but if everyone does, the resource collapses.', canvasWidth / 2, insightY);
  text('Individual rationality \u2260 collective rationality', canvasWidth / 2, insightY + 15);

  // Control labels
  noStroke();
  fill('black');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Your rate: ' + playerRate + '/yr', 10, drawHeight + 16);
  text('AI Behavior:', 10, drawHeight + 46);
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
