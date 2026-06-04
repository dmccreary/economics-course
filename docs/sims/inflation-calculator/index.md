---
title: Inflation Impact Calculator
description: Interactive p5.js MicroSim for inflation impact calculator.
image: /sims/inflation-calculator/inflation-calculator.png
og:image: /sims/inflation-calculator/inflation-calculator.png
twitter:image: /sims/inflation-calculator/inflation-calculator.png
social:
   cards: false
quality_score: 75
---

# Inflation Impact Calculator

<iframe src="main.html" height="452px" width="100%" scrolling="no"></iframe>

[Run the Inflation Impact Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim shows how inflation silently erodes the purchasing power of money over time. Students set a dollar amount, an annual inflation rate, and a number of years, then watch a graph plot how the real value of their money declines while the nominal amount stays the same. A fun pizza comparison makes the abstract concept tangible by showing how many fewer pizzas the same dollars can buy in the future.

## How to Use

1. **Set the Amount:** Use the first slider to choose a starting dollar amount (from $100 to $10,000).
2. **Set the Inflation Rate:** Use the second slider to pick an annual inflation rate (from 0% to 15%).
3. **Set the Time Horizon:** Use the third slider to select how many years into the future to project (from 1 to 30 years).
4. **Read the Results:** The large red number shows the future real value of your money. The graph displays the nominal value (dashed blue line) versus the declining real value (solid red line), with the shaded area representing lost purchasing power.
5. **Check the Pizza Comparison:** See how many $15 pizzas your money buys today versus how many it will buy in the future at inflated prices.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/inflation-calculator/main.html"
        height="452px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Economics)

### Duration
10-15 minutes

### Prerequisites

- Understanding of percentages and basic exponents
- Familiarity with the concept of inflation as a general rise in prices
- Ability to read line graphs

### Activities

1. **Exploration** (5 min): Set the amount to $1,000 and try different inflation rates (2%, 5%, 10%) over 20 years. Record the real value and pizza count for each rate. Discuss how even small differences in inflation compound dramatically over time.
2. **Guided Practice** (5 min): Use the calculator to answer: "At 3% inflation, how long does it take for $1,000 to lose half its purchasing power?" Adjust the years slider to find the answer. Then try the "Rule of 72" (divide 72 by the inflation rate) and compare.
3. **Assessment** (5 min): Students write a brief explanation of why retirees on fixed incomes are particularly vulnerable to inflation, using specific numbers from the simulation to support their argument.

### Assessment

- Students can explain the difference between nominal value and real (inflation-adjusted) value
- Students can calculate approximate purchasing power loss given an inflation rate and time period
- Students can articulate why inflation matters for savings, retirement planning, and wage negotiations

## References

1. [Inflation - Wikipedia](https://en.wikipedia.org/wiki/Inflation) - Comprehensive overview of inflation causes, effects, and measurement
2. [What Is Inflation and How Does It Affect You? - Investopedia](https://www.investopedia.com/terms/i/inflation.asp) - Clear explanation of how inflation erodes purchasing power
3. [Inflation - Khan Academy](https://www.khanacademy.org/economics-finance-domain/macroeconomics/macro-economic-indicators-and-the-business-cycle/macro-price-indices-and-inflation/v/introduction-to-inflation) - Video lessons on inflation and price indices
