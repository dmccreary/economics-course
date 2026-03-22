// GDP Calculator MicroSim
// Expenditure approach: GDP = C + I + G + (X - M)
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 370;
let controlHeight = 110;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 100;
let defaultTextSize = 16;

// GDP components (trillions)
let components = [
  { name: 'C', fullName: 'Consumption', val: 17.5, min: 10, max: 25, color: 'steelblue' },
  { name: 'I', fullName: 'Investment', val: 4.5, min: 1, max: 10, color: 'green' },
  { name: 'G', fullName: 'Government', val: 4.0, min: 2, max: 8, color: 'darkorange' },
  { name: 'X', fullName: 'Exports', val: 2.5, min: 0.5, max: 6, color: 'purple' },
  { name: 'M', fullName: 'Imports', val: 3.5, min: 0.5, max: 7, color: 'crimson' }
];

let sliders = [];
let presetSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  for (let i = 0; i < components.length; i++) {
    let c = components[i];
    let sl = createSlider(c.min * 10, c.max * 10, c.val * 10, 1);
    sl.position(sliderLeftMargin, drawHeight + 5 + i * 20);
    sl.size(canvasWidth - sliderLeftMargin - margin);
    sliders.push(sl);
  }

  presetSelect = createSelect();
  presetSelect.position(10, drawHeight + 5 + components.length * 20 + 2);
  presetSelect.option('US 2024');
  presetSelect.option('Recession');
  presetSelect.option('Export Boom');
  presetSelect.changed(applyPreset);
  presetSelect.style('font-size', '12px');

  describe('GDP calculator using the expenditure approach: GDP equals consumption plus investment plus government spending plus net exports', LABEL);
}

function applyPreset() {
  let p = presetSelect.value();
  if (p === 'US 2024') { setVals([17.5, 4.5, 4.0, 2.5, 3.5]); }
  else if (p === 'Recession') { setVals([14.0, 2.5, 4.5, 2.0, 2.5]); }
  else if (p === 'Export Boom') { setVals([17.5, 5.0, 4.0, 5.0, 3.0]); }
}

function setVals(vals) {
  for (let i = 0; i < vals.length; i++) sliders[i].value(vals[i] * 10);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Read sliders
  for (let i = 0; i < components.length; i++) {
    components[i].val = sliders[i].value() / 10;
  }

  let C = components[0].val;
  let I = components[1].val;
  let G = components[2].val;
  let X = components[3].val;
  let M = components[4].val;
  let netExports = X - M;
  let GDP = C + I + G + netExports;

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('GDP Calculator', canvasWidth / 2, 8);

  // Formula
  textSize(13);
  fill('gray');
  text('GDP = C + I + G + (X − M)', canvasWidth / 2, 30);

  // Calculation display
  textSize(14);
  fill('black');
  textAlign(CENTER, TOP);
  let formula = nf(C, 1, 1) + ' + ' + nf(I, 1, 1) + ' + ' + nf(G, 1, 1) + ' + (' + nf(X, 1, 1) + ' − ' + nf(M, 1, 1) + ')';
  text(formula, canvasWidth / 2, 48);

  // GDP result
  textSize(28);
  fill(GDP > 0 ? 'darkblue' : 'red');
  text('GDP = $' + nf(GDP, 1, 1) + 'T', canvasWidth / 2, 68);

  // Stacked bar chart
  let barX = 40;
  let barW = canvasWidth - 80;
  let barY = 110;
  let barH = 40;
  let total = C + I + G + max(0, netExports);

  // Positive components
  let xOff = barX;
  let posComps = [
    { name: 'C', val: C, color: components[0].color },
    { name: 'I', val: I, color: components[1].color },
    { name: 'G', val: G, color: components[2].color }
  ];
  if (netExports > 0) posComps.push({ name: 'NX', val: netExports, color: 'teal' });

  for (let c of posComps) {
    let w = (c.val / total) * barW;
    fill(c.color);
    noStroke();
    rect(xOff, barY, w, barH);
    if (w > 25) {
      fill('white');
      textSize(11);
      textAlign(CENTER, CENTER);
      text(c.name, xOff + w / 2, barY + barH / 2 - 6);
      textSize(9);
      text(nf(c.val / GDP * 100, 1, 0) + '%', xOff + w / 2, barY + barH / 2 + 8);
    }
    xOff += w;
  }

  if (netExports < 0) {
    fill('crimson');
    noStroke();
    let nxW = (abs(netExports) / total) * barW * 0.5;
    rect(xOff, barY, nxW, barH);
    fill('white');
    textSize(9);
    textAlign(CENTER, CENTER);
    text('NX: ' + nf(netExports, 1, 1), xOff + nxW / 2, barY + barH / 2);
  }

  stroke('black');
  strokeWeight(1);
  noFill();
  rect(barX, barY, barW, barH);

  // Pie chart
  let pieX = canvasWidth / 2;
  let pieY = 230;
  let pieR = 70;

  let angle = -HALF_PI;
  let pieData = [
    { name: 'Consumption', val: C, color: components[0].color },
    { name: 'Investment', val: I, color: components[1].color },
    { name: 'Government', val: G, color: components[2].color },
    { name: 'Net Exports', val: max(0.1, abs(netExports)), color: netExports >= 0 ? 'teal' : 'crimson' }
  ];
  let pieTotal = pieData.reduce((s, d) => s + d.val, 0);

  for (let d of pieData) {
    let sliceAngle = (d.val / pieTotal) * TWO_PI;
    fill(d.color);
    noStroke();
    arc(pieX, pieY, pieR * 2, pieR * 2, angle, angle + sliceAngle, PIE);
    angle += sliceAngle;
  }

  // Legend
  let legX = canvasWidth - 160;
  let legY = 175;
  textSize(10);
  textAlign(LEFT, CENTER);
  for (let i = 0; i < pieData.length; i++) {
    fill(pieData[i].color);
    noStroke();
    rect(legX, legY + i * 16, 10, 10, 2);
    fill('black');
    text(pieData[i].name + ': $' + nf(pieData[i].val, 1, 1) + 'T', legX + 14, legY + i * 16 + 5);
  }

  // Net exports note
  noStroke();
  fill(netExports >= 0 ? 'green' : 'red');
  textSize(11);
  textAlign(CENTER, TOP);
  text('Net Exports (X−M): ' + (netExports >= 0 ? '+' : '') + '$' + nf(netExports, 1, 1) + 'T', canvasWidth / 2, 310);

  // Slider labels
  noStroke();
  fill('black');
  textSize(11);
  textAlign(LEFT, CENTER);
  for (let i = 0; i < components.length; i++) {
    fill(components[i].color);
    text(components[i].name + ': $' + nf(components[i].val, 1, 1) + 'T', 5, drawHeight + 15 + i * 20);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  for (let sl of sliders) sl.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
