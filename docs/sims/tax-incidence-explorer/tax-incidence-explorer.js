// Tax Incidence Explorer MicroSim
// Shows how tax burden splits between buyers and sellers based on elasticity
// MicroSim template version 2026.03

let canvasWidth = 580;
let drawHeight = 460;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 60;
let defaultTextSize = 16;
let sliderLeftMargin = 140;

let graphLeft, graphRight, graphTop, graphBottom;

// Parameters
let taxAmount = 2;
let demandElasticity = 1.0; // slope multiplier (higher = more elastic)
let supplyElasticity = 1.0;

// Controls
let taxSlider, demandElSlider, supplyElSlider, taxOnSelect, resetBtn, showDWLBox;

// Base equilibrium at P=15, Q=50
let baseEqP = 15;
let baseEqQ = 50;
let maxPrice = 30;
let maxQ = 100;

function demandP(q) {
  // P = baseEqP + (baseEqQ - q) / (demandElasticity * 3.33)
  return baseEqP + (baseEqQ - q) / (demandElasticity * 3.33);
}

function supplyP(q) {
  // P = baseEqP - (baseEqQ - q) / (supplyElasticity * 3.33)
  return baseEqP - (baseEqQ - q) / (supplyElasticity * 3.33);
}

function supplyPWithTax(q) {
  return supplyP(q) + taxAmount;
}

function yFromPrice(p) { return map(p, 0, maxPrice, graphBottom, graphTop); }
function xFromQ(q) { return map(q, 0, maxQ, graphLeft, graphRight); }

// Find intersection of demand and supply+tax
function findNewEq() {
  // demandP(q) = supplyPWithTax(q)
  // baseEqP + (baseEqQ-q)/(dE*3.33) = baseEqP - (baseEqQ-q)/(sE*3.33) + tax
  // (baseEqQ-q)/(dE*3.33) + (baseEqQ-q)/(sE*3.33) = tax
  // (baseEqQ-q) * (1/(dE*3.33) + 1/(sE*3.33)) = tax
  let factor = 1 / (demandElasticity * 3.33) + 1 / (supplyElasticity * 3.33);
  let newQ = baseEqQ - taxAmount / factor;
  let buyerPrice = demandP(newQ);
  let sellerPrice = supplyP(newQ);
  return { q: newQ, buyerP: buyerPrice, sellerP: sellerPrice };
}

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  taxSlider = createSlider(0, 8, 2, 0.25);
  demandElSlider = createSlider(0.2, 3, 1, 0.1);
  supplyElSlider = createSlider(0.2, 3, 1, 0.1);

  taxOnSelect = createSelect();
  taxOnSelect.option('Tax on Sellers');
  taxOnSelect.option('Tax on Buyers');

  showDWLBox = createCheckbox('Show Deadweight Loss', true);
  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => {
    taxSlider.value(2);
    demandElSlider.value(1);
    supplyElSlider.value(1);
  });

  positionControls();
  describe('Tax incidence explorer showing how tax burden splits based on elasticity', LABEL);
}

function positionControls() {
  let y1 = drawHeight + 8;
  let y2 = drawHeight + 34;
  let y3 = drawHeight + 60;
  taxSlider.position(sliderLeftMargin, y1);
  taxSlider.size(150);
  demandElSlider.position(sliderLeftMargin, y2);
  demandElSlider.size(150);
  supplyElSlider.position(sliderLeftMargin, y3);
  supplyElSlider.size(150);
  taxOnSelect.position(sliderLeftMargin + 170, y1);
  showDWLBox.position(sliderLeftMargin + 170, y2);
  resetBtn.position(sliderLeftMargin + 170, y3);
}

function draw() {
  graphLeft = margin;
  graphRight = canvasWidth - 200;
  graphTop = margin;
  graphBottom = drawHeight - margin;

  taxAmount = taxSlider.value();
  demandElasticity = demandElSlider.value();
  supplyElasticity = supplyElSlider.value();

  // Background
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill('black');
  textSize(18);
  textAlign(CENTER, TOP);
  text('Tax Incidence Explorer', canvasWidth / 2, 10);

  // Axes
  stroke('black');
  strokeWeight(2);
  line(graphLeft, graphTop, graphLeft, graphBottom);
  line(graphLeft, graphBottom, graphRight, graphBottom);

  noStroke();
  fill('black');
  textSize(12);
  textAlign(CENTER, TOP);
  text('Quantity', (graphLeft + graphRight) / 2, graphBottom + 8);
  push();
  translate(18, (graphTop + graphBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, BOTTOM);
  text('Price ($)', 0, 0);
  pop();

  // Ticks
  textSize(10);
  for (let q = 0; q <= maxQ; q += 20) {
    let x = xFromQ(q);
    stroke('gray'); strokeWeight(1);
    line(x, graphBottom, x, graphBottom + 4);
    noStroke(); fill('gray');
    textAlign(CENTER, TOP);
    text(q, x, graphBottom + 5);
  }
  for (let p = 0; p <= maxPrice; p += 5) {
    let y = yFromPrice(p);
    stroke('gray'); strokeWeight(1);
    line(graphLeft - 4, y, graphLeft, y);
    noStroke(); fill('gray');
    textAlign(RIGHT, CENTER);
    text('$' + p, graphLeft - 6, y);
  }

  let eq = findNewEq();
  let newQ = constrain(eq.q, 0, maxQ);
  let buyerP = eq.buyerP;
  let sellerP = eq.sellerP;

  // Buyer burden area (light red, above old eq price to buyer price)
  if (taxAmount > 0 && newQ > 0) {
    // Buyer burden
    noStroke();
    fill(255, 100, 100, 60);
    let y1 = yFromPrice(buyerP);
    let y2 = yFromPrice(baseEqP);
    rect(xFromQ(0), y1, xFromQ(newQ) - xFromQ(0), y2 - y1);

    // Seller burden
    fill(100, 100, 255, 60);
    let y3 = yFromPrice(baseEqP);
    let y4 = yFromPrice(sellerP);
    rect(xFromQ(0), y3, xFromQ(newQ) - xFromQ(0), y4 - y3);

    // Deadweight loss
    if (showDWLBox.checked() && newQ < baseEqQ) {
      fill(128, 128, 128, 80);
      beginShape();
      vertex(xFromQ(newQ), yFromPrice(buyerP));
      vertex(xFromQ(baseEqQ), yFromPrice(baseEqP));
      vertex(xFromQ(newQ), yFromPrice(sellerP));
      endShape(CLOSE);
    }
  }

  // Original supply curve
  stroke('orange');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let q = 0; q <= maxQ; q += 1) {
    let p = supplyP(q);
    if (p >= 0 && p <= maxPrice) vertex(xFromQ(q), yFromPrice(p));
  }
  endShape();

  // Supply + Tax curve (dashed)
  if (taxAmount > 0) {
    stroke('orangered');
    strokeWeight(2);
    drawingContext.setLineDash([6, 4]);
    noFill();
    beginShape();
    for (let q = 0; q <= maxQ; q += 1) {
      let p = supplyPWithTax(q);
      if (p >= 0 && p <= maxPrice) vertex(xFromQ(q), yFromPrice(p));
    }
    endShape();
    drawingContext.setLineDash([]);
  }

  // Demand curve
  stroke('blue');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let q = 0; q <= maxQ; q += 1) {
    let p = demandP(q);
    if (p >= 0 && p <= maxPrice) vertex(xFromQ(q), yFromPrice(p));
  }
  endShape();

  // Curve labels
  noStroke();
  fill('blue');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Demand', xFromQ(75) + 3, yFromPrice(demandP(75)));
  fill('orange');
  text('Supply', xFromQ(75) + 3, yFromPrice(supplyP(75)));
  if (taxAmount > 0) {
    fill('orangered');
    text('S + Tax', xFromQ(70) + 3, yFromPrice(supplyPWithTax(70)));
  }

  // Equilibrium dot
  fill('green');
  stroke('darkgreen');
  strokeWeight(2);
  ellipse(xFromQ(baseEqQ), yFromPrice(baseEqP), 8, 8);

  // New equilibrium markers
  if (taxAmount > 0 && newQ > 0) {
    // Buyer price marker
    stroke('red');
    strokeWeight(2);
    drawingContext.setLineDash([4, 3]);
    line(graphLeft, yFromPrice(buyerP), xFromQ(newQ), yFromPrice(buyerP));
    line(xFromQ(newQ), yFromPrice(buyerP), xFromQ(newQ), graphBottom);
    drawingContext.setLineDash([]);

    // Seller price marker
    stroke('blue');
    drawingContext.setLineDash([4, 3]);
    line(graphLeft, yFromPrice(sellerP), xFromQ(newQ), yFromPrice(sellerP));
    drawingContext.setLineDash([]);

    // Tax wedge bracket
    stroke('red');
    strokeWeight(2);
    let bx = xFromQ(newQ) + 8;
    line(bx, yFromPrice(buyerP), bx, yFromPrice(sellerP));
    line(bx - 4, yFromPrice(buyerP), bx, yFromPrice(buyerP));
    line(bx - 4, yFromPrice(sellerP), bx, yFromPrice(sellerP));
    noStroke();
    fill('red');
    textSize(10);
    textAlign(LEFT, CENTER);
    text('Tax', bx + 4, (yFromPrice(buyerP) + yFromPrice(sellerP)) / 2);
  }

  // Info panel
  let infoX = canvasWidth - 190;
  let infoY = graphTop + 10;
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, TOP);
  text('Tax: $' + nf(taxAmount, 0, 2), infoX, infoY);

  textSize(12);
  let ly = infoY + 28;
  text('Original: P=$' + baseEqP + ', Q=' + baseEqQ, infoX, ly);

  if (taxAmount > 0 && newQ > 0) {
    ly += 22;
    fill('red');
    text('Buyer pays: $' + nf(buyerP, 0, 2), infoX, ly);
    ly += 18;
    fill('blue');
    text('Seller gets: $' + nf(sellerP, 0, 2), infoX, ly);
    ly += 18;
    fill('black');
    text('Q traded: ' + nf(newQ, 0, 0), infoX, ly);

    // Burden calculation
    let buyerBurden = buyerP - baseEqP;
    let sellerBurden = baseEqP - sellerP;
    let totalBurden = buyerBurden + sellerBurden;
    let buyerPct = totalBurden > 0 ? (buyerBurden / totalBurden * 100) : 0;
    let sellerPct = totalBurden > 0 ? (sellerBurden / totalBurden * 100) : 0;

    ly += 28;
    fill('black');
    textSize(13);
    text('TAX BURDEN:', infoX, ly);
    ly += 20;
    textSize(12);
    fill('red');
    text('Buyers: ' + nf(buyerPct, 0, 0) + '%', infoX, ly);
    // Burden bar
    noStroke();
    fill(255, 100, 100, 100);
    rect(infoX, ly + 16, buyerPct * 1.5, 12);

    ly += 34;
    fill('blue');
    noStroke();
    text('Sellers: ' + nf(sellerPct, 0, 0) + '%', infoX, ly);
    fill(100, 100, 255, 100);
    rect(infoX, ly + 16, sellerPct * 1.5, 12);

    ly += 40;
    fill('gray');
    textSize(12);
    let govRev = taxAmount * newQ;
    text('Gov revenue: $' + nf(govRev, 0, 0), infoX, ly);

    let dwl = 0.5 * taxAmount * (baseEqQ - newQ);
    text('DW Loss: $' + nf(max(0, dwl), 0, 0), infoX, ly + 18);

    // Key insight
    ly += 48;
    fill('darkred');
    textSize(11);
    text("It doesn't matter who", infoX, ly);
    text("writes the check \u2014", infoX, ly + 14);
    text("burden depends on", infoX, ly + 28);
    text("ELASTICITY!", infoX, ly + 42);
  }

  // Elasticity labels
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, CENTER);
  let elLabel = demandElasticity < 0.5 ? 'Very Inelastic' :
    demandElasticity < 1.0 ? 'Inelastic' :
    demandElasticity < 1.5 ? 'Unit Elastic' :
    demandElasticity < 2.5 ? 'Elastic' : 'Very Elastic';
  text('Demand: ' + elLabel, infoX, drawHeight - 30);

  let slLabel = supplyElasticity < 0.5 ? 'Very Inelastic' :
    supplyElasticity < 1.0 ? 'Inelastic' :
    supplyElasticity < 1.5 ? 'Unit Elastic' :
    supplyElasticity < 2.5 ? 'Elastic' : 'Very Elastic';
  text('Supply: ' + slLabel, infoX, drawHeight - 14);

  // Control area labels
  noStroke();
  fill('black');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Tax Amount: $' + nf(taxAmount, 0, 2), 10, drawHeight + 16);
  text('Demand Elast: ' + nf(demandElasticity, 0, 1), 10, drawHeight + 42);
  text('Supply Elast: ' + nf(supplyElasticity, 0, 1), 10, drawHeight + 68);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasHeight = drawHeight + controlHeight;
}
