---
title: Investment Risk-Return Explorer
description: Interactive p5.js MicroSim for investment risk-return explorer.
image: /sims/risk-return/risk-return.png
og:image: /sims/risk-return/risk-return.png
twitter:image: /sims/risk-return/risk-return.png
social:
   cards: false
quality_score: 76
---

# Investment Risk-Return Explorer

<iframe src="main.html" height="497px" width="100%" scrolling="no"></iframe>

[Run the Investment Risk-Return Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim plots six common investment types on a risk-return scatter chart, from low-risk savings accounts to high-volatility cryptocurrency. Students can adjust their investment amount and time horizon to see projected values, and hover over each investment to view detailed statistics including best/worst year performance. A Monte Carlo simulation button runs 200 randomized scenarios to show the range of possible outcomes and probability of loss for each investment type.

## How to Use

1. **Read the scatter plot** where the horizontal axis shows risk (volatility) and the vertical axis shows expected annual return. Each colored dot represents an investment type: Savings Account, US Bonds, Balanced 60/40, Stock Index (S&P), Growth Stock, and Crypto (BTC).
2. **Select a time horizon** using the dropdown on the left of the control area. Options include 1, 5, 10, 20, and 30 years.
3. **Adjust the investment amount** using the slider on the right. It ranges from $1,000 to $50,000 in $1,000 increments.
4. **Hover over any investment dot** to see detailed statistics in the panel below the chart: average annual return, volatility, best year, worst year, and projected value based on your selected time horizon and investment amount.
5. **Click the Monte Carlo button** to run 200 randomized simulations for each investment. The results show the median outcome and probability of loss, illustrating how longer time horizons reduce risk for diversified investments.
6. **Note the key insight** at the bottom: higher returns come with more volatility, time reduces loss risk, and past performance does not guarantee future results.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/risk-return/main.html"
        height="497px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Economics)

### Duration
10-15 minutes

### Prerequisites

- Understanding of basic percentage calculations
- Familiarity with the concepts of saving and investing
- Awareness that different investments carry different levels of risk

### Activities

1. **Exploration** (5 min): Set the investment to $10,000 and the time horizon to 10 years. Hover over each investment type and record the projected value. Rank the six investments from lowest to highest projected return, then from lowest to highest risk.
2. **Guided Practice** (5 min): Compare the projected value of a Stock Index investment at 1-year vs. 30-year time horizons. Run the Monte Carlo simulation at both horizons. Discuss how time horizon affects the probability of loss and why younger investors can often tolerate more risk.
3. **Assessment** (5 min): A fictional investor has $20,000 and a 20-year time horizon. Using the simulator data, recommend an investment strategy and explain the trade-off between risk and expected return. Include at least one specific data point from the Monte Carlo results.

### Assessment

- Students can explain the relationship between risk and expected return using the scatter plot
- Students can describe how time horizon affects investment risk using Monte Carlo results
- Students can recommend an appropriate investment for a given scenario with supporting evidence

## References

1. [Risk-Return Tradeoff](https://en.wikipedia.org/wiki/Risk%E2%80%93return_spectrum) - Wikipedia article on the risk-return spectrum across different asset classes
2. [Risk and Return](https://www.investopedia.com/terms/r/riskreturntradeoff.asp) - Investopedia explanation of the risk-return tradeoff in investing
3. [Monte Carlo Simulation](https://en.wikipedia.org/wiki/Monte_Carlo_method) - Wikipedia overview of Monte Carlo methods used in financial modeling
