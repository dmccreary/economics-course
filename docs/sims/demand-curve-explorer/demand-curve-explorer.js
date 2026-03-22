// Demand Curve Explorer MicroSim
// Interactive demand curve showing inverse price-quantity relationship
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

let gLeft = 80, gTop = 50, gBottom, gRight;
let priceSlider;
let scenarioButtons = [];

// Demand function: Q = 120 - 12*P (coffee example)
function demandQ(p) { return max(0, 120 - 12 * p); }

let scenarios = [
  { name: 'Coffee at $2', price: 2 },
  { name: 'Coffee at $5', price: 5 },
  { name: 'Coffee at $8', price: 8 }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  gBottom = drawHeight - 50;

  priceSlider = createSlider(1, 10, 4, 0.5);
  priceSlider.position(sliderLeftMargin, drawHeight + 10);
  priceSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Demand curve explorer showing how price changes affect quantity demanded for coffee', LABEL);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  gRight = canvasWidth - 60;
  let price = priceSlider.value();
  let qty = demandQ(price);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Demand Curve Explorer', canvasWidth * 0.4, 8);
  textSize(12);
  fill('gray');
  text('Coffee Shop Example', canvasWidth * 0.4, 30);

  // Axes
  stroke('black');
  strokeWeight(2);
  line(gLeft, gTop, gLeft, gBottom);
  line(gLeft, gBottom, gRight, gBottom);

  // Labels
  noStroke();
  fill('black');
  textSize(13);
  textAlign(CENTER, TOP);
  text('Quantity (cups/day)', (gLeft + gRight) / 2, gBottom + 5);

  push();
  translate(20, (gTop + gBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Price ($)', 0, 0);
  pop();

  let gw = gRight - gLeft;
  let gh = gBottom - gTop;
  let maxP = 10;
  let maxQ = 120;

  // Grid and ticks
  textSize(10);
  fill('gray');
  noStroke();
  for (let p = 0; p <= maxP; p += 2) {
    let y = map(p, 0, maxP, gBottom, gTop);
    textAlign(RIGHT, CENTER);
    text('$' + p, gLeft - 5, y);
    stroke('lightgray');
    strokeWeight(0.5);
    line(gLeft, y, gRight, y);
    noStroke();
  }
  for (let q = 0; q <= maxQ; q += 20) {
    let x = map(q, 0, maxQ, gLeft, gRight);
    textAlign(CENTER, TOP);
    text(q, x, gBottom + 2);
    stroke('lightgray');
    strokeWeight(0.5);
    line(x, gTop, x, gBottom);
    noStroke();
  }

  // Draw demand curve
  stroke('steelblue');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let p = 0; p <= maxP; p += 0.1) {
    let q = demandQ(p);
    let x = map(q, 0, maxQ, gLeft, gRight);
    let y = map(p, 0, maxP, gBottom, gTop);
    vertex(x, y);
  }
  endShape();

  // Label curve
  noStroke();
  fill('steelblue');
  textSize(14);
  textAlign(LEFT, CENTER);
  let labelQ = demandQ(1.5);
  text('D', map(labelQ, 0, maxQ, gLeft, gRight) + 5, map(1.5, 0, maxP, gBottom, gTop));

  // Current point
  let ptX = map(qty, 0, maxQ, gLeft, gRight);
  let ptY = map(price, 0, maxP, gBottom, gTop);

  // Dotted lines
  stroke('gray');
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(ptX, ptY, ptX, gBottom);
  line(ptX, ptY, gLeft, ptY);
  drawingContext.setLineDash([]);

  // Point
  fill('red');
  stroke('white');
  strokeWeight(2);
  circle(ptX, ptY, 14);

  // Info box
  let infoX = canvasWidth - 195;
  let infoY = gTop + 5;
  fill(255, 255, 240, 230);
  stroke('goldenrod');
  strokeWeight(1);
  rect(infoX, infoY, 185, 85, 5);

  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Price: $' + nf(price, 1, 2), infoX + 10, infoY + 10);
  text('Quantity: ' + nf(qty, 1, 0) + ' cups/day', infoX + 10, infoY + 30);

  textSize(12);
  if (price > priceSlider.value() - 0.1) {
    fill('darkblue');
  }
  // Direction indicator
  fill('gray');
  textSize(11);
  if (price <= 3) text('Low price → High demand', infoX + 10, infoY + 55);
  else if (price >= 7) text('High price → Low demand', infoX + 10, infoY + 55);
  else text('At $' + nf(price, 1, 1) + ', consumers want ' + nf(qty, 1, 0) + ' cups', infoX + 10, infoY + 55);

  // Scenario buttons drawn as clickable regions
  let btnY = drawHeight - 35;
  textSize(11);
  for (let i = 0; i < scenarios.length; i++) {
    let btnX = gLeft + 10 + i * 110;
    let isActive = abs(price - scenarios[i].price) < 0.3;
    fill(isActive ? 'steelblue' : 'white');
    stroke('steelblue');
    strokeWeight(1);
    rect(btnX, btnY, 100, 22, 5);
    fill(isActive ? 'white' : 'steelblue');
    noStroke();
    textAlign(CENTER, CENTER);
    text(scenarios[i].name, btnX + 50, btnY + 11);
  }

  // Control label
  noStroke();
  fill('black');
  textSize(defaultTextSize - 2);
  textAlign(LEFT, CENTER);
  text('Price: $' + nf(price, 1, 2), 10, drawHeight + 20);
}

function mousePressed() {
  let btnY = drawHeight - 35;
  if (mouseY >= btnY && mouseY <= btnY + 22) {
    for (let i = 0; i < scenarios.length; i++) {
      let btnX = gLeft + 10 + i * 110;
      if (mouseX >= btnX && mouseX <= btnX + 100) {
        priceSlider.value(scenarios[i].price);
      }
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  priceSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
