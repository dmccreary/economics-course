---
title: Unemployment Rate Calculator
description: Interactive p5.js MicroSim for unemployment rate calculator.
image: /sims/unemployment-calculator/unemployment-calculator.png
og:image: /sims/unemployment-calculator/unemployment-calculator.png
twitter:image: /sims/unemployment-calculator/unemployment-calculator.png
social:
   cards: false
quality_score: 76
---

# Unemployment Rate Calculator

<iframe src="main.html" height="562px" width="100%" scrolling="no"></iframe>

[Run the Unemployment Rate Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim lets students calculate the unemployment rate by adjusting the number of employed, unemployed, and not-in-labor-force people using sliders. A visual gauge displays the resulting U-3 unemployment rate with color-coded sections (green for healthy, red for crisis levels), while a diagram shows how population components combine to form the labor force. Students can also toggle a broader U-6 rate that includes discouraged and underemployed workers, revealing how the official rate can understate true joblessness. Preset buttons for Recession and Recovery scenarios let students quickly compare different economic conditions.

## How to Use

1. **Adjust the Sliders**: Move the Employed, Unemployed, and Not in Labor Force sliders to change population numbers (in millions) and watch the gauge needle and formula update in real time.
2. **Read the Gauge**: The semicircular gauge on the right shows the U-3 unemployment rate with green (0-4%), yellow (4-6%), orange (6-10%), and red (10%+) zones.
3. **Try Preset Scenarios**: Click "Recession" to simulate a downturn (more unemployed, fewer employed) or "Recovery" for a healthy economy. Click "Reset" to return to default values.
4. **Show the Broader Rate**: Check the "Show Broader (U-6) Rate" checkbox to see an estimate that includes discouraged workers and underemployed people. Compare the U-6 rate to the official U-3 rate.
5. **Read the Critical Thinking Note**: The insight at the bottom explains the paradox that discouraged workers re-entering the labor force temporarily increases the unemployment rate.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/unemployment-calculator/main.html"
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

- Understanding of the labor force (employed + unemployed)
- Awareness that not all people without jobs count as "unemployed"
- Basic percentage calculations

### Activities

1. **Exploration** (5 min): Click "Recession" and note the unemployment rate. Then slowly move the Employed slider up and Unemployed slider down to simulate recovery. At what point does the gauge move from red to green?
2. **Guided Practice** (5 min): Enable the "Show Broader (U-6) Rate" checkbox. Compare the official U-3 and broader U-6 rates during the Recession preset. Why is the U-6 rate always higher? Move the Not in Labor Force slider down by 5M and observe what happens to the unemployment rate.
3. **Assessment** (5 min): Starting from the Reset values, reduce the employed count by 10M and increase the not-in-labor-force count by 10M (people left the labor force). Calculate the new unemployment rate. Then instead add those 10M to unemployed. Compare the two results and explain the difference.

### Assessment

- Students can correctly calculate the unemployment rate from given values using the formula (Unemployed / Labor Force) x 100
- Students can explain the difference between the U-3 and U-6 unemployment rates
- Students can describe the paradox of how people leaving the labor force can make the unemployment rate appear lower

## References

1. [Unemployment - Wikipedia](https://en.wikipedia.org/wiki/Unemployment) - Comprehensive overview of unemployment measurement, types, and global comparisons.
2. [U-3 vs. U-6 Unemployment Rate - Investopedia](https://www.investopedia.com/articles/investing/080415/true-unemployment-rate-u6-vs-u3.asp) - Explanation of different unemployment measures and what they reveal.
3. [How the Government Measures Unemployment - Bureau of Labor Statistics](https://www.bls.gov/cps/cps_htgm.htm) - Official description of how unemployment statistics are collected and calculated.
