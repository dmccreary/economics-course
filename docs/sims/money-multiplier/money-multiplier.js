// Fractional Reserve Money Multiplier MicroSim
// Visualize how an initial deposit multiplies through the banking system.
// Slider controls reserve ratio; step through or auto-play the rounds.

let canvasWidth = 580;
let drawHeight = 480;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Parameters
let initialDeposit = 1000;
let reserveRatio = 0.10;
let maxRounds = 10;

// State
let currentRound = 0;
let rounds = []; // { deposit, reserve, loan }
let autoPlaying = false;
let autoTimer = 0;
let autoInterval = 40; // frames between steps

// Controls
let depositSlider, reserveSlider, stepButton, autoButton, resetButton, formulaCheckbox, speedSlider;

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Row 1 controls
  depositSlider = createSlider(100, 10000, 1000, 100);
  reserveSlider = createSlider(5, 50, 10, 1);

  // Row 2 controls
  stepButton = createButton('Step');
  stepButton.mousePressed(stepForward);

  autoButton = createButton('Auto-Play');
  autoButton.mousePressed(toggleAutoPlay);

  resetButton = createButton('Reset');
  resetButton.mousePressed(resetSim);

  speedSlider = createSlider(10, 80, 40, 5);

  formulaCheckbox = createCheckbox('Show Formula', false);

  positionControls();
  resetSim();
}

function positionControls() {
  let y1 = drawHeight + 8;
  let y2 = drawHeight + 42;
  depositSlider.position(130, y1);
  depositSlider.size(140);
  reserveSlider.position(420, y1);
  reserveSlider.size(100);
  stepButton.position(15, y2);
  autoButton.position(70, y2);
  resetButton.position(155, y2);
  speedSlider.position(290, y2);
  speedSlider.size(80);
  formulaCheckbox.position(420, y2);
}

function resetSim() {
  currentRound = 0;
  rounds = [];
  autoPlaying = false;
  autoButton.html('Auto-Play');
  calculateRounds();
}

function calculateRounds() {
  rounds = [];
  initialDeposit = depositSlider.value();
  reserveRatio = reserveSlider.value() / 100;
  let dep = initialDeposit;
  for (let i = 0; i < maxRounds; i++) {
    let res = dep * reserveRatio;
    let loan = dep - res;
    rounds.push({ deposit: dep, reserve: res, loan: loan });
    dep = loan;
    if (dep < 0.01) break;
  }
}

function stepForward() {
  calculateRounds();
  if (currentRound < rounds.length) {
    currentRound++;
  }
}

function toggleAutoPlay() {
  autoPlaying = !autoPlaying;
  autoButton.html(autoPlaying ? 'Pause' : 'Auto-Play');
  autoTimer = 0;
}

function draw() {
  // Check for slider changes
  let newDeposit = depositSlider.value();
  let newRatio = reserveSlider.value() / 100;
  if (newDeposit !== initialDeposit || newRatio !== reserveRatio) {
    initialDeposit = newDeposit;
    reserveRatio = newRatio;
    resetSim();
  }

  autoInterval = 90 - speedSlider.value();

  // Auto-play logic
  if (autoPlaying) {
    autoTimer++;
    if (autoTimer >= autoInterval) {
      autoTimer = 0;
      if (currentRound < rounds.length) {
        currentRound++;
      } else {
        autoPlaying = false;
        autoButton.html('Auto-Play');
      }
    }
  }

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
  textSize(18);
  textAlign(CENTER, TOP);
  text('Fractional Reserve Money Multiplier', canvasWidth / 2, 8);

  // Draw banks
  let bankAreaTop = 50;
  let bankAreaBottom = drawHeight - 140;
  let bankH = min(38, (bankAreaBottom - bankAreaTop) / (maxRounds + 1));
  let bankLabelW = 60;
  let barAreaLeft = margin + bankLabelW + 10;
  let barAreaRight = canvasWidth - margin - 180;
  let barMaxW = barAreaRight - barAreaLeft;

  // Column headers
  noStroke();
  fill('gray');
  textSize(11);
  textAlign(LEFT, BOTTOM);
  text('Bank', margin, bankAreaTop - 2);
  textAlign(CENTER, BOTTOM);
  text('Deposit / Reserve / Loan', (barAreaLeft + barAreaRight) / 2, bankAreaTop - 2);

  for (let i = 0; i < min(currentRound, rounds.length); i++) {
    let r = rounds[i];
    let y = bankAreaTop + i * bankH;

    // Bank label
    noStroke();
    fill('black');
    textSize(12);
    textAlign(LEFT, CENTER);
    let bankLabel = 'Bank ' + String.fromCharCode(65 + i);
    text(bankLabel, margin, y + bankH / 2);

    // Deposit bar (green)
    let depW = (r.deposit / initialDeposit) * barMaxW;
    fill('mediumseagreen');
    noStroke();
    rect(barAreaLeft, y + 2, depW, bankH - 4, 3);

    // Reserve portion (darker)
    let resW = (r.reserve / initialDeposit) * barMaxW;
    fill('darkgreen');
    rect(barAreaLeft, y + 2, resW, bankH - 4, 3);

    // Labels on bars
    noStroke();
    fill('white');
    textSize(min(10, bankH - 8));
    textAlign(LEFT, CENTER);
    if (depW > 80) {
      text('$' + nf(r.deposit, 0, 0), barAreaLeft + 4, y + bankH / 2);
    }

    // Arrow to next bank
    if (i < currentRound - 1 && i < rounds.length - 1) {
      stroke('steelblue');
      strokeWeight(1);
      let arrowX = barAreaLeft + depW + 5;
      let arrowY = y + bankH / 2;
      // Small curved arrow to next row
      noFill();
      line(barAreaLeft + resW + (depW - resW) / 2, y + bankH - 2, barAreaLeft + (rounds[i + 1].deposit / initialDeposit) * barMaxW / 2, y + bankH + 2);
    }

    // Values to the right
    noStroke();
    textSize(10);
    textAlign(LEFT, CENTER);
    let infoX = barAreaRight + 8;
    fill('darkgreen');
    text('Res: $' + nf(r.reserve, 0, 0), infoX, y + bankH / 4);
    fill('steelblue');
    text('Loan: $' + nf(r.loan, 0, 0), infoX, y + 3 * bankH / 4);
  }

  // Running totals panel
  let totY = drawHeight - 130;
  let totalDeposits = 0;
  let totalReserves = 0;
  let totalLoans = 0;
  for (let i = 0; i < currentRound && i < rounds.length; i++) {
    totalDeposits += rounds[i].deposit;
    totalReserves += rounds[i].reserve;
    totalLoans += rounds[i].loan;
  }
  let multiplierAchieved = currentRound > 0 ? totalDeposits / initialDeposit : 0;
  let theoreticalMultiplier = 1 / reserveRatio;

  // Totals box
  stroke('silver');
  strokeWeight(1);
  fill(255, 255, 255, 200);
  rect(margin, totY, canvasWidth - 2 * margin, 120, 8);

  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  fill('black');
  text('Running Totals (after ' + currentRound + ' rounds):', margin + 10, totY + 8);

  textSize(13);
  let col1 = margin + 15;
  let col2 = canvasWidth / 2;
  fill('mediumseagreen');
  text('Total Deposits: $' + nf(totalDeposits, 0, 0), col1, totY + 30);
  fill('darkgreen');
  text('Total Reserves: $' + nf(totalReserves, 0, 0), col1, totY + 50);
  fill('steelblue');
  text('Total Loans: $' + nf(totalLoans, 0, 0), col1, totY + 70);

  fill('black');
  textSize(14);
  text('Money Multiplier: ' + nf(multiplierAchieved, 0, 2) + 'x', col2, totY + 30);
  fill('gray');
  textSize(12);
  text('Theoretical max: ' + nf(theoreticalMultiplier, 0, 1) + 'x', col2, totY + 50);

  // Headline result
  if (currentRound > 0) {
    fill('darkslateblue');
    textSize(13);
    text('Your $' + nf(initialDeposit, 0, 0) + ' became $' + nf(totalDeposits, 0, 0) + ' in the banking system!', col2, totY + 72);
  }

  // Formula display
  if (formulaCheckbox.checked()) {
    fill('indigo');
    textSize(13);
    textAlign(LEFT, TOP);
    text('Money Multiplier = 1 / Reserve Ratio = 1 / ' + nf(reserveRatio, 0, 2) + ' = ' + nf(theoreticalMultiplier, 0, 1), col1, totY + 96);
  }

  // Control labels
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Deposit: $' + nf(depositSlider.value(), 0, 0), 15, drawHeight + 18);
  text('Reserve: ' + reserveSlider.value() + '%', 310, drawHeight + 18);
  text('Speed:', 240, drawHeight + 52);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
  redraw();
}

function updateCanvasSize() {
  let container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  canvasHeight = drawHeight + controlHeight;
}
