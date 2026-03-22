// Money Characteristics Evaluator MicroSim
// Select different items to see how they rate as money across 6 characteristics.
// Compare items side by side and learn why certain forms of money succeeded or failed.

let canvasWidth = 580;
let drawHeight = 520;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

let items = [];
let selectedIndex = 0;
let compareIndex = -1;
let compareCheckbox;
let compareSelect;
let showScoresButton;
let revealed = true;

let characteristics = ['Durability', 'Portability', 'Divisibility', 'Uniformity', 'Limited Supply', 'Acceptability'];

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  buildItems();

  compareCheckbox = createCheckbox('Compare Two Items', false);
  compareCheckbox.position(15, drawHeight + 12);

  compareSelect = createSelect();
  for (let i = 0; i < items.length; i++) {
    compareSelect.option(items[i].name, i);
  }
  compareSelect.selected(1);
  compareSelect.position(200, drawHeight + 12);
  compareSelect.hide();

  compareCheckbox.changed(() => {
    if (compareCheckbox.checked()) {
      compareSelect.show();
    } else {
      compareSelect.hide();
      compareIndex = -1;
    }
  });
}

function buildItems() {
  items = [
    { name: 'Gold Coins', emoji: 'Au',
      scores: [10, 4, 6, 8, 9, 9],
      history: 'Used for thousands of years across civilizations. Heavy but highly durable and universally valued.',
      color: 'gold' },
    { name: 'Paper Dollars', emoji: '$',
      scores: [6, 9, 8, 10, 7, 10],
      history: 'Modern fiat money backed by government trust. Lightweight, divisible into cents, universally accepted.',
      color: 'forestgreen' },
    { name: 'Cigarettes', emoji: 'Cig',
      scores: [3, 7, 7, 8, 6, 5],
      history: 'Used as currency in prisons and post-war economies. Consumable, so supply naturally limited.',
      color: 'sienna' },
    { name: 'Seashells', emoji: 'Shell',
      scores: [7, 8, 2, 4, 5, 4],
      history: 'Cowrie shells used in Africa, Asia, and Oceania for centuries. Beautiful but hard to standardize.',
      color: 'coral' },
    { name: 'Cattle', emoji: 'Cow',
      scores: [5, 1, 1, 3, 6, 7],
      history: 'Among the oldest forms of money. The word "pecuniary" comes from Latin "pecus" (cattle).',
      color: 'saddlebrown' },
    { name: 'Bitcoin', emoji: 'BTC',
      scores: [9, 10, 10, 10, 10, 5],
      history: 'Created 2009 by Satoshi Nakamoto. Digital, mathematically scarce (21M cap), growing acceptance.',
      color: 'darkorange' },
    { name: 'Salt', emoji: 'NaCl',
      scores: [4, 6, 7, 8, 5, 6],
      history: 'Roman soldiers were paid in salt ("salary"). Essential for food preservation before refrigeration.',
      color: 'lightsteelblue' },
    { name: 'Stone Discs (Yap)', emoji: 'Rai',
      scores: [10, 0, 0, 3, 9, 3],
      history: 'Rai stones of Yap Island weigh up to 4 tons. Ownership transferred verbally without moving them!',
      color: 'slategray' }
  ];
}

function draw() {
  // Backgrounds
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill('black');
  textSize(18);
  textAlign(CENTER, TOP);
  text('Money Characteristics Evaluator', canvasWidth / 2, 8);

  // Item selector buttons
  let btnY = 38;
  let btnW = (canvasWidth - 2 * margin - 10) / items.length;
  for (let i = 0; i < items.length; i++) {
    let bx = margin + 5 + i * btnW;
    let isSelected = (i === selectedIndex);
    let isCompare = (compareCheckbox.checked() && i === compareIndex);

    stroke(isSelected ? 'black' : (isCompare ? 'blue' : 'silver'));
    strokeWeight(isSelected ? 2 : 1);
    fill(isSelected ? items[i].color : (isCompare ? 'lightyellow' : 'white'));
    rect(bx, btnY, btnW - 4, 36, 5);

    noStroke();
    fill(isSelected ? 'white' : 'black');
    textSize(min(10, btnW / 6));
    textAlign(CENTER, CENTER);
    text(items[i].name, bx + (btnW - 4) / 2, btnY + 18);
  }

  if (compareCheckbox.checked()) {
    compareIndex = int(compareSelect.value());
  }

  let item = items[selectedIndex];
  let item2 = compareIndex >= 0 ? items[compareIndex] : null;

  // Meter area
  let meterLeft = margin + 20;
  let meterRight = canvasWidth - margin - 30;
  let meterW = meterRight - meterLeft - 120;
  let meterStartX = meterLeft + 120;
  let meterY = 95;
  let meterH = 28;
  let meterGap = 10;

  noStroke();
  fill('black');
  textSize(15);
  textAlign(LEFT, TOP);
  text(item.name, meterLeft, meterY - 15);
  if (item2) {
    fill('blue');
    textSize(13);
    text('vs ' + item2.name, meterLeft + textWidth(item.name + '  ') + 20, meterY - 14);
  }

  for (let i = 0; i < characteristics.length; i++) {
    let y = meterY + i * (meterH + meterGap);

    // Label
    noStroke();
    fill('black');
    textSize(12);
    textAlign(RIGHT, CENTER);
    text(characteristics[i], meterStartX - 10, y + meterH / 2);

    // Background bar
    fill(230);
    noStroke();
    rect(meterStartX, y, meterW, meterH, 4);

    // Score bar (primary item)
    let score = item.scores[i];
    let barW = (score / 10) * meterW;
    fill(item.color);
    rect(meterStartX, y, barW, item2 ? meterH / 2 : meterH, 4);

    // Score text
    noStroke();
    fill('black');
    textSize(12);
    textAlign(LEFT, CENTER);
    text(score + '/10', meterStartX + meterW + 5, y + (item2 ? meterH / 4 : meterH / 2));

    // Compare bar
    if (item2) {
      let score2 = item2.scores[i];
      let barW2 = (score2 / 10) * meterW;
      fill('steelblue');
      rect(meterStartX, y + meterH / 2, barW2, meterH / 2, 4);

      noStroke();
      fill('blue');
      textSize(10);
      textAlign(LEFT, CENTER);
      text(score2 + '/10', meterStartX + meterW + 5, y + 3 * meterH / 4);
    }
  }

  // Overall Money Score
  let totalScore = item.scores.reduce((a, b) => a + b, 0);
  let maxTotal = 60;
  let pct = totalScore / maxTotal;

  let scoreY = meterY + characteristics.length * (meterH + meterGap) + 15;

  noStroke();
  fill('black');
  textSize(15);
  textAlign(LEFT, TOP);
  text('Overall Money Score:', meterLeft, scoreY);

  // Score gauge
  let gaugeX = meterStartX;
  let gaugeW = meterW;
  fill(230);
  rect(gaugeX, scoreY, gaugeW, 24, 6);

  // Gradient fill
  let gaugeColor;
  if (pct > 0.75) gaugeColor = color('forestgreen');
  else if (pct > 0.5) gaugeColor = color('goldenrod');
  else if (pct > 0.3) gaugeColor = color('orange');
  else gaugeColor = color('tomato');
  fill(gaugeColor);
  rect(gaugeX, scoreY, gaugeW * pct, 24, 6);

  noStroke();
  fill('white');
  textSize(14);
  textAlign(CENTER, CENTER);
  text(totalScore + ' / ' + maxTotal + '  (' + nf(pct * 100, 0, 0) + '%)', gaugeX + gaugeW / 2, scoreY + 12);

  if (item2) {
    let totalScore2 = item2.scores.reduce((a, b) => a + b, 0);
    let pct2 = totalScore2 / maxTotal;
    let scoreY2 = scoreY + 30;
    noStroke();
    fill('steelblue');
    textSize(13);
    textAlign(LEFT, TOP);
    text(item2.name + ': ' + totalScore2 + '/' + maxTotal + ' (' + nf(pct2 * 100, 0, 0) + '%)', meterLeft, scoreY2);
  }

  // History blurb
  let histY = scoreY + (item2 ? 55 : 35);
  noStroke();
  fill('darkslategray');
  textSize(12);
  textAlign(LEFT, TOP);
  text('Historical Context:', meterLeft, histY);
  fill('black');
  textSize(12);
  text(item.history, meterLeft, histY + 18, canvasWidth - 2 * margin - 20, 50);

  // Discussion prompt
  let promptY = histY + 65;
  fill('indigo');
  textSize(11);
  textAlign(LEFT, TOP);
  let prompts = {
    'Gold Coins': 'Why do central banks still hold gold reserves if we use paper money?',
    'Paper Dollars': 'What gives paper money value if it has no intrinsic worth?',
    'Cigarettes': 'Why might cigarettes work as money in prison but not outside?',
    'Seashells': 'What happened to shell money when Europeans brought ships full of shells?',
    'Cattle': 'How would you make change if your currency is a cow?',
    'Bitcoin': 'Can something digital and intangible be "real" money?',
    'Salt': 'Why did salt lose its value as money after refrigeration was invented?',
    'Stone Discs (Yap)': 'If you can\'t move it, how do you spend it?'
  };
  text('Think about it: ' + (prompts[item.name] || ''), meterLeft, promptY, canvasWidth - 2 * margin - 20, 40);
}

function mousePressed() {
  let btnY = 38;
  let btnW = (canvasWidth - 2 * margin - 10) / items.length;
  for (let i = 0; i < items.length; i++) {
    let bx = margin + 5 + i * btnW;
    if (mouseX > bx && mouseX < bx + btnW - 4 && mouseY > btnY && mouseY < btnY + 36) {
      selectedIndex = i;
      break;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  compareCheckbox.position(15, drawHeight + 12);
  compareSelect.position(200, drawHeight + 12);
  redraw();
}

function updateCanvasSize() {
  let container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  canvasHeight = drawHeight + controlHeight;
}
