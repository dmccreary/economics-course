// Globalization Impact Analyzer MicroSim
// See how globalization affects different groups differently
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

let globLevel = 50;
let globSlider;

// Stakeholder groups
let groups = [
  { name: 'Consumers', icon: '🛒', baseScore: 50, sensitivity: 0.4,
    desc: 'More choices, lower prices from global competition' },
  { name: 'Export Workers', icon: '📦', baseScore: 50, sensitivity: 0.35,
    desc: 'More demand for their products from global markets' },
  { name: 'Factory Workers', icon: '🏭', baseScore: 50, sensitivity: -0.3,
    desc: 'Face competition from lower-wage countries' },
  { name: 'Tech Workers', icon: '💻', baseScore: 50, sensitivity: 0.25,
    desc: 'Global demand for skills increases opportunities' },
  { name: 'Small Business', icon: '🏪', baseScore: 50, sensitivity: -0.15,
    desc: 'Compete with global corporations but access bigger markets' },
  { name: 'Overall GDP', icon: '📈', baseScore: 50, sensitivity: 0.3,
    desc: 'Total economic output generally increases with trade' }
];

let selectedGroup = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  globSlider = createSlider(0, 100, 50, 1);
  globSlider.position(160, drawHeight + 10);
  globSlider.size(canvasWidth - 160 - margin);

  describe('Globalization impact analyzer showing how increased trade affects different economic groups differently', LABEL);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  globLevel = globSlider.value();

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Globalization Impact Analyzer', canvasWidth / 2, 8);

  // Globalization level label
  let levelLabel;
  if (globLevel < 25) levelLabel = 'Low Globalization (Protectionist)';
  else if (globLevel < 50) levelLabel = 'Moderate Globalization';
  else if (globLevel < 75) levelLabel = 'High Globalization';
  else levelLabel = 'Maximum Globalization (Free Trade)';

  textSize(12);
  fill('gray');
  text(levelLabel, canvasWidth / 2, 28);

  // Impact bars for each group
  let barY = 55;
  let barH = 30;
  let barSpacing = 52;
  let barLeft = 120;
  let barRight = canvasWidth - 30;
  let barW = barRight - barLeft;
  let midX = barLeft + barW / 2;

  // Center line
  stroke(200);
  strokeWeight(1);
  line(midX, barY - 5, midX, barY + groups.length * barSpacing - 15);

  noStroke();
  fill('gray');
  textSize(9);
  textAlign(CENTER, BOTTOM);
  text('Worse Off', barLeft + barW * 0.25, barY - 2);
  text('Better Off', barLeft + barW * 0.75, barY - 2);
  text('Neutral', midX, barY - 2);

  for (let i = 0; i < groups.length; i++) {
    let g = groups[i];
    let by = barY + i * barSpacing;
    let impact = g.sensitivity * (globLevel - 50);
    let score = g.baseScore + impact;
    let isSelected = selectedGroup === i;

    // Group label
    noStroke();
    fill(isSelected ? 'darkblue' : 'black');
    textSize(11);
    textAlign(LEFT, CENTER);
    text(g.name, 10, by + barH / 2);

    // Bar background
    fill(240);
    noStroke();
    rect(barLeft, by, barW, barH, 3);

    // Impact bar from center
    let barPixels = map(impact, -25, 25, -barW / 2, barW / 2);
    if (barPixels >= 0) {
      fill(100, 180, 100);
      rect(midX, by, barPixels, barH, 0, 3, 3, 0);
    } else {
      fill(200, 100, 100);
      rect(midX + barPixels, by, -barPixels, barH, 3, 0, 0, 3);
    }

    // Score text
    fill('black');
    textSize(11);
    textAlign(CENTER, CENTER);
    let sign = impact >= 0 ? '+' : '';
    text(sign + nf(impact, 1, 0), barLeft + barW + 25, by + barH / 2);

    // Clickable indicator
    if (isSelected) {
      stroke('darkblue');
      strokeWeight(2);
      noFill();
      rect(barLeft - 2, by - 2, barW + 4, barH + 4, 4);
    }
  }

  // Detail panel
  if (selectedGroup >= 0) {
    let g = groups[selectedGroup];
    let impact = g.sensitivity * (globLevel - 50);
    let panelY = barY + groups.length * barSpacing + 5;

    fill(255, 255, 240);
    stroke('goldenrod');
    strokeWeight(1);
    rect(15, panelY, canvasWidth - 30, 55, 5);

    noStroke();
    fill('black');
    textSize(13);
    textAlign(LEFT, TOP);
    text(g.name, 25, panelY + 5);

    textSize(11);
    fill('gray');
    text(g.desc, 25, panelY + 22);

    fill(impact >= 0 ? 'green' : 'red');
    textSize(11);
    text('Impact: ' + (impact >= 0 ? 'Benefits' : 'Hurt') + ' by globalization', 25, panelY + 38);
  }

  // Key insight
  let insightY = drawHeight - 40;
  noStroke();
  fill('darkblue');
  textSize(12);
  textAlign(CENTER, TOP);

  let winners = groups.filter(g => g.sensitivity > 0).length;
  let losers = groups.filter(g => g.sensitivity < 0).length;
  text('Key: Globalization creates ' + winners + ' winner groups and ' + losers + ' loser groups.', canvasWidth / 2, insightY);
  textSize(11);
  fill('gray');
  text('Total GDP rises, but gains are not evenly shared.', canvasWidth / 2, insightY + 16);

  // Slider label
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Globalization: ' + globLevel + '%', 10, drawHeight + 20);
}

function mousePressed() {
  let barY = 55;
  let barSpacing = 52;
  let barH = 30;

  for (let i = 0; i < groups.length; i++) {
    let by = barY + i * barSpacing;
    if (mouseY >= by && mouseY <= by + barH && mouseX > 5 && mouseX < canvasWidth - 5) {
      selectedGroup = selectedGroup === i ? -1 : i;
      return;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  globSlider.size(canvasWidth - 160 - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
