---
title: Tariff Impact Simulator
description: Interactive p5.js MicroSim for tariff impact simulator.
image: /sims/tariff-simulator/tariff-simulator.png
og:image: /sims/tariff-simulator/tariff-simulator.png
twitter:image: /sims/tariff-simulator/tariff-simulator.png
social:
   cards: false
quality_score: 76
---

# Tariff Impact Simulator

<iframe src="main.html" height="542px" width="100%" scrolling="no"></iframe>

[Run the Tariff Impact Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim uses a supply-and-demand diagram to show who really pays for tariffs. Students select a product (Steel, Washing Machines, Solar Panels, or Clothing), then adjust a tariff rate slider to see how the tariff raises the consumer price above the world price, reduces imports, and creates deadweight loss. The visualization clearly demonstrates that tariffs are paid by domestic consumers through higher prices, not by foreign countries -- and shows the cost per job saved for each product. Shaded areas reveal government revenue, producer gains, and deadweight loss triangles.

## How to Use

1. **Select a Product** -- Use the dropdown to choose Steel, Washing Machines, Solar Panels, or Clothing. Each has different supply and demand characteristics.
2. **Adjust the Tariff Rate** -- Move the tariff slider from 0% to 100% to see how tariffs shift the effective price above the green dashed world price line.
3. **Toggle Deadweight Loss** -- Check "Show Deadweight Loss" to display the gray triangles representing economic inefficiency caused by the tariff.
4. **Toggle Who Pays** -- Check "Who Pays?" to see colored shaded areas showing government revenue (green), domestic producer gains (blue), and the price increase paid by consumers.
5. **Read the Info Panel** -- The right side shows before-and-after import quantities, consumer prices, who bears the cost, and the estimated cost per job saved for the selected product.
6. **Press Reset** -- Click Reset to return the tariff to 0%.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/tariff-simulator/main.html"
        height="542px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Economics)

### Duration
10-15 minutes

### Prerequisites

- Understanding of supply and demand curves
- Familiarity with the concept of world prices and imports
- Basic knowledge of tariffs and trade policy

### Activities

1. **Exploration** (5 min): Have students select Steel and slowly increase the tariff from 0% to 50%. Ask them to record what happens to consumer prices, import quantities, and the size of the deadweight loss triangles. Then compare with Clothing to see how different products respond differently.
2. **Guided Practice** (5 min): Set tariffs to 25% on Washing Machines with both checkboxes enabled. Identify the four groups affected (consumers, domestic producers, government, overall economy). Discuss: if the cost per job saved is $815,000/year, is the tariff an efficient way to help workers?
3. **Assessment** (5 min): Students respond to the statement "Tariffs make foreign countries pay" by writing a paragraph that identifies who actually pays for tariffs and explains the concept of deadweight loss, using evidence from the simulator.

### Assessment

- Can the student explain that domestic consumers, not foreign countries, bear the cost of tariffs?
- Can the student identify the four effects of a tariff (higher prices, reduced imports, government revenue, deadweight loss)?
- Does the student understand why tariffs create economic inefficiency even when they protect some jobs?

## References

1. [Tariff - Wikipedia](https://en.wikipedia.org/wiki/Tariff)
2. [Deadweight loss - Wikipedia](https://en.wikipedia.org/wiki/Deadweight_loss)
3. [The Economic Impact of Tariffs - Investopedia](https://www.investopedia.com/terms/t/tariff.asp)
