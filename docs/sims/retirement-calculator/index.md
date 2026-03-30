---
title: Retirement Savings Calculator
description: Interactive p5.js MicroSim for retirement savings calculator.
image: /sims/retirement-calculator/retirement-calculator.png
og:image: /sims/retirement-calculator/retirement-calculator.png
twitter:image: /sims/retirement-calculator/retirement-calculator.png
social:
   cards: false
quality_score: 76
---

# Retirement Savings Calculator

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run the Retirement Savings Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim demonstrates the power of compound interest by letting students model retirement savings over decades. Students adjust their starting age, retirement age, salary, savings rate, employer match percentage, and investment return profile to see how their nest egg grows over time. The sim displays a growth chart, a breakdown of contributions vs. employer match vs. investment growth, and calculates monthly retirement income using the 4% withdrawal rule. It also compares the cost of waiting five years to start saving.

## How to Use

1. **Set your starting age** using the first slider (range: 18-40). This is when you begin contributing to retirement savings.
2. **Set your retirement age** using the second slider (range: 55-70). The sim calculates growth over the years between your start and retirement ages.
3. **Adjust your salary** using the salary slider ($30,000 to $100,000 in $5,000 increments).
4. **Set your savings rate** as a percentage of salary using the savings rate slider (5% to 25%).
5. **Set the employer match** percentage (0% to 6%). The employer contributes this percentage of your salary on top of your own contributions.
6. **Select a return profile** from the dropdown: Conservative (5%), Moderate (7%), or Aggressive (10%).
7. **Toggle the salary growth checkbox** to model a 3% annual raise, which increases contributions over time.
8. **Read the results**: the projected nest egg at retirement, monthly retirement income (using the 4% rule), a growth chart, and a breakdown showing how much came from your contributions, employer match, and investment growth. The sim also shows how much extra you earn by starting now instead of waiting five years.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/retirement-calculator/main.html"
        height="552px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Economics)

### Duration
10-15 minutes

### Prerequisites

- Understanding of percentages and basic multiplication
- Familiarity with the concept of interest and compound growth
- Basic awareness of retirement and why people save for it

### Activities

1. **Exploration** (5 min): Set starting age to 22, retirement age to 65, salary to $50,000, and savings rate to 10% with a 3% employer match. Record the projected nest egg and monthly retirement income. Then change the starting age to 32 and observe how much the nest egg shrinks.
2. **Guided Practice** (5 min): Compare the breakdown bars for a Conservative vs. Aggressive return profile. Discuss why investment growth makes up a larger share of the total with aggressive returns and longer time horizons. Calculate the dollar value of the employer match and explain why "free money" from an employer match should not be left on the table.
3. **Assessment** (5 min): Design a savings plan for a 25-year-old earning $40,000 who wants at least $1 million by age 65. Experiment with savings rate, employer match, and return profile to find a combination that works, and explain the trade-offs in a short paragraph.

### Assessment

- Students can explain how compound interest causes exponential growth over long time periods
- Students can quantify the cost of delaying retirement savings by five years
- Students can describe the role of employer matching and why maximizing the match is important
- Students can use the 4% rule to estimate monthly retirement income from a given nest egg

## References

1. [Compound Interest](https://en.wikipedia.org/wiki/Compound_interest) - Wikipedia article explaining how compound interest accelerates savings growth over time
2. [Retirement Planning](https://www.investopedia.com/terms/r/retirement-planning.asp) - Investopedia guide to retirement planning strategies and the 4% withdrawal rule
3. [Saving and Investing](https://www.khanacademy.org/economics-finance-domain/core-finance/investment-vehicles-tutorial) - Khan Academy lessons on investment vehicles and long-term savings strategies
