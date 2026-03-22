// Personal Budget Builder MicroSim
// Allocate income across expense categories and see savings
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 220;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Expense categories with default monthly amounts
let categories = [
  { name: 'Housing',        pct: 30, color: 'steelblue' },
  { name: 'Food',           pct: 12, color: 'green' },
  { name: 'Transportation', pct: 10, color: 'darkorange' },
  { name: 'Insurance',      pct: 8,  color: 'crimson' },
  { name: 'Entertainment',  pct: 5,  color: 'purple' },
  { name: 'Subscriptions',  pct: 3,  color: 'teal' },
  { name: 'Shopping',       pct: 5,  color: 'brown' },
  { name: 'Other',          pct: 7,  color: 'gray' }
];

let sliders = [];
let incomeSelect;
let monthlyIncome = 2500; // default: $30K/yr

let incomeOptions = [
  { label: '$30,000', monthly: 2500 },
  { label: '$40,000', monthly: 3333 },
  { label: '$50,000', monthly: 4167 },
  { label: '$75,000', monthly: 6250 }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  let yStart = drawHeight + 5;
  let rowH = 22;
  let sliderLeft = 130;

  // Income selector
  incomeSelect = createSelect();
  incomeSelect.position(80, yStart);
  for (let opt of incomeOptions) {
    incomeSelect.option(opt.label);
  }
  incomeSelect.changed(() => {
    let sel = incomeSelect.value();
    let opt = incomeOptions.find(o => o.label === sel);
    if (opt) monthlyIncome = opt.monthly;
  });
  incomeSelect.style('font-size', '13px');

  // Category sliders
  for (let i = 0; i < categories.length; i++) {
    let sl = createSlider(0, 50, categories[i].pct, 1);
    sl.position(sliderLeft, yStart + 28 + i * rowH);
    sl.size(canvasWidth - sliderLeft - margin);
    sliders.push(sl);
  }

  describe('Personal budget builder tool for allocating income across spending categories', LABEL);
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
  text('Personal Budget Builder', canvasWidth / 2, 8);

  // Read slider values
  let totalPct = 0;
  for (let i = 0; i < categories.length; i++) {
    categories[i].pct = sliders[i].value();
    totalPct += categories[i].pct;
  }

  let savingsPct = max(0, 100 - totalPct);
  let savingsAmount = monthlyIncome * savingsPct / 100;
  let totalSpent = monthlyIncome * totalPct / 100;

  // Draw pie chart
  let pieX = canvasWidth * 0.32;
  let pieY = 190;
  let pieR = 130;

  let angle = -HALF_PI;
  for (let i = 0; i < categories.length; i++) {
    let sliceAngle = categories[i].pct / 100 * TWO_PI;
    if (sliceAngle > 0.01) {
      fill(categories[i].color);
      noStroke();
      arc(pieX, pieY, pieR * 2, pieR * 2, angle, angle + sliceAngle, PIE);
    }
    angle += sliceAngle;
  }
  // Savings slice
  if (savingsPct > 0) {
    let sliceAngle = savingsPct / 100 * TWO_PI;
    fill('gold');
    noStroke();
    arc(pieX, pieY, pieR * 2, pieR * 2, angle, angle + sliceAngle, PIE);
  }

  // Center circle for donut effect
  fill('aliceblue');
  noStroke();
  circle(pieX, pieY, pieR * 0.8);

  // Center text
  fill('black');
  textAlign(CENTER, CENTER);
  textSize(14);
  noStroke();
  text('Monthly', pieX, pieY - 12);
  textSize(18);
  text('$' + nf(monthlyIncome, 1, 0), pieX, pieY + 10);

  // Legend on right side
  let legendX = canvasWidth * 0.62;
  let legendY = 50;
  textSize(12);
  textAlign(LEFT, CENTER);
  noStroke();

  for (let i = 0; i < categories.length; i++) {
    let amount = monthlyIncome * categories[i].pct / 100;
    fill(categories[i].color);
    rect(legendX, legendY + i * 20, 12, 12, 2);
    fill('black');
    text(categories[i].name + ': $' + nf(amount, 1, 0), legendX + 18, legendY + i * 20 + 6);
  }

  // Savings line
  fill('gold');
  rect(legendX, legendY + categories.length * 20, 12, 12, 2);
  fill('black');
  text('Savings: $' + nf(savingsAmount, 1, 0), legendX + 18, legendY + categories.length * 20 + 6);

  // 50/30/20 guideline
  let guideY = drawHeight - 65;
  textSize(13);
  textAlign(CENTER, TOP);
  noStroke();
  fill('gray');
  text('50/30/20 Guideline', canvasWidth / 2, guideY);

  let guideBarW = canvasWidth * 0.7;
  let guideBarX = (canvasWidth - guideBarW) / 2;
  guideY += 18;

  // Needs (50%)
  fill(100, 150, 200, 150);
  noStroke();
  rect(guideBarX, guideY, guideBarW * 0.5, 16, 3, 0, 0, 3);
  // Wants (30%)
  fill(200, 150, 100, 150);
  rect(guideBarX + guideBarW * 0.5, guideY, guideBarW * 0.3, 16);
  // Savings (20%)
  fill(255, 215, 0, 150);
  rect(guideBarX + guideBarW * 0.8, guideY, guideBarW * 0.2, 16, 0, 3, 3, 0);

  fill('black');
  textSize(10);
  textAlign(CENTER, CENTER);
  text('Needs 50%', guideBarX + guideBarW * 0.25, guideY + 8);
  text('Wants 30%', guideBarX + guideBarW * 0.65, guideY + 8);
  text('Save 20%', guideBarX + guideBarW * 0.9, guideY + 8);

  // Warning if over budget
  if (totalPct > 100) {
    fill('red');
    textSize(16);
    textAlign(CENTER, CENTER);
    noStroke();
    text('Over budget by $' + nf(totalSpent - monthlyIncome, 1, 0) + '!', canvasWidth / 2, drawHeight - 20);
  } else if (savingsPct < 10) {
    fill('darkorange');
    textSize(13);
    textAlign(CENTER, CENTER);
    noStroke();
    text('Tip: Aim for at least 20% savings', canvasWidth / 2, drawHeight - 20);
  } else if (savingsPct >= 20) {
    fill('green');
    textSize(13);
    textAlign(CENTER, CENTER);
    noStroke();
    text('Great savings rate: ' + savingsPct + '%!', canvasWidth / 2, drawHeight - 20);
  }

  // Control area labels
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Income:', 10, drawHeight + 15);

  let yStart = drawHeight + 28;
  let rowH = 22;
  for (let i = 0; i < categories.length; i++) {
    fill(categories[i].color);
    text(categories[i].name + ' ' + categories[i].pct + '%', 5, yStart + 5 + i * rowH + 5);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  let sliderLeft = 130;
  for (let i = 0; i < sliders.length; i++) {
    sliders[i].size(canvasWidth - sliderLeft - margin);
  }
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
