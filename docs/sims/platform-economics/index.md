---
title: Platform Economics Simulator
description: Interactive p5.js MicroSim for platform economics simulator.
image: /sims/platform-economics/platform-economics.png
og:image: /sims/platform-economics/platform-economics.png
twitter:image: /sims/platform-economics/platform-economics.png
social:
   cards: false
quality_score: 76
---

# Platform Economics Simulator

<iframe src="main.html" height="612px" width="100%" scrolling="no"></iframe>

[Run the Platform Economics Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim models a two-sided platform market where buyers and sellers must both be present for the platform to succeed. Students control subsidies and fees for each side, then launch the platform to watch growth unfold in real time. The simulation demonstrates the "chicken-and-egg" problem that all platforms face: buyers only join if sellers are present, and vice versa. Preset strategies modeled after Uber, Amazon, and Facebook show how real companies solved this problem using different subsidy approaches.

## How to Use

1. **Select a preset strategy** from the dropdown (Uber Model, Amazon Model, Facebook Model) or leave it on Custom to set your own values. Each preset loads different subsidy and fee levels that reflect how real platforms bootstrapped growth.
2. **Adjust the Subsidy sliders** for Buyers and Sellers (0-10 each). Higher subsidies attract more users to that side of the platform but cost the platform money.
3. **Adjust the Fee sliders** for Buyers and Sellers (0-10 each). Higher fees generate revenue but discourage users from joining.
4. **Click "Launch Platform"** to start the simulation. Blue dots represent buyers/users on the left, and coral dots represent sellers/creators on the right. Green lines show successful matches between the two sides.
5. **Watch the critical mass bars** inside the platform rectangle. When both bars fill to the top, the platform has reached critical mass and growth becomes self-sustaining.
6. **Monitor the growth chart** in the center showing buyer (blue) and seller (coral) growth over time, along with match count and cumulative revenue.
7. **Read the status messages** at the bottom: the platform either fails (if one side drops below 2 users), succeeds (if both sides exceed critical mass of 30), or shows strategy tips during growth.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/platform-economics/main.html"
        height="612px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Economics)

### Duration
10-15 minutes

### Prerequisites

- Understanding of supply and demand basics
- Familiarity with the concept of marketplaces (buyers and sellers)
- Basic awareness of platform businesses like Uber, Amazon, or social media companies

### Activities

1. **Exploration** (5 min): Launch the platform with default settings and observe what happens. Then try setting both subsidies to 0 and both fees to maximum. Launch again and note why the platform fails. Reset and try maximum subsidies with zero fees to see the difference.
2. **Guided Practice** (5 min): Try each preset strategy (Uber, Amazon, Facebook) and record which side each company subsidizes more heavily. Discuss why Uber subsidizes sellers (drivers) more than buyers, while Facebook subsidizes both sides equally with zero fees.
3. **Assessment** (5 min): Design a launch strategy for a new food delivery platform. Choose subsidy and fee levels, explain your reasoning, and run the simulation to test your strategy. Write a paragraph explaining the chicken-and-egg problem and how your strategy addresses it.

### Assessment

- Students can explain the chicken-and-egg problem in two-sided markets
- Students can describe how subsidies and fees affect platform growth on each side
- Students can define "critical mass" and explain why growth becomes self-sustaining once it is reached
- Students can compare different platform strategies and explain why different businesses use different approaches

## References

1. [Two-Sided Market](https://en.wikipedia.org/wiki/Two-sided_market) - Wikipedia article on two-sided markets, platform economics, and the chicken-and-egg problem
2. [Platform Economy](https://en.wikipedia.org/wiki/Platform_economy) - Wikipedia overview of the platform economy and how digital platforms create value
3. [Platform Business Model](https://www.investopedia.com/terms/p/platform-business-model.asp) - Investopedia explanation of how platform businesses generate revenue and achieve network effects
