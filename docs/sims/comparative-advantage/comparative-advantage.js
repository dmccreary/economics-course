// Comparative Advantage Calculator MicroSim
// Two countries, two goods - calculate opportunity costs and show gains from trade
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Production capabilities (units per day)
let countryA = { name: 'Freedonia', cars: 10, clothes: 40 };
let countryB = { name: 'Sylvania',  cars: 4,  clothes: 24 };

let presetSelect;
let showTradeBtn;
let showTrade = false;
let resetBtn;

let presets = [
  { name: 'Custom', a: { name: 'Freedonia', cars: 10, clothes: 40 }, b: { name: 'Sylvania', cars: 4, clothes: 24 } },
  { name: 'US vs Vietnam', a: { name: 'US', cars: 12, clothes: 30 }, b: { name: 'Vietnam', cars: 2, clothes: 20 } },
  { name: 'Germany vs Greece', a: { name: 'Germany', cars: 15, clothes: 25 }, b: { name: 'Greece', cars: 5, clothes: 20 } },
  { name: 'Two Friends', a: { name: 'Alex', cars: 8, clothes: 16 }, b: { name: 'Sam', cars: 3, clothes: 12 } }
];

// Sliders for custom mode
let aCarSlider, aClothSlider, bCarSlider, bClothSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  presetSelect = createSelect();
  presetSelect.position(10, drawHeight + 5);
  for (let p of presets) presetSelect.option(p.name);
  presetSelect.changed(applyPreset);
  presetSelect.style('font-size', '13px');

  showTradeBtn = createButton('Show Trade Gains');
  showTradeBtn.position(10, drawHeight + 35);
  showTradeBtn.mousePressed(() => { showTrade = !showTrade; showTradeBtn.html(showTrade ? 'Hide Trade' : 'Show Trade Gains'); });

  resetBtn = createButton('Reset');
  resetBtn.position(150, drawHeight + 35);
  resetBtn.mousePressed(() => {
    showTrade = false;
    showTradeBtn.html('Show Trade Gains');
    applyPreset();
  });

  // Small sliders for production values
  aCarSlider = createSlider(1, 20, countryA.cars, 1);
  aCarSlider.position(250, drawHeight + 5);
  aCarSlider.size(60);
  aCarSlider.style('font-size', '10px');

  aClothSlider = createSlider(5, 50, countryA.clothes, 1);
  aClothSlider.position(330, drawHeight + 5);
  aClothSlider.size(60);

  bCarSlider = createSlider(1, 20, countryB.cars, 1);
  bCarSlider.position(250, drawHeight + 35);
  bCarSlider.size(60);

  bClothSlider = createSlider(5, 50, countryB.clothes, 1);
  bClothSlider.position(330, drawHeight + 35);
  bClothSlider.size(60);

  describe('Comparative advantage calculator showing how two countries benefit from specialization and trade', LABEL);
}

function applyPreset() {
  let p = presets.find(x => x.name === presetSelect.value());
  if (!p) return;
  countryA = { ...p.a };
  countryB = { ...p.b };
  aCarSlider.value(countryA.cars);
  aClothSlider.value(countryA.clothes);
  bCarSlider.value(countryB.cars);
  bClothSlider.value(countryB.clothes);
  showTrade = false;
  showTradeBtn.html('Show Trade Gains');
}

function draw() {
  updateCanvasSize();

  // Update from sliders
  countryA.cars = aCarSlider.value();
  countryA.clothes = aClothSlider.value();
  countryB.cars = bCarSlider.value();
  countryB.clothes = bClothSlider.value();

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
  textSize(18);
  text('Comparative Advantage Calculator', canvasWidth / 2, 8);

  // Calculate opportunity costs
  let aOcCar = countryA.clothes / countryA.cars;  // OC of 1 car in clothes
  let aOcCloth = countryA.cars / countryA.clothes; // OC of 1 cloth in cars
  let bOcCar = countryB.clothes / countryB.cars;
  let bOcCloth = countryB.cars / countryB.clothes;

  // Who has comparative advantage?
  let aAdvCar = aOcCar < bOcCar;
  let aAdvCloth = !aAdvCar;

  // Draw two PPF graphs side by side
  let gw = (canvasWidth - 30) / 2 - 30;
  let gh = 130;
  let g1Left = 50;
  let g2Left = canvasWidth / 2 + 30;
  let gTop = 35;

  drawPPF(g1Left, gTop, gw, gh, countryA, 'steelblue', aAdvCar ? 'Cars' : 'Clothes');
  drawPPF(g2Left, gTop, gw, gh, countryB, 'crimson', !aAdvCar ? 'Cars' : 'Clothes');

  // Opportunity cost table
  let tableY = gTop + gh + 50;
  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Opportunity Costs', canvasWidth / 2, tableY);

  tableY += 22;
  textSize(12);
  textAlign(LEFT, TOP);

  // Header
  fill('gray');
  text('', 20, tableY);
  text('1 Car costs', 140, tableY);
  text('1 Clothing costs', 280, tableY);
  tableY += 18;

  // Country A
  fill(aAdvCar ? 'green' : 'black');
  text(countryA.name, 20, tableY);
  text(nf(aOcCar, 1, 1) + ' clothing' + (aAdvCar ? ' ★' : ''), 140, tableY);
  fill(aAdvCloth ? 'green' : 'black');
  text(nf(aOcCloth, 1, 2) + ' cars' + (aAdvCloth ? ' ★' : ''), 280, tableY);
  tableY += 18;

  // Country B
  fill(!aAdvCar ? 'green' : 'black');
  text(countryB.name, 20, tableY);
  text(nf(bOcCar, 1, 1) + ' clothing' + (!aAdvCar ? ' ★' : ''), 140, tableY);
  fill(!aAdvCloth ? 'green' : 'black');
  text(nf(bOcCloth, 1, 2) + ' cars' + (!aAdvCloth ? ' ★' : ''), 280, tableY);

  tableY += 25;
  noStroke();
  fill('darkblue');
  textSize(13);
  textAlign(LEFT, TOP);
  let carAdv = aAdvCar ? countryA.name : countryB.name;
  let clothAdv = aAdvCloth ? countryA.name : countryB.name;
  text(carAdv + ' specializes in Cars (lower OC)', 20, tableY);
  text(clothAdv + ' specializes in Clothing (lower OC)', 20, tableY + 18);

  // Trade gains section
  if (showTrade) {
    tableY += 48;
    fill('darkgreen');
    textSize(14);
    textAlign(CENTER, TOP);
    text('Gains from Trade', canvasWidth / 2, tableY);

    tableY += 22;
    textSize(12);
    textAlign(LEFT, TOP);
    fill('black');

    // Before trade: each produces half and half
    let aCarsBefore = countryA.cars / 2;
    let aClothesBefore = countryA.clothes / 2;
    let bCarsBefore = countryB.cars / 2;
    let bClothesBefore = countryB.clothes / 2;

    // After trade: specialize, then trade
    let aCarsAfter, aClothesAfter, bCarsAfter, bClothesAfter;
    if (aAdvCar) {
      aCarsAfter = countryA.cars;
      aClothesAfter = 0;
      bCarsAfter = 0;
      bClothesAfter = countryB.clothes;
    } else {
      aCarsAfter = 0;
      aClothesAfter = countryA.clothes;
      bCarsAfter = countryB.cars;
      bClothesAfter = 0;
    }

    // Trade terms: split difference in opportunity costs
    let tradeRate = (aOcCar + bOcCar) / 2; // clothing per car
    let carsTraded = min(aCarsAfter, bClothesAfter / tradeRate) * 0.3;
    let clothTraded = carsTraded * tradeRate;

    text('Before Trade (no specialization):', 20, tableY);
    tableY += 18;
    text('  ' + countryA.name + ': ' + nf(aCarsBefore, 1, 1) + ' cars, ' + nf(aClothesBefore, 1, 1) + ' clothing', 20, tableY);
    tableY += 16;
    text('  ' + countryB.name + ': ' + nf(bCarsBefore, 1, 1) + ' cars, ' + nf(bClothesBefore, 1, 1) + ' clothing', 20, tableY);
    tableY += 22;

    text('After Specialization + Trade:', 20, tableY);
    tableY += 18;
    let aFinalCars = aCarsAfter - carsTraded + (aAdvCar ? 0 : carsTraded);
    let aFinalClothes = aClothesAfter - (aAdvCloth ? clothTraded : 0) + (aAdvCar ? clothTraded : 0);
    let bFinalCars = bCarsAfter + (aAdvCar ? carsTraded : 0) - (!aAdvCar ? carsTraded : 0);
    let bFinalClothes = bClothesAfter + (aAdvCloth ? clothTraded : 0) - (!aAdvCloth ? clothTraded : 0);

    fill('green');
    text('  ' + countryA.name + ': ' + nf(aFinalCars, 1, 1) + ' cars, ' + nf(aFinalClothes, 1, 1) + ' clothing', 20, tableY);
    tableY += 16;
    text('  ' + countryB.name + ': ' + nf(bFinalCars, 1, 1) + ' cars, ' + nf(bFinalClothes, 1, 1) + ' clothing', 20, tableY);
    tableY += 20;

    fill('darkgreen');
    textSize(13);
    text('Both countries can consume MORE through trade!', 20, tableY);
  }

  // Control labels
  noStroke();
  fill('black');
  textSize(10);
  textAlign(LEFT, CENTER);
  text(countryA.name + '  Cars:' + countryA.cars + '  Cloth:' + countryA.clothes, 170, drawHeight + 15);
  text(countryB.name + '  Cars:' + countryB.cars + '  Cloth:' + countryB.clothes, 170, drawHeight + 45);
}

function drawPPF(x, y, w, h, country, col, advGood) {
  // Axes
  stroke('black');
  strokeWeight(1);
  line(x, y, x, y + h);
  line(x, y + h, x + w, y + h);

  // PPF line
  stroke(col);
  strokeWeight(2);
  line(x, y + 5, x + w - 5, y + h);

  // Labels
  noStroke();
  fill(col);
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text(country.name, x + w / 2, y - 2);

  fill('black');
  textSize(10);
  textAlign(CENTER, TOP);
  text('Cars (' + country.cars + ')', x + w / 2, y + h + 2);

  push();
  translate(x - 12, y + h / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Clothing (' + country.clothes + ')', 0, 0);
  pop();

  // Advantage badge
  noStroke();
  fill('green');
  textSize(9);
  textAlign(CENTER, CENTER);
  text('★ ' + advGood, x + w / 2, y + h - 15);
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
