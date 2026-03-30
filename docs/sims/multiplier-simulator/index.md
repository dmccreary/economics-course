---
title: Multiplier Effect Simulator
description: Interactive p5.js MicroSim for multiplier effect simulator.
image: /sims/multiplier-simulator/multiplier-simulator.png
og:image: /sims/multiplier-simulator/multiplier-simulator.png
twitter:image: /sims/multiplier-simulator/multiplier-simulator.png
social:
   cards: false
quality_score: 76
---

# Multiplier Effect Simulator

<iframe src="main.html" height="582px" width="100%" scrolling="no"></iframe>

[Run the Multiplier Effect Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim demonstrates the spending multiplier effect, showing how an initial injection of government spending cascades through the economy as each recipient spends a portion and saves the rest. The bar chart displays each successive round of spending, with bars getting smaller as money leaks out through saving. Students can adjust the Marginal Propensity to Consume (MPC) and initial spending amount to see how the multiplier formula (1 / (1 - MPC)) determines the total economic impact. This is a key concept for understanding why fiscal policy has a magnified effect on GDP.

## How to Use

1. **Set the Initial Spending**: Use the top slider to set the government spending injection between $10M and $100M.
2. **Set the MPC**: Use the second slider to adjust the Marginal Propensity to Consume between 0.50 and 0.95. A higher MPC means people spend more of each dollar they receive, creating a larger multiplier.
3. **Inject Spending**: Click "Inject Spending" to animate the full cascade of spending rounds, or click "Step" to advance one round at a time.
4. **Observe the Results**: Watch the bar chart fill in round by round. The cumulative total and a progress bar show how close the total impact is to the theoretical maximum.
5. **Show Formula**: Click "Show Formula" to see the multiplier calculation with your current MPC value.
6. **Auto-play**: Check the "Auto-play" checkbox to let the animation run continuously.
7. **Reset**: Click "Reset" to clear all rounds and start fresh.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/multiplier-simulator/main.html"
        height="582px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Economics)

### Duration
10-15 minutes

### Prerequisites

- Understanding of GDP and government spending as a component
- Concept of saving vs. spending (marginal propensity to consume and save)
- Basic understanding of fractions and ratios

### Activities

1. **Exploration** (5 min): Set spending to $50M and MPC to 0.80. Click "Inject Spending" and watch the cascade. How many rounds does it take for individual round spending to drop below $1M? Click "Show Formula" to verify the multiplier equals 5.
2. **Guided Practice** (5 min): Compare MPC = 0.60 vs. MPC = 0.90 with the same $50M initial spending. Record the multiplier and total impact for each. Discuss why an economy where people save more (lower MPC) has a smaller multiplier effect.
3. **Assessment** (5 min): The government injects $100M into the economy. If the MPC is 0.75, calculate the multiplier and total impact by hand. Then use the sim to verify your answer. Explain in one sentence why the total impact exceeds the initial spending.

### Assessment

- Students can calculate the spending multiplier using the formula 1 / (1 - MPC)
- Students can explain why a higher MPC leads to a larger total economic impact
- Students can describe how each round of spending gets smaller due to saving and predict the approximate total impact

## References

1. [Multiplier (Economics) - Wikipedia](https://en.wikipedia.org/wiki/Multiplier_(economics)) - Overview of the Keynesian spending multiplier and its role in fiscal policy.
2. [The Spending Multiplier - Khan Academy](https://www.khanacademy.org/economics-finance-domain/macroeconomics/macro-national-income-and-price-determination/macro-multipliers/v/the-spending-multiplier) - Video lesson on the multiplier effect with examples.
3. [Marginal Propensity to Consume - Investopedia](https://www.investopedia.com/terms/m/marginalpropensitytoconsume.asp) - Explanation of MPC and its relationship to the multiplier.
