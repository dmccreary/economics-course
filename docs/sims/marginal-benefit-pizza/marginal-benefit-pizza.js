// Diminishing Marginal Benefit MicroSim
// Eat pizza slices and watch satisfaction decrease per slice
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

let slicesEaten = 0;
let maxSlices = 8;
let eatBtn, resetBtn;

// Marginal benefit per slice (decreasing)
let mbValues = [10, 8, 6, 4, 2, 0.5, -1, -3];

function totalSatisfaction() {
  let total = 0;
  for (let i = 0; i < slicesEaten; i++) total += mbValues[i];
  return total;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  eatBtn = createButton('Eat Another Slice!');
  eatBtn.position(10, drawHeight + 10);
  eatBtn.mousePressed(() => { if (slicesEaten < maxSlices) slicesEaten++; });

  resetBtn = createButton('Start Over');
  resetBtn.position(160, drawHeight + 10);
  resetBtn.mousePressed(() => { slicesEaten = 0; });

  describe('Diminishing marginal benefit demonstration using pizza slices to show how satisfaction decreases with each additional unit consumed', LABEL);
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
  text('Diminishing Marginal Benefit', canvasWidth / 2, 8);

  // Status
  textSize(14);
  fill('gray');
  text('Pizza Slice ' + slicesEaten + ' of ' + maxSlices, canvasWidth / 2, 30);

  // Satisfaction meter
  let total = totalSatisfaction();
  let mb = slicesEaten > 0 ? mbValues[slicesEaten - 1] : 0;

  // Pizza visual
  let pizzaY = 65;
  let sliceW = (canvasWidth - 60) / maxSlices;

  for (let i = 0; i < maxSlices; i++) {
    let sx = 30 + i * sliceW;
    let eaten = i < slicesEaten;

    // Pizza slice shape
    if (eaten) {
      fill(220, 180, 100);
    } else {
      fill(255, 200, 50);
    }
    stroke(200, 150, 50);
    strokeWeight(1);
    // Triangle-ish slice
    triangle(sx + sliceW / 2, pizzaY, sx + 3, pizzaY + 40, sx + sliceW - 3, pizzaY + 40);

    // Toppings
    if (!eaten) {
      fill('red');
      noStroke();
      circle(sx + sliceW / 2, pizzaY + 18, 6);
      circle(sx + sliceW / 2 - 5, pizzaY + 28, 5);
      circle(sx + sliceW / 2 + 5, pizzaY + 28, 5);
    }

    // Bite mark if eaten
    if (eaten) {
      fill('aliceblue');
      noStroke();
      circle(sx + sliceW / 2, pizzaY + 5, 12);
    }

    // Slice number
    noStroke();
    fill(eaten ? 'gray' : 'black');
    textSize(9);
    textAlign(CENTER, TOP);
    text('#' + (i + 1), sx + sliceW / 2, pizzaY + 44);
  }

  // Bar chart of marginal benefit
  let chartY = 125;
  let chartH = 130;
  let chartBottom = chartY + chartH;
  let barW = sliceW - 8;
  let maxMB = 12;

  // Axis
  stroke('black');
  strokeWeight(1);
  line(28, chartBottom, canvasWidth - 28, chartBottom);
  // Zero line
  let zeroY = map(0, -4, maxMB, chartBottom, chartY);
  stroke(200);
  strokeWeight(0.5);
  line(28, zeroY, canvasWidth - 28, zeroY);

  noStroke();
  fill('black');
  textSize(10);
  textAlign(CENTER, TOP);
  text('Marginal Benefit per Slice', canvasWidth / 2, chartY - 15);

  for (let i = 0; i < maxSlices; i++) {
    let sx = 30 + i * sliceW;
    let bx = sx + (sliceW - barW) / 2;

    if (i < slicesEaten) {
      let mbVal = mbValues[i];
      let barTop = map(max(0, mbVal), 0, maxMB, zeroY, chartY);
      let barBot = mbVal >= 0 ? zeroY : map(mbVal, -4, 0, chartBottom, zeroY);

      if (mbVal >= 0) {
        fill(lerpColor(color('green'), color('gold'), map(i, 0, 5, 0, 1)));
        rect(bx, barTop, barW, zeroY - barTop, 2, 2, 0, 0);
      } else {
        fill('crimson');
        rect(bx, zeroY, barW, barBot - zeroY, 0, 0, 2, 2);
      }

      // Value label
      fill('black');
      textSize(10);
      textAlign(CENTER, BOTTOM);
      text(mbVal > 0 ? '+' + mbVal : mbVal, bx + barW / 2, mbVal >= 0 ? barTop - 2 : barBot + 12);
    } else {
      fill(230);
      let barTop = map(mbValues[i] >= 0 ? mbValues[i] : 0, 0, maxMB, zeroY, chartY);
      rect(bx, barTop, barW, zeroY - barTop, 2, 2, 0, 0);
    }
  }

  // Stats panel
  let statY = chartBottom + 20;
  noStroke();

  // Total satisfaction
  fill(total >= 0 ? 'green' : 'red');
  textSize(16);
  textAlign(CENTER, TOP);
  text('Total Satisfaction: ' + nf(total, 1, 1), canvasWidth / 2, statY);

  // Last slice benefit
  if (slicesEaten > 0) {
    fill(mb >= 0 ? 'darkgreen' : 'crimson');
    textSize(13);
    text('Last Slice Added: ' + (mb >= 0 ? '+' : '') + nf(mb, 1, 1) + ' satisfaction', canvasWidth / 2, statY + 22);
  }

  // Commentary
  textSize(12);
  fill('darkblue');
  let comment;
  if (slicesEaten === 0) comment = 'Click "Eat Another Slice" to start!';
  else if (slicesEaten === 1) comment = 'First slice is amazing when you\'re hungry!';
  else if (slicesEaten === 2) comment = 'Still great, but not quite as good as the first.';
  else if (slicesEaten === 3) comment = 'Good, but you\'re starting to feel satisfied.';
  else if (slicesEaten === 4) comment = 'Each slice is giving you less and less joy.';
  else if (slicesEaten === 5) comment = 'You\'re getting pretty full now...';
  else if (slicesEaten === 6) comment = 'Barely any benefit. Should you stop?';
  else if (slicesEaten === 7) comment = 'Negative benefit! You feel worse. 🤢';
  else comment = 'Way too much pizza. Total satisfaction is dropping!';
  text(comment, canvasWidth / 2, statY + 48);

  // Optimal stopping point
  if (slicesEaten >= 5) {
    fill('gray');
    textSize(10);
    text('Optimal: Stop when MB = MC (the cost of the next slice)', canvasWidth / 2, statY + 68);
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
