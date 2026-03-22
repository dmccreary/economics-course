// Budget Constraint Explorer MicroSim
// Draggable point on budget line showing tradeoffs between two goods
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Graph area
let gLeft = 80;
let gTop = 50;
let gBottom, gRight;

// Budget parameters
let budget = 20;
let priceA = 4;  // Tacos
let priceB = 5;  // Burritos

// Current point on budget line
let pointT = 0.4; // parameter 0-1 along budget line
let dragging = false;

// Sliders
let budgetSlider, priceASlider, priceBSlider;
let resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  gBottom = drawHeight - 50;

  // Budget slider
  budgetSlider = createSlider(10, 50, budget, 1);
  budgetSlider.position(sliderLeftMargin, drawHeight + 5);
  budgetSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Price of Tacos slider
  priceASlider = createSlider(2, 8, priceA, 1);
  priceASlider.position(sliderLeftMargin, drawHeight + 30);
  priceASlider.size(canvasWidth - sliderLeftMargin - margin);

  // Price of Burritos slider
  priceBSlider = createSlider(3, 10, priceB, 1);
  priceBSlider.position(sliderLeftMargin, drawHeight + 55);
  priceBSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Budget constraint explorer showing tradeoffs between tacos and burritos within a limited budget', LABEL);
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

  gRight = canvasWidth - 60;

  // Read sliders
  budget = budgetSlider.value();
  priceA = priceASlider.value();
  priceB = priceBSlider.value();

  // Max quantities
  let maxA = budget / priceA;
  let maxB = budget / priceB;

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Budget Constraint Explorer', canvasWidth * 0.4, 8);

  // Draw axes
  stroke('black');
  strokeWeight(2);
  line(gLeft, gTop, gLeft, gBottom);
  line(gLeft, gBottom, gRight, gBottom);

  // Axis labels
  noStroke();
  fill('black');
  textSize(13);
  textAlign(CENTER, TOP);
  text('Tacos (qty)', (gLeft + gRight) / 2, gBottom + 5);

  push();
  translate(20, (gTop + gBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Burritos (qty)', 0, 0);
  pop();

  // Graph dimensions
  let gw = gRight - gLeft;
  let gh = gBottom - gTop;

  // Tick marks and scale
  textSize(11);
  textAlign(CENTER, TOP);
  fill('gray');
  noStroke();
  let maxScale = ceil(max(maxA, maxB));
  for (let i = 0; i <= maxScale; i += max(1, floor(maxScale / 5))) {
    // X axis (tacos)
    let tx = map(i, 0, maxScale, gLeft, gRight);
    text(i, tx, gBottom + 2);
    stroke('lightgray');
    strokeWeight(0.5);
    line(tx, gTop, tx, gBottom);
    noStroke();

    // Y axis (burritos)
    let ty = map(i, 0, maxScale, gBottom, gTop);
    textAlign(RIGHT, CENTER);
    text(i, gLeft - 5, ty);
    stroke('lightgray');
    strokeWeight(0.5);
    line(gLeft, ty, gRight, ty);
    noStroke();
    textAlign(CENTER, TOP);
  }

  // Affordable region (shaded)
  let blX1 = map(maxA, 0, maxScale, gLeft, gRight);
  let blY1 = gBottom;
  let blX2 = gLeft;
  let blY2 = map(maxB, 0, maxScale, gBottom, gTop);

  fill(100, 180, 100, 40);
  noStroke();
  beginShape();
  vertex(gLeft, gBottom);
  vertex(blX1, blY1);
  vertex(blX2, blY2);
  endShape(CLOSE);

  // Budget line
  stroke('steelblue');
  strokeWeight(3);
  line(blX1, blY1, blX2, blY2);

  // Point on budget line
  let ptA = maxA * pointT;      // tacos
  let ptB = maxB * (1 - pointT); // burritos
  let ptX = map(ptA, 0, maxScale, gLeft, gRight);
  let ptY = map(ptB, 0, maxScale, gBottom, gTop);

  // Dotted lines to axes
  stroke('gray');
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(ptX, ptY, ptX, gBottom);
  line(ptX, ptY, gLeft, ptY);
  drawingContext.setLineDash([]);

  // Draw point
  fill('gold');
  stroke('black');
  strokeWeight(2);
  circle(ptX, ptY, 18);

  // Drag handling
  if (mouseIsPressed && mouseY < drawHeight) {
    // Find closest point on budget line
    let mx = mouseX;
    let my = mouseY;
    // Project onto budget line
    let dx = blX1 - blX2;
    let dy = blY1 - blY2;
    let t = ((mx - blX2) * dx + (my - blY2) * dy) / (dx * dx + dy * dy);
    pointT = constrain(t, 0, 1);
  }

  // Info panel
  let spent = ptA * priceA + ptB * priceB;
  let infoX = canvasWidth - 195;
  let infoY = gTop + 5;

  fill(255, 255, 240, 230);
  stroke('goldenrod');
  strokeWeight(1);
  rect(infoX, infoY, 185, 105, 5);

  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, TOP);
  text('Tacos: ' + nf(ptA, 1, 1) + ' × $' + priceA + ' = $' + nf(ptA * priceA, 1, 2), infoX + 8, infoY + 8);
  text('Burritos: ' + nf(ptB, 1, 1) + ' × $' + priceB + ' = $' + nf(ptB * priceB, 1, 2), infoX + 8, infoY + 28);
  text('Total: $' + nf(spent, 1, 2) + ' of $' + budget, infoX + 8, infoY + 48);

  // Trade-off rate
  let tradeoff = priceB / priceA;
  textSize(11);
  fill('darkblue');
  text('1 burrito = ' + nf(tradeoff, 1, 1) + ' tacos', infoX + 8, infoY + 72);

  fill('gray');
  textSize(10);
  text('Click & drag the gold point!', infoX + 8, infoY + 90);

  // Control labels
  noStroke();
  fill('black');
  textSize(defaultTextSize - 2);
  textAlign(LEFT, CENTER);
  text('Budget: $' + budget, 10, drawHeight + 15);
  text('Taco Price: $' + priceA, 10, drawHeight + 40);
  text('Burrito Price: $' + priceB, 10, drawHeight + 65);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  budgetSlider.size(canvasWidth - sliderLeftMargin - margin);
  priceASlider.size(canvasWidth - sliderLeftMargin - margin);
  priceBSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
