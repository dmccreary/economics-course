---
title: Nominal vs Real GDP Comparison
description: Interactive p5.js MicroSim for nominal vs real gdp comparison.
image: /sims/nominal-real-gdp/nominal-real-gdp.png
og:image: /sims/nominal-real-gdp/nominal-real-gdp.png
twitter:image: /sims/nominal-real-gdp/nominal-real-gdp.png
social:
   cards: false
quality_score: 76
---

# Nominal vs Real GDP Comparison

<iframe src="main.html" height="522px" width="100%" scrolling="no"></iframe>

[Run the Nominal vs Real GDP Comparison MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim demonstrates why economists distinguish between nominal GDP (measured in current prices) and real GDP (adjusted for inflation). Side-by-side bar charts show how inflation inflates the nominal GDP figures over time while real GDP reflects actual economic growth. A "truth meter" at the bottom reveals what percentage of nominal growth is real versus what is just an illusion created by rising prices. This concept is essential for understanding whether an economy is truly producing more goods and services or if prices are simply going up.

## How to Use

1. **Adjust the Inflation Rate**: Move the top slider to set the annual inflation rate (0% to 10%) and watch how the nominal GDP bars grow faster with higher inflation.
2. **Adjust the Real Growth Rate**: Move the second slider to set the real economic growth rate (0% to 5%) and see how actual output changes independently of inflation.
3. **Change the Number of Years**: Use the third slider to extend or shorten the time horizon (2 to 10 years) and observe how small rate differences compound over time.
4. **Show the Math**: Click the "Show the Math" button to reveal the GDP deflator calculation that converts nominal GDP to real GDP.
5. **Reset**: Click "Reset" to return all sliders to their default values.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/nominal-real-gdp/main.html"
        height="522px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Economics)

### Duration
10-15 minutes

### Prerequisites

- Understanding of what GDP measures
- Basic concept of inflation (rising price levels over time)
- Familiarity with percentages and compound growth

### Activities

1. **Exploration** (5 min): Set inflation to 8% and real growth to 2%. Observe how nominal GDP appears to grow rapidly while real GDP grows slowly. Read the truth meter to see what fraction of nominal growth is real. Then set inflation to 0% and note what happens.
2. **Guided Practice** (5 min): Click "Show the Math" to see the GDP deflator formula. Set inflation to 5%, real growth to 3%, and years to 10. Calculate the price level and verify the real GDP figure shown. Discuss why politicians might prefer to cite nominal GDP figures.
3. **Assessment** (5 min): A country reports that its GDP grew from $10 trillion to $15 trillion over 10 years. Using the sim, find a combination of inflation and real growth that produces similar results. How much of the growth was real?

### Assessment

- Students can define the difference between nominal and real GDP in their own words
- Students can explain why nominal GDP overstates economic growth when inflation is present
- Students can use the GDP deflator concept to convert nominal GDP to real GDP

## References

1. [Real Gross Domestic Product - Wikipedia](https://en.wikipedia.org/wiki/Real_gross_domestic_product) - Explanation of real GDP and how it differs from nominal GDP.
2. [Nominal vs. Real GDP - Investopedia](https://www.investopedia.com/articles/investing/091015/how-nominal-gdp-different-real-gdp.asp) - Clear comparison of nominal and real GDP with examples.
3. [GDP Deflator - Wikipedia](https://en.wikipedia.org/wiki/GDP_deflator) - Overview of the GDP deflator used to adjust nominal GDP for price changes.
