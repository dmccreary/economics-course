---
title: Correlation vs Causation Detector
description: Interactive p5.js MicroSim for correlation vs causation detector.
image: /sims/correlation-causation/correlation-causation.png
og:image: /sims/correlation-causation/correlation-causation.png
twitter:image: /sims/correlation-causation/correlation-causation.png
social:
   cards: false
quality_score: 76
---

# Correlation vs Causation Detector

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the Correlation vs Causation Detector MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim is a quiz-style game that presents students with real-world correlation claims and challenges them to identify the correct explanation: True Causation, Common Cause (confounding variable), Reverse Causation, or Coincidence. Each claim comes with a detailed explanation and a causal diagram showing the actual relationships between variables. This is essential training for critical thinking in economics, where misleading correlations are frequently used to support flawed policy arguments.

## How to Use

1. **Read the claim** displayed in quotation marks at the top of the screen.
2. **Click one of the four answer buttons** (True Causation, Common Cause, Reverse Causation, or Coincidence) to select your answer. Your selection will be highlighted in blue.
3. **Click "Check Answer"** to reveal whether you are correct. The correct answer turns green, and if you chose incorrectly, your answer turns red.
4. **Read the explanation panel** on the right, which describes the actual causal relationship and shows a diagram of the variables involved.
5. **Click "Next Claim"** to move to the next scenario. Your running score is tracked in the top-right corner.
6. **Progress dots** at the bottom show which claim you are on out of the total set.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/correlation-causation/main.html"
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

- Basic understanding of data and statistics
- Familiarity with the idea that two things happening together does not mean one causes the other
- Awareness that economic data is often used to make causal claims

### Activities

1. **Exploration** (5 min): Have students work through all six claims individually, selecting answers and reading explanations. Ask them to keep a tally of how many they get correct on the first try.
2. **Guided Practice** (5 min): As a class, revisit the claims that were most commonly answered incorrectly. For each, draw the causal diagram on the board and discuss how to distinguish between common cause, reverse causation, and coincidence. Ask students to think of a real economic example for each type.
3. **Assessment** (5 min): Present students with a new correlation claim not in the game (e.g., "Countries with more McDonald's restaurants have higher GDP") and ask them to classify it, identify the likely confounding variable, and draw a causal diagram.

### Assessment

- Students can define and distinguish between true causation, common cause, reverse causation, and coincidence.
- Students can identify confounding variables in real-world correlation claims.
- Students can evaluate economic arguments critically by recognizing when correlation is being mistaken for causation.

## References

1. [Correlation does not imply causation - Wikipedia](https://en.wikipedia.org/wiki/Correlation_does_not_imply_causation) -- Classic explanation of why statistical correlation between variables does not establish a causal relationship.
2. [Confounding - Wikipedia](https://en.wikipedia.org/wiki/Confounding) -- How hidden third variables can create the appearance of a causal relationship between two unrelated variables.
3. [Spurious Correlations](https://www.tylervigen.com/spurious-correlations) -- Entertaining collection of real datasets that correlate strongly despite having no causal connection, illustrating why critical thinking matters.
