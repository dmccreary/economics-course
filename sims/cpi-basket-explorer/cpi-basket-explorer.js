// CPI Market Basket Explorer MicroSim
// Adjust category price changes and see effect on overall CPI
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 160;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 130;
let defaultTextSize = 16;

// CPI categories with weights (approximate US CPI weights)
let categories = [
  { name: 'Housing',        weight: 0.33, change: 3,  color: 'steelblue' },
  { name: 'Transportation', weight: 0.17, change: 2,  color: 'darkorange' },
  { name: 'Food',           weight: 0.14, change: 2,  color: 'green' },
  { name: 'Medical',        weight: 0.09, change: 4,  color: 'crimson' },
  { name: 'Education',      weight: 0.07, change: 3,  color: 'purple' },
  { name: 'Recreation',     weight: 0.06, change: 1,  color: 'teal' },
  { name: 'Other',          weight: 0.14, change: 2,  color: 'gray' }
];

let sliders = [];
let presetSelect;

let presets = {
  'Normal': [3, 2, 2, 4, 3, 1, 2],
  'Oil Crisis': [3, 20, 5, 3, 3, 1, 4],
  'Housing Boom': [15, 3, 2, 4, 3, 1, 2],
  'Deflation': [-2, -3, -1, 1, 0, -2, -1],
  'Pandemic': [2, -5, 8, 6, 0, -3, 3]
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  let yStart = drawHeight + 5;
  let rowH = 20;

  // Sliders for each category
  for (let i = 0; i < categories.length; i++) {
    let sl = createSlider(-10, 20, categories[i].change, 1);
    sl.position(sliderLeftMargin, yStart + i * rowH);
    sl.size(canvasWidth - sliderLeftMargin - margin);
    sliders.push(sl);
  }

  // Preset selector
  presetSelect = createSelect();
  presetSelect.position(10, yStart + categories.length * rowH + 5);
  for (let key in presets) presetSelect.option(key);
  presetSelect.changed(() => {
    let vals = presets[presetSelect.value()];
    for (let i = 0; i < vals.length; i++) sliders[i].value(vals[i]);
  });
  presetSelect.style('font-size', '13px');

  describe('CPI market basket explorer showing how price changes in different categories affect the overall consumer price index', LABEL);
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
  let cpi = 0;
  for (let i = 0; i < categories.length; i++) {
    categories[i].change = sliders[i].value();
    cpi += categories[i].weight * categories[i].change;
  }

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('CPI Market Basket', canvasWidth / 2, 8);

  // Draw basket as weighted pie chart
  let pieX = canvasWidth * 0.33;
  let pieY = 185;
  let pieR = 120;
  let angle = -HALF_PI;

  for (let i = 0; i < categories.length; i++) {
    let sliceAngle = categories[i].weight * TWO_PI;
    fill(categories[i].color);
    noStroke();
    arc(pieX, pieY, pieR * 2, pieR * 2, angle, angle + sliceAngle, PIE);

    // Label inside if big enough
    if (sliceAngle > 0.3) {
      let labelAngle = angle + sliceAngle / 2;
      let lx = pieX + cos(labelAngle) * pieR * 0.6;
      let ly = pieY + sin(labelAngle) * pieR * 0.6;
      fill('white');
      textSize(10);
      textAlign(CENTER, CENTER);
      noStroke();
      text(categories[i].name, lx, ly - 6);
      text(nf(categories[i].weight * 100, 1, 0) + '%', lx, ly + 6);
    }
    angle += sliceAngle;
  }

  // CPI display
  let cpiX = canvasWidth * 0.72;
  let cpiY = 50;

  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Overall CPI', cpiX, cpiY);

  // CPI gauge
  let gaugeY = cpiY + 70;
  let gaugeR = 55;

  // Background arc
  stroke(220);
  strokeWeight(12);
  noFill();
  arc(cpiX, gaugeY, gaugeR * 2, gaugeR * 2, PI, TWO_PI);

  // Colored arc
  let cpiAngle = map(constrain(cpi, -5, 15), -5, 15, PI, TWO_PI);
  let cpiColor;
  if (cpi < 0) cpiColor = color('royalblue');
  else if (cpi < 2) cpiColor = color('green');
  else if (cpi < 4) cpiColor = color('gold');
  else if (cpi < 7) cpiColor = color('orange');
  else cpiColor = color('red');

  stroke(cpiColor);
  strokeWeight(12);
  arc(cpiX, gaugeY, gaugeR * 2, gaugeR * 2, PI, cpiAngle);

  // Value text
  noStroke();
  fill(cpiColor);
  textSize(28);
  textAlign(CENTER, CENTER);
  text(nf(cpi, 1, 1) + '%', cpiX, gaugeY + 5);

  // Label
  fill('black');
  textSize(12);
  text('Inflation Rate', cpiX, gaugeY + 28);

  // Gauge scale
  textSize(9);
  fill('gray');
  textAlign(LEFT, CENTER);
  text('-5%', cpiX - gaugeR - 5, gaugeY + 10);
  textAlign(RIGHT, CENTER);
  text('15%', cpiX + gaugeR + 5, gaugeY + 10);

  // Category impact breakdown (right side)
  let breakY = gaugeY + 55;
  textSize(12);
  textAlign(LEFT, TOP);
  noStroke();
  fill('black');
  text('Category Contributions:', cpiX - 60, breakY);
  breakY += 18;

  let barMaxW = 100;
  for (let i = 0; i < categories.length; i++) {
    let contrib = categories[i].weight * categories[i].change;
    let bx = cpiX - 60;

    fill(categories[i].color);
    textSize(10);
    textAlign(LEFT, CENTER);
    noStroke();
    text(categories[i].name, bx, breakY + 6);

    // Contribution bar
    let bw = map(abs(contrib), 0, 5, 0, barMaxW);
    let barX = bx + 80;
    fill(contrib >= 0 ? categories[i].color : 'royalblue');
    noStroke();
    rect(barX, breakY, bw * (contrib >= 0 ? 1 : -1), 10, 2);

    fill('black');
    textSize(9);
    textAlign(LEFT, CENTER);
    text(nf(contrib, 1, 1) + '%', barX + bw + 3, breakY + 6);
    breakY += 15;
  }

  // Slider labels
  noStroke();
  textSize(11);
  textAlign(LEFT, CENTER);
  let yStart = drawHeight + 5;
  let rowH = 20;
  for (let i = 0; i < categories.length; i++) {
    fill(categories[i].color);
    let sign = categories[i].change >= 0 ? '+' : '';
    text(categories[i].name + ' ' + sign + categories[i].change + '%', 5, yStart + i * rowH + 10);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  for (let i = 0; i < sliders.length; i++) {
    sliders[i].size(canvasWidth - sliderLeftMargin - margin);
  }
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
