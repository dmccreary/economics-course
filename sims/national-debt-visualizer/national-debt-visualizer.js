// National Debt Visualizer MicroSim
// Shows US national debt in three views: Absolute, Per Capita, and Debt-to-GDP ratio
// Historical data from 1940 to present with key event markers

let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 110;

// Historical data (selected years)
let debtData = [
  { year: 1940, debt: 0.043, gdp: 0.101, pop: 132 },
  { year: 1945, debt: 0.259, gdp: 0.228, pop: 140 },
  { year: 1950, debt: 0.257, gdp: 0.300, pop: 152 },
  { year: 1955, debt: 0.274, gdp: 0.415, pop: 166 },
  { year: 1960, debt: 0.286, gdp: 0.543, pop: 181 },
  { year: 1965, debt: 0.317, gdp: 0.743, pop: 194 },
  { year: 1970, debt: 0.371, gdp: 1.073, pop: 205 },
  { year: 1975, debt: 0.533, gdp: 1.684, pop: 216 },
  { year: 1980, debt: 0.908, gdp: 2.857, pop: 227 },
  { year: 1985, debt: 1.823, gdp: 4.339, pop: 238 },
  { year: 1990, debt: 3.233, gdp: 5.963, pop: 250 },
  { year: 1995, debt: 4.974, gdp: 7.640, pop: 266 },
  { year: 2000, debt: 5.674, gdp: 10.25, pop: 282 },
  { year: 2005, debt: 7.933, gdp: 13.04, pop: 296 },
  { year: 2008, debt: 10.02, gdp: 14.72, pop: 304 },
  { year: 2010, debt: 13.56, gdp: 15.05, pop: 310 },
  { year: 2015, debt: 18.15, gdp: 18.22, pop: 321 },
  { year: 2020, debt: 27.75, gdp: 21.06, pop: 331 },
  { year: 2024, debt: 34.00, gdp: 28.78, pop: 336 }
];

// Historical events
let events = [
  { year: 1945, label: 'WWII End' },
  { year: 1985, label: 'Reagan Era' },
  { year: 2000, label: 'Surpluses' },
  { year: 2008, label: '2008 Crisis' },
  { year: 2020, label: 'COVID' }
];

// Controls
let viewSelect;
let showEventsCheckbox;
let yearStartSlider, yearEndSlider;

let viewMode = 'Absolute';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  viewSelect = createSelect();
  viewSelect.position(sliderLeftMargin, drawHeight + 8);
  viewSelect.option('Absolute');
  viewSelect.option('Per Capita');
  viewSelect.option('% of GDP');
  viewSelect.changed(() => { viewMode = viewSelect.value(); });
  viewSelect.style('font-size', '12px');

  yearStartSlider = createSlider(1940, 2024, 1940, 5);
  yearStartSlider.position(sliderLeftMargin, drawHeight + 35);
  yearStartSlider.size(canvasWidth - sliderLeftMargin - margin);

  yearEndSlider = createSlider(1940, 2024, 2024, 5);
  yearEndSlider.position(sliderLeftMargin, drawHeight + 58);
  yearEndSlider.size(canvasWidth - sliderLeftMargin - margin);

  showEventsCheckbox = createCheckbox('Show Events', true);
  showEventsCheckbox.position(10, drawHeight + 80);
  showEventsCheckbox.style('font-size', '12px');

  describe('National debt visualizer showing debt in absolute dollars, per capita, and as percentage of GDP', LABEL);
}

function getDataValue(d) {
  if (viewMode === 'Absolute') return d.debt;
  if (viewMode === 'Per Capita') return (d.debt * 1e6) / d.pop; // millions per million people = thousands per person
  if (viewMode === '% of GDP') return (d.debt / d.gdp) * 100;
  return d.debt;
}

function getYLabel() {
  if (viewMode === 'Absolute') return 'Debt ($ Trillions)';
  if (viewMode === 'Per Capita') return 'Debt per Person ($K)';
  if (viewMode === '% of GDP') return 'Debt-to-GDP (%)';
  return '';
}

function formatValue(v) {
  if (viewMode === 'Absolute') return '$' + nf(v, 1, 1) + 'T';
  if (viewMode === 'Per Capita') return '$' + nf(v, 1, 0) + 'K';
  if (viewMode === '% of GDP') return nf(v, 1, 0) + '%';
  return '' + v;
}

function draw() {
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let startYear = yearStartSlider.value();
  let endYear = yearEndSlider.value();
  if (endYear <= startYear) endYear = startYear + 5;

  // Filter data
  let filtered = debtData.filter(d => d.year >= startYear && d.year <= endYear);
  if (filtered.length < 2) {
    noStroke();
    fill('gray');
    textSize(14);
    textAlign(CENTER, CENTER);
    text('Adjust year range to see data', canvasWidth / 2, drawHeight / 2);
    drawControlLabels(startYear, endYear);
    return;
  }

  // Title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(16);
  text('US National Debt: ' + viewMode + ' View', canvasWidth / 2, 8);

  // Insight text
  textSize(10);
  fill('gray');
  if (viewMode === 'Absolute') text('Absolute dollars look scariest but lack context', canvasWidth / 2, 26);
  else if (viewMode === 'Per Capita') text('Debt per person adjusts for population growth', canvasWidth / 2, 26);
  else if (viewMode === '% of GDP') text('Debt-to-GDP is the most meaningful measure', canvasWidth / 2, 26);

  // Chart area
  let chartLeft = 65;
  let chartRight = canvasWidth - 20;
  let chartTop = 45;
  let chartBottom = drawHeight - 30;
  let chartW = chartRight - chartLeft;
  let chartH = chartBottom - chartTop;

  // Get values
  let values = filtered.map(d => getDataValue(d));
  let maxVal = max(values) * 1.15;
  let minVal = 0;

  // Axes
  stroke('black');
  strokeWeight(1);
  line(chartLeft, chartBottom, chartRight, chartBottom);
  line(chartLeft, chartTop, chartLeft, chartBottom);

  // Y-axis label
  noStroke();
  fill('black');
  textSize(10);
  push();
  translate(12, (chartTop + chartBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, TOP);
  text(getYLabel(), 0, 0);
  pop();

  // Y-axis ticks
  textAlign(RIGHT, CENTER);
  textSize(9);
  let numTicks = 5;
  for (let i = 0; i <= numTicks; i++) {
    let v = minVal + (maxVal - minVal) * i / numTicks;
    let y = map(v, minVal, maxVal, chartBottom, chartTop);
    stroke('lightgray');
    strokeWeight(0.5);
    line(chartLeft, y, chartRight, y);
    noStroke();
    fill('gray');
    if (viewMode === 'Absolute') text(nf(v, 1, 0), chartLeft - 4, y);
    else if (viewMode === 'Per Capita') text(nf(v, 1, 0) + 'K', chartLeft - 4, y);
    else text(nf(v, 1, 0) + '%', chartLeft - 4, y);
  }

  // Draw filled area chart
  let yearMin = filtered[0].year;
  let yearMax = filtered[filtered.length - 1].year;

  // Fill
  fill(70, 130, 200, 80);
  noStroke();
  beginShape();
  vertex(map(filtered[0].year, yearMin, yearMax, chartLeft, chartRight), chartBottom);
  for (let d of filtered) {
    let x = map(d.year, yearMin, yearMax, chartLeft, chartRight);
    let y = map(getDataValue(d), minVal, maxVal, chartBottom, chartTop);
    vertex(x, y);
  }
  vertex(map(filtered[filtered.length - 1].year, yearMin, yearMax, chartLeft, chartRight), chartBottom);
  endShape(CLOSE);

  // Line
  stroke('steelblue');
  strokeWeight(2);
  noFill();
  beginShape();
  for (let d of filtered) {
    let x = map(d.year, yearMin, yearMax, chartLeft, chartRight);
    let y = map(getDataValue(d), minVal, maxVal, chartBottom, chartTop);
    vertex(x, y);
  }
  endShape();

  // Data points
  for (let d of filtered) {
    let x = map(d.year, yearMin, yearMax, chartLeft, chartRight);
    let y = map(getDataValue(d), minVal, maxVal, chartBottom, chartTop);
    fill('steelblue');
    noStroke();
    circle(x, y, 6);
  }

  // X-axis year labels
  noStroke();
  fill('black');
  textSize(9);
  textAlign(CENTER, TOP);
  let labelStep = max(1, floor(filtered.length / 8));
  for (let i = 0; i < filtered.length; i += labelStep) {
    let x = map(filtered[i].year, yearMin, yearMax, chartLeft, chartRight);
    text(filtered[i].year, x, chartBottom + 3);
  }
  // Always show last year
  let lastX = map(filtered[filtered.length - 1].year, yearMin, yearMax, chartLeft, chartRight);
  text(filtered[filtered.length - 1].year, lastX, chartBottom + 3);

  // Event markers
  if (showEventsCheckbox.checked()) {
    for (let ev of events) {
      if (ev.year >= yearMin && ev.year <= yearMax) {
        let x = map(ev.year, yearMin, yearMax, chartLeft, chartRight);
        stroke('red');
        strokeWeight(1);
        line(x, chartTop, x, chartBottom);
        noStroke();
        fill('red');
        textSize(9);
        textAlign(CENTER, BOTTOM);
        text(ev.label, x, chartTop - 2);
      }
    }
  }

  // Hover: show value for nearest point
  if (mouseX > chartLeft && mouseX < chartRight && mouseY > chartTop && mouseY < chartBottom) {
    let hoverYear = map(mouseX, chartLeft, chartRight, yearMin, yearMax);
    let closest = filtered.reduce((a, b) => abs(a.year - hoverYear) < abs(b.year - hoverYear) ? a : b);
    let cx = map(closest.year, yearMin, yearMax, chartLeft, chartRight);
    let cy = map(getDataValue(closest), minVal, maxVal, chartBottom, chartTop);

    fill('yellow');
    stroke('black');
    strokeWeight(1);
    circle(cx, cy, 10);

    noStroke();
    fill('black');
    textSize(11);
    textAlign(LEFT, BOTTOM);
    let tip = closest.year + ': ' + formatValue(getDataValue(closest));
    let tipX = cx + 8;
    if (tipX + 100 > chartRight) tipX = cx - 110;
    text(tip, tipX, cy - 4);
  }

  // Latest value highlight
  let latest = filtered[filtered.length - 1];
  noStroke();
  fill('darkblue');
  textSize(13);
  textAlign(RIGHT, TOP);
  text('Latest: ' + formatValue(getDataValue(latest)), canvasWidth - 10, 42);

  drawControlLabels(startYear, endYear);
}

function drawControlLabels(startYear, endYear) {
  noStroke();
  fill('black');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('View:', 10, drawHeight + 16);
  text('Start Year: ' + startYear, 10, drawHeight + 43);
  text('End Year: ' + endYear, 10, drawHeight + 66);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  yearStartSlider.size(canvasWidth - sliderLeftMargin - margin);
  yearEndSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasHeight = drawHeight + controlHeight;
}
