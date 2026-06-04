---
title: Tragedy of the Commons Simulator
description: Interactive p5.js MicroSim for tragedy of the commons simulator.
image: /sims/tragedy-commons/tragedy-commons.png
og:image: /sims/tragedy-commons/tragedy-commons.png
twitter:image: /sims/tragedy-commons/tragedy-commons.png
social:
   cards: false
quality_score: 76
---

# Tragedy of the Commons Simulator

<iframe src="main.html" height="522px" width="100%" scrolling="no"></iframe>

[Run the Tragedy of the Commons Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim simulates a shared fishing lake where you and three AI fishers compete to harvest fish. The fish population reproduces according to logistic growth, but if total harvesting exceeds reproduction, the population declines and can collapse entirely. Each fisher profits by catching more, but if everyone maximizes their individual catch, the shared resource is destroyed. This demonstrates the tragedy of the commons -- one of the most important concepts in environmental and resource economics.

## How to Use

1. **Set your fishing rate** using the "Your rate" slider (0 to 80 fish per year).
2. **Set AI fisher behavior** using the three dropdown menus (Conservative, Moderate, or Aggressive). Conservative fishers take 15 fish/year, Moderate take 30, and Aggressive take 50.
3. **Click "Advance 1 Year"** to simulate one year of fishing and reproduction, or **click "Run 10 Years"** to simulate a decade at once.
4. **Watch the lake visualization** on the left -- gold dots represent fish, and the total count is displayed in the center. If the population drops below 50, the fishery collapses.
5. **Monitor the population graph** on the right, which shows fish population over time with green (sustainable) and red (danger) reference lines.
6. **Read the stats panel** for reproduction rate, total harvest, net change, maximum sustainable yield, your catch, and your profit.
7. **Click Reset** to restore the lake to its starting population of 1,000 fish.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/tragedy-commons/main.html"
        height="522px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Economics)

### Duration
10-15 minutes

### Prerequisites

- Understanding of renewable resources and sustainability
- Basic knowledge of supply and incentives
- Awareness that shared resources face unique economic challenges

### Activities

1. **Exploration** (5 min): Have students set all AI fishers to Aggressive and their own rate to 50. Run the simulation for 10 years and observe the collapse. Then reset, set everyone to Conservative (15/year), and run again. Compare the outcomes and total profits.
2. **Guided Practice** (5 min): Challenge students to find the maximum sustainable yield -- the highest total harvest rate that keeps the fish population stable indefinitely. Discuss why individual fishers are unlikely to voluntarily limit their catch even when they know the sustainable level.
3. **Assessment** (5 min): Students propose three different policy solutions to prevent overfishing (e.g., fishing quotas, property rights, taxes, seasonal closures) and explain how each addresses the misalignment between individual and collective incentives.

### Assessment

- Students can explain the tragedy of the commons using the fishing simulation as evidence.
- Students can identify the maximum sustainable yield and explain why unregulated harvesting exceeds it.
- Students can compare at least two policy solutions for managing common resources and evaluate their tradeoffs.

## References

1. [Tragedy of the commons - Wikipedia](https://en.wikipedia.org/wiki/Tragedy_of_the_commons) -- Garrett Hardin's foundational concept explaining how shared resources are overexploited.
2. [Common-pool resource - Wikipedia](https://en.wikipedia.org/wiki/Common-pool_resource) -- Economic analysis of resources that are rivalrous but non-excludable, like fisheries.
3. [Overfishing - Wikipedia](https://en.wikipedia.org/wiki/Overfishing) -- Real-world examples of fishery collapse and management strategies that connect directly to this simulation.
