// Market Equilibrium Explorer MicroSim
// Students drag a price line to discover equilibrium where supply meets demand.
// Shows surplus/shortage areas and market status in real time.

let canvasWidth = 580;
let drawHeight = 450;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 60;

// Graph area
let graphLeft, graphRight, graphTop, graphBottom;
let graphW, graphH;

// Curves
let eqPrice = 25;
let eqQuantity = 50;
let currentPrice = 30; // start above equilibrium to show surplus
let draggingPrice = false;

// Controls
let findEqButton, randomButton, shadingCheckbox;

// Supply: Qs = 2 * P  (at P=25, Qs=50)
function supplyQ(p) {
  return 2 * p;
}

// Demand: Qd = 100 - 2 * P  (at P=25, Qd=50)
function demandQ(p) {
  return 100 - 2 * p;
}

function priceFromY(yVal) {
  return map(yVal, graphBottom, graphTop, 0, 50);
}

function yFromPrice(p) {
  return map(p, 0, 50, graphBottom, graphTop);
}

function xFromQuantity(q) {
  return map(q, 0, 100, graphLeft, graphRight);
}

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(14);

  findEqButton = createButton('Find Equilibrium');
  findEqButton.mousePressed(() => { currentPrice = eqPrice; });

  randomButton = createButton('Random Price');
  randomButton.mousePressed(() => { currentPrice = floor(random(5, 45)); });

  shadingCheckbox = createCheckbox('Show Surplus/Shortage', true);

  positionControls();
}

function positionControls() {
  let y = drawHeight + 15;
  findEqButton.position(15, y);
  randomButton.position(150, y);
  shadingCheckbox.position(280, y);
}

function draw() {
  graphLeft = margin;
  graphRight = canvasWidth - 30;
  graphTop = margin;
  graphBottom = drawHeight - margin;
  graphW = graphRight - graphLeft;
  graphH = graphBottom - graphTop;

  // Drawing area
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
  text('Market Equilibrium Explorer', canvasWidth / 2, 10);

  // Axes
  stroke('black');
  strokeWeight(2);
  line(graphLeft, graphTop, graphLeft, graphBottom);
  line(graphLeft, graphBottom, graphRight, graphBottom);

  // Axis labels
  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Quantity (units)', (graphLeft + graphRight) / 2, graphBottom + 8);
  push();
  translate(15, (graphTop + graphBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, BOTTOM);
  text('Price ($)', 0, 0);
  pop();

  // Tick marks
  textSize(11);
  textAlign(CENTER, TOP);
  for (let q = 0; q <= 100; q += 20) {
    let x = xFromQuantity(q);
    stroke('gray');
    strokeWeight(1);
    line(x, graphBottom, x, graphBottom + 5);
    noStroke();
    fill('gray');
    text(q, x, graphBottom + 6);
  }
  textAlign(RIGHT, CENTER);
  for (let p = 0; p <= 50; p += 10) {
    let y = yFromPrice(p);
    stroke('gray');
    strokeWeight(1);
    line(graphLeft - 5, y, graphLeft, y);
    noStroke();
    fill('gray');
    text('$' + p, graphLeft - 8, y);
  }

  // Surplus/Shortage shading
  let qd = demandQ(currentPrice);
  let qs = supplyQ(currentPrice);
  qd = constrain(qd, 0, 100);
  qs = constrain(qs, 0, 100);
  let diff = qs - qd;
  let atEquilibrium = abs(currentPrice - eqPrice) < 0.5;

  if (shadingCheckbox.checked() && !atEquilibrium) {
    noStroke();
    if (diff > 0) {
      // Surplus: shade between Qd and Qs at current price
      fill(255, 165, 0, 50);
      let x1 = xFromQuantity(qd);
      let x2 = xFromQuantity(qs);
      let yLine = yFromPrice(currentPrice);
      rect(x1, yLine - 15, x2 - x1, 30);
    } else if (diff < 0) {
      // Shortage
      fill(100, 100, 255, 50);
      let x1 = xFromQuantity(qs);
      let x2 = xFromQuantity(qd);
      let yLine = yFromPrice(currentPrice);
      rect(x1, yLine - 15, x2 - x1, 30);
    }
  }

  // Draw demand curve (blue)
  stroke('blue');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let p = 0; p <= 50; p += 0.5) {
    let q = demandQ(p);
    if (q >= 0 && q <= 100) {
      vertex(xFromQuantity(q), yFromPrice(p));
    }
  }
  endShape();

  // Draw supply curve (orange)
  stroke('orange');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let p = 0; p <= 50; p += 0.5) {
    let q = supplyQ(p);
    if (q >= 0 && q <= 100) {
      vertex(xFromQuantity(q), yFromPrice(p));
    }
  }
  endShape();

  // Curve labels
  noStroke();
  fill('blue');
  textSize(14);
  textAlign(LEFT, CENTER);
  let dLabelP = 8;
  let dLabelQ = demandQ(dLabelP);
  if (dLabelQ <= 100) {
    text('Demand', xFromQuantity(dLabelQ) + 5, yFromPrice(dLabelP));
  }
  fill('orange');
  let sLabelP = 40;
  let sLabelQ = supplyQ(sLabelP);
  if (sLabelQ <= 100) {
    text('Supply', xFromQuantity(sLabelQ) + 5, yFromPrice(sLabelP));
  }

  // Equilibrium star
  let eqX = xFromQuantity(eqQuantity);
  let eqY = yFromPrice(eqPrice);
  fill('gold');
  stroke('darkgoldenrod');
  strokeWeight(1);
  drawStar(eqX, eqY, 8, 16, 5);

  // Draggable price line
  let priceY = yFromPrice(currentPrice);
  if (atEquilibrium) {
    stroke('green');
  } else {
    stroke('red');
  }
  strokeWeight(2);
  line(graphLeft, priceY, graphRight, priceY);

  // Small drag handle
  fill(atEquilibrium ? 'green' : 'red');
  noStroke();
  ellipse(graphRight - 10, priceY, 14, 14);

  // Pressure arrows
  if (!atEquilibrium) {
    let arrowX = graphRight - 30;
    stroke(atEquilibrium ? 'green' : 'red');
    strokeWeight(2);
    if (diff > 0) {
      // Price should fall
      drawArrow(arrowX, priceY + 5, arrowX, priceY + 25);
    } else {
      // Price should rise
      drawArrow(arrowX, priceY - 5, arrowX, priceY - 25);
    }
  }

  // Info panel on right side
  let infoX = canvasWidth - 200;
  let infoY = graphTop + 10;
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, TOP);
  text('Current Price: $' + nf(currentPrice, 0, 0), infoX, infoY);
  text('Qd (Demanded): ' + nf(max(qd, 0), 0, 0), infoX, infoY + 22);
  text('Qs (Supplied): ' + nf(max(qs, 0), 0, 0), infoX, infoY + 44);

  textSize(14);
  if (atEquilibrium) {
    fill('green');
    text('EQUILIBRIUM!', infoX, infoY + 72);
    textSize(12);
    text('Market clears at $' + eqPrice, infoX, infoY + 92);
    text(eqQuantity + ' units traded', infoX, infoY + 110);
  } else if (diff > 0) {
    fill('orangered');
    text('SURPLUS', infoX, infoY + 72);
    textSize(12);
    text(nf(diff, 0, 0) + ' units unsold', infoX, infoY + 92);
    fill('gray');
    text('Price pressure: DOWN', infoX, infoY + 110);
  } else {
    fill('royalblue');
    text('SHORTAGE', infoX, infoY + 72);
    textSize(12);
    text(nf(abs(diff), 0, 0) + ' units unmet demand', infoX, infoY + 92);
    fill('gray');
    text('Price pressure: UP', infoX, infoY + 110);
  }

  // Instructions in control area
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, TOP);
  text('Drag the price line up/down to explore. Equilibrium at $' + eqPrice + '.', 15, drawHeight + 50);

  // Legend
  textAlign(LEFT, TOP);
  textSize(11);
  let legY = drawHeight + 68;
  fill('blue');
  text('Blue = Demand', 15, legY);
  fill('orange');
  text('Orange = Supply', 130, legY);
  fill('gold');
  text('Star = Equilibrium', 250, legY);
}

function drawStar(x, y, r1, r2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -HALF_PI; a < TWO_PI - HALF_PI; a += angle) {
    let sx = x + cos(a) * r2;
    let sy = y + sin(a) * r2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * r1;
    sy = y + sin(a + halfAngle) * r1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawArrow(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  let sz = 6;
  line(x2, y2, x2 - sz * cos(angle - PI / 6), y2 - sz * sin(angle - PI / 6));
  line(x2, y2, x2 - sz * cos(angle + PI / 6), y2 - sz * sin(angle + PI / 6));
}

function mousePressed() {
  let priceY = yFromPrice(currentPrice);
  if (mouseX > graphLeft && mouseX < graphRight && abs(mouseY - priceY) < 15) {
    draggingPrice = true;
  }
}

function mouseDragged() {
  if (draggingPrice) {
    let newPrice = priceFromY(mouseY);
    currentPrice = constrain(round(newPrice), 1, 49);
  }
}

function mouseReleased() {
  draggingPrice = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
  redraw();
}

function updateCanvasSize() {
  let container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  canvasHeight = drawHeight + controlHeight;
}
