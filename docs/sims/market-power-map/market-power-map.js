// Market Power Map MicroSim
// Real industries positioned by competition level (x) and product differentiation (y).
// Click bubbles to see details about concentration ratios and barriers.

let canvasWidth = 580;
let drawHeight = 500;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 70;

let industries = [];
let selectedIndustry = null;
let categorySelect;

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  categorySelect = createSelect();
  categorySelect.option('All');
  categorySelect.option('Perfect Competition');
  categorySelect.option('Monopolistic Competition');
  categorySelect.option('Oligopoly');
  categorySelect.option('Monopoly / Near-Monopoly');
  categorySelect.position(100, drawHeight + 15);

  buildIndustries();
}

function buildIndustries() {
  industries = [
    // Perfect Competition: high competition (0.85-0.95), low differentiation (0.05-0.2)
    { name: 'Commodity Wheat', category: 'Perfect Competition', comp: 0.92, diff: 0.08,
      size: 22, cr4: '~15%', players: '1000s of farmers', barriers: 'Very Low',
      examples: 'Wheat, corn, soybeans', color: 'forestgreen',
      why: 'Many sellers, identical product, easy entry/exit' },
    { name: 'Basic Web Hosting', category: 'Perfect Competition', comp: 0.88, diff: 0.12,
      size: 18, cr4: '~20%', players: '1000s of providers', barriers: 'Low',
      examples: 'Bluehost, Hostinger, GoDaddy', color: 'forestgreen',
      why: 'Standard service, many providers, low switching cost' },

    // Monopolistic Competition: moderate-high competition (0.55-0.75), moderate differentiation (0.3-0.6)
    { name: 'Restaurants', category: 'Monopolistic Competition', comp: 0.72, diff: 0.55,
      size: 35, cr4: '~12%', players: '100,000s', barriers: 'Low-Moderate',
      examples: 'McDonald\'s, Chipotle, local diners', color: 'yellowgreen',
      why: 'Many options but each has unique menu, location, brand' },
    { name: 'Clothing Retail', category: 'Monopolistic Competition', comp: 0.65, diff: 0.60,
      size: 30, cr4: '~18%', players: '1000s of brands', barriers: 'Low-Moderate',
      examples: 'Nike, Zara, H&M, Gap', color: 'yellowgreen',
      why: 'Many brands compete on style, price, quality' },
    { name: 'Streaming Content', category: 'Monopolistic Competition', comp: 0.58, diff: 0.65,
      size: 28, cr4: '~60%', players: '8-12 major', barriers: 'Moderate',
      examples: 'Netflix, Disney+, HBO Max, Hulu', color: 'yellowgreen',
      why: 'Differentiated by exclusive content, but many options' },

    // Oligopoly: low-moderate competition (0.2-0.45), moderate-high differentiation (0.4-0.7)
    { name: 'Cell Carriers', category: 'Oligopoly', comp: 0.30, diff: 0.40,
      size: 34, cr4: '~98%', players: '3 major (US)', barriers: 'Very High',
      examples: 'AT&T, Verizon, T-Mobile', color: 'orange',
      why: 'Huge infrastructure cost, spectrum licenses limit entry' },
    { name: 'Airlines', category: 'Oligopoly', comp: 0.35, diff: 0.35,
      size: 32, cr4: '~70%', players: '4-5 major (US)', barriers: 'High',
      examples: 'Delta, United, American, Southwest', color: 'orange',
      why: 'High capital costs, gate access, route dominance' },
    { name: 'Search Engines', category: 'Oligopoly', comp: 0.18, diff: 0.50,
      size: 30, cr4: '~95%', players: 'Google dominant', barriers: 'Extreme',
      examples: 'Google (90%+), Bing, DuckDuckGo', color: 'orange',
      why: 'Network effects, data advantage, brand habit' },
    { name: 'Social Media', category: 'Oligopoly', comp: 0.25, diff: 0.68,
      size: 33, cr4: '~80%', players: '4-5 major', barriers: 'Very High',
      examples: 'Instagram, TikTok, X, Snapchat', color: 'orange',
      why: 'Network effects make switching costly for users' },

    // Monopoly / Near-Monopoly: very low competition (0.02-0.15), high differentiation (0.7-0.95)
    { name: 'Local Utilities', category: 'Monopoly / Near-Monopoly', comp: 0.05, diff: 0.15,
      size: 28, cr4: '~100%', players: '1 per region', barriers: 'Extreme (natural)',
      examples: 'Water, electric companies', color: 'crimson',
      why: 'Natural monopoly: duplicate infrastructure is wasteful' },
    { name: 'Desktop OS', category: 'Monopoly / Near-Monopoly', comp: 0.10, diff: 0.85,
      size: 30, cr4: '~97%', players: 'Duopoly', barriers: 'Extreme',
      examples: 'Windows (~73%), macOS (~16%)', color: 'crimson',
      why: 'Software ecosystem lock-in, developer network effects' },
    { name: 'Mobile App Stores', category: 'Monopoly / Near-Monopoly', comp: 0.08, diff: 0.80,
      size: 27, cr4: '~99%', players: '2 (duopoly)', barriers: 'Extreme',
      examples: 'Apple App Store, Google Play', color: 'crimson',
      why: 'Platform lock-in: you use the store your phone has' },
  ];
}

function draw() {
  let graphLeft = margin;
  let graphRight = canvasWidth - margin;
  let graphTop = margin + 10;
  let graphBottom = drawHeight - 50;

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
  text('Market Power in Real Industries', canvasWidth / 2, 8);

  // Background zones
  noStroke();
  let zoneW = (graphRight - graphLeft) / 4;
  fill(144, 238, 144, 40);
  rect(graphLeft, graphTop, zoneW, graphBottom - graphTop);
  fill(255, 255, 150, 40);
  rect(graphLeft + zoneW, graphTop, zoneW, graphBottom - graphTop);
  fill(255, 200, 100, 40);
  rect(graphLeft + 2 * zoneW, graphTop, zoneW, graphBottom - graphTop);
  fill(255, 150, 150, 40);
  rect(graphLeft + 3 * zoneW, graphTop, zoneW, graphBottom - graphTop);

  // Zone labels at bottom
  noStroke();
  fill('gray');
  textSize(10);
  textAlign(CENTER, TOP);
  text('Monopoly /', graphLeft + 0.5 * zoneW, graphBottom + 2);
  text('Near-Monopoly', graphLeft + 0.5 * zoneW, graphBottom + 13);
  text('Oligopoly', graphLeft + 1.5 * zoneW, graphBottom + 2);
  text('Monopolistic', graphLeft + 2.5 * zoneW, graphBottom + 2);
  text('Competition', graphLeft + 2.5 * zoneW, graphBottom + 13);
  text('Perfect', graphLeft + 3.5 * zoneW, graphBottom + 2);
  text('Competition', graphLeft + 3.5 * zoneW, graphBottom + 13);

  // Axes
  stroke('black');
  strokeWeight(2);
  line(graphLeft, graphBottom, graphRight, graphBottom);
  line(graphLeft, graphTop, graphLeft, graphBottom);

  // Axis labels
  noStroke();
  fill('black');
  textSize(13);
  textAlign(CENTER, TOP);
  text('Level of Competition (low to high) \u2192', (graphLeft + graphRight) / 2, graphBottom + 28);
  push();
  translate(18, (graphTop + graphBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, BOTTOM);
  text('Product Differentiation \u2192', 0, 0);
  pop();

  // Draw bubbles
  let filterCat = categorySelect.value();
  for (let ind of industries) {
    if (filterCat !== 'All' && ind.category !== filterCat) continue;
    let bx = map(ind.comp, 0, 1, graphLeft, graphRight);
    let by = map(ind.diff, 0, 1, graphBottom, graphTop);
    let sz = ind.size * 1.3;

    // Highlight selected
    if (selectedIndustry === ind) {
      stroke('black');
      strokeWeight(3);
    } else {
      stroke('white');
      strokeWeight(1);
    }
    fill(ind.color);
    ellipse(bx, by, sz, sz);

    // Label
    noStroke();
    fill('black');
    textSize(10);
    textAlign(CENTER, TOP);
    text(ind.name, bx, by + sz / 2 + 2);
  }

  // Detail panel for selected industry
  if (selectedIndustry) {
    let panelW = 220;
    let panelH = 155;
    let panelX = canvasWidth - panelW - 15;
    let panelY = graphTop + 5;

    stroke('gray');
    strokeWeight(1);
    fill(255, 255, 255, 230);
    rect(panelX, panelY, panelW, panelH, 8);

    noStroke();
    fill('black');
    textAlign(LEFT, TOP);
    textSize(14);
    text(selectedIndustry.name, panelX + 10, panelY + 8);

    textSize(11);
    fill('gray');
    text(selectedIndustry.category, panelX + 10, panelY + 26);

    fill('black');
    textSize(11);
    let ty = panelY + 44;
    text('CR4: ' + selectedIndustry.cr4, panelX + 10, ty);
    text('Players: ' + selectedIndustry.players, panelX + 10, ty + 16);
    text('Barriers: ' + selectedIndustry.barriers, panelX + 10, ty + 32);
    text('Examples: ' + selectedIndustry.examples, panelX + 10, ty + 48, panelW - 20, 30);
    fill('darkslategray');
    textSize(10);
    text(selectedIndustry.why, panelX + 10, ty + 80, panelW - 20, 40);
  }

  // Control label
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, CENTER);
  text('Filter:', 15, drawHeight + 27);

  textSize(11);
  fill('gray');
  textAlign(LEFT, TOP);
  text('Click a bubble for details', 15, drawHeight + 42);
}

function mousePressed() {
  let graphLeft = margin;
  let graphRight = canvasWidth - margin;
  let graphTop = margin + 10;
  let graphBottom = drawHeight - 50;

  let filterCat = categorySelect.value();
  selectedIndustry = null;

  for (let ind of industries) {
    if (filterCat !== 'All' && ind.category !== filterCat) continue;
    let bx = map(ind.comp, 0, 1, graphLeft, graphRight);
    let by = map(ind.diff, 0, 1, graphBottom, graphTop);
    let sz = ind.size * 1.3;
    if (dist(mouseX, mouseY, bx, by) < sz / 2 + 5) {
      selectedIndustry = ind;
      break;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  categorySelect.position(100, drawHeight + 15);
  redraw();
}

function updateCanvasSize() {
  let container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  canvasHeight = drawHeight + controlHeight;
}
