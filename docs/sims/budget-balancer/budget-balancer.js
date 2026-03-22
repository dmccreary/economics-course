// Government Budget Balancer MicroSim
// Adjust spending and taxes to balance the federal budget
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 180;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Budget categories (% of total budget, ~$6T)
let spending = [
  { name: 'Defense',        pct: 13, min: 5,  max: 20, color: 'steelblue' },
  { name: 'Soc. Security',  pct: 21, min: 19, max: 23, color: 'darkorange' },
  { name: 'Medicare/Med.',  pct: 25, min: 20, max: 30, color: 'crimson' },
  { name: 'Education/Infra', pct: 8, min: 2,  max: 15, color: 'green' },
  { name: 'Other',          pct: 10, min: 5,  max: 15, color: 'gray' }
];

// Revenue sources (% of GDP ~$25T, scaled to budget)
let revenue = [
  { name: 'Income Tax',    pct: 50, min: 30, max: 65, color: 'royalblue' },
  { name: 'Corporate Tax', pct: 10, min: 5,  max: 25, color: 'teal' },
  { name: 'Payroll Tax',   pct: 35, min: 25, max: 45, color: 'goldenrod' }
];

let spendSliders = [];
let revSliders = [];

let totalBudget = 6.0; // $6 trillion

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  let yStart = drawHeight + 5;
  let rowH = 22;
  let sliderLeft = 120;

  // Spending sliders
  for (let i = 0; i < spending.length; i++) {
    let sl = createSlider(spending[i].min, spending[i].max, spending[i].pct, 1);
    sl.position(sliderLeft, yStart + i * rowH);
    sl.size(canvasWidth / 2 - sliderLeft - 10);
    spendSliders.push(sl);
  }

  // Revenue sliders
  for (let i = 0; i < revenue.length; i++) {
    let sl = createSlider(revenue[i].min, revenue[i].max, revenue[i].pct, 1);
    sl.position(canvasWidth / 2 + sliderLeft - 10, yStart + i * rowH);
    sl.size(canvasWidth / 2 - sliderLeft);
    revSliders.push(sl);
  }

  // Reset button
  let resetBtn = createButton('Reset');
  resetBtn.position(10, yStart + max(spending.length, revenue.length) * rowH + 5);
  resetBtn.mousePressed(resetBudget);

  describe('Government budget balancer showing tradeoffs between spending categories and tax revenue', LABEL);
}

function resetBudget() {
  for (let i = 0; i < spending.length; i++) {
    spendSliders[i].value(spending[i].pct);
  }
  for (let i = 0; i < revenue.length; i++) {
    revSliders[i].value(revenue[i].pct);
  }
}

function draw() {
  updateCanvasSize();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Government Budget Balancer', canvasWidth / 2, 8);

  // Calculate totals
  let totalSpendPct = 0;
  for (let i = 0; i < spending.length; i++) {
    spending[i].pct = spendSliders[i].value();
    totalSpendPct += spending[i].pct;
  }

  let totalRevPct = 0;
  for (let i = 0; i < revenue.length; i++) {
    revenue[i].pct = revSliders[i].value();
    totalRevPct += revenue[i].pct;
  }

  // Convert to trillions
  let totalSpend = totalSpendPct / 100 * totalBudget * 1.3;
  let totalRev = totalRevPct / 100 * totalBudget * 0.95;
  let balance = totalRev - totalSpend;

  // Draw bar charts side by side
  let chartTop = 40;
  let chartBottom = drawHeight - 80;
  let chartH = chartBottom - chartTop;
  let leftBarX = canvasWidth * 0.15;
  let rightBarX = canvasWidth * 0.55;
  let barW = canvasWidth * 0.25;

  // Spending bar (stacked)
  noStroke();
  textSize(13);
  textAlign(CENTER, BOTTOM);
  fill('black');
  text('Spending', leftBarX + barW / 2, chartTop - 3);
  text('$' + nf(totalSpend, 1, 1) + 'T', leftBarX + barW / 2, chartTop + chartH + 18);

  let yOff = chartTop;
  for (let i = 0; i < spending.length; i++) {
    let h = (spending[i].pct / totalSpendPct) * chartH;
    fill(spending[i].color);
    noStroke();
    rect(leftBarX, yOff, barW, h);

    // Label inside bar if tall enough
    if (h > 16) {
      fill('white');
      textSize(10);
      textAlign(CENTER, CENTER);
      text(spending[i].name, leftBarX + barW / 2, yOff + h / 2);
    }
    yOff += h;
  }
  stroke('black');
  strokeWeight(1);
  noFill();
  rect(leftBarX, chartTop, barW, chartH);

  // Revenue bar (stacked)
  noStroke();
  textSize(13);
  textAlign(CENTER, BOTTOM);
  fill('black');
  text('Revenue', rightBarX + barW / 2, chartTop - 3);
  text('$' + nf(totalRev, 1, 1) + 'T', rightBarX + barW / 2, chartTop + chartH + 18);

  yOff = chartTop;
  for (let i = 0; i < revenue.length; i++) {
    let h = (revenue[i].pct / totalRevPct) * chartH;
    fill(revenue[i].color);
    noStroke();
    rect(rightBarX, yOff, barW, h);

    if (h > 16) {
      fill('white');
      textSize(10);
      textAlign(CENTER, CENTER);
      text(revenue[i].name, rightBarX + barW / 2, yOff + h / 2);
    }
    yOff += h;
  }
  stroke('black');
  strokeWeight(1);
  noFill();
  rect(rightBarX, chartTop, barW, chartH);

  // Balance indicator
  let balanceY = drawHeight - 55;
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);

  if (abs(balance) < 0.05) {
    fill('green');
    text('BALANCED!', canvasWidth / 2, balanceY);
  } else if (balance > 0) {
    fill('green');
    text('Surplus: $' + nf(balance, 1, 1) + 'T', canvasWidth / 2, balanceY);
  } else {
    fill('red');
    text('Deficit: -$' + nf(abs(balance), 1, 1) + 'T', canvasWidth / 2, balanceY);
  }

  // Balance bar
  let balBarW = canvasWidth * 0.6;
  let balBarX = (canvasWidth - balBarW) / 2;
  let balBarY = balanceY + 15;
  fill(230);
  noStroke();
  rect(balBarX, balBarY, balBarW, 12, 6);
  // Fill portion
  let balPct = constrain(map(balance, -2, 2, 0, 1), 0, 1);
  let balColor = lerpColor(color('red'), color('green'), balPct);
  fill(balColor);
  rect(balBarX, balBarY, balBarW * balPct, 12, 6);
  // Center mark
  stroke('black');
  strokeWeight(1);
  line(balBarX + balBarW / 2, balBarY - 2, balBarX + balBarW / 2, balBarY + 14);

  // Slider labels in control area
  noStroke();
  fill('black');
  textSize(11);
  textAlign(LEFT, CENTER);
  let yStart = drawHeight + 5;
  let rowH = 22;
  for (let i = 0; i < spending.length; i++) {
    fill(spending[i].color);
    text(spending[i].name + ' ' + spending[i].pct + '%', 5, yStart + i * rowH + 10);
  }
  for (let i = 0; i < revenue.length; i++) {
    fill(revenue[i].color);
    text(revenue[i].name + ' ' + revenue[i].pct + '%', canvasWidth / 2 + 5, yStart + i * rowH + 10);
  }

  // Column headers
  fill('black');
  textSize(12);
  textAlign(CENTER, BOTTOM);
  noStroke();
  text('Spending', canvasWidth * 0.25, drawHeight + 2);
  text('Revenue', canvasWidth * 0.75, drawHeight + 2);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  let sliderLeft = 120;
  for (let i = 0; i < spendSliders.length; i++) {
    spendSliders[i].size(canvasWidth / 2 - sliderLeft - 10);
  }
  for (let i = 0; i < revSliders.length; i++) {
    revSliders[i].position(canvasWidth / 2 + sliderLeft - 10, drawHeight + 5 + i * 22);
    revSliders[i].size(canvasWidth / 2 - sliderLeft);
  }
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
