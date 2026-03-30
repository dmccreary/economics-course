---
title: Phillips Curve Explorer
description: Interactive p5.js MicroSim for phillips curve explorer.
image: /sims/phillips-curve/phillips-curve.png
og:image: /sims/phillips-curve/phillips-curve.png
twitter:image: /sims/phillips-curve/phillips-curve.png
social:
   cards: false
quality_score: 76
---

# Phillips Curve Explorer

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run the Phillips Curve Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim visualizes the Phillips Curve -- the historical relationship between unemployment and inflation -- using real US data from the 1960s through the 2020s. Each decade's data points are color-coded so students can see how the relationship changed over time: a tight tradeoff in the 1960s, stagflation in the 1970s, a return to pattern in the 1980s-90s, a very flat curve in the 2000s-10s, and recent pandemic-era volatility. Students can also adjust a policy stimulus slider, toggle the natural rate of unemployment (NAIRU) line, and explore how inflation expectations shift the curve.

## How to Use

1. **Select a Decade** -- Use the dropdown to view data from a specific decade (1960s, 1970s, 1980s-90s, 2000s-10s, or 2020s).
2. **Show All Decades** -- Check "Show All" to overlay all decades simultaneously and compare patterns.
3. **Toggle Natural Rate** -- Check "Natural Rate" to display the NAIRU (Non-Accelerating Inflation Rate of Unemployment) vertical line at 5%.
4. **Toggle Expectations** -- Check "Expectations" to see how inflation expectations shift the short-run Phillips Curve up or down, with faded background curves showing alternative expectation levels.
5. **Adjust Policy Stimulus** -- Move the slider to shift the economy's position along the Phillips Curve and observe the tradeoff between unemployment and inflation.
6. **Animate History** -- Click "Animate History" to watch the decades cycle through automatically, revealing how the relationship evolved over time.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/phillips-curve/main.html"
        height="602px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Economics)

### Duration
10-15 minutes

### Prerequisites

- Understanding of inflation and unemployment as economic indicators
- Basic knowledge of macroeconomic policy goals
- Familiarity with reading scatter plots

### Activities

1. **Exploration** (5 min): Have students click "Animate History" and watch the decades unfold. Then select each decade individually and read the insight text. Ask students to note which decade broke the simple Phillips Curve story and what happened.
2. **Guided Practice** (5 min): Turn on "Show All" and "Natural Rate" simultaneously. Ask students to explain why the 1970s data points are in the upper-right quadrant (high inflation AND high unemployment). Then enable "Expectations" and show how changing expectations shifts the entire curve.
3. **Assessment** (5 min): Students answer: "A politician claims that lowering unemployment will not cause inflation. Based on the historical data in the Phillips Curve Explorer, evaluate this claim using evidence from at least two different decades."

### Assessment

- Can the student describe the basic Phillips Curve relationship between unemployment and inflation?
- Can the student explain why the 1970s stagflation challenged the original Phillips Curve theory?
- Does the student understand how inflation expectations can shift the short-run Phillips Curve?

## References

1. [Phillips curve - Wikipedia](https://en.wikipedia.org/wiki/Phillips_curve)
2. [NAIRU - Wikipedia](https://en.wikipedia.org/wiki/NAIRU)
3. [Stagflation - Wikipedia](https://en.wikipedia.org/wiki/Stagflation)
