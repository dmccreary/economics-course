// Monetary and Fiscal Policy Dashboard MicroSim
// Combined fiscal and monetary policy effects on GDP, inflation, unemployment
// MicroSim template version 2026.03

let canvasWidth = 400;
let drawHeight = 480;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 130;

// Controls
let fiscalSelect, monetarySelect;
let fiscalStrength, monetaryStrength;
let scenarioSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  let cy = drawHeight + 5;

  // Scenario presets
  scenarioSelect = createSelect();
  scenarioSelect.position(10, cy);
  scenarioSelect.option('Custom');
  scenarioSelect.option('2008 Response');
  scenarioSelect.option('1970s Confusion');
  scenarioSelect.option('2022 Response');
  scenarioSelect.option('Normal Times');
  scenarioSelect.selected('Custom');
  scenarioSelect.style('font-size', '11px');
  scenarioSelect.changed(applyScenario);

  // Fiscal controls
  fiscalSelect = createSelect();
  fiscalSelect.position(10, cy + 28);
  fiscalSelect.option('Expansionary');
  fiscalSelect.option('Neutral');
  fiscalSelect.option('Contractionary');
  fiscalSelect.selected('Neutral');
  fiscalSelect.style('font-size', '11px');

  fiscalStrength = createSlider(0, 100, 50, 1);
  fiscalStrength.position(sliderLeftMargin + 80, cy + 28);
  fiscalStrength.size(canvasWidth - sliderLeftMargin - 100);

  // Monetary controls
  monetarySelect = createSelect();
  monetarySelect.position(10, cy + 55);
  monetarySelect.option('Expansionary');
  monetarySelect.option('Neutral');
  monetarySelect.option('Contractionary');
  monetarySelect.selected('Neutral');
  monetarySelect.style('font-size', '11px');

  monetaryStrength = createSlider(0, 100, 50, 1);
  monetaryStrength.position(sliderLeftMargin + 80, cy + 55);
  monetaryStrength.size(canvasWidth - sliderLeftMargin - 100);

  describe('Policy dashboard showing how fiscal and monetary policies interact to affect GDP, inflation, and unemployment', LABEL);
}

function applyScenario() {
  let s = scenarioSelect.value();
  if (s === '2008 Response') {
    fiscalSelect.selected('Expansionary');
    monetarySelect.selected('Expansionary');
    fiscalStrength.value(85);
    monetaryStrength.value(90);
  } else if (s === '1970s Confusion') {
    fiscalSelect.selected('Expansionary');
    monetarySelect.selected('Contractionary');
    fiscalStrength.value(70);
    monetaryStrength.value(60);
  } else if (s === '2022 Response') {
    fiscalSelect.selected('Neutral');
    monetarySelect.selected('Contractionary');
    fiscalStrength.value(30);
    monetaryStrength.value(80);
  } else if (s === 'Normal Times') {
    fiscalSelect.selected('Neutral');
    monetarySelect.selected('Neutral');
    fiscalStrength.value(50);
    monetaryStrength.value(50);
  }
}

function draw() {
  // Backgrounds
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(18);
  text('Policy Dashboard', canvasWidth / 2, 8);

  // Read controls
  let fStance = fiscalSelect.value();
  let mStance = monetarySelect.value();
  let fStr = fiscalStrength.value() / 100;
  let mStr = monetaryStrength.value() / 100;

  // Calculate policy effects
  let fDir = fStance === 'Expansionary' ? 1 : fStance === 'Contractionary' ? -1 : 0;
  let mDir = mStance === 'Expansionary' ? 1 : mStance === 'Contractionary' ? -1 : 0;

  let fiscalEffect = fDir * fStr;
  let monetaryEffect = mDir * mStr;
  let combinedEffect = (fiscalEffect + monetaryEffect) / 2;

  // Calculate outcomes
  let baseGDP = 2.0;
  let baseInflation = 2.5;
  let baseUnemploy = 5.0;

  let gdpGrowth = baseGDP + combinedEffect * 4;
  let inflation = baseInflation + combinedEffect * 3;
  let unemployment = baseUnemploy - combinedEffect * 3;
  unemployment = constrain(unemployment, 1, 12);
  inflation = constrain(inflation, -1, 10);

  // Coordination score
  let coordination;
  if (fDir === mDir) {
    coordination = 'Aligned';
  } else if (fDir === 0 || mDir === 0) {
    coordination = 'Partial';
  } else {
    coordination = 'Conflicting';
  }

  // Draw policy stance labels
  textSize(12);
  textAlign(CENTER, TOP);

  // Fiscal policy panel
  let fPanelX = margin;
  let fPanelW = canvasWidth / 2 - margin - 5;
  drawPolicyPanel(fPanelX, 35, fPanelW, 'FISCAL POLICY', fStance, fStr,
    'steelblue', 'Gov Spending & Taxes');

  // Monetary policy panel
  let mPanelX = canvasWidth / 2 + 5;
  let mPanelW = canvasWidth / 2 - margin - 5;
  drawPolicyPanel(mPanelX, 35, mPanelW, 'MONETARY POLICY', mStance, mStr,
    'darkred', 'Fed Interest Rates');

  // Tug of war visualization
  drawTugOfWar(fiscalEffect, monetaryEffect, 175);

  // Coordination badge
  let coordY = 210;
  noStroke();
  if (coordination === 'Aligned') fill('darkgreen');
  else if (coordination === 'Conflicting') fill('crimson');
  else fill('goldenrod');
  textSize(13);
  textAlign(CENTER, TOP);
  text('Policy Coordination: ' + coordination, canvasWidth / 2, coordY);

  // Economic outcomes gauges
  drawOutcomeGauges(gdpGrowth, inflation, unemployment, 240);

  // Scenario insight
  noStroke();
  fill('darkslategray');
  textSize(11);
  textAlign(CENTER, TOP);
  let insight = getInsight(fStance, mStance, coordination);
  text(insight, canvasWidth / 2, drawHeight - 40);

  // Control area labels
  noStroke();
  fill('black');
  textSize(10);
  textAlign(LEFT, CENTER);
  let cy = drawHeight + 5;
  text('Fiscal: ' + fStance, sliderLeftMargin + 10, cy + 38);
  text('Monetary: ' + mStance, sliderLeftMargin + 10, cy + 65);

  // Strength labels
  textAlign(RIGHT, CENTER);
  text('Str: ' + Math.round(fStr * 100) + '%', canvasWidth - margin, cy + 38);
  text('Str: ' + Math.round(mStr * 100) + '%', canvasWidth - margin, cy + 65);

  // Bottom insight
  noStroke();
  fill('gray');
  textSize(9);
  textAlign(CENTER, CENTER);
  text('Adjust both policies to see how they interact - alignment amplifies, conflict cancels', canvasWidth / 2, drawHeight + controlHeight - 10);
}

function drawPolicyPanel(x, y, w, title, stance, strength, col, subtitle) {
  // Panel background
  stroke(col);
  strokeWeight(1.5);
  fill(255, 255, 255, 200);
  rect(x, y, w, 120, 6);

  noStroke();
  fill(col);
  textSize(12);
  textAlign(CENTER, TOP);
  text(title, x + w / 2, y + 5);

  fill('gray');
  textSize(9);
  text(subtitle, x + w / 2, y + 20);

  // Stance indicator
  let stanceColor;
  if (stance === 'Expansionary') stanceColor = 'forestgreen';
  else if (stance === 'Contractionary') stanceColor = 'crimson';
  else stanceColor = 'gray';

  fill(stanceColor);
  textSize(14);
  text(stance, x + w / 2, y + 40);

  // Strength bar
  fill('lightgray');
  rect(x + 10, y + 65, w - 20, 12, 3);
  fill(col);
  rect(x + 10, y + 65, (w - 20) * strength, 12, 3);

  // Arrow indicator
  noStroke();
  fill(stanceColor);
  let arrowY = y + 90;
  let arrowX = x + w / 2;
  if (stance === 'Expansionary') {
    textSize(20);
    text('\u25B2', arrowX, arrowY);
  } else if (stance === 'Contractionary') {
    textSize(20);
    text('\u25BC', arrowX, arrowY);
  } else {
    textSize(14);
    text('--', arrowX, arrowY);
  }
}

function drawTugOfWar(fiscal, monetary, y) {
  let cx = canvasWidth / 2;
  let barW = canvasWidth - 100;
  let barH = 16;

  // Bar background
  fill('lightgray');
  noStroke();
  rect(cx - barW / 2, y, barW, barH, 8);

  // Net force indicator
  let netForce = (fiscal + monetary) / 2;
  let indicatorX = cx + netForce * barW / 2;
  indicatorX = constrain(indicatorX, cx - barW / 2 + 8, cx + barW / 2 - 8);

  // Color based on direction
  if (netForce > 0.1) fill('forestgreen');
  else if (netForce < -0.1) fill('crimson');
  else fill('gold');
  circle(indicatorX, y + barH / 2, 20);

  // Labels
  noStroke();
  fill('black');
  textSize(9);
  textAlign(CENTER, TOP);
  text('Contractionary', cx - barW / 2, y + barH + 3);
  text('Expansionary', cx + barW / 2, y + barH + 3);
  textAlign(CENTER, BOTTOM);
  text('Net Policy Effect', cx, y - 2);
}

function drawOutcomeGauges(gdp, inflation, unemployment, startY) {
  let gauges = [
    { name: 'GDP Growth', val: gdp, unit: '%', good: [1.5, 3.5], range: [-3, 8], col: 'steelblue' },
    { name: 'Inflation', val: inflation, unit: '%', good: [1.5, 3.0], range: [-1, 10], col: 'orangered' },
    { name: 'Unemployment', val: unemployment, unit: '%', good: [3.5, 5.5], range: [1, 12], col: 'purple' }
  ];

  let gaugeW = (canvasWidth - 60) / 3;

  for (let i = 0; i < gauges.length; i++) {
    let g = gauges[i];
    let gx = 30 + i * gaugeW + gaugeW / 2;
    let gy = startY + 20;

    // Gauge arc
    let gaugeR = min(gaugeW / 2 - 10, 50);
    for (let a = PI; a <= TWO_PI; a += 0.02) {
      let t = (a - PI) / PI;
      let v = lerp(g.range[0], g.range[1], t);
      let isGood = v >= g.good[0] && v <= g.good[1];
      stroke(isGood ? color(100, 200, 100) : color(230, 150, 150));
      strokeWeight(8);
      point(gx + cos(a) * gaugeR, gy + sin(a) * gaugeR);
    }

    // Needle
    let needleAngle = map(constrain(g.val, g.range[0], g.range[1]), g.range[0], g.range[1], PI, TWO_PI);
    stroke('black');
    strokeWeight(2);
    let nx = gx + cos(needleAngle) * (gaugeR - 12);
    let ny = gy + sin(needleAngle) * (gaugeR - 12);
    line(gx, gy, nx, ny);

    fill('black');
    noStroke();
    circle(gx, gy, 6);

    // Label
    textSize(11);
    textAlign(CENTER, CENTER);
    text(g.name, gx, gy + gaugeR + 15);

    // Value
    let isGood = g.val >= g.good[0] && g.val <= g.good[1];
    fill(isGood ? 'darkgreen' : 'crimson');
    textSize(16);
    text(nf(g.val, 1, 1) + g.unit, gx, gy + 18);
  }

  // Assessment text
  noStroke();
  fill('black');
  textSize(12);
  textAlign(CENTER, TOP);
  let assessY = startY + 110;

  let gdpOK = gdp >= 1.5 && gdp <= 3.5;
  let infOK = inflation >= 1.5 && inflation <= 3.0;
  let unOK = unemployment >= 3.5 && unemployment <= 5.5;
  let score = (gdpOK ? 1 : 0) + (infOK ? 1 : 0) + (unOK ? 1 : 0);

  if (score === 3) {
    fill('darkgreen');
    text('Goldilocks Economy: All indicators in healthy range!', canvasWidth / 2, assessY);
  } else if (score >= 2) {
    fill('goldenrod');
    text('Mixed Results: Some indicators need attention', canvasWidth / 2, assessY);
  } else if (gdp > 5 && inflation > 5) {
    fill('crimson');
    text('Overheating! Strong growth but inflation is too high', canvasWidth / 2, assessY);
  } else if (gdp < 0) {
    fill('crimson');
    text('Recession! Economy is contracting', canvasWidth / 2, assessY);
  } else {
    fill('crimson');
    text('Economy Under Stress: Policy adjustment needed', canvasWidth / 2, assessY);
  }

  // Historical context for presets
  let scenario = scenarioSelect.value();
  if (scenario !== 'Custom') {
    fill('darkslategray');
    textSize(10);
    let ctx = getScenarioContext(scenario);
    text(ctx, canvasWidth / 2, assessY + 20);
  }
}

function getScenarioContext(scenario) {
  switch (scenario) {
    case '2008 Response': return '2008: Both policies went full stimulus to fight the Great Recession';
    case '1970s Confusion': return '1970s: Fiscal spending + tight money created stagflation confusion';
    case '2022 Response': return '2022: Fed raised rates aggressively to fight post-pandemic inflation';
    case 'Normal Times': return 'Normal: Both policies neutral, economy finds its natural equilibrium';
    default: return '';
  }
}

function getInsight(fiscal, monetary, coordination) {
  if (coordination === 'Aligned' && fiscal === 'Expansionary') {
    return 'Both policies stimulating: Strong boost but watch inflation!';
  } else if (coordination === 'Aligned' && fiscal === 'Contractionary') {
    return 'Both policies tightening: Slows economy, risks recession';
  } else if (coordination === 'Conflicting') {
    return 'Policies pulling in opposite directions - effects cancel out!';
  } else if (fiscal === 'Neutral' && monetary === 'Neutral') {
    return 'Both neutral: Economy runs on its own momentum';
  }
  return 'One policy active, one neutral: Moderate effect on economy';
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);

  let cy = drawHeight + 5;
  fiscalStrength.position(sliderLeftMargin + 80, cy + 28);
  fiscalStrength.size(canvasWidth - sliderLeftMargin - 100);
  monetaryStrength.position(sliderLeftMargin + 80, cy + 55);
  monetaryStrength.size(canvasWidth - sliderLeftMargin - 100);

  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasHeight = drawHeight + controlHeight;
}
