// Retirement Savings Calculator MicroSim
// Calculate retirement savings with compound growth projections

let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 180;
let defaultTextSize = 16;

let ageSlider, retireAgeSlider, salarySlider, savingsRateSlider, matchSlider;
let returnSelect;
let salaryGrowthCb;

let returnRates = {
  'Conservative (5%)': 0.05,
  'Moderate (7%)': 0.07,
  'Aggressive (10%)': 0.10
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  ageSlider = createSlider(18, 40, 22, 1);
  retireAgeSlider = createSlider(55, 70, 65, 1);
  salarySlider = createSlider(30000, 100000, 50000, 5000);
  savingsRateSlider = createSlider(5, 25, 10, 1);
  matchSlider = createSlider(0, 6, 3, 1);

  returnSelect = createSelect();
  Object.keys(returnRates).forEach(k => returnSelect.option(k));
  returnSelect.selected('Moderate (7%)');

  salaryGrowthCb = createCheckbox('Salary grows 3%/year', true);

  positionControls();
  describe('Retirement savings calculator showing compound growth projections', LABEL);
}

function positionControls() {
  let y = drawHeight + 8;
  let col1 = sliderLeftMargin;
  let col2 = canvasWidth / 2 + sliderLeftMargin / 2;
  let sw = canvasWidth / 2 - sliderLeftMargin - 10;
  let sw2 = canvasWidth / 2 - sliderLeftMargin / 2 - 10;

  ageSlider.position(col1, y);
  ageSlider.size(sw);
  retireAgeSlider.position(col2, y);
  retireAgeSlider.size(sw2);

  salarySlider.position(col1, y + 25);
  salarySlider.size(sw);
  savingsRateSlider.position(col2, y + 25);
  savingsRateSlider.size(sw2);

  matchSlider.position(col1, y + 50);
  matchSlider.size(sw);
  returnSelect.position(col2, y + 50);

  salaryGrowthCb.position(col1, y + 72);
}

function calculate() {
  let startAge = ageSlider.value();
  let retireAge = retireAgeSlider.value();
  let salary = salarySlider.value();
  let rate = savingsRateSlider.value() / 100;
  let match = matchSlider.value() / 100;
  let annualReturn = returnRates[returnSelect.value()];
  let salaryGrow = salaryGrowthCb.checked() ? 0.03 : 0;

  let years = retireAge - startAge;
  let balance = 0;
  let totalContrib = 0;
  let totalMatch = 0;
  let totalGrowth = 0;
  let trajectory = [{ age: startAge, balance: 0 }];
  let currentSalary = salary;

  for (let i = 0; i < years; i++) {
    let yourContrib = currentSalary * rate;
    let employerMatch = currentSalary * min(match, rate);
    let growth = balance * annualReturn;

    totalContrib += yourContrib;
    totalMatch += employerMatch;
    totalGrowth += growth;
    balance += yourContrib + employerMatch + growth;

    currentSalary *= (1 + salaryGrow);
    trajectory.push({ age: startAge + i + 1, balance: balance });
  }

  // Monthly income (4% rule)
  let monthlyIncome = (balance * 0.04) / 12;

  return { balance, totalContrib, totalMatch, totalGrowth, monthlyIncome, trajectory, years };
}

function draw() {
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let result = calculate();
  let startAge = ageSlider.value();
  let retireAge = retireAgeSlider.value();

  // Title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(20);
  text('Retirement Savings Calculator', canvasWidth / 2, 6);

  // Big number
  textSize(14);
  fill('gray');
  text('Projected Nest Egg at Age ' + retireAge, canvasWidth / 2, 30);
  textSize(28);
  fill(result.balance >= 500000 ? 'green' : result.balance >= 200000 ? 'darkorange' : 'red');
  text('$' + formatMoney(result.balance), canvasWidth / 2, 48);

  textSize(13);
  fill('steelblue');
  text('Monthly retirement income: $' + formatMoney(result.monthlyIncome), canvasWidth / 2, 82);

  // Growth chart
  let gLeft = 65, gTop = 110, gBottom = 300, gRight = canvasWidth - 30;
  let traj = result.trajectory;
  let maxBal = max(100000, result.balance * 1.1);

  // Axes
  stroke('black');
  strokeWeight(1);
  line(gLeft, gTop, gLeft, gBottom);
  line(gLeft, gBottom, gRight, gBottom);

  noStroke();
  fill('black');
  textSize(10);
  textAlign(CENTER, TOP);
  text('Age', (gLeft + gRight) / 2, gBottom + 3);

  push();
  translate(15, (gTop + gBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Savings ($)', 0, 0);
  pop();

  // Grid
  textSize(8);
  fill('gray');
  noStroke();
  for (let v = 0; v <= maxBal; v += maxBal / 5) {
    let y = map(v, 0, maxBal, gBottom, gTop);
    textAlign(RIGHT, CENTER);
    text('$' + formatMoney(v), gLeft - 4, y);
    stroke('lightgray');
    strokeWeight(0.5);
    line(gLeft, y, gRight, y);
    noStroke();
  }

  let ageRange = retireAge - startAge;
  for (let a = startAge; a <= retireAge; a += max(1, floor(ageRange / 8))) {
    let x = map(a, startAge, retireAge, gLeft, gRight);
    noStroke();
    fill('gray');
    textSize(8);
    textAlign(CENTER, TOP);
    text(a, x, gBottom + 2);
  }

  // Growth area fill
  fill(0, 150, 0, 30);
  noStroke();
  beginShape();
  vertex(gLeft, gBottom);
  for (let i = 0; i < traj.length; i++) {
    let x = map(traj[i].age, startAge, retireAge, gLeft, gRight);
    let y = map(traj[i].balance, 0, maxBal, gBottom, gTop);
    vertex(x, y);
  }
  vertex(gRight, gBottom);
  endShape(CLOSE);

  // Growth line
  stroke('green');
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < traj.length; i++) {
    let x = map(traj[i].age, startAge, retireAge, gLeft, gRight);
    let y = map(traj[i].balance, 0, maxBal, gBottom, gTop);
    vertex(x, y);
  }
  endShape();

  // Breakdown panel
  let panelY = 315;
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, TOP);
  text('Breakdown:', 15, panelY);

  textSize(12);
  let py = panelY + 20;
  fill('steelblue');
  text('Your contributions: $' + formatMoney(result.totalContrib), 15, py);
  py += 18;
  fill('mediumseagreen');
  text('Employer match: $' + formatMoney(result.totalMatch), 15, py);
  py += 18;
  fill('goldenrod');
  text('Investment growth: $' + formatMoney(result.totalGrowth), 15, py);
  py += 18;
  fill('gray');
  textSize(11);
  text('Years investing: ' + result.years, 15, py);

  // Stacked bar
  let barX = canvasWidth / 2 + 20;
  let barW = canvasWidth / 2 - 40;
  let barY = panelY + 20;
  let barH = 20;
  let total = result.balance;

  if (total > 0) {
    let w1 = (result.totalContrib / total) * barW;
    let w2 = (result.totalMatch / total) * barW;
    let w3 = (result.totalGrowth / total) * barW;

    fill('steelblue');
    noStroke();
    rect(barX, barY, w1, barH);
    fill('mediumseagreen');
    rect(barX + w1, barY, w2, barH);
    fill('goldenrod');
    rect(barX + w1 + w2, barY, w3, barH);

    textSize(9);
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    text(nf(result.totalContrib / total * 100, 1, 0) + '%', barX + w1 / 2, barY + barH + 3);
    text(nf(result.totalMatch / total * 100, 1, 0) + '%', barX + w1 + w2 / 2, barY + barH + 3);
    text(nf(result.totalGrowth / total * 100, 1, 0) + '%', barX + w1 + w2 + w3 / 2, barY + barH + 3);
  }

  // Key insight
  let insightY = panelY + 60;
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  fill('darkblue');

  // Compare starting 5 years later
  let laterAge = startAge + 5;
  if (laterAge < retireAge) {
    let laterYears = retireAge - laterAge;
    let laterBalance = 0;
    let sal = salarySlider.value();
    let r = savingsRateSlider.value() / 100;
    let m = matchSlider.value() / 100;
    let ret = returnRates[returnSelect.value()];
    for (let i = 0; i < laterYears; i++) {
      let c = sal * r + sal * min(m, r);
      laterBalance = (laterBalance + c) * (1 + ret);
      if (salaryGrowthCb.checked()) sal *= 1.03;
    }
    let diff = result.balance - laterBalance;
    text('Starting at ' + startAge + ' vs ' + laterAge + ':', barX - 10, insightY);
    fill('green');
    text('Extra $' + formatMoney(diff) + ' by waiting 5 fewer years!', barX - 10, insightY + 15);
  }

  fill('gray');
  textSize(10);
  text('Time is your biggest asset when young!', barX - 10, insightY + 35);

  // Control labels
  noStroke();
  fill('black');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Start Age: ' + ageSlider.value(), 10, drawHeight + 15);
  text('Retire Age: ' + retireAgeSlider.value(), canvasWidth / 2 + 10, drawHeight + 15);
  text('Salary: $' + formatMoney(salarySlider.value()), 10, drawHeight + 40);
  text('Save: ' + savingsRateSlider.value() + '%', canvasWidth / 2 + 10, drawHeight + 40);
  text('Match: ' + matchSlider.value() + '%', 10, drawHeight + 65);
}

function formatMoney(val) {
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
