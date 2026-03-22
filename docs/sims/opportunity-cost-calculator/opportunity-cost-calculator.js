// Opportunity Cost Calculator MicroSim
// Input two choices with time and money costs, calculate true opportunity cost
// MicroSim template version 2026.03

let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 130;

// Controls
let wageSlider;
let calcButton, resetButton;

// Choice data
let choiceA = { name: 'Go to Movie', hours: 3, cost: 15, enjoyment: 7 };
let choiceB = { name: 'Work Extra Shift', hours: 3, cost: 0, enjoyment: 4 };

// State
let calculated = false;
let animProgress = 0;
let animating = false;

// Input elements
let nameAInput, nameBInput;
let hoursASlider, hoursBSlider;
let costASlider, costBSlider;
let enjoyASlider, enjoyBSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  let y = drawHeight + 8;
  let col2 = canvasWidth / 2;

  wageSlider = createSlider(8, 30, 15, 1);
  wageSlider.position(sliderLeftMargin, y);
  wageSlider.size(canvasWidth - sliderLeftMargin - margin - 80);

  calcButton = createButton('Calculate');
  calcButton.position(canvasWidth - 160, y + 30);
  calcButton.mousePressed(doCalculate);

  resetButton = createButton('Reset');
  resetButton.position(canvasWidth - 80, y + 30);
  resetButton.mousePressed(doReset);

  // Choice A controls
  hoursASlider = createSlider(1, 8, 3, 0.5);
  hoursASlider.position(margin + 100, 130);
  hoursASlider.size(canvasWidth / 2 - margin - 120);

  costASlider = createSlider(0, 100, 15, 1);
  costASlider.position(margin + 100, 170);
  costASlider.size(canvasWidth / 2 - margin - 120);

  enjoyASlider = createSlider(1, 10, 7, 1);
  enjoyASlider.position(margin + 100, 210);
  enjoyASlider.size(canvasWidth / 2 - margin - 120);

  // Choice B controls
  hoursBSlider = createSlider(1, 8, 3, 0.5);
  hoursBSlider.position(col2 + 100, 130);
  hoursBSlider.size(canvasWidth / 2 - margin - 120);

  costBSlider = createSlider(0, 100, 0, 1);
  costBSlider.position(col2 + 100, 170);
  costBSlider.size(canvasWidth / 2 - margin - 120);

  enjoyBSlider = createSlider(1, 10, 4, 1);
  enjoyBSlider.position(col2 + 100, 210);
  enjoyBSlider.size(canvasWidth / 2 - margin - 120);

  describe('Opportunity cost calculator showing the true cost of decisions including foregone alternatives', LABEL);
}

function doCalculate() {
  calculated = true;
  animProgress = 0;
  animating = true;
}

function doReset() {
  calculated = false;
  animProgress = 0;
  animating = false;
}

function draw() {
  // Draw areas
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Animate
  if (animating && animProgress < 1) {
    animProgress += 0.02;
    if (animProgress >= 1) {
      animProgress = 1;
      animating = false;
    }
  }

  // Read slider values
  let wage = wageSlider.value();
  choiceA.hours = hoursASlider.value();
  choiceA.cost = costASlider.value();
  choiceA.enjoyment = enjoyASlider.value();
  choiceB.hours = hoursBSlider.value();
  choiceB.cost = costBSlider.value();
  choiceB.enjoyment = enjoyBSlider.value();

  // Title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(18);
  text('Opportunity Cost Calculator', canvasWidth / 2, 10);

  textSize(12);
  fill('darkslategray');
  text('True cost = Direct cost + Value of best alternative foregone', canvasWidth / 2, 34);

  let col2 = canvasWidth / 2;

  // Choice cards
  drawChoiceCard(margin, 60, canvasWidth / 2 - margin - 5, 'Choice A: ' + choiceA.name,
    choiceA, 'cornflowerblue');
  drawChoiceCard(col2 + 5, 60, canvasWidth / 2 - margin - 5, 'Choice B: ' + choiceB.name,
    choiceB, 'coral');

  // Draw slider labels over the sliders
  noStroke();
  fill('black');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Hours: ' + choiceA.hours, margin + 10, 140);
  text('Cost: $' + choiceA.cost, margin + 10, 180);
  text('Fun: ' + choiceA.enjoyment + '/10', margin + 10, 220);

  text('Hours: ' + choiceB.hours, col2 + 15, 140);
  text('Cost: $' + choiceB.cost, col2 + 15, 180);
  text('Fun: ' + choiceB.enjoyment + '/10', col2 + 15, 220);

  // Results section
  if (calculated) {
    drawResults(wage);
  } else {
    noStroke();
    fill('gray');
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Set your choices above, then click Calculate', canvasWidth / 2, 350);
    text('to reveal the true opportunity cost!', canvasWidth / 2, 370);
  }

  // Control area labels
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Hourly Wage: $' + wage, 10, drawHeight + 18);

  textSize(10);
  fill('gray');
  text('Your wage determines the value of your time', 10, drawHeight + 70);
}

function drawChoiceCard(x, y, w, title, choice, col) {
  // Card background
  stroke(col);
  strokeWeight(2);
  fill('white');
  rect(x, y, w, 190, 8);

  // Card title
  noStroke();
  fill(col);
  textAlign(CENTER, TOP);
  textSize(13);
  text(title, x + w / 2, y + 8);

  // Divider
  stroke(col);
  strokeWeight(1);
  line(x + 10, y + 28, x + w - 10, y + 28);
}

function drawResults(wage) {
  let y = 260;
  let prog = animProgress;

  // Calculate opportunity costs
  let timeValueA = choiceA.hours * wage;
  let timeValueB = choiceB.hours * wage;

  // If choosing A, you give up what B offers
  let directCostA = choiceA.cost;
  let foregoneEarningsA = choiceB.hours > 0 ? timeValueB : 0;
  let trueCostA = directCostA + timeValueA;

  // If choosing B, you give up what A offers
  let directCostB = choiceB.cost;
  let foregoneEarningsB = choiceA.hours > 0 ? timeValueA : 0;
  let trueCostB = directCostB + timeValueB;

  // The opportunity cost of A = direct cost of A + best foregone alternative (B's net value)
  let netValueB = (choiceB.enjoyment * 5) - choiceB.cost + (choiceB.hours * wage * 0);
  let netValueA = (choiceA.enjoyment * 5) - choiceA.cost + (choiceA.hours * wage * 0);

  let oppCostA = directCostA + timeValueA;
  let oppCostB = directCostB + timeValueB;

  // Background for results
  noStroke();
  fill(240, 248, 255, prog * 255);
  rect(margin, y, canvasWidth - 2 * margin, 230, 8);
  stroke('silver');
  strokeWeight(1);
  noFill();
  rect(margin, y, canvasWidth - 2 * margin, 230, 8);

  noStroke();
  fill(0, 0, 0, prog * 255);
  textAlign(CENTER, TOP);
  textSize(15);
  text('Opportunity Cost Breakdown', canvasWidth / 2, y + 8);

  let col2 = canvasWidth / 2;
  let leftX = margin + 10;
  let rightX = col2 + 10;
  let rowH = 22;
  let startY = y + 35;

  textSize(12);
  textAlign(LEFT, TOP);

  // Choice A breakdown
  fill(0, 0, 139, prog * 255);
  textSize(13);
  text('If you choose A:', leftX, startY);
  fill(0, 0, 0, prog * 255);
  textSize(11);

  let step1Alpha = constrain(prog * 4, 0, 1) * 255;
  let step2Alpha = constrain((prog - 0.25) * 4, 0, 1) * 255;
  let step3Alpha = constrain((prog - 0.5) * 4, 0, 1) * 255;
  let step4Alpha = constrain((prog - 0.75) * 4, 0, 1) * 255;

  fill(0, 0, 0, step1Alpha);
  text('Direct cost: $' + directCostA, leftX + 5, startY + rowH);
  fill(0, 0, 0, step2Alpha);
  text('Time value: ' + choiceA.hours + 'h x $' + wage + ' = $' + timeValueA, leftX + 5, startY + rowH * 2);
  fill(0, 0, 0, step3Alpha);
  stroke(0, 0, 0, step3Alpha);
  strokeWeight(1);
  line(leftX + 5, startY + rowH * 3 + 2, leftX + 180, startY + rowH * 3 + 2);
  noStroke();
  fill('crimson');
  let a4 = step4Alpha / 255;
  fill(220, 20, 60, step4Alpha);
  textSize(13);
  text('True Cost: $' + oppCostA, leftX + 5, startY + rowH * 3 + 5);

  // Choice B breakdown
  textSize(13);
  fill(0, 0, 139, prog * 255);
  text('If you choose B:', rightX, startY);
  fill(0, 0, 0, prog * 255);
  textSize(11);

  fill(0, 0, 0, step1Alpha);
  text('Direct cost: $' + directCostB, rightX + 5, startY + rowH);
  fill(0, 0, 0, step2Alpha);
  text('Time value: ' + choiceB.hours + 'h x $' + wage + ' = $' + timeValueB, rightX + 5, startY + rowH * 2);
  fill(0, 0, 0, step3Alpha);
  stroke(0, 0, 0, step3Alpha);
  strokeWeight(1);
  line(rightX + 5, startY + rowH * 3 + 2, rightX + 180, startY + rowH * 3 + 2);
  noStroke();
  fill(220, 20, 60, step4Alpha);
  textSize(13);
  text('True Cost: $' + oppCostB, rightX + 5, startY + rowH * 3 + 5);

  // Verdict
  if (prog >= 1) {
    let verdictY = startY + rowH * 5;
    noStroke();
    textAlign(CENTER, TOP);

    // Compare enjoyment per dollar of true cost
    let valueA = choiceA.enjoyment / max(oppCostA, 1);
    let valueB = choiceB.enjoyment / max(oppCostB, 1);

    fill('darkgreen');
    textSize(13);
    text('Value per dollar: A = ' + nf(valueA, 1, 2) + '/10  |  B = ' + nf(valueB, 1, 2) + '/10', canvasWidth / 2, verdictY);

    fill('darkslategray');
    textSize(12);
    if (valueA > valueB) {
      text('Choice A gives more enjoyment per true dollar spent!', canvasWidth / 2, verdictY + 22);
    } else if (valueB > valueA) {
      text('Choice B gives more enjoyment per true dollar spent!', canvasWidth / 2, verdictY + 22);
    } else {
      text('Both choices offer equal value per dollar!', canvasWidth / 2, verdictY + 22);
    }

    fill('gray');
    textSize(10);
    text('Remember: Opportunity cost includes what you give up, not just what you pay!', canvasWidth / 2, verdictY + 44);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);

  let col2 = canvasWidth / 2;
  let slW = canvasWidth / 2 - margin - 120;

  wageSlider.position(sliderLeftMargin, drawHeight + 8);
  wageSlider.size(canvasWidth - sliderLeftMargin - margin - 80);
  calcButton.position(canvasWidth - 160, drawHeight + 38);
  resetButton.position(canvasWidth - 80, drawHeight + 38);

  hoursASlider.position(margin + 100, 130);
  hoursASlider.size(slW);
  costASlider.position(margin + 100, 170);
  costASlider.size(slW);
  enjoyASlider.position(margin + 100, 210);
  enjoyASlider.size(slW);

  hoursBSlider.position(col2 + 100, 130);
  hoursBSlider.size(slW);
  costBSlider.position(col2 + 100, 170);
  costBSlider.size(slW);
  enjoyBSlider.position(col2 + 100, 210);
  enjoyBSlider.size(slW);

  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasHeight = drawHeight + controlHeight;
}
