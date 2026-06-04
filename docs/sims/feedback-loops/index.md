---
title: Systems Thinking Feedback Loops
description: Interactive p5.js MicroSim for systems thinking feedback loops.
image: /sims/feedback-loops/feedback-loops.png
og:image: /sims/feedback-loops/feedback-loops.png
twitter:image: /sims/feedback-loops/feedback-loops.png
social:
   cards: false
quality_score: 76
---

# Systems Thinking Feedback Loops

<iframe src="main.html" height="452px" width="100%" scrolling="no"></iframe>

[Run the Systems Thinking Feedback Loops MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim visualizes positive (reinforcing) and negative (balancing) feedback loops in the context of climate policy economics. Four interconnected nodes -- Carbon Tax, CO2 Emissions, Global Temperature, and Economic Cost -- form a cycle where changes propagate through the system. A higher carbon tax reduces emissions (balancing loop), but higher emissions raise temperature which raises costs which pressures for a higher tax (reinforcing loop). Students can see how complex systems self-regulate and why policies can have cascading, sometimes unexpected, effects.

## How to Use

1. **Click "Start"** to begin the simulation. The system will continuously update as the feedback loops take effect. Click "Pause" to stop the animation at any time.
2. **Click the up and down Carbon Tax buttons** to increase or decrease the carbon tax level by 10 units. Watch how this change propagates through the entire system over time.
3. **Observe the node sizes** -- each circle grows or shrinks based on its current value, making it easy to see the relative magnitude of each variable.
4. **Read the arrow labels** between nodes to understand the direction of each relationship: blue arrows with a minus sign indicate balancing (negative) feedback, and red arrows with a plus sign indicate reinforcing (positive) feedback.
5. **Check the legend** at the bottom explaining the two loop types.
6. **Click Reset** to return all variables to their starting values.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/feedback-loops/main.html"
        height="452px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Economics)

### Duration
10-15 minutes

### Prerequisites

- Basic understanding of cause and effect relationships
- Awareness of climate change and environmental policy concepts
- Familiarity with the idea that economic variables are interconnected

### Activities

1. **Exploration** (5 min): Have students start the simulation with the default carbon tax of 50 and observe how the system reaches a dynamic equilibrium. Then increase the carbon tax to 100 and watch how emissions fall but economic costs initially rise. Ask students to describe what they observe and why.
2. **Guided Practice** (5 min): Reduce the carbon tax to 0 and run the simulation. Discuss what happens to emissions, temperature, and economic costs when there is no policy intervention. Then raise the tax back to 70 and observe the system stabilize at a new equilibrium. Introduce the concept of policy tradeoffs.
3. **Assessment** (5 min): Students draw their own feedback loop diagram for a different economic scenario (e.g., minimum wage increases, interest rate changes, trade tariffs) identifying at least one reinforcing loop and one balancing loop, and explain how the system might reach equilibrium.

### Assessment

- Students can define reinforcing (positive) and balancing (negative) feedback loops and give an economic example of each.
- Students can trace cause-and-effect chains through a system of interconnected variables.
- Students can explain why feedback loops make economic policy outcomes difficult to predict and why systems thinking is valuable.

## References

1. [Feedback - Wikipedia](https://en.wikipedia.org/wiki/Feedback) -- General explanation of positive and negative feedback loops in systems.
2. [Systems thinking - Wikipedia](https://en.wikipedia.org/wiki/Systems_thinking) -- Overview of the systems thinking approach to understanding complex, interconnected problems.
3. [Carbon tax - Wikipedia](https://en.wikipedia.org/wiki/Carbon_tax) -- Real-world application of the policy modeled in this simulation, including economic effects and feedback mechanisms.
