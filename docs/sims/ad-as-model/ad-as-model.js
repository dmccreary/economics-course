// Aggregate Demand and Supply Model MicroSim
// Shows how economic shocks shift AD/AS curves and affect equilibrium
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Graph area
let graphLeft, graphRight, graphTop, graphBottom;

// Curves - base intercepts
let adIntercept = 0;   // shift amount for AD
let srasIntercept = 0; // shift amount for SRAS
let lrasIntercept = 0; // shift amount for LRAS

// Animation
let targetAdShift = 0;
let targetSrasShift = 0;
let targetLrasShift = 0;
let animSpeed = 0.05;

// Controls
let scenarioSelect;
let magnitudeSlider;
let applyButton;
let resetButton;

// Outcome text
let outcomeLines = [];

// Scenarios
let scenarios = [
  {
    name: 'Consumer confidence boost',
    ad: 1, sras: 0, lras: 0,
    desc: ['GDP increases, prices rise slightly',
           'Employment increases as firms produce more',
           'Similar to post-pandemic consumer spending surge']
  },
  {
    name: 'Oil price shock',
    ad: 0, sras: -1, lras: 0,
    desc: ['GDP decreases, prices rise (stagflation)',
           'Unemployment increases, cost of living rises',
           'Similar to 1970s OPEC oil embargo']
  },
  {
    name: 'Government stimulus',
    ad: 1, sras: 0, lras: 0,
    desc: ['GDP increases, prices rise',
           'Short-term employment boost',
           'Similar to 2020 COVID stimulus checks']
  },
  {
    name: 'Technology improvement',
    ad: 0, sras: 1, lras: 1,
    desc: ['GDP increases, prices fall',
           'Long-run productive capacity grows',
           'Similar to internet revolution of the 1990s']
  },
  {
    name: 'Pandemic lockdown',
    ad: -1, sras: -1, lras: 0,
    desc: ['GDP drops sharply, price effect uncertain',
           'Mass unemployment, supply disruptions',
           'Similar to early 2020 COVID lockdowns']
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Graph boundaries
  graphLeft = 80;
  graphTop = 50;
  graphBottom = drawHeight - 40;

  // Scenario dropdown
  scenarioSelect = createSelect();
  scenarioSelect.position(10, drawHeight + 5);
  for (let s of scenarios) {
    scenarioSelect.option(s.name);
  }
  scenarioSelect.style('font-size', '14px');

  // Magnitude slider
  magnitudeSlider = createSlider(1, 3, 2, 1);
  magnitudeSlider.position(sliderLeftMargin + 80, drawHeight + 40);
  magnitudeSlider.size(canvasWidth - sliderLeftMargin - 80 - margin);

  // Apply button
  applyButton = createButton('Apply Shock');
  applyButton.position(10, drawHeight + 40);
  applyButton.mousePressed(applyShock);

  // Reset button
  resetButton = createButton('Reset');
  resetButton.position(100, drawHeight + 40);
  resetButton.mousePressed(resetModel);

  describe('Interactive AD-AS macroeconomic model showing how economic shocks shift curves and change equilibrium', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Animate shifts
  adIntercept = lerp(adIntercept, targetAdShift, animSpeed);
  srasIntercept = lerp(srasIntercept, targetSrasShift, animSpeed);
  lrasIntercept = lerp(lrasIntercept, targetLrasShift, animSpeed);

  graphRight = canvasWidth - 60;

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  text('Aggregate Demand & Supply', canvasWidth * 0.45, 10);

  // Draw axes
  stroke('black');
  strokeWeight(2);
  line(graphLeft, graphTop, graphLeft, graphBottom);
  line(graphLeft, graphBottom, graphRight, graphBottom);

  // Axis labels
  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, CENTER);

  push();
  translate(20, (graphTop + graphBottom) / 2);
  rotate(-HALF_PI);
  text('Price Level', 0, 0);
  pop();

  textAlign(CENTER, TOP);
  text('Real GDP (Output)', (graphLeft + graphRight) / 2, graphBottom + 5);

  let gw = graphRight - graphLeft;
  let gh = graphBottom - graphTop;
  let shiftPx = 40; // pixels per unit shift

  // Draw LRAS (vertical line)
  let lrasX = graphLeft + gw * 0.5 + lrasIntercept * shiftPx;
  stroke('green');
  strokeWeight(2);
  drawingContext.setLineDash([8, 6]);
  line(lrasX, graphTop + 10, lrasX, graphBottom - 10);
  drawingContext.setLineDash([]);
  noStroke();
  fill('green');
  textSize(13);
  textAlign(CENTER, BOTTOM);
  text('LRAS', lrasX, graphTop + 8);

  // Draw AD curve (downward sloping)
  let adStartX = graphLeft + gw * 0.15 + adIntercept * shiftPx;
  let adEndX = graphLeft + gw * 0.85 + adIntercept * shiftPx;
  stroke('steelblue');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let t = 0; t <= 1; t += 0.02) {
    let x = lerp(adStartX, adEndX, t);
    let y = lerp(graphTop + 20, graphBottom - 20, t);
    // Slight curve
    y -= sin(t * PI) * 15;
    vertex(x, y);
  }
  endShape();
  noStroke();
  fill('steelblue');
  textSize(14);
  textAlign(LEFT, CENTER);
  text('AD', adEndX + 5, graphBottom - 30);

  // Draw SRAS curve (upward sloping)
  let srasStartX = graphLeft + gw * 0.15 + srasIntercept * shiftPx;
  let srasEndX = graphLeft + gw * 0.85 + srasIntercept * shiftPx;
  stroke('crimson');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let t = 0; t <= 1; t += 0.02) {
    let x = lerp(srasStartX, srasEndX, t);
    let y = lerp(graphBottom - 20, graphTop + 20, t);
    y += sin(t * PI) * 15;
    vertex(x, y);
  }
  endShape();
  noStroke();
  fill('crimson');
  textSize(14);
  textAlign(LEFT, CENTER);
  text('SRAS', srasEndX + 5, graphTop + 30);

  // Find approximate equilibrium (intersection)
  let eqT = findEquilibrium(adStartX, adEndX, srasStartX, srasEndX, gh);
  if (eqT !== null) {
    let eqX = lerp(adStartX, adEndX, eqT);
    let adY = lerp(graphTop + 20, graphBottom - 20, eqT) - sin(eqT * PI) * 15;
    // Draw equilibrium point
    fill('gold');
    stroke('black');
    strokeWeight(2);
    circle(eqX, adY, 14);

    // Dotted lines to axes
    stroke('gray');
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(eqX, adY, eqX, graphBottom);
    line(eqX, adY, graphLeft, adY);
    drawingContext.setLineDash([]);

    // Labels
    noStroke();
    fill('black');
    textSize(12);
    textAlign(CENTER, TOP);
    text('E', eqX, adY - 18);
  }

  // Outcome panel
  if (outcomeLines.length > 0) {
    noStroke();
    fill('black');
    textSize(13);
    textAlign(LEFT, TOP);
    let oy = graphTop + 10;
    let ox = graphRight - 170;
    fill(255, 255, 240, 220);
    stroke('goldenrod');
    strokeWeight(1);
    rect(ox - 5, oy - 5, 175, 70, 5);
    noStroke();
    fill('black');
    textSize(11);
    for (let i = 0; i < outcomeLines.length; i++) {
      text(outcomeLines[i], ox, oy + i * 18);
    }
  }

  // Control labels
  noStroke();
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  let mag = magnitudeSlider.value();
  let magLabel = mag === 1 ? 'Small' : mag === 2 ? 'Medium' : 'Large';
  text('Magnitude: ' + magLabel, sliderLeftMargin, drawHeight + 55);
}

function findEquilibrium(adSX, adEX, srasSX, srasEX, gh) {
  // Find t where AD and SRAS y-values are closest
  let bestT = 0.5;
  let bestDist = Infinity;
  for (let t = 0.1; t <= 0.9; t += 0.005) {
    let adX = lerp(adSX, adEX, t);
    let adY = lerp(graphTop + 20, graphBottom - 20, t) - sin(t * PI) * 15;
    // For SRAS, find the t that gives same x
    let srasT = (adX - srasSX) / (srasEX - srasSX);
    if (srasT >= 0 && srasT <= 1) {
      let srasY = lerp(graphBottom - 20, graphTop + 20, srasT) + sin(srasT * PI) * 15;
      let d = abs(adY - srasY);
      if (d < bestDist) {
        bestDist = d;
        bestT = t;
      }
    }
  }
  return bestDist < 20 ? bestT : null;
}

function applyShock() {
  let idx = scenarios.findIndex(s => s.name === scenarioSelect.value());
  if (idx < 0) return;
  let s = scenarios[idx];
  let mag = magnitudeSlider.value();
  targetAdShift += s.ad * mag;
  targetSrasShift += s.sras * mag;
  targetLrasShift += s.lras * mag;
  outcomeLines = s.desc;
}

function resetModel() {
  targetAdShift = 0;
  targetSrasShift = 0;
  targetLrasShift = 0;
  outcomeLines = [];
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  magnitudeSlider.size(canvasWidth - sliderLeftMargin - 80 - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
