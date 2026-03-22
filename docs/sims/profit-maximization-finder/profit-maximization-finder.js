// Profit Maximization Finder MicroSim
// Find profit-maximizing quantity where MR = MC

let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 55;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

let quantitySlider, priceSlider, findOptimalBtn, resetBtn;
let animating = false;
let animTarget = 0;

// MC curve: starts at 8, rises quadratically
function mc(q) { return 8 + 0.008 * q * q; }
// Total cost
function tc(q) {
  let total = 0;
  for (let i = 1; i <= q; i++) total += mc(i);
  return total + 50; // fixed cost
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  quantitySlider = createSlider(0, 60, 30, 1);
  priceSlider = createSlider(5, 40, 20, 1);

  findOptimalBtn = createButton('Find Optimal');
  findOptimalBtn.mousePressed(() => {
    let p = priceSlider.value();
    // Find where MC = price
    for (let q = 1; q <= 60; q++) {
      if (mc(q) >= p) {
        animTarget = q;
        animating = true;
        break;
      }
    }
  });

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => {
    quantitySlider.value(30);
    priceSlider.value(20);
    animating = false;
  });

  positionControls();
  describe('Profit maximization finder showing MR equals MC rule', LABEL);
}

function positionControls() {
  let y = drawHeight + 12;
  quantitySlider.position(70, y);
  quantitySlider.size(canvasWidth / 2 - 100);
  priceSlider.position(canvasWidth / 2 + 55, y);
  priceSlider.size(canvasWidth / 2 - 200);
  findOptimalBtn.position(canvasWidth - 150, y - 2);
  resetBtn.position(canvasWidth - 60, y - 2);
}

function draw() {
  // Animate toward optimal
  if (animating) {
    let current = quantitySlider.value();
    if (abs(current - animTarget) < 1) {
      quantitySlider.value(animTarget);
      animating = false;
    } else {
      quantitySlider.value(current + (animTarget > current ? 1 : -1));
    }
  }

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let price = priceSlider.value();
  let qty = quantitySlider.value();
  let mr = price; // competitive firm
  let mcVal = mc(qty);
  let totalRev = price * qty;
  let totalCost = tc(qty);
  let profit = totalRev - totalCost;

  // Find optimal Q
  let optQ = 0;
  for (let q = 1; q <= 60; q++) {
    if (mc(q) >= price) { optQ = q; break; }
  }

  // Title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(20);
  text('Profit Maximization Finder', canvasWidth / 2, 6);
  textSize(12);
  fill('gray');
  text('Find where MR = MC', canvasWidth / 2, 28);

  // Graph area
  let gLeft = 70, gTop = 50;
  let gRight = canvasWidth - 200;
  let gBottom = drawHeight - 40;
  let maxQ = 60, maxP = 45;

  // Axes
  stroke('black');
  strokeWeight(1);
  line(gLeft, gTop, gLeft, gBottom);
  line(gLeft, gBottom, gRight, gBottom);

  noStroke();
  fill('black');
  textSize(11);
  textAlign(CENTER, TOP);
  text('Quantity', (gLeft + gRight) / 2, gBottom + 4);
  push();
  translate(gLeft - 35, (gTop + gBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('$ per unit', 0, 0);
  pop();

  // Grid
  textSize(9);
  fill('gray');
  for (let p = 0; p <= maxP; p += 10) {
    let y = map(p, 0, maxP, gBottom, gTop);
    noStroke();
    textAlign(RIGHT, CENTER);
    text('$' + p, gLeft - 4, y);
    stroke('lightgray');
    strokeWeight(0.5);
    line(gLeft, y, gRight, y);
  }
  for (let q = 0; q <= maxQ; q += 10) {
    let x = map(q, 0, maxQ, gLeft, gRight);
    noStroke();
    textAlign(CENTER, TOP);
    text(q, x, gBottom + 2);
    stroke('lightgray');
    strokeWeight(0.5);
    line(x, gTop, x, gBottom);
  }

  // Profit area (shaded)
  if (qty > 0) {
    noStroke();
    for (let q = 1; q <= qty; q++) {
      let x1 = map(q - 1, 0, maxQ, gLeft, gRight);
      let x2 = map(q, 0, maxQ, gLeft, gRight);
      let mrY = map(price, 0, maxP, gBottom, gTop);
      let mcY = map(mc(q), 0, maxP, gBottom, gTop);
      if (price > mc(q)) {
        fill(0, 180, 0, 40);
      } else {
        fill(220, 0, 0, 40);
      }
      rect(x1, min(mrY, mcY), x2 - x1, abs(mrY - mcY));
    }
  }

  // MC curve
  stroke('red');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let q = 0; q <= maxQ; q++) {
    let x = map(q, 0, maxQ, gLeft, gRight);
    let y = map(mc(q), 0, maxP, gBottom, gTop);
    if (y >= gTop) vertex(x, y);
  }
  endShape();

  // MR line (horizontal at price)
  stroke('green');
  strokeWeight(2);
  let mrY = map(price, 0, maxP, gBottom, gTop);
  line(gLeft, mrY, gRight, mrY);

  // Labels
  noStroke();
  fill('red');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('MC', gRight - 25, map(mc(maxQ - 5), 0, maxP, gBottom, gTop));
  fill('green');
  text('MR (=$' + price + ')', gRight - 60, mrY - 12);

  // Current quantity line
  let qX = map(qty, 0, maxQ, gLeft, gRight);
  stroke('blue');
  strokeWeight(2);
  drawingContext.setLineDash([5, 5]);
  line(qX, gTop, qX, gBottom);
  drawingContext.setLineDash([]);

  // Current point
  fill('blue');
  noStroke();
  circle(qX, mrY, 10);
  circle(qX, map(mcVal, 0, maxP, gBottom, gTop), 10);

  // --- Right Panel: Calculations ---
  let panelX = canvasWidth - 185;
  let panelY = gTop;

  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, TOP);
  text('At Q = ' + qty + ':', panelX, panelY);

  panelY += 25;
  textSize(12);
  fill('green');
  text('MR: $' + nf(mr, 1, 2), panelX, panelY);
  panelY += 18;
  fill('red');
  text('MC: $' + nf(mcVal, 1, 2), panelX, panelY);

  panelY += 25;
  fill('black');
  textSize(11);
  text('Revenue: $' + nf(totalRev, 1, 0), panelX, panelY);
  panelY += 16;
  text('Cost: $' + nf(totalCost, 1, 0), panelX, panelY);

  panelY += 22;
  fill(profit >= 0 ? 'green' : 'red');
  textSize(14);
  text('Profit: $' + nf(profit, 1, 0), panelX, panelY);

  // Guidance message
  panelY += 35;
  textSize(12);
  if (qty === 0) {
    fill('gray');
    text('Move the quantity', panelX, panelY);
    text('slider to begin.', panelX, panelY + 16);
  } else if (mr > mcVal + 1) {
    fill('darkorange');
    text('MR > MC:', panelX, panelY);
    text('Produce MORE for', panelX, panelY + 16);
    text('more profit!', panelX, panelY + 32);
  } else if (mcVal > mr + 1) {
    fill('red');
    text('MC > MR:', panelX, panelY);
    text('Producing too much!', panelX, panelY + 16);
    text('Profit is falling.', panelX, panelY + 32);
  } else {
    fill('green');
    text('MR \u2248 MC:', panelX, panelY);
    text('Maximum profit', panelX, panelY + 16);
    text('achieved!', panelX, panelY + 32);
  }

  // Optimal indicator
  panelY += 70;
  fill('gray');
  textSize(10);
  text('Optimal Q: ~' + optQ, panelX, panelY);

  // Control labels
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Q=' + qty, 10, drawHeight + 20);
  text('P=$' + price, canvasWidth / 2 + 5, drawHeight + 20);
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
