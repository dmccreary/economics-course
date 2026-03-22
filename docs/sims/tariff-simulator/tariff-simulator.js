// Tariff Impact Simulator MicroSim
// Shows who really pays for tariffs using supply/demand analysis
// MicroSim template version 2026.03

let canvasWidth = 580;
let drawHeight = 460;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 60;
let defaultTextSize = 16;
let sliderLeftMargin = 120;

let graphLeft, graphRight, graphTop, graphBottom;

// Products with different parameters
let products = [
  { name: 'Steel', worldPrice: 8, domSlope: 3, domIntercept: 2, demSlope: -2.5, demIntercept: 90, costPerJob: '$200,000' },
  { name: 'Washing Machines', worldPrice: 10, domSlope: 2.5, domIntercept: 5, demSlope: -2, demIntercept: 80, costPerJob: '$815,000' },
  { name: 'Solar Panels', worldPrice: 7, domSlope: 3.5, domIntercept: 0, demSlope: -3, demIntercept: 95, costPerJob: '$250,000' },
  { name: 'Clothing', worldPrice: 6, domSlope: 4, domIntercept: 0, demSlope: -3.5, demIntercept: 100, costPerJob: '$170,000' }
];

let currentProduct = 0;
let tariffRate = 0;

// Controls
let tariffSlider, productSelect, showDWLBox, showBreakdownBox, resetBtn;

function domSupplyQ(p) {
  let prod = products[currentProduct];
  return max(0, prod.domSlope * p + prod.domIntercept);
}

function demandQ(p) {
  let prod = products[currentProduct];
  return max(0, prod.demSlope * p + prod.demIntercept);
}

function yFromPrice(p) { return map(p, 0, 30, graphBottom, graphTop); }
function xFromQ(q) { return map(q, 0, 100, graphLeft, graphRight); }

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  productSelect = createSelect();
  for (let p of products) productSelect.option(p.name);
  productSelect.changed(() => {
    currentProduct = products.findIndex(p => p.name === productSelect.value());
  });

  tariffSlider = createSlider(0, 100, 0, 1);
  showDWLBox = createCheckbox('Show Deadweight Loss', true);
  showBreakdownBox = createCheckbox('Who Pays?', true);
  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => { tariffSlider.value(0); });

  positionControls();
  describe('Tariff impact simulator showing who pays for tariffs', LABEL);
}

function positionControls() {
  let y1 = drawHeight + 10;
  let y2 = drawHeight + 42;
  productSelect.position(15, y1);
  tariffSlider.position(sliderLeftMargin + 80, y1);
  tariffSlider.size(canvasWidth - sliderLeftMargin - 310);
  resetBtn.position(canvasWidth - 210, y1);
  showDWLBox.position(15, y2);
  showBreakdownBox.position(200, y2);
}

function draw() {
  graphLeft = margin;
  graphRight = canvasWidth - 220;
  graphTop = margin;
  graphBottom = drawHeight - margin;

  tariffRate = tariffSlider.value();
  let prod = products[currentProduct];
  let wp = prod.worldPrice;
  let tariffAmount = wp * tariffRate / 100;
  let newPrice = wp + tariffAmount;

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
  text('Tariff Impact Simulator: ' + prod.name, canvasWidth / 2, 10);

  // Axes
  stroke('black');
  strokeWeight(2);
  line(graphLeft, graphTop, graphLeft, graphBottom);
  line(graphLeft, graphBottom, graphRight, graphBottom);

  noStroke();
  fill('black');
  textSize(12);
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
  for (let q = 0; q <= 100; q += 20) {
    let x = xFromQ(q);
    stroke('gray'); strokeWeight(1);
    line(x, graphBottom, x, graphBottom + 4);
    noStroke(); fill('gray');
    textAlign(CENTER, TOP);
    text(q, x, graphBottom + 5);
  }
  for (let p = 0; p <= 30; p += 5) {
    let y = yFromPrice(p);
    stroke('gray'); strokeWeight(1);
    line(graphLeft - 4, y, graphLeft, y);
    noStroke(); fill('gray');
    textAlign(RIGHT, CENTER);
    text('$' + p, graphLeft - 6, y);
  }

  // Quantities at different prices
  let qDemandFree = demandQ(wp);
  let qDomSupFree = domSupplyQ(wp);
  let importsFree = max(0, qDemandFree - qDomSupFree);

  let qDemandTariff = demandQ(newPrice);
  let qDomSupTariff = domSupplyQ(newPrice);
  let importsTariff = max(0, qDemandTariff - qDomSupTariff);

  // Shaded areas when tariff active
  if (tariffRate > 0) {
    // Consumer loss (entire area between old and new price over demand range)
    if (showBreakdownBox.checked()) {
      // Government revenue (rectangle: tariff * imports after tariff)
      fill(0, 180, 0, 60);
      noStroke();
      let x1 = xFromQ(qDomSupTariff);
      let x2 = xFromQ(qDemandTariff);
      let y1 = yFromPrice(newPrice);
      let y2 = yFromPrice(wp);
      rect(x1, y1, x2 - x1, y2 - y1);

      // Producer gain (trapezoid under domestic supply between prices)
      fill(0, 100, 255, 50);
      noStroke();
      beginShape();
      vertex(xFromQ(qDomSupFree), yFromPrice(wp));
      vertex(xFromQ(qDomSupTariff), yFromPrice(newPrice));
      vertex(xFromQ(qDomSupTariff), yFromPrice(wp));
      // Close along world price
      endShape(CLOSE);
    }

    // Deadweight loss triangles
    if (showDWLBox.checked()) {
      fill(128, 128, 128, 80);
      noStroke();
      // Production inefficiency triangle (left)
      beginShape();
      vertex(xFromQ(qDomSupFree), yFromPrice(wp));
      vertex(xFromQ(qDomSupTariff), yFromPrice(newPrice));
      vertex(xFromQ(qDomSupTariff), yFromPrice(wp));
      endShape(CLOSE);

      // Consumption loss triangle (right)
      beginShape();
      vertex(xFromQ(qDemandTariff), yFromPrice(newPrice));
      vertex(xFromQ(qDemandFree), yFromPrice(wp));
      vertex(xFromQ(qDemandTariff), yFromPrice(wp));
      endShape(CLOSE);
    }
  }

  // Domestic supply curve
  stroke('orange');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let p = 0; p <= 30; p += 0.3) {
    let q = domSupplyQ(p);
    if (q >= 0 && q <= 100) vertex(xFromQ(q), yFromPrice(p));
  }
  endShape();

  // Demand curve
  stroke('blue');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let p = 0; p <= 30; p += 0.3) {
    let q = demandQ(p);
    if (q >= 0 && q <= 100) vertex(xFromQ(q), yFromPrice(p));
  }
  endShape();

  // World price line
  stroke('green');
  strokeWeight(2);
  drawingContext.setLineDash([8, 4]);
  line(graphLeft, yFromPrice(wp), graphRight, yFromPrice(wp));
  drawingContext.setLineDash([]);

  noStroke();
  fill('green');
  textSize(11);
  textAlign(LEFT, BOTTOM);
  text('World Price: $' + wp, graphLeft + 5, yFromPrice(wp) - 3);

  // Tariff price line
  if (tariffRate > 0) {
    stroke('red');
    strokeWeight(2);
    drawingContext.setLineDash([8, 4]);
    line(graphLeft, yFromPrice(newPrice), graphRight, yFromPrice(newPrice));
    drawingContext.setLineDash([]);

    noStroke();
    fill('red');
    textSize(11);
    textAlign(LEFT, TOP);
    text('Price + Tariff: $' + nf(newPrice, 0, 1), graphLeft + 5, yFromPrice(newPrice) + 3);

    // Tariff wedge bracket
    stroke('red');
    strokeWeight(2);
    let bx = graphRight - 10;
    line(bx, yFromPrice(wp), bx, yFromPrice(newPrice));
    line(bx - 5, yFromPrice(wp), bx, yFromPrice(wp));
    line(bx - 5, yFromPrice(newPrice), bx, yFromPrice(newPrice));
  }

  // Curve labels
  noStroke();
  fill('blue');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Demand', xFromQ(demandQ(3)) + 3, yFromPrice(3));
  fill('orange');
  text('Dom. Supply', xFromQ(domSupplyQ(22)) + 3, yFromPrice(22));

  // Right info panel
  let infoX = canvasWidth - 210;
  let infoY = graphTop + 10;
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, TOP);
  text('Tariff: ' + tariffRate + '%', infoX, infoY);
  text('($' + nf(tariffAmount, 0, 2) + ' per unit)', infoX, infoY + 18);

  textSize(12);
  let ly = infoY + 46;
  fill('black');
  text('Before Tariff:', infoX, ly);
  text('  Imports: ' + nf(importsFree, 0, 0) + ' units', infoX, ly + 16);
  text('  Consumer Price: $' + wp, infoX, ly + 32);

  ly += 56;
  fill('red');
  text('After Tariff:', infoX, ly);
  fill('black');
  text('  Imports: ' + nf(max(0, importsTariff), 0, 0) + ' units', infoX, ly + 16);
  text('  Consumer Price: $' + nf(newPrice, 0, 1), infoX, ly + 32);

  // Who pays breakdown
  ly += 60;
  if (tariffRate > 0) {
    let govRevenue = tariffAmount * max(0, importsTariff);
    let consumerLoss = tariffAmount * qDemandTariff;

    fill('black');
    textSize(12);
    text('WHO PAYS:', infoX, ly);

    fill('red');
    text('Consumers pay more:', infoX, ly + 18);
    text('  +$' + nf(tariffAmount, 0, 1) + '/unit', infoX, ly + 34);

    fill('green');
    text('Gov revenue: $' + nf(govRevenue, 0, 0), infoX, ly + 54);

    fill('blue');
    text('Dom. producers gain', infoX, ly + 74);

    fill('gray');
    text('Net: economy loses', infoX, ly + 94);

    // Key insight
    fill('darkred');
    textSize(11);
    text('Tariffs are paid by', infoX, ly + 120);
    text('domestic consumers,', infoX, ly + 134);
    text('NOT foreign countries.', infoX, ly + 148);

    if (prod.costPerJob) {
      fill('gray');
      textSize(10);
      text('Cost per job saved:', infoX, ly + 170);
      text(prod.costPerJob + '/year', infoX, ly + 184);
    }
  }

  // Control area label
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Tariff: ' + tariffRate + '%', sliderLeftMargin + 30, drawHeight + 18);
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
