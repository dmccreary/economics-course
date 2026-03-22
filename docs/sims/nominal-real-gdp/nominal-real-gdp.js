// Nominal vs Real GDP Comparison MicroSim
// Shows how inflation inflates nominal GDP and why real GDP matters
// Demonstrates the GDP deflator concept

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 135;

// Parameters
let inflationRate = 3;
let realGrowthRate = 2;
let numYears = 5;
let baseYear = 2021;
let baseGDP = 20; // trillions
let showMath = false;

// Controls
let inflationSlider, growthSlider;
let yearSlider;
let mathBtn, resetBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  inflationSlider = createSlider(0, 100, inflationRate * 10, 5);
  inflationSlider.position(sliderLeftMargin, drawHeight + 8);
  inflationSlider.size(canvasWidth - sliderLeftMargin - margin);

  growthSlider = createSlider(0, 50, realGrowthRate * 10, 5);
  growthSlider.position(sliderLeftMargin, drawHeight + 32);
  growthSlider.size(canvasWidth - sliderLeftMargin - margin);

  yearSlider = createSlider(2, 10, numYears, 1);
  yearSlider.position(sliderLeftMargin, drawHeight + 56);
  yearSlider.size(canvasWidth - sliderLeftMargin - margin);

  mathBtn = createButton('Show the Math');
  mathBtn.position(10, drawHeight + 82);
  mathBtn.mousePressed(() => { showMath = !showMath; });
  mathBtn.style('font-size', '12px');

  resetBtn = createButton('Reset');
  resetBtn.position(120, drawHeight + 82);
  resetBtn.mousePressed(() => {
    inflationSlider.value(30);
    growthSlider.value(20);
    yearSlider.value(5);
  });
  resetBtn.style('font-size', '12px');

  describe('Nominal versus real GDP comparison showing how inflation distorts economic measurement', LABEL);
}

function draw() {
  inflationRate = inflationSlider.value() / 10;
  realGrowthRate = growthSlider.value() / 10;
  numYears = yearSlider.value();

  // Calculate GDP data
  let nominalGDPs = [];
  let realGDPs = [];
  let years = [];

  for (let i = 0; i <= numYears; i++) {
    let year = baseYear + i;
    years.push(year);
    let nomGDP = baseGDP * pow(1 + (realGrowthRate + inflationRate) / 100, i);
    let realGDP = baseGDP * pow(1 + realGrowthRate / 100, i);
    nominalGDPs.push(nomGDP);
    realGDPs.push(realGDP);
  }

  // Draw regions
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(16);
  text('Nominal vs Real GDP', canvasWidth / 2, 6);

  // Warning if inflation > real growth
  if (inflationRate > realGrowthRate) {
    fill('red');
    textSize(10);
    text('Nominal growth is mostly an illusion!', canvasWidth / 2, 24);
  } else {
    fill('gray');
    textSize(10);
    text('Side-by-side comparison over ' + numYears + ' years', canvasWidth / 2, 24);
  }

  // Chart dimensions
  let chartTop = 50;
  let chartBottom = drawHeight - 90;
  let chartH = chartBottom - chartTop;
  let chartLeftA = 50; // Nominal chart left
  let halfW = (canvasWidth - 80) / 2;
  let chartLeftB = chartLeftA + halfW + 30; // Real chart left
  let barAreaW = halfW - 10;

  // Max value for both charts (use same scale)
  let maxVal = max(nominalGDPs[numYears], realGDPs[numYears]) * 1.1;

  // Draw both chart areas
  // Chart labels
  noStroke();
  textSize(13);
  textAlign(CENTER, TOP);
  fill('orangered');
  text('Nominal GDP', chartLeftA + barAreaW / 2, chartTop - 14);
  fill('steelblue');
  text('Real GDP', chartLeftB + barAreaW / 2, chartTop - 14);

  // Draw bars for each year
  let barW = min(30, (barAreaW - 10) / (numYears + 1) - 2);

  for (let i = 0; i <= numYears; i++) {
    // Nominal bar
    let nomH = (nominalGDPs[i] / maxVal) * chartH;
    let nomX = chartLeftA + i * (barW + 2) + 5;
    let nomY = chartBottom - nomH;

    // Color: show inflation portion differently
    let realH = (realGDPs[i] / maxVal) * chartH;
    let inflationH = nomH - realH;

    // Real portion of nominal bar
    fill('steelblue');
    noStroke();
    rect(nomX, chartBottom - realH, barW, realH);
    // Inflation portion
    fill('orangered');
    rect(nomX, chartBottom - nomH, barW, inflationH);

    // Real bar
    let realX = chartLeftB + i * (barW + 2) + 5;
    fill('steelblue');
    rect(realX, chartBottom - realH, barW, realH);

    // Year labels
    fill('black');
    textSize(8);
    textAlign(CENTER, TOP);
    noStroke();
    text(years[i], nomX + barW / 2, chartBottom + 2);
    text(years[i], realX + barW / 2, chartBottom + 2);
  }

  // Axes
  stroke('black');
  strokeWeight(1);
  line(chartLeftA, chartBottom, chartLeftA + barAreaW, chartBottom);
  line(chartLeftA, chartTop, chartLeftA, chartBottom);
  line(chartLeftB, chartBottom, chartLeftB + barAreaW, chartBottom);
  line(chartLeftB, chartTop, chartLeftB, chartBottom);

  // Y-axis ticks
  noStroke();
  fill('gray');
  textSize(8);
  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 4; i++) {
    let v = maxVal * i / 4;
    let y = map(v, 0, maxVal, chartBottom, chartTop);
    stroke('lightgray');
    strokeWeight(0.5);
    line(chartLeftA, y, chartLeftA + barAreaW, y);
    line(chartLeftB, y, chartLeftB + barAreaW, y);
    noStroke();
    fill('gray');
    text('$' + nf(v, 1, 0) + 'T', chartLeftA - 3, y);
  }

  // Legend
  noStroke();
  let legY = chartBottom + 16;
  textSize(10);
  textAlign(LEFT, CENTER);
  fill('steelblue');
  rect(chartLeftA, legY, 10, 10);
  fill('black');
  text('Real Growth', chartLeftA + 14, legY + 5);
  fill('orangered');
  rect(chartLeftA + 90, legY, 10, 10);
  fill('black');
  text('Inflation Effect', chartLeftA + 104, legY + 5);

  // Summary stats
  let finalNominal = nominalGDPs[numYears];
  let finalReal = realGDPs[numYears];
  let nomGrowthPct = ((finalNominal - baseGDP) / baseGDP) * 100;
  let realGrowthPct = ((finalReal - baseGDP) / baseGDP) * 100;
  let inflationEffect = nomGrowthPct - realGrowthPct;

  let summY = chartBottom + 32;
  noStroke();
  textSize(11);
  textAlign(CENTER, TOP);

  fill('orangered');
  text('Nominal: $' + nf(baseGDP, 1, 0) + 'T -> $' + nf(finalNominal, 1, 1) + 'T (+' + nf(nomGrowthPct, 1, 1) + '%)', canvasWidth / 2, summY);
  fill('steelblue');
  text('Real: $' + nf(baseGDP, 1, 0) + 'T -> $' + nf(finalReal, 1, 1) + 'T (+' + nf(realGrowthPct, 1, 1) + '%)', canvasWidth / 2, summY + 16);

  // Truth meter
  let truthY = summY + 36;
  let truthW = canvasWidth - 100;
  let truthX = 50;

  noStroke();
  fill('black');
  textSize(10);
  textAlign(CENTER, TOP);
  text('How much nominal growth is real?', canvasWidth / 2, truthY);

  let meterY = truthY + 14;
  fill('lightgray');
  rect(truthX, meterY, truthW, 12, 4);

  let realPortion = nomGrowthPct > 0 ? (realGrowthPct / nomGrowthPct) : 1;
  realPortion = constrain(realPortion, 0, 1);
  fill('steelblue');
  rect(truthX, meterY, truthW * realPortion, 12, 4);
  fill('orangered');
  rect(truthX + truthW * realPortion, meterY, truthW * (1 - realPortion), 12, 4);

  fill('white');
  textSize(8);
  textAlign(CENTER, CENTER);
  text(nf(realPortion * 100, 1, 0) + '% Real', truthX + truthW / 2, meterY + 6);

  // Show math overlay
  if (showMath) {
    fill(255, 255, 255, 240);
    noStroke();
    rect(canvasWidth / 2 - 160, 70, 320, 120, 8);
    stroke('steelblue');
    strokeWeight(2);
    noFill();
    rect(canvasWidth / 2 - 160, 70, 320, 120, 8);

    noStroke();
    fill('black');
    textSize(13);
    textAlign(CENTER, TOP);
    text('GDP Deflator Calculation', canvasWidth / 2, 78);

    textSize(11);
    fill('darkblue');
    text('Real GDP = Nominal GDP / Price Level', canvasWidth / 2, 98);

    let priceLevel = pow(1 + inflationRate / 100, numYears);
    textSize(11);
    fill('black');
    text('After ' + numYears + ' years at ' + nf(inflationRate, 1, 1) + '% inflation:', canvasWidth / 2, 118);
    text('Price Level = ' + nf(priceLevel, 1, 3), canvasWidth / 2, 134);
    text('$' + nf(finalNominal, 1, 1) + 'T / ' + nf(priceLevel, 1, 3) + ' = $' + nf(finalReal, 1, 1) + 'T Real GDP', canvasWidth / 2, 150);

    fill('red');
    textSize(10);
    text('Inflation made GDP look $' + nf(finalNominal - finalReal, 1, 1) + 'T bigger than it really grew!', canvasWidth / 2, 170);
  }

  // Control labels
  noStroke();
  fill('black');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Inflation: ' + nf(inflationRate, 1, 1) + '%', 10, drawHeight + 16);
  text('Real Growth: ' + nf(realGrowthRate, 1, 1) + '%', 10, drawHeight + 40);
  text('Years: ' + numYears, 10, drawHeight + 64);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  inflationSlider.size(canvasWidth - sliderLeftMargin - margin);
  growthSlider.size(canvasWidth - sliderLeftMargin - margin);
  yearSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasHeight = drawHeight + controlHeight;
}
