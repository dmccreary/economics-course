// Credit Score Simulator MicroSim
// See how financial behaviors affect your credit score
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Credit score factors
let factors = [
  { name: 'Payment History',   weight: 0.35, score: 90, color: 'steelblue' },
  { name: 'Credit Utilization', weight: 0.30, score: 80, color: 'green' },
  { name: 'Credit Length',     weight: 0.15, score: 70, color: 'darkorange' },
  { name: 'Credit Mix',       weight: 0.10, score: 75, color: 'purple' },
  { name: 'New Credit',       weight: 0.10, score: 85, color: 'teal' }
];

// Behaviors with impacts
let behaviors = [
  { name: 'Missed payment',        factor: 0, impact: -25, active: false },
  { name: 'Maxed credit card',     factor: 1, impact: -20, active: false },
  { name: 'Opened new account',    factor: 4, impact: -8,  active: false },
  { name: 'Paid on time 6 months', factor: 0, impact: 10,  active: false },
  { name: 'Reduced debt 50%',      factor: 1, impact: 15,  active: false }
];

let checkboxes = [];
let resetBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Behavior checkboxes
  for (let i = 0; i < behaviors.length; i++) {
    let cb = createCheckbox(behaviors[i].name, false);
    cb.position(10, drawHeight + 5 + i * 22);
    cb.style('font-size', '12px');
    let idx = i;
    cb.changed(() => { behaviors[idx].active = cb.checked(); });
    checkboxes.push(cb);
  }

  resetBtn = createButton('Reset');
  resetBtn.position(10, drawHeight + 5 + behaviors.length * 22 + 2);
  resetBtn.mousePressed(() => {
    for (let i = 0; i < behaviors.length; i++) {
      behaviors[i].active = false;
      checkboxes[i].checked(false);
    }
  });

  describe('Credit score simulator showing how financial behaviors affect your FICO score across five factors', LABEL);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Credit Score Simulator', canvasWidth / 2, 8);

  // Calculate adjusted factor scores
  let adjFactors = factors.map(f => ({ ...f }));
  for (let b of behaviors) {
    if (b.active) {
      adjFactors[b.factor].score = constrain(adjFactors[b.factor].score + b.impact, 0, 100);
    }
  }

  // Calculate overall score (300-850 range)
  let weightedScore = 0;
  for (let f of adjFactors) {
    weightedScore += f.weight * f.score;
  }
  let creditScore = round(map(weightedScore, 0, 100, 300, 850));

  // Score gauge
  let gaugeX = canvasWidth * 0.35;
  let gaugeY = 130;
  let gaugeR = 90;

  // Background arc segments
  let scoreRanges = [
    { min: 300, max: 580, label: 'Poor',       color: 'red' },
    { min: 580, max: 670, label: 'Fair',       color: 'orange' },
    { min: 670, max: 740, label: 'Good',       color: 'gold' },
    { min: 740, max: 800, label: 'Very Good',  color: 'yellowgreen' },
    { min: 800, max: 850, label: 'Exceptional', color: 'green' }
  ];

  for (let r of scoreRanges) {
    let a1 = map(r.min, 300, 850, PI + 0.3, TWO_PI - 0.3);
    let a2 = map(r.max, 300, 850, PI + 0.3, TWO_PI - 0.3);
    stroke(r.color);
    strokeWeight(15);
    noFill();
    arc(gaugeX, gaugeY, gaugeR * 2, gaugeR * 2, a1, a2);
  }

  // Needle
  let needleAngle = map(creditScore, 300, 850, PI + 0.3, TWO_PI - 0.3);
  stroke('black');
  strokeWeight(3);
  let nx = gaugeX + cos(needleAngle) * (gaugeR - 20);
  let ny = gaugeY + sin(needleAngle) * (gaugeR - 20);
  line(gaugeX, gaugeY, nx, ny);
  fill('black');
  noStroke();
  circle(gaugeX, gaugeY, 10);

  // Score value
  noStroke();
  textSize(36);
  textAlign(CENTER, CENTER);
  let scoreColor;
  if (creditScore < 580) scoreColor = color('red');
  else if (creditScore < 670) scoreColor = color('orange');
  else if (creditScore < 740) scoreColor = color('goldenrod');
  else if (creditScore < 800) scoreColor = color('yellowgreen');
  else scoreColor = color('green');
  fill(scoreColor);
  text(creditScore, gaugeX, gaugeY + 35);

  // Category label
  let category = '';
  for (let r of scoreRanges) {
    if (creditScore >= r.min && creditScore <= r.max) category = r.label;
  }
  textSize(14);
  fill('black');
  text(category, gaugeX, gaugeY + 58);

  // Scale labels
  textSize(10);
  fill('gray');
  textAlign(LEFT, CENTER);
  text('300', gaugeX - gaugeR - 15, gaugeY + 10);
  textAlign(RIGHT, CENTER);
  text('850', gaugeX + gaugeR + 15, gaugeY + 10);

  // Factor breakdown (right side)
  let panelX = canvasWidth * 0.62;
  let panelY = 40;

  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, TOP);
  text('Score Factors', panelX, panelY);

  panelY += 20;
  let barW = canvasWidth - panelX - 20;

  for (let i = 0; i < adjFactors.length; i++) {
    let f = adjFactors[i];
    let y = panelY + i * 40;

    // Factor name and weight
    fill('black');
    textSize(11);
    noStroke();
    textAlign(LEFT, TOP);
    text(f.name + ' (' + nf(f.weight * 100, 1, 0) + '%)', panelX, y);

    // Bar background
    fill(230);
    noStroke();
    rect(panelX, y + 16, barW, 12, 3);

    // Bar fill
    let fw = map(f.score, 0, 100, 0, barW);
    fill(f.score > 70 ? f.color : 'red');
    rect(panelX, y + 16, fw, 12, 3);

    // Value
    fill('black');
    textSize(10);
    textAlign(RIGHT, CENTER);
    text(f.score + '/100', panelX + barW, y + 22);
  }

  // Interest rate impact
  let rateY = panelY + adjFactors.length * 40 + 15;
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, TOP);
  text('Typical Impact:', panelX, rateY);

  textSize(11);
  rateY += 18;
  let mortRate, autoRate;
  if (creditScore >= 760) { mortRate = '6.5%'; autoRate = '5.0%'; }
  else if (creditScore >= 700) { mortRate = '7.0%'; autoRate = '6.5%'; }
  else if (creditScore >= 660) { mortRate = '7.8%'; autoRate = '8.5%'; }
  else if (creditScore >= 600) { mortRate = '8.5%'; autoRate = '12%'; }
  else { mortRate = '10%+'; autoRate = '15%+'; }

  text('Mortgage: ~' + mortRate, panelX, rateY);
  text('Auto loan: ~' + autoRate, panelX, rateY + 16);
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
