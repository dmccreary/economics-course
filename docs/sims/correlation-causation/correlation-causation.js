// Correlation vs Causation Detector MicroSim
// Evaluate claims - identify confounders, reverse causation, coincidence
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

let claims = [
  {
    statement: 'Countries that eat more cheese have more Nobel Prize winners.',
    options: ['True Causation', 'Common Cause', 'Reverse Causation', 'Coincidence'],
    correct: 1,
    explanation: 'Wealth is the common cause. Wealthier countries consume more cheese AND invest more in education/research.',
    diagram: 'Wealth → Cheese\nWealth → Nobel Prizes'
  },
  {
    statement: 'People who own horses live longer than people who don\'t.',
    options: ['True Causation', 'Common Cause', 'Reverse Causation', 'Coincidence'],
    correct: 1,
    explanation: 'Wealth is the common cause. Wealthy people can afford horses AND better healthcare, nutrition, and less stressful lives.',
    diagram: 'Wealth → Horse ownership\nWealth → Better healthcare'
  },
  {
    statement: 'Cities with more firefighters have more fires.',
    options: ['True Causation', 'Common Cause', 'Reverse Causation', 'Coincidence'],
    correct: 1,
    explanation: 'City size is the common cause. Larger cities have both more firefighters AND more buildings that can catch fire.',
    diagram: 'City size → More firefighters\nCity size → More fires'
  },
  {
    statement: 'Students who take AP classes get into better colleges.',
    options: ['True Causation', 'Common Cause', 'Reverse Causation', 'Coincidence'],
    correct: 2,
    explanation: 'Likely reverse causation. Motivated, high-achieving students both seek AP classes AND are the type to get into good colleges.',
    diagram: 'Motivation → Takes AP classes\nMotivation → Gets into good college'
  },
  {
    statement: 'Organic food purchases correlate with autism diagnosis rates over the past 20 years.',
    options: ['True Causation', 'Common Cause', 'Reverse Causation', 'Coincidence'],
    correct: 3,
    explanation: 'Pure coincidence. Both trends happened to increase over the same period, but have no causal connection whatsoever.',
    diagram: 'Organic food ↑ (trend)\nAutism diagnoses ↑ (better detection)\nNo connection!'
  },
  {
    statement: 'Ice cream sales and drowning deaths both increase in summer.',
    options: ['True Causation', 'Common Cause', 'Reverse Causation', 'Coincidence'],
    correct: 1,
    explanation: 'Hot weather is the common cause. Heat drives both ice cream purchases AND more swimming, leading to more drownings.',
    diagram: 'Hot weather → Ice cream sales\nHot weather → More swimming → Drownings'
  }
];

let currentClaim = 0;
let selectedAnswer = -1;
let revealed = false;
let score = 0;
let answered = 0;

let optionButtons = [];
let nextButton, revealButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Answer buttons created in draw area (positioned dynamically)
  for (let i = 0; i < 4; i++) {
    let btn = createButton(claims[0].options[i]);
    btn.position(30, 280 + i * 32);
    btn.style('font-size', '13px');
    btn.style('width', '200px');
    btn.style('text-align', 'left');
    let idx = i;
    btn.mousePressed(() => selectAnswer(idx));
    optionButtons.push(btn);
  }

  revealButton = createButton('Check Answer');
  revealButton.position(10, drawHeight + 10);
  revealButton.mousePressed(revealAnswer);

  nextButton = createButton('Next Claim');
  nextButton.position(120, drawHeight + 10);
  nextButton.mousePressed(nextClaim);

  updateButtons();
  describe('Correlation vs causation detector quiz - evaluate causal claims and identify logical fallacies', LABEL);
}

function updateButtons() {
  let c = claims[currentClaim];
  for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].html(c.options[i]);
    optionButtons[i].style('background-color', 'white');
    optionButtons[i].style('color', 'black');
  }
  if (selectedAnswer >= 0) {
    optionButtons[selectedAnswer].style('background-color', 'steelblue');
    optionButtons[selectedAnswer].style('color', 'white');
  }
  if (revealed) {
    optionButtons[c.correct].style('background-color', 'green');
    optionButtons[c.correct].style('color', 'white');
    if (selectedAnswer >= 0 && selectedAnswer !== c.correct) {
      optionButtons[selectedAnswer].style('background-color', 'crimson');
      optionButtons[selectedAnswer].style('color', 'white');
    }
  }
}

function selectAnswer(idx) {
  if (revealed) return;
  selectedAnswer = idx;
  updateButtons();
}

function revealAnswer() {
  if (selectedAnswer < 0 || revealed) return;
  revealed = true;
  answered++;
  if (selectedAnswer === claims[currentClaim].correct) {
    score++;
  }
  updateButtons();
}

function nextClaim() {
  currentClaim = (currentClaim + 1) % claims.length;
  selectedAnswer = -1;
  revealed = false;
  updateButtons();
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
  textSize(18);
  text('Correlation vs Causation Detector', canvasWidth / 2, 8);

  // Score
  textSize(13);
  fill('gray');
  textAlign(RIGHT, TOP);
  text('Score: ' + score + '/' + answered, canvasWidth - 15, 12);

  // Claim number
  textAlign(LEFT, TOP);
  fill('steelblue');
  textSize(12);
  text('Claim ' + (currentClaim + 1) + ' of ' + claims.length, 15, 32);

  // Claim statement
  let c = claims[currentClaim];
  fill('black');
  textSize(16);
  textAlign(LEFT, TOP);
  noStroke();

  // Word wrap the claim
  let claimY = 55;
  let claimW = canvasWidth - 40;
  drawWrappedText('"' + c.statement + '"', 20, claimY, claimW, 20);

  // Instructions
  if (!revealed) {
    fill('gray');
    textSize(12);
    textAlign(LEFT, TOP);
    text('What explains this correlation?', 20, 140);
  }

  // Reposition buttons based on canvas width
  for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].position(30, 160 + i * 35);
    optionButtons[i].style('width', (canvasWidth * 0.5) + 'px');
  }

  // Explanation panel (shown after reveal)
  if (revealed) {
    let panelX = canvasWidth * 0.55;
    let panelY = 155;
    let panelW = canvasWidth * 0.4;

    fill(255, 255, 240);
    stroke('goldenrod');
    strokeWeight(1);
    rect(panelX, panelY, panelW, 150, 8);

    noStroke();
    fill(selectedAnswer === c.correct ? 'green' : 'crimson');
    textSize(14);
    textAlign(LEFT, TOP);
    text(selectedAnswer === c.correct ? 'Correct!' : 'Not quite!', panelX + 10, panelY + 10);

    fill('black');
    textSize(11);
    drawWrappedText(c.explanation, panelX + 10, panelY + 30, panelW - 20, 15);

    // Diagram
    fill('darkblue');
    textSize(10);
    let lines = c.diagram.split('\n');
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], panelX + 10, panelY + 100 + i * 14);
    }
  }

  // Visual: two variables with arrow
  let vizY = 330;
  if (!revealed) {
    // Show two correlated variables
    fill('steelblue');
    noStroke();
    ellipse(canvasWidth * 0.3, vizY, 60, 40);
    fill('white');
    textSize(11);
    textAlign(CENTER, CENTER);
    text('Variable A', canvasWidth * 0.3, vizY);

    fill('crimson');
    noStroke();
    ellipse(canvasWidth * 0.7, vizY, 60, 40);
    fill('white');
    text('Variable B', canvasWidth * 0.7, vizY);

    // Arrow with question mark
    stroke('gray');
    strokeWeight(2);
    line(canvasWidth * 0.3 + 35, vizY, canvasWidth * 0.7 - 35, vizY);
    noStroke();
    fill('gray');
    textSize(18);
    textAlign(CENTER, CENTER);
    text('?', canvasWidth * 0.5, vizY - 12);
  } else {
    // Show the actual relationship type
    let typeLabel = c.options[c.correct];
    fill('black');
    textSize(14);
    textAlign(CENTER, TOP);
    noStroke();
    text('Relationship: ' + typeLabel, canvasWidth / 2, vizY);
  }

  // Progress dots
  let dotY = drawHeight - 15;
  for (let i = 0; i < claims.length; i++) {
    fill(i === currentClaim ? 'steelblue' : 'lightgray');
    noStroke();
    circle(canvasWidth / 2 - (claims.length * 12) / 2 + i * 12 + 6, dotY, 8);
  }
}

function drawWrappedText(txt, x, y, maxW, lineH) {
  let words = txt.split(' ');
  let line = '';
  let cy = y;
  for (let w of words) {
    let test = line + w + ' ';
    if (textWidth(test) > maxW && line.length > 0) {
      text(line.trim(), x, cy);
      cy += lineH;
      line = w + ' ';
    } else {
      line = test;
    }
  }
  if (line.trim().length > 0) text(line.trim(), x, cy);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
