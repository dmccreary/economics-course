// Trade Balance Visualizer MicroSim
// Shows trade flows between US and partners, explains trade deficits
// MicroSim template version 2026.03

let canvasWidth = 580;
let drawHeight = 480;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 30;
let defaultTextSize = 16;

// Trade partner data (billions USD, approximate)
let partners = [
  { name: 'China', x: 0.75, y: 0.25, exports: 150, imports: 500, capital: 320,
    topExport: 'Soybeans, Aircraft', topImport: 'Electronics, Clothing' },
  { name: 'EU', x: 0.78, y: 0.18, exports: 350, imports: 500, capital: 140,
    topExport: 'Aircraft, Machinery', topImport: 'Vehicles, Pharma' },
  { name: 'Canada', x: 0.28, y: 0.18, exports: 320, imports: 380, capital: 50,
    topExport: 'Vehicles, Machinery', topImport: 'Oil, Vehicles' },
  { name: 'Mexico', x: 0.22, y: 0.42, exports: 280, imports: 420, capital: 90,
    topExport: 'Fuels, Machinery', topImport: 'Vehicles, Electronics' },
  { name: 'Japan', x: 0.85, y: 0.32, exports: 80, imports: 150, capital: 100,
    topExport: 'Aircraft, Pharma', topImport: 'Vehicles, Machinery' },
  { name: 'S. Korea', x: 0.82, y: 0.30, exports: 70, imports: 120, capital: 60,
    topExport: 'Machinery, Aircraft', topImport: 'Vehicles, Electronics' }
];

let selectedPartner = 0;
let showCapitalFlows = false;
let animOffset = 0;

// Controls
let partnerSelect, capitalBox, resetBtn;

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  partnerSelect = createSelect();
  for (let p of partners) partnerSelect.option(p.name);
  partnerSelect.changed(() => {
    selectedPartner = partners.findIndex(p => p.name === partnerSelect.value());
  });

  capitalBox = createCheckbox('Show Capital Flows', false);
  capitalBox.changed(() => { showCapitalFlows = capitalBox.checked(); });

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => {
    selectedPartner = 0;
    partnerSelect.value('China');
    capitalBox.checked(false);
    showCapitalFlows = false;
  });

  positionControls();
  describe('Trade balance visualizer showing US trade flows with partner countries', LABEL);
}

function positionControls() {
  let y = drawHeight + 15;
  partnerSelect.position(15, y);
  capitalBox.position(140, y);
  resetBtn.position(320, y);
}

function draw() {
  animOffset = (animOffset + 1) % 60;

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
  text('Trade Balance Visualizer', canvasWidth / 2, 8);

  let mapLeft = margin;
  let mapRight = canvasWidth - 220;
  let mapTop = 45;
  let mapBottom = drawHeight - 20;
  let mapW = mapRight - mapLeft;
  let mapH = mapBottom - mapTop;

  // Map background
  fill(220, 235, 250);
  noStroke();
  rect(mapLeft, mapTop, mapW, mapH, 5);

  // US position (center-left of map)
  let usX = mapLeft + mapW * 0.35;
  let usY = mapTop + mapH * 0.35;

  // Draw US
  fill('steelblue');
  noStroke();
  ellipse(usX, usY, 50, 35);
  fill('white');
  textSize(12);
  textAlign(CENTER, CENTER);
  text('US', usX, usY);

  let sp = partners[selectedPartner];

  // Draw all partners
  for (let i = 0; i < partners.length; i++) {
    let p = partners[i];
    let px = mapLeft + mapW * p.x;
    let py = mapTop + mapH * p.y;
    let isSelected = i === selectedPartner;

    // Partner circle
    fill(isSelected ? 'darkorange' : 'gray');
    noStroke();
    ellipse(px, py, isSelected ? 40 : 28, isSelected ? 28 : 20);
    fill('white');
    textSize(isSelected ? 11 : 9);
    textAlign(CENTER, CENTER);
    text(p.name, px, py);

    if (isSelected) {
      // Animated export arrows (blue, going out from US)
      drawAnimatedArrow(usX, usY, px, py, 'blue', p.exports, 'out');

      // Animated import arrows (red, coming in to US)
      drawAnimatedArrow(px, py, usX, usY, 'red', p.imports, 'in');

      // Capital flows (green, coming in)
      if (showCapitalFlows && p.capital > 0) {
        drawAnimatedArrow(px, py - 15, usX, usY - 15, 'green', p.capital, 'cap');
      }
    }
  }

  // Arrow legend below map
  let legY = mapBottom - 40;
  noStroke();
  textSize(10);
  textAlign(LEFT, CENTER);
  fill('blue');
  text('\u2192 US Exports ($' + sp.exports + 'B)', mapLeft + 10, legY);
  fill('red');
  text('\u2192 US Imports ($' + sp.imports + 'B)', mapLeft + 10, legY + 15);
  if (showCapitalFlows) {
    fill('green');
    text('\u2192 Capital Inflow ($' + sp.capital + 'B)', mapLeft + 10, legY + 30);
  }

  // Info panel (right side)
  let infoX = canvasWidth - 210;
  let infoY = mapTop + 5;
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('US \u2194 ' + sp.name, infoX, infoY);

  textSize(12);
  let ly = infoY + 28;
  fill('blue');
  text('Exports: $' + sp.exports + 'B', infoX, ly);
  text('  ' + sp.topExport, infoX, ly + 16);

  ly += 38;
  fill('red');
  text('Imports: $' + sp.imports + 'B', infoX, ly);
  text('  ' + sp.topImport, infoX, ly + 16);

  // Trade balance
  ly += 42;
  let balance = sp.exports - sp.imports;
  fill(balance >= 0 ? 'green' : 'red');
  textSize(14);
  text('Trade Balance:', infoX, ly);
  textSize(16);
  text((balance >= 0 ? '+' : '') + '$' + balance + 'B', infoX, ly + 20);
  textSize(11);
  text(balance >= 0 ? 'SURPLUS' : 'DEFICIT', infoX + 100, ly + 22);

  // Capital account
  if (showCapitalFlows) {
    ly += 50;
    fill('green');
    textSize(12);
    text('Capital Inflow: $' + sp.capital + 'B', infoX, ly);

    ly += 20;
    fill('black');
    textSize(11);
    text('Trade Deficit = Capital Surplus', infoX, ly);
    text('Dollars come back as investment.', infoX, ly + 16);
  }

  // Bar chart comparison
  ly = showCapitalFlows ? ly + 45 : ly + 55;
  drawBarComparison(infoX, ly, sp);

  // Key insights
  ly += 95;
  fill('black');
  textSize(12);
  text('KEY INSIGHTS:', infoX, ly);
  ly += 18;
  textSize(10);
  fill('gray');
  text('Trade deficit \u2260 "losing"', infoX, ly);
  ly += 14;
  text('Deficit means we buy more', infoX, ly);
  ly += 14;
  text('goods, they invest more here.', infoX, ly);
  ly += 14;
  text('Context matters most.', infoX, ly);

  // Control area instruction
  noStroke();
  fill('gray');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Select a trading partner to see trade flows', 380, drawHeight + 22);
}

function drawBarComparison(x, y, partner) {
  let maxVal = max(partner.exports, partner.imports);
  let barW = 150;
  let barH = 18;

  noStroke();
  fill('black');
  textSize(11);
  textAlign(LEFT, TOP);
  text('Exports vs Imports:', x, y);

  // Export bar
  let ew = (partner.exports / maxVal) * barW;
  fill('blue');
  rect(x, y + 18, ew, barH, 2);
  fill('white');
  textSize(10);
  textAlign(LEFT, CENTER);
  text('$' + partner.exports + 'B', x + 5, y + 18 + barH / 2);

  // Import bar
  let iw = (partner.imports / maxVal) * barW;
  fill('red');
  noStroke();
  rect(x, y + 42, iw, barH, 2);
  fill('white');
  textSize(10);
  text('$' + partner.imports + 'B', x + 5, y + 42 + barH / 2);

  // Labels
  noStroke();
  fill('blue');
  textSize(9);
  textAlign(RIGHT, CENTER);
  // place after bars
  fill('black');
  textAlign(LEFT, CENTER);
  text('Exports', x + barW + 5, y + 18 + barH / 2);
  text('Imports', x + barW + 5, y + 42 + barH / 2);
}

function drawAnimatedArrow(x1, y1, x2, y2, col, amount, type) {
  let maxAmount = 500;
  let weight = map(constrain(amount, 50, maxAmount), 50, maxAmount, 2, 6);

  stroke(col);
  strokeWeight(weight);

  // Draw line
  let dx = x2 - x1;
  let dy = y2 - y1;
  let len = sqrt(dx * dx + dy * dy);
  let nx = dx / len;
  let ny = dy / len;

  // Offset start/end to avoid overlap with circles
  let startX = x1 + nx * 25;
  let startY = y1 + ny * 18;
  let endX = x2 - nx * 25;
  let endY = y2 - ny * 18;

  line(startX, startY, endX, endY);

  // Arrowhead
  let angle = atan2(endY - startY, endX - startX);
  let sz = 8;
  line(endX, endY, endX - sz * cos(angle - PI / 6), endY - sz * sin(angle - PI / 6));
  line(endX, endY, endX - sz * cos(angle + PI / 6), endY - sz * sin(angle + PI / 6));

  // Animated dot
  let t = (animOffset % 30) / 30;
  let dotX = lerp(startX, endX, t);
  let dotY = lerp(startY, endY, t);
  noStroke();
  fill(col);
  ellipse(dotX, dotY, 8, 8);
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
