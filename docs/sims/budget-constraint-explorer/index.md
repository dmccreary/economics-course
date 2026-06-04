---
title: Budget Constraint Explorer
description: Interactive p5.js MicroSim for budget constraint explorer.
image: /sims/budget-constraint-explorer/budget-constraint-explorer.png
og:image: /sims/budget-constraint-explorer/budget-constraint-explorer.png
twitter:image: /sims/budget-constraint-explorer/budget-constraint-explorer.png
social:
   cards: false
quality_score: 76
---

# Budget Constraint Explorer

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the Budget Constraint Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim demonstrates how a budget constraint limits a consumer's choices between two goods -- Tacos and Burritos. Students drag a gold point along the budget line to see different affordable combinations, while the shaded green region shows all combinations within the budget. Three sliders let students change the total budget and the prices of each good, revealing how the budget line pivots and shifts in response to economic changes. An info panel calculates the exact quantities, spending totals, and trade-off rate in real time.

## How to Use

1. **Click and drag the gold point** along the budget line to explore different combinations of Tacos and Burritos that exactly spend your budget. The info panel shows the quantities and costs.
2. **Adjust the "Budget" slider** to increase or decrease your total spending money. Watch the budget line shift outward (more money) or inward (less money), expanding or shrinking the affordable region.
3. **Adjust the "Taco Price" slider** to see how changing the price of Tacos pivots the budget line around the Burritos intercept. A higher Taco price means you can afford fewer Tacos.
4. **Adjust the "Burrito Price" slider** to see the budget line pivot around the Tacos intercept.
5. **Read the trade-off rate** in the info panel (such as "1 burrito = 1.3 tacos"), which shows the opportunity cost of one good in terms of the other.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/budget-constraint-explorer/main.html"
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

- Basic understanding of scarcity and limited income
- Ability to read an x-y graph
- Familiarity with the concept of trade-offs

### Activities

1. **Exploration** (5 min): With the default settings ($20 budget, $4 Tacos, $5 Burritos), drag the point to find combinations where you spend all your money on Tacos, all on Burritos, and a balanced mix. Record these three combinations.
2. **Guided Practice** (5 min): Keep the budget at $20 and increase the Taco price from $4 to $8. Observe how the budget line changes. Explain why the maximum number of Burritos you can buy did not change but the maximum number of Tacos decreased. Then increase the budget to $40 and describe what happens to the affordable region.
3. **Assessment** (5 min): Set the budget to $30, Taco price to $5, and Burrito price to $6. Calculate on paper the maximum Tacos (30/5 = 6), maximum Burritos (30/6 = 5), and the trade-off rate (6/5 = 1.2 Tacos per Burrito). Verify your answers match the simulation.

### Assessment

- Students can explain what a budget constraint represents and what the affordable region means
- Students can predict how changes in income or prices shift or pivot the budget line
- Students can calculate the trade-off rate between two goods using their prices

## References

1. [Budget Constraint - Wikipedia](https://en.wikipedia.org/wiki/Budget_constraint) - Explanation of budget constraints, budget lines, and how they relate to consumer choice theory.
2. [Budget Constraints - Khan Academy](https://www.khanacademy.org/economics-finance-domain/microeconomics/choices-opp-cost-702702/consumer-theory-702702/v/budget-line) - Video lesson on how to graph and interpret budget lines.
3. [Budget Constraint - Investopedia](https://www.investopedia.com/terms/b/budget-constraint.asp) - Overview of how budget constraints limit consumer spending and affect decision-making.
