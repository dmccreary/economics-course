// Economic Systems Spectrum MicroSim
// Compare market, command, and mixed economies along a spectrum
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Countries positioned on spectrum (0=pure market, 100=pure command)
let countries = [
  { name: 'Hong Kong',     pos: 15, flag: '🇭🇰', color: 'steelblue' },
  { name: 'United States', pos: 28, flag: '🇺🇸', color: 'royalblue' },
  { name: 'Germany',       pos: 42, flag: '🇩🇪', color: 'goldenrod' },
  { name: 'Sweden',        pos: 55, flag: '🇸🇪', color: 'orange' },
  { name: 'China',         pos: 72, flag: '🇨🇳', color: 'crimson' },
  { name: 'Cuba',          pos: 88, flag: '🇨🇺', color: 'darkred' }
];

let selectedCountry = -1;

let details = {
  'Hong Kong': {
    system: 'Mostly Market',
    traits: ['Low taxes, minimal regulation', 'Free trade hub', 'Private property strong', 'Limited social safety net']
  },
  'United States': {
    system: 'Mixed (Market-leaning)',
    traits: ['Private enterprise dominant', 'Government regulates markets', 'Social Security, Medicare', 'Antitrust laws prevent monopolies']
  },
  'Germany': {
    system: 'Mixed (Social Market)',
    traits: ['Strong private sector', 'Universal healthcare', 'Worker protections (co-determination)', 'Robust social safety net']
  },
  'Sweden': {
    system: 'Mixed (Welfare State)',
    traits: ['Market economy with high taxes', 'Free education and healthcare', 'Strong labor unions', 'Generous parental leave']
  },
  'China': {
    system: 'Mixed (State-directed)',
    traits: ['State-owned enterprises in key sectors', 'Growing private sector', 'Central planning + market elements', 'Government controls land, banking']
  },
  'Cuba': {
    system: 'Mostly Command',
    traits: ['Government owns most businesses', 'Central planning of production', 'Rationing of consumer goods', 'Limited private enterprise']
  }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  describe('Economic systems spectrum comparing market, mixed, and command economies with real country examples', LABEL);
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
  text('Economic Systems Spectrum', canvasWidth / 2, 8);
  textSize(12);
  fill('gray');
  text('Click on a country to learn more', canvasWidth / 2, 30);

  // Spectrum bar
  let barX = 50;
  let barW = canvasWidth - 100;
  let barY = 75;
  let barH = 30;

  // Gradient bar
  for (let x = 0; x < barW; x++) {
    let t = x / barW;
    let r = lerp(50, 180, t);
    let g = lerp(100, 50, t);
    let b = lerp(200, 50, t);
    stroke(r, g, b);
    strokeWeight(1);
    line(barX + x, barY, barX + x, barY + barH);
  }

  // Bar border
  noFill();
  stroke('black');
  strokeWeight(1);
  rect(barX, barY, barW, barH, 3);

  // Labels
  noStroke();
  textSize(11);
  fill('steelblue');
  textAlign(LEFT, TOP);
  text('Pure Market', barX, barY + barH + 5);
  fill('gray');
  textAlign(CENTER, TOP);
  text('Mixed Economy', barX + barW / 2, barY + barH + 5);
  fill('darkred');
  textAlign(RIGHT, TOP);
  text('Pure Command', barX + barW, barY + barH + 5);

  // Country markers
  let markerY = barY + barH + 30;
  for (let i = 0; i < countries.length; i++) {
    let c = countries[i];
    let cx = barX + (c.pos / 100) * barW;
    let isSelected = selectedCountry === i;

    // Line from bar to marker
    stroke(c.color);
    strokeWeight(isSelected ? 2 : 1);
    line(cx, barY + barH, cx, markerY - 5);

    // Marker circle
    fill(isSelected ? c.color : 'white');
    stroke(c.color);
    strokeWeight(2);
    circle(cx, markerY + 8, isSelected ? 22 : 16);

    // Country name
    noStroke();
    fill('black');
    textSize(10);
    textAlign(CENTER, TOP);

    // Alternate above/below to avoid overlap
    let labelY = (i % 2 === 0) ? markerY + 22 : markerY - 15;
    text(c.name, cx, labelY);
  }

  // Characteristics comparison table
  let tableY = markerY + 50;
  let colW = (canvasWidth - 40) / 3;
  let headers = ['Market Economy', 'Mixed Economy', 'Command Economy'];
  let chars = [
    ['Private ownership', 'Both public & private', 'Government ownership'],
    ['Price signals guide', 'Markets + regulation', 'Central planning'],
    ['Consumer sovereignty', 'Consumer + gov influence', 'Government decides'],
    ['Profit motive drives', 'Profit + social goals', 'State goals drive'],
    ['Minimal government', 'Moderate government', 'Maximum government']
  ];

  // Headers
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  for (let j = 0; j < 3; j++) {
    fill(j === 0 ? 'steelblue' : j === 1 ? 'gray' : 'darkred');
    text(headers[j], 20 + colW * j + colW / 2, tableY);
  }

  // Table rows
  tableY += 20;
  textSize(10);
  for (let r = 0; r < chars.length; r++) {
    // Alternating background
    if (r % 2 === 0) {
      fill(240, 245, 255);
      noStroke();
      rect(15, tableY + r * 22 - 2, canvasWidth - 30, 22);
    }
    for (let c = 0; c < 3; c++) {
      fill('black');
      noStroke();
      textAlign(CENTER, TOP);
      text(chars[r][c], 20 + colW * c + colW / 2, tableY + r * 22);
    }
  }

  // Selected country detail panel
  if (selectedCountry >= 0) {
    let c = countries[selectedCountry];
    let d = details[c.name];
    let panelY = tableY + chars.length * 22 + 20;
    let panelH = 100;

    fill(255, 255, 240);
    stroke(c.color);
    strokeWeight(2);
    rect(20, panelY, canvasWidth - 40, panelH, 8);

    noStroke();
    fill(c.color);
    textSize(14);
    textAlign(LEFT, TOP);
    text(c.name + ' — ' + d.system, 30, panelY + 8);

    fill('black');
    textSize(11);
    for (let i = 0; i < d.traits.length; i++) {
      text('• ' + d.traits[i], 30, panelY + 28 + i * 16);
    }
  }

  // Instruction
  noStroke();
  fill('gray');
  textSize(11);
  textAlign(CENTER, CENTER);
  text('Click on any country marker to see details', canvasWidth / 2, drawHeight + 25);
}

function mousePressed() {
  let barX = 50;
  let barW = canvasWidth - 100;
  let markerY = 75 + 30 + 30;

  for (let i = 0; i < countries.length; i++) {
    let cx = barX + (countries[i].pos / 100) * barW;
    if (dist(mouseX, mouseY, cx, markerY + 8) < 15) {
      selectedCountry = selectedCountry === i ? -1 : i;
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
