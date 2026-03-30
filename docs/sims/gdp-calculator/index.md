---
title: GDP Calculator
description: Interactive p5.js MicroSim for gdp calculator.
image: /sims/gdp-calculator/gdp-calculator.png
og:image: /sims/gdp-calculator/gdp-calculator.png
twitter:image: /sims/gdp-calculator/gdp-calculator.png
social:
   cards: false
quality_score: 76
---

# GDP Calculator

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the GDP Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim lets students calculate GDP using the expenditure approach formula: GDP = C + I + G + (X - M). Five sliders control Consumption, Investment, Government Spending, Exports, and Imports in trillions of dollars, and the sim instantly updates a stacked bar chart, pie chart, and the calculated GDP total. Preset scenarios for the US 2024 economy, a recession, and an export boom help students see how different economic conditions change GDP composition.

## How to Use

1. **Adjust Component Sliders**: Move the five sliders (C, I, G, X, M) to change each GDP component value in trillions of dollars and watch the GDP total update in real time.
2. **Read the Formula**: Observe the formula line showing the actual calculation with your current values, such as "17.5 + 4.5 + 4.0 + (2.5 - 3.5)".
3. **Examine the Visualizations**: The stacked bar chart shows relative component sizes, and the pie chart shows proportional shares. Note how Net Exports appears in red when imports exceed exports.
4. **Try Preset Scenarios**: Use the dropdown at the bottom left to load "US 2024," "Recession," or "Export Boom" presets, then compare how each scenario changes total GDP and component shares.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/gdp-calculator/main.html"
        height="482px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Economics)

### Duration
10-15 minutes

### Prerequisites

- Understanding of the four GDP components (C, I, G, NX)
- Basic arithmetic with addition and subtraction
- Familiarity with the concept of a trade deficit

### Activities

1. **Exploration** (5 min): Start with the US 2024 preset. Increase imports by $1 trillion and observe how GDP changes. Then increase government spending by the same amount. Which has a bigger effect on GDP, and why?
2. **Guided Practice** (5 min): Switch to the Recession preset and compare it to US 2024. Identify which components changed the most. Discuss what causes consumption and investment to fall during recessions.
3. **Assessment** (5 min): Create your own scenario where GDP equals exactly $25 trillion. Write down the component values you used and explain whether your scenario represents a realistic economy.

### Assessment

- Students can correctly apply the formula GDP = C + I + G + (X - M) with specific values
- Students can explain why increasing imports reduces GDP while increasing exports raises it
- Students can describe how a recession changes the relative size of GDP components

## References

1. [Gross Domestic Product - Wikipedia](https://en.wikipedia.org/wiki/Gross_domestic_product) - Overview of GDP measurement methods including the expenditure approach.
2. [Expenditure Approach - Investopedia](https://www.investopedia.com/terms/e/expenditure-method.asp) - Detailed explanation of calculating GDP by summing spending components.
3. [Measuring the Size of the Economy: GDP - Khan Academy](https://www.khanacademy.org/economics-finance-domain/macroeconomics/macro-economic-indicators-and-the-business-cycle/macro-the-circular-flow-and-gdp/a/measuring-the-size-of-the-economy-gross-domestic-product-cnx) - Tutorial on GDP measurement and the expenditure approach.
