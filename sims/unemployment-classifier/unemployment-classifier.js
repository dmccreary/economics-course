// Unemployment Type Classifier MicroSim
// Classify unemployment scenarios as frictional, structural, or cyclical
// MicroSim template version 2026.03

let canvasWidth = 580;
let drawHeight = 480;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

let scenarios = [
  { text: 'Maria just graduated with a marketing degree and is interviewing at several companies.',
    answer: 'Frictional', hint: 'graduating, interviewing',
    explain: 'Maria is between school and work. She has skills that match available jobs \u2014 it just takes time to find the right match. This is normal job search friction.' },
  { text: 'Tom was a factory assembly worker, but his plant replaced workers with robots.',
    answer: 'Structural', hint: 'replaced by technology',
    explain: 'Tom\'s skills no longer match what employers need. Automation permanently changed the type of work available. He may need retraining for new industries.' },
  { text: 'During the recession, Sara\'s company laid off 30% of workers including her.',
    answer: 'Cyclical', hint: 'recession, layoffs',
    explain: 'Sara lost her job because of an economic downturn, not because her skills are outdated. When the economy recovers, similar jobs will return.' },
  { text: 'Jake quit his job to move closer to his aging parents. He\'s now job hunting in a new city.',
    answer: 'Frictional', hint: 'quit, job hunting',
    explain: 'Jake voluntarily left and is searching for a new position. His skills are still in demand \u2014 he just needs time to find a match in his new location.' },
  { text: 'Lisa was a travel agent for 15 years, but most people now book trips online.',
    answer: 'Structural', hint: 'industry changed permanently',
    explain: 'The internet permanently reduced demand for traditional travel agents. Lisa\'s specific skills are no longer needed. She must adapt to a fundamentally different job market.' },
  { text: 'The economic downturn caused Mike\'s construction company to halt all projects.',
    answer: 'Cyclical', hint: 'economic downturn',
    explain: 'Construction is highly sensitive to economic cycles. When the economy recovers, construction projects (and Mike\'s type of job) will resume.' },
  { text: 'Anna is a coal miner in West Virginia where mines are permanently closing.',
    answer: 'Structural', hint: 'industry permanently declining',
    explain: 'Coal mining is declining due to competition from natural gas and renewables. This isn\'t a temporary downturn \u2014 the industry is structurally shrinking.' },
  { text: 'David left his accounting job for a better opportunity that fell through. He\'s applying elsewhere.',
    answer: 'Frictional', hint: 'left voluntarily, applying',
    explain: 'David has marketable skills (accounting) and is actively searching. This is temporary friction in the job matching process, not a skills mismatch or economic downturn.' },
  { text: 'During the pandemic lockdowns, restaurants closed and Maria lost her server job.',
    answer: 'Cyclical', hint: 'pandemic, temporary closures',
    explain: 'The pandemic caused a sudden economic contraction. Restaurant jobs returned when restrictions lifted. The demand for servers didn\'t permanently disappear.' },
  { text: 'Chris has been a taxi driver for 20 years, but rideshare apps have taken most of his customers.',
    answer: 'Structural', hint: 'technology disrupted industry',
    explain: 'Rideshare technology permanently changed the taxi industry. Chris\'s traditional taxi skills don\'t match the new gig economy model. This is a structural shift, not a cycle.' },
  { text: 'After graduating from nursing school, Priya is comparing offers from three hospitals.',
    answer: 'Frictional', hint: 'comparing offers',
    explain: 'Priya has in-demand skills and multiple options. She\'s simply taking time to find the best match \u2014 classic frictional unemployment.' },
  { text: 'When consumer spending dropped sharply, the auto manufacturer cut production and laid off workers.',
    answer: 'Cyclical', hint: 'spending dropped, production cut',
    explain: 'Auto manufacturing rises and falls with the business cycle. When consumer confidence and spending recover, production and hiring increase.' }
];

let currentIdx = 0;
let selectedAnswer = '';
let showHint = false;
let revealed = false;
let score = 0;
let attempted = 0;
let shuffled = false;

let types = ['Frictional', 'Structural', 'Cyclical'];
let typeColors = { 'Frictional': 'green', 'Structural': 'darkorange', 'Cyclical': 'steelblue' };
let typeDefs = {
  'Frictional': 'Normal job search time between positions',
  'Structural': 'Skills/industry mismatch due to permanent changes',
  'Cyclical': 'Job loss due to economic downturns'
};

let nextBtn, hintBtn, resetBtn;

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  shuffleScenarios();

  nextBtn = createButton('Next Scenario');
  nextBtn.mousePressed(nextScenario);

  hintBtn = createButton('Show Hint');
  hintBtn.mousePressed(() => { showHint = true; });

  resetBtn = createButton('Start Over');
  resetBtn.mousePressed(resetQuiz);

  positionControls();
  describe('Unemployment type classifier quiz with frictional, structural, and cyclical categories', LABEL);
}

function shuffleScenarios() {
  for (let i = scenarios.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [scenarios[i], scenarios[j]] = [scenarios[j], scenarios[i]];
  }
  shuffled = true;
}

function positionControls() {
  let y = drawHeight + 12;
  nextBtn.position(15, y);
  hintBtn.position(150, y);
  resetBtn.position(270, y);
}

function nextScenario() {
  if (currentIdx < scenarios.length - 1) {
    currentIdx++;
    selectedAnswer = '';
    showHint = false;
    revealed = false;
  }
}

function resetQuiz() {
  shuffleScenarios();
  currentIdx = 0;
  selectedAnswer = '';
  showHint = false;
  revealed = false;
  score = 0;
  attempted = 0;
}

function draw() {
  // Background
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let scenario = scenarios[currentIdx];

  // Title
  noStroke();
  fill('black');
  textSize(18);
  textAlign(CENTER, TOP);
  text('Unemployment Type Classifier', canvasWidth / 2, 8);

  // Progress and score
  textSize(12);
  fill('gray');
  textAlign(RIGHT, TOP);
  text('Scenario ' + (currentIdx + 1) + ' of ' + scenarios.length, canvasWidth - 15, 12);
  fill('steelblue');
  textAlign(LEFT, TOP);
  text('Score: ' + score + '/' + attempted, 15, 12);

  // Scenario card
  let cardX = 20;
  let cardY = 40;
  let cardW = canvasWidth - 40;
  let cardH = 90;

  fill('white');
  stroke('steelblue');
  strokeWeight(2);
  rect(cardX, cardY, cardW, cardH, 8);

  // Person icon
  noStroke();
  fill('steelblue');
  ellipse(cardX + 30, cardY + 28, 24, 24);
  fill('white');
  textSize(14);
  textAlign(CENTER, CENTER);
  text('\ud83d\udc64', cardX + 30, cardY + 28);

  // Scenario text
  fill('black');
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text(scenario.text, cardX + 55, cardY + 15, cardW - 70, cardH - 25);

  // Hint
  if (showHint) {
    fill('darkorange');
    textSize(11);
    textAlign(LEFT, BOTTOM);
    text('Hint: Look for keywords like "' + scenario.hint + '"', cardX + 10, cardY + cardH - 5);
  }

  // Three category boxes
  let catY = cardY + cardH + 25;
  let catW = (cardW - 30) / 3;
  let catH = 80;

  for (let i = 0; i < types.length; i++) {
    let t = types[i];
    let cx = cardX + i * (catW + 15);
    let isSelected = selectedAnswer === t;
    let isCorrect = revealed && t === scenario.answer;
    let isWrong = revealed && isSelected && t !== scenario.answer;

    // Box
    if (isCorrect) {
      fill(200, 255, 200);
      stroke('green');
    } else if (isWrong) {
      fill(255, 220, 220);
      stroke('red');
    } else if (isSelected) {
      fill(220, 235, 255);
      stroke('steelblue');
    } else {
      fill('white');
      stroke('silver');
    }
    strokeWeight(isSelected || isCorrect ? 3 : 1);
    rect(cx, catY, catW, catH, 8);

    // Type name
    noStroke();
    fill(typeColors[t]);
    textSize(15);
    textAlign(CENTER, TOP);
    text(t, cx + catW / 2, catY + 10);

    // Definition
    fill('gray');
    textSize(10);
    textAlign(CENTER, TOP);
    text(typeDefs[t], cx + 8, catY + 32, catW - 16, 45);

    // Correct/wrong indicator
    if (isCorrect) {
      fill('green');
      textSize(20);
      textAlign(CENTER, CENTER);
      text('\u2713', cx + catW - 18, catY + 15);
    } else if (isWrong) {
      fill('red');
      textSize(20);
      textAlign(CENTER, CENTER);
      text('\u2717', cx + catW - 18, catY + 15);
    }
  }

  // Submit button (if answer selected but not revealed)
  let submitY = catY + catH + 15;
  if (selectedAnswer && !revealed) {
    fill('steelblue');
    noStroke();
    rect(cardX, submitY, 120, 32, 5);
    fill('white');
    textSize(13);
    textAlign(CENTER, CENTER);
    text('Submit', cardX + 60, submitY + 16);
  }

  // Feedback area
  if (revealed) {
    let fbY = submitY;
    let correct = selectedAnswer === scenario.answer;

    noStroke();
    fill(correct ? 'green' : 'orangered');
    textSize(15);
    textAlign(LEFT, TOP);
    text(correct ? '\u2713 Correct!' : '\u2717 Incorrect \u2014 It\'s ' + scenario.answer, cardX, fbY);

    fill('black');
    textSize(12);
    textAlign(LEFT, TOP);
    text(scenario.explain, cardX, fbY + 24, cardW, 70);

    // Tips for each type
    let tipY = fbY + 100;
    fill('gray');
    textSize(10);
    textAlign(LEFT, TOP);
    text('Quick Guide:', cardX, tipY);
    fill('green');
    text('Frictional: "quit," "graduated," "searching," "interviewing"', cardX + 80, tipY);
    fill('darkorange');
    text('Structural: "replaced by technology," "industry declining," "skills outdated"', cardX + 80, tipY + 14);
    fill('steelblue');
    text('Cyclical: "recession," "downturn," "spending dropped," "economy contracted"', cardX + 80, tipY + 28);
  }

  // End of quiz summary
  if (currentIdx === scenarios.length - 1 && revealed) {
    let sumY = drawHeight - 55;
    noStroke();
    fill('black');
    textSize(14);
    textAlign(CENTER, TOP);
    text('Quiz Complete! Final Score: ' + score + '/' + attempted, canvasWidth / 2, sumY);
    let pct = attempted > 0 ? round(score / attempted * 100) : 0;
    fill(pct >= 80 ? 'green' : pct >= 60 ? 'darkorange' : 'red');
    textSize(12);
    text(pct + '% \u2014 ' + (pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good effort!' : 'Keep practicing!'), canvasWidth / 2, sumY + 22);
  }

  // Control area
  noStroke();
  fill('gray');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Click a category, then submit your answer.', 380, drawHeight + 22);
}

function mousePressed() {
  let scenario = scenarios[currentIdx];
  let cardX = 20;
  let cardW = canvasWidth - 40;
  let cardH = 90;
  let cardY = 40;

  // Check category box clicks
  let catY = cardY + cardH + 25;
  let catW = (cardW - 30) / 3;
  let catH2 = 80;

  if (!revealed) {
    for (let i = 0; i < types.length; i++) {
      let cx = cardX + i * (catW + 15);
      if (mouseX >= cx && mouseX <= cx + catW && mouseY >= catY && mouseY <= catY + catH2) {
        selectedAnswer = types[i];
        return;
      }
    }

    // Check submit button
    let submitY = catY + catH2 + 15;
    if (selectedAnswer && mouseX >= cardX && mouseX <= cardX + 120 && mouseY >= submitY && mouseY <= submitY + 32) {
      revealed = true;
      attempted++;
      if (selectedAnswer === scenario.answer) {
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
