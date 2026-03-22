// Market Structure Spectrum MicroSim
// Drag a marker along a spectrum from Perfect Competition to Monopoly.
// Characteristics update smoothly as you move along the spectrum.

let canvasWidth = 580;
let drawHeight = 480;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 30;

let spectrumVal = 0.0; // 0 = perfect competition, 1 = monopoly
let draggingMarker = false;

// Buttons
let btnPerfect, btnMonopolistic, btnOligopoly, btnMonopoly;

// Spectrum positions
let specLeft, specRight, specY, specW;

// Market structure definitions
let structures = [
  { name: 'Perfect Competition', pos: 0.0, color: 'forestgreen',
    firms: 'Many (1000s)', product: 'Identical', pricing: 'None (price taker)',
    barriers: 'None', examples: 'Wheat farming, basic commodities, stock market' },
  { name: 'Monopolistic Competition', pos: 0.33, color: 'goldenrod',
    firms: 'Many (10s-100s)', product: 'Differentiated', pricing: 'Some',
    barriers: 'Low', examples: 'Restaurants, clothing stores, hair salons' },
  { name: 'Oligopoly', pos: 0.66, color: 'darkorange',
    firms: 'Few (2-10)', product: 'Similar or differentiated', pricing: 'Significant',
    barriers: 'High', examples: 'Airlines, cell carriers, auto manufacturers' },
  { name: 'Monopoly', pos: 1.0, color: 'crimson',
    firms: 'One', product: 'Unique (no substitutes)', pricing: 'Complete',
    barriers: 'Extreme', examples: 'Local utilities, patented drugs, De Beers diamonds' }
];

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  btnPerfect = createButton('Perfect Comp.');
  btnPerfect.mousePressed(() => { spectrumVal = 0.0; });

  btnMonopolistic = createButton('Monopolistic');
  btnMonopolistic.mousePressed(() => { spectrumVal = 0.33; });

  btnOligopoly = createButton('Oligopoly');
  btnOligopoly.mousePressed(() => { spectrumVal = 0.66; });

  btnMonopoly = createButton('Monopoly');
  btnMonopoly.mousePressed(() => { spectrumVal = 1.0; });

  positionControls();
}

function positionControls() {
  let y = drawHeight + 12;
  let spacing = min(130, (canvasWidth - 40) / 4);
  btnPerfect.position(15, y);
  btnMonopolistic.position(15 + spacing, y);
  btnOligopoly.position(15 + 2 * spacing, y);
  btnMonopoly.position(15 + 3 * spacing, y);
}

function getInterpolated(field) {
  // Find which two structures we are between
  for (let i = 0; i < structures.length - 1; i++) {
    if (spectrumVal <= structures[i + 1].pos) {
      let t = map(spectrumVal, structures[i].pos, structures[i + 1].pos, 0, 1);
      t = constrain(t, 0, 1);
      // Return closer one
      return t < 0.5 ? structures[i][field] : structures[i + 1][field];
    }
  }
  return structures[structures.length - 1][field];
}

function getCurrentColor() {
  if (spectrumVal <= 0.33) {
    return lerpColor(color('forestgreen'), color('goldenrod'), map(spectrumVal, 0, 0.33, 0, 1));
  } else if (spectrumVal <= 0.66) {
    return lerpColor(color('goldenrod'), color('darkorange'), map(spectrumVal, 0.33, 0.66, 0, 1));
  } else {
    return lerpColor(color('darkorange'), color('crimson'), map(spectrumVal, 0.66, 1.0, 0, 1));
  }
}

function getNumericValue(low, high) {
  return map(spectrumVal, 0, 1, low, high);
}

function draw() {
  specLeft = margin + 20;
  specRight = canvasWidth - margin - 20;
  specY = 100;
  specW = specRight - specLeft;

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
  text('Market Structure Spectrum', canvasWidth / 2, 10);

  // Subtitle
  textSize(12);
  fill('gray');
  text('Drag the marker or use buttons below to explore', canvasWidth / 2, 32);

  // Draw spectrum bar (gradient)
  for (let x = specLeft; x <= specRight; x++) {
    let t = map(x, specLeft, specRight, 0, 1);
    let c;
    if (t <= 0.33) {
      c = lerpColor(color('forestgreen'), color('goldenrod'), map(t, 0, 0.33, 0, 1));
    } else if (t <= 0.66) {
      c = lerpColor(color('goldenrod'), color('darkorange'), map(t, 0.33, 0.66, 0, 1));
    } else {
      c = lerpColor(color('darkorange'), color('crimson'), map(t, 0.66, 1, 0, 1));
    }
    stroke(c);
    strokeWeight(1);
    line(x, specY - 12, x, specY + 12);
  }

  // Spectrum border
  noFill();
  stroke('gray');
  strokeWeight(1);
  rect(specLeft, specY - 12, specW, 24, 5);

  // Structure labels on spectrum
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  for (let s of structures) {
    let x = map(s.pos, 0, 1, specLeft, specRight);
    stroke('gray');
    strokeWeight(1);
    line(x, specY + 12, x, specY + 18);
    noStroke();
    fill('black');
    text(s.name, x, specY + 20);
  }

  // Draggable marker
  let markerX = map(spectrumVal, 0, 1, specLeft, specRight);
  let cc = getCurrentColor();
  stroke('black');
  strokeWeight(2);
  fill(cc);
  triangle(markerX - 10, specY - 18, markerX + 10, specY - 18, markerX, specY - 8);
  ellipse(markerX, specY - 22, 8, 8);

  // Firm count visualization
  let firmY = 170;
  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Number of Firms', canvasWidth / 2, firmY - 15);

  let numDots = round(map(spectrumVal, 0, 1, 30, 1));
  let dotArea = canvasWidth - 2 * margin;
  fill(cc);
  noStroke();
  if (numDots <= 5) {
    // Draw as larger circles
    let spacing = dotArea / (numDots + 1);
    for (let i = 0; i < numDots; i++) {
      ellipse(margin + spacing * (i + 1), firmY + 25, 24, 24);
    }
  } else {
    // Draw as small dots in a cluster
    let cols = min(numDots, 15);
    let rows = ceil(numDots / cols);
    let spacingX = min(20, dotArea / cols);
    let startX = canvasWidth / 2 - (cols * spacingX) / 2;
    let count = 0;
    for (let r = 0; r < rows && count < numDots; r++) {
      for (let c = 0; c < cols && count < numDots; c++) {
        ellipse(startX + c * spacingX + spacingX / 2, firmY + 10 + r * 18, 10, 10);
        count++;
      }
    }
  }

  // Characteristics panel
  let panelY = 240;
  let panelX = margin + 10;
  let labelX = panelX;
  let valueX = panelX + 160;
  let rowH = 32;

  noStroke();
  fill('black');
  textSize(16);
  textAlign(LEFT, TOP);
  text('Characteristics', panelX, panelY);

  // Current structure name
  fill(cc);
  textSize(15);
  textAlign(RIGHT, TOP);
  text(getInterpolated('name'), canvasWidth - margin - 10, panelY);

  textSize(13);
  textAlign(LEFT, TOP);
  let fields = [
    { label: 'Number of Firms:', key: 'firms' },
    { label: 'Product Type:', key: 'product' },
    { label: 'Pricing Power:', key: 'pricing' },
    { label: 'Entry Barriers:', key: 'barriers' },
    { label: 'Example Industries:', key: 'examples' }
  ];

  for (let i = 0; i < fields.length; i++) {
    let y = panelY + 28 + i * rowH;

    // Bar background for pricing power and barriers
    if (fields[i].key === 'pricing' || fields[i].key === 'barriers') {
      let barVal = getNumericValue(0, 1);
      if (fields[i].key === 'pricing') barVal = getNumericValue(0, 1);
      fill(240);
      noStroke();
      rect(valueX, y + 16, 200, 8, 4);
      fill(cc);
      rect(valueX, y + 16, 200 * constrain(barVal, 0, 1), 8, 4);
    }

    noStroke();
    fill('gray');
    text(fields[i].label, labelX, y);
    fill('black');
    let val = getInterpolated(fields[i].key);
    // Wrap long text
    if (fields[i].key === 'examples') {
      textSize(11);
      text(val, valueX, y, canvasWidth - valueX - margin, 40);
      textSize(13);
    } else {
      text(val, valueX, y);
    }
  }

  // Consumer impact note
  let noteY = panelY + 28 + fields.length * rowH + 10;
  noStroke();
  textSize(12);
  fill('darkslategray');
  textAlign(LEFT, TOP);
  let impactText;
  if (spectrumVal < 0.2) {
    impactText = 'Consumers benefit: lowest prices, most choices, firms are price takers.';
  } else if (spectrumVal < 0.5) {
    impactText = 'Consumers have good choices but pay slightly more for differentiated products.';
  } else if (spectrumVal < 0.8) {
    impactText = 'Limited choices. Firms may coordinate pricing. Higher prices likely.';
  } else {
    impactText = 'One seller controls price. Consumers have no alternatives. Regulation often needed.';
  }
  text(impactText, panelX, noteY, canvasWidth - 2 * margin, 40);
}

function mousePressed() {
  let markerX = map(spectrumVal, 0, 1, specLeft, specRight);
  if (mouseY > specY - 30 && mouseY < specY + 30 && mouseX > specLeft - 20 && mouseX < specRight + 20) {
    draggingMarker = true;
  }
}

function mouseDragged() {
  if (draggingMarker) {
    spectrumVal = constrain(map(mouseX, specLeft, specRight, 0, 1), 0, 1);
  }
}

function mouseReleased() {
  draggingMarker = false;
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
