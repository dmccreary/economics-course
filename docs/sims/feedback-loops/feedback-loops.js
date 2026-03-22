// Systems Thinking Feedback Loops MicroSim
// Visualize positive and negative feedback loops in economics
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Feedback loop nodes
let carbonTax = 50;
let emissions = 70;
let temperature = 60;
let economicCost = 40;

let animSpeed = 0;
let speedSlider;
let isRunning = false;
let playBtn;
let showPositive = true;
let showNegative = true;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  playBtn = createButton('Start');
  playBtn.position(10, drawHeight + 10);
  playBtn.mousePressed(() => { isRunning = !isRunning; playBtn.html(isRunning ? 'Pause' : 'Start'); });

  let incBtn = createButton('↑ Carbon Tax');
  incBtn.position(80, drawHeight + 10);
  incBtn.mousePressed(() => { carbonTax = min(100, carbonTax + 10); });

  let decBtn = createButton('↓ Carbon Tax');
  decBtn.position(185, drawHeight + 10);
  decBtn.mousePressed(() => { carbonTax = max(0, carbonTax - 10); });

  let resetBtn = createButton('Reset');
  resetBtn.position(285, drawHeight + 10);
  resetBtn.mousePressed(() => { carbonTax = 50; emissions = 70; temperature = 60; economicCost = 40; isRunning = false; playBtn.html('Start'); });

  describe('Systems thinking feedback loops showing how carbon tax policy creates reinforcing and balancing economic feedback loops', LABEL);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Simulate feedback
  if (isRunning && frameCount % 10 === 0) {
    // Negative feedback: higher tax → lower emissions
    emissions = lerp(emissions, max(10, 100 - carbonTax * 0.8), 0.05);
    // Positive feedback: higher emissions → higher temperature
    temperature = lerp(temperature, 30 + emissions * 0.5, 0.03);
    // Economic cost rises with both temperature AND tax
    economicCost = lerp(economicCost, temperature * 0.4 + carbonTax * 0.3, 0.04);
  }

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Feedback Loops in Climate Policy', canvasWidth / 2, 8);

  // Draw nodes in a cycle
  let cx = canvasWidth / 2;
  let cy = 200;
  let r = 110;

  let nodes = [
    { name: 'Carbon\nTax', val: carbonTax, x: cx, y: cy - r, color: 'steelblue' },
    { name: 'CO₂\nEmissions', val: emissions, x: cx + r, y: cy, color: 'crimson' },
    { name: 'Global\nTemp', val: temperature, x: cx, y: cy + r, color: 'darkorange' },
    { name: 'Economic\nCost', val: economicCost, x: cx - r, y: cy, color: 'purple' }
  ];

  // Draw arrows between nodes
  let arrows = [
    { from: 0, to: 1, type: 'negative', label: '−  Reduces' },
    { from: 1, to: 2, type: 'positive', label: '+  Increases' },
    { from: 2, to: 3, type: 'positive', label: '+  Increases' },
    { from: 3, to: 0, type: 'positive', label: '+  Pressures' }
  ];

  for (let a of arrows) {
    let n1 = nodes[a.from];
    let n2 = nodes[a.to];
    let col = a.type === 'positive' ? color(220, 50, 50) : color(50, 50, 220);

    // Arrow line
    stroke(col);
    strokeWeight(2);
    let dx = n2.x - n1.x;
    let dy = n2.y - n1.y;
    let len = sqrt(dx * dx + dy * dy);
    let nx = dx / len;
    let ny = dy / len;
    let startX = n1.x + nx * 35;
    let startY = n1.y + ny * 35;
    let endX = n2.x - nx * 35;
    let endY = n2.y - ny * 35;

    line(startX, startY, endX, endY);

    // Arrowhead
    let angle = atan2(endY - startY, endX - startX);
    line(endX, endY, endX - 10 * cos(angle - 0.4), endY - 10 * sin(angle - 0.4));
    line(endX, endY, endX - 10 * cos(angle + 0.4), endY - 10 * sin(angle + 0.4));

    // Label at midpoint
    let mx = (startX + endX) / 2;
    let my = (startY + endY) / 2;
    noStroke();
    fill(col);
    textSize(9);
    textAlign(CENTER, CENTER);
    // Offset label perpendicular to arrow
    let px = -ny * 15;
    let py = nx * 15;
    text(a.label, mx + px, my + py);
  }

  // Draw nodes
  for (let n of nodes) {
    let size = map(n.val, 0, 100, 40, 70);

    fill(n.color);
    stroke('white');
    strokeWeight(2);
    circle(n.x, n.y, size);

    fill('white');
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    let lines = n.name.split('\n');
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], n.x, n.y - 6 + i * 12);
    }

    // Value
    textSize(9);
    text(round(n.val), n.x, n.y + (lines.length > 1 ? 14 : 8));
  }

  // Legend
  let legY = 330;
  noStroke();
  textSize(11);
  textAlign(LEFT, TOP);

  fill(50, 50, 220);
  rect(20, legY, 12, 12);
  fill('black');
  text('Balancing (negative) loop: Tax ↑ → Emissions ↓', 38, legY);

  fill(220, 50, 50);
  rect(20, legY + 18, 12, 12);
  fill('black');
  text('Reinforcing (positive) loop: Emissions ↑ → Costs ↑ → Tax ↑', 38, legY + 18);

  // Key insight
  fill('darkblue');
  textSize(11);
  textAlign(CENTER, TOP);
  text('Node size reflects current level. Watch how the system self-regulates!', canvasWidth / 2, legY + 42);
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
