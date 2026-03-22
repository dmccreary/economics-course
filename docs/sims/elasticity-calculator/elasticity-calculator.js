// Elasticity Calculator MicroSim
// Calculate price elasticity of demand with visual feedback
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

let price1Slider, price2Slider, qty1Slider, qty2Slider;
let presetSelect;

let presets = {
  'Custom': { p1: 5, p2: 6, q1: 100, q2: 85 },
  'Gasoline': { p1: 3, p2: 4, q1: 100, q2: 95 },
  'Movie Tickets': { p1: 10, p2: 15, q1: 100, q2: 60 },
  'Insulin': { p1: 50, p2: 75, q1: 100, q2: 98 },
  'Restaurant Meals': { p1: 15, p2: 20, q1: 100, q2: 70 }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  price1Slider = createSlider(1, 100, 5, 1);
  price1Slider.position(sliderLeftMargin, drawHeight + 5);
  price1Slider.size((canvasWidth - sliderLeftMargin - margin) / 2 - 10);

  price2Slider = createSlider(1, 100, 6, 1);
  price2Slider.position(canvasWidth / 2 + 50, drawHeight + 5);
  price2Slider.size((canvasWidth - sliderLeftMargin - margin) / 2 - 10);

  qty1Slider = createSlider(1, 200, 100, 1);
  qty1Slider.position(sliderLeftMargin, drawHeight + 30);
  qty1Slider.size((canvasWidth - sliderLeftMargin - margin) / 2 - 10);

  qty2Slider = createSlider(1, 200, 85, 1);
  qty2Slider.position(canvasWidth / 2 + 50, drawHeight + 30);
  qty2Slider.size((canvasWidth - sliderLeftMargin - margin) / 2 - 10);

  presetSelect = createSelect();
  presetSelect.position(10, drawHeight + 55);
  for (let key in presets) presetSelect.option(key);
  presetSelect.changed(applyPreset);
  presetSelect.style('font-size', '13px');

  describe('Price elasticity of demand calculator showing step-by-step calculation with visual demand curve', LABEL);
}

function applyPreset() {
  let p = presets[presetSelect.value()];
  price1Slider.value(p.p1);
  price2Slider.value(p.p2);
  qty1Slider.value(p.q1);
  qty2Slider.value(p.q2);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let p1 = price1Slider.value();
  let p2 = price2Slider.value();
  let q1 = qty1Slider.value();
  let q2 = qty2Slider.value();

  // Calculate elasticity (midpoint method)
  let pctChangeQ = (q2 - q1) / ((q1 + q2) / 2) * 100;
  let pctChangeP = (p2 - p1) / ((p1 + p2) / 2) * 100;
  let elasticity = pctChangeP !== 0 ? abs(pctChangeQ / pctChangeP) : 0;

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Elasticity Calculator', canvasWidth / 2, 8);

  // Mini demand curve graph
  let gLeft = 60;
  let gRight = canvasWidth * 0.45;
  let gTop = 45;
  let gBottom = 200;

  stroke('black');
  strokeWeight(1.5);
  line(gLeft, gTop, gLeft, gBottom);
  line(gLeft, gBottom, gRight, gBottom);

  noStroke();
  fill('black');
  textSize(10);
  textAlign(CENTER, TOP);
  text('Q', (gLeft + gRight) / 2, gBottom + 2);
  push();
  translate(gLeft - 25, (gTop + gBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('P', 0, 0);
  pop();

  // Plot demand line through two points
  let maxP = max(p1, p2) * 1.5;
  let maxQ = max(q1, q2) * 1.5;
  let x1 = map(q1, 0, maxQ, gLeft, gRight);
  let y1 = map(p1, 0, maxP, gBottom, gTop);
  let x2 = map(q2, 0, maxQ, gLeft, gRight);
  let y2 = map(p2, 0, maxP, gBottom, gTop);

  // Extend the line
  stroke('steelblue');
  strokeWeight(2);
  let dx = x2 - x1;
  let dy = y2 - y1;
  let extend = 3;
  line(x1 - dx * extend, y1 - dy * extend, x2 + dx * extend, y2 + dy * extend);

  // Clip to graph area
  // Points
  fill('red');
  stroke('white');
  strokeWeight(2);
  circle(x1, y1, 12);
  circle(x2, y2, 12);

  // Labels
  noStroke();
  fill('black');
  textSize(10);
  textAlign(LEFT, CENTER);
  text('($' + p1 + ', ' + q1 + ')', x1 + 8, y1);
  text('($' + p2 + ', ' + q2 + ')', x2 + 8, y2);

  // Arrows showing changes
  stroke('green');
  strokeWeight(1.5);
  // Price change arrow
  line(gLeft - 10, y1, gLeft - 10, y2);
  line(gLeft - 10, y2, gLeft - 7, y2 + (y1 > y2 ? 5 : -5));
  // Qty change arrow
  line(x1, gBottom + 10, x2, gBottom + 10);
  line(x2, gBottom + 10, x2 + (x1 > x2 ? 5 : -5), gBottom + 7);

  // Elasticity gauge (right side)
  let gaugeX = canvasWidth * 0.72;
  let gaugeY = 60;

  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Elasticity', gaugeX, gaugeY);

  // Meter
  let meterY = gaugeY + 70;
  let meterR = 50;

  // Background arcs
  let segments = [
    { min: 0, max: 0.5, color: 'red', label: 'Very\nInelastic' },
    { min: 0.5, max: 1.0, color: 'orange', label: 'Inelastic' },
    { min: 1.0, max: 1.5, color: 'gold', label: 'Unit' },
    { min: 1.5, max: 3.0, color: 'yellowgreen', label: 'Elastic' },
    { min: 3.0, max: 5.0, color: 'green', label: 'Very\nElastic' }
  ];

  for (let s of segments) {
    let a1 = map(s.min, 0, 5, PI, TWO_PI);
    let a2 = map(s.max, 0, 5, PI, TWO_PI);
    stroke(s.color);
    strokeWeight(12);
    noFill();
    arc(gaugeX, meterY, meterR * 2, meterR * 2, a1, a2);
  }

  // Needle
  let needleAngle = map(constrain(elasticity, 0, 5), 0, 5, PI, TWO_PI);
  stroke('black');
  strokeWeight(2);
  let nx = gaugeX + cos(needleAngle) * (meterR - 15);
  let ny = meterY + sin(needleAngle) * (meterR - 15);
  line(gaugeX, meterY, nx, ny);
  fill('black');
  noStroke();
  circle(gaugeX, meterY, 8);

  // Value
  textSize(22);
  textAlign(CENTER, CENTER);
  fill('black');
  text(nf(elasticity, 1, 2), gaugeX, meterY + 20);

  // Classification
  let classification;
  if (elasticity < 0.5) classification = 'Perfectly Inelastic';
  else if (elasticity < 1.0) classification = 'Inelastic';
  else if (abs(elasticity - 1.0) < 0.05) classification = 'Unit Elastic';
  else if (elasticity < 3.0) classification = 'Elastic';
  else classification = 'Highly Elastic';

  textSize(13);
  fill('gray');
  text(classification, gaugeX, meterY + 40);

  // Step-by-step calculation
  let calcY = 220;
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, TOP);
  text('Step-by-Step Calculation:', 20, calcY);

  textSize(11);
  calcY += 20;
  text('1. % Change in Q = (' + q2 + ' - ' + q1 + ') / ' + nf((q1 + q2) / 2, 1, 1) + ' = ' + nf(pctChangeQ, 1, 1) + '%', 30, calcY);
  calcY += 18;
  text('2. % Change in P = ($' + p2 + ' - $' + p1 + ') / $' + nf((p1 + p2) / 2, 1, 2) + ' = ' + nf(pctChangeP, 1, 1) + '%', 30, calcY);
  calcY += 18;
  text('3. Ed = |' + nf(pctChangeQ, 1, 1) + '% / ' + nf(pctChangeP, 1, 1) + '%| = ' + nf(elasticity, 1, 2), 30, calcY);
  calcY += 22;

  // Interpretation
  fill('darkblue');
  textSize(12);
  if (elasticity < 1) {
    text('A 1% price increase → only ' + nf(elasticity, 1, 2) + '% decrease in demand', 30, calcY);
    calcY += 16;
    text('Consumers have few substitutes—they NEED this product', 30, calcY);
  } else if (abs(elasticity - 1) < 0.1) {
    text('A 1% price increase → exactly 1% decrease in demand', 30, calcY);
    calcY += 16;
    text('Revenue stays the same regardless of price changes', 30, calcY);
  } else {
    text('A 1% price increase → ' + nf(elasticity, 1, 2) + '% decrease in demand', 30, calcY);
    calcY += 16;
    text('Consumers easily switch to substitutes—demand is sensitive', 30, calcY);
  }

  // Slider labels
  noStroke();
  fill('black');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Price: $' + p1 + ' → $' + p2, 10, drawHeight + 15);
  text('Qty: ' + q1 + ' → ' + q2, 10, drawHeight + 40);
  textAlign(CENTER, CENTER);
  text('Before', sliderLeftMargin + 30, drawHeight + 2);
  text('After', canvasWidth / 2 + 80, drawHeight + 2);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  let halfW = (canvasWidth - sliderLeftMargin - margin) / 2 - 10;
  price1Slider.size(halfW);
  price2Slider.position(canvasWidth / 2 + 50, drawHeight + 5);
  price2Slider.size(halfW);
  qty1Slider.size(halfW);
  qty2Slider.position(canvasWidth / 2 + 50, drawHeight + 30);
  qty2Slider.size(halfW);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
