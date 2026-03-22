// Who's In the Labor Force? MicroSim
// Visual breakdown of population into labor force segments
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Population segments (millions, approximate US)
let segments = [
  { name: 'Employed', count: 158, color: 'green',
    inLF: true, desc: 'People currently working (full-time or part-time)',
    examples: 'Teachers, factory workers, programmers, nurses' },
  { name: 'Unemployed', count: 6, color: 'crimson',
    inLF: true, desc: 'Not working but actively seeking employment',
    examples: 'Laid-off workers sending resumes, recent graduates job hunting' },
  { name: 'Students', count: 20, color: 'steelblue',
    inLF: false, desc: 'Full-time students not seeking work',
    examples: 'College students, high school seniors' },
  { name: 'Retired', count: 50, color: 'darkorange',
    inLF: false, desc: 'Left the workforce, typically 65+',
    examples: 'Retirees collecting Social Security' },
  { name: 'Homemakers', count: 8, color: 'purple',
    inLF: false, desc: 'Stay-at-home parents or caregivers',
    examples: 'Stay-at-home parents, family caregivers' },
  { name: 'Discouraged', count: 5, color: 'brown',
    inLF: false, desc: 'Want work but stopped looking (not counted as unemployed!)',
    examples: 'Long-term unemployed who gave up searching' },
  { name: 'Other', count: 15, color: 'gray',
    inLF: false, desc: 'Disabled, institutionalized, or other non-participants',
    examples: 'People with disabilities, incarcerated individuals' }
];

let selectedSegment = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Labor force breakdown showing how the US population is divided into employed, unemployed, and not in labor force categories', LABEL);
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
  text("Who's In the Labor Force?", canvasWidth / 2, 8);
  textSize(11);
  fill('gray');
  text('Click any segment to learn more', canvasWidth / 2, 28);

  // Calculate totals
  let totalPop = segments.reduce((s, seg) => s + seg.count, 0);
  let laborForce = segments.filter(s => s.inLF).reduce((s, seg) => s + seg.count, 0);
  let employed = segments[0].count;
  let unemployed = segments[1].count;
  let unempRate = (unemployed / laborForce * 100);
  let lfParticRate = (laborForce / totalPop * 100);

  // Nested rectangle visualization
  let rectX = 20;
  let rectY = 50;
  let rectW = canvasWidth - 40;
  let rectH = 180;

  // Total population box
  fill(240);
  stroke('black');
  strokeWeight(1);
  rect(rectX, rectY, rectW, rectH, 5);
  noStroke();
  fill('black');
  textSize(10);
  textAlign(LEFT, TOP);
  text('Total Population: ' + totalPop + 'M', rectX + 5, rectY + 3);

  // Labor force box
  let lfW = (laborForce / totalPop) * rectW * 0.9;
  let lfX = rectX + 10;
  let lfY = rectY + 18;
  let lfH = rectH - 25;

  fill(230, 240, 255);
  stroke('steelblue');
  strokeWeight(1.5);
  rect(lfX, lfY, lfW, lfH, 3);
  noStroke();
  fill('steelblue');
  textSize(9);
  text('Labor Force: ' + laborForce + 'M', lfX + 3, lfY + 2);

  // Employed block
  let empW = (employed / laborForce) * (lfW - 10);
  let empX = lfX + 5;
  let empY = lfY + 15;
  let empH = lfH - 20;

  fill('green');
  noStroke();
  rect(empX, empY, empW, empH, 3);
  fill('white');
  textSize(11);
  textAlign(CENTER, CENTER);
  text('Employed', empX + empW / 2, empY + empH / 2 - 8);
  textSize(10);
  text(employed + 'M', empX + empW / 2, empY + empH / 2 + 8);

  // Unemployed block
  let unempW = (unemployed / laborForce) * (lfW - 10);
  let unempX = empX + empW + 3;

  fill('crimson');
  noStroke();
  rect(unempX, empY, max(25, unempW), empH, 3);
  fill('white');
  textSize(9);
  textAlign(CENTER, CENTER);
  text('Unemp.', unempX + max(25, unempW) / 2, empY + empH / 2 - 6);
  text(unemployed + 'M', unempX + max(25, unempW) / 2, empY + empH / 2 + 8);

  // Not in labor force sections (right side)
  let notLF = segments.filter(s => !s.inLF);
  let notLFtotal = notLF.reduce((s, seg) => s + seg.count, 0);
  let nlX = lfX + lfW + 10;
  let nlW = rectW - (lfW + 20);
  let nlY = lfY;

  noStroke();
  fill('gray');
  textSize(9);
  textAlign(LEFT, TOP);
  text('Not in Labor Force: ' + notLFtotal + 'M', nlX, nlY + 2);

  let yOff = nlY + 15;
  for (let seg of notLF) {
    let h = (seg.count / notLFtotal) * (lfH - 20);
    fill(seg.color);
    noStroke();
    rect(nlX, yOff, nlW, max(12, h), 2);

    if (h > 14) {
      fill('white');
      textSize(8);
      textAlign(CENTER, CENTER);
      text(seg.name + ' ' + seg.count + 'M', nlX + nlW / 2, yOff + h / 2);
    }
    yOff += max(12, h) + 2;
  }

  // Key statistics
  let statsY = rectY + rectH + 15;
  noStroke();
  textSize(13);
  textAlign(CENTER, TOP);

  // Stat cards
  let cardW = (canvasWidth - 50) / 3;
  let stats = [
    { label: 'Unemployment Rate', val: nf(unempRate, 1, 1) + '%',
      formula: unemployed + 'M / ' + laborForce + 'M', color: 'crimson' },
    { label: 'Participation Rate', val: nf(lfParticRate, 1, 1) + '%',
      formula: laborForce + 'M / ' + totalPop + 'M', color: 'steelblue' },
    { label: 'Employment Ratio', val: nf(employed / totalPop * 100, 1, 1) + '%',
      formula: employed + 'M / ' + totalPop + 'M', color: 'green' }
  ];

  for (let i = 0; i < stats.length; i++) {
    let sx = 15 + i * (cardW + 10);

    fill('white');
    stroke(stats[i].color);
    strokeWeight(1);
    rect(sx, statsY, cardW, 65, 5);

    noStroke();
    fill(stats[i].color);
    textSize(10);
    textAlign(CENTER, TOP);
    text(stats[i].label, sx + cardW / 2, statsY + 5);

    textSize(20);
    fill('black');
    text(stats[i].val, sx + cardW / 2, statsY + 20);

    textSize(8);
    fill('gray');
    text(stats[i].formula, sx + cardW / 2, statsY + 45);
  }

  // Detail panel
  if (selectedSegment >= 0) {
    let seg = segments[selectedSegment];
    let panelY = statsY + 75;

    fill(255, 255, 240);
    stroke(seg.color);
    strokeWeight(1);
    rect(15, panelY, canvasWidth - 30, 52, 5);

    noStroke();
    fill(seg.color);
    textSize(13);
    textAlign(LEFT, TOP);
    text(seg.name + ' (' + seg.count + 'M) — ' + (seg.inLF ? 'IN Labor Force' : 'NOT in Labor Force'), 25, panelY + 5);

    fill('black');
    textSize(10);
    text(seg.desc, 25, panelY + 22);
    fill('gray');
    text('Ex: ' + seg.examples, 25, panelY + 37);
  }

  // Key insight
  noStroke();
  fill('darkblue');
  textSize(10);
  textAlign(CENTER, TOP);
  text('Key: "Discouraged workers" are NOT counted as unemployed — this hides true joblessness', canvasWidth / 2, drawHeight - 18);

  // Instruction
  fill('gray');
  textSize(11);
  textAlign(CENTER, CENTER);
  text('Click segments in the diagram above for details', canvasWidth / 2, drawHeight + 25);
}

function mousePressed() {
  // Check which segment was clicked based on position
  let rectX = 20, rectY = 50, rectW = canvasWidth - 40, rectH = 180;

  // Simplified: check if in employed area
  if (mouseY > rectY && mouseY < rectY + rectH) {
    // Map click to segment based on x position
    let laborForce = segments.filter(s => s.inLF).reduce((s, seg) => s + seg.count, 0);
    let totalPop = segments.reduce((s, seg) => s + seg.count, 0);
    let lfW = (laborForce / totalPop) * rectW * 0.9;

    if (mouseX < rectX + 10 + lfW) {
      // In labor force area
      let empW = (segments[0].count / laborForce) * lfW;
      selectedSegment = mouseX < rectX + 15 + empW ? 0 : 1;
    } else {
      // Not in labor force area - pick based on y
      let notLF = segments.filter(s => !s.inLF);
      let idx = floor(map(mouseY, rectY + 20, rectY + rectH, 0, notLF.length));
      idx = constrain(idx, 0, notLF.length - 1);
      selectedSegment = segments.indexOf(notLF[idx]);
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
