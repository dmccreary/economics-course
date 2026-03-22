// Recession Indicators Dashboard MicroSim
// Multiple economic indicators with color-coded warning levels

let canvasWidth = 400;
let drawHeight = 480;
let controlHeight = 55;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

let yearSlider;
let presetBtns = [];
let animating = false;
let animYear = 0;

// Historical-style data (simplified, year -> values)
let data = {};

function initData() {
  // GDP growth, unemployment, confidence (0-100), retail growth, industrial growth, leading index
  let years = [];
  for (let y = 2000; y <= 2024; y++) years.push(y);

  years.forEach(y => {
    let d = {};
    // Base expansion values
    d.gdp = 2.5 + random(-0.5, 0.5);
    d.unemp = 5.0 + random(-0.3, 0.3);
    d.confidence = 70 + random(-5, 5);
    d.retail = 3.0 + random(-0.5, 0.5);
    d.industrial = 2.0 + random(-0.5, 0.5);
    d.leading = 0.5 + random(-0.2, 0.2);

    // 2001 recession
    if (y === 2001) { d.gdp = 0.5; d.unemp = 5.5; d.confidence = 50; d.retail = 0.5; d.industrial = -2; d.leading = -0.3; }
    if (y === 2002) { d.gdp = 1.0; d.unemp = 6.0; d.confidence = 55; d.retail = 1.5; d.industrial = -0.5; d.leading = 0.1; }

    // 2008 crisis
    if (y === 2007) { d.gdp = 1.8; d.unemp = 4.6; d.confidence = 60; d.retail = 1.0; d.industrial = 0.5; d.leading = -0.4; }
    if (y === 2008) { d.gdp = -2.5; d.unemp = 7.3; d.confidence = 30; d.retail = -5.0; d.industrial = -8; d.leading = -1.5; }
    if (y === 2009) { d.gdp = -2.8; d.unemp = 9.9; d.confidence = 25; d.retail = -7.0; d.industrial = -10; d.leading = -0.8; }
    if (y === 2010) { d.gdp = 2.5; d.unemp = 9.6; d.confidence = 40; d.retail = 2.0; d.industrial = 3; d.leading = 0.5; }
    if (y === 2011) { d.gdp = 1.6; d.unemp = 8.9; d.confidence = 50; d.retail = 4.0; d.industrial = 2.5; d.leading = 0.3; }

    // 2010s expansion
    if (y >= 2013 && y <= 2019) {
      d.gdp = 2.2 + random(0, 1);
      d.unemp = max(3.5, 7.5 - (y - 2012) * 0.6 + random(-0.2, 0.2));
      d.confidence = 65 + (y - 2013) * 3 + random(-3, 3);
      d.retail = 3.5 + random(-0.5, 0.5);
      d.industrial = 1.5 + random(-0.5, 0.5);
      d.leading = 0.4 + random(-0.1, 0.1);
    }

    // 2020 COVID
    if (y === 2020) { d.gdp = -9.0; d.unemp = 14.7; d.confidence = 15; d.retail = -12; d.industrial = -15; d.leading = -2.0; }
    if (y === 2021) { d.gdp = 5.7; d.unemp = 5.4; d.confidence = 55; d.retail = 8.0; d.industrial = 5; d.leading = 1.0; }
    if (y === 2022) { d.gdp = 2.1; d.unemp = 3.6; d.confidence = 60; d.retail = 3.0; d.industrial = 2; d.leading = 0.2; }
    if (y === 2023) { d.gdp = 2.5; d.unemp = 3.7; d.confidence = 65; d.retail = 2.5; d.industrial = 1; d.leading = 0.3; }
    if (y === 2024) { d.gdp = 2.3; d.unemp = 4.0; d.confidence = 62; d.retail = 2.0; d.industrial = 0.5; d.leading = 0.2; }

    data[y] = d;
  });
}

function getStatus(d) {
  let score = 0;
  if (d.gdp < 0) score += 2; else if (d.gdp < 1) score += 1;
  if (d.unemp > 8) score += 2; else if (d.unemp > 6) score += 1;
  if (d.confidence < 30) score += 2; else if (d.confidence < 50) score += 1;
  if (d.retail < -2) score += 2; else if (d.retail < 0) score += 1;
  if (d.industrial < -3) score += 2; else if (d.industrial < 0) score += 1;
  if (d.leading < -0.5) score += 2; else if (d.leading < 0) score += 1;

  if (score >= 8) return { label: 'Recession', color: 'red' };
  if (score >= 4) return { label: 'Warning Signs', color: 'orange' };
  if (score >= 2) return { label: 'Recovery', color: 'gold' };
  return { label: 'Expansion', color: 'green' };
}

function indicatorColor(val, goodAbove, warnAbove) {
  if (goodAbove) {
    if (val >= warnAbove) return 'green';
    if (val >= (warnAbove * 0.5)) return 'orange';
    return 'red';
  } else {
    if (val <= warnAbove) return 'green';
    if (val <= warnAbove * 1.5) return 'orange';
    return 'red';
  }
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  randomSeed(42);
  initData();

  yearSlider = createSlider(2000, 2024, 2019, 1);

  let presets = [
    { label: '2008 Crisis', year: 2008 },
    { label: 'COVID 2020', year: 2020 },
    { label: 'Expansion', year: 2017 },
    { label: '2024', year: 2024 }
  ];

  presets.forEach(p => {
    let btn = createButton(p.label);
    btn.mousePressed(() => yearSlider.value(p.year));
    presetBtns.push(btn);
  });

  positionControls();
  describe('Recession indicators dashboard showing GDP unemployment confidence retail industrial and leading indicators', LABEL);
}

function positionControls() {
  let y = drawHeight + 12;
  yearSlider.position(55, y);
  yearSlider.size(canvasWidth / 2 - 70);
  let bx = canvasWidth / 2;
  presetBtns.forEach((btn, i) => {
    btn.position(bx + i * 80, y - 2);
  });
}

function draw() {
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let year = yearSlider.value();
  let d = data[year];
  let status = getStatus(d);

  // Title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(20);
  text('Recession Indicators Dashboard', canvasWidth / 2, 6);

  // Overall status
  textSize(14);
  fill(status.color);
  textAlign(CENTER, TOP);
  text('Economy: ' + status.label + '  (' + year + ')', canvasWidth / 2, 30);

  // Mini panels - 3 columns x 2 rows
  let panelW = (canvasWidth - 40) / 3;
  let panelH = 130;
  let startY = 55;
  let startX = 15;

  let indicators = [
    { name: 'Real GDP Growth', value: d.gdp, unit: '%', good: true, warn: 2 },
    { name: 'Unemployment', value: d.unemp, unit: '%', good: false, warn: 5 },
    { name: 'Consumer Confidence', value: d.confidence, unit: '/100', good: true, warn: 60 },
    { name: 'Retail Sales Growth', value: d.retail, unit: '%', good: true, warn: 2 },
    { name: 'Industrial Prod.', value: d.industrial, unit: '%', good: true, warn: 1 },
    { name: 'Leading Index', value: d.leading, unit: '', good: true, warn: 0.3 }
  ];

  for (let i = 0; i < indicators.length; i++) {
    let col = i % 3;
    let row = floor(i / 3);
    let px = startX + col * (panelW + 5);
    let py = startY + row * (panelH + 10);
    drawIndicatorPanel(px, py, panelW, panelH, indicators[i], year);
  }

  // Timeline mini-chart at bottom
  let tlY = startY + 2 * (panelH + 10) + 10;
  let tlH = drawHeight - tlY - 10;
  drawTimeline(startX, tlY, canvasWidth - 30, tlH, year);

  // Control label
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Year:', 10, drawHeight + 20);
}

function drawIndicatorPanel(x, y, w, h, ind, currentYear) {
  let c;
  if (ind.good) {
    c = ind.value >= ind.warn ? 'green' : ind.value >= 0 ? 'orange' : 'red';
  } else {
    c = ind.value <= ind.warn ? 'green' : ind.value <= ind.warn * 1.5 ? 'orange' : 'red';
  }

  // Panel background
  fill(255, 255, 255, 200);
  stroke(c);
  strokeWeight(2);
  rect(x, y, w, h, 5);

  // Status dot
  fill(c);
  noStroke();
  circle(x + w - 12, y + 12, 10);

  // Title
  fill('black');
  noStroke();
  textSize(10);
  textAlign(LEFT, TOP);
  text(ind.name, x + 6, y + 5);

  // Big value
  fill(c);
  textSize(22);
  textAlign(CENTER, CENTER);
  text(nf(ind.value, 1, 1) + ind.unit, x + w / 2, y + 40);

  // Mini sparkline (last 10 years)
  let slX = x + 8;
  let slW = w - 16;
  let slY = y + 65;
  let slH = h - 75;

  stroke('lightgray');
  strokeWeight(0.5);
  line(slX, slY + slH / 2, slX + slW, slY + slH / 2);

  stroke(c);
  strokeWeight(1.5);
  noFill();
  beginShape();
  let startYr = max(2000, currentYear - 9);
  for (let yr = startYr; yr <= currentYear; yr++) {
    let d = data[yr];
    let val;
    if (ind.name === 'Real GDP Growth') val = d.gdp;
    else if (ind.name === 'Unemployment') val = d.unemp;
    else if (ind.name === 'Consumer Confidence') val = d.confidence;
    else if (ind.name === 'Retail Sales Growth') val = d.retail;
    else if (ind.name === 'Industrial Prod.') val = d.industrial;
    else val = d.leading;

    let px = map(yr, startYr, currentYear, slX, slX + slW);
    let minV, maxV;
    if (ind.name === 'Consumer Confidence') { minV = 10; maxV = 100; }
    else if (ind.name === 'Unemployment') { minV = 2; maxV = 16; }
    else if (ind.name === 'Leading Index') { minV = -2.5; maxV = 1.5; }
    else { minV = -15; maxV = 10; }
    let py = map(val, minV, maxV, slY + slH, slY);
    vertex(px, py);
  }
  endShape();
}

function drawTimeline(x, y, w, h, currentYear) {
  noStroke();
  fill('black');
  textSize(11);
  textAlign(LEFT, TOP);
  text('GDP Growth Timeline (2000-2024)', x, y);

  let tlTop = y + 15;
  let tlBottom = y + h;
  let tlLeft = x + 30;
  let tlRight = x + w;

  // Zero line
  let zeroY = map(0, -10, 6, tlBottom, tlTop);
  stroke('gray');
  strokeWeight(0.5);
  line(tlLeft, zeroY, tlRight, zeroY);

  // Bars for each year
  let barW = (tlRight - tlLeft) / 25;
  for (let yr = 2000; yr <= 2024; yr++) {
    let bx = tlLeft + (yr - 2000) * barW;
    let gdp = data[yr].gdp;
    let barH = map(abs(gdp), 0, 10, 0, (tlBottom - tlTop) / 2);
    let by = gdp >= 0 ? zeroY - barH : zeroY;

    fill(yr === currentYear ? 'steelblue' : gdp >= 0 ? 'mediumseagreen' : 'coral');
    noStroke();
    rect(bx + 1, by, barW - 2, barH, 1);

    // Year labels every 5 years
    if (yr % 5 === 0) {
      fill('gray');
      textSize(8);
      textAlign(CENTER, TOP);
      noStroke();
      text(yr, bx + barW / 2, tlBottom + 1);
    }
  }

  // Highlight current year
  let cx = tlLeft + (currentYear - 2000) * barW;
  stroke('steelblue');
  strokeWeight(1);
  drawingContext.setLineDash([2, 2]);
  line(cx + barW / 2, tlTop, cx + barW / 2, tlBottom);
  drawingContext.setLineDash([]);
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
