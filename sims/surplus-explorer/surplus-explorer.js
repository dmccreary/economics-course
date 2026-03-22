// Surplus Explorer MicroSim
// Visualize consumer and producer surplus on a supply/demand graph
// MicroSim template version 2026.03

let canvasWidth = 580;
let drawHeight = 450;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 60;
let defaultTextSize = 16;
let sliderLeftMargin = 120;

// Graph area
let graphLeft, graphRight, graphTop, graphBottom;

// Market parameters
let eqPrice = 15;
let eqQuantity = 50;
let maxPrice = 30;
let maxQuantity = 100;
let currentPrice;
let draggingPrice = false;

// Controls
let goEqBtn, resetBtn, showCSBox, showPSBox, showDWLBox;
let priceSlider;

// Supply: Qs = (100/30) * P → at P=15, Qs=50
function supplyQ(p) { return (100 / 30) * p; }
function supplyP(q) { return (30 / 100) * q; }

// Demand: Qd = 100 - (100/30)*P → at P=15, Qd=50
function demandQ(p) { return 100 - (100 / 30) * p; }
function demandP(q) { return (30 / 100) * (100 - q); }

function yFromPrice(p) { return map(p, 0, maxPrice, graphBottom, graphTop); }
function xFromQ(q) { return map(q, 0, maxQuantity, graphLeft, graphRight); }

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  currentPrice = eqPrice;

  priceSlider = createSlider(1, 29, eqPrice, 0.5);
  goEqBtn = createButton('Go to Equilibrium');
  goEqBtn.mousePressed(() => { priceSlider.value(eqPrice); });
  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => { priceSlider.value(eqPrice); });

  showCSBox = createCheckbox('Consumer Surplus', true);
  showPSBox = createCheckbox('Producer Surplus', true);
  showDWLBox = createCheckbox('Deadweight Loss', true);

  positionControls();
  describe('Consumer and producer surplus explorer with adjustable price line', LABEL);
}

function positionControls() {
  let y1 = drawHeight + 10;
  let y2 = drawHeight + 40;
  priceSlider.position(sliderLeftMargin, y1);
  priceSlider.size(canvasWidth - sliderLeftMargin - 320);
  goEqBtn.position(canvasWidth - 310, y1);
  resetBtn.position(canvasWidth - 180, y1);
  showCSBox.position(15, y2);
  showPSBox.position(175, y2);
  showDWLBox.position(335, y2);
}

function draw() {
  graphLeft = margin;
  graphRight = canvasWidth - 180;
  graphTop = margin;
  graphBottom = drawHeight - margin;

  currentPrice = priceSlider.value();

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
  text('Consumer & Producer Surplus Explorer', canvasWidth / 2, 10);

  // Axes
  stroke('black');
  strokeWeight(2);
  line(graphLeft, graphTop, graphLeft, graphBottom);
  line(graphLeft, graphBottom, graphRight, graphBottom);

  noStroke();
  fill('black');
  textSize(13);
  textAlign(CENTER, TOP);
  text('Quantity', (graphLeft + graphRight) / 2, graphBottom + 8);
  push();
  translate(18, (graphTop + graphBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, BOTTOM);
  text('Price ($)', 0, 0);
  pop();

  // Tick marks
  textSize(10);
  for (let q = 0; q <= maxQuantity; q += 20) {
    let x = xFromQ(q);
    stroke('gray');
    strokeWeight(1);
    line(x, graphBottom, x, graphBottom + 4);
    noStroke();
    fill('gray');
    textAlign(CENTER, TOP);
    text(q, x, graphBottom + 5);
  }
  for (let p = 0; p <= maxPrice; p += 5) {
    let y = yFromPrice(p);
    stroke('gray');
    strokeWeight(1);
    line(graphLeft - 4, y, graphLeft, y);
    noStroke();
    fill('gray');
    textAlign(RIGHT, CENTER);
    text('$' + p, graphLeft - 6, y);
  }

  // Effective quantity traded
  let qDemanded = constrain(demandQ(currentPrice), 0, maxQuantity);
  let qSupplied = constrain(supplyQ(currentPrice), 0, maxQuantity);
  let qTraded = min(qDemanded, qSupplied);
  let atEq = abs(currentPrice - eqPrice) < 0.3;

  // Consumer Surplus (area below demand, above price, up to qTraded)
  if (showCSBox.checked() && qTraded > 0) {
    fill(100, 149, 237, 80); // cornflowerblue translucent
    noStroke();
    beginShape();
    for (let q = 0; q <= qTraded; q += 1) {
      vertex(xFromQ(q), yFromPrice(demandP(q)));
    }
    vertex(xFromQ(qTraded), yFromPrice(currentPrice));
    vertex(xFromQ(0), yFromPrice(currentPrice));
    endShape(CLOSE);
  }

  // Producer Surplus (area above supply, below price, up to qTraded)
  if (showPSBox.checked() && qTraded > 0) {
    fill(255, 165, 0, 80); // orange translucent
    noStroke();
    beginShape();
    vertex(xFromQ(0), yFromPrice(currentPrice));
    vertex(xFromQ(qTraded), yFromPrice(currentPrice));
    for (let q = qTraded; q >= 0; q -= 1) {
      vertex(xFromQ(q), yFromPrice(supplyP(q)));
    }
    endShape(CLOSE);
  }

  // Deadweight Loss (if price not at equilibrium)
  if (showDWLBox.checked() && !atEq && qTraded < eqQuantity) {
    fill(128, 128, 128, 80);
    noStroke();
    beginShape();
    // Triangle from qTraded on demand, to equilibrium, to qTraded on supply
    vertex(xFromQ(qTraded), yFromPrice(demandP(qTraded)));
    vertex(xFromQ(eqQuantity), yFromPrice(eqPrice));
    vertex(xFromQ(qTraded), yFromPrice(supplyP(qTraded)));
    endShape(CLOSE);
  }

  // Draw demand curve (blue)
  stroke('blue');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let p = 0; p <= maxPrice; p += 0.3) {
    let q = demandQ(p);
    if (q >= 0 && q <= maxQuantity) {
      vertex(xFromQ(q), yFromPrice(p));
    }
  }
  endShape();

  // Draw supply curve (orange)
  stroke('orange');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let p = 0; p <= maxPrice; p += 0.3) {
    let q = supplyQ(p);
    if (q >= 0 && q <= maxQuantity) {
      vertex(xFromQ(q), yFromPrice(p));
    }
  }
  endShape();

  // Curve labels
  noStroke();
  fill('blue');
  textSize(13);
  textAlign(LEFT, CENTER);
  text('Demand', xFromQ(demandQ(5)) + 5, yFromPrice(5));
  fill('orange');
  text('Supply', xFromQ(supplyQ(25)) + 5, yFromPrice(25));

  // Equilibrium dot
  let eqX = xFromQ(eqQuantity);
  let eqY = yFromPrice(eqPrice);
  fill('green');
  stroke('darkgreen');
  strokeWeight(2);
  ellipse(eqX, eqY, 10, 10);

  // Price line
  let priceY = yFromPrice(currentPrice);
  stroke(atEq ? 'green' : 'red');
  strokeWeight(2);
  drawingContext.setLineDash([6, 4]);
  line(graphLeft, priceY, graphRight, priceY);
  drawingContext.setLineDash([]);

  // Info panel
  let infoX = canvasWidth - 170;
  let infoY = graphTop + 10;
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, TOP);
  text('Price: $' + nf(currentPrice, 0, 1), infoX, infoY);
  text('Q Traded: ' + nf(qTraded, 0, 0), infoX, infoY + 22);

  // Calculate surplus values (triangle areas)
  let cs = 0.5 * qTraded * max(0, demandP(0) - currentPrice) * (qTraded / maxQuantity);
  let ps = 0.5 * qTraded * max(0, currentPrice - supplyP(0)) * (qTraded / maxQuantity);
  // Better approximation
  cs = 0;
  ps = 0;
  for (let q = 0; q < qTraded; q++) {
    cs += max(0, demandP(q) - currentPrice);
    ps += max(0, currentPrice - supplyP(q));
  }

  fill('cornflowerblue');
  textSize(12);
  text('Consumer Surplus: $' + nf(cs, 0, 0), infoX, infoY + 52);
  fill('darkorange');
  text('Producer Surplus: $' + nf(ps, 0, 0), infoX, infoY + 72);
  fill('black');
  text('Total Surplus: $' + nf(cs + ps, 0, 0), infoX, infoY + 92);

  if (!atEq) {
    let maxCS = 0, maxPS = 0;
    for (let q = 0; q < eqQuantity; q++) {
      maxCS += max(0, demandP(q) - eqPrice);
      maxPS += max(0, eqPrice - supplyP(q));
    }
    let dwl = (maxCS + maxPS) - (cs + ps);
    fill('gray');
    text('Deadweight Loss: $' + nf(max(0, dwl), 0, 0), infoX, infoY + 120);
  } else {
    fill('green');
    textSize(14);
    text('Total Surplus', infoX, infoY + 120);
    text('is MAXIMIZED!', infoX, infoY + 138);
  }

  // Status message
  noStroke();
  fill(atEq ? 'green' : 'gray');
  textSize(12);
  textAlign(LEFT, TOP);
  if (atEq) {
    text('At equilibrium: total surplus is maximized!', infoX, infoY + 170);
  } else if (currentPrice > eqPrice) {
    text('Price above equilibrium:', infoX, infoY + 160);
    text('fewer trades, surplus lost', infoX, infoY + 176);
  } else {
    text('Price below equilibrium:', infoX, infoY + 160);
    text('fewer trades, surplus lost', infoX, infoY + 176);
  }

  // Control area label
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Price: $' + nf(currentPrice, 0, 1), 10, drawHeight + 18);
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
