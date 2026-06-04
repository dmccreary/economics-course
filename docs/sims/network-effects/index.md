---
title: Network Effects Visualizer
description: Interactive p5.js MicroSim for network effects visualizer.
image: /sims/network-effects/network-effects.png
og:image: /sims/network-effects/network-effects.png
twitter:image: /sims/network-effects/network-effects.png
social:
   cards: false
quality_score: 76
---

# Network Effects Visualizer

<iframe src="main.html" height="532px" width="100%" scrolling="no"></iframe>

[Run the Network Effects Visualizer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim visualizes Metcalfe's Law by showing how the value of a network grows proportionally to the square of its users. Students add users to a network and watch as nodes and connections multiply on screen, with a metrics panel displaying user count, possible connections, and total network value. The sim also lets students compare their network against a competitor to understand first-mover advantage and includes preset scenarios based on real platforms like Facebook, WhatsApp, and PayPal.

## How to Use

1. **Click "Add 10 Users"** to grow your network. Watch new nodes appear and connections form between nearby users. Each click adds 10 users to the visualization.
2. **Click "Start from Scratch"** to reset the network back to 5 users and clear the competitor.
3. **Adjust the Speed slider** to control how fast the physics animation runs (1 = slow, 5 = fast). This affects how quickly nodes settle into position.
4. **Check "Show Competitor"** to display a second network's metrics below your own. This reveals the competitive advantage ratio between the two networks.
5. **Select a preset scenario** from the dropdown (Facebook vs MySpace, WhatsApp Growth, PayPal Network) to load real-world-inspired network sizes for both your platform and the competitor.
6. **Read the metrics panel** at the bottom of the visualization to see user count, possible connections (n*(n-1)/2), network value (n-squared), and value per user. Notice the "Past tipping point!" indicator when your network exceeds 30 users.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/network-effects/main.html"
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

- Understanding of basic exponents (squaring a number)
- Familiarity with social media platforms and how they grow
- Awareness that some markets tend toward monopoly or dominant players

### Activities

1. **Exploration** (5 min): Start from scratch and click "Add 10 Users" five times, recording the network value after each click. Plot these values on paper to see the exponential growth curve. Explain why doubling users more than doubles the network value.
2. **Guided Practice** (5 min): Select the "Facebook vs MySpace" scenario and examine the advantage ratio. Discuss why a network with 80 users has far more than twice the value of a network with 40 users. Connect this to why social media markets tend toward winner-take-all outcomes.
3. **Assessment** (5 min): Using the competitor comparison feature, explain in writing why it is so difficult for a new social network to compete with an established one, even if the new platform has better features. Use specific numbers from the simulator to support your argument.

### Assessment

- Students can state Metcalfe's Law and explain why network value grows as n-squared
- Students can define "tipping point" and "critical mass" in the context of network effects
- Students can explain first-mover advantage using quantitative evidence from the simulator

## References

1. [Network Effect](https://en.wikipedia.org/wiki/Network_effect) - Wikipedia article on network effects, Metcalfe's Law, and their role in technology markets
2. [Metcalfe's Law](https://en.wikipedia.org/wiki/Metcalfe%27s_law) - Wikipedia explanation of the mathematical relationship between network size and value
3. [Network Effects](https://www.investopedia.com/terms/n/network-effect.asp) - Investopedia overview of how network effects create competitive advantages and barriers to entry
