---
title: Fed Interest Rate Simulator
description: Interactive p5.js MicroSim for fed interest rate simulator.
image: /sims/fed-rate-simulator/fed-rate-simulator.png
og:image: /sims/fed-rate-simulator/fed-rate-simulator.png
twitter:image: /sims/fed-rate-simulator/fed-rate-simulator.png
social:
   cards: false
quality_score: 76
---

# Fed Interest Rate Simulator

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the Fed Interest Rate Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim demonstrates how the Federal Reserve's federal funds rate cascades through the entire economy. When the Fed changes its benchmark rate, it directly affects the prime rate, mortgage rates, auto loan rates, credit card rates, and savings account yields. Students can adjust the Fed rate and immediately see how monthly payments change on a $300,000 mortgage, a $30,000 auto loan, a $5,000 credit card balance, and a $10,000 savings account, plus the downstream effects on GDP growth, unemployment, and inflation.

## How to Use

1. **Adjust the Fed Rate:** Drag the slider at the bottom right to set the federal funds rate anywhere from 0% to 10% in 0.25% increments.
2. **Watch Rates Cascade:** The network of bubbles at the top shows how the Fed rate flows into consumer rates (Prime, Mortgage, Auto Loan, Credit Card, and Savings).
3. **Check Monthly Payments:** The "What This Means for You" section shows real dollar amounts for common financial products, with a comparison to a baseline rate showing how much more (or less) you would pay.
4. **Review Economic Impact:** The bottom section displays GDP Growth, Unemployment, and Inflation indicators with color coding (green = healthy, red = concerning).
5. **Try Historical Presets:** Use the dropdown menu at the bottom left to jump to notable Fed rate scenarios: the 2024 rate, the 2008 crisis response (near zero), Volcker's inflation-fighting rates (9.5%), and the COVID response (0%).

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/fed-rate-simulator/main.html"
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

- Basic understanding of interest rates and how borrowing works
- Familiarity with the Federal Reserve's role in the economy
- Knowledge of common financial products (mortgages, auto loans, credit cards, savings accounts)

### Activities

1. **Exploration** (5 min): Start at 0% and slowly increase the Fed rate to 10%. Observe how each consumer rate responds. Note that credit card rates change the most in absolute terms. Discuss why the spread (difference) between the Fed rate and each consumer rate exists.
2. **Guided Practice** (5 min): Use the historical presets to compare Volcker's 9.5% rate with the COVID-era 0% rate. Calculate the monthly mortgage payment difference on a $300,000 home. Discuss why the Fed would ever raise rates if lower rates mean cheaper borrowing.
3. **Assessment** (5 min): The Fed must balance fighting inflation against supporting economic growth. Set the rate to find a "sweet spot" where inflation is moderate (under 3%), unemployment is reasonable (under 5%), and GDP growth is positive. Explain why this balancing act is so difficult.

### Assessment

- Students can explain the transmission mechanism from the federal funds rate to consumer borrowing rates
- Students can describe the trade-off the Fed faces between controlling inflation and supporting employment
- Students can calculate how interest rate changes affect real monthly payments on common loans

## References

1. [Federal Funds Rate - Wikipedia](https://en.wikipedia.org/wiki/Federal_funds_rate) - History and mechanics of the Fed's benchmark interest rate
2. [Federal Reserve System - Wikipedia](https://en.wikipedia.org/wiki/Federal_Reserve) - Overview of the Fed's structure and monetary policy tools
3. [How the Federal Funds Rate Affects You - Investopedia](https://www.investopedia.com/articles/economics/08/federal-funds-rate.asp) - Practical guide to how Fed rate changes impact consumer finances
