// Network Effects Visualizer MicroSim
// Shows how value increases exponentially with users (Metcalfe's Law)
// Demonstrates first-mover advantage and tipping points

let canvasWidth = 400;
let drawHeight = 440;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 120;

// Network state
let nodes = [];
let numUsers = 5;
let showCompetitor = false;
let competitorUsers = 0;
let animSpeed = 1;
let growing = false;
let growTimer = 0;

// Controls
let addBtn, resetBtn;
let speedSlider;
let competitorCheckbox;
let scenarioSelect;

// Physics
let centerX, centerY;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  addBtn = createButton('Add 10 Users');
  addBtn.position(10, drawHeight + 8);
  addBtn.mousePressed(addUsers);
  addBtn.style('font-size', '12px');

  resetBtn = createButton('Start from Scratch');
  resetBtn.position(120, drawHeight + 8);
  resetBtn.mousePressed(resetNetwork);
  resetBtn.style('font-size', '12px');

  speedSlider = createSlider(1, 5, 2, 1);
  speedSlider.position(sliderLeftMargin, drawHeight + 38);
  speedSlider.size(canvasWidth - sliderLeftMargin - margin);

  competitorCheckbox = createCheckbox('Show Competitor', false);
  competitorCheckbox.position(10, drawHeight + 62);
  competitorCheckbox.style('font-size', '12px');

  scenarioSelect = createSelect();
  scenarioSelect.position(160, drawHeight + 62);
  scenarioSelect.option('Custom');
  scenarioSelect.option('Facebook vs MySpace');
  scenarioSelect.option('WhatsApp Growth');
  scenarioSelect.option('PayPal Network');
  scenarioSelect.changed(applyScenario);
  scenarioSelect.style('font-size', '12px');

  // Initialize with some nodes
  initNodes(numUsers);

  describe('Network effects visualizer showing how value increases exponentially with number of users', LABEL);
}

function initNodes(n) {
  nodes = [];
  centerX = canvasWidth / 2;
  centerY = 210;
  for (let i = 0; i < n; i++) {
    let angle = (TWO_PI / n) * i;
    let r = min(80, 20 + n * 2);
    nodes.push({
      x: centerX + cos(angle) * r + random(-10, 10),
      y: centerY + sin(angle) * r + random(-10, 10),
      vx: 0,
      vy: 0
    });
  }
  numUsers = n;
}

function addUsers() {
  for (let i = 0; i < 10; i++) {
    let angle = random(TWO_PI);
    let r = random(50, 150);
    nodes.push({
      x: centerX + cos(angle) * r,
      y: centerY + sin(angle) * r,
      vx: random(-1, 1),
      vy: random(-1, 1)
    });
  }
  numUsers = nodes.length;
}

function resetNetwork() {
  initNodes(5);
  competitorUsers = 0;
  scenarioSelect.value('Custom');
}

function applyScenario() {
  let s = scenarioSelect.value();
  if (s === 'Facebook vs MySpace') {
    initNodes(80);
    competitorUsers = 40;
    competitorCheckbox.checked(true);
  } else if (s === 'WhatsApp Growth') {
    initNodes(60);
    competitorUsers = 15;
    competitorCheckbox.checked(true);
  } else if (s === 'PayPal Network') {
    initNodes(45);
    competitorUsers = 20;
    competitorCheckbox.checked(true);
  }
}

function updatePhysics() {
  centerX = canvasWidth / 2;
  centerY = 210;
  let maxR = min(170, drawHeight / 2 - 60);

  for (let i = 0; i < nodes.length; i++) {
    let n = nodes[i];

    // Attract to center
    let dx = centerX - n.x;
    let dy = centerY - n.y;
    let d = max(1, sqrt(dx * dx + dy * dy));
    n.vx += dx * 0.001;
    n.vy += dy * 0.001;

    // Repel from other nodes
    for (let j = i + 1; j < nodes.length; j++) {
      let o = nodes[j];
      let rx = n.x - o.x;
      let ry = n.y - o.y;
      let rd = max(1, sqrt(rx * rx + ry * ry));
      if (rd < 30) {
        let force = 0.5 / rd;
        n.vx += rx * force;
        n.vy += ry * force;
        o.vx -= rx * force;
        o.vy -= ry * force;
      }
    }

    // Keep in bounds
    if (d > maxR) {
      n.vx += dx * 0.01;
      n.vy += dy * 0.01;
    }

    // Damping
    n.vx *= 0.9;
    n.vy *= 0.9;

    n.x += n.vx;
    n.y += n.vy;
  }
}

function draw() {
  showCompetitor = competitorCheckbox.checked();
  animSpeed = speedSlider.value();

  // Physics updates
  for (let s = 0; s < animSpeed; s++) {
    updatePhysics();
  }

  // Draw regions
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(16);
  text('Network Effects Visualizer', canvasWidth / 2, 6);

  // Metrics
  let connections = numUsers * (numUsers - 1) / 2;
  let networkValue = numUsers * numUsers;

  textSize(11);
  fill('gray');
  text("Metcalfe's Law: Value proportional to n\u00B2", canvasWidth / 2, 24);

  // Draw connections (limit for performance)
  stroke(100, 150, 255, 30);
  strokeWeight(0.5);
  let maxDrawEdges = min(nodes.length, 40);
  for (let i = 0; i < maxDrawEdges; i++) {
    for (let j = i + 1; j < maxDrawEdges; j++) {
      let d = dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
      if (d < 120) {
        let alpha = map(d, 0, 120, 60, 5);
        stroke(100, 150, 255, alpha);
        line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
      }
    }
  }

  // Draw nodes
  noStroke();
  for (let i = 0; i < nodes.length; i++) {
    let size = map(numUsers, 5, 200, 10, 5);
    size = constrain(size, 4, 10);
    fill(30, 100, 220);
    circle(nodes[i].x, nodes[i].y, size);
  }

  // Metrics panel
  let panelY = drawHeight - 140;
  fill(255, 255, 255, 220);
  noStroke();
  rect(10, panelY, canvasWidth - 20, showCompetitor ? 132 : 90, 6);
  stroke('silver');
  strokeWeight(1);
  noFill();
  rect(10, panelY, canvasWidth - 20, showCompetitor ? 132 : 90, 6);

  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);

  fill('darkblue');
  text('Your Network', 20, panelY + 6);
  textSize(11);
  fill('black');
  text('Users (n): ' + numUsers, 20, panelY + 24);
  text('Possible Connections: ' + nf(connections, 0, 0), 20, panelY + 40);

  fill('steelblue');
  textSize(12);
  text('Network Value (n\u00B2): ' + nf(networkValue, 0, 0), 20, panelY + 58);

  // Value per user
  noStroke();
  fill('green');
  textSize(11);
  textAlign(RIGHT, TOP);
  text('Value per user: ' + numUsers, canvasWidth - 20, panelY + 24);
  textSize(9);
  fill('gray');
  text('Each new user adds more value!', canvasWidth - 20, panelY + 40);

  // Tipping point indicator
  if (numUsers > 30) {
    fill('darkgreen');
    textSize(10);
    text('Past tipping point!', canvasWidth - 20, panelY + 54);
  }

  // Competitor comparison
  if (showCompetitor) {
    let compConnections = competitorUsers * (competitorUsers - 1) / 2;
    let compValue = competitorUsers * competitorUsers;

    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    fill('crimson');
    text('Competitor Network', 20, panelY + 78);
    textSize(11);
    fill('black');
    text('Users: ' + competitorUsers + '    Connections: ' + nf(compConnections, 0, 0) + '    Value: ' + nf(compValue, 0, 0), 20, panelY + 96);

    // Ratio
    fill('purple');
    textSize(11);
    let ratio = competitorUsers > 0 ? nf(networkValue / compValue, 1, 1) : 'Infinite';
    text('Your advantage: ' + ratio + 'x value', 20, panelY + 114);
  }

  // Key insight
  noStroke();
  fill('darkblue');
  textSize(10);
  textAlign(CENTER, TOP);
  if (numUsers < 15) {
    text('Small network: few connections, low value. Keep adding users!', canvasWidth / 2, 38);
  } else if (numUsers < 50) {
    text('Growing network: connections multiplying, value accelerating', canvasWidth / 2, 38);
  } else {
    text('Large network: massive connections! A better product alone cannot compete', canvasWidth / 2, 38);
  }

  // Control labels
  noStroke();
  fill('black');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Speed: ' + animSpeed, 10, drawHeight + 46);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  speedSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasHeight = drawHeight + controlHeight;
}
