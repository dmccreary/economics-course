// Multiplier Effect Simulator MicroSim
// Shows how initial government spending cascades through rounds of re-spending
// GDP = Initial Spending x Multiplier, where Multiplier = 1 / (1 - MPC)

let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 130;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 140;

// Simulation state
let initialSpending = 50; // millions
let mpc = 0.8;
let rounds = [];
let currentRound = 0;
let animating = false;
let autoPlay = false;
let showFormula = false;
let animTimer = 0;
let animDelay = 40; // frames between rounds

// Controls
let spendingSlider, mpcSlider;
let injectBtn, stepBtn, resetBtn, formulaBtn;
let autoCheckbox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Sliders
  spendingSlider = createSlider(10, 100, initialSpending, 5);
  spendingSlider.position(sliderLeftMargin, drawHeight + 8);
  spendingSlider.size(canvasWidth - sliderLeftMargin - margin);

  mpcSlider = createSlider(50, 95, mpc * 100, 5);
  mpcSlider.position(sliderLeftMargin, drawHeight + 32);
  mpcSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Buttons row
  injectBtn = createButton('Inject Spending');
  injectBtn.position(10, drawHeight + 60);
  injectBtn.mousePressed(startAnimation);
  injectBtn.style('font-size', '12px');

  stepBtn = createButton('Step');
  stepBtn.position(120, drawHeight + 60);
  stepBtn.mousePressed(stepOnce);
  stepBtn.style('font-size', '12px');

  resetBtn = createButton('Reset');
  resetBtn.position(170, drawHeight + 60);
  resetBtn.mousePressed(resetSim);
  resetBtn.style('font-size', '12px');

  formulaBtn = createButton('Show Formula');
  formulaBtn.position(220, drawHeight + 60);
  formulaBtn.mousePressed(() => { showFormula = !showFormula; });
  formulaBtn.style('font-size', '12px');

  autoCheckbox = createCheckbox('Auto-play', false);
  autoCheckbox.position(10, drawHeight + 88);
  autoCheckbox.style('font-size', '12px');

  resetSim();
  describe('Multiplier effect simulator showing how initial spending cascades through the economy', LABEL);
}

function startAnimation() {
  if (rounds.length > 0 && currentRound >= rounds.length) resetSim();
  initialSpending = spendingSlider.value();
  mpc = mpcSlider.value() / 100;
  calculateRounds();
  animating = true;
  currentRound = 0;
  animTimer = 0;
}

function stepOnce() {
  if (rounds.length === 0) {
    initialSpending = spendingSlider.value();
    mpc = mpcSlider.value() / 100;
    calculateRounds();
    currentRound = 0;
  }
  if (currentRound < rounds.length) {
    currentRound++;
  }
  animating = false;
}

function resetSim() {
  rounds = [];
  currentRound = 0;
  animating = false;
  animTimer = 0;
}

function calculateRounds() {
  rounds = [];
  let spending = initialSpending;
  let total = 0;
  for (let i = 0; i < 20; i++) {
    total += spending;
    rounds.push({ round: i, spending: spending, cumulative: total });
    spending = spending * mpc;
    if (spending < 0.01) break;
  }
}

function draw() {
  // Update auto-play state
  autoPlay = autoCheckbox.checked();

  // Handle auto animation
  if (animating && currentRound < rounds.length) {
    animTimer++;
    if (animTimer >= animDelay) {
      currentRound++;
      animTimer = 0;
      if (currentRound >= rounds.length) animating = false;
    }
  } else if (autoPlay && currentRound >= rounds.length && rounds.length > 0) {
    // Auto completed
    animating = false;
  }

  // Draw regions
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
  text('Multiplier Effect Simulator', canvasWidth / 2, 8);

  // Read current slider values for display
  let dispSpending = spendingSlider.value();
  let dispMPC = mpcSlider.value() / 100;
  let multiplier = 1 / (1 - dispMPC);

  // Info line
  textSize(12);
  fill('gray');
  text('Multiplier = 1/(1-MPC) = ' + nf(multiplier, 1, 1) +
       '    Expected Impact: $' + nf(dispSpending * multiplier, 1, 1) + 'M', canvasWidth / 2, 30);

  // Draw the bar chart of rounds
  let visibleRounds = min(currentRound, rounds.length);
  let chartLeft = 50;
  let chartRight = canvasWidth - 20;
  let chartTop = 55;
  let chartBottom = drawHeight - 80;
  let chartW = chartRight - chartLeft;
  let chartH = chartBottom - chartTop;

  // Axes
  stroke('black');
  strokeWeight(1);
  line(chartLeft, chartBottom, chartRight, chartBottom);
  line(chartLeft, chartTop, chartLeft, chartBottom);

  // Axis labels
  noStroke();
  fill('black');
  textSize(11);
  textAlign(CENTER, TOP);
  text('Spending Round', (chartLeft + chartRight) / 2, chartBottom + 3);

  push();
  translate(12, (chartTop + chartBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, TOP);
  textSize(11);
  text('Spending ($M)', 0, 0);
  pop();

  if (rounds.length > 0 && visibleRounds > 0) {
    let maxSpending = rounds[0].spending;
    let barW = min(30, (chartW - 10) / rounds.length - 2);

    for (let i = 0; i < visibleRounds; i++) {
      let r = rounds[i];
      let barH = (r.spending / maxSpending) * (chartH - 20);
      let x = chartLeft + 10 + i * (barW + 2);
      let y = chartBottom - barH;

      // Color fades as spending decreases
      let alpha = map(r.spending, 0, maxSpending, 80, 255);
      fill(30, 100, 200, alpha);
      noStroke();
      rect(x, y, barW, barH);

      // Round number
      fill('black');
      textSize(8);
      textAlign(CENTER, TOP);
      text(i + 1, x + barW / 2, chartBottom + 1);

      // Amount on bar if there's room
      if (barH > 15 && barW > 18) {
        fill('white');
        textSize(7);
        textAlign(CENTER, CENTER);
        text('$' + nf(r.spending, 1, 1), x + barW / 2, y + barH / 2);
      }
    }

    // Cumulative total display
    let cumTotal = rounds[visibleRounds - 1].cumulative;
    noStroke();
    fill('darkgreen');
    textSize(14);
    textAlign(CENTER, TOP);
    text('Cumulative Total: $' + nf(cumTotal, 1, 1) + 'M', canvasWidth / 2, chartBottom + 18);

    // Cumulative progress bar
    let theoreticalMax = initialSpending * (1 / (1 - mpc));
    let progW = chartW * 0.8;
    let progX = chartLeft + (chartW - progW) / 2;
    let progY = chartBottom + 36;
    let progH = 14;

    fill('lightgray');
    noStroke();
    rect(progX, progY, progW, progH, 4);

    let fillW = min(progW, (cumTotal / theoreticalMax) * progW);
    fill('green');
    rect(progX, progY, fillW, progH, 4);

    fill('white');
    textSize(9);
    textAlign(CENTER, CENTER);
    text(nf(cumTotal / theoreticalMax * 100, 1, 0) + '% of theoretical max', progX + progW / 2, progY + progH / 2);

    // Completion message
    if (currentRound >= rounds.length) {
      fill('darkblue');
      textSize(14);
      textAlign(CENTER, TOP);
      text('Your $' + initialSpending + 'M created $' + nf(cumTotal, 1, 1) + 'M in total economic activity!',
           canvasWidth / 2, progY + 20);
    }
  } else if (rounds.length === 0) {
    noStroke();
    fill('gray');
    textSize(14);
    textAlign(CENTER, CENTER);
    text('Click "Inject Spending" or "Step" to begin', canvasWidth / 2, (chartTop + chartBottom) / 2);
  }

  // Show formula overlay
  if (showFormula) {
    fill(255, 255, 255, 230);
    noStroke();
    rect(canvasWidth / 2 - 150, 80, 300, 110, 8);
    stroke('steelblue');
    strokeWeight(2);
    noFill();
    rect(canvasWidth / 2 - 150, 80, 300, 110, 8);

    noStroke();
    fill('black');
    textSize(14);
    textAlign(CENTER, TOP);
    text('Spending Multiplier Formula', canvasWidth / 2, 88);
    textSize(16);
    fill('darkblue');
    text('Multiplier = 1 / (1 - MPC)', canvasWidth / 2, 110);
    textSize(13);
    fill('black');
    text('MPC = ' + nf(dispMPC, 1, 2), canvasWidth / 2, 134);
    text('Multiplier = 1 / (1 - ' + nf(dispMPC, 1, 2) + ') = ' + nf(multiplier, 1, 2), canvasWidth / 2, 152);
    text('Total Impact = $' + dispSpending + 'M x ' + nf(multiplier, 1, 2) + ' = $' + nf(dispSpending * multiplier, 1, 1) + 'M', canvasWidth / 2, 170);
  }

  // Slider labels in control area
  noStroke();
  fill('black');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Spending: $' + dispSpending + 'M', 5, drawHeight + 16);
  text('MPC: ' + nf(dispMPC, 1, 2), 5, drawHeight + 40);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  spendingSlider.size(canvasWidth - sliderLeftMargin - margin);
  mpcSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasHeight = drawHeight + controlHeight;
}
