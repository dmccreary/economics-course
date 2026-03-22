// Phillips Curve Explorer MicroSim
// Interactive Phillips curve showing unemployment vs inflation relationship
// with historical data points color-coded by decade
// MicroSim template version 2026.03

let canvasWidth = 400;
let drawHeight = 480;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;
let sliderLeftMargin = 140;

// Controls
let decadeSelect;
let showAllCheck;
let showNaturalCheck;
let showExpectationsCheck;
let policySlider;
let animateButton;

// Animation state
let animating = false;
let animDecadeIndex = 0;
let animTimer = 0;

// Historical data points: [unemployment, inflation, year]
let data1960s = [
  [5.5, 1.0, 1960], [6.7, 1.0, 1961], [5.5, 1.0, 1962],
  [5.7, 1.3, 1963], [5.2, 1.3, 1964], [4.5, 1.6, 1965],
  [3.8, 2.9, 1966], [3.8, 3.1, 1967], [3.6, 4.2, 1968], [3.5, 5.5, 1969]
];
let data1970s = [
  [4.9, 5.7, 1970], [5.9, 4.4, 1971], [5.6, 3.2, 1972],
  [4.9, 6.2, 1973], [5.6, 11.0, 1974], [8.5, 9.1, 1975],
  [7.7, 5.8, 1976], [7.1, 6.5, 1977], [6.1, 7.6, 1978], [5.8, 11.3, 1979]
];
let data1980s90s = [
  [7.1, 13.5, 1980], [7.6, 10.3, 1981], [9.7, 6.2, 1982],
  [9.6, 3.2, 1983], [7.5, 4.3, 1984], [7.2, 3.6, 1985],
  [5.5, 2.6, 1990], [6.8, 4.2, 1991], [7.5, 3.0, 1992],
  [6.1, 2.6, 1994], [5.4, 2.8, 1996], [4.2, 2.3, 1998], [4.0, 2.2, 1999]
];
let data2000s10s = [
  [4.0, 3.4, 2000], [4.7, 2.8, 2001], [5.8, 1.6, 2002],
  [6.0, 2.3, 2003], [5.1, 3.3, 2005], [4.6, 3.2, 2007],
  [9.3, 1.6, 2009], [9.6, 1.6, 2010], [7.4, 1.5, 2013],
  [5.3, 0.1, 2015], [4.4, 1.3, 2016], [3.9, 2.4, 2018], [3.5, 1.8, 2019]
];
let data2020s = [
  [8.1, 1.2, 2020], [5.4, 4.7, 2021], [3.6, 8.0, 2022],
  [3.6, 4.1, 2023], [4.0, 2.9, 2024], [4.1, 2.8, 2025]
];

let decades = ['1960s', '1970s', '1980s-90s', '2000s-10s', '2020s'];
let decadeColors;
let allData;

// Plot bounds
let xMin = 2, xMax = 12;
let yMin = -1, yMax = 15;
let naturalRate = 5.0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  decadeColors = {
    '1960s': color('dodgerblue'),
    '1970s': color('orangered'),
    '1980s-90s': color('forestgreen'),
    '2000s-10s': color('darkorchid'),
    '2020s': color('crimson')
  };

  allData = {
    '1960s': data1960s,
    '1970s': data1970s,
    '1980s-90s': data1980s90s,
    '2000s-10s': data2000s10s,
    '2020s': data2020s
  };

  let cy = drawHeight + 8;

  decadeSelect = createSelect();
  decadeSelect.position(10, cy);
  decadeSelect.option('1960s');
  decadeSelect.option('1970s');
  decadeSelect.option('1980s-90s');
  decadeSelect.option('2000s-10s');
  decadeSelect.option('2020s');
  decadeSelect.selected('1960s');
  decadeSelect.style('font-size', '12px');

  showAllCheck = createCheckbox('Show All', false);
  showAllCheck.position(120, cy);
  showAllCheck.style('font-size', '12px');

  showNaturalCheck = createCheckbox('Natural Rate', false);
  showNaturalCheck.position(210, cy);
  showNaturalCheck.style('font-size', '12px');

  showExpectationsCheck = createCheckbox('Expectations', false);
  showExpectationsCheck.position(330, cy);
  showExpectationsCheck.style('font-size', '12px');

  policySlider = createSlider(0, 100, 50, 1);
  policySlider.position(sliderLeftMargin, cy + 30);
  policySlider.size(canvasWidth - sliderLeftMargin - margin);

  animateButton = createButton('Animate History');
  animateButton.position(10, cy + 60);
  animateButton.mousePressed(startAnimation);
  animateButton.style('font-size', '12px');

  describe('Phillips Curve explorer showing historical unemployment vs inflation data by decade', LABEL);
}

function startAnimation() {
  animating = true;
  animDecadeIndex = 0;
  animTimer = 0;
  showAllCheck.checked(false);
  decadeSelect.selected(decades[0]);
}

function draw() {
  // Backgrounds
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Animation logic
  if (animating) {
    animTimer++;
    if (animTimer > 90) {
      animTimer = 0;
      animDecadeIndex++;
      if (animDecadeIndex >= decades.length) {
        animating = false;
        showAllCheck.checked(true);
      } else {
        decadeSelect.selected(decades[animDecadeIndex]);
      }
    }
  }

  // Title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(18);
  text('Phillips Curve Explorer', canvasWidth / 2, 8);

  // Plot area
  let plotL = margin + 10;
  let plotR = canvasWidth - margin;
  let plotT = 55;
  let plotB = drawHeight - 60;
  let plotW = plotR - plotL;
  let plotH = plotB - plotT;

  // Grid and axes
  stroke('lightgray');
  strokeWeight(0.5);
  for (let u = 2; u <= 12; u += 2) {
    let x = map(u, xMin, xMax, plotL, plotR);
    line(x, plotT, x, plotB);
  }
  for (let i = 0; i <= 14; i += 2) {
    let y = map(i, yMin, yMax, plotB, plotT);
    line(plotL, y, plotR, y);
  }

  // Axes
  stroke('black');
  strokeWeight(1.5);
  line(plotL, plotB, plotR, plotB);
  line(plotL, plotT, plotL, plotB);

  // Axis labels
  noStroke();
  fill('black');
  textSize(11);
  textAlign(CENTER, TOP);
  for (let u = 2; u <= 12; u += 2) {
    let x = map(u, xMin, xMax, plotL, plotR);
    text(u + '%', x, plotB + 5);
  }
  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 14; i += 2) {
    let y = map(i, yMin, yMax, plotB, plotT);
    text(i + '%', plotL - 5, y);
  }

  textSize(13);
  textAlign(CENTER, TOP);
  noStroke();
  fill('black');
  text('Unemployment Rate', (plotL + plotR) / 2, plotB + 22);

  push();
  translate(15, (plotT + plotB) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Inflation Rate', 0, 0);
  pop();

  // Natural rate line
  if (showNaturalCheck.checked()) {
    let nx = map(naturalRate, xMin, xMax, plotL, plotR);
    stroke('darkred');
    strokeWeight(2);
    drawingContext.setLineDash([6, 4]);
    line(nx, plotT, nx, plotB);
    drawingContext.setLineDash([]);
    noStroke();
    fill('darkred');
    textSize(10);
    textAlign(CENTER, BOTTOM);
    text('NAIRU (' + naturalRate + '%)', nx, plotT - 2);
  }

  // Short-run Phillips curve based on policy slider
  let policyVal = policySlider.value();
  let expectShift = showExpectationsCheck.checked() ? (policyVal - 50) * 0.06 : 0;

  stroke('steelblue');
  strokeWeight(2);
  noFill();
  beginShape();
  for (let u = xMin; u <= xMax; u += 0.1) {
    let inf = 8 / (u - 1) + expectShift;
    let px = map(u, xMin, xMax, plotL, plotR);
    let py = map(inf, yMin, yMax, plotB, plotT);
    if (py >= plotT && py <= plotB) {
      vertex(px, py);
    }
  }
  endShape();

  // Policy position marker
  let policyUnemp = map(policyVal, 0, 100, 9, 3);
  let policyInf = 8 / (policyUnemp - 1) + expectShift;
  let markerX = map(policyUnemp, xMin, xMax, plotL, plotR);
  let markerY = map(policyInf, yMin, yMax, plotB, plotT);
  if (markerY >= plotT && markerY <= plotB) {
    fill('navy');
    noStroke();
    circle(markerX, markerY, 14);
    fill('white');
    textSize(8);
    textAlign(CENTER, CENTER);
    text('Now', markerX, markerY);
  }

  // Expectations curves
  if (showExpectationsCheck.checked()) {
    for (let shift = -3; shift <= 3; shift += 1.5) {
      if (abs(shift - expectShift) < 0.5) continue;
      stroke(150, 150, 200, 80);
      strokeWeight(1);
      noFill();
      beginShape();
      for (let u = xMin; u <= xMax; u += 0.2) {
        let inf = 8 / (u - 1) + shift;
        let px = map(u, xMin, xMax, plotL, plotR);
        let py = map(inf, yMin, yMax, plotB, plotT);
        if (py >= plotT && py <= plotB) vertex(px, py);
      }
      endShape();
    }
  }

  // Data points
  let showAll = showAllCheck.checked();
  let selectedDecade = decadeSelect.value();

  let decadesToShow = showAll ? decades : [selectedDecade];

  for (let d of decadesToShow) {
    let pts = allData[d];
    let c = decadeColors[d];
    for (let pt of pts) {
      let px = map(pt[0], xMin, xMax, plotL, plotR);
      let py = map(pt[1], yMin, yMax, plotB, plotT);
      if (px >= plotL && px <= plotR && py >= plotT && py <= plotB) {
        fill(c);
        noStroke();
        circle(px, py, 9);
      }
    }
  }

  // Legend
  let legX = plotR - 130;
  let legY = plotT + 5;
  noStroke();
  fill(255, 255, 255, 200);
  rect(legX - 5, legY - 5, 135, 85, 5);

  textSize(10);
  textAlign(LEFT, CENTER);
  let legendItems = [
    ['1960s', 'dodgerblue', 'Tight trade-off'],
    ['1970s', 'orangered', 'Stagflation!'],
    ['1980s-90s', 'forestgreen', 'Return to pattern'],
    ['2000s-10s', 'darkorchid', 'Very flat curve'],
    ['2020s', 'crimson', 'Recent volatility']
  ];
  for (let i = 0; i < legendItems.length; i++) {
    fill(legendItems[i][1]);
    circle(legX + 5, legY + i * 16 + 2, 8);
    fill('black');
    noStroke();
    text(legendItems[i][0] + ': ' + legendItems[i][2], legX + 15, legY + i * 16 + 2);
  }

  // Insight text
  noStroke();
  fill('darkslategray');
  textSize(11);
  textAlign(CENTER, BOTTOM);
  let insight = getInsight(selectedDecade, showAll);
  text(insight, canvasWidth / 2, drawHeight - 8);

  // Control labels
  noStroke();
  fill('black');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Policy Stimulus: ' + policyVal + '%', 10, drawHeight + 40);

  if (animating) {
    fill('crimson');
    textSize(12);
    textAlign(RIGHT, CENTER);
    text('Animating: ' + decades[animDecadeIndex], canvasWidth - 20, drawHeight + 70);
  }
}

function getInsight(decade, showAll) {
  if (showAll) return 'All decades shown - notice how the relationship changed over time';
  switch (decade) {
    case '1960s': return 'The 1960s seemed to confirm a clear trade-off between unemployment and inflation';
    case '1970s': return 'The 1970s broke the simple story - stagflation meant high inflation AND unemployment!';
    case '1980s-90s': return 'Volcker broke inflation by accepting high unemployment - then the pattern returned';
    case '2000s-10s': return 'The modern curve appears much flatter - low unemployment without much inflation';
    case '2020s': return 'Post-pandemic: supply shocks created inflation even with changing employment';
    default: return '';
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);

  let cy = drawHeight + 8;
  policySlider.position(sliderLeftMargin, cy + 30);
  policySlider.size(canvasWidth - sliderLeftMargin - margin);

  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasHeight = drawHeight + controlHeight;
}
