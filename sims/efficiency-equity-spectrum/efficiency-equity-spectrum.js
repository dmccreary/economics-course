// Efficiency-Equity Spectrum MicroSim
// Evaluate where policies fall on the efficiency vs equity tradeoff
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Policies positioned on spectrum
let policies = [
  { name: 'Flat Tax',            eff: 80, eq: 25, color: 'steelblue',
    desc: 'Everyone pays same rate. Simple and efficient, but impacts low-income more.' },
  { name: 'Progressive Tax',     eff: 55, eq: 75, color: 'green',
    desc: 'Higher earners pay higher rates. Reduces inequality but may reduce work incentives.' },
  { name: 'Universal Basic Income', eff: 40, eq: 85, color: 'purple',
    desc: 'Everyone gets a payment. Maximum equity, but expensive and may reduce work effort.' },
  { name: 'Min. Wage Increase',  eff: 50, eq: 65, color: 'darkorange',
    desc: 'Raises income for workers but may reduce employment for some.' },
  { name: 'Free Trade',          eff: 85, eq: 35, color: 'royalblue',
    desc: 'Maximizes total output but creates winners (consumers) and losers (some workers).' },
  { name: 'Rent Control',        eff: 30, eq: 60, color: 'crimson',
    desc: 'Keeps housing affordable but reduces supply and maintenance incentives.' },
  { name: 'Carbon Tax',          eff: 70, eq: 45, color: 'teal',
    desc: 'Efficient pollution reduction but costs fall heavily on lower-income households.' },
  { name: 'Public Education',    eff: 65, eq: 80, color: 'forestgreen',
    desc: 'Equalizes opportunity and builds human capital. High long-term returns.' }
];

let selectedPolicy = -1;
let userMarker = { x: 50, y: 50 }; // user's ideal position
let showUser = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  let toggleBtn = createButton('Place My Ideal');
  toggleBtn.position(10, drawHeight + 10);
  toggleBtn.mousePressed(() => { showUser = !showUser; toggleBtn.html(showUser ? 'Hide My Ideal' : 'Place My Ideal'); });

  describe('Efficiency-equity spectrum showing where different economic policies fall on the tradeoff between efficiency and equity', LABEL);
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
  textSize(18);
  text('Efficiency vs Equity Spectrum', canvasWidth / 2, 8);
  textSize(11);
  fill('gray');
  text('Click a policy dot to learn more. Where do YOUR values fall?', canvasWidth / 2, 28);

  // Plot area
  let pLeft = 70;
  let pRight = canvasWidth - 30;
  let pTop = 50;
  let pBottom = 310;

  // Axes
  stroke('black');
  strokeWeight(2);
  line(pLeft, pTop, pLeft, pBottom);
  line(pLeft, pBottom, pRight, pBottom);

  // Axis labels
  noStroke();
  fill('black');
  textSize(12);
  textAlign(CENTER, TOP);
  text('Efficiency →', (pLeft + pRight) / 2, pBottom + 5);
  push();
  translate(20, (pTop + pBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Equity →', 0, 0);
  pop();

  // Background quadrants
  let midX = (pLeft + pRight) / 2;
  let midY = (pTop + pBottom) / 2;
  fill(200, 230, 200, 40);
  noStroke();
  rect(midX, pTop, pRight - midX, midY - pTop); // High eff, high eq
  fill(230, 230, 200, 40);
  rect(pLeft, pTop, midX - pLeft, midY - pTop); // Low eff, high eq
  rect(midX, midY, pRight - midX, pBottom - midY); // High eff, low eq
  fill(230, 200, 200, 40);
  rect(pLeft, midY, midX - pLeft, pBottom - midY); // Low eff, low eq

  // Quadrant labels
  textSize(9);
  fill(150);
  textAlign(CENTER, CENTER);
  text('High Equity\nLow Efficiency', pLeft + (midX - pLeft) / 2, pTop + (midY - pTop) / 2);
  text('High Equity\nHigh Efficiency', midX + (pRight - midX) / 2, pTop + (midY - pTop) / 2);
  text('Low Equity\nLow Efficiency', pLeft + (midX - pLeft) / 2, midY + (pBottom - midY) / 2);
  text('Low Equity\nHigh Efficiency', midX + (pRight - midX) / 2, midY + (pBottom - midY) / 2);

  // Grid
  stroke(220);
  strokeWeight(0.5);
  line(midX, pTop, midX, pBottom);
  line(pLeft, midY, pRight, midY);

  // Tradeoff frontier (approximate curve)
  stroke(200);
  strokeWeight(1);
  drawingContext.setLineDash([5, 5]);
  noFill();
  beginShape();
  for (let t = 0; t <= 1; t += 0.02) {
    let ex = pLeft + t * (pRight - pLeft);
    let ey = pTop + (1 - sqrt(1 - t * t)) * (pBottom - pTop) * 0.8 + 20;
    vertex(ex, ey);
  }
  endShape();
  drawingContext.setLineDash([]);

  // Policy dots
  for (let i = 0; i < policies.length; i++) {
    let p = policies[i];
    let px = map(p.eff, 0, 100, pLeft, pRight);
    let py = map(p.eq, 0, 100, pBottom, pTop);
    let isSelected = selectedPolicy === i;

    fill(isSelected ? p.color : color(red(color(p.color)), green(color(p.color)), blue(color(p.color)), 180));
    stroke(isSelected ? 'black' : p.color);
    strokeWeight(isSelected ? 2 : 1);
    circle(px, py, isSelected ? 18 : 14);

    // Label
    noStroke();
    fill('black');
    textSize(9);
    textAlign(CENTER, BOTTOM);
    text(p.name, px, py - 10);
  }

  // User's ideal marker
  if (showUser) {
    let ux = map(userMarker.x, 0, 100, pLeft, pRight);
    let uy = map(userMarker.y, 0, 100, pBottom, pTop);

    fill('gold');
    stroke('black');
    strokeWeight(2);
    // Star shape
    push();
    translate(ux, uy);
    beginShape();
    for (let a = -HALF_PI; a < TWO_PI - HALF_PI; a += TWO_PI / 10) {
      let r = (a % (TWO_PI / 5) < 0.01) ? 12 : 6;
      vertex(cos(a) * r, sin(a) * r);
    }
    endShape(CLOSE);
    pop();

    noStroke();
    fill('black');
    textSize(9);
    textAlign(CENTER, TOP);
    text('My Ideal', ux, uy + 14);
  }

  // Detail panel
  if (selectedPolicy >= 0) {
    let p = policies[selectedPolicy];
    let panelY = 320;
    let panelH = 80;

    fill(255, 255, 240);
    stroke(p.color);
    strokeWeight(2);
    rect(20, panelY, canvasWidth - 40, panelH, 8);

    noStroke();
    fill(p.color);
    textSize(14);
    textAlign(LEFT, TOP);
    text(p.name, 30, panelY + 8);

    fill('black');
    textSize(11);
    textAlign(LEFT, TOP);
    // Word wrap
    let words = p.desc.split(' ');
    let line = '';
    let ly = panelY + 28;
    for (let w of words) {
      let test = line + w + ' ';
      if (textWidth(test) > canvasWidth - 70) {
        text(line.trim(), 30, ly);
        ly += 15;
        line = w + ' ';
      } else {
        line = test;
      }
    }
    if (line.trim()) text(line.trim(), 30, ly);

    // Scores
    fill('gray');
    textSize(10);
    textAlign(RIGHT, TOP);
    text('Efficiency: ' + p.eff + '  Equity: ' + p.eq, canvasWidth - 30, panelY + 8);
  }

  // Instructions
  noStroke();
  fill('gray');
  textSize(11);
  textAlign(CENTER, CENTER);
  text(showUser ? 'Click on the chart to place your ideal' : 'Click policy dots for details', canvasWidth / 2, drawHeight + 25);
}

function mousePressed() {
  let pLeft = 70;
  let pRight = canvasWidth - 30;
  let pTop = 50;
  let pBottom = 310;

  // Check policy dot clicks
  for (let i = 0; i < policies.length; i++) {
    let p = policies[i];
    let px = map(p.eff, 0, 100, pLeft, pRight);
    let py = map(p.eq, 0, 100, pBottom, pTop);
    if (dist(mouseX, mouseY, px, py) < 12) {
      selectedPolicy = selectedPolicy === i ? -1 : i;
      return;
    }
  }

  // Place user marker
  if (showUser && mouseX >= pLeft && mouseX <= pRight && mouseY >= pTop && mouseY <= pBottom) {
    userMarker.x = map(mouseX, pLeft, pRight, 0, 100);
    userMarker.y = map(mouseY, pBottom, pTop, 0, 100);
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
