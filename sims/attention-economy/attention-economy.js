// Attention Economy Calculator MicroSim
// Shows economic value of user attention on "free" platforms
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Platform data: name, color, revenue per minute ($)
let platforms = [
  { name: 'TikTok',    color: 'black',       rpm: 0.04, minutes: 45 },
  { name: 'Instagram', color: 'purple',      rpm: 0.03, minutes: 30 },
  { name: 'YouTube',   color: 'red',         rpm: 0.05, minutes: 40 },
  { name: 'Snapchat',  color: 'gold',        rpm: 0.02, minutes: 15 },
  { name: 'Other',     color: 'gray',        rpm: 0.02, minutes: 10 }
];

let sliders = [];
let calcButton;
let showResults = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create sliders for each platform
  for (let i = 0; i < platforms.length; i++) {
    let row = createDiv();
    row.position(10, drawHeight + 5 + i * 0); // positioned in draw via manual layout
    row.style('display', 'none'); // we draw labels manually

    let sl = createSlider(0, 180, platforms[i].minutes, 5);
    sl.position(140, drawHeight + 5);
    sl.size(canvasWidth - 140 - margin);
    sliders.push(sl);
  }

  // We only show one slider at a time - use a select to pick platform
  // Actually, let's use a compact layout: all sliders stacked
  // Recalculate: we need more control space
  controlHeight = platforms.length * 28 + 40;
  canvasHeight = drawHeight + controlHeight;
  resizeCanvas(canvasWidth, canvasHeight);

  // Reposition sliders
  for (let i = 0; i < sliders.length; i++) {
    sliders[i].position(130, drawHeight + 5 + i * 28);
    sliders[i].size(canvasWidth - 130 - margin);
  }

  calcButton = createButton('Calculate My Value');
  calcButton.position(10, drawHeight + 5 + platforms.length * 28 + 5);
  calcButton.mousePressed(() => { showResults = true; });

  describe('Attention economy calculator showing how platforms monetize user time through advertising', LABEL);
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
  text('Attention Economy Calculator', canvasWidth / 2, 10);

  textSize(13);
  fill('gray');
  text('How much is your attention worth to advertisers?', canvasWidth / 2, 36);

  // Calculate totals
  let totalMinutes = 0;
  let totalRevenue = 0;
  let platformRevenues = [];
  for (let i = 0; i < platforms.length; i++) {
    let mins = sliders[i].value();
    let rev = mins * platforms[i].rpm;
    totalMinutes += mins;
    totalRevenue += rev;
    platformRevenues.push({ name: platforms[i].name, mins: mins, rev: rev, color: platforms[i].color });
  }

  let totalHours = totalMinutes / 60;
  let annualRevenue = totalRevenue * 365;
  let annualHours = totalHours * 365;

  // Draw slider labels in control area
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  for (let i = 0; i < platforms.length; i++) {
    fill(platforms[i].color);
    let yPos = drawHeight + 15 + i * 28;
    text(platforms[i].name + ': ' + sliders[i].value() + 'm', 10, yPos);
  }

  // Visualization area
  let vizTop = 60;
  let vizLeft = 30;
  let vizRight = canvasWidth - 30;
  let barAreaWidth = (vizRight - vizLeft);

  if (showResults) {
    // Bar chart of daily time per platform
    textSize(14);
    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    text('Daily Time by Platform', vizLeft, vizTop);

    let barTop = vizTop + 22;
    let barHeight = 22;
    let maxMins = max(180, totalMinutes);

    for (let i = 0; i < platformRevenues.length; i++) {
      let p = platformRevenues[i];
      let bw = map(p.mins, 0, maxMins, 0, barAreaWidth - 80);
      fill(p.color);
      noStroke();
      rect(vizLeft, barTop + i * (barHeight + 4), bw, barHeight, 3);
      fill('black');
      textSize(11);
      textAlign(LEFT, CENTER);
      text(p.mins + ' min ($' + p.rev.toFixed(2) + '/day)', vizLeft + bw + 5, barTop + i * (barHeight + 4) + barHeight / 2);
    }

    // Summary stats
    let summaryTop = barTop + platforms.length * (barHeight + 4) + 20;

    fill('black');
    textSize(16);
    textAlign(LEFT, TOP);
    noStroke();
    text('Daily Summary', vizLeft, summaryTop);

    textSize(14);
    summaryTop += 24;
    text('Total screen time: ' + nf(totalHours, 1, 1) + ' hours/day', vizLeft, summaryTop);
    summaryTop += 22;
    text('Ad revenue generated: $' + totalRevenue.toFixed(2) + '/day', vizLeft, summaryTop);
    summaryTop += 22;

    // Annual projection
    fill('darkred');
    textSize(16);
    summaryTop += 10;
    text('Your Annual Attention Value', vizLeft, summaryTop);

    textSize(14);
    fill('black');
    summaryTop += 24;
    text('Annual hours on platforms: ' + nf(annualHours, 1, 0), vizLeft, summaryTop);
    summaryTop += 22;
    text('Annual ad revenue you generate: $' + nf(annualRevenue, 1, 2), vizLeft, summaryTop);
    summaryTop += 22;

    // Opportunity cost
    fill('darkblue');
    textSize(16);
    summaryTop += 10;
    text('Opportunity Cost', vizLeft, summaryTop);
    textSize(14);
    fill('black');
    summaryTop += 24;
    let booksPerYear = floor(annualHours / 6);
    let skillHours = floor(annualHours);
    text('You could read ~' + booksPerYear + ' books instead', vizLeft, summaryTop);
    summaryTop += 20;
    text('Or spend ' + skillHours + ' hours learning a new skill', vizLeft, summaryTop);
    summaryTop += 20;
    let hourlyWage = 15;
    let earnPotential = annualHours * hourlyWage;
    text('Or earn $' + nf(earnPotential, 1, 0) + ' at $' + hourlyWage + '/hr', vizLeft, summaryTop);

  } else {
    // Pre-calculation prompt
    textSize(16);
    fill('gray');
    textAlign(CENTER, CENTER);
    noStroke();
    text('Set your daily screen time for each\nplatform, then click "Calculate My Value"', canvasWidth / 2, drawHeight / 2);

    // Draw platform icons as colored circles
    let iconY = drawHeight / 2 + 60;
    let spacing = barAreaWidth / (platforms.length + 1);
    for (let i = 0; i < platforms.length; i++) {
      fill(platforms[i].color);
      noStroke();
      circle(vizLeft + spacing * (i + 1), iconY, 30);
      fill('white');
      textSize(10);
      textAlign(CENTER, CENTER);
      text(platforms[i].name.substring(0, 2), vizLeft + spacing * (i + 1), iconY);
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  for (let i = 0; i < sliders.length; i++) {
    sliders[i].size(canvasWidth - 130 - margin);
  }
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
