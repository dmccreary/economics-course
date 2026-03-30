---
title: Elasticity Calculator
description: Interactive p5.js MicroSim for elasticity calculator.
image: /sims/elasticity-calculator/elasticity-calculator.png
og:image: /sims/elasticity-calculator/elasticity-calculator.png
twitter:image: /sims/elasticity-calculator/elasticity-calculator.png
social:
   cards: false
quality_score: 76
---

# Elasticity Calculator

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the Elasticity Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim calculates price elasticity of demand using the midpoint method and provides a step-by-step breakdown of the math involved. Students set before-and-after prices and quantities using sliders, and the simulation displays a mini demand curve graph, a color-coded elasticity gauge (from perfectly inelastic to highly elastic), and a plain-language interpretation of the result. Preset scenarios for goods like gasoline, insulin, movie tickets, and restaurant meals let students quickly compare how different products respond to price changes.

## How to Use

1. **Set the "Before" values** using the left-side Price and Quantity sliders to establish the initial price and quantity demanded.
2. **Set the "After" values** using the right-side Price and Quantity sliders to represent the new price and the resulting quantity demanded.
3. **Read the step-by-step calculation** below the graph, which shows the percent change in quantity, percent change in price, and the resulting elasticity using the midpoint formula.
4. **Check the elasticity gauge** on the right, where a needle points to the calculated elasticity value on a color-coded scale ranging from Very Inelastic (red) to Very Elastic (green).
5. **Select a preset** from the dropdown menu (Gasoline, Movie Tickets, Insulin, Restaurant Meals) to see realistic elasticity values for different products and compare their responsiveness to price changes.
6. **Read the interpretation** at the bottom, which explains in plain language what the elasticity value means for consumer behavior.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/elasticity-calculator/main.html"
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

- Understanding of the law of demand and demand curves
- Basic ability to calculate percentage changes
- Familiarity with the idea that some goods are more essential than others

### Activities

1. **Exploration** (5 min): Select each of the four presets (Gasoline, Movie Tickets, Insulin, Restaurant Meals) and record the elasticity value for each. Rank them from most inelastic to most elastic and explain why insulin has a very different elasticity than movie tickets.
2. **Guided Practice** (5 min): Using the Custom preset, set Price from $10 to $12 and Quantity from 100 to 80. Follow the step-by-step calculation on screen and verify each step on paper using the midpoint formula: Ed = |(%Change in Q) / (%Change in P)|. Then change the quantity from 100 to 95 and observe how elasticity changes.
3. **Assessment** (5 min): Without using the presets, create a scenario where elasticity is approximately 1.0 (unit elastic) by adjusting the sliders. Explain what unit elasticity means for a business deciding whether to raise or lower prices.

### Assessment

- Students can calculate price elasticity of demand using the midpoint method
- Students can classify demand as elastic, inelastic, or unit elastic based on the elasticity value
- Students can explain why different goods have different elasticities and what this means for pricing decisions

## References

1. [Price Elasticity of Demand - Wikipedia](https://en.wikipedia.org/wiki/Price_elasticity_of_demand) - Comprehensive overview of elasticity including the midpoint method, determinants, and real-world applications.
2. [Price Elasticity of Demand - Investopedia](https://www.investopedia.com/terms/p/priceelasticity.asp) - Practical explanation with examples of elastic and inelastic goods.
3. [Elasticity of Demand - Khan Academy](https://www.khanacademy.org/economics-finance-domain/microeconomics/elasticity-tutorial/price-elasticity-tutorial/a/price-elasticity-of-demand-and-price-elasticity-of-supply) - Lesson on computing and interpreting price elasticity of demand and supply.
