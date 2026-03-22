// Supply Shifters Interactive Map MicroSim
// ROTTEN factors that shift the supply curve left or right
// MicroSim template version 2026.03

let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// ROTTEN supply shifters
let shifters = [
  { name: 'Resource Prices', letter: 'R', color: 'steelblue',
    increase: 'Input costs fall', decrease: 'Input costs rise',
    incDir: 1, decDir: -1,
    incDesc: 'Cheaper inputs → produce more at each price → supply shifts RIGHT',
    decDesc: 'Costly inputs → produce less at each price → supply shifts LEFT' },
  { name: 'Other Goods', letter: 'O', color: 'green',
    increase: 'Alternative less profitable', decrease: 'Alternative more profitable',
    incDir: 1, decDir: -1,
    incDesc: 'Less profit elsewhere → firms produce more here → supply RIGHT',
    decDesc: 'More profit elsewhere → firms switch production → supply LEFT' },
  { name: 'Technology', letter: 'T', color: 'darkorange',
    increase: 'New technology discovered', decrease: 'Technology breakdown',
    incDir: 1, decDir: -1,
    incDesc: 'Better tech → produce more efficiently → supply shifts RIGHT',
    decDesc: 'Tech failure → less efficient production → supply shifts LEFT' },
  { name: 'Taxes/Subsidies', letter: 'T', color: 'purple',
    increase: 'Government subsidy', decrease: 'New tax imposed',
    incDir: 1, decDir: -1,
    incDesc: 'Subsidy lowers costs → willing to supply more → supply RIGHT',
    decDesc: 'Tax raises costs → willing to supply less → supply LEFT' },
  { name: 'Expectations', letter: 'E', color: 'crimson',
    increase: 'Expect lower future prices', decrease: 'Expect higher future prices',
    incDir: 1, decDir: -1,
    incDesc: 'Sell now before prices drop → supply increases NOW → RIGHT',
    decDesc: 'Hold inventory for higher prices → supply decreases NOW → LEFT' },
  { name: 'Number of Sellers', letter: 'N', color: 'teal',
    increase: 'New firms enter market', decrease: 'Firms exit market',
    incDir: 1, decDir: -1,
    incDesc: 'More sellers → more total production → supply shifts RIGHT',
    decDesc: 'Fewer sellers → less total production → supply shifts LEFT' }
];

let selectedShifter = -1;
let directionMode = 'increase'; // 'increase' or 'decrease'
let shiftAmount = 0;
let targetShift = 0;
let resetBtn;
let dirSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => {
    targetShift = 0;
    selectedShifter = -1;
  });

  dirSelect = createSelect();
  dirSelect.option('Increase Supply');
  dirSelect.option('Decrease Supply');
  dirSelect.changed(() => {
    directionMode = dirSelect.value() === 'Increase Supply' ? 'increase' : 'decrease';
    if (selectedShifter >= 0) {
      let s = shifters[selectedShifter];
      targetShift = (directionMode === 'increase' ? s.incDir : s.decDir) * 40;
    }
  });

  positionControls();
  describe('Supply shifters interactive showing ROTTEN factors that shift the supply curve left or right', LABEL);
}

function positionControls() {
  resetBtn.position(10, drawHeight + 12);
  dirSelect.position(80, drawHeight + 12);
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
  text('Supply Shifters: The ROTTEN Factors', canvasWidth / 2, 8);

  // Graph area
  let gLeft = 70;
  let gRight = canvasWidth - 180;
  let gTop = 60;
  let gBottom = drawHeight - 40;

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

  // Original supply curve (dashed if shifted)
  if (abs(shiftAmount) > 2) {
    stroke(180);
    strokeWeight(1.5);
    drawingContext.setLineDash([5, 5]);
    drawSupplyCurve(gLeft, gRight, gTop, gBottom, 0);
    drawingContext.setLineDash([]);

    noStroke();
    fill(180);
    textSize(10);
    textAlign(LEFT, CENTER);
    text('S\u2081', gRight - 5, gTop + 15);
  }

  // Current (shifted) supply curve
  stroke('orange');
  strokeWeight(3);
  drawSupplyCurve(gLeft, gRight, gTop, gBottom, shiftAmount);

  // Label
  noStroke();
  fill('orange');
  textSize(13);
  textAlign(LEFT, CENTER);
  let labelSuffix = abs(shiftAmount) > 2 ? '\u2082' : '';
  text('S' + labelSuffix, gRight + shiftAmount * 0.8 - 5, gTop + 15);

  // Shift arrow
  if (abs(shiftAmount) > 5) {
    let arrowY = (gTop + gBottom) / 2;
    let arrowX = (gLeft + gRight) / 2;
    stroke(shiftAmount > 0 ? 'green' : 'red');
    strokeWeight(3);
    let dir = shiftAmount > 0 ? 1 : -1;
    line(arrowX - dir * 30, arrowY, arrowX + dir * 30, arrowY);
    line(arrowX + dir * 30, arrowY, arrowX + dir * 20, arrowY - 8);
    line(arrowX + dir * 30, arrowY, arrowX + dir * 20, arrowY + 8);

    noStroke();
    fill(shiftAmount > 0 ? 'green' : 'red');
    textSize(11);
    textAlign(CENTER, BOTTOM);
    text(shiftAmount > 0 ? 'SHIFT RIGHT' : 'SHIFT LEFT', arrowX, arrowY - 10);
  }

  // ROTTEN factor cards (right panel)
  let cardX = canvasWidth - 165;
  let cardW = 155;
  let cardH = 48;
  let cardStartY = 50;

  for (let i = 0; i < shifters.length; i++) {
    let s = shifters[i];
    let cy = cardStartY + i * (cardH + 6);
    let isSelected = selectedShifter === i;

    fill(isSelected ? s.color : 'white');
    stroke(s.color);
    strokeWeight(isSelected ? 2 : 1);
    rect(cardX, cy, cardW, cardH, 5);

    fill(isSelected ? 'white' : s.color);
    noStroke();
    textSize(16);
    textAlign(LEFT, TOP);
    text(s.letter, cardX + 8, cy + 5);

    fill(isSelected ? 'white' : 'black');
    textSize(11);
    text(s.name, cardX + 26, cy + 7);

    // Show context example
    textSize(9);
    fill(isSelected ? 'rgba(255,255,255,0.8)' : 'gray');
    let example = directionMode === 'increase' ? s.increase : s.decrease;
    text(example, cardX + 8, cy + 26);

    fill(isSelected ? 'white' : s.color);
    textSize(12);
    textAlign(RIGHT, CENTER);
    let arrow = directionMode === 'increase' ? '\u2192' : '\u2190';
    text(arrow, cardX + cardW - 8, cy + cardH / 2);
  }

  // Explanation panel
  if (selectedShifter >= 0) {
    let s = shifters[selectedShifter];
    let expY = drawHeight - 35;
    noStroke();
    fill(s.color);
    textSize(12);
    textAlign(LEFT, CENTER);
    let desc = directionMode === 'increase' ? s.incDesc : s.decDesc;
    text(desc, gLeft, expY);

    fill('black');
    textSize(11);
    text('Before: At $15, supply was 60. After: At $15, supply is ' +
      round(60 + shiftAmount * 0.8), gLeft, expY + 18);
  }

  // Instruction
  noStroke();
  fill('gray');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Click a ROTTEN factor to shift the supply curve', 240, drawHeight + 28);
}

function drawSupplyCurve(gl, gr, gt, gb, shift) {
  noFill();
  beginShape();
  for (let t = 0; t <= 1; t += 0.02) {
    let x = lerp(gl + 10 + shift, gr - 10 + shift, t);
    let y = lerp(gb - 10, gt + 10, t); // supply goes up-right
    y += sin(t * PI) * 12;
    vertex(x, y);
  }
  endShape();
}

function mousePressed() {
  let cardX = canvasWidth - 165;
  let cardW = 155;
  let cardH = 48;
  let cardStartY = 50;

  for (let i = 0; i < shifters.length; i++) {
    let cy = cardStartY + i * (cardH + 6);
    if (mouseX >= cardX && mouseX <= cardX + cardW && mouseY >= cy && mouseY <= cy + cardH) {
      if (selectedShifter === i) {
        selectedShifter = -1;
        targetShift = 0;
      } else {
        selectedShifter = i;
        let s = shifters[i];
        targetShift = (directionMode === 'increase' ? s.incDir : s.decDir) * 40;
      }
      return;
    }
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
