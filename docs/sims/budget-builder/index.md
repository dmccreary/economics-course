---
title: Budget Builder Tool
description: Interactive p5.js MicroSim for budget builder tool.
image: /sims/budget-builder/budget-builder.png
og:image: /sims/budget-builder/budget-builder.png
twitter:image: /sims/budget-builder/budget-builder.png
social:
   cards: false
quality_score: 76
---

# Budget Builder Tool

<iframe src="main.html" height="622px" width="100%" scrolling="no"></iframe>

[Run the Budget Builder Tool MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim lets students build a personal monthly budget by allocating income across eight spending categories including housing, food, transportation, and entertainment. A donut chart updates in real time as students adjust sliders, showing how each category compares to total income and how much remains for savings. The sim also displays the popular 50/30/20 budgeting guideline (needs, wants, savings) and provides feedback when students are over budget or saving too little.

## How to Use

1. **Select an income level** using the dropdown menu at the top of the control area. Options range from $30,000 to $75,000 annual salary, which sets the monthly income displayed in the center of the donut chart.
2. **Adjust each category slider** (Housing, Food, Transportation, Insurance, Entertainment, Subscriptions, Shopping, Other) to set the percentage of income allocated to that category. Each slider ranges from 0% to 50%.
3. **Watch the donut chart** update in real time. Each colored slice represents a spending category, and the gold slice represents your remaining savings.
4. **Check the legend** on the right side to see exact dollar amounts for each category and your savings.
5. **Compare your budget** to the 50/30/20 guideline bar at the bottom: 50% for needs, 30% for wants, and 20% for savings.
6. **Look for feedback messages**: a green message appears when savings reach 20% or more, an orange tip appears when savings drop below 10%, and a red warning appears if you exceed your budget.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/budget-builder/main.html"
        height="622px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Economics)

### Duration
10-15 minutes

### Prerequisites

- Basic understanding of income and expenses
- Familiarity with percentages and how they relate to dollar amounts
- Awareness of common household spending categories

### Activities

1. **Exploration** (5 min): Set income to $50,000 and experiment with different slider combinations. Try to create a budget where savings reaches at least 20%. Note which categories consume the largest share of income.
2. **Guided Practice** (5 min): Compare two budgets side-by-side: one for a $30,000 salary and one for $75,000. Identify how the percentage allocated to housing changes at different income levels and discuss why lower-income households often spend a higher share on necessities.
3. **Assessment** (5 min): Create a budget that follows the 50/30/20 rule as closely as possible. Write down which categories are needs vs. wants, and explain one trade-off you made to reach 20% savings.

### Assessment

- Students can explain the 50/30/20 budgeting guideline and identify which categories are needs vs. wants
- Students can create a balanced budget that does not exceed total income
- Students can describe at least one trade-off involved in increasing savings rate

## References

1. [Personal Budget](https://en.wikipedia.org/wiki/Personal_budget) - Wikipedia article on household budgeting principles and common frameworks
2. [50/30/20 Rule](https://www.investopedia.com/ask/answers/022916/what-502030-budget-rule.asp) - Investopedia guide to the popular budgeting rule popularized by Senator Elizabeth Warren
3. [Budgeting](https://www.khanacademy.org/college-careers-more/personal-finance/pf-saving-and-budgeting) - Khan Academy personal finance unit on saving and budgeting
