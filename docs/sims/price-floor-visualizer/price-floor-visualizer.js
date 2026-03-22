// Price Floor Visualizer MicroSim
// Analyze how price floors (minimum wage) create surpluses
// (unemployment) in labor markets and examine trade-offs.

let canvasWidth = 580;
let drawHeight = 460;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 60;

// Graph area
let graphLeft, graphRight, graphTop, graphBottom;

// Market parameters
let eqWage = 12;       // Equilibrium wage
let eqWorkers = 1000;  // Equilibrium employment
let minWage = 8;
let maxWage = 20;
let maxWorkers = 2000;
let maxWageAxis = 24;

// Controls
let floorSlider;
let showEqCheckbox, showWinnersCheckbox;
let resetButton;

// Labor Supply: Ls = (W / eqWage) * eqWorkers
function laborSupply(w) {
  return (w / eqWage) * eqWorkers;
}

// Labor Demand: Ld = 2 * eqWorkers - (W / eqWage) * eqWorkers
function laborDemand(w) {
  return 2 * eqWorkers - (w / eqWage) * eqWorkers;
}

function graphX(q) {
  return map(q, 0, maxWorkers, graphLeft, graphRight);
}

function graphY(w) {
  return map(w, 0, maxWageAxis, graphBottom, graphTop);
}

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  floorSlider = createSlider(minWage, maxWage, 15, 0.5);
  showEqCheckbox = createCheckbox('Show Equilibrium', true);
  showWinnersCheckbox = createCheckbox('Show Winners & Losers', false);
  resetButton = createButton('Remove Floor');
  resetButton.mousePressed(() => { floorSlider.value(minWage); });

  positionControls();
}

function positionControls() {
  let y1 = drawHeight + 12;
  let y2 = drawHeight + 45;
  floorSlider.position(165, y1);
  floorSlider.size(200);
  resetButton.position(385, y1 - 3);
  showEqCheckbox.position(10, y2);
  showWinnersCheckbox.position(180, y2);
}

function draw() {
  graphLeft = margin;
  graphRight = canvasWidth - 210;
  graphTop = margin + 10;
  graphBottom = drawHeight - margin;

  let floorWage = floorSlider.value();
  let isBinding = floorWage > eqWage;

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
  text('Price Floor Visualizer', canvasWidth / 2, 8);
  textSize(12);
  fill('gray');
  text('Minimum Wage Example', canvasWidth / 2, 30);

  // Axes
  stroke('black');
  strokeWeight(2);
  line(graphLeft, graphTop, graphLeft, graphBottom);
  line(graphLeft, graphBottom, graphRight, graphBottom);

  // Axis labels
  noStroke();
  fill('black');
  textSize(13);
  textAlign(CENTER, TOP);
  text('Workers (quantity)', (graphLeft + graphRight) / 2, graphBottom + 8);
  push();
  translate(18, (graphTop + graphBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, BOTTOM);
  text('Wage ($/hour)', 0, 0);
  pop();

  // Grid lines and tick marks - quantity
  textSize(10);
  textAlign(CENTER, TOP);
  for (let q = 0; q <= maxWorkers; q += 500) {
    let x = graphX(q);
    stroke('lightgray');
    strokeWeight(1);
    line(x, graphTop, x, graphBottom);
    noStroke();
    fill('gray');
    text(q, x, graphBottom + 5);
  }

  // Grid lines and tick marks - wage
  textAlign(RIGHT, CENTER);
  for (let w = 0; w <= maxWageAxis; w += 4) {
    let y = graphY(w);
    stroke('lightgray');
    strokeWeight(1);
    line(graphLeft, y, graphRight, y);
    noStroke();
    fill('gray');
    text('$' + w, graphLeft - 6, y);
  }

  // Deadweight loss triangle
  if (isBinding) {
    let ld = round(laborDemand(floorWage));
    let ls = round(laborSupply(floorWage));
    // DWL: triangle between Ld at floor, equilibrium, and supply price at Ld
    let supplyWageAtLd = eqWage * (ld / eqWorkers); // inverse supply

    fill(255, 0, 0, 40);
    noStroke();
    triangle(
      graphX(ld), graphY(floorWage),
      graphX(eqWorkers), graphY(eqWage),
      graphX(ld), graphY(supplyWageAtLd)
    );
  }

  // Draw labor supply curve (orange) - workers willing to work
  stroke('orange');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let w = 0; w <= maxWageAxis; w += 0.2) {
    let q = laborSupply(w);
    if (q >= 0 && q <= maxWorkers) vertex(graphX(q), graphY(w));
  }
  endShape();

  // Draw labor demand curve (blue) - employers hiring
  stroke('blue');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let w = 0; w <= maxWageAxis; w += 0.2) {
    let q = laborDemand(w);
    if (q >= 0 && q <= maxWorkers) vertex(graphX(q), graphY(w));
  }
  endShape();

  // Curve labels
  noStroke();
  fill('orange');
  textSize(13);
  textAlign(LEFT, CENTER);
  let sLabelW = 20;
  text('Labor Supply', graphX(laborSupply(sLabelW)) + 5, graphY(sLabelW));
  fill('blue');
  let dLabelW = 20;
  text('Labor Demand', graphX(laborDemand(dLabelW)) + 5, graphY(dLabelW));

  // Equilibrium point
  if (showEqCheckbox.checked()) {
    let eqX = graphX(eqWorkers);
    let eqY = graphY(eqWage);
    fill('gold');
    stroke('darkgoldenrod');
    strokeWeight(2);
    ellipse(eqX, eqY, 14, 14);
    noStroke();
    fill('darkgoldenrod');
    textSize(11);
    textAlign(LEFT, TOP);
    text('Eq: $' + eqWage + '/hr, ' + eqWorkers, eqX + 10, eqY - 5);
  }

  // Price floor line
  let floorY = graphY(floorWage);
  stroke('red');
  strokeWeight(2);
  drawingContext.setLineDash([8, 6]);
  line(graphLeft, floorY, graphRight, floorY);
  drawingContext.setLineDash([]);

  noStroke();
  fill('red');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Floor: $' + nf(floorWage, 0, 1) + '/hr', graphLeft + 5, floorY - 12);

  // Surplus (unemployment) visualization
  if (isBinding) {
    let ld = round(laborDemand(floorWage));
    let ls = round(laborSupply(floorWage));
    let surplus = ls - ld;

    // Surplus bracket
    stroke('red');
    strokeWeight(2);
    let bracketY = floorY - 8;
    line(graphX(ld), bracketY, graphX(ls), bracketY);
    line(graphX(ld), bracketY - 5, graphX(ld), bracketY + 5);
    line(graphX(ls), bracketY - 5, graphX(ls), bracketY + 5);

    noStroke();
    fill('red');
    textSize(11);
    textAlign(CENTER, BOTTOM);
    text('Unemployment: ' + surplus + ' workers', graphX((ld + ls) / 2), bracketY - 5);

    // Ld and Ls markers
    stroke('blue');
    strokeWeight(1);
    line(graphX(ld), floorY, graphX(ld), graphBottom);
    stroke('orange');
    line(graphX(ls), floorY, graphX(ls), graphBottom);
    noStroke();
    fill('blue');
    textSize(10);
    textAlign(CENTER, TOP);
    text('Ld=' + ld, graphX(ld), graphBottom + 18);
    fill('orange');
    text('Ls=' + ls, graphX(ls), graphBottom + 18);

    // DWL label
    fill('red');
    textSize(11);
    textAlign(CENTER, CENTER);
    let dwlX = graphX(ld + (eqWorkers - ld) * 0.3);
    let dwlY = graphY((floorWage + eqWage) / 2);
    text('DWL', dwlX, dwlY);

    // Worker icons (simple circles)
    let iconY = floorY + 18;
    let iconSpacing = min(14, (graphX(ls) - graphX(0)) / 20);
    let startX = graphX(0) + 10;

    // Employed workers (green)
    fill('green');
    for (let i = 0; i < min(8, ld / 125); i++) {
      let ix = graphX(ld / 2) - 50 + i * iconSpacing;
      if (ix < graphRight) ellipse(ix, iconY, 8, 8);
    }

    // Unemployed workers (red)
    fill('red');
    for (let i = 0; i < min(6, surplus / 125); i++) {
      let ix = graphX(ld) + 15 + i * iconSpacing;
      if (ix < graphRight) {
        ellipse(ix, iconY, 8, 8);
        // X mark
        stroke('red');
        strokeWeight(1);
        line(ix - 3, iconY - 3, ix + 3, iconY + 3);
        line(ix + 3, iconY - 3, ix - 3, iconY + 3);
        noStroke();
      }
    }
  }

  // Info panel on right
  let infoX = graphRight + 20;
  let infoY = graphTop + 5;
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Labor Market:', infoX, infoY);

  textSize(12);
  if (isBinding) {
    let ld = round(laborDemand(floorWage));
    let ls = round(laborSupply(floorWage));
    let surplus = ls - ld;

    fill('red');
    textSize(14);
    text('BINDING FLOOR', infoX, infoY + 25);

    fill('black');
    textSize(12);
    text('Min Wage: $' + nf(floorWage, 0, 1), infoX, infoY + 50);
    text('Jobs available: ' + ld, infoX, infoY + 70);
    text('Workers seeking: ' + ls, infoX, infoY + 90);

    fill('red');
    textSize(13);
    text('Unemployed: ' + surplus, infoX, infoY + 115);

    // Total income comparison
    fill('black');
    textSize(11);
    let eqIncome = eqWage * eqWorkers;
    let floorIncome = floorWage * ld;
    text('Eq income: $' + eqIncome, infoX, infoY + 140);
    text('Floor income: $' + round(floorIncome), infoX, infoY + 158);
    fill(floorIncome >= eqIncome ? 'green' : 'red');
    text('Total wages ' + (floorIncome >= eqIncome ? 'UP' : 'DOWN'), infoX, infoY + 176);

    // Winners and losers
    if (showWinnersCheckbox.checked()) {
      fill('black');
      textSize(13);
      text('Trade-offs:', infoX, infoY + 200);
      textSize(11);

      fill('darkgreen');
      text('Winners:', infoX, infoY + 220);
      textSize(10);
      text(ld + ' workers earn', infoX + 5, infoY + 236);
      text('$' + nf(floorWage, 0, 1) + ' vs $' + eqWage, infoX + 5, infoY + 250);

      fill('darkred');
      textSize(11);
      text('Losers:', infoX, infoY + 272);
      textSize(10);
      text(surplus + ' workers can\'t', infoX + 5, infoY + 288);
      text('find jobs at all', infoX + 5, infoY + 302);

      fill('dimgray');
      textSize(10);
      text('Higher wages for', infoX, infoY + 324);
      text('some, fewer jobs', infoX, infoY + 338);
      text('for others.', infoX, infoY + 352);
    }
  } else {
    fill('green');
    textSize(14);
    text('NOT BINDING', infoX, infoY + 25);
    fill('gray');
    textSize(12);
    text('Floor at $' + nf(floorWage, 0, 1), infoX, infoY + 50);
    text('is below equilibrium', infoX, infoY + 70);
    text('of $' + eqWage + '/hr.', infoX, infoY + 90);
    text('No effect on market.', infoX, infoY + 115);
    text('Market wage: $' + eqWage, infoX, infoY + 140);
    text('Employment: ' + eqWorkers, infoX, infoY + 160);
  }

  // Control label
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, CENTER);
  text('Set Min Wage: $' + nf(floorWage, 0, 1), 10, drawHeight + 24);
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
