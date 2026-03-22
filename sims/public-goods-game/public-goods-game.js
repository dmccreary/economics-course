// Public Goods Contribution Game MicroSim
// Free rider problem - choose how much to contribute to a public good

let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 55;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

let contributionSlider, submitBtn, play5Btn, resetBtn;
let numPlayers = 5;
let playerEndowment = 10;
let multiplier = 2;

let roundNum = 0;
let maxRounds = 10;
let history = []; // { contributions: [], payoffs: [] }
let gameActive = true;
let auto5Count = 0;

// AI strategies
let aiStrategies = ['generous', 'moderate', 'selfish', 'tit-for-tat'];

function aiContribute(strategyIdx, roundNum) {
  let s = aiStrategies[strategyIdx];
  if (s === 'generous') return floor(random(7, 10));
  if (s === 'moderate') return floor(random(4, 7));
  if (s === 'selfish') return floor(random(0, 3));
  if (s === 'tit-for-tat') {
    if (roundNum === 0) return 7;
    let lastPlayerContrib = history[history.length - 1].contributions[0];
    return constrain(lastPlayerContrib + floor(random(-1, 2)), 0, 10);
  }
  return 5;
}

function playRound(playerContrib) {
  if (!gameActive || roundNum >= maxRounds) return;

  let contributions = [playerContrib];
  for (let i = 0; i < numPlayers - 1; i++) {
    contributions.push(aiContribute(i, roundNum));
  }

  let totalContrib = contributions.reduce((a, b) => a + b, 0);
  let publicPool = totalContrib * multiplier;
  let share = publicPool / numPlayers;

  let payoffs = [];
  for (let i = 0; i < numPlayers; i++) {
    payoffs.push(playerEndowment - contributions[i] + share);
  }

  history.push({ contributions, payoffs, totalContrib, share });
  roundNum++;
  if (roundNum >= maxRounds) gameActive = false;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  contributionSlider = createSlider(0, 10, 5, 1);

  submitBtn = createButton('Submit Round');
  submitBtn.mousePressed(() => {
    if (gameActive) playRound(contributionSlider.value());
  });

  play5Btn = createButton('Play 5 Rounds');
  play5Btn.mousePressed(() => { auto5Count = 5; });

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => {
    roundNum = 0;
    history = [];
    gameActive = true;
    auto5Count = 0;
  });

  positionControls();
  describe('Public goods contribution game demonstrating the free rider problem', LABEL);
}

function positionControls() {
  let y = drawHeight + 12;
  contributionSlider.position(100, y);
  contributionSlider.size(120);
  submitBtn.position(230, y - 2);
  play5Btn.position(340, y - 2);
  resetBtn.position(canvasWidth - 60, y - 2);
}

function draw() {
  // Auto-play
  if (auto5Count > 0 && gameActive && frameCount % 15 === 0) {
    playRound(contributionSlider.value());
    auto5Count--;
  }

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(20);
  text('Public Goods Game', canvasWidth / 2, 6);
  textSize(12);
  fill('gray');
  text('The Free Rider Problem', canvasWidth / 2, 28);

  let playerContrib = contributionSlider.value();

  // Round info
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, TOP);
  text('Round: ' + (roundNum + (gameActive ? 1 : 0)) + ' / ' + maxRounds, 15, 48);

  // --- Player icons and public good ---
  let centerX = min(180, canvasWidth * 0.28);
  let centerY = 130;
  let radius = 60;
  let names = ['You', 'AI-1', 'AI-2', 'AI-3', 'AI-4'];
  let colors = ['steelblue', 'coral', 'mediumseagreen', 'mediumpurple', 'goldenrod'];

  // Public good in center
  let lastRound = history.length > 0 ? history[history.length - 1] : null;
  let quality = lastRound ? map(lastRound.totalContrib, 0, 50, 0, 100) : 0;

  // Park/public good circle
  let parkSize = map(quality, 0, 100, 25, 55);
  fill(0, 150, 0, map(quality, 0, 100, 50, 200));
  noStroke();
  circle(centerX, centerY, parkSize);
  fill('white');
  textSize(9);
  textAlign(CENTER, CENTER);
  text('Park', centerX, centerY - 5);
  text(nf(quality, 1, 0) + '%', centerX, centerY + 7);

  // Player circles
  for (let i = 0; i < numPlayers; i++) {
    let angle = -HALF_PI + (TWO_PI / numPlayers) * i;
    let px = centerX + cos(angle) * radius;
    let py = centerY + sin(angle) * radius;

    fill(colors[i]);
    noStroke();
    circle(px, py, 30);
    fill('white');
    textSize(8);
    textAlign(CENTER, CENTER);
    text(names[i], px, py);

    // Show last contribution
    if (lastRound) {
      fill('black');
      textSize(9);
      noStroke();
      textAlign(CENTER, CENTER);
      text('$' + lastRound.contributions[i], px, py + 20);
    }
  }

  // --- Results panel ---
  let panelX = min(310, canvasWidth * 0.5);
  let panelY = 50;

  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Your Contribution: $' + playerContrib, panelX, panelY);

  if (lastRound) {
    panelY += 25;
    textSize(12);
    text('Last Round Results:', panelX, panelY);

    panelY += 18;
    text('Total pool: $' + lastRound.totalContrib, panelX, panelY);
    panelY += 16;
    text('After doubling: $' + (lastRound.totalContrib * multiplier), panelX, panelY);
    panelY += 16;
    text('Your share: $' + nf(lastRound.share, 1, 1), panelX, panelY);

    panelY += 22;
    fill('steelblue');
    textSize(13);
    text('Your payoff: $' + nf(lastRound.payoffs[0], 1, 1), panelX, panelY);

    // What-if
    panelY += 25;
    fill('gray');
    textSize(11);
    let freeRidePayoff = playerEndowment + lastRound.share - lastRound.contributions[0];
    // If you had contributed 0
    let poolWithout = (lastRound.totalContrib - lastRound.contributions[0]) * multiplier;
    let freeRide = playerEndowment + poolWithout / numPlayers;
    text('If you gave $0: $' + nf(freeRide, 1, 1), panelX, panelY);

    panelY += 15;
    text('If everyone gave $10: $' + nf(playerEndowment + 10 * numPlayers * multiplier / numPlayers - 10, 1, 0), panelX, panelY);
    panelY += 15;
    text('If everyone gave $0: $' + nf(playerEndowment, 1, 0), panelX, panelY);
  } else {
    panelY += 30;
    textSize(12);
    fill('gray');
    text('Each player has $10.', panelX, panelY);
    panelY += 18;
    text('Contributions are doubled', panelX, panelY);
    panelY += 15;
    text('and split equally among', panelX, panelY);
    panelY += 15;
    text('all ' + numPlayers + ' players.', panelX, panelY);
  }

  // --- History chart (contribution bars) ---
  let chartY = 220;
  let chartH = 90;
  let chartX = 15;
  let chartW = canvasWidth - 30;

  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, TOP);
  text('Round History - Your Payoff', chartX, chartY);

  if (history.length > 0) {
    let barW = min(30, (chartW - 20) / maxRounds);
    for (let r = 0; r < history.length; r++) {
      let x = chartX + 10 + r * (barW + 3);
      let payoff = history[r].payoffs[0];
      let barH = map(payoff, 0, 30, 0, chartH - 15);

      fill(payoff >= playerEndowment ? 'steelblue' : 'coral');
      noStroke();
      rect(x, chartY + chartH - barH + 15, barW, barH, 2);

      fill('black');
      textSize(8);
      textAlign(CENTER, TOP);
      text(nf(payoff, 1, 1), x + barW / 2, chartY + chartH + 17);
      text('R' + (r + 1), x + barW / 2, chartY + chartH + 28);
    }

    // Total
    let totalPayoff = history.reduce((sum, r) => sum + r.payoffs[0], 0);
    noStroke();
    fill('black');
    textSize(12);
    textAlign(LEFT, TOP);
    text('Total earnings: $' + nf(totalPayoff, 1, 1), chartX, chartY + chartH + 43);
  }

  // --- Scoreboard ---
  let sbY = chartY + chartH + 65;
  if (history.length > 0) {
    noStroke();
    fill('black');
    textSize(12);
    textAlign(LEFT, TOP);
    text('Player Totals:', 15, sbY);

    for (let i = 0; i < numPlayers; i++) {
      let total = history.reduce((sum, r) => sum + r.payoffs[i], 0);
      fill(colors[i]);
      textSize(11);
      text(names[i] + ': $' + nf(total, 1, 1), 15 + (i % 3) * (canvasWidth / 3), sbY + 18 + floor(i / 3) * 16);
    }
  }

  // Game over
  if (!gameActive) {
    noStroke();
    fill('red');
    textSize(16);
    textAlign(CENTER, CENTER);
    text('Game Over! Press Reset to play again.', canvasWidth / 2, drawHeight - 20);
  }

  // Control label
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Give: $' + playerContrib, 10, drawHeight + 20);
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
