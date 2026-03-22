// Government Policy Toolkit MicroSim
// Compare different government policy tools for addressing market failures.
// Select a market failure type to see which policy tools apply and their tradeoffs.

let canvasWidth = 580;
let drawHeight = 500;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

let failureSelect;
let selectedCard = -1;

let policyTools = [
  {
    name: 'Pigouvian Tax',
    icon: 'TAX',
    color: 'seagreen',
    type: 'Fiscal',
    bestFor: 'Negative externalities',
    pros: ['Efficient', 'Raises revenue', 'Flexible'],
    cons: ['Hard to set right level', 'Politically difficult'],
    examples: ['Carbon tax', 'Cigarette tax', 'Sugar tax'],
    failures: ['Negative Externality', 'Pollution']
  },
  {
    name: 'Subsidy',
    icon: 'SUB',
    color: 'forestgreen',
    type: 'Fiscal',
    bestFor: 'Positive externalities',
    pros: ['Encourages good behavior', 'Market-friendly'],
    cons: ['Costly to government', 'Can be captured by special interests'],
    examples: ['Education grants', 'Solar panel rebates', 'Vaccine subsidies'],
    failures: ['Positive Externality', 'Public Good']
  },
  {
    name: 'Regulation',
    icon: 'REG',
    color: 'steelblue',
    type: 'Regulatory',
    bestFor: 'Safety, minimum standards',
    pros: ['Certain outcomes', 'Easy to understand'],
    cons: ['Inflexible', 'May be inefficient'],
    examples: ['Emissions standards', 'Building codes', 'Food safety rules'],
    failures: ['Negative Externality', 'Information Asymmetry', 'Pollution']
  },
  {
    name: 'Property Rights',
    icon: 'OWN',
    color: 'mediumpurple',
    type: 'Structural',
    bestFor: 'Clearly defined resources',
    pros: ['Market-based', 'Efficient'],
    cons: ['Doesn\'t work for diffuse externalities'],
    examples: ['Water rights', 'Fishing quotas', 'Spectrum licenses'],
    failures: ['Negative Externality', 'Common Resource']
  },
  {
    name: 'Public Provision',
    icon: 'GOV',
    color: 'darkorchid',
    type: 'Structural',
    bestFor: 'Pure public goods',
    pros: ['Solves free rider problem', 'Universal access'],
    cons: ['May be inefficient', 'Requires taxation'],
    examples: ['National defense', 'Street lighting', 'Public parks'],
    failures: ['Public Good', 'Common Resource']
  },
  {
    name: 'Antitrust',
    icon: 'LAW',
    color: 'royalblue',
    type: 'Regulatory',
    bestFor: 'Market power problems',
    pros: ['Restores competition', 'Consumer protection'],
    cons: ['Slow process', 'Hard to prove cases'],
    examples: ['Breaking up monopolies', 'Blocking mergers', 'Price-fixing cases'],
    failures: ['Monopoly Power', 'Information Asymmetry']
  }
];

let failureTypes = [
  'All Failures',
  'Negative Externality',
  'Positive Externality',
  'Public Good',
  'Common Resource',
  'Monopoly Power',
  'Information Asymmetry',
  'Pollution'
];

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  failureSelect = createSelect();
  for (let ft of failureTypes) {
    failureSelect.option(ft);
  }
  failureSelect.selected('All Failures');
  positionControls();
}

function positionControls() {
  failureSelect.position(170, drawHeight + 20);
  failureSelect.size(200);
}

function draw() {
  // Drawing area
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill('black');
  textSize(20);
  textAlign(CENTER, TOP);
  text('Government Policy Toolkit', canvasWidth / 2, 10);

  let filter = failureSelect.value();

  // Filter tools
  let visibleTools = [];
  for (let i = 0; i < policyTools.length; i++) {
    if (filter === 'All Failures' || policyTools[i].failures.includes(filter)) {
      visibleTools.push(i);
    }
  }

  // Calculate card layout - 2 columns
  let cols = 2;
  let rows = ceil(visibleTools.length / cols);
  let cardMargin = 12;
  let cardW = (canvasWidth - cardMargin * 3) / cols;
  let cardStartY = 42;
  let availableH = drawHeight - cardStartY - cardMargin;
  let cardH = min(72, (availableH - cardMargin * (rows - 1)) / rows);

  // Draw cards
  for (let vi = 0; vi < visibleTools.length; vi++) {
    let idx = visibleTools[vi];
    let tool = policyTools[idx];
    let col = vi % cols;
    let row = floor(vi / cols);
    let cx = cardMargin + col * (cardW + cardMargin);
    let cy = cardStartY + row * (cardH + cardMargin);

    let isHovered = mouseX > cx && mouseX < cx + cardW &&
                    mouseY > cy && mouseY < cy + cardH;
    let isSelected = selectedCard === idx;

    // Card background
    stroke(tool.color);
    strokeWeight(isHovered || isSelected ? 3 : 1);
    fill(isSelected ? 'lightyellow' : 'white');
    rect(cx, cy, cardW, cardH, 8);

    // Icon circle
    fill(tool.color);
    noStroke();
    ellipse(cx + 30, cy + cardH / 2, 36, 36);
    fill('white');
    textSize(10);
    textAlign(CENTER, CENTER);
    text(tool.icon, cx + 30, cy + cardH / 2);

    // Tool name
    noStroke();
    fill('black');
    textSize(14);
    textAlign(LEFT, TOP);
    text(tool.name, cx + 55, cy + 8);

    // Type badge
    textSize(10);
    fill(tool.color);
    text(tool.type, cx + 55, cy + 26);

    // Best for
    fill('gray');
    textSize(11);
    text('Best for: ' + tool.bestFor, cx + 55, cy + 42);

    // Flexibility meter
    if (cardW > 200) {
      let meterX = cx + cardW - 80;
      let meterY = cy + 12;
      fill('gray');
      textSize(9);
      textAlign(LEFT, TOP);
    }
  }

  // Detail panel for selected card
  if (selectedCard >= 0) {
    let tool = policyTools[selectedCard];
    let panelY = cardStartY + rows * (cardH + cardMargin) + 5;
    let panelH = drawHeight - panelY - 8;

    if (panelH > 60) {
      stroke(tool.color);
      strokeWeight(2);
      fill('white');
      rect(cardMargin, panelY, canvasWidth - cardMargin * 2, panelH, 8);

      noStroke();
      fill(tool.color);
      textSize(16);
      textAlign(LEFT, TOP);
      text(tool.name + ' - Details', cardMargin + 15, panelY + 10);

      let colW = (canvasWidth - cardMargin * 2 - 30) / 3;
      let detailY = panelY + 35;

      // Pros column
      fill('green');
      textSize(13);
      text('Pros:', cardMargin + 15, detailY);
      fill('darkgreen');
      textSize(11);
      for (let i = 0; i < tool.pros.length; i++) {
        text('+ ' + tool.pros[i], cardMargin + 15, detailY + 18 + i * 16);
      }

      // Cons column
      let consX = cardMargin + 15 + colW;
      fill('red');
      textSize(13);
      text('Cons:', consX, detailY);
      fill('darkred');
      textSize(11);
      for (let i = 0; i < tool.cons.length; i++) {
        text('- ' + tool.cons[i], consX, detailY + 18 + i * 16);
      }

      // Examples column
      let exX = cardMargin + 15 + colW * 2;
      fill('navy');
      textSize(13);
      text('Examples:', exX, detailY);
      fill('darkslategray');
      textSize(11);
      for (let i = 0; i < tool.examples.length; i++) {
        text(tool.examples[i], exX, detailY + 18 + i * 16);
      }
    }
  } else {
    // Prompt to click
    let promptY = cardStartY + rows * (cardH + cardMargin) + 20;
    noStroke();
    fill('gray');
    textSize(14);
    textAlign(CENTER, CENTER);
    text('Click a policy card above to see details, pros, cons, and examples.', canvasWidth / 2, promptY);
  }

  // Control area label
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, CENTER);
  text('Filter by failure:', 15, drawHeight + 32);

  // Legend
  textSize(10);
  textAlign(LEFT, CENTER);
  let legX = 400;
  fill('seagreen');
  text('Fiscal', legX, drawHeight + 22);
  fill('steelblue');
  text('Regulatory', legX, drawHeight + 36);
  fill('mediumpurple');
  text('Structural', legX + 70, drawHeight + 22);
}

function mousePressed() {
  let filter = failureSelect.value();
  let visibleTools = [];
  for (let i = 0; i < policyTools.length; i++) {
    if (filter === 'All Failures' || policyTools[i].failures.includes(filter)) {
      visibleTools.push(i);
    }
  }

  let cols = 2;
  let rows = ceil(visibleTools.length / cols);
  let cardMargin = 12;
  let cardW = (canvasWidth - cardMargin * 3) / cols;
  let cardStartY = 42;
  let availableH = drawHeight - cardStartY - cardMargin;
  let cardH = min(72, (availableH - cardMargin * (rows - 1)) / rows);

  for (let vi = 0; vi < visibleTools.length; vi++) {
    let idx = visibleTools[vi];
    let col = vi % cols;
    let row = floor(vi / cols);
    let cx = cardMargin + col * (cardW + cardMargin);
    let cy = cardStartY + row * (cardH + cardMargin);

    if (mouseX > cx && mouseX < cx + cardW && mouseY > cy && mouseY < cy + cardH) {
      selectedCard = selectedCard === idx ? -1 : idx;
      return;
    }
  }
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
