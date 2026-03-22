// Trade Argument Evaluator MicroSim
// Evaluate common trade policy claims using economic reasoning
// MicroSim template version 2026.03

let canvasWidth = 580;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

let arguments_ = [
  { claim: '"The trade deficit is killing our economy."',
    source: 'Politician',
    correct: 'Misleading',
    redFlags: ['Correlation \u2260 causation', 'Ignores capital account'],
    analysis: 'The US economy has grown during 40 years of trade deficits. A deficit means we import more goods but receive foreign investment. Growing economies often have trade deficits because consumers can afford imports.' },
  { claim: '"Those tariffs will make China pay."',
    source: 'Politician',
    correct: 'Misleading',
    redFlags: ['Misunderstands who pays tariffs', 'Confusing legal vs economic incidence'],
    analysis: 'Tariffs are paid by American importers, who pass costs to US consumers. The foreign country does not write a check. Studies show consumers bear most tariff costs through higher prices.' },
  { claim: '"Free trade has only helped the rich."',
    source: 'Activist',
    correct: 'Needs Context',
    redFlags: ['Oversimplification', 'Ignores consumer benefits'],
    analysis: 'Trade benefits are real but unequally distributed. Lower prices help all consumers, especially lower-income households. However, some workers in competing industries have been hurt. The claim oversimplifies a complex reality.' },
  { claim: '"We need tariffs to protect national security industries."',
    source: 'Policy Analyst',
    correct: 'Valid Concern',
    redFlags: ['May be used too broadly', 'Is this industry truly critical?'],
    analysis: 'This can be legitimate for genuinely critical industries (defense, semiconductors). However, the "national security" argument is often stretched to protect politically connected industries that aren\'t truly critical.' },
  { claim: '"Trade agreements destroy sovereignty."',
    source: 'Activist',
    correct: 'Needs Context',
    redFlags: ['Depends on the agreement', 'Voluntary participation ignored'],
    analysis: 'Countries voluntarily enter trade agreements and can exit them. Agreements do constrain some policy choices, but that\'s the point\u2014mutual commitments create trust. Countries retain core sovereignty.' },
  { claim: '"If we stopped importing, we\'d have more jobs."',
    source: 'Politician',
    correct: 'Misleading',
    redFlags: ['Ignores export jobs', 'Ignores consumer harm'],
    analysis: 'Blocking imports would raise prices for consumers, hurt export industries (trading partners retaliate), and eliminate jobs in import-dependent businesses. Trade creates different jobs, not fewer jobs overall.' },
  { claim: '"Trade with low-wage countries is unfair competition."',
    source: 'Union Leader',
    correct: 'Needs Context',
    redFlags: ['Confuses wages with total costs', 'Ignores comparative advantage'],
    analysis: 'Low wages reflect lower productivity. When adjusted for productivity, cost differences narrow. Comparative advantage means both countries benefit from trade, even with wage differences. Some workers do need transition support.' },
  { claim: '"Trade deficits mean we\'re borrowing from the future."',
    source: 'Economist',
    correct: 'Valid Concern',
    redFlags: ['Depends on what capital inflows fund'],
    analysis: 'If foreign investment funds productive capacity (factories, R&D), it builds future wealth. If it funds consumption (government debt for spending), there is a valid concern about sustainability. Context matters greatly.' }
];

let currentArgIdx = 0;
let selectedAnswer = '';
let selectedFlags = [];
let revealed = false;
let score = 0;
let attempted = 0;
let answeredCorrectly = [];

let options = ['Accurate', 'Misleading', 'Needs Context', 'Valid Concern'];
let showArgBtn, revealBtn, nextBtn, resetBtn;

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  shuffleArguments();

  nextBtn = createButton('Next Argument');
  nextBtn.mousePressed(nextArgument);

  resetBtn = createButton('Start Over');
  resetBtn.mousePressed(resetQuiz);

  positionControls();
  describe('Trade argument evaluator quiz for evaluating trade policy claims', LABEL);
}

function shuffleArguments() {
  // Fisher-Yates shuffle
  for (let i = arguments_.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arguments_[i], arguments_[j]] = [arguments_[j], arguments_[i]];
  }
}

function positionControls() {
  let y = drawHeight + 12;
  nextBtn.position(15, y);
  resetBtn.position(150, y);
}

function nextArgument() {
  if (currentArgIdx < arguments_.length - 1) {
    currentArgIdx++;
    selectedAnswer = '';
    selectedFlags = [];
    revealed = false;
  }
}

function resetQuiz() {
  shuffleArguments();
  currentArgIdx = 0;
  selectedAnswer = '';
  selectedFlags = [];
  revealed = false;
  score = 0;
  attempted = 0;
  answeredCorrectly = [];
}

function draw() {
  // Background
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let arg = arguments_[currentArgIdx];

  // Title
  noStroke();
  fill('black');
  textSize(18);
  textAlign(CENTER, TOP);
  text('Trade Argument Evaluator', canvasWidth / 2, 8);

  // Progress
  textSize(12);
  fill('gray');
  textAlign(RIGHT, TOP);
  text('Argument ' + (currentArgIdx + 1) + ' of ' + arguments_.length, canvasWidth - 15, 12);

  // Score
  fill('steelblue');
  textAlign(LEFT, TOP);
  text('Score: ' + score + '/' + attempted, 15, 12);

  // Claim card
  let cardX = 20;
  let cardY = 40;
  let cardW = canvasWidth - 40;
  let cardH = 75;

  fill('white');
  stroke('steelblue');
  strokeWeight(2);
  rect(cardX, cardY, cardW, cardH, 8);

  // Source badge
  noStroke();
  fill('steelblue');
  textSize(10);
  textAlign(LEFT, TOP);
  text('Source: ' + arg.source, cardX + 12, cardY + 8);

  // Claim text
  fill('black');
  textSize(15);
  textAlign(LEFT, TOP);
  let claimText = arg.claim;
  text(claimText, cardX + 12, cardY + 28, cardW - 24, 45);

  // Red flags section
  let flagY = cardY + cardH + 15;
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, TOP);
  text('Red Flags (click to select):', cardX, flagY);

  flagY += 20;
  let allFlags = [
    'Correlation \u2260 causation', 'Ignores capital account',
    'Misunderstands who pays tariffs', 'Oversimplification',
    'Ignores consumer benefits', 'May be used too broadly',
    'Depends on the agreement', 'Confusing legal vs economic incidence',
    'Ignores export jobs', 'Confuses wages with total costs',
    'Ignores comparative advantage', 'Depends on what capital inflows fund',
    'Is this industry truly critical?', 'Voluntary participation ignored',
    'Ignores consumer harm'
  ];

  let flagH = 22;
  let flagCol = 0;
  let flagsPerCol = 5;
  let colW = (cardW) / 3;

  for (let i = 0; i < allFlags.length; i++) {
    let col = floor(i / flagsPerCol);
    let row = i % flagsPerCol;
    let fx = cardX + col * colW;
    let fy = flagY + row * flagH;

    let isSelected = selectedFlags.includes(allFlags[i]);
    let isCorrectFlag = arg.redFlags.includes(allFlags[i]);

    if (revealed && isCorrectFlag) {
      fill(200, 255, 200);
    } else if (isSelected) {
      fill(255, 230, 230);
    } else {
      fill('white');
    }
    stroke(isSelected ? 'red' : 'silver');
    strokeWeight(1);
    rect(fx, fy, colW - 8, flagH - 4, 3);

    noStroke();
    fill(isSelected ? 'darkred' : 'black');
    textSize(10);
    textAlign(LEFT, CENTER);
    text((isSelected ? '\u2713 ' : '') + allFlags[i], fx + 6, fy + flagH / 2 - 2);
  }

  // Evaluation options
  let optY = flagY + flagsPerCol * flagH + 15;
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, TOP);
  text('Your Evaluation:', cardX, optY);

  optY += 22;
  let optW = (cardW - 30) / options.length;

  for (let i = 0; i < options.length; i++) {
    let ox = cardX + i * (optW + 6);
    let isSelected = selectedAnswer === options[i];
    let isCorrect = revealed && options[i] === arg.correct;

    if (isCorrect) {
      fill('green');
    } else if (isSelected && revealed && !isCorrect) {
      fill('red');
    } else if (isSelected) {
      fill('steelblue');
    } else {
      fill('white');
    }
    stroke(isSelected ? 'steelblue' : 'silver');
    strokeWeight(isSelected ? 2 : 1);
    rect(ox, optY, optW, 32, 5);

    noStroke();
    fill(isSelected || isCorrect ? 'white' : 'black');
    textSize(12);
    textAlign(CENTER, CENTER);
    text(options[i], ox + optW / 2, optY + 16);
  }

  // Reveal button area
  let revY = optY + 45;
  if (selectedAnswer && !revealed) {
    fill('steelblue');
    noStroke();
    rect(cardX, revY, 140, 30, 5);
    fill('white');
    textSize(13);
    textAlign(CENTER, CENTER);
    text('Check Answer', cardX + 70, revY + 15);
  }

  // Analysis reveal
  if (revealed) {
    let anY = revY;
    let correct = selectedAnswer === arg.correct;

    // Result indicator
    noStroke();
    fill(correct ? 'green' : 'orangered');
    textSize(14);
    textAlign(LEFT, TOP);
    text(correct ? '\u2713 Correct!' : '\u2717 The best answer: ' + arg.correct, cardX, anY);

    anY += 24;
    fill('black');
    textSize(11);
    textAlign(LEFT, TOP);
    // Wrap analysis text
    text(arg.analysis, cardX, anY, cardW, 80);
  }

  // Control area
  noStroke();
  fill('gray');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Click red flags, choose your evaluation, then check your answer.', 280, drawHeight + 22);
}

function mousePressed() {
  let arg = arguments_[currentArgIdx];
  let cardX = 20;
  let cardW = canvasWidth - 40;
  let cardH = 75;
  let cardY = 40;

  // Check red flag clicks
  let flagY = cardY + cardH + 15 + 20;
  let allFlags = [
    'Correlation \u2260 causation', 'Ignores capital account',
    'Misunderstands who pays tariffs', 'Oversimplification',
    'Ignores consumer benefits', 'May be used too broadly',
    'Depends on the agreement', 'Confusing legal vs economic incidence',
    'Ignores export jobs', 'Confuses wages with total costs',
    'Ignores comparative advantage', 'Depends on what capital inflows fund',
    'Is this industry truly critical?', 'Voluntary participation ignored',
    'Ignores consumer harm'
  ];

  let flagH = 22;
  let flagsPerCol = 5;
  let colW = cardW / 3;

  if (!revealed) {
    for (let i = 0; i < allFlags.length; i++) {
      let col = floor(i / flagsPerCol);
      let row = i % flagsPerCol;
      let fx = cardX + col * colW;
      let fy = flagY + row * flagH;

      if (mouseX >= fx && mouseX <= fx + colW - 8 && mouseY >= fy && mouseY <= fy + flagH - 4) {
        let idx = selectedFlags.indexOf(allFlags[i]);
        if (idx >= 0) {
          selectedFlags.splice(idx, 1);
        } else {
          selectedFlags.push(allFlags[i]);
        }
        return;
      }
    }

    // Check evaluation option clicks
    let optY = flagY + flagsPerCol * flagH + 15 + 22;
    let optW = (cardW - 30) / options.length;

    for (let i = 0; i < options.length; i++) {
      let ox = cardX + i * (optW + 6);
      if (mouseX >= ox && mouseX <= ox + optW && mouseY >= optY && mouseY <= optY + 32) {
        selectedAnswer = options[i];
        return;
      }
    }

    // Check "Check Answer" button
    let revY = optY + 45;
    if (selectedAnswer && mouseX >= cardX && mouseX <= cardX + 140 && mouseY >= revY && mouseY <= revY + 30) {
      revealed = true;
      attempted++;
      if (selectedAnswer === arg.correct) {
        score++;
      }
      return;
    }
  }
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
