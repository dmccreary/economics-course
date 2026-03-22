// Negative Externality Visualizer MicroSim
// Shows how production creates external costs that spill over to third parties
// Demonstrates the gap between private cost and social cost

let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 130;

// Simulation state
let production = 50;
let showSocialCost = false;
let showOptimal = false;
let externType = 'Pollution';

// Controls
let productionSlider;
let socialToggle, optimalBtn;
let typeSelect;

// People positions (generated once)
let people = [];
let numPeople = 24;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  productionSlider = createSlider(0, 100, production, 1);
  productionSlider.position(sliderLeftMargin, drawHeight + 8);
  productionSlider.size(canvasWidth - sliderLeftMargin - margin);

  socialToggle = createCheckbox('Show Social Cost', false);
  socialToggle.position(10, drawHeight + 35);
  socialToggle.style('font-size', '12px');

  optimalBtn = createButton('Show Optimal Level');
  optimalBtn.position(160, drawHeight + 35);
  optimalBtn.mousePressed(() => { showOptimal = !showOptimal; });
  optimalBtn.style('font-size', '12px');

  typeSelect = createSelect();
  typeSelect.position(10, drawHeight + 60);
  typeSelect.option('Pollution');
  typeSelect.option('Noise');
  typeSelect.option('Traffic');
  typeSelect.style('font-size', '12px');

  // Generate people positions in a ring around factory
  for (let i = 0; i < numPeople; i++) {
    let angle = (TWO_PI / numPeople) * i + random(-0.15, 0.15);
    let dist = random(100, 170);
    people.push({ angle: angle, dist: dist });
  }

  describe('Negative externality visualizer showing how factory production creates costs for surrounding community', LABEL);
}

function draw() {
  production = productionSlider.value();
  showSocialCost = socialToggle.checked();
  externType = typeSelect.value();

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
  textSize(16);
  text('Negative Externality: ' + externType, canvasWidth / 2, 6);

  // Scene area
  let sceneX = canvasWidth / 2;
  let sceneY = 210;

  // Draw pollution cloud (before factory so it appears behind)
  let cloudRadius = map(production, 0, 100, 10, 180);
  let cloudAlpha;
  if (externType === 'Pollution') {
    for (let r = cloudRadius; r > 0; r -= 8) {
      cloudAlpha = map(r, 0, cloudRadius, 60, 5);
      fill(100, 100, 100, cloudAlpha);
      noStroke();
      ellipse(sceneX, sceneY - 20, r * 2.2, r * 1.6);
    }
  } else if (externType === 'Noise') {
    // Sound waves
    for (let r = 30; r < cloudRadius; r += 20) {
      noFill();
      stroke(200, 100, 50, map(r, 30, cloudRadius, 120, 20));
      strokeWeight(2);
      arc(sceneX, sceneY, r * 2, r * 2, -PI / 3, PI / 3);
      arc(sceneX, sceneY, r * 2, r * 2, PI - PI / 3, PI + PI / 3);
    }
  } else if (externType === 'Traffic') {
    // Congestion lines
    for (let i = 0; i < production / 10; i++) {
      let lx = sceneX + random(-cloudRadius, cloudRadius);
      let ly = sceneY + random(-cloudRadius * 0.5, cloudRadius * 0.5);
      fill(150, 50, 50, 60);
      noStroke();
      rect(lx - 8, ly - 3, 16, 6, 2);
    }
  }

  // Factory
  fill('gray');
  noStroke();
  rect(sceneX - 30, sceneY - 30, 60, 50);
  // Chimney
  fill('darkgray');
  rect(sceneX - 8, sceneY - 55, 16, 25);
  // Smoke from chimney proportional to production
  if (production > 0) {
    for (let i = 0; i < production / 15; i++) {
      let smokeY = sceneY - 55 - i * 10 - (frameCount * 0.5 % 20);
      let smokeAlpha = map(i, 0, 7, 100, 20);
      fill(120, 120, 120, smokeAlpha);
      noStroke();
      ellipse(sceneX + sin(frameCount * 0.03 + i) * 8, smokeY, 12 + i * 3, 8 + i * 2);
    }
  }

  // Factory label
  noStroke();
  fill('white');
  textSize(10);
  textAlign(CENTER, CENTER);
  text('Factory', sceneX, sceneY - 5);

  // Draw people
  for (let i = 0; i < numPeople; i++) {
    let p = people[i];
    let px = sceneX + cos(p.angle) * p.dist;
    let py = sceneY + sin(p.angle) * p.dist * 0.6;

    // Check if affected by externality
    let distFromFactory = dist(px, py, sceneX, sceneY);
    let affected = distFromFactory < cloudRadius;

    // Person (stick figure style)
    let personColor = affected ? 'red' : 'green';
    fill(personColor);
    noStroke();
    circle(px, py - 8, 10); // head

    // Expression
    fill('white');
    textSize(6);
    textAlign(CENTER, CENTER);
    if (affected) {
      text(':(', px, py - 8);
    } else {
      text(':)', px, py - 8);
    }

    // Body
    stroke(personColor);
    strokeWeight(1.5);
    line(px, py - 3, px, py + 6);
    // Arms
    line(px - 5, py + 2, px + 5, py + 2);
    // Legs
    line(px, py + 6, px - 4, py + 12);
    line(px, py + 6, px + 4, py + 12);
  }

  // Count affected
  let affectedCount = 0;
  for (let p of people) {
    let px = sceneX + cos(p.angle) * p.dist;
    let py = sceneY + sin(p.angle) * p.dist * 0.6;
    if (dist(px, py, sceneX, sceneY) < cloudRadius) affectedCount++;
  }

  // Cost calculations
  let privateCost = production * 0.5;
  let externalCost = production * production * 0.01; // quadratic growth
  let socialCost = privateCost + externalCost;
  let optimalLevel = 35; // approximate socially optimal production

  // Cost display panel
  let panelY = drawHeight - 115;
  fill(255, 255, 255, 220);
  noStroke();
  rect(10, panelY, canvasWidth - 20, 108, 6);
  stroke('silver');
  strokeWeight(1);
  noFill();
  rect(10, panelY, canvasWidth - 20, 108, 6);

  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  fill('black');
  text('Production Level: ' + production + ' units', 20, panelY + 6);
  text('People Affected: ' + affectedCount + ' / ' + numPeople, 20, panelY + 22);

  fill('steelblue');
  text('Private Cost: $' + nf(privateCost, 1, 0) + 'M', 20, panelY + 40);

  if (showSocialCost) {
    fill('red');
    text('External Cost: $' + nf(externalCost, 1, 0) + 'M', 20, panelY + 56);
    fill('darkred');
    textSize(13);
    text('True Social Cost: $' + nf(socialCost, 1, 0) + 'M', 20, panelY + 74);

    textSize(11);
    fill('crimson');
    text('Gap: $' + nf(externalCost, 1, 0) + 'M in unpaid costs to society!', 20, panelY + 92);
  } else {
    fill('gray');
    textSize(11);
    text('Toggle "Show Social Cost" to see the full picture', 20, panelY + 56);
  }

  // Optimal level indicator
  if (showOptimal) {
    fill(0, 150, 0, 200);
    noStroke();
    textSize(11);
    textAlign(RIGHT, TOP);
    text('Optimal production: ~' + optimalLevel + ' units', canvasWidth - 20, panelY + 6);
    if (production > optimalLevel) {
      fill('red');
      text('Overproducing by ' + (production - optimalLevel) + ' units!', canvasWidth - 20, panelY + 20);
    } else {
      fill('green');
      text('At or below social optimum', canvasWidth - 20, panelY + 20);
    }
  }

  // Control labels
  noStroke();
  fill('black');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Production: ' + production, 10, drawHeight + 16);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  productionSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasHeight = drawHeight + controlHeight;
}
