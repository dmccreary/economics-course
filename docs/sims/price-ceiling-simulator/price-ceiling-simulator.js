// Price Ceiling Simulator MicroSim
// Analyze how price ceilings (rent control) create shortages
// and unintended consequences in rental markets.

let canvasWidth = 580;
let drawHeight = 460;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 60;

// Graph area
let graphLeft, graphRight, graphTop, graphBottom;

// Market parameters
let eqPrice = 1500;   // Equilibrium rent
let eqQuantity = 1000; // Equilibrium apartments
let minPrice = 500;
let maxPrice = 2500;
let maxQuantity = 2000;

// Controls
let ceilingSlider;
let showEqCheckbox, showConsequencesCheckbox;
let resetButton;

// Supply: Qs = (P / eqPrice) * eqQuantity  => at eqPrice, Qs = eqQuantity
function supplyQ(p) {
  return (p / eqPrice) * eqQuantity;
}

// Demand: Qd = 2 * eqQuantity - (P / eqPrice) * eqQuantity  => at eqPrice, Qd = eqQuantity
function demandQ(p) {
  return 2 * eqQuantity - (p / eqPrice) * eqQuantity;
}

function graphX(q) {
  return map(q, 0, maxQuantity, graphLeft, graphRight);
}

function graphY(p) {
  return map(p, 0, maxPrice, graphBottom, graphTop);
}

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  ceilingSlider = createSlider(minPrice, 2000, 1000, 50);
  showEqCheckbox = createCheckbox('Show Equilibrium', true);
  showConsequencesCheckbox = createCheckbox('Show Consequences', false);
  resetButton = createButton('Remove Ceiling');
  resetButton.mousePressed(() => { ceilingSlider.value(2000); });

  positionControls();
}

function positionControls() {
  let y1 = drawHeight + 12;
  let y2 = drawHeight + 45;
  ceilingSlider.position(140, y1);
  ceilingSlider.size(200);
  resetButton.position(360, y1 - 3);
  showEqCheckbox.position(10, y2);
  showConsequencesCheckbox.position(180, y2);
}

function draw() {
  graphLeft = margin;
  graphRight = canvasWidth - 210;
  graphTop = margin + 10;
  graphBottom = drawHeight - margin;

  let ceiling = ceilingSlider.value();
  let isBinding = ceiling < eqPrice;

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
  text('Price Ceiling Simulator', canvasWidth / 2, 8);
  textSize(12);
  fill('gray');
  text('Rent Control Example', canvasWidth / 2, 30);

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
  text('Apartments (units)', (graphLeft + graphRight) / 2, graphBottom + 8);
  push();
  translate(18, (graphTop + graphBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, BOTTOM);
  text('Rent ($/month)', 0, 0);
  pop();

  // Tick marks - quantity
  textSize(10);
  textAlign(CENTER, TOP);
  for (let q = 0; q <= maxQuantity; q += 500) {
    let x = graphX(q);
    stroke('lightgray');
    strokeWeight(1);
    line(x, graphTop, x, graphBottom);
    noStroke();
    fill('gray');
    text(q, x, graphBottom + 5);
  }

  // Tick marks - price
  textAlign(RIGHT, CENTER);
  for (let p = 0; p <= maxPrice; p += 500) {
    let y = graphY(p);
    stroke('lightgray');
    strokeWeight(1);
    line(graphLeft, y, graphRight, y);
    noStroke();
    fill('gray');
    text('$' + p, graphLeft - 6, y);
  }

  // Deadweight loss triangle (draw before curves)
  if (isBinding) {
    let qs = supplyQ(ceiling);
    let qd = demandQ(ceiling);
    let pSupply = ceiling;
    let pDemand = ceiling;
    // DWL triangle: from Qs at ceiling price up to equilibrium and back
    // vertices: (Qs, ceiling), (eqQ, eqP), (Qs, demand price at Qs)
    let demandPriceAtQs = eqPrice * (2 - qs / eqQuantity); // inverse demand

    fill(255, 0, 0, 40);
    noStroke();
    triangle(
      graphX(qs), graphY(ceiling),
      graphX(eqQuantity), graphY(eqPrice),
      graphX(qs), graphY(demandPriceAtQs)
    );
  }

  // Draw supply curve (orange)
  stroke('orange');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let p = 0; p <= maxPrice; p += 10) {
    let q = supplyQ(p);
    if (q >= 0 && q <= maxQuantity) vertex(graphX(q), graphY(p));
  }
  endShape();

  // Draw demand curve (blue)
  stroke('blue');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let p = 0; p <= maxPrice; p += 10) {
    let q = demandQ(p);
    if (q >= 0 && q <= maxQuantity) vertex(graphX(q), graphY(p));
  }
  endShape();

  // Curve labels
  noStroke();
  fill('orange');
  textSize(13);
  textAlign(LEFT, CENTER);
  text('Supply', graphX(supplyQ(2200)) + 5, graphY(2200));
  fill('blue');
  text('Demand', graphX(demandQ(2200)) + 5, graphY(2200));

  // Equilibrium point
  if (showEqCheckbox.checked()) {
    let eqX = graphX(eqQuantity);
    let eqY = graphY(eqPrice);
    fill('gold');
    stroke('darkgoldenrod');
    strokeWeight(2);
    ellipse(eqX, eqY, 14, 14);
    noStroke();
    fill('darkgoldenrod');
    textSize(11);
    textAlign(LEFT, TOP);
    text('Eq: $' + eqPrice + ', ' + eqQuantity + ' units', eqX + 10, eqY - 5);
  }

  // Price ceiling line
  let ceilingY = graphY(ceiling);
  stroke('red');
  strokeWeight(2);
  drawingContext.setLineDash([8, 6]);
  line(graphLeft, ceilingY, graphRight, ceilingY);
  drawingContext.setLineDash([]);

  noStroke();
  fill('red');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Ceiling: $' + ceiling, graphLeft + 5, ceilingY - 12);

  // Shortage visualization
  if (isBinding) {
    let qs = round(supplyQ(ceiling));
    let qd = round(demandQ(ceiling));
    let shortage = qd - qs;

    // Shortage bracket
    stroke('red');
    strokeWeight(2);
    let bracketY = ceilingY + 5;
    line(graphX(qs), bracketY, graphX(qd), bracketY);
    line(graphX(qs), bracketY - 5, graphX(qs), bracketY + 5);
    line(graphX(qd), bracketY - 5, graphX(qd), bracketY + 5);

    noStroke();
    fill('red');
    textSize(11);
    textAlign(CENTER, TOP);
    text('Shortage: ' + shortage + ' units', graphX((qs + qd) / 2), bracketY + 8);

    // Qs and Qd markers
    stroke('orange');
    strokeWeight(1);
    line(graphX(qs), ceilingY, graphX(qs), graphBottom);
    stroke('blue');
    line(graphX(qd), ceilingY, graphX(qd), graphBottom);
    noStroke();
    fill('orange');
    textSize(10);
    textAlign(CENTER, TOP);
    text('Qs=' + qs, graphX(qs), graphBottom + 18);
    fill('blue');
    text('Qd=' + qd, graphX(qd), graphBottom + 18);

    // DWL label
    fill('red');
    textSize(11);
    textAlign(CENTER, CENTER);
    let dwlX = graphX(qs + (eqQuantity - qs) * 0.3);
    let dwlY = graphY((ceiling + eqPrice) / 2);
    text('DWL', dwlX, dwlY);
  }

  // Info panel on right
  let infoX = graphRight + 20;
  let infoY = graphTop + 5;
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Market Outcomes:', infoX, infoY);

  textSize(12);
  if (isBinding) {
    let qs = round(supplyQ(ceiling));
    let qd = round(demandQ(ceiling));
    let shortage = qd - qs;

    fill('red');
    textSize(14);
    text('BINDING CEILING', infoX, infoY + 25);

    fill('black');
    textSize(12);
    text('Ceiling: $' + ceiling + '/mo', infoX, infoY + 50);
    text('Supplied: ' + qs + ' apts', infoX, infoY + 70);
    text('Demanded: ' + qd + ' apts', infoX, infoY + 90);

    fill('red');
    textSize(13);
    text('Shortage: ' + shortage, infoX, infoY + 115);

    // Consequences panel
    if (showConsequencesCheckbox.checked()) {
      fill('black');
      textSize(13);
      text('Consequences:', infoX, infoY + 145);
      textSize(11);
      fill('darkred');
      let cy = infoY + 165;
      text('Reduced quality', infoX + 5, cy);
      text('Long waiting lists', infoX + 5, cy + 18);
      text('Black market rents', infoX + 5, cy + 36);
      text('Less new building', infoX + 5, cy + 54);

      fill('darkgreen');
      text('Winners:', infoX, cy + 80);
      textSize(10);
      text('Lucky renters who', infoX + 5, cy + 96);
      text('get cheap apartments', infoX + 5, cy + 110);

      fill('darkred');
      textSize(11);
      text('Losers:', infoX, cy + 132);
      textSize(10);
      text('Those who can\'t find', infoX + 5, cy + 148);
      text('housing, landlords,', infoX + 5, cy + 162);
      text('society (DWL)', infoX + 5, cy + 176);
    }
  } else {
    fill('green');
    textSize(14);
    text('NOT BINDING', infoX, infoY + 25);
    fill('gray');
    textSize(12);
    text('Ceiling at $' + ceiling, infoX, infoY + 50);
    text('is above equilibrium', infoX, infoY + 70);
    text('of $' + eqPrice + '.', infoX, infoY + 90);
    text('No effect on market.', infoX, infoY + 115);
  }

  // Control label
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, CENTER);
  text('Set Ceiling: $' + ceiling, 10, drawHeight + 24);
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
