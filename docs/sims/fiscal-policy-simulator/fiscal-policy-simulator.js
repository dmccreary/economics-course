// Fiscal Policy Impact Simulator MicroSim
// Adjust government spending and taxes, see economic outcomes
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

let spendingSlider, taxSlider;
let conditionSelect;

// Base economic values
let baseGDP = 100;
let baseUnemploy = 5;
let baseInflation = 2.5;
let baseDebt = 80;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  conditionSelect = createSelect();
  conditionSelect.position(10, drawHeight + 5);
  conditionSelect.option('Recession');
  conditionSelect.option('Normal');
  conditionSelect.option('Overheating');
  conditionSelect.selected('Normal');
  conditionSelect.style('font-size', '13px');

  spendingSlider = createSlider(-20, 20, 0, 1);
  spendingSlider.position(sliderLeftMargin, drawHeight + 30);
  spendingSlider.size(canvasWidth - sliderLeftMargin - margin);

  taxSlider = createSlider(-20, 20, 0, 1);
  taxSlider.position(sliderLeftMargin, drawHeight + 55);
  taxSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Fiscal policy simulator showing how government spending and tax changes affect GDP, unemployment, inflation, and national debt', LABEL);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let spendChange = spendingSlider.value();
  let taxChange = taxSlider.value();
  let condition = conditionSelect.value();

  // Adjust base values by condition
  let condGDP, condUnemp, condInflation;
  if (condition === 'Recession') {
    condGDP = 92; condUnemp = 9; condInflation = 0.5;
  } else if (condition === 'Overheating') {
    condGDP = 108; condUnemp = 3; condInflation = 5.5;
  } else {
    condGDP = 100; condUnemp = 5; condInflation = 2.5;
  }

  // Fiscal multiplier effects
  let multiplier = 1.5;
  let gdpEffect = spendChange * multiplier * 0.3 - taxChange * multiplier * 0.2;
  let newGDP = condGDP + gdpEffect;
  let newUnemp = constrain(condUnemp - gdpEffect * 0.3, 1, 15);
  let newInflation = constrain(condInflation + gdpEffect * 0.15, -2, 12);
  let newDebt = baseDebt + spendChange * 0.5 - taxChange * 0.4;

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Fiscal Policy Simulator', canvasWidth / 2, 8);

  // Policy label
  let policyType;
  if (spendChange > 5 || taxChange < -5) policyType = 'Expansionary (Stimulus)';
  else if (spendChange < -5 || taxChange > 5) policyType = 'Contractionary (Austerity)';
  else policyType = 'Neutral';

  fill(policyType.includes('Expan') ? 'green' : policyType.includes('Contract') ? 'crimson' : 'gray');
  textSize(14);
  text('Policy: ' + policyType, canvasWidth / 2, 30);

  // Four indicator gauges
  let indicators = [
    { name: 'GDP Growth', val: newGDP - 100, unit: '%', target: 2, range: [-5, 8], goodHigh: true },
    { name: 'Unemployment', val: newUnemp, unit: '%', target: 4, range: [0, 15], goodHigh: false },
    { name: 'Inflation', val: newInflation, unit: '%', target: 2, range: [-2, 10], goodHigh: null },
    { name: 'Debt/GDP', val: newDebt, unit: '%', target: 60, range: [50, 120], goodHigh: false }
  ];

  let gaugeW = (canvasWidth - 40) / 4;
  for (let i = 0; i < indicators.length; i++) {
    let ind = indicators[i];
    let gx = 20 + i * gaugeW + gaugeW / 2;
    let gy = 85;

    // Gauge arc
    let gaugeR = 35;
    for (let a = PI; a <= TWO_PI; a += 0.02) {
      let t = (a - PI) / PI;
      let v = lerp(ind.range[0], ind.range[1], t);
      let isGood;
      if (ind.goodHigh === null) isGood = abs(v - ind.target) < 2;
      else if (ind.goodHigh) isGood = v > ind.target;
      else isGood = v < ind.target;
      stroke(isGood ? color(100, 200, 100) : color(200, 100, 100));
      strokeWeight(8);
      point(gx + cos(a) * gaugeR, gy + sin(a) * gaugeR);
    }

    // Needle
    let needleT = map(constrain(ind.val, ind.range[0], ind.range[1]), ind.range[0], ind.range[1], PI, TWO_PI);
    stroke('black');
    strokeWeight(2);
    let nx = gx + cos(needleT) * (gaugeR - 10);
    let ny = gy + sin(needleT) * (gaugeR - 10);
    line(gx, gy, nx, ny);
    fill('black');
    noStroke();
    circle(gx, gy, 6);

    // Label and value
    textSize(10);
    textAlign(CENTER, CENTER);
    text(ind.name, gx, gy + 15);
    textSize(16);
    let sign = ind.val >= 0 && ind.name !== 'Unemployment' && ind.name !== 'Debt/GDP' ? '+' : '';
    text(sign + nf(ind.val, 1, 1) + ind.unit, gx, gy + 32);
  }

  // Before/After comparison bars
  let barY = 170;
  fill('black');
  noStroke();
  textSize(13);
  textAlign(CENTER, TOP);
  text('Before vs After Policy', canvasWidth / 2, barY);

  barY += 22;
  let barNames = ['GDP Index', 'Unemployment', 'Inflation', 'Debt/GDP'];
  let befores = [condGDP, condUnemp, condInflation, baseDebt];
  let afters = [newGDP, newUnemp, newInflation, newDebt];
  let maxVals = [120, 15, 10, 120];
  let barColors = ['steelblue', 'darkorange', 'crimson', 'purple'];
  let barH = 18;

  for (let i = 0; i < 4; i++) {
    let by = barY + i * (barH + 20);
    let barW = canvasWidth - 130;

    noStroke();
    fill('black');
    textSize(10);
    textAlign(LEFT, TOP);
    text(barNames[i], 10, by);

    // Before bar
    fill(200);
    rect(100, by, barW, barH / 2, 2);
    fill(barColors[i]);
    let bw = map(befores[i], 0, maxVals[i], 0, barW);
    rect(100, by, constrain(bw, 0, barW), barH / 2, 2);

    // After bar
    fill(220);
    rect(100, by + barH / 2 + 2, barW, barH / 2, 2);
    let aw = map(afters[i], 0, maxVals[i], 0, barW);
    fill(barColors[i]);
    rect(100, by + barH / 2 + 2, constrain(aw, 0, barW), barH / 2, 2);

    // Values
    fill('black');
    textSize(9);
    textAlign(RIGHT, CENTER);
    text(nf(befores[i], 1, 1), 95, by + barH / 4);
    text(nf(afters[i], 1, 1), 95, by + barH * 3 / 4 + 2);
  }

  // Slider labels
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, CENTER);
  let spSign = spendChange >= 0 ? '+' : '';
  let txSign = taxChange >= 0 ? '+' : '';
  text('Spending: ' + spSign + spendChange + '%', 10, drawHeight + 40);
  text('Taxes: ' + txSign + taxChange + '%', 10, drawHeight + 65);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  spendingSlider.size(canvasWidth - sliderLeftMargin - margin);
  taxSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
