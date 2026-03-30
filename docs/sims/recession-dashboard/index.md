---
title: Recession Indicators Dashboard
description: Interactive p5.js MicroSim for recession indicators dashboard.
image: /sims/recession-dashboard/recession-dashboard.png
og:image: /sims/recession-dashboard/recession-dashboard.png
twitter:image: /sims/recession-dashboard/recession-dashboard.png
social:
   cards: false
quality_score: 76
---

# Recession Indicators Dashboard

<iframe src="main.html" height="537px" width="100%" scrolling="no"></iframe>

[Run the Recession Indicators Dashboard MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim presents a multi-indicator economic dashboard that helps students understand how economists identify recessions. Six key indicators -- Real GDP Growth, Unemployment, Consumer Confidence, Retail Sales Growth, Industrial Production, and the Leading Economic Index -- are displayed as color-coded panels with sparkline trend charts. By scrubbing through years from 2000 to 2024, students can see how these indicators moved together during the 2001 recession, the 2008 financial crisis, and the 2020 COVID shock, and compare them to periods of expansion.

## How to Use

1. **Drag the Year Slider:** Move the slider at the bottom to select any year from 2000 to 2024. All six indicator panels and the GDP timeline update immediately.
2. **Read the Indicator Panels:** Each panel shows the current value, a color-coded status dot (green = healthy, orange = warning, red = danger), and a 10-year sparkline trend chart.
3. **Check the Overall Status:** The header displays the overall economic classification (Expansion, Recovery, Warning Signs, or Recession) based on a composite score of all six indicators.
4. **Use Preset Buttons:** Click "2008 Crisis," "COVID 2020," "Expansion," or "2024" to jump directly to notable economic periods.
5. **Study the GDP Timeline:** The bar chart at the bottom shows GDP growth for every year from 2000 to 2024, with the currently selected year highlighted in blue.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/recession-dashboard/main.html"
        height="537px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Economics)

### Duration
10-15 minutes

### Prerequisites

- Basic understanding of GDP and what economic growth means
- Familiarity with unemployment rate as an economic measure
- Knowledge of the business cycle (expansion, peak, contraction, trough)

### Activities

1. **Exploration** (5 min): Use the preset buttons to jump between the 2008 Crisis and the 2017 Expansion. List which indicators changed the most dramatically. Discuss why some indicators (like unemployment) lag behind GDP changes.
2. **Guided Practice** (5 min): Slowly scrub through 2007 to 2010 one year at a time. Identify which indicator turned negative first (the leading indicator) and which recovered last (unemployment). Explain why leading indicators are valuable for policymakers.
3. **Assessment** (5 min): Compare the 2008 financial crisis with the 2020 COVID recession. Write three observations about how they differed in severity, speed, and recovery pattern using evidence from the dashboard.

### Assessment

- Students can identify at least four key indicators economists use to diagnose recessions
- Students can distinguish between leading, coincident, and lagging indicators
- Students can use historical data to compare different recessions and explain why each had unique characteristics

## References

1. [Recession - Wikipedia](https://en.wikipedia.org/wiki/Recession) - Definition, causes, and historical examples of economic recessions
2. [Business Cycle - Wikipedia](https://en.wikipedia.org/wiki/Business_cycle) - Overview of expansion, peak, contraction, and trough phases
3. [Leading Economic Indicators - Investopedia](https://www.investopedia.com/terms/l/leadingindicator.asp) - Explanation of the indicators economists use to predict recessions
