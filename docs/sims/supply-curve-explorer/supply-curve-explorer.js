// Supply Curve Explorer MicroSim
// Interactive supply curve showing positive price-quantity relationship
// Pizza shop example

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

let gLeft = 80, gTop = 50, gBottom, gRight;
let priceSlider;

let maxP = 30;
let maxQ = 100;

// Supply function: Q = 3.5 * P - 7 (positive slope, starts producing at ~$2)
function supplyQ(p) { return max(0, 3.5 * p - 7); }

let scenarios = [
  { name: 'Pizza at $8', price: 8 },
  { name: 'Pizza at $15', price: 15 },
  { name: 'Pizza at $25', price: 25 }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  gBottom = drawHeight - 50;

  priceSlider = createSlider(1, maxP, 12, 0.5);
  priceSlider.position(sliderLeftMargin, drawHeight + 10);
  priceSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Supply curve explorer showing how price changes affect quantity supplied for pizza', LABEL);
}

function draw() {
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  gRight = canvasWidth - 60;
  let price = priceSlider.value();
  let qty = supplyQ(price);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Supply Curve Explorer', canvasWidth / 2, 8);
  textSize(12);
  fill('gray');
  text('Pizza Shop Example', canvasWidth / 2, 30);

  // Axes
  stroke('black');
  strokeWeight(2);
  line(gLeft, gTop, gLeft, gBottom);
  line(gLeft, gBottom, gRight, gBottom);

  // Axis labels
  noStroke();
  fill('black');
  textSize(13);
  textAlign(CENTER, TOP);
  text('Quantity (pizzas/day)', (gLeft + gRight) / 2, gBottom + 5);

  push();
  translate(20, (gTop + gBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Price ($)', 0, 0);
  pop();

  let gw = gRight - gLeft;
  let gh = gBottom - gTop;

  // Grid and ticks
  textSize(10);
  fill('gray');
  noStroke();
  for (let p = 0; p <= maxP; p += 5) {
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

  // Draw supply curve
  stroke('orange');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let p = 0; p <= maxP; p += 0.2) {
    let q = supplyQ(p);
    if (q > 0) {
      let x = map(q, 0, maxQ, gLeft, gRight);
      let y = map(p, 0, maxP, gBottom, gTop);
      vertex(x, y);
    }
  }
  endShape();

  // Label curve
  noStroke();
  fill('orange');
  textSize(14);
  textAlign(LEFT, CENTER);
  let labelP = 6;
  let labelQ = supplyQ(labelP);
  text('S', map(labelQ, 0, maxQ, gLeft, gRight) + 8, map(labelP, 0, maxP, gBottom, gTop));

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
  let infoX = canvasWidth - 210;
  let infoY = gTop + 5;
  fill(255, 255, 240, 230);
  stroke('goldenrod');
  strokeWeight(1);
  rect(infoX, infoY, 200, 105, 5);

  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Price: $' + nf(price, 1, 2), infoX + 10, infoY + 10);
  text('Quantity: ' + nf(qty, 1, 0) + ' pizzas/day', infoX + 10, infoY + 30);

  textSize(12);
  fill('darkgreen');
  if (price <= 5) {
    text('Low price: few producers', infoX + 10, infoY + 55);
    text('can cover their costs', infoX + 10, infoY + 70);
  } else if (price >= 20) {
    text('High price: many producers', infoX + 10, infoY + 55);
    text('want to supply pizzas!', infoX + 10, infoY + 70);
  } else {
    text('Price up \u2192 Quantity up', infoX + 10, infoY + 55);
    text('Price down \u2192 Quantity down', infoX + 10, infoY + 70);
  }

  fill('gray');
  textSize(10);
  text('Law of Supply', infoX + 10, infoY + 88);

  // Scenario buttons
  let btnY = drawHeight - 35;
  textSize(11);
  for (let i = 0; i < scenarios.length; i++) {
    let btnX = gLeft + 10 + i * 115;
    let isActive = abs(price - scenarios[i].price) < 0.3;
    fill(isActive ? 'orange' : 'white');
    stroke('orange');
    strokeWeight(1);
    rect(btnX, btnY, 105, 22, 5);
    fill(isActive ? 'white' : 'darkorange');
    noStroke();
    textAlign(CENTER, CENTER);
    text(scenarios[i].name, btnX + 52, btnY + 11);
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
      let btnX = gLeft + 10 + i * 115;
      if (mouseX >= btnX && mouseX <= btnX + 105) {
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
  canvasHeight = drawHeight + controlHeight;
}
