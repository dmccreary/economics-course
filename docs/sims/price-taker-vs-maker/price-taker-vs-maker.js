// Price Taker vs Price Maker Simulator MicroSim
// Compare pricing in perfect competition vs monopoly

let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 55;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

let compPriceSlider, monoPriceSlider;
let resetBtn;
let marketPrice = 10;
let costPerUnit = 6;

// Monopoly demand: Q = 250 - 10*P
function monoDemand(p) { return max(0, 250 - 10 * p); }

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  compPriceSlider = createSlider(1, 20, 10, 0.5);
  monoPriceSlider = createSlider(1, 25, 15, 0.5);

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => {
    compPriceSlider.value(10);
    monoPriceSlider.value(15);
  });

  positionControls();
  describe('Side-by-side comparison of price taker in perfect competition vs price maker in monopoly', LABEL);
}

function positionControls() {
  let half = canvasWidth / 2;
  let y = drawHeight + 15;
  compPriceSlider.position(90, y);
  compPriceSlider.size(half - 110);
  monoPriceSlider.position(half + 90, y);
  monoPriceSlider.size(half - 110);
  resetBtn.position(canvasWidth - 60, y - 2);
}

function draw() {
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let half = canvasWidth / 2;
  let compPrice = compPriceSlider.value();
  let monoPrice = monoPriceSlider.value();

  // Title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(20);
  text('Price Taker vs Price Maker', canvasWidth / 2, 6);

  // Divider
  stroke('silver');
  strokeWeight(1);
  line(half, 30, half, drawHeight);

  // --- LEFT: Perfect Competition ---
  drawCompetition(10, 35, half - 20, compPrice);

  // --- RIGHT: Monopoly ---
  drawMonopoly(half + 10, 35, half - 20, monoPrice);

  // Control labels
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Your Price:', 10, drawHeight + 23);
  text('Your Price:', half + 10, drawHeight + 23);
}

function drawCompetition(ox, oy, w, yourPrice) {
  noStroke();
  fill('steelblue');
  textAlign(CENTER, TOP);
  textSize(14);
  text('Perfect Competition', ox + w / 2, oy);
  textSize(11);
  fill('gray');
  text('(Price Taker)', ox + w / 2, oy + 17);

  // Mini graph
  let gLeft = ox + 30;
  let gRight = ox + w - 10;
  let gTop = oy + 40;
  let gBottom = oy + 170;

  // Axes
  stroke('black');
  strokeWeight(1);
  line(gLeft, gTop, gLeft, gBottom);
  line(gLeft, gBottom, gRight, gBottom);

  noStroke();
  fill('black');
  textSize(9);
  textAlign(CENTER, TOP);
  text('Q', (gLeft + gRight) / 2, gBottom + 2);
  textAlign(RIGHT, CENTER);
  text('P', gLeft - 4, (gTop + gBottom) / 2);

  // Market price line (horizontal demand)
  let mpY = map(marketPrice, 0, 25, gBottom, gTop);
  stroke('green');
  strokeWeight(2);
  line(gLeft, mpY, gRight, mpY);
  noStroke();
  fill('green');
  textSize(9);
  textAlign(LEFT, CENTER);
  text('P=$' + marketPrice, gRight - 35, mpY - 10);

  // Your price line
  let ypY = map(yourPrice, 0, 25, gBottom, gTop);
  stroke('red');
  strokeWeight(2);
  drawingContext.setLineDash([4, 4]);
  line(gLeft, ypY, gRight, ypY);
  drawingContext.setLineDash([]);
  noStroke();
  fill('red');
  textSize(9);
  text('You=$' + nf(yourPrice, 1, 1), gLeft + 5, ypY - 10);

  // Calculate competition outcome
  let compCapacity = 50;
  let customers, revenue, cost, profit;
  if (yourPrice > marketPrice) {
    customers = 0;
  } else if (yourPrice < marketPrice) {
    customers = compCapacity;
  } else {
    customers = compCapacity;
  }
  revenue = customers * yourPrice;
  cost = customers * costPerUnit;
  profit = revenue - cost;

  // Results
  let ry = gBottom + 20;
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, TOP);
  text('Customers: ' + customers, ox + 5, ry);
  text('Revenue: $' + nf(revenue, 1, 0), ox + 5, ry + 18);
  text('Cost: $' + nf(cost, 1, 0), ox + 5, ry + 36);

  fill(profit >= 0 ? 'green' : 'red');
  textSize(13);
  text('Profit: $' + nf(profit, 1, 0), ox + 5, ry + 56);

  // Message
  textSize(11);
  let msgY = ry + 80;
  if (yourPrice > marketPrice) {
    fill('red');
    text('Price too high!', ox + 5, msgY);
    text('Customers go elsewhere.', ox + 5, msgY + 15);
  } else if (yourPrice < marketPrice) {
    fill('darkorange');
    text('Lower price = less profit.', ox + 5, msgY);
    text('Same customers, less revenue.', ox + 5, msgY + 15);
  } else {
    fill('green');
    text('At market price: optimal!', ox + 5, msgY);
    text('You are a price TAKER.', ox + 5, msgY + 15);
  }

  // Customer icons
  let iconY = ry + 115;
  let maxIcons = 10;
  let showIcons = round(map(customers, 0, compCapacity, 0, maxIcons));
  for (let i = 0; i < maxIcons; i++) {
    fill(i < showIcons ? 'steelblue' : color(220));
    noStroke();
    circle(ox + 10 + i * 18, iconY, 12);
  }
}

function drawMonopoly(ox, oy, w, yourPrice) {
  noStroke();
  fill('darkred');
  textAlign(CENTER, TOP);
  textSize(14);
  text('Monopoly', ox + w / 2, oy);
  textSize(11);
  fill('gray');
  text('(Price Maker)', ox + w / 2, oy + 17);

  // Mini graph
  let gLeft = ox + 30;
  let gRight = ox + w - 10;
  let gTop = oy + 40;
  let gBottom = oy + 170;

  // Axes
  stroke('black');
  strokeWeight(1);
  line(gLeft, gTop, gLeft, gBottom);
  line(gLeft, gBottom, gRight, gBottom);

  noStroke();
  fill('black');
  textSize(9);
  textAlign(CENTER, TOP);
  text('Q', (gLeft + gRight) / 2, gBottom + 2);
  textAlign(RIGHT, CENTER);
  text('P', gLeft - 4, (gTop + gBottom) / 2);

  // Demand curve (downward sloping)
  stroke('steelblue');
  strokeWeight(2);
  noFill();
  beginShape();
  for (let p = 1; p <= 25; p += 0.5) {
    let q = monoDemand(p);
    let x = map(q, 0, 250, gLeft, gRight);
    let y = map(p, 0, 25, gBottom, gTop);
    vertex(x, y);
  }
  endShape();
  noStroke();
  fill('steelblue');
  textSize(9);
  textAlign(LEFT, CENTER);
  text('D', gRight - 10, gBottom - 15);

  // Current point on demand
  let qty = monoDemand(yourPrice);
  let ptX = map(qty, 0, 250, gLeft, gRight);
  let ptY = map(yourPrice, 0, 25, gBottom, gTop);

  // Dotted lines
  stroke('gray');
  strokeWeight(1);
  drawingContext.setLineDash([3, 3]);
  line(ptX, ptY, ptX, gBottom);
  line(ptX, ptY, gLeft, ptY);
  drawingContext.setLineDash([]);

  fill('red');
  noStroke();
  circle(ptX, ptY, 10);

  // Calculate monopoly outcome
  let revenue = yourPrice * qty;
  let cost = qty * costPerUnit;
  let profit = revenue - cost;

  // Optimal price (MR = MC => 250-20P = MC*10 => P = (250-10*MC)/20)
  let optimalPrice = (250 + 10 * costPerUnit) / 20;
  let optimalQty = monoDemand(optimalPrice);
  let optimalProfit = optimalPrice * optimalQty - optimalQty * costPerUnit;

  // Results
  let ry = gBottom + 20;
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, TOP);
  text('Customers: ' + nf(qty, 1, 0), ox + 5, ry);
  text('Revenue: $' + nf(revenue, 1, 0), ox + 5, ry + 18);
  text('Cost: $' + nf(cost, 1, 0), ox + 5, ry + 36);

  fill(profit >= 0 ? 'green' : 'red');
  textSize(13);
  text('Profit: $' + nf(profit, 1, 0), ox + 5, ry + 56);

  // Message
  textSize(11);
  let msgY = ry + 80;
  if (abs(yourPrice - optimalPrice) < 1) {
    fill('green');
    text('Near optimal price!', ox + 5, msgY);
    text('You are a price MAKER.', ox + 5, msgY + 15);
  } else if (yourPrice < optimalPrice) {
    fill('darkorange');
    text('More customers, but low margin.', ox + 5, msgY);
    text('Try raising the price.', ox + 5, msgY + 15);
  } else {
    fill('darkorange');
    text('High margin, but few buyers.', ox + 5, msgY);
    text('Try lowering the price.', ox + 5, msgY + 15);
  }

  // Show optimal hint
  fill('gray');
  textSize(10);
  text('Best profit: $' + nf(optimalProfit, 1, 0) + ' at $' + nf(optimalPrice, 1, 1), ox + 5, msgY + 35);

  // Customer icons
  let iconY = ry + 115;
  let maxIcons = 10;
  let showIcons = round(map(qty, 0, 200, 0, maxIcons));
  for (let i = 0; i < maxIcons; i++) {
    fill(i < showIcons ? 'darkred' : color(220));
    noStroke();
    circle(ox + 10 + i * 18, iconY, 12);
  }
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
