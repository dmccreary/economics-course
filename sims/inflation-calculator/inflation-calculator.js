// Inflation Impact Calculator MicroSim
// See how inflation erodes purchasing power over time
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 370;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

let amountSlider, rateSlider, yearsSlider;
let presetSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  amountSlider = createSlider(100, 10000, 1000, 100);
  amountSlider.position(sliderLeftMargin, drawHeight + 5);
  amountSlider.size(canvasWidth - sliderLeftMargin - margin);

  rateSlider = createSlider(0, 15, 3, 0.5);
  rateSlider.position(sliderLeftMargin, drawHeight + 28);
  rateSlider.size(canvasWidth - sliderLeftMargin - margin);

  yearsSlider = createSlider(1, 30, 10, 1);
  yearsSlider.position(sliderLeftMargin, drawHeight + 51);
  yearsSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Inflation calculator showing how rising prices erode purchasing power over time with nominal vs real value comparison', LABEL);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let amount = amountSlider.value();
  let rate = rateSlider.value();
  let years = yearsSlider.value();

  let realValue = amount / pow(1 + rate / 100, years);
  let lostPower = amount - realValue;
  let pctLost = (lostPower / amount) * 100;

  // What the money buys today vs later
  let pizzaPrice = 15;
  let pizzasNow = floor(amount / pizzaPrice);
  let futurePizzaPrice = pizzaPrice * pow(1 + rate / 100, years);
  let pizzasLater = floor(amount / futurePizzaPrice);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Inflation Impact Calculator', canvasWidth / 2, 8);

  // Big result
  textSize(14);
  fill('gray');
  text('$' + nf(amount, 1, 0) + ' today will have the buying power of...', canvasWidth / 2, 32);

  textSize(32);
  fill('crimson');
  text('$' + nf(realValue, 1, 0), canvasWidth / 2, 52);

  textSize(12);
  fill('gray');
  text('in ' + years + ' years at ' + nf(rate, 1, 1) + '% inflation', canvasWidth / 2, 88);

  // Purchasing power graph over time
  let gLeft = 60;
  let gRight = canvasWidth - 30;
  let gTop = 115;
  let gBottom = 240;

  stroke('black');
  strokeWeight(1.5);
  line(gLeft, gTop, gLeft, gBottom);
  line(gLeft, gBottom, gRight, gBottom);

  noStroke();
  fill('black');
  textSize(10);
  textAlign(CENTER, TOP);
  text('Years', (gLeft + gRight) / 2, gBottom + 2);
  push();
  translate(15, (gTop + gBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Real Value ($)', 0, 0);
  pop();

  // Nominal line (flat)
  stroke('steelblue');
  strokeWeight(2);
  drawingContext.setLineDash([5, 5]);
  let nomY = map(amount, 0, amount * 1.1, gBottom, gTop);
  line(gLeft, nomY, gRight, nomY);
  drawingContext.setLineDash([]);

  // Real value line (declining)
  stroke('crimson');
  strokeWeight(2.5);
  noFill();
  beginShape();
  for (let y = 0; y <= years; y++) {
    let rv = amount / pow(1 + rate / 100, y);
    let x = map(y, 0, years, gLeft, gRight);
    let yy = map(rv, 0, amount * 1.1, gBottom, gTop);
    vertex(x, yy);
  }
  endShape();

  // Fill area between (lost purchasing power)
  fill(200, 100, 100, 40);
  noStroke();
  beginShape();
  vertex(gLeft, nomY);
  for (let y = 0; y <= years; y++) {
    let rv = amount / pow(1 + rate / 100, y);
    let x = map(y, 0, years, gLeft, gRight);
    let yy = map(rv, 0, amount * 1.1, gBottom, gTop);
    vertex(x, yy);
  }
  vertex(gRight, nomY);
  endShape(CLOSE);

  // Legend
  noStroke();
  textSize(10);
  textAlign(LEFT, CENTER);
  fill('steelblue');
  text('— — Nominal ($' + amount + ')', gLeft + 10, gTop + 5);
  fill('crimson');
  text('——— Real Value', gLeft + 10, gTop + 18);

  // Tick labels
  fill('gray');
  textSize(9);
  for (let y = 0; y <= years; y += max(1, floor(years / 5))) {
    let x = map(y, 0, years, gLeft, gRight);
    textAlign(CENTER, TOP);
    text(y, x, gBottom + 2);
  }

  // Pizza comparison
  let pizzaY = 255;
  noStroke();
  fill('black');
  textSize(13);
  textAlign(CENTER, TOP);
  text('What $' + nf(amount, 1, 0) + ' buys in pizzas ($' + pizzaPrice + ' each)', canvasWidth / 2, pizzaY);

  pizzaY += 20;
  fill('green');
  textSize(12);
  textAlign(LEFT, TOP);
  text('Today: ' + pizzasNow + ' pizzas', 30, pizzaY);

  fill('crimson');
  text('In ' + years + ' yrs: ' + pizzasLater + ' pizzas ($' + nf(futurePizzaPrice, 1, 2) + ' each)', 30, pizzaY + 18);

  fill('black');
  textSize(11);
  text('You lose ' + (pizzasNow - pizzasLater) + ' pizzas worth of buying power!', 30, pizzaY + 40);

  // Lost purchasing power summary
  let sumY = pizzaY + 62;
  fill(255, 240, 240);
  noStroke();
  rect(20, sumY, canvasWidth - 40, 25, 5);
  fill('crimson');
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Purchasing power lost: $' + nf(lostPower, 1, 0) + ' (' + nf(pctLost, 1, 1) + '%)', canvasWidth / 2, sumY + 12);

  // Slider labels
  noStroke();
  fill('black');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Amount: $' + nf(amount, 1, 0), 10, drawHeight + 15);
  text('Inflation: ' + nf(rate, 1, 1) + '%', 10, drawHeight + 38);
  text('Years: ' + years, 10, drawHeight + 61);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  amountSlider.size(canvasWidth - sliderLeftMargin - margin);
  rateSlider.size(canvasWidth - sliderLeftMargin - margin);
  yearsSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
