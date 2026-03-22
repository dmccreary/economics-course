// Barriers to Entry Builder MicroSim
// Toggle barriers on/off and see resulting market structure
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Barrier types with their competition reduction effect
let barriers = [
  { name: 'Patents',         effect: 0.25, active: false, color: 'steelblue' },
  { name: 'High Startup $',  effect: 0.20, active: false, color: 'darkgreen' },
  { name: 'Network Effects', effect: 0.20, active: false, color: 'purple' },
  { name: 'Gov. License',    effect: 0.15, active: false, color: 'crimson' },
  { name: 'Economies/Scale', effect: 0.15, active: false, color: 'darkorange' },
  { name: 'Key Resource',    effect: 0.20, active: false, color: 'brown' }
];

let checkboxes = [];
let presetSelect;

// Firm display animation
let firms = [];
let targetFirmCount = 20;

// Presets
let presets = {
  'Custom': [],
  'Restaurant': [],
  'Streaming Service': [1, 2],
  'Pharmaceutical': [0, 1],
  'Electric Utility': [1, 3, 4]
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create checkboxes for each barrier
  for (let i = 0; i < barriers.length; i++) {
    let cb = createCheckbox(barriers[i].name, false);
    cb.position(10 + (i % 3) * 140, drawHeight + 5 + floor(i / 3) * 25);
    cb.style('font-size', '12px');
    cb.changed(() => {
      barriers[i].active = cb.checked();
      updateFirms();
    });
    checkboxes.push(cb);
  }

  // Preset select
  presetSelect = createSelect();
  presetSelect.position(10, drawHeight + 60);
  for (let key in presets) {
    presetSelect.option(key);
  }
  presetSelect.changed(applyPreset);
  presetSelect.style('font-size', '13px');

  // Reset button
  let resetBtn = createButton('Reset');
  resetBtn.position(140, drawHeight + 60);
  resetBtn.mousePressed(() => {
    for (let i = 0; i < barriers.length; i++) {
      barriers[i].active = false;
      checkboxes[i].checked(false);
    }
    presetSelect.selected('Custom');
    updateFirms();
  });

  // Initialize firms
  initFirms(20);

  describe('Barriers to entry simulator showing how market barriers affect competition and firm count', LABEL);
}

function initFirms(count) {
  firms = [];
  for (let i = 0; i < count; i++) {
    firms.push({
      x: random(100, canvasWidth - 100),
      y: random(80, drawHeight - 60),
      size: random(15, 25),
      targetSize: 20,
      color: color(random(100, 200), random(100, 200), random(100, 200))
    });
  }
}

function updateFirms() {
  let totalEffect = 0;
  for (let b of barriers) {
    if (b.active) totalEffect += b.effect;
  }
  totalEffect = min(totalEffect, 0.95);
  targetFirmCount = max(1, round(20 * (1 - totalEffect)));
}

function applyPreset() {
  let name = presetSelect.value();
  let indices = presets[name];

  // Clear all
  for (let i = 0; i < barriers.length; i++) {
    barriers[i].active = false;
    checkboxes[i].checked(false);
  }

  // Set preset barriers
  for (let idx of indices) {
    barriers[idx].active = true;
    checkboxes[idx].checked(true);
  }
  updateFirms();
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

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  text('Barriers to Entry Builder', canvasWidth / 2, 10);

  // Adjust firm count smoothly
  while (firms.length > targetFirmCount) {
    // Remove smallest firm
    let minIdx = 0;
    for (let i = 1; i < firms.length; i++) {
      if (firms[i].size < firms[minIdx].size) minIdx = i;
    }
    firms.splice(minIdx, 1);
  }
  while (firms.length < targetFirmCount) {
    firms.push({
      x: random(100, canvasWidth - 100),
      y: random(80, drawHeight - 80),
      size: 5,
      targetSize: 20,
      color: color(random(100, 200), random(100, 200), random(100, 200))
    });
  }

  // Calculate market share per firm
  let totalShare = 1.0;
  let sharePerFirm = totalShare / firms.length;
  // Dominant firm gets more if fewer firms
  let dominantShare = firms.length <= 3 ? 0.5 : sharePerFirm;

  // Update firm sizes based on count (fewer firms = bigger each)
  let maxSize = map(firms.length, 1, 20, 80, 20);
  for (let i = 0; i < firms.length; i++) {
    firms[i].targetSize = i === 0 && firms.length <= 3 ? maxSize * 1.5 : maxSize;
    firms[i].size = lerp(firms[i].size, firms[i].targetSize, 0.1);
    // Gentle random movement
    firms[i].x += random(-0.5, 0.5);
    firms[i].y += random(-0.5, 0.5);
    firms[i].x = constrain(firms[i].x, 60, canvasWidth - 60);
    firms[i].y = constrain(firms[i].y, 70, drawHeight - 60);
  }

  // Draw barrier wall visualization
  let activeBarriers = barriers.filter(b => b.active);
  if (activeBarriers.length > 0) {
    let wallThickness = map(activeBarriers.length, 1, 6, 5, 25);
    noFill();
    for (let i = 0; i < activeBarriers.length; i++) {
      stroke(activeBarriers[i].color);
      strokeWeight(3);
      let offset = i * 5;
      rect(45 + offset, 55 + offset, canvasWidth - 90 - offset * 2, drawHeight - 110 - offset * 2, 10);
    }
  }

  // Draw firms
  for (let f of firms) {
    fill(f.color);
    stroke('white');
    strokeWeight(1);
    circle(f.x, f.y, f.size);
  }

  // Competition meter
  let totalEffect = 0;
  for (let b of barriers) {
    if (b.active) totalEffect += b.effect;
  }
  totalEffect = min(totalEffect, 0.95);

  let meterX = canvasWidth - 50;
  let meterTop = 60;
  let meterHeight = drawHeight - 120;

  // Meter background
  noStroke();
  for (let y = 0; y < meterHeight; y++) {
    let t = y / meterHeight;
    let r = lerp(0, 220, t);
    let g = lerp(180, 50, t);
    fill(r, g, 50);
    rect(meterX - 15, meterTop + y, 30, 1);
  }

  // Meter indicator
  let indicatorY = meterTop + totalEffect * meterHeight;
  fill('white');
  stroke('black');
  strokeWeight(2);
  triangle(meterX - 20, indicatorY, meterX - 30, indicatorY - 6, meterX - 30, indicatorY + 6);

  // Meter labels
  noStroke();
  fill('black');
  textSize(10);
  textAlign(CENTER);
  text('More', meterX, meterTop - 8);
  text('Comp.', meterX, meterTop + 2);
  text('Less', meterX, meterTop + meterHeight + 10);
  text('Comp.', meterX, meterTop + meterHeight + 20);

  // Market structure label
  let structLabel;
  if (totalEffect < 0.15) structLabel = 'Perfect Competition';
  else if (totalEffect < 0.35) structLabel = 'Monopolistic Competition';
  else if (totalEffect < 0.65) structLabel = 'Oligopoly';
  else structLabel = 'Monopoly';

  noStroke();
  fill('black');
  textSize(15);
  textAlign(CENTER, TOP);
  text(structLabel, canvasWidth / 2 - 20, 38);
  textSize(13);
  fill('gray');
  text('Firms: ' + firms.length + '  |  Largest share: ' + nf(dominantShare * 100, 1, 0) + '%', canvasWidth / 2 - 20, 55);

  // Control area labels
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Preset:', 115, drawHeight + 72);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  for (let i = 0; i < sliders.length; i++) {
    // No sliders to resize, but reposition checkboxes
  }
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].position(10 + (i % 3) * 140, drawHeight + 5 + floor(i / 3) * 25);
  }
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
