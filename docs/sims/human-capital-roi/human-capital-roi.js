// Human Capital ROI Calculator MicroSim
// Compare lifetime earnings across education levels
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

let tuitionSlider, aidSlider;
let levelSelect;

let eduLevels = [
  { name: 'High School', years: 0, avgEarn: 35000, color: 'gray' },
  { name: 'Community College', years: 2, avgEarn: 42000, color: 'steelblue' },
  { name: "Bachelor's Degree", years: 4, avgEarn: 60000, color: 'green' },
  { name: "Master's Degree", years: 6, avgEarn: 72000, color: 'darkorange' },
  { name: 'Professional (MD/JD)', years: 7, avgEarn: 120000, color: 'purple' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  levelSelect = createSelect();
  levelSelect.position(10, drawHeight + 5);
  for (let l of eduLevels) levelSelect.option(l.name);
  levelSelect.selected("Bachelor's Degree");
  levelSelect.style('font-size', '13px');

  tuitionSlider = createSlider(5, 50, 20, 1);
  tuitionSlider.position(sliderLeftMargin, drawHeight + 30);
  tuitionSlider.size(canvasWidth - sliderLeftMargin - margin);

  aidSlider = createSlider(0, 100, 25, 5);
  aidSlider.position(sliderLeftMargin, drawHeight + 55);
  aidSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Human capital ROI calculator comparing lifetime earnings and costs across different education levels', LABEL);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let tuition = tuitionSlider.value();
  let aidPct = aidSlider.value();
  let selected = eduLevels.find(l => l.name === levelSelect.value());
  let hsLevel = eduLevels[0];

  let netTuition = tuition * (1 - aidPct / 100);
  let totalCost = netTuition * selected.years * 1000;
  let yearlyGain = selected.avgEarn - hsLevel.avgEarn;
  let workingYears = 40 - selected.years;
  let lifetimeGain = yearlyGain * workingYears;
  let roi = totalCost > 0 ? ((lifetimeGain - totalCost) / totalCost * 100) : 0;
  let breakEven = yearlyGain > 0 ? ceil(totalCost / yearlyGain) : 999;

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Human Capital ROI Calculator', canvasWidth / 2, 8);

  // Comparison bar chart - lifetime earnings
  let barY = 40;
  let barH = 20;
  let barLeft = 130;
  let barRight = canvasWidth - 20;
  let maxEarn = 120000;

  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, TOP);
  text('Average Annual Earnings', 10, barY);
  barY += 18;

  for (let i = 0; i < eduLevels.length; i++) {
    let l = eduLevels[i];
    let isSelected = l.name === selected.name;
    let by = barY + i * (barH + 8);
    let bw = map(l.avgEarn, 0, maxEarn, 0, barRight - barLeft);

    fill(isSelected ? l.color : color(red(color(l.color)), green(color(l.color)), blue(color(l.color)), 120));
    noStroke();
    rect(barLeft, by, bw, barH, 3);

    fill('black');
    textSize(10);
    textAlign(RIGHT, CENTER);
    text(l.name, barLeft - 5, by + barH / 2);

    textAlign(LEFT, CENTER);
    fill('black');
    text('$' + nf(l.avgEarn / 1000, 1, 0) + 'K', barLeft + bw + 5, by + barH / 2);

    if (isSelected) {
      stroke(l.color);
      strokeWeight(2);
      noFill();
      rect(barLeft - 2, by - 2, bw + 4, barH + 4, 4);
    }
  }

  // ROI Summary
  let sumY = barY + eduLevels.length * (barH + 8) + 15;
  let sumX = 20;

  fill('black');
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text('Investment Analysis: ' + selected.name, sumX, sumY);

  sumY += 22;
  textSize(12);

  // Cost card
  fill(255, 230, 230);
  noStroke();
  rect(sumX, sumY, canvasWidth / 2 - 30, 80, 5);
  fill('crimson');
  textSize(11);
  textAlign(LEFT, TOP);
  text('Total Cost', sumX + 10, sumY + 5);
  fill('black');
  textSize(10);
  text('Tuition: $' + tuition + 'K/yr × ' + selected.years + ' yrs', sumX + 10, sumY + 22);
  text('Aid/Scholarship: ' + aidPct + '%', sumX + 10, sumY + 36);
  fill('crimson');
  textSize(14);
  text('-$' + nf(totalCost / 1000, 1, 0) + 'K', sumX + 10, sumY + 55);

  // Gain card
  let gainX = canvasWidth / 2 + 5;
  fill(230, 255, 230);
  noStroke();
  rect(gainX, sumY, canvasWidth / 2 - 30, 80, 5);
  fill('green');
  textSize(11);
  textAlign(LEFT, TOP);
  text('Lifetime Extra Earnings', gainX + 10, sumY + 5);
  fill('black');
  textSize(10);
  text('+$' + nf(yearlyGain / 1000, 1, 0) + 'K/yr × ' + workingYears + ' yrs', gainX + 10, sumY + 22);
  text('vs High School diploma', gainX + 10, sumY + 36);
  fill('green');
  textSize(14);
  text('+$' + nf(lifetimeGain / 1000, 1, 0) + 'K', gainX + 10, sumY + 55);

  // ROI summary
  sumY += 90;
  noStroke();
  let netGain = lifetimeGain - totalCost;
  fill(netGain > 0 ? 'darkgreen' : 'red');
  textSize(16);
  textAlign(CENTER, TOP);
  text('Net Lifetime Gain: ' + (netGain >= 0 ? '+' : '') + '$' + nf(netGain / 1000, 1, 0) + 'K', canvasWidth / 2, sumY);

  textSize(13);
  fill('black');
  text('ROI: ' + nf(roi, 1, 0) + '%  |  Break-even: ' + breakEven + ' years after graduation', canvasWidth / 2, sumY + 22);

  // Slider labels
  noStroke();
  fill('black');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Tuition: $' + tuition + 'K/yr', 10, drawHeight + 40);
  text('Aid: ' + aidPct + '%', 10, drawHeight + 65);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  tuitionSlider.size(canvasWidth - sliderLeftMargin - margin);
  aidSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
