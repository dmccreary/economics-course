// Demand Shifters Cause-Effect Map MicroSim
// TRIBE factors that shift vs move along the demand curve
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// TRIBE demand shifters
let shifters = [
  { name: 'Tastes/Preferences', letter: 'T', color: 'steelblue',
    example: 'Coffee becomes trendy on TikTok',
    direction: 1, desc: 'Increased preference shifts demand RIGHT' },
  { name: 'Related Goods', letter: 'R', color: 'green',
    example: 'Price of tea (substitute) doubles',
    direction: 1, desc: 'Substitute price up → demand for coffee RIGHT' },
  { name: 'Income', letter: 'I', color: 'darkorange',
    example: 'Consumers get a raise',
    direction: 1, desc: 'Higher income shifts demand RIGHT (normal good)' },
  { name: 'Buyers (# of)', letter: 'B', color: 'purple',
    example: 'New college opens nearby',
    direction: 1, desc: 'More buyers shifts demand RIGHT' },
  { name: 'Expectations', letter: 'E', color: 'crimson',
    example: 'Coffee prices expected to rise next month',
    direction: 1, desc: 'Expect higher future price → buy more NOW (RIGHT)' }
];

let selectedShifter = -1;
let shiftAmount = 0;
let targetShift = 0;
let resetBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  resetBtn = createButton('Reset Curve');
  resetBtn.position(10, drawHeight + 10);
  resetBtn.mousePressed(() => {
    targetShift = 0;
    selectedShifter = -1;
  });

  describe('Demand shifters interactive showing TRIBE factors that shift the demand curve left or right', LABEL);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Animate shift
  shiftAmount = lerp(shiftAmount, targetShift, 0.08);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Demand Shifters: The TRIBE Factors', canvasWidth / 2, 8);

  // Graph area
  let gLeft = 70;
  let gRight = canvasWidth - 180;
  let gTop = 60;
  let gBottom = drawHeight - 40;
  let gw = gRight - gLeft;
  let gh = gBottom - gTop;
  let maxP = 10;
  let maxQ = 120;

  // Axes
  stroke('black');
  strokeWeight(2);
  line(gLeft, gTop, gLeft, gBottom);
  line(gLeft, gBottom, gRight, gBottom);

  noStroke();
  fill('black');
  textSize(12);
  textAlign(CENTER, TOP);
  text('Quantity', (gLeft + gRight) / 2, gBottom + 5);
  push();
  translate(25, (gTop + gBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Price', 0, 0);
  pop();

  // Original demand curve (dashed if shifted)
  if (abs(shiftAmount) > 2) {
    stroke(180);
    strokeWeight(1.5);
    drawingContext.setLineDash([5, 5]);
    drawDemandCurve(gLeft, gRight, gTop, gBottom, 0);
    drawingContext.setLineDash([]);

    noStroke();
    fill(180);
    textSize(10);
    textAlign(LEFT, CENTER);
    text('D₁', gRight - 5, gBottom - 15);
  }

  // Current (shifted) demand curve
  stroke('steelblue');
  strokeWeight(3);
  drawDemandCurve(gLeft, gRight, gTop, gBottom, shiftAmount);

  // Label
  noStroke();
  fill('steelblue');
  textSize(13);
  textAlign(LEFT, CENTER);
  let labelSuffix = abs(shiftAmount) > 2 ? '₂' : '';
  text('D' + labelSuffix, gRight + shiftAmount * 0.8 - 5, gBottom - 15);

  // Shift arrow
  if (abs(shiftAmount) > 5) {
    let arrowY = (gTop + gBottom) / 2;
    let arrowX = (gLeft + gRight) / 2;
    stroke(shiftAmount > 0 ? 'green' : 'red');
    strokeWeight(3);
    let dir = shiftAmount > 0 ? 1 : -1;
    line(arrowX - dir * 30, arrowY, arrowX + dir * 30, arrowY);
    // Arrowhead
    line(arrowX + dir * 30, arrowY, arrowX + dir * 20, arrowY - 8);
    line(arrowX + dir * 30, arrowY, arrowX + dir * 20, arrowY + 8);

    noStroke();
    fill(shiftAmount > 0 ? 'green' : 'red');
    textSize(11);
    textAlign(CENTER, BOTTOM);
    text(shiftAmount > 0 ? 'SHIFT RIGHT' : 'SHIFT LEFT', arrowX, arrowY - 10);
  }

  // TRIBE factor cards (right panel)
  let cardX = canvasWidth - 165;
  let cardW = 155;
  let cardH = 55;
  let cardStartY = 55;

  for (let i = 0; i < shifters.length; i++) {
    let s = shifters[i];
    let cy = cardStartY + i * (cardH + 8);
    let isSelected = selectedShifter === i;

    // Card background
    fill(isSelected ? s.color : 'white');
    stroke(s.color);
    strokeWeight(isSelected ? 2 : 1);
    rect(cardX, cy, cardW, cardH, 5);

    // Letter badge
    fill(isSelected ? 'white' : s.color);
    noStroke();
    textSize(18);
    textAlign(LEFT, TOP);
    text(s.letter, cardX + 8, cy + 5);

    // Name
    fill(isSelected ? 'white' : 'black');
    textSize(11);
    text(s.name, cardX + 28, cy + 8);

    // Example
    textSize(9);
    fill(isSelected ? 'rgba(255,255,255,0.8)' : 'gray');
    text(s.example, cardX + 8, cy + 28);

    // Direction arrow
    fill(isSelected ? 'white' : s.color);
    textSize(12);
    textAlign(RIGHT, CENTER);
    text('→', cardX + cardW - 8, cy + cardH / 2);
  }

  // Explanation panel at bottom
  if (selectedShifter >= 0) {
    let s = shifters[selectedShifter];
    let expY = drawHeight - 35;
    noStroke();
    fill(s.color);
    textSize(12);
    textAlign(LEFT, CENTER);
    text(s.desc, gLeft, expY);

    // Comparison text
    fill('black');
    textSize(11);
    text('Before: At $5, demand was 60. After: At $5, demand is ' +
      round(60 + shiftAmount * 0.8), gLeft, expY + 18);
  }

  // Instruction
  noStroke();
  fill('gray');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Click a TRIBE factor to shift the curve →', 100, drawHeight + 20);
}

function drawDemandCurve(gl, gr, gt, gb, shift) {
  noFill();
  beginShape();
  for (let t = 0; t <= 1; t += 0.02) {
    let x = lerp(gl + 10 + shift, gr - 10 + shift, t);
    let y = lerp(gt + 10, gb - 10, t);
    y -= sin(t * PI) * 12;
    vertex(x, y);
  }
  endShape();
}

function mousePressed() {
  // Check TRIBE card clicks
  let cardX = canvasWidth - 165;
  let cardW = 155;
  let cardH = 55;
  let cardStartY = 55;

  for (let i = 0; i < shifters.length; i++) {
    let cy = cardStartY + i * (cardH + 8);
    if (mouseX >= cardX && mouseX <= cardX + cardW && mouseY >= cy && mouseY <= cy + cardH) {
      if (selectedShifter === i) {
        // Toggle off
        selectedShifter = -1;
        targetShift = 0;
      } else {
        selectedShifter = i;
        targetShift = shifters[i].direction * 40;
      }
      return;
    }
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
