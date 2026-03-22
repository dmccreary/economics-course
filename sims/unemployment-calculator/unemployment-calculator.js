// Unemployment Rate Calculator MicroSim
// Calculate unemployment rate from population components with visual gauge
// MicroSim template version 2026.03

let canvasWidth = 580;
let drawHeight = 460;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;
let sliderLeftMargin = 180;

// Default values (millions)
let employed = 158;
let unemployed = 7;
let notInLF = 95;

// Controls
let empSlider, unempSlider, nilfSlider;
let recessionBtn, recoveryBtn, resetBtn, showBroaderBox;

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  empSlider = createSlider(130, 170, 158, 1);
  unempSlider = createSlider(3, 25, 7, 1);
  nilfSlider = createSlider(80, 120, 95, 1);

  recessionBtn = createButton('Recession');
  recessionBtn.mousePressed(() => {
    empSlider.value(148);
    unempSlider.value(14);
    nilfSlider.value(100);
  });

  recoveryBtn = createButton('Recovery');
  recoveryBtn.mousePressed(() => {
    empSlider.value(160);
    unempSlider.value(6);
    nilfSlider.value(94);
  });

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => {
    empSlider.value(158);
    unempSlider.value(7);
    nilfSlider.value(95);
  });

  showBroaderBox = createCheckbox('Show Broader (U-6) Rate', false);

  positionControls();
  describe('Unemployment rate calculator showing how the rate is computed and its limitations', LABEL);
}

function positionControls() {
  let y1 = drawHeight + 8;
  let y2 = drawHeight + 32;
  let y3 = drawHeight + 56;
  let y4 = drawHeight + 80;
  empSlider.position(sliderLeftMargin, y1);
  empSlider.size(canvasWidth - sliderLeftMargin - 200);
  unempSlider.position(sliderLeftMargin, y2);
  unempSlider.size(canvasWidth - sliderLeftMargin - 200);
  nilfSlider.position(sliderLeftMargin, y3);
  nilfSlider.size(canvasWidth - sliderLeftMargin - 200);
  recessionBtn.position(canvasWidth - 190, y1);
  recoveryBtn.position(canvasWidth - 190, y2);
  resetBtn.position(canvasWidth - 190, y3);
  showBroaderBox.position(sliderLeftMargin, y4);
}

function draw() {
  employed = empSlider.value();
  unemployed = unempSlider.value();
  notInLF = nilfSlider.value();

  let laborForce = employed + unemployed;
  let totalPop = employed + unemployed + notInLF;
  let uRate = (unemployed / laborForce) * 100;
  let lfpr = (laborForce / totalPop) * 100;

  // Broader U-6 estimate (add discouraged + underemployed)
  let discouraged = round(notInLF * 0.02);
  let underemployed = round(employed * 0.03);
  let u6Rate = ((unemployed + discouraged + underemployed) / (laborForce + discouraged)) * 100;

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
  text('Unemployment Rate Calculator', canvasWidth / 2, 8);

  // Population diagram (left side)
  let boxX = margin;
  let boxY = 50;
  let boxW = 160;
  let boxH = 70;
  let boxGap = 15;

  // Employed box
  fill(100, 200, 100);
  stroke(80, 160, 80);
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 8);
  noStroke();
  fill('white');
  textSize(14);
  textAlign(CENTER, CENTER);
  text('Employed', boxX + boxW / 2, boxY + 22);
  textSize(20);
  text(employed + 'M', boxX + boxW / 2, boxY + 50);

  // Unemployed box
  let uy = boxY + boxH + boxGap;
  fill(255, 200, 50);
  stroke(200, 160, 40);
  strokeWeight(2);
  rect(boxX, uy, boxW, boxH, 8);
  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, CENTER);
  text('Unemployed', boxX + boxW / 2, uy + 22);
  textSize(20);
  text(unemployed + 'M', boxX + boxW / 2, uy + 50);

  // Not in Labor Force box
  let ny = uy + boxH + boxGap;
  fill(180, 180, 180);
  stroke(140, 140, 140);
  strokeWeight(2);
  rect(boxX, ny, boxW, boxH, 8);
  noStroke();
  fill('white');
  textSize(14);
  textAlign(CENTER, CENTER);
  text('Not in Labor Force', boxX + boxW / 2, ny + 22);
  textSize(20);
  text(notInLF + 'M', boxX + boxW / 2, ny + 50);

  // Arrow: Employed + Unemployed = Labor Force
  let arrowX = boxX + boxW + 15;
  stroke('black');
  strokeWeight(2);
  // Bracket from employed and unemployed boxes
  line(arrowX, boxY + boxH / 2, arrowX + 15, boxY + boxH / 2);
  line(arrowX, uy + boxH / 2, arrowX + 15, uy + boxH / 2);
  line(arrowX + 15, boxY + boxH / 2, arrowX + 15, uy + boxH / 2);
  line(arrowX + 15, (boxY + uy + boxH) / 2, arrowX + 30, (boxY + uy + boxH) / 2);

  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Labor Force', arrowX + 35, (boxY + uy + boxH) / 2 - 8);
  text('= ' + laborForce + 'M', arrowX + 35, (boxY + uy + boxH) / 2 + 8);

  // Gauge (right side)
  let gaugeX = canvasWidth - 220;
  let gaugeY = 80;
  let gaugeR = 85;

  // Gauge background
  noFill();
  strokeWeight(15);
  stroke(220);
  arc(gaugeX + gaugeR, gaugeY + gaugeR, gaugeR * 2 - 10, gaugeR * 2 - 10, PI, TWO_PI);

  // Gauge colored sections
  // 0-4%: green, 4-6%: yellow, 6-10%: orange, 10%+: red
  let sections = [
    { start: 0, end: 4, color: 'green' },
    { start: 4, end: 6, color: 'gold' },
    { start: 6, end: 10, color: 'orange' },
    { start: 10, end: 15, color: 'red' }
  ];

  for (let s of sections) {
    stroke(s.color);
    strokeWeight(15);
    let a1 = map(s.start, 0, 15, PI, TWO_PI);
    let a2 = map(s.end, 0, 15, PI, TWO_PI);
    arc(gaugeX + gaugeR, gaugeY + gaugeR, gaugeR * 2 - 10, gaugeR * 2 - 10, a1, a2);
  }

  // Needle
  let needleAngle = map(constrain(uRate, 0, 15), 0, 15, PI, TWO_PI);
  stroke('black');
  strokeWeight(3);
  let nx = gaugeX + gaugeR + cos(needleAngle) * (gaugeR - 20);
  let ny2 = gaugeY + gaugeR + sin(needleAngle) * (gaugeR - 20);
  line(gaugeX + gaugeR, gaugeY + gaugeR, nx, ny2);

  // Center dot
  fill('black');
  noStroke();
  ellipse(gaugeX + gaugeR, gaugeY + gaugeR, 10, 10);

  // Rate display
  fill('black');
  noStroke();
  textSize(24);
  textAlign(CENTER, TOP);
  text(nf(uRate, 0, 1) + '%', gaugeX + gaugeR, gaugeY + gaugeR + 10);
  textSize(12);
  text('Unemployment Rate (U-3)', gaugeX + gaugeR, gaugeY + gaugeR + 38);

  // Formula display
  let formY = ny + boxH + 25;
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, TOP);
  text('Formula:', margin, formY);

  textSize(12);
  fill('steelblue');
  text('Unemployment Rate = Unemployed / Labor Force x 100', margin, formY + 20);

  fill('black');
  text('= ' + unemployed + 'M / ' + laborForce + 'M x 100', margin, formY + 38);

  fill('steelblue');
  textSize(16);
  text('= ' + nf(uRate, 0, 1) + '%', margin, formY + 58);

  fill('gray');
  textSize(11);
  text('Labor Force Participation Rate: ' + nf(lfpr, 0, 1) + '%', margin, formY + 82);

  // Broader measure
  if (showBroaderBox.checked()) {
    let broaderY = gaugeY + gaugeR + 60;
    noStroke();
    fill('black');
    textSize(13);
    textAlign(LEFT, TOP);
    text('Broader (U-6) Rate:', gaugeX, broaderY);

    fill('darkorange');
    textSize(16);
    text(nf(u6Rate, 0, 1) + '%', gaugeX, broaderY + 20);

    fill('gray');
    textSize(10);
    text('Includes ' + discouraged + 'M discouraged workers', gaugeX, broaderY + 42);
    text('and ' + underemployed + 'M underemployed', gaugeX, broaderY + 56);

    // Critical thinking
    fill('darkred');
    textSize(11);
    text('Official rate: ' + nf(uRate, 0, 1) + '%', gaugeX, broaderY + 78);
    text('Broader rate: ' + nf(u6Rate, 0, 1) + '%', gaugeX, broaderY + 94);
  }

  // Critical thinking insight
  let insightY = drawHeight - 55;
  noStroke();
  fill('gray');
  textSize(11);
  textAlign(CENTER, TOP);
  text('Critical Thinking: If 2M discouraged workers start looking for jobs,', canvasWidth / 2, insightY);
  text('the unemployment rate INCREASES even though nothing bad happened!', canvasWidth / 2, insightY + 14);
  text('People leaving the labor force can make the rate look better.', canvasWidth / 2, insightY + 28);

  // Control labels
  noStroke();
  fill('black');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Employed: ' + employed + 'M', 10, drawHeight + 16);
  text('Unemployed: ' + unemployed + 'M', 10, drawHeight + 40);
  text('Not in LF: ' + notInLF + 'M', 10, drawHeight + 64);
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
