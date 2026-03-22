// Fed Interest Rate Simulator MicroSim
// See how Fed funds rate cascades through the economy
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let fedRate = 5.0;
let fedSlider;

// Cascading rates
function primeRate() { return fedRate + 3.0; }
function mortgageRate() { return fedRate + 2.5; }
function autoRate() { return fedRate + 3.5; }
function savingsRate() { return max(0.01, fedRate - 1.5); }
function creditCardRate() { return fedRate + 13.0; }

// Economic impacts (simplified model)
function gdpGrowth() { return constrain(3.5 - fedRate * 0.4, -2, 5); }
function unemployment() { return constrain(3.5 + (fedRate - 3) * 0.5, 2, 12); }
function inflation() { return constrain(5.0 - fedRate * 0.5, 0, 10); }

let presets = {
  'Current (2024)': 5.25,
  '2008 Crisis Response': 0.25,
  '1980s Volcker': 9.5,
  'COVID Response': 0.0,
  'Mid-Range': 3.0
};

let presetSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  fedSlider = createSlider(0, 10, fedRate, 0.25);
  fedSlider.position(sliderLeftMargin, drawHeight + 10);
  fedSlider.size(canvasWidth - sliderLeftMargin - margin);

  presetSelect = createSelect();
  presetSelect.position(10, drawHeight + 10);
  for (let key in presets) presetSelect.option(key);
  presetSelect.changed(() => {
    let val = presets[presetSelect.value()];
    fedSlider.value(val);
  });
  presetSelect.style('font-size', '12px');

  describe('Federal Reserve interest rate simulator showing how the Fed funds rate cascades through consumer rates and economic indicators', LABEL);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fedRate = fedSlider.value();

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Fed Interest Rate Simulator', canvasWidth / 2, 8);

  // Central Fed Rate display
  let fedX = canvasWidth / 2;
  let fedY = 55;

  fill('darkblue');
  stroke('darkblue');
  strokeWeight(2);
  circle(fedX, fedY, 60);
  fill('white');
  noStroke();
  textSize(10);
  textAlign(CENTER, CENTER);
  text('Fed Funds', fedX, fedY - 10);
  textSize(20);
  text(nf(fedRate, 1, 2) + '%', fedX, fedY + 8);

  // Cascading rates
  let rates = [
    { name: 'Prime Rate', val: primeRate(), x: canvasWidth * 0.15, y: 130, color: 'steelblue' },
    { name: 'Mortgage (30yr)', val: mortgageRate(), x: canvasWidth * 0.38, y: 130, color: 'green' },
    { name: 'Auto Loan', val: autoRate(), x: canvasWidth * 0.62, y: 130, color: 'darkorange' },
    { name: 'Credit Card', val: creditCardRate(), x: canvasWidth * 0.85, y: 130, color: 'crimson' }
  ];

  // Draw connecting lines from Fed
  for (let r of rates) {
    stroke(200);
    strokeWeight(1);
    line(fedX, fedY + 30, r.x, r.y - 18);
  }

  // Rate bubbles
  for (let r of rates) {
    fill(r.color);
    stroke(r.color);
    strokeWeight(1);
    circle(r.x, r.y, 45);
    fill('white');
    noStroke();
    textSize(8);
    textAlign(CENTER, CENTER);
    text(r.name, r.x, r.y - 8);
    textSize(13);
    text(nf(r.val, 1, 1) + '%', r.x, r.y + 8);
  }

  // Savings rate (different - good when high)
  let savX = canvasWidth * 0.15;
  let savY = 195;
  stroke(200);
  strokeWeight(1);
  line(rates[0].x, rates[0].y + 22, savX, savY - 15);

  fill('teal');
  stroke('teal');
  strokeWeight(1);
  circle(savX, savY, 40);
  fill('white');
  noStroke();
  textSize(8);
  textAlign(CENTER, CENTER);
  text('Savings', savX, savY - 7);
  textSize(13);
  text(nf(savingsRate(), 1, 2) + '%', savX, savY + 8);

  // Monthly payment examples
  let exY = 240;
  fill('black');
  noStroke();
  textSize(13);
  textAlign(CENTER, TOP);
  text('What This Means for You', canvasWidth / 2, exY);

  exY += 22;
  let colW = (canvasWidth - 30) / 2;
  let examples = [
    {
      title: '$300,000 Mortgage',
      monthly: monthlyPayment(300000, mortgageRate() / 100, 30),
      baseline: monthlyPayment(300000, 0.065, 30),
      color: 'green'
    },
    {
      title: '$30,000 Auto Loan',
      monthly: monthlyPayment(30000, autoRate() / 100, 5),
      baseline: monthlyPayment(30000, 0.065, 5),
      color: 'darkorange'
    },
    {
      title: '$5,000 Credit Card',
      monthly: 5000 * creditCardRate() / 100 / 12,
      baseline: 5000 * 0.18 / 12,
      color: 'crimson'
    },
    {
      title: '$10,000 Savings',
      monthly: 10000 * savingsRate() / 100 / 12,
      baseline: 10000 * 0.04 / 12,
      color: 'teal'
    }
  ];

  for (let i = 0; i < examples.length; i++) {
    let e = examples[i];
    let cx = 15 + (i % 2) * colW;
    let cy = exY + floor(i / 2) * 55;

    fill('white');
    stroke('silver');
    strokeWeight(1);
    rect(cx, cy, colW - 5, 48, 5);

    noStroke();
    fill(e.color);
    textSize(11);
    textAlign(LEFT, TOP);
    text(e.title, cx + 8, cy + 5);

    fill('black');
    textSize(12);
    text('$' + nf(e.monthly, 1, 0) + '/mo', cx + 8, cy + 22);

    let diff = e.monthly - e.baseline;
    fill(diff > 0 ? 'red' : 'green');
    textSize(10);
    text((diff >= 0 ? '+' : '') + '$' + nf(diff, 1, 0) + ' vs baseline', cx + 8, cy + 36);
  }

  // Economic indicators
  let indY = exY + 120;
  fill('black');
  noStroke();
  textSize(13);
  textAlign(CENTER, TOP);
  text('Economic Impact', canvasWidth / 2, indY);

  indY += 22;
  let indicators = [
    { name: 'GDP Growth', val: gdpGrowth(), unit: '%', good: 'high', color: 'steelblue' },
    { name: 'Unemployment', val: unemployment(), unit: '%', good: 'low', color: 'darkorange' },
    { name: 'Inflation', val: inflation(), unit: '%', good: 'low', color: 'crimson' }
  ];

  let indColW = (canvasWidth - 30) / 3;
  for (let i = 0; i < indicators.length; i++) {
    let ind = indicators[i];
    let cx = 15 + i * indColW + indColW / 2;

    noStroke();
    fill('black');
    textSize(10);
    textAlign(CENTER, TOP);
    text(ind.name, cx, indY);

    textSize(20);
    let isGood = (ind.good === 'high' && ind.val > 2) || (ind.good === 'low' && ind.val < 4);
    fill(isGood ? 'green' : 'red');
    text(nf(ind.val, 1, 1) + ind.unit, cx, indY + 15);

    // Bar
    let barW = indColW - 20;
    let barY = indY + 42;
    fill(230);
    noStroke();
    rect(cx - barW / 2, barY, barW, 8, 4);
    fill(ind.color);
    let fillW = map(ind.val, -2, 10, 0, barW);
    rect(cx - barW / 2, barY, constrain(fillW, 0, barW), 8, 4);
  }

  // Slider label
  noStroke();
  fill('black');
  textSize(12);
  textAlign(RIGHT, CENTER);
  text('Fed Rate: ' + nf(fedRate, 1, 2) + '%', sliderLeftMargin - 5, drawHeight + 20);
}

function monthlyPayment(principal, annualRate, years) {
  let r = annualRate / 12;
  let n = years * 12;
  if (r <= 0) return principal / n;
  return principal * r * pow(1 + r, n) / (pow(1 + r, n) - 1);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  fedSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
