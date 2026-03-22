// Risk-Return Explorer MicroSim
// Scatter plot of investment types by risk and expected return

let canvasWidth = 400;
let drawHeight = 440;
let controlHeight = 55;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

let timeSelect, investmentSlider;
let showMonteCarloBtn;
let showMonteCarlo = false;
let monteCarloData = null;
let hoveredInvestment = -1;

let investments = [
  { name: 'Savings Account', avgReturn: 2, volatility: 0.5, color: 'green', worstYr: 0.5, bestYr: 3 },
  { name: 'US Bonds', avgReturn: 4, volatility: 5, color: 'steelblue', worstYr: -5, bestYr: 15 },
  { name: 'Balanced (60/40)', avgReturn: 7, volatility: 10, color: 'mediumpurple', worstYr: -20, bestYr: 25 },
  { name: 'Stock Index (S&P)', avgReturn: 10, volatility: 16, color: 'darkorange', worstYr: -38, bestYr: 32 },
  { name: 'Growth Stock', avgReturn: 13, volatility: 25, color: 'red', worstYr: -55, bestYr: 60 },
  { name: 'Crypto (BTC)', avgReturn: 20, volatility: 60, color: 'gold', worstYr: -75, bestYr: 300 }
];

let timeHorizons = [1, 5, 10, 20, 30];
let initialInvestment = 10000;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  timeSelect = createSelect();
  timeHorizons.forEach(t => timeSelect.option(t + ' years', t));
  timeSelect.selected(10);
  timeSelect.changed(() => { monteCarloData = null; });

  investmentSlider = createSlider(1000, 50000, 10000, 1000);

  showMonteCarloBtn = createButton('Monte Carlo');
  showMonteCarloBtn.mousePressed(() => {
    showMonteCarlo = !showMonteCarlo;
    if (showMonteCarlo) runMonteCarlo();
  });

  positionControls();
  describe('Risk return scatter plot comparing different investment types', LABEL);
}

function positionControls() {
  let y = drawHeight + 12;
  timeSelect.position(90, y);
  investmentSlider.position(260, y);
  investmentSlider.size(canvasWidth - 350);
  showMonteCarloBtn.position(canvasWidth - 100, y - 2);
}

function runMonteCarlo() {
  let years = int(timeSelect.value());
  let invest = investmentSlider.value();
  let sims = 200;
  monteCarloData = [];

  investments.forEach(inv => {
    let results = [];
    for (let s = 0; s < sims; s++) {
      let balance = invest;
      for (let y = 0; y < years; y++) {
        let r = randomGaussian(inv.avgReturn / 100, inv.volatility / 100);
        balance *= (1 + r);
      }
      results.push(balance);
    }
    results.sort((a, b) => a - b);
    monteCarloData.push({
      p10: results[floor(sims * 0.1)],
      p50: results[floor(sims * 0.5)],
      p90: results[floor(sims * 0.9)],
      avg: results.reduce((a, b) => a + b, 0) / sims,
      probLoss: results.filter(r => r < invest).length / sims
    });
  });
}

function draw() {
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let years = int(timeSelect.value());
  let invest = investmentSlider.value();

  // Title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(20);
  text('Risk-Return Explorer', canvasWidth / 2, 6);
  textSize(12);
  fill('gray');
  text('$' + formatNum(invest) + ' invested for ' + years + ' years', canvasWidth / 2, 28);

  // Scatter plot area
  let gLeft = 70, gTop = 55, gBottom = 260, gRight = canvasWidth - 30;
  let maxVol = 70, maxRet = 25;

  // Axes
  stroke('black');
  strokeWeight(1);
  line(gLeft, gTop, gLeft, gBottom);
  line(gLeft, gBottom, gRight, gBottom);

  noStroke();
  fill('black');
  textSize(11);
  textAlign(CENTER, TOP);
  text('Risk (Volatility %)', (gLeft + gRight) / 2, gBottom + 4);

  push();
  translate(18, (gTop + gBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Expected Return (%)', 0, 0);
  pop();

  // Grid
  textSize(9);
  fill('gray');
  noStroke();
  for (let r = 0; r <= maxRet; r += 5) {
    let y = map(r, 0, maxRet, gBottom, gTop);
    textAlign(RIGHT, CENTER);
    text(r + '%', gLeft - 4, y);
    stroke('lightgray');
    strokeWeight(0.5);
    line(gLeft, y, gRight, y);
    noStroke();
  }
  for (let v = 0; v <= maxVol; v += 10) {
    let x = map(v, 0, maxVol, gLeft, gRight);
    textAlign(CENTER, TOP);
    text(v + '%', x, gBottom + 2);
    stroke('lightgray');
    strokeWeight(0.5);
    line(x, gTop, x, gBottom);
    noStroke();
  }

  // Trend line
  stroke(200, 200, 200);
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  let x1 = map(0, 0, maxVol, gLeft, gRight);
  let y1 = map(2, 0, maxRet, gBottom, gTop);
  let x2 = map(65, 0, maxVol, gLeft, gRight);
  let y2 = map(22, 0, maxRet, gBottom, gTop);
  line(x1, y1, x2, y2);
  drawingContext.setLineDash([]);

  // Check hover
  hoveredInvestment = -1;
  for (let i = 0; i < investments.length; i++) {
    let inv = investments[i];
    let px = map(inv.volatility, 0, maxVol, gLeft, gRight);
    let py = map(inv.avgReturn, 0, maxRet, gBottom, gTop);
    if (dist(mouseX, mouseY, px, py) < 18) {
      hoveredInvestment = i;
    }
  }

  // Plot investments
  for (let i = 0; i < investments.length; i++) {
    let inv = investments[i];
    let px = map(inv.volatility, 0, maxVol, gLeft, gRight);
    let py = map(inv.avgReturn, 0, maxRet, gBottom, gTop);

    let sz = hoveredInvestment === i ? 24 : 18;
    fill(inv.color);
    stroke('white');
    strokeWeight(2);
    circle(px, py, sz);

    noStroke();
    fill('black');
    textSize(9);
    textAlign(CENTER, BOTTOM);
    text(inv.name, px, py - sz / 2 - 2);
  }

  // --- Statistics Panel ---
  let panelY = 275;
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, TOP);

  if (hoveredInvestment >= 0) {
    let inv = investments[hoveredInvestment];
    fill(inv.color);
    textSize(14);
    text(inv.name, 15, panelY);

    fill('black');
    textSize(11);
    let py = panelY + 20;
    text('Avg Annual Return: ' + inv.avgReturn + '%', 15, py);
    text('Volatility (Std Dev): ' + inv.volatility + '%', 15, py + 15);
    text('Best Year: ' + (inv.bestYr > 0 ? '+' : '') + inv.bestYr + '%', 15, py + 30);
    text('Worst Year: ' + inv.worstYr + '%', 15, py + 45);

    // Projected value
    let projected = invest * pow(1 + inv.avgReturn / 100, years);
    fill('darkgreen');
    textSize(12);
    text('Projected value: $' + formatNum(projected), 15, py + 65);
  } else {
    fill('gray');
    textSize(12);
    text('Hover over an investment to see details', 15, panelY);
  }

  // Monte Carlo results
  if (showMonteCarlo && monteCarloData) {
    let mcY = panelY + (hoveredInvestment >= 0 ? 100 : 20);
    noStroke();
    fill('black');
    textSize(13);
    textAlign(LEFT, TOP);
    text('Monte Carlo Simulation (' + years + 'yr)', 15, mcY);

    let colW = (canvasWidth - 30) / investments.length;
    for (let i = 0; i < investments.length; i++) {
      let inv = investments[i];
      let mc = monteCarloData[i];
      let cx = 15 + i * colW;

      fill(inv.color);
      textSize(9);
      textAlign(CENTER, TOP);
      text(inv.name.split(' ')[0], cx + colW / 2, mcY + 18);

      fill('black');
      text('$' + formatNum(mc.p50), cx + colW / 2, mcY + 32);

      textSize(8);
      fill('gray');
      text('Loss: ' + nf(mc.probLoss * 100, 1, 0) + '%', cx + colW / 2, mcY + 46);
    }
  }

  // Key insights
  let insightY = drawHeight - 40;
  noStroke();
  fill('darkblue');
  textSize(10);
  textAlign(CENTER, TOP);
  text('Higher return = more volatility  |  Time reduces loss risk for stocks  |  Past performance \u2260 future results', canvasWidth / 2, insightY);

  // Control labels
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Horizon:', 10, drawHeight + 20);
  text('Invest: $' + formatNum(invest), 185, drawHeight + 20);
}

function formatNum(val) {
  if (val >= 1000000) return nf(val / 1000000, 1, 1) + 'M';
  if (val >= 1000) return nf(val / 1000, 1, 0) + 'K';
  return nf(val, 1, 0);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasHeight = drawHeight + controlHeight;
}
