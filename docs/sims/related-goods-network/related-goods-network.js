// Related Goods Network MicroSim
// Network of substitute and complement goods
// Click a product to see substitutes (red/green links) and complements (blue links)

let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 55;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

let productSelect;
let priceUpBtn, priceDownBtn, resetBtn;
let priceChange = 0; // -1, 0, 1
let animProgress = 0;

let products = {
  'Coffee': {
    substitutes: ['Tea', 'Energy Drinks', 'Soda'],
    complements: ['Cream', 'Sugar', 'Pastries', 'Coffee Mugs']
  },
  'Smartphones': {
    substitutes: ['Tablets', 'Laptops', 'Landlines'],
    complements: ['Phone Cases', 'Chargers', 'Apps', 'Screen Protectors']
  },
  'Movies': {
    substitutes: ['Streaming', 'Video Games', 'Live Theater'],
    complements: ['Popcorn', 'Candy', 'Soda', 'Blankets']
  },
  'Pizza': {
    substitutes: ['Burgers', 'Tacos', 'Sandwiches'],
    complements: ['Soda', 'Garlic Bread', 'Salad', 'Wings']
  }
};

let nodePositions = {};
let selectedProduct = 'Coffee';

function layoutNodes() {
  nodePositions = {};
  let centerX = canvasWidth * 0.4;
  let centerY = 200;
  nodePositions[selectedProduct] = { x: centerX, y: centerY };

  let prod = products[selectedProduct];
  let subCount = prod.substitutes.length;
  let compCount = prod.complements.length;

  // Substitutes on upper-left arc
  for (let i = 0; i < subCount; i++) {
    let angle = PI + HALF_PI + (PI / 2) * (i / max(1, subCount - 1)) - PI / 4;
    if (subCount === 1) angle = PI + QUARTER_PI;
    let r = 140;
    nodePositions[prod.substitutes[i]] = {
      x: centerX + cos(angle) * r,
      y: centerY + sin(angle) * r,
      type: 'substitute'
    };
  }

  // Complements on lower-right arc
  for (let i = 0; i < compCount; i++) {
    let angle = -QUARTER_PI + (PI / 2) * (i / max(1, compCount - 1));
    if (compCount === 1) angle = QUARTER_PI;
    let r = 140;
    nodePositions[prod.complements[i]] = {
      x: centerX + cos(angle) * r,
      y: centerY + sin(angle) * r,
      type: 'complement'
    };
  }
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  productSelect = createSelect();
  Object.keys(products).forEach(p => productSelect.option(p));
  productSelect.selected('Coffee');
  productSelect.changed(() => {
    selectedProduct = productSelect.value();
    priceChange = 0;
    layoutNodes();
  });

  priceUpBtn = createButton('Price Up');
  priceUpBtn.mousePressed(() => { priceChange = 1; animProgress = 0; });

  priceDownBtn = createButton('Price Down');
  priceDownBtn.mousePressed(() => { priceChange = -1; animProgress = 0; });

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => { priceChange = 0; animProgress = 0; });

  positionControls();
  layoutNodes();
  describe('Network diagram showing substitute and complement goods relationships', LABEL);
}

function positionControls() {
  let y = drawHeight + 12;
  productSelect.position(80, y);
  priceUpBtn.position(220, y - 2);
  priceDownBtn.position(300, y - 2);
  resetBtn.position(canvasWidth - 60, y - 2);
}

function draw() {
  if (priceChange !== 0) animProgress = min(1, animProgress + 0.03);

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
  text('Related Goods Network', canvasWidth / 2, 6);
  textSize(12);
  fill('gray');
  text('Substitutes & Complements', canvasWidth / 2, 28);

  let prod = products[selectedProduct];
  let center = nodePositions[selectedProduct];

  // Draw edges
  // Substitutes
  prod.substitutes.forEach(s => {
    let pos = nodePositions[s];
    if (!pos) return;
    let edgeColor;
    if (priceChange === 0) {
      edgeColor = color(0, 180, 0);
    } else {
      edgeColor = color(0, 180, 0);
    }
    stroke(edgeColor);
    strokeWeight(2);
    line(center.x, center.y, pos.x, pos.y);

    // Label on edge
    let mx = (center.x + pos.x) / 2;
    let my = (center.y + pos.y) / 2;
    noStroke();
    fill(0, 140, 0);
    textSize(9);
    textAlign(CENTER, CENTER);
    text('substitute', mx, my - 8);
  });

  // Complements
  prod.complements.forEach(c => {
    let pos = nodePositions[c];
    if (!pos) return;
    stroke('steelblue');
    strokeWeight(2);
    line(center.x, center.y, pos.x, pos.y);

    let mx = (center.x + pos.x) / 2;
    let my = (center.y + pos.y) / 2;
    noStroke();
    fill('steelblue');
    textSize(9);
    textAlign(CENTER, CENTER);
    text('complement', mx, my - 8);
  });

  // Draw central node
  let nodeSize = 55;
  let centralColor = 'gold';
  if (priceChange === 1) centralColor = 'tomato';
  if (priceChange === -1) centralColor = 'mediumseagreen';

  fill(centralColor);
  stroke('black');
  strokeWeight(2);
  circle(center.x, center.y, nodeSize);
  noStroke();
  fill('black');
  textSize(12);
  textAlign(CENTER, CENTER);
  text(selectedProduct, center.x, center.y - 6);

  if (priceChange !== 0) {
    textSize(10);
    fill(priceChange === 1 ? 'darkred' : 'darkgreen');
    text(priceChange === 1 ? 'Price \u2191' : 'Price \u2193', center.x, center.y + 10);
  }

  // Draw substitute nodes
  prod.substitutes.forEach(s => {
    let pos = nodePositions[s];
    if (!pos) return;
    let pulse = priceChange !== 0 ? sin(animProgress * PI) * 5 : 0;
    let nSize = 45 + pulse;

    // When central price goes up, substitute demand goes up
    // When central price goes down, substitute demand goes down
    let demandEffect = '';
    let nodeColor = color(180, 230, 180);
    if (priceChange === 1) {
      demandEffect = 'Demand \u2191';
      nodeColor = lerpColor(color(180, 230, 180), color(0, 200, 0), animProgress);
    } else if (priceChange === -1) {
      demandEffect = 'Demand \u2193';
      nodeColor = lerpColor(color(180, 230, 180), color(255, 150, 150), animProgress);
    }

    fill(nodeColor);
    stroke('green');
    strokeWeight(1.5);
    circle(pos.x, pos.y, nSize);
    noStroke();
    fill('black');
    textSize(10);
    textAlign(CENTER, CENTER);
    text(s, pos.x, pos.y - 5);

    if (demandEffect && animProgress > 0.2) {
      textSize(9);
      fill(priceChange === 1 ? 'darkgreen' : 'red');
      text(demandEffect, pos.x, pos.y + 10);
    }
  });

  // Draw complement nodes
  prod.complements.forEach(c => {
    let pos = nodePositions[c];
    if (!pos) return;
    let pulse = priceChange !== 0 ? sin(animProgress * PI) * 5 : 0;
    let nSize = 45 + pulse;

    // When central price goes up, complement demand goes down
    // When central price goes down, complement demand goes up
    let demandEffect = '';
    let nodeColor = color(180, 200, 240);
    if (priceChange === 1) {
      demandEffect = 'Demand \u2193';
      nodeColor = lerpColor(color(180, 200, 240), color(255, 150, 150), animProgress);
    } else if (priceChange === -1) {
      demandEffect = 'Demand \u2191';
      nodeColor = lerpColor(color(180, 200, 240), color(0, 200, 0), animProgress);
    }

    fill(nodeColor);
    stroke('steelblue');
    strokeWeight(1.5);
    circle(pos.x, pos.y, nSize);
    noStroke();
    fill('black');
    textSize(10);
    textAlign(CENTER, CENTER);
    text(c, pos.x, pos.y - 5);

    if (demandEffect && animProgress > 0.2) {
      textSize(9);
      fill(priceChange === 1 ? 'red' : 'darkgreen');
      text(demandEffect, pos.x, pos.y + 10);
    }
  });

  // Explanation text
  let explY = 370;
  noStroke();
  fill('black');
  textSize(12);
  textAlign(CENTER, TOP);

  if (priceChange === 1) {
    text('When ' + selectedProduct + ' prices rise:', canvasWidth / 2, explY);
    fill('green');
    textSize(11);
    text('Substitute demand increases (consumers switch)', canvasWidth / 2, explY + 18);
    fill('red');
    text('Complement demand decreases (bought together)', canvasWidth / 2, explY + 34);
  } else if (priceChange === -1) {
    text('When ' + selectedProduct + ' prices fall:', canvasWidth / 2, explY);
    fill('red');
    textSize(11);
    text('Substitute demand decreases (consumers switch back)', canvasWidth / 2, explY + 18);
    fill('green');
    text('Complement demand increases (bought together)', canvasWidth / 2, explY + 34);
  } else {
    fill('gray');
    textSize(11);
    text('Click "Price Up" or "Price Down" to see effects on related goods', canvasWidth / 2, explY + 10);
  }

  // Legend
  let legY = drawHeight - 25;
  textSize(10);
  textAlign(LEFT, CENTER);
  fill(0, 180, 0);
  noStroke();
  circle(15, legY, 8);
  fill('black');
  text('Substitutes', 22, legY);
  fill('steelblue');
  circle(105, legY, 8);
  fill('black');
  text('Complements', 112, legY);

  // Control label
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Product:', 10, drawHeight + 20);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  layoutNodes();
  positionControls();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasHeight = drawHeight + controlHeight;
}
