// Cost Curves Visualizer MicroSim
// Shows MC, ATC, AVC, AFC curves with interactive quantity and price
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Cost parameters
let fixedCost = 100;
let quantity = 50;
let marketPrice = 15;

// Controls
let qtySlider, priceSlider;
let showMC = true, showATC = true, showAVC = true, showAFC = true;
let mcCheck, atcCheck, avcCheck, afcCheck;

// Graph area
let gLeft = 70, gTop = 50, gBottom, gRight;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  gBottom = drawHeight - 40;

  // Quantity slider
  qtySlider = createSlider(1, 100, quantity, 1);
  qtySlider.position(sliderLeftMargin, drawHeight + 5);
  qtySlider.size(canvasWidth - sliderLeftMargin - margin);

  // Price slider
  priceSlider = createSlider(5, 30, marketPrice, 1);
  priceSlider.position(sliderLeftMargin, drawHeight + 30);
  priceSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Curve toggle checkboxes
  mcCheck = createCheckbox('MC', true);
  mcCheck.position(10, drawHeight + 55);
  mcCheck.style('font-size', '12px');
  mcCheck.style('color', 'red');
  mcCheck.changed(() => showMC = mcCheck.checked());

  atcCheck = createCheckbox('ATC', true);
  atcCheck.position(70, drawHeight + 55);
  atcCheck.style('font-size', '12px');
  atcCheck.style('color', 'steelblue');
  atcCheck.changed(() => showATC = atcCheck.checked());

  avcCheck = createCheckbox('AVC', true);
  avcCheck.position(135, drawHeight + 55);
  avcCheck.style('font-size', '12px');
  avcCheck.style('color', 'green');
  avcCheck.changed(() => showAVC = avcCheck.checked());

  afcCheck = createCheckbox('AFC', true);
  afcCheck.position(200, drawHeight + 55);
  afcCheck.style('font-size', '12px');
  afcCheck.style('color', 'gray');
  afcCheck.changed(() => showAFC = afcCheck.checked());

  describe('Cost curves visualizer showing marginal cost, average total cost, average variable cost, and average fixed cost relationships', LABEL);
}

// Cost functions with diminishing returns
function getVC(q) {
  // Variable cost: starts efficient, then diminishing returns
  return 2 * q + 0.005 * q * q;
}

function getTC(q) {
  return fixedCost + getVC(q);
}

function getMC(q) {
  // Marginal cost: derivative of VC
  return 2 + 0.01 * q;
}

function getATC(q) {
  return q > 0 ? getTC(q) / q : 0;
}

function getAVC(q) {
  return q > 0 ? getVC(q) / q : 0;
}

function getAFC(q) {
  return q > 0 ? fixedCost / q : 0;
}

function draw() {
  updateCanvasSize();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  gRight = canvasWidth - 50;

  // Read sliders
  quantity = qtySlider.value();
  marketPrice = priceSlider.value();

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Cost Curves Visualizer', canvasWidth * 0.4, 8);

  // Draw axes
  stroke('black');
  strokeWeight(2);
  line(gLeft, gTop, gLeft, gBottom);
  line(gLeft, gBottom, gRight, gBottom);

  // Axis labels
  noStroke();
  fill('black');
  textSize(12);
  textAlign(CENTER, TOP);
  text('Quantity', (gLeft + gRight) / 2, gBottom + 3);

  push();
  translate(15, (gTop + gBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Cost per Unit ($)', 0, 0);
  pop();

  let gw = gRight - gLeft;
  let gh = gBottom - gTop;
  let maxQ = 100;
  let maxCost = 25;

  // Tick marks
  textSize(10);
  noStroke();
  fill('gray');
  for (let q = 0; q <= maxQ; q += 20) {
    let x = map(q, 0, maxQ, gLeft, gRight);
    textAlign(CENTER, TOP);
    text(q, x, gBottom + 2);
    stroke('lightgray');
    strokeWeight(0.5);
    line(x, gTop, x, gBottom);
    noStroke();
  }
  for (let c = 0; c <= maxCost; c += 5) {
    let y = map(c, 0, maxCost, gBottom, gTop);
    textAlign(RIGHT, CENTER);
    text('$' + c, gLeft - 5, y);
    stroke('lightgray');
    strokeWeight(0.5);
    line(gLeft, y, gRight, y);
    noStroke();
  }

  // Draw price line
  let priceY = map(marketPrice, 0, maxCost, gBottom, gTop);
  stroke('orange');
  strokeWeight(1);
  drawingContext.setLineDash([6, 4]);
  line(gLeft, priceY, gRight, priceY);
  drawingContext.setLineDash([]);
  noStroke();
  fill('orange');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('P=$' + marketPrice, gRight + 2, priceY);

  // Draw curves
  if (showAFC) drawCurve('gray', 1.5, (q) => getAFC(q), maxQ, maxCost);
  if (showAVC) drawCurve('green', 2, (q) => getAVC(q), maxQ, maxCost);
  if (showATC) drawCurve('steelblue', 2.5, (q) => getATC(q), maxQ, maxCost);
  if (showMC) drawCurve('red', 2.5, (q) => getMC(q), maxQ, maxCost);

  // Vertical line at current quantity
  let qX = map(quantity, 0, maxQ, gLeft, gRight);
  stroke('black');
  strokeWeight(1);
  drawingContext.setLineDash([3, 3]);
  line(qX, gTop, qX, gBottom);
  drawingContext.setLineDash([]);

  // Current values at quantity
  let curATC = getATC(quantity);
  let curAVC = getAVC(quantity);
  let curAFC = getAFC(quantity);
  let curMC = getMC(quantity);

  // Profit/loss shading
  if (showATC) {
    let atcY = map(curATC, 0, maxCost, gBottom, gTop);
    if (marketPrice > curATC) {
      // Profit region
      fill(0, 200, 0, 40);
      noStroke();
      rect(gLeft, priceY, qX - gLeft, atcY - priceY);
    } else if (marketPrice < curATC) {
      // Loss region
      fill(200, 0, 0, 40);
      noStroke();
      rect(gLeft, atcY, qX - gLeft, priceY - atcY);
    }
  }

  // Data panel
  let panelX = canvasWidth - 165;
  let panelY = gTop + 5;
  fill(255, 255, 255, 230);
  stroke('silver');
  strokeWeight(1);
  rect(panelX, panelY, 155, 120, 5);

  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  fill('black');
  text('At Q = ' + quantity, panelX + 8, panelY + 8);
  fill('red');
  text('MC: $' + nf(curMC, 1, 2), panelX + 8, panelY + 26);
  fill('steelblue');
  text('ATC: $' + nf(curATC, 1, 2), panelX + 8, panelY + 42);
  fill('green');
  text('AVC: $' + nf(curAVC, 1, 2), panelX + 8, panelY + 58);
  fill('gray');
  text('AFC: $' + nf(curAFC, 1, 2), panelX + 8, panelY + 74);

  // Profit/loss display
  let profitPerUnit = marketPrice - curATC;
  let totalProfit = profitPerUnit * quantity;
  fill(totalProfit >= 0 ? 'green' : 'red');
  textSize(11);
  text((totalProfit >= 0 ? 'Profit' : 'Loss') + ': $' + nf(abs(totalProfit), 1, 0), panelX + 8, panelY + 98);

  // Control labels
  noStroke();
  fill('black');
  textSize(defaultTextSize - 2);
  textAlign(LEFT, CENTER);
  text('Quantity: ' + quantity, 10, drawHeight + 15);
  text('Price: $' + marketPrice, 10, drawHeight + 40);
}

function drawCurve(col, weight, costFn, maxQ, maxCost) {
  stroke(col);
  strokeWeight(weight);
  noFill();
  beginShape();
  for (let q = 1; q <= maxQ; q++) {
    let c = costFn(q);
    if (c <= maxCost) {
      let x = map(q, 0, maxQ, gLeft, gRight);
      let y = map(c, 0, maxCost, gBottom, gTop);
      vertex(x, y);
    }
  }
  endShape();

  // Label at end
  let endC = costFn(maxQ);
  if (endC <= maxCost) {
    noStroke();
    fill(col);
    textSize(11);
    textAlign(LEFT, CENTER);
    let endY = map(endC, 0, maxCost, gBottom, gTop);
    // Don't draw label, we have the legend checkboxes
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  qtySlider.size(canvasWidth - sliderLeftMargin - margin);
  priceSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
