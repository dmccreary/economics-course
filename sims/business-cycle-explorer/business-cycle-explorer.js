// Business Cycle Explorer MicroSim
// Click on phases to learn about expansion, peak, contraction, trough
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Business cycle phases
let phases = [
  {
    name: 'Expansion',
    color: [76, 175, 80],
    desc: 'Economy is growing',
    details: [
      'GDP rising, businesses hiring',
      'Consumer confidence high',
      'Stock market generally up',
      'Example: 2010-2019 expansion'
    ]
  },
  {
    name: 'Peak',
    color: [255, 193, 7],
    desc: 'Growth reaches maximum',
    details: [
      'Economy at full capacity',
      'Inflation may be rising',
      'Interest rates often high',
      'Example: Late 2019 pre-COVID'
    ]
  },
  {
    name: 'Contraction',
    color: [244, 67, 54],
    desc: 'Economy is shrinking',
    details: [
      'GDP declining, layoffs increase',
      'Consumer spending drops',
      'Business profits fall',
      'Example: 2008 Financial Crisis'
    ]
  },
  {
    name: 'Trough',
    color: [255, 152, 0],
    desc: 'Economy hits bottom',
    details: [
      'GDP at its lowest point',
      'Unemployment at its highest',
      'Prices may stabilize or fall',
      'Example: April 2020 COVID low'
    ]
  }
];

let selectedPhase = -1;
let animDot = 0; // position along cycle (0-1)
let isAnimating = false;
let animSpeed = 0.003;
let playButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  playButton = createButton('Play Animation');
  playButton.position(10, drawHeight + 10);
  playButton.mousePressed(() => {
    isAnimating = !isAnimating;
    playButton.html(isAnimating ? 'Pause' : 'Play Animation');
  });

  let resetBtn = createButton('Reset');
  resetBtn.position(140, drawHeight + 10);
  resetBtn.mousePressed(() => {
    animDot = 0;
    isAnimating = false;
    selectedPhase = -1;
    playButton.html('Play Animation');
  });

  describe('Business cycle explorer showing four phases: expansion, peak, contraction, and trough with interactive details', LABEL);
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
  text('Business Cycle Explorer', canvasWidth * 0.4, 8);
  textSize(12);
  fill('gray');
  text('Click on any colored phase region to learn more', canvasWidth * 0.4, 30);

  // Draw cycle curve
  let cycleLeft = 60;
  let cycleRight = canvasWidth - 180;
  let cycleTop = 80;
  let cycleBottom = 320;
  let cycleMid = (cycleTop + cycleBottom) / 2;
  let amplitude = (cycleBottom - cycleTop) / 2.5;
  let cycleW = cycleRight - cycleLeft;

  // Trend line
  stroke('gray');
  strokeWeight(1);
  drawingContext.setLineDash([6, 4]);
  line(cycleLeft, cycleMid - 20, cycleRight, cycleMid - 20);
  drawingContext.setLineDash([]);
  noStroke();
  fill('gray');
  textSize(10);
  textAlign(LEFT, CENTER);
  text('Trend', cycleRight + 3, cycleMid - 20);

  // Axis labels
  fill('black');
  textSize(12);
  push();
  translate(15, cycleMid);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Real GDP', 0, 0);
  pop();

  textAlign(CENTER, TOP);
  text('Time', (cycleLeft + cycleRight) / 2, cycleBottom + 15);

  // Draw phase regions and curve
  // Phase boundaries (in terms of t: 0-1)
  let phaseBounds = [
    { start: 0.0,  end: 0.25 }, // Expansion
    { start: 0.25, end: 0.35 }, // Peak
    { start: 0.35, end: 0.65 }, // Contraction
    { start: 0.65, end: 0.75 }, // Trough
  ];
  // Second cycle
  let phaseBounds2 = [
    { start: 0.75, end: 1.0 }   // Expansion again
  ];

  // Draw colored backgrounds for phases
  for (let i = 0; i < phaseBounds.length; i++) {
    let x1 = cycleLeft + phaseBounds[i].start * cycleW;
    let x2 = cycleLeft + phaseBounds[i].end * cycleW;
    let c = phases[i].color;
    fill(c[0], c[1], c[2], selectedPhase === i ? 80 : 30);
    noStroke();
    rect(x1, cycleTop - 10, x2 - x1, cycleBottom - cycleTop + 20);

    // Phase label at top
    fill(c[0], c[1], c[2]);
    textSize(11);
    textAlign(CENTER, TOP);
    noStroke();
    text(phases[i].name, (x1 + x2) / 2, cycleTop - 8);
  }

  // Second expansion
  let x1 = cycleLeft + 0.75 * cycleW;
  let x2 = cycleRight;
  fill(phases[0].color[0], phases[0].color[1], phases[0].color[2], 30);
  noStroke();
  rect(x1, cycleTop - 10, x2 - x1, cycleBottom - cycleTop + 20);

  // Draw the GDP curve
  stroke('black');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let t = 0; t <= 1; t += 0.005) {
    let x = cycleLeft + t * cycleW;
    let y = cycleMid - 20 - amplitude * sin(t * TWO_PI - HALF_PI);
    // Add upward trend
    y -= t * 15;
    vertex(x, y);
  }
  endShape();

  // Animation dot
  if (isAnimating) {
    animDot += animSpeed;
    if (animDot > 1) animDot = 0;
    // Auto-select phase based on position
    for (let i = 0; i < phaseBounds.length; i++) {
      if (animDot >= phaseBounds[i].start && animDot < phaseBounds[i].end) {
        selectedPhase = i;
      }
    }
    if (animDot >= 0.75) selectedPhase = 0;
  }

  let dotX = cycleLeft + animDot * cycleW;
  let dotY = cycleMid - 20 - amplitude * sin(animDot * TWO_PI - HALF_PI) - animDot * 15;
  fill('red');
  stroke('white');
  strokeWeight(2);
  circle(dotX, dotY, 14);

  // Info panel on right
  if (selectedPhase >= 0 && selectedPhase < phases.length) {
    let p = phases[selectedPhase];
    let panelX = canvasWidth - 170;
    let panelY = 60;

    fill(p.color[0], p.color[1], p.color[2], 30);
    stroke(p.color[0], p.color[1], p.color[2]);
    strokeWeight(2);
    rect(panelX, panelY, 160, 200, 8);

    noStroke();
    fill(p.color[0], p.color[1], p.color[2]);
    textSize(16);
    textAlign(CENTER, TOP);
    text(p.name, panelX + 80, panelY + 10);

    fill('black');
    textSize(12);
    textAlign(LEFT, TOP);
    text(p.desc, panelX + 10, panelY + 35);

    textSize(11);
    for (let i = 0; i < p.details.length; i++) {
      text('• ' + p.details[i], panelX + 10, panelY + 60 + i * 32);
    }
  }

  // Indicators below cycle
  let indY = cycleBottom + 35;
  noStroke();
  textSize(11);
  textAlign(LEFT, TOP);

  // Determine current phase indicators
  let unemp, confid, stocks;
  if (selectedPhase === 0) { unemp = 'Low'; confid = 'High'; stocks = 'Rising'; }
  else if (selectedPhase === 1) { unemp = 'Very Low'; confid = 'Peak'; stocks = 'High'; }
  else if (selectedPhase === 2) { unemp = 'Rising'; confid = 'Falling'; stocks = 'Declining'; }
  else if (selectedPhase === 3) { unemp = 'High'; confid = 'Low'; stocks = 'Bottom'; }
  else { unemp = '—'; confid = '—'; stocks = '—'; }

  fill('black');
  text('Unemployment: ' + unemp + '   |   Confidence: ' + confid + '   |   Stocks: ' + stocks, cycleLeft, indY);
}

function mousePressed() {
  if (mouseY > drawHeight) return;

  let cycleLeft = 60;
  let cycleRight = canvasWidth - 180;
  let cycleW = cycleRight - cycleLeft;

  let phaseBounds = [
    { start: 0.0,  end: 0.25 },
    { start: 0.25, end: 0.35 },
    { start: 0.35, end: 0.65 },
    { start: 0.65, end: 0.75 }
  ];

  let mx = mouseX;
  if (mx >= cycleLeft && mx <= cycleRight) {
    let t = (mx - cycleLeft) / cycleW;
    for (let i = 0; i < phaseBounds.length; i++) {
      if (t >= phaseBounds[i].start && t < phaseBounds[i].end) {
        selectedPhase = i;
        animDot = (phaseBounds[i].start + phaseBounds[i].end) / 2;
        return;
      }
    }
    if (t >= 0.75) {
      selectedPhase = 0;
      animDot = 0.87;
    }
  }
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
