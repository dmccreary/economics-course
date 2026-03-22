// Marginal Utility Satisfaction Meter MicroSim
// Eat ice cream cones and watch marginal utility decline
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

let conesEaten = 0;
let maxCones = 7;
let eatBtn, resetBtn;
let showChart = true;
let chartCheck;

// Utils per cone (diminishing)
let muValues = [50, 35, 22, 12, 5, 0, -8];

function totalUtility() {
  let total = 0;
  for (let i = 0; i < conesEaten; i++) total += muValues[i];
  return total;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  eatBtn = createButton('Eat Another Cone');
  eatBtn.position(10, drawHeight + 10);
  eatBtn.mousePressed(() => { if (conesEaten < maxCones) conesEaten++; });

  resetBtn = createButton('Start Over');
  resetBtn.position(145, drawHeight + 10);
  resetBtn.mousePressed(() => { conesEaten = 0; });

  chartCheck = createCheckbox('Show Chart', true);
  chartCheck.position(240, drawHeight + 10);
  chartCheck.style('font-size', '12px');
  chartCheck.changed(() => { showChart = chartCheck.checked(); });

  describe('Marginal utility meter showing diminishing satisfaction from consuming additional ice cream cones', LABEL);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let tu = totalUtility();
  let mu = conesEaten > 0 ? muValues[conesEaten - 1] : 0;

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Marginal Utility Meter', canvasWidth / 2, 8);

  // Satisfaction gauge
  let gaugeX = canvasWidth / 2;
  let gaugeY = 85;
  let gaugeR = 55;

  // Background arc
  stroke(220);
  strokeWeight(12);
  noFill();
  arc(gaugeX, gaugeY, gaugeR * 2, gaugeR * 2, PI, TWO_PI);

  // Colored arc based on total utility
  let maxTU = 130;
  let gaugeAngle = map(constrain(tu, -10, maxTU), -10, maxTU, PI, TWO_PI);
  let gaugeColor = tu > 80 ? color('green') : tu > 40 ? color('gold') : tu > 0 ? color('orange') : color('red');
  stroke(gaugeColor);
  strokeWeight(12);
  arc(gaugeX, gaugeY, gaugeR * 2, gaugeR * 2, PI, gaugeAngle);

  // Value display
  noStroke();
  fill('black');
  textSize(10);
  textAlign(CENTER, CENTER);
  text('Total Utility', gaugeX, gaugeY - 10);
  textSize(24);
  fill(gaugeColor);
  text(tu, gaugeX, gaugeY + 12);

  // Ice cream cone visuals
  let coneY = 155;
  let coneSpacing = (canvasWidth - 40) / maxCones;

  for (let i = 0; i < maxCones; i++) {
    let cx = 20 + i * coneSpacing + coneSpacing / 2;
    let eaten = i < conesEaten;

    // Cone
    fill(eaten ? 200 : 220, eaten ? 170 : 180, eaten ? 100 : 120);
    noStroke();
    triangle(cx - 10, coneY + 10, cx + 10, coneY + 10, cx, coneY + 35);

    // Ice cream scoop
    if (!eaten) {
      fill(255, 220, 230);
      noStroke();
      circle(cx, coneY + 5, 22);
      fill(255, 180, 200);
      circle(cx - 3, coneY + 2, 6);
    } else {
      // Empty cone
      fill(180, 150, 90);
      noStroke();
      circle(cx, coneY + 8, 14);
    }

    // MU label below
    noStroke();
    fill(eaten ? (muValues[i] >= 0 ? 'green' : 'red') : 'gray');
    textSize(9);
    textAlign(CENTER, TOP);
    if (eaten || i === conesEaten) {
      let sign = muValues[i] >= 0 ? '+' : '';
      text('MU: ' + sign + muValues[i], cx, coneY + 38);
    }
  }

  // Stats display
  let statY = coneY + 58;
  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Cones Eaten: ' + conesEaten, canvasWidth / 2, statY);

  if (conesEaten > 0) {
    textSize(13);
    fill(mu >= 0 ? 'green' : 'red');
    text('Marginal Utility of Last Cone: ' + (mu >= 0 ? '+' : '') + mu + ' utils', canvasWidth / 2, statY + 20);
  }

  // Bar chart (if enabled)
  if (showChart && conesEaten > 0) {
    let chartY = statY + 50;
    let chartH = 100;
    let chartBottom = chartY + chartH;
    let barW = (canvasWidth - 80) / maxCones - 4;
    let maxVal = 55;

    noStroke();
    fill('black');
    textSize(11);
    textAlign(CENTER, TOP);
    text('Marginal Utility per Cone', canvasWidth / 2, chartY - 15);

    // Zero line
    let zeroY = map(0, -10, maxVal, chartBottom, chartY);
    stroke(200);
    strokeWeight(0.5);
    line(40, zeroY, canvasWidth - 40, zeroY);

    // Bars
    for (let i = 0; i < maxCones; i++) {
      let bx = 40 + i * (barW + 4);

      if (i < conesEaten) {
        let v = muValues[i];
        if (v >= 0) {
          let barTop = map(v, 0, maxVal, zeroY, chartY);
          fill(lerpColor(color('green'), color('gold'), map(i, 0, maxCones - 1, 0, 1)));
          noStroke();
          rect(bx, barTop, barW, zeroY - barTop, 2, 2, 0, 0);
        } else {
          let barBot = map(v, -10, 0, chartBottom, zeroY);
          fill('crimson');
          noStroke();
          rect(bx, zeroY, barW, barBot - zeroY, 0, 0, 2, 2);
        }

        // Label
        fill('black');
        textSize(9);
        textAlign(CENTER, BOTTOM);
        text(v, bx + barW / 2, v >= 0 ? map(v, 0, maxVal, zeroY, chartY) - 2 : zeroY - 2);
      } else {
        fill(235);
        noStroke();
        rect(bx, map(muValues[i], 0, maxVal, zeroY, chartY), barW, zeroY - map(muValues[i], 0, maxVal, zeroY, chartY), 2, 2, 0, 0);
      }

      // Cone number
      noStroke();
      fill('gray');
      textSize(8);
      textAlign(CENTER, TOP);
      text('#' + (i + 1), bx + barW / 2, chartBottom + 2);
    }
  }

  // Commentary
  let commentY = drawHeight - 25;
  noStroke();
  fill('darkblue');
  textSize(11);
  textAlign(CENTER, CENTER);
  let comment;
  if (conesEaten === 0) comment = 'You\'re craving ice cream! Click to eat your first cone.';
  else if (conesEaten === 1) comment = 'Delicious! Each util represents a unit of satisfaction.';
  else if (conesEaten <= 3) comment = 'Still enjoyable, but notice the declining MU.';
  else if (conesEaten <= 5) comment = 'Getting full... MU is shrinking fast.';
  else if (conesEaten === 6) comment = 'Zero marginal utility — this cone adds nothing!';
  else comment = 'Negative utility! You actually feel WORSE. Brain freeze!';
  text(comment, canvasWidth / 2, commentY);
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
