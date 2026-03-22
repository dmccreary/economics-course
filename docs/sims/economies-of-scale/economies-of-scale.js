// Economies of Scale Visualizer MicroSim
// Compare costs at different production scales
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

let qtySlider;

// Cost model
let fixedCost = 10000;

function getATC(q) {
  if (q <= 0) return 0;
  let afc = fixedCost / q;
  // AVC starts high, decreases, then increases (U-shape)
  let avc = 50 - 0.08 * q + 0.0001 * q * q;
  return afc + max(5, avc);
}

// Factory representations
let factories = [
  { name: 'Cottage', qty: 50,   workers: 2,  icon: 'small' },
  { name: 'Workshop', qty: 250,  workers: 10, icon: 'medium' },
  { name: 'Factory', qty: 800,  workers: 50, icon: 'large' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  qtySlider = createSlider(10, 1000, 100, 10);
  qtySlider.position(sliderLeftMargin, drawHeight + 10);
  qtySlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Economies of scale visualizer showing how average cost decreases then increases with production quantity', LABEL);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let qty = qtySlider.value();
  let atc = getATC(qty);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Economies of Scale', canvasWidth / 2, 8);

  // ATC curve graph
  let gLeft = 70;
  let gRight = canvasWidth - 40;
  let gTop = 45;
  let gBottom = 230;
  let maxQ = 1000;
  let maxC = 250;

  // Axes
  stroke('black');
  strokeWeight(2);
  line(gLeft, gTop, gLeft, gBottom);
  line(gLeft, gBottom, gRight, gBottom);

  noStroke();
  fill('black');
  textSize(11);
  textAlign(CENTER, TOP);
  text('Quantity Produced', (gLeft + gRight) / 2, gBottom + 3);
  push();
  translate(20, (gTop + gBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Cost per Unit ($)', 0, 0);
  pop();

  // Regions
  let minATCq = 400; // approximate minimum ATC
  let regionMid = map(minATCq, 0, maxQ, gLeft, gRight);

  // Economies of scale region
  fill(200, 230, 200, 80);
  noStroke();
  rect(gLeft, gTop, regionMid - gLeft, gBottom - gTop);
  fill('green');
  textSize(9);
  textAlign(CENTER, TOP);
  text('Economies of Scale', (gLeft + regionMid) / 2, gTop + 3);
  text('(costs falling)', (gLeft + regionMid) / 2, gTop + 14);

  // Diseconomies region
  fill(230, 200, 200, 80);
  noStroke();
  rect(regionMid, gTop, gRight - regionMid, gBottom - gTop);
  fill('red');
  textSize(9);
  text('Diseconomies', (regionMid + gRight) / 2, gTop + 3);
  text('(costs rising)', (regionMid + gRight) / 2, gTop + 14);

  // Draw ATC curve
  stroke('steelblue');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let q = 10; q <= maxQ; q += 5) {
    let c = getATC(q);
    if (c <= maxC) {
      let x = map(q, 0, maxQ, gLeft, gRight);
      let y = map(c, 0, maxC, gBottom, gTop);
      vertex(x, y);
    }
  }
  endShape();

  // Current point
  let ptX = map(qty, 0, maxQ, gLeft, gRight);
  let ptY = map(constrain(atc, 0, maxC), 0, maxC, gBottom, gTop);

  // Dotted lines
  stroke('gray');
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(ptX, ptY, ptX, gBottom);
  line(ptX, ptY, gLeft, ptY);
  drawingContext.setLineDash([]);

  fill('red');
  stroke('white');
  strokeWeight(2);
  circle(ptX, ptY, 14);

  // Tick labels
  noStroke();
  fill('gray');
  textSize(9);
  for (let q = 0; q <= maxQ; q += 200) {
    textAlign(CENTER, TOP);
    text(q, map(q, 0, maxQ, gLeft, gRight), gBottom + 2);
  }
  for (let c = 0; c <= maxC; c += 50) {
    textAlign(RIGHT, CENTER);
    text('$' + c, gLeft - 5, map(c, 0, maxC, gBottom, gTop));
  }

  // Factory comparison section
  let facY = 250;
  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Cost Comparison at Different Scales', canvasWidth / 2, facY);

  facY += 25;
  let colW = (canvasWidth - 40) / 3;

  for (let i = 0; i < factories.length; i++) {
    let f = factories[i];
    let cx = 20 + colW * i + colW / 2;
    let cost = getATC(f.qty);
    let isSelected = abs(qty - f.qty) < 50;

    // Factory box
    fill(isSelected ? 'lightyellow' : 'white');
    stroke(isSelected ? 'goldenrod' : 'silver');
    strokeWeight(isSelected ? 2 : 1);
    rect(20 + colW * i + 5, facY, colW - 10, 115, 5);

    // Factory icon (simplified)
    noStroke();
    fill(factories[i].icon === 'small' ? 'green' :
         factories[i].icon === 'medium' ? 'darkorange' : 'steelblue');
    let iconY = facY + 15;
    let iconSize = 10 + i * 8;
    rect(cx - iconSize / 2, iconY, iconSize, iconSize * 0.8, 2);
    // Chimney
    rect(cx + iconSize / 4, iconY - 6, 4, 6);

    // Text
    fill('black');
    textSize(12);
    textAlign(CENTER, TOP);
    noStroke();
    text(f.name, cx, iconY + iconSize * 0.8 + 5);

    textSize(10);
    fill('gray');
    text(f.qty + ' units', cx, iconY + iconSize * 0.8 + 20);
    text(f.workers + ' workers', cx, iconY + iconSize * 0.8 + 34);

    // Cost per unit
    fill(cost < getATC(factories[0].qty) ? 'green' : 'black');
    textSize(14);
    text('$' + nf(cost, 1, 0) + '/unit', cx, iconY + iconSize * 0.8 + 52);
  }

  // Current selection info
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, CENTER);
  text('At ' + qty + ' units: $' + nf(atc, 1, 2) + ' per unit', 70, drawHeight - 15);

  // Slider label
  noStroke();
  fill('black');
  textSize(defaultTextSize - 2);
  textAlign(LEFT, CENTER);
  text('Quantity: ' + qty, 10, drawHeight + 20);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  qtySlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
