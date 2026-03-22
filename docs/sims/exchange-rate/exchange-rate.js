// Exchange Rate Explorer MicroSim
// See how dollar strength affects imports, exports, and real prices
// MicroSim template version 2026.02

let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Base exchange rates (per 1 USD)
let baseRates = {
  'EUR': { rate: 0.92, symbol: '€', name: 'Euro' },
  'JPY': { rate: 150,  symbol: '¥', name: 'Japanese Yen' },
  'GBP': { rate: 0.79, symbol: '£', name: 'British Pound' },
  'CNY': { rate: 7.25, symbol: '¥', name: 'Chinese Yuan' }
};

let dollarStrength = 100; // index, 100 = base
let strengthSlider;

// Scenarios showing real-world impact
let scenarios = [
  { name: 'iPhone in Japan', basePrice: 999, currency: 'JPY',
    desc: 'American tourist buying iPhone in Tokyo' },
  { name: 'BMW in USA', basePrice: 35000, currency: 'EUR',
    desc: 'German car imported to US market' },
  { name: 'US wheat to China', basePrice: 300, currency: 'CNY',
    desc: 'American farmer exporting wheat' },
  { name: 'London vacation', basePrice: 2000, currency: 'GBP',
    desc: 'American family trip to London' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  strengthSlider = createSlider(70, 130, 100, 1);
  strengthSlider.position(200, drawHeight + 10);
  strengthSlider.size(canvasWidth - 200 - margin);

  describe('Exchange rate explorer showing how dollar strength affects import prices, export competitiveness, and international purchasing power', LABEL);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  dollarStrength = strengthSlider.value();
  let strengthFactor = dollarStrength / 100;

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Exchange Rate Explorer', canvasWidth / 2, 8);

  // Dollar strength meter
  let meterX = 30;
  let meterW = canvasWidth - 60;
  let meterY = 38;

  // Meter background
  for (let x = 0; x < meterW; x++) {
    let t = x / meterW;
    stroke(lerpColor(color('crimson'), color('green'), t));
    strokeWeight(1);
    line(meterX + x, meterY, meterX + x, meterY + 15);
  }
  noFill();
  stroke('black');
  strokeWeight(1);
  rect(meterX, meterY, meterW, 15, 3);

  // Meter needle
  let needleX = map(dollarStrength, 70, 130, meterX, meterX + meterW);
  stroke('black');
  strokeWeight(2);
  triangle(needleX, meterY - 2, needleX - 5, meterY - 10, needleX + 5, meterY - 10);

  // Labels
  noStroke();
  textSize(10);
  fill('crimson');
  textAlign(LEFT, TOP);
  text('Weak $', meterX, meterY + 18);
  fill('green');
  textAlign(RIGHT, TOP);
  text('Strong $', meterX + meterW, meterY + 18);
  fill('black');
  textAlign(CENTER, TOP);
  text('Dollar Index: ' + dollarStrength, canvasWidth / 2, meterY + 18);

  // Exchange rate display
  let rateY = 75;
  let colW = (canvasWidth - 20) / 4;
  textSize(11);
  textAlign(CENTER, TOP);

  let currencies = Object.keys(baseRates);
  for (let i = 0; i < currencies.length; i++) {
    let key = currencies[i];
    let r = baseRates[key];
    let currentRate = r.rate * strengthFactor;
    let cx = 10 + colW * i + colW / 2;

    // Box
    fill('white');
    stroke('silver');
    strokeWeight(1);
    rect(10 + colW * i + 3, rateY, colW - 6, 45, 5);

    noStroke();
    fill('black');
    textSize(10);
    text(r.name, cx, rateY + 3);

    textSize(14);
    fill('steelblue');
    text('1 USD = ' + r.symbol + nf(currentRate, 1, 2), cx, rateY + 18);

    // Change indicator
    let pctChange = (strengthFactor - 1) * 100;
    fill(pctChange > 0 ? 'green' : pctChange < 0 ? 'red' : 'gray');
    textSize(10);
    let sign = pctChange >= 0 ? '+' : '';
    text(sign + nf(pctChange, 1, 0) + '%', cx, rateY + 35);
  }

  // Winners and losers
  let wlY = 130;
  textSize(13);
  textAlign(CENTER, TOP);
  noStroke();

  if (dollarStrength > 105) {
    // Strong dollar
    fill('green');
    text('Strong Dollar Winners & Losers', canvasWidth / 2, wlY);
    wlY += 20;
    textSize(11);
    textAlign(LEFT, TOP);
    fill('green');
    text('✓ US tourists abroad (cheaper travel)', 20, wlY);
    text('✓ US importers (cheaper foreign goods)', 20, wlY + 16);
    fill('red');
    text('✗ US exporters (products cost more abroad)', 20, wlY + 36);
    text('✗ Foreign tourists visiting US (expensive)', 20, wlY + 52);
  } else if (dollarStrength < 95) {
    // Weak dollar
    fill('crimson');
    text('Weak Dollar Winners & Losers', canvasWidth / 2, wlY);
    wlY += 20;
    textSize(11);
    textAlign(LEFT, TOP);
    fill('green');
    text('✓ US exporters (products cheaper abroad)', 20, wlY);
    text('✓ Foreign tourists visiting US (bargains)', 20, wlY + 16);
    fill('red');
    text('✗ US tourists abroad (expensive travel)', 20, wlY + 36);
    text('✗ US importers (foreign goods cost more)', 20, wlY + 52);
  } else {
    fill('gray');
    text('Dollar near baseline — balanced impacts', canvasWidth / 2, wlY);
    wlY += 15;
  }

  // Scenario calculator
  let scenY = wlY + 80;
  fill('black');
  textSize(13);
  textAlign(CENTER, TOP);
  noStroke();
  text('Real-World Price Impact', canvasWidth / 2, scenY);
  scenY += 22;

  let scenColW = (canvasWidth - 20) / 2;
  for (let i = 0; i < scenarios.length; i++) {
    let s = scenarios[i];
    let r = baseRates[s.currency];
    let cx = 10 + (i % 2) * scenColW;
    let cy = scenY + floor(i / 2) * 80;

    // Card
    fill('white');
    stroke('silver');
    strokeWeight(1);
    rect(cx, cy, scenColW - 5, 72, 5);

    noStroke();
    fill('black');
    textSize(11);
    textAlign(LEFT, TOP);
    text(s.name, cx + 8, cy + 5);

    textSize(9);
    fill('gray');
    text(s.desc, cx + 8, cy + 20);

    // Price calculation
    let baseUSD = s.basePrice;
    let newUSD;
    if (s.currency === 'JPY' || s.currency === 'CNY' || s.currency === 'GBP') {
      // Foreign price stays same, USD cost changes
      let foreignPrice = baseUSD * r.rate;
      newUSD = foreignPrice / (r.rate * strengthFactor);
    } else {
      let foreignPrice = baseUSD * r.rate;
      newUSD = foreignPrice / (r.rate * strengthFactor);
    }

    textSize(12);
    fill('black');
    text('Base: $' + nf(baseUSD, 1, 0), cx + 8, cy + 38);
    let diff = newUSD - baseUSD;
    fill(diff < 0 ? 'green' : diff > 0 ? 'red' : 'black');
    text('Now: $' + nf(newUSD, 1, 0) + ' (' + (diff >= 0 ? '+' : '') + nf(diff, 1, 0) + ')', cx + 8, cy + 54);
  }

  // Slider label
  noStroke();
  fill('black');
  textSize(13);
  textAlign(LEFT, CENTER);
  text('Dollar Strength: ' + dollarStrength, 10, drawHeight + 20);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  strengthSlider.size(canvasWidth - 200 - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
