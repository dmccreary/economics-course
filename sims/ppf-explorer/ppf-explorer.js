// Production Possibilities Frontier Explorer MicroSim
// Drag a point on or off the PPF curve to explore trade-offs,
// efficiency, and opportunity cost between Pizzas and Robots.

let canvasWidth = 580;
let drawHeight = 450;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 60;

// Graph area
let graphLeft, graphRight, graphTop, graphBottom;

// Point position (in production units 0-100)
let pointX = 50; // Pizzas
let pointY = 50; // Robots (will snap to curve initially)
let dragging = false;

// Controls
let allPizzasBtn, allRobotsBtn, balancedBtn, inefficientBtn, impossibleBtn;
let showOCCheckbox, techShiftCheckbox;
let techLevel = 1.0;

// PPF curve: Robots = maxR * sqrt(1 - (Pizzas/maxP)^2)
// This gives a concave curve showing increasing opportunity cost
let maxP = 100;
let maxR = 100;

function ppfRobots(pizzas, tech) {
  let t = tech || techLevel;
  let ratio = pizzas / (maxP * t);
  if (ratio > 1) return -1; // impossible
  return maxR * t * sqrt(1 - ratio * ratio);
}

function graphX(pizzas) {
  return map(pizzas, 0, 120, graphLeft, graphRight);
}

function graphY(robots) {
  return map(robots, 0, 120, graphBottom, graphTop);
}

function pizzasFromGraph(gx) {
  return map(gx, graphLeft, graphRight, 0, 120);
}

function robotsFromGraph(gy) {
  return map(gy, graphBottom, graphTop, 0, 120);
}

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Preset buttons
  allPizzasBtn = createButton('All Pizzas');
  allPizzasBtn.mousePressed(() => { pointX = 95; pointY = ppfRobots(95); });

  allRobotsBtn = createButton('All Robots');
  allRobotsBtn.mousePressed(() => { pointX = 0; pointY = ppfRobots(0); });

  balancedBtn = createButton('Balanced');
  balancedBtn.mousePressed(() => { pointX = 60; pointY = ppfRobots(60); });

  inefficientBtn = createButton('Inefficient');
  inefficientBtn.mousePressed(() => { pointX = 40; pointY = 30; });

  impossibleBtn = createButton('Impossible');
  impossibleBtn.mousePressed(() => { pointX = 80; pointY = 70; });

  showOCCheckbox = createCheckbox('Show Opportunity Cost', false);
  techShiftCheckbox = createCheckbox('Technology Boost', false);

  // Start balanced on curve
  pointX = 60;
  pointY = ppfRobots(60);

  positionControls();
}

function positionControls() {
  let y1 = drawHeight + 10;
  let y2 = drawHeight + 40;
  allPizzasBtn.position(10, y1);
  allRobotsBtn.position(100, y1);
  balancedBtn.position(195, y1);
  inefficientBtn.position(275, y1);
  impossibleBtn.position(370, y1);
  showOCCheckbox.position(10, y2);
  techShiftCheckbox.position(190, y2);
}

function draw() {
  graphLeft = margin;
  graphRight = canvasWidth - 180;
  graphTop = margin;
  graphBottom = drawHeight - margin;

  techLevel = techShiftCheckbox.checked() ? 1.25 : 1.0;

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
  text('Production Possibilities Frontier', canvasWidth / 2, 10);

  // Axes
  stroke('black');
  strokeWeight(2);
  line(graphLeft, graphTop, graphLeft, graphBottom);
  line(graphLeft, graphBottom, graphRight, graphBottom);

  // Axis labels
  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Pizzas', (graphLeft + graphRight) / 2, graphBottom + 8);
  push();
  translate(18, (graphTop + graphBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, BOTTOM);
  text('Robots', 0, 0);
  pop();

  // Tick marks
  textSize(11);
  textAlign(CENTER, TOP);
  for (let q = 0; q <= 100; q += 20) {
    let x = graphX(q);
    stroke('gray');
    strokeWeight(1);
    line(x, graphBottom, x, graphBottom + 5);
    noStroke();
    fill('gray');
    text(q, x, graphBottom + 7);
  }
  textAlign(RIGHT, CENTER);
  for (let q = 0; q <= 100; q += 20) {
    let y = graphY(q);
    stroke('gray');
    strokeWeight(1);
    line(graphLeft - 5, y, graphLeft, y);
    noStroke();
    fill('gray');
    text(q, graphLeft - 8, y);
  }

  // Color zones - fill behind the curve
  // Green zone (efficient) - narrow band along curve
  // Yellow zone (inefficient) - inside curve
  // Draw filled PPF area as light green
  noStroke();
  fill(200, 255, 200, 80);
  beginShape();
  vertex(graphX(0), graphY(0));
  for (let p = 0; p <= maxP * techLevel; p += 1) {
    let r = ppfRobots(p);
    if (r >= 0) vertex(graphX(p), graphY(r));
  }
  vertex(graphX(maxP * techLevel), graphY(0));
  endShape(CLOSE);

  // Draw old PPF if tech boost is on
  if (techShiftCheckbox.checked()) {
    stroke('gray');
    strokeWeight(1);
    noFill();
    beginShape();
    let oldTech = 1.0;
    for (let p = 0; p <= maxP * oldTech; p += 1) {
      let ratio = p / (maxP * oldTech);
      let r = maxR * oldTech * sqrt(1 - ratio * ratio);
      vertex(graphX(p), graphY(r));
    }
    endShape();
    noStroke();
    fill('gray');
    textSize(10);
    textAlign(LEFT, TOP);
    text('Old PPF', graphX(10), graphY(ppfRobots(10, 1.0)) - 15);
  }

  // Draw PPF curve
  stroke('darkblue');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let p = 0; p <= maxP * techLevel; p += 1) {
    let r = ppfRobots(p);
    if (r >= 0) vertex(graphX(p), graphY(r));
  }
  endShape();

  // Determine point status
  let maxRobots = ppfRobots(pointX);
  let status, statusColor;
  if (maxRobots < 0 || pointY > maxRobots + 3) {
    status = 'Impossible';
    statusColor = 'red';
  } else if (abs(pointY - maxRobots) <= 3) {
    status = 'Efficient';
    statusColor = 'green';
  } else {
    status = 'Inefficient';
    statusColor = 'goldenrod';
  }

  // Guide lines from point to axes
  let px = graphX(pointX);
  let py = graphY(pointY);
  stroke('silver');
  strokeWeight(1);
  line(graphLeft, py, px, py);
  line(px, py, px, graphBottom);

  // Draw the draggable point
  fill(statusColor);
  stroke('black');
  strokeWeight(2);
  ellipse(px, py, 20, 20);

  // Opportunity cost display
  if (showOCCheckbox.checked() && status === 'Efficient') {
    let delta = 10;
    let r1 = ppfRobots(pointX);
    let r2 = ppfRobots(pointX + delta);
    if (r2 >= 0) {
      let ocost = r1 - r2;
      // Show arrow along curve
      stroke('orangered');
      strokeWeight(2);
      let ax1 = graphX(pointX);
      let ay1 = graphY(r1);
      let ax2 = graphX(pointX + delta);
      let ay2 = graphY(r2);
      drawArrow(ax1, ay1, ax2, ay2);

      noStroke();
      fill('orangered');
      textSize(11);
      textAlign(LEFT, TOP);
      text('+10 Pizzas costs ' + nf(ocost, 0, 1) + ' Robots',
           ax2 + 5, ay2 - 5);
    }
  }

  // Info panel on right
  let infoX = graphRight + 20;
  let infoY = graphTop + 10;
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Production:', infoX, infoY);
  textSize(13);
  text('Pizzas: ' + nf(pointX, 0, 0), infoX, infoY + 24);
  text('Robots: ' + nf(pointY, 0, 0), infoX, infoY + 44);

  textSize(14);
  fill(statusColor);
  text('Status:', infoX, infoY + 74);
  textSize(16);
  text(status, infoX, infoY + 94);

  // Status explanation
  textSize(11);
  fill('dimgray');
  let msgY = infoY + 120;
  if (status === 'Efficient') {
    text('On the frontier.', infoX, msgY);
    text('Using all', infoX, msgY + 16);
    text('resources!', infoX, msgY + 32);
  } else if (status === 'Inefficient') {
    text('Inside the curve.', infoX, msgY);
    text('Not using all', infoX, msgY + 16);
    text('resources!', infoX, msgY + 32);
  } else {
    text('Outside the curve.', infoX, msgY);
    text('Not possible with', infoX, msgY + 16);
    text('current resources.', infoX, msgY + 32);
  }

  // Opportunity cost info
  if (status === 'Efficient') {
    textSize(11);
    fill('black');
    let ocY = infoY + 180;
    text('Opportunity Cost:', infoX, ocY);
    let delta = 10;
    let r1 = ppfRobots(pointX);
    let r2 = ppfRobots(min(pointX + delta, maxP * techLevel));
    if (r2 >= 0 && pointX + delta <= maxP * techLevel) {
      let ocost = r1 - r2;
      fill('orangered');
      text('Next 10 pizzas', infoX, ocY + 18);
      text('cost ' + nf(ocost, 0, 1) + ' robots', infoX, ocY + 34);
    } else {
      fill('gray');
      text('At maximum', infoX, ocY + 18);
      text('pizza production', infoX, ocY + 34);
    }
  }

  // Drag instruction
  noStroke();
  fill('dimgray');
  textSize(11);
  textAlign(CENTER, TOP);
  text('Drag the point to explore trade-offs', canvasWidth / 2, drawHeight + 65);
}

function drawArrow(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  let sz = 8;
  line(x2, y2, x2 - sz * cos(angle - PI / 6), y2 - sz * sin(angle - PI / 6));
  line(x2, y2, x2 - sz * cos(angle + PI / 6), y2 - sz * sin(angle + PI / 6));
}

function mousePressed() {
  let px = graphX(pointX);
  let py = graphY(pointY);
  if (dist(mouseX, mouseY, px, py) < 20) {
    dragging = true;
  }
}

function mouseDragged() {
  if (dragging) {
    let newPizzas = pizzasFromGraph(mouseX);
    let newRobots = robotsFromGraph(mouseY);
    pointX = constrain(round(newPizzas), 0, 110);
    pointY = constrain(round(newRobots), 0, 110);
  }
}

function mouseReleased() {
  dragging = false;
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
