---
title: Fiscal Policy Impact Simulator
description: Interactive p5.js MicroSim for fiscal policy impact simulator.
image: /sims/fiscal-policy-simulator/fiscal-policy-simulator.png
og:image: /sims/fiscal-policy-simulator/fiscal-policy-simulator.png
twitter:image: /sims/fiscal-policy-simulator/fiscal-policy-simulator.png
social:
   cards: false
quality_score: 76
---

# Fiscal Policy Impact Simulator

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the Fiscal Policy Impact Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim demonstrates how changes in government spending and taxation affect key economic indicators including GDP growth, unemployment, inflation, and the debt-to-GDP ratio. Students can select different starting economic conditions (Recession, Normal, or Overheating) and then adjust fiscal policy levers to see how expansionary or contractionary policies produce different outcomes. The simulation uses a simplified fiscal multiplier model to illustrate how the same policy can have very different effects depending on economic conditions.

## How to Use

1. **Select Economic Conditions** -- Use the dropdown at the top of the control area to choose a starting scenario: Recession (low GDP, high unemployment), Normal, or Overheating (high GDP, high inflation).
2. **Adjust Government Spending** -- Move the Spending slider left to cut spending or right to increase it (range: -20% to +20%).
3. **Adjust Tax Rates** -- Move the Taxes slider left to cut taxes or right to raise them (range: -20% to +20%).
4. **Read the Gauges** -- Observe the four semicircular gauge indicators showing GDP Growth, Unemployment, Inflation, and Debt/GDP. Green zones indicate healthy ranges; red zones indicate danger.
5. **Compare Before vs. After** -- The horizontal bar charts show how each indicator changed from the baseline to your policy choice.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/fiscal-policy-simulator/main.html"
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

- Understanding of basic fiscal policy concepts (government spending and taxation)
- Familiarity with GDP, unemployment, and inflation
- Introduction to the multiplier effect

### Activities

1. **Exploration** (5 min): Set the economy to "Recession" and experiment with different spending and tax combinations. Have students find the policy mix that brings unemployment closest to 4% without pushing inflation above 3%.
2. **Guided Practice** (5 min): Compare the effects of the same policy (e.g., +15% spending) under all three economic conditions. Students record their observations about why expansionary policy helps during a recession but causes problems during overheating.
3. **Assessment** (5 min): Students explain in writing what "expansionary" and "contractionary" fiscal policy mean, and describe a scenario where each would be the appropriate choice, citing evidence from the simulator.

### Assessment

- Can the student distinguish between expansionary and contractionary fiscal policy?
- Can the student explain why the same policy produces different results under different economic conditions?
- Does the student understand the tradeoff between stimulating growth and controlling inflation?

## References

1. [Fiscal policy - Wikipedia](https://en.wikipedia.org/wiki/Fiscal_policy)
2. [Fiscal multiplier - Wikipedia](https://en.wikipedia.org/wiki/Fiscal_multiplier)
3. [Fiscal Policy - Khan Academy](https://www.khanacademy.org/economics-finance-domain/macroeconomics/macro-fiscal-policy)
