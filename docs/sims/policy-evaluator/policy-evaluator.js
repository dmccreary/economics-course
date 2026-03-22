// Policy Claim Evaluator MicroSim
// Quiz-format: evaluate policy claims using economic reasoning
// MicroSim template version 2026.03

let canvasWidth = 400;
let drawHeight = 520;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Controls
let submitButton, nextButton;
let difficultySelect;
let verdictSelect;

// State
let currentClaim = 0;
let submitted = false;
let score = 0;
let totalAnswered = 0;
let selectedRedFlags = [];
let showAnalysis = false;

// Claims database
let claims = [
  {
    statement: 'Government spending always stimulates the economy.',
    source: 'Campaign Speech',
    sourceType: 'Politician',
    difficulty: 'Basic',
    redFlags: [
      'Uses absolute word "always"',
      'Ignores crowding out effect',
      'Ignores full employment conditions',
      'Ignores what spending is on'
    ],
    correctVerdict: 'Misleading',
    betterAnswer: 'It depends on economic conditions and what the spending funds. At full employment, new spending may crowd out private investment.',
    insight: 'Watch for absolute claims in economics - context always matters!'
  },
  {
    statement: 'We should cut spending to balance the budget during this recession.',
    source: 'News Editorial',
    sourceType: 'Opinion Column',
    difficulty: 'Basic',
    redFlags: [
      'Ignores multiplier effects',
      'Ignores automatic stabilizers',
      'Assumes balanced budget is always good',
      'Ignores timing of fiscal policy'
    ],
    correctVerdict: 'Misleading',
    betterAnswer: 'Cutting during recessions often makes recessions worse. Deficit spending can help recovery through the multiplier effect.',
    insight: 'Austerity during downturns can deepen recessions - timing matters!'
  },
  {
    statement: 'The Fed is printing money and causing hyperinflation!',
    source: 'Social Media Post',
    sourceType: 'Commentator',
    difficulty: 'Intermediate',
    redFlags: [
      'Misunderstands QE vs currency printing',
      'Ignores actual inflation data',
      'Uses scare term "hyperinflation"',
      'Oversimplifies money supply effects'
    ],
    correctVerdict: 'Misleading',
    betterAnswer: 'QE creates bank reserves, not currency in circulation. Inflation depends on many factors including velocity of money and supply constraints.',
    insight: 'Hyperinflation is extremely rare - dont confuse moderate inflation with it!'
  },
  {
    statement: 'Tax cuts for the wealthy create jobs through trickle-down economics.',
    source: 'Policy Proposal',
    sourceType: 'Think Tank',
    difficulty: 'Intermediate',
    redFlags: [
      'Oversimplified causal claim',
      'Ignores research evidence on effectiveness',
      'Assumes wealthy invest domestically',
      'Ignores demand-side job creation'
    ],
    correctVerdict: 'Needs Context',
    betterAnswer: 'Some supply-side effects exist but are smaller than often claimed. Research shows the trickle-down effect is limited.',
    insight: 'Economic claims often oversimplify complex cause-and-effect relationships.'
  },
  {
    statement: 'The national debt will bankrupt our children and grandchildren.',
    source: 'Town Hall Meeting',
    sourceType: 'Politician',
    difficulty: 'Intermediate',
    redFlags: [
      'Ignores debt-to-GDP context',
      'Ignores who holds the debt',
      'Ignores benefits of the spending',
      'Uses emotional framing over analysis'
    ],
    correctVerdict: 'Needs Context',
    betterAnswer: 'Sustainability depends on GDP growth rate vs interest rate, what the debt funded, and who holds it. A nation with its own currency cannot "go bankrupt" like a household.',
    insight: 'Government debt is not like household debt - the analogy misleads!'
  },
  {
    statement: 'Minimum wage increases always cause unemployment to rise.',
    source: 'Economics Debate',
    sourceType: 'Commentator',
    difficulty: 'Advanced',
    redFlags: [
      'Uses absolute word "always"',
      'Ignores monopsony power in labor markets',
      'Ignores empirical research showing mixed results',
      'Assumes perfectly competitive labor market'
    ],
    correctVerdict: 'Misleading',
    betterAnswer: 'Research shows modest minimum wage increases have small or no negative employment effects, especially where employers have market power.',
    insight: 'Real labor markets are more complex than the simple supply-demand model suggests.'
  },
  {
    statement: 'Free trade agreements only benefit large corporations, not workers.',
    source: 'Protest Rally',
    sourceType: 'Activist Group',
    difficulty: 'Advanced',
    redFlags: [
      'Uses absolute "only" language',
      'Ignores consumer benefits from lower prices',
      'Ignores job creation in export sectors',
      'Oversimplifies winners and losers'
    ],
    correctVerdict: 'Needs Context',
    betterAnswer: 'Trade creates winners and losers. Consumers benefit from lower prices, but some workers in competing industries lose. Good policy addresses displacement.',
    insight: 'Trade has real losers who deserve policy support, but the overall effects are nuanced.'
  }
];

// Filtered claims
let filteredClaims = [];
let checkboxes = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  let cy = drawHeight + 8;

  difficultySelect = createSelect();
  difficultySelect.position(10, cy);
  difficultySelect.option('All');
  difficultySelect.option('Basic');
  difficultySelect.option('Intermediate');
  difficultySelect.option('Advanced');
  difficultySelect.selected('All');
  difficultySelect.style('font-size', '12px');
  difficultySelect.changed(resetQuiz);

  verdictSelect = createSelect();
  verdictSelect.position(10, cy + 28);
  verdictSelect.option('-- Select Verdict --');
  verdictSelect.option('Accurate');
  verdictSelect.option('Misleading');
  verdictSelect.option('Needs Context');
  verdictSelect.selected('-- Select Verdict --');
  verdictSelect.style('font-size', '12px');

  submitButton = createButton('Submit Evaluation');
  submitButton.position(canvasWidth / 2 - 10, cy + 28);
  submitButton.mousePressed(submitEvaluation);
  submitButton.style('font-size', '12px');

  nextButton = createButton('Next Claim');
  nextButton.position(canvasWidth - 100, cy + 28);
  nextButton.mousePressed(nextClaim);
  nextButton.style('font-size', '12px');

  filterClaims();
  createRedFlagCheckboxes();

  describe('Policy claim evaluator quiz where students assess economic policy statements for accuracy', LABEL);
}

function filterClaims() {
  let diff = difficultySelect.value();
  if (diff === 'All') {
    filteredClaims = claims.slice();
  } else {
    filteredClaims = claims.filter(c => c.difficulty === diff);
  }
  currentClaim = 0;
}

function resetQuiz() {
  filterClaims();
  score = 0;
  totalAnswered = 0;
  submitted = false;
  showAnalysis = false;
  verdictSelect.selected('-- Select Verdict --');
  createRedFlagCheckboxes();
}

function createRedFlagCheckboxes() {
  // Remove old checkboxes
  for (let cb of checkboxes) {
    cb.remove();
  }
  checkboxes = [];
  selectedRedFlags = [];

  if (filteredClaims.length === 0) return;

  let claim = filteredClaims[currentClaim % filteredClaims.length];
  let startY = 240;
  for (let i = 0; i < claim.redFlags.length; i++) {
    let cb = createCheckbox(claim.redFlags[i], false);
    cb.position(margin + 10, startY + i * 28);
    cb.style('font-size', '11px');
    cb.style('max-width', (canvasWidth - 60) + 'px');
    checkboxes.push(cb);
  }
}

function submitEvaluation() {
  if (filteredClaims.length === 0) return;
  if (submitted) return;
  if (verdictSelect.value() === '-- Select Verdict --') return;

  submitted = true;
  showAnalysis = true;
  totalAnswered++;

  let claim = filteredClaims[currentClaim % filteredClaims.length];

  // Count correct red flags
  let flagsCorrect = 0;
  for (let cb of checkboxes) {
    if (cb.checked()) flagsCorrect++;
  }

  // Score: verdict match + red flags identified
  let verdictCorrect = verdictSelect.value() === claim.correctVerdict;
  let flagRatio = flagsCorrect / claim.redFlags.length;

  if (verdictCorrect && flagRatio >= 0.5) score++;
}

function nextClaim() {
  if (filteredClaims.length === 0) return;
  currentClaim = (currentClaim + 1) % filteredClaims.length;
  submitted = false;
  showAnalysis = false;
  verdictSelect.selected('-- Select Verdict --');
  createRedFlagCheckboxes();
}

function draw() {
  // Backgrounds
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  if (filteredClaims.length === 0) {
    noStroke();
    fill('gray');
    textAlign(CENTER, CENTER);
    textSize(14);
    text('No claims for selected difficulty.', canvasWidth / 2, drawHeight / 2);
    return;
  }

  let claim = filteredClaims[currentClaim % filteredClaims.length];

  // Title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(18);
  text('Policy Claim Evaluator', canvasWidth / 2, 8);

  // Score tracker
  textSize(12);
  textAlign(RIGHT, TOP);
  fill('darkslategray');
  text('Score: ' + score + '/' + totalAnswered, canvasWidth - margin, 10);

  // Claim number
  textAlign(LEFT, TOP);
  fill('gray');
  textSize(11);
  text('Claim ' + ((currentClaim % filteredClaims.length) + 1) + ' of ' + filteredClaims.length, margin, 32);

  // Difficulty badge
  let badgeColor;
  if (claim.difficulty === 'Basic') badgeColor = 'forestgreen';
  else if (claim.difficulty === 'Intermediate') badgeColor = 'goldenrod';
  else badgeColor = 'crimson';

  fill(badgeColor);
  textSize(10);
  textAlign(RIGHT, TOP);
  text(claim.difficulty, canvasWidth - margin, 32);

  // Claim card
  let cardY = 48;
  let cardH = 95;
  stroke('slategray');
  strokeWeight(1.5);
  fill('white');
  rect(margin, cardY, canvasWidth - 2 * margin, cardH, 8);

  // Source badge
  noStroke();
  fill('gray');
  textSize(10);
  textAlign(LEFT, TOP);
  text('Source: ' + claim.source + ' (' + claim.sourceType + ')', margin + 12, cardY + 8);

  // Claim text
  fill('black');
  textSize(14);
  textAlign(CENTER, TOP);
  let claimText = claim.statement;
  text(claimText, canvasWidth / 2, cardY + 28, canvasWidth - 2 * margin - 20, cardH - 35);

  // Quote marks
  fill('lightgray');
  textSize(30);
  textAlign(LEFT, TOP);
  text('\u201C', margin + 5, cardY + 22);
  textAlign(RIGHT, TOP);
  text('\u201D', canvasWidth - margin - 5, cardY + cardH - 35);

  // Red flags section header
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, TOP);
  text('Identify the red flags:', margin, 155);

  fill('gray');
  textSize(10);
  text('Check all issues you find with this claim:', margin, 172);

  // Verdict section header
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, TOP);
  text('Your verdict:', margin, 195);

  // Checkboxes are positioned by p5 elements (created in createRedFlagCheckboxes)

  // Analysis reveal (after submission)
  if (showAnalysis && submitted) {
    let analysisY = 370;

    // Analysis background
    let verdictCorrect = verdictSelect.value() === claim.correctVerdict;

    stroke(verdictCorrect ? 'darkgreen' : 'crimson');
    strokeWeight(2);
    fill(verdictCorrect ? color(240, 255, 240) : color(255, 240, 240));
    rect(margin, analysisY, canvasWidth - 2 * margin, 140, 8);

    noStroke();
    textAlign(CENTER, TOP);

    if (verdictCorrect) {
      fill('darkgreen');
      textSize(14);
      text('Correct! The claim is: ' + claim.correctVerdict, canvasWidth / 2, analysisY + 8);
    } else {
      fill('crimson');
      textSize(14);
      text('Not quite. The claim is: ' + claim.correctVerdict, canvasWidth / 2, analysisY + 8);
    }

    // Better answer
    fill('black');
    textSize(11);
    textAlign(LEFT, TOP);
    text('Better analysis:', margin + 10, analysisY + 30);

    fill('darkslategray');
    textSize(10);
    text(claim.betterAnswer, margin + 10, analysisY + 46, canvasWidth - 2 * margin - 20, 50);

    // Insight
    fill('steelblue');
    textSize(11);
    textAlign(CENTER, TOP);
    text(claim.insight, canvasWidth / 2, analysisY + 110, canvasWidth - 2 * margin - 20, 30);
  }

  // Control area labels
  noStroke();
  fill('black');
  textSize(10);
  textAlign(LEFT, CENTER);
  text('Difficulty:', 10, drawHeight + 60);

  // Progress bar
  let progW = canvasWidth - 2 * margin;
  let progY = drawHeight + controlHeight - 15;
  fill('lightgray');
  noStroke();
  rect(margin, progY, progW, 6, 3);
  let progFill = filteredClaims.length > 0 ? ((currentClaim % filteredClaims.length) + 1) / filteredClaims.length : 0;
  fill('steelblue');
  rect(margin, progY, progW * progFill, 6, 3);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);

  let cy = drawHeight + 8;
  submitButton.position(canvasWidth / 2 - 10, cy + 28);
  nextButton.position(canvasWidth - 100, cy + 28);

  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasHeight = drawHeight + controlHeight;
}
