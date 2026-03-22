// GDP Components Breakdown MicroSim
// Interactive pie chart showing GDP component proportions
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

let components = [
  { name: 'Consumption (C)', pct: 68, color: 'steelblue',
    desc: 'Household spending on goods and services', examples: 'Food, clothing, rent, healthcare, entertainment' },
  { name: 'Investment (I)', pct: 18, color: 'green',
    desc: 'Business spending on capital goods', examples: 'Factories, equipment, housing construction, inventory' },
  { name: 'Government (G)', pct: 17, color: 'darkorange',
    desc: 'Government purchases of goods and services', examples: 'Military, roads, schools, public salaries' },
  { name: 'Net Exports (NX)', pct: -3, color: 'crimson',
    desc: 'Exports minus imports (trade deficit)', examples: 'US imports more than it exports = negative NX' }
];

let selectedComponent = -1;
let countrySelect;

let countries = {
  'United States': [68, 18, 17, -3],
  'China': [54, 43, 16, -13],
  'Germany': [52, 21, 20, 7],
  'Japan': [55, 24, 20, 1]
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  countrySelect = createSelect();
  countrySelect.position(10, drawHeight + 10);
  for (let key in countries) countrySelect.option(key);
  countrySelect.changed(() => {
    let vals = countries[countrySelect.value()];
    for (let i = 0; i < components.length; i++) components[i].pct = vals[i];
    selectedComponent = -1;
  });
  countrySelect.style('font-size', '13px');

  describe('GDP components pie chart showing the relative size of consumption, investment, government spending, and net exports', LABEL);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('GDP Components Breakdown', canvasWidth / 2, 8);
  textSize(12);
  fill('gray');
  text(countrySelect.value() + ' — Click a slice for details', canvasWidth / 2, 30);

  // Pie chart
  let pieX = canvasWidth * 0.38;
  let pieY = 190;
  let pieR = 115;

  // Use absolute values for pie, but mark negative
  let absVals = components.map(c => max(1, abs(c.pct)));
  let total = absVals.reduce((s, v) => s + v, 0);

  let angle = -HALF_PI;
  let sliceAngles = [];

  for (let i = 0; i < components.length; i++) {
    let sliceAngle = (absVals[i] / total) * TWO_PI;
    let isSelected = selectedComponent === i;
    let offset = isSelected ? 8 : 0;
    let midAngle = angle + sliceAngle / 2;

    fill(components[i].color);
    noStroke();
    let ox = cos(midAngle) * offset;
    let oy = sin(midAngle) * offset;
    arc(pieX + ox, pieY + oy, pieR * 2, pieR * 2, angle, angle + sliceAngle, PIE);

    // Label inside slice
    if (sliceAngle > 0.4) {
      let lx = pieX + ox + cos(midAngle) * pieR * 0.6;
      let ly = pieY + oy + sin(midAngle) * pieR * 0.6;
      fill('white');
      textSize(12);
      textAlign(CENTER, CENTER);
      noStroke();
      text(abs(components[i].pct) + '%', lx, ly);
    }

    sliceAngles.push({ start: angle, end: angle + sliceAngle });
    angle += sliceAngle;
  }

  // Donut center
  fill('aliceblue');
  noStroke();
  circle(pieX, pieY, pieR * 0.5);
  fill('black');
  textSize(12);
  textAlign(CENTER, CENTER);
  text('GDP', pieX, pieY - 6);
  textSize(10);
  text('100%', pieX, pieY + 8);

  // Legend on right
  let legX = canvasWidth * 0.68;
  let legY = 60;
  textSize(11);
  textAlign(LEFT, CENTER);

  for (let i = 0; i < components.length; i++) {
    let c = components[i];
    let isSelected = selectedComponent === i;

    fill(c.color);
    noStroke();
    rect(legX, legY + i * 28, 14, 14, 2);

    fill(isSelected ? c.color : 'black');
    textSize(isSelected ? 12 : 11);
    let sign = c.pct < 0 ? '' : '';
    text(c.name, legX + 20, legY + i * 28 + 7);
    textSize(10);
    fill('gray');
    text(c.pct + '% of GDP', legX + 20, legY + i * 28 + 20);
  }

  // Detail panel
  if (selectedComponent >= 0) {
    let c = components[selectedComponent];
    let panelY = 310;

    fill(255, 255, 240);
    stroke(c.color);
    strokeWeight(2);
    rect(20, panelY, canvasWidth - 40, 70, 8);

    noStroke();
    fill(c.color);
    textSize(14);
    textAlign(LEFT, TOP);
    text(c.name + ' (' + c.pct + '%)', 30, panelY + 8);

    fill('black');
    textSize(11);
    text(c.desc, 30, panelY + 26);
    fill('gray');
    textSize(10);
    text('Examples: ' + c.examples, 30, panelY + 44);
  }
}

function mousePressed() {
  let pieX = canvasWidth * 0.38;
  let pieY = 190;
  let pieR = 115;

  if (dist(mouseX, mouseY, pieX, pieY) > pieR) return;

  let angle = atan2(mouseY - pieY, mouseX - pieX);
  if (angle < -HALF_PI) angle += TWO_PI;
  let normalAngle = angle + HALF_PI;
  if (normalAngle > TWO_PI) normalAngle -= TWO_PI;

  let absVals = components.map(c => max(1, abs(c.pct)));
  let total = absVals.reduce((s, v) => s + v, 0);
  let cumAngle = 0;

  for (let i = 0; i < components.length; i++) {
    let sliceAngle = (absVals[i] / total) * TWO_PI;
    if (normalAngle >= cumAngle && normalAngle < cumAngle + sliceAngle) {
      selectedComponent = selectedComponent === i ? -1 : i;
      return;
    }
    cumAngle += sliceAngle;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
