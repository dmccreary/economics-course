// Price Mechanism Feedback Loop MicroSim
// Circular feedback loop showing how prices coordinate economic activity.
// Shortage -> price rises -> more supply -> equilibrium (and surplus path).

let canvasWidth = 580;
let drawHeight = 500;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Animation state
let currentPath = 'shortage'; // 'shortage' or 'surplus'
let animStep = 0;             // 0-3 for each path
let animProgress = 0;         // 0-1 within step
let isAnimating = false;
let animSpeed = 0.015;

// Controls
let pathSelect;
let animateBtn, resetBtn;
let autoCheckbox;

// Node definitions for circular layout
let nodes = [];
let centerX, centerY, radius;

// Shortage path: 0->1->2->3 (center)
// Surplus path:  4->5->6->3 (center)
let shortageNodes = [
  { label: 'Price Below\nEquilibrium', detail: 'Buyers want more than sellers offer', color: 'tomato' },
  { label: 'Shortage\nDevelops', detail: 'Empty shelves, long lines', color: 'darkorange' },
  { label: 'Sellers Raise\nPrices', detail: 'High demand lets sellers charge more', color: 'gold' },
  { label: 'EQUILIBRIUM', detail: 'Supply equals demand - market clears!', color: 'mediumseagreen' }
];

let surplusNodes = [
  { label: 'Price Above\nEquilibrium', detail: 'Sellers offer more than buyers want', color: 'tomato' },
  { label: 'Surplus\nDevelops', detail: 'Unsold inventory piles up', color: 'darkorange' },
  { label: 'Sellers Lower\nPrices', detail: 'Must cut prices to attract buyers', color: 'gold' },
  { label: 'EQUILIBRIUM', detail: 'Supply equals demand - market clears!', color: 'mediumseagreen' }
];

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  pathSelect = createSelect();
  pathSelect.option('Shortage Correction');
  pathSelect.option('Surplus Correction');
  pathSelect.selected('Shortage Correction');
  pathSelect.changed(() => {
    currentPath = pathSelect.value() === 'Shortage Correction' ? 'shortage' : 'surplus';
    resetAnimation();
  });

  animateBtn = createButton('Animate');
  animateBtn.mousePressed(() => {
    if (!isAnimating) {
      isAnimating = true;
      animStep = 0;
      animProgress = 0;
    }
  });

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(resetAnimation);

  autoCheckbox = createCheckbox('Auto-loop', false);

  positionControls();
}

function positionControls() {
  let y = drawHeight + 18;
  pathSelect.position(10, y);
  pathSelect.size(180);
  animateBtn.position(210, y);
  resetBtn.position(290, y);
  autoCheckbox.position(360, y);
}

function resetAnimation() {
  animStep = 0;
  animProgress = 0;
  isAnimating = false;
}

function getActiveNodes() {
  return currentPath === 'shortage' ? shortageNodes : surplusNodes;
}

function draw() {
  centerX = canvasWidth / 2;
  centerY = drawHeight / 2 + 10;
  radius = min(canvasWidth, drawHeight) * 0.30;

  // Drawing area
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill('black');
  textSize(20);
  textAlign(CENTER, TOP);
  text('Price Mechanism Feedback Loop', canvasWidth / 2, 10);
  textSize(12);
  fill('gray');
  text(currentPath === 'shortage' ? 'Shortage Correction Path' : 'Surplus Correction Path', canvasWidth / 2, 34);

  let activeNodes = getActiveNodes();

  // Calculate node positions in a circle
  // Outer nodes at positions around circle, equilibrium in center
  let positions = [];
  let numOuter = 3;
  let startAngle = currentPath === 'shortage' ? -PI / 2 : -PI / 2;
  for (let i = 0; i < numOuter; i++) {
    let angle = startAngle + (i / numOuter) * TWO_PI;
    // For shortage: go clockwise from top
    if (currentPath === 'shortage') {
      angle = -HALF_PI - PI / 6 + i * (TWO_PI / 3);
    } else {
      angle = -HALF_PI + PI / 6 - i * (TWO_PI / 3);
    }
    positions.push({
      x: centerX + radius * cos(angle),
      y: centerY + radius * sin(angle)
    });
  }
  // Equilibrium in center
  positions.push({ x: centerX, y: centerY });

  // Draw connecting arrows between nodes
  for (let i = 0; i < 3; i++) {
    let from = positions[i];
    let to = i < 2 ? positions[i + 1] : positions[3]; // last goes to center

    let isActive = i < animStep;
    let isCurrentStep = i === animStep && isAnimating;

    // Arrow color based on state
    if (isActive) {
      stroke(activeNodes[i].color);
      strokeWeight(4);
    } else if (isCurrentStep) {
      // Partially drawn arrow
      stroke(activeNodes[i].color);
      strokeWeight(4);
    } else {
      stroke('lightgray');
      strokeWeight(2);
    }

    // Calculate arrow endpoints (offset from node centers)
    let nodeRadius = 42;
    let angle = atan2(to.y - from.y, to.x - from.x);
    let ax1 = from.x + nodeRadius * cos(angle);
    let ay1 = from.y + nodeRadius * sin(angle);
    let ax2 = to.x - nodeRadius * cos(angle);
    let ay2 = to.y - nodeRadius * sin(angle);

    if (isCurrentStep && isAnimating) {
      // Partially draw the arrow
      let px = lerp(ax1, ax2, animProgress);
      let py = lerp(ay1, ay2, animProgress);
      line(ax1, ay1, px, py);
      // Arrowhead at current position
      let sz = 10;
      fill(activeNodes[i].color);
      noStroke();
      triangle(
        px + sz * cos(angle), py + sz * sin(angle),
        px + sz * cos(angle + 2.5), py + sz * sin(angle + 2.5),
        px + sz * cos(angle - 2.5), py + sz * sin(angle - 2.5)
      );
    } else if (isActive || !isAnimating && !isCurrentStep) {
      // Full arrow
      if (!isActive && isAnimating) {
        stroke('lightgray');
        strokeWeight(2);
      }
      line(ax1, ay1, ax2, ay2);
      // Arrowhead
      let sz = 10;
      let arrowColor = isActive ? activeNodes[i].color : 'lightgray';
      fill(arrowColor);
      noStroke();
      triangle(
        ax2 + sz * cos(angle), ay2 + sz * sin(angle),
        ax2 + sz * cos(angle + 2.5), ay2 + sz * sin(angle + 2.5),
        ax2 + sz * cos(angle - 2.5), ay2 + sz * sin(angle - 2.5)
      );
    }

    // Step number label on arrow
    noStroke();
    fill('dimgray');
    textSize(10);
    textAlign(CENTER, CENTER);
    let midX = (ax1 + ax2) / 2;
    let midY = (ay1 + ay2) / 2;
    let perpX = -sin(angle) * 15;
    let perpY = cos(angle) * 15;
    text('Step ' + (i + 1), midX + perpX, midY + perpY);
  }

  // Draw nodes
  for (let i = 0; i < 4; i++) {
    let pos = positions[i];
    let node = activeNodes[i];
    let isCenter = i === 3;
    let isLit = !isAnimating || i <= animStep;
    let isHovered = dist(mouseX, mouseY, pos.x, pos.y) < 45;

    // Node shape
    if (isCenter) {
      // Star shape for equilibrium
      if (isLit && (animStep >= 3 || !isAnimating)) {
        fill(node.color);
        stroke('darkgreen');
      } else {
        fill('lightgray');
        stroke('gray');
      }
      strokeWeight(2);
      drawStar(pos.x, pos.y, 25, 48, 6);
    } else {
      // Rounded rectangle for other nodes
      if (isLit) {
        fill(node.color);
        stroke('white');
      } else {
        fill('lightgray');
        stroke('white');
      }
      strokeWeight(isHovered ? 3 : 2);
      rectMode(CENTER);
      rect(pos.x, pos.y, 90, 60, 12);
      rectMode(CORNER);
    }

    // Node label
    noStroke();
    fill(isCenter ? 'white' : 'black');
    textSize(isCenter ? 12 : 11);
    textAlign(CENTER, CENTER);
    let lines = node.label.split('\n');
    for (let li = 0; li < lines.length; li++) {
      text(lines[li], pos.x, pos.y - (lines.length - 1) * 7 + li * 14);
    }

    // Hover detail
    if (isHovered && isLit) {
      noStroke();
      fill('black');
      textSize(12);
      textAlign(CENTER, TOP);
      text(node.detail, canvasWidth / 2, drawHeight - 30);
    }
  }

  // Animation update
  if (isAnimating) {
    animProgress += animSpeed;
    if (animProgress >= 1) {
      animProgress = 0;
      animStep++;
      if (animStep >= 4) {
        isAnimating = false;
        animStep = 3;
        // Auto-loop
        if (autoCheckbox.checked()) {
          setTimeout(() => {
            currentPath = currentPath === 'shortage' ? 'surplus' : 'shortage';
            pathSelect.selected(currentPath === 'shortage' ? 'Shortage Correction' : 'Surplus Correction');
            animStep = 0;
            animProgress = 0;
            isAnimating = true;
          }, 1500);
        }
      }
    }
  }

  // Legend at bottom of draw area
  noStroke();
  textSize(10);
  textAlign(LEFT, TOP);
  let legY = drawHeight - 55;
  let legX = 15;
  fill('tomato');
  rect(legX, legY, 12, 12, 3);
  fill('black');
  text('Disequilibrium', legX + 16, legY + 1);
  fill('darkorange');
  rect(legX + 110, legY, 12, 12, 3);
  fill('black');
  text('Problem', legX + 126, legY + 1);
  fill('gold');
  rect(legX + 185, legY, 12, 12, 3);
  fill('black');
  text('Response', legX + 201, legY + 1);
  fill('mediumseagreen');
  rect(legX + 270, legY, 12, 12, 3);
  fill('black');
  text('Equilibrium', legX + 286, legY + 1);

  // Instruction
  noStroke();
  fill('dimgray');
  textSize(11);
  textAlign(CENTER, TOP);
  text('Hover over nodes for details. Click Animate to see the adjustment process.',
       canvasWidth / 2, drawHeight - 18);

  // Control area label
  noStroke();
  fill('dimgray');
  textSize(10);
  textAlign(LEFT, TOP);
  text('Markets self-correct through the price mechanism', 10, drawHeight + 45);
}

function drawStar(x, y, r1, r2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -HALF_PI; a < TWO_PI - HALF_PI; a += angle) {
    let sx = x + cos(a) * r2;
    let sy = y + sin(a) * r2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * r1;
    sy = y + sin(a + halfAngle) * r1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
  redraw();
}

function updateCanvasSize() {
  let container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  canvasHeight = drawHeight + controlHeight;
}
