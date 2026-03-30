---
title: Negative Externality Visualizer
description: Interactive p5.js MicroSim for negative externality visualizer.
image: /sims/negative-externality/negative-externality.png
og:image: /sims/negative-externality/negative-externality.png
twitter:image: /sims/negative-externality/negative-externality.png
social:
   cards: false
quality_score: 76
---

# Negative Externality Visualizer

<iframe src="main.html" height="532px" width="100%" scrolling="no"></iframe>

[Run the Negative Externality Visualizer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim demonstrates how production by a factory creates external costs that spill over onto the surrounding community. As you increase production, pollution (or noise, or traffic) spreads outward, affecting more people who bear costs they did not choose. The simulation shows the gap between the private cost the factory pays and the true social cost that includes harm to third parties. This is a core concept in understanding market failure and why government intervention may be needed.

## How to Use

1. **Adjust the Production slider** to increase or decrease the factory's output from 0 to 100 units. Watch the pollution cloud grow and more stick-figure people turn red (affected).
2. **Check "Show Social Cost"** to reveal the external cost and the true social cost alongside the private cost. Notice how the external cost grows quadratically -- a little extra production causes a lot of extra harm.
3. **Click "Show Optimal Level"** to display the socially optimal production level (~35 units) and see whether the current production is above or below it.
4. **Use the externality type dropdown** to switch between Pollution, Noise, and Traffic. Each type shows a different visual effect but the underlying cost dynamics are the same.
5. **Observe the cost panel** at the bottom for a numerical summary of production level, people affected, private cost, external cost, and total social cost.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/negative-externality/main.html"
        height="532px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Economics)

### Duration
10-15 minutes

### Prerequisites

- Understanding of supply, demand, and market equilibrium
- Basic concept of costs in production
- Awareness that markets do not always produce socially optimal outcomes

### Activities

1. **Exploration** (5 min): Have students gradually increase production from 0 to 100 while the "Show Social Cost" checkbox is on. Ask them to record the private cost and social cost at production levels of 25, 50, 75, and 100, and observe how the gap between them widens.
2. **Guided Practice** (5 min): Turn on "Show Optimal Level" and discuss why the socially optimal production level is lower than what a profit-maximizing firm would choose. Switch between Pollution, Noise, and Traffic and discuss real-world examples of each type of externality.
3. **Assessment** (5 min): Students explain in writing why the market overproduces goods with negative externalities and propose one policy solution (such as a Pigouvian tax, regulation, or cap-and-trade) that could move production closer to the social optimum.

### Assessment

- Students can define negative externality and give at least two real-world examples.
- Students can explain the difference between private cost and social cost using data from the simulation.
- Students can describe why unregulated markets overproduce goods with negative externalities and suggest a corrective policy.

## References

1. [Externality - Wikipedia](https://en.wikipedia.org/wiki/Externality) -- Comprehensive overview of positive and negative externalities and their effects on market efficiency.
2. [Negative Externalities - Investopedia](https://www.investopedia.com/terms/e/externality.asp) -- Practical explanation of how externalities create market failure with real-world examples.
3. [Pigouvian tax - Wikipedia](https://en.wikipedia.org/wiki/Pigouvian_tax) -- How taxes can be used to correct negative externalities by aligning private costs with social costs.
