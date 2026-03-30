---
title: CPI Market Basket
description: Interactive p5.js MicroSim for cpi market basket.
image: /sims/cpi-basket-explorer/cpi-basket-explorer.png
og:image: /sims/cpi-basket-explorer/cpi-basket-explorer.png
twitter:image: /sims/cpi-basket-explorer/cpi-basket-explorer.png
social:
   cards: false
quality_score: 75
---

# CPI Market Basket

<iframe src="main.html" height="562px" width="100%" scrolling="no"></iframe>

[Run the CPI Market Basket MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim demonstrates how the Consumer Price Index (CPI) is calculated as a weighted average of price changes across different spending categories. Students can adjust the inflation rate for each category (Housing, Transportation, Food, Medical, Education, Recreation, and Other) and instantly see how those changes contribute to the overall CPI. The pie chart shows the relative weight of each category in the typical consumer's budget, while the gauge and contribution bars reveal why some categories matter more than others for overall inflation.

## How to Use

1. **Adjust Category Sliders:** Use the seven sliders at the bottom to set the annual price change (from -10% to +20%) for each spending category.
2. **Read the CPI Gauge:** Watch the gauge on the right update in real time, showing the overall inflation rate with color coding (green for low, red for high).
3. **Analyze Contributions:** Review the "Category Contributions" breakdown to see how much each category adds to or subtracts from the total CPI.
4. **Try Preset Scenarios:** Use the dropdown menu at the bottom left to load preset scenarios such as "Oil Crisis," "Housing Boom," "Deflation," or "Pandemic" and observe how different economic events affect the CPI differently.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/cpi-basket-explorer/main.html"
        height="562px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Economics)

### Duration
10-15 minutes

### Prerequisites

- Basic understanding of percentages and weighted averages
- Familiarity with the concept of inflation and rising prices
- Knowledge of what consumers typically spend money on

### Activities

1. **Exploration** (5 min): Load each preset scenario and observe how the CPI gauge changes. Notice which categories have the largest weights in the pie chart and discuss why Housing dominates the CPI basket.
2. **Guided Practice** (5 min): Set all sliders to 0% except one category at a time. Record the overall CPI for each category alone to verify that weight times price change equals the contribution shown. Then create a custom scenario representing your local economy.
3. **Assessment** (5 min): Answer the following questions using the simulation: Why does a 10% increase in Housing affect the CPI more than a 10% increase in Recreation? Design a scenario where overall CPI is near 0% even though individual categories show large changes.

### Assessment

- Students can explain why CPI uses weighted averages rather than simple averages
- Students can identify which spending categories have the greatest impact on overall inflation
- Students can predict how a price shock in one sector (e.g., energy crisis) ripples through the CPI

## References

1. [Consumer Price Index (CPI) - Wikipedia](https://en.wikipedia.org/wiki/Consumer_price_index) - Overview of how CPI is calculated and its history
2. [Consumer Price Index - Bureau of Labor Statistics](https://www.bls.gov/cpi/) - Official U.S. CPI data and methodology
3. [What Is the Consumer Price Index? - Investopedia](https://www.investopedia.com/terms/c/consumerpriceindex.asp) - Accessible explanation of CPI components and weighting
