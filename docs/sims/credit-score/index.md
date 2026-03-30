---
title: Credit Score Simulator
description: Interactive p5.js MicroSim for credit score simulator.
image: /sims/credit-score/credit-score.png
og:image: /sims/credit-score/credit-score.png
twitter:image: /sims/credit-score/credit-score.png
social:
   cards: false
quality_score: 76
---

# Credit Score Simulator

<iframe src="main.html" height="522px" width="100%" scrolling="no"></iframe>

[Run the Credit Score Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim demonstrates how everyday financial behaviors affect your FICO credit score across five weighted factors: payment history, credit utilization, credit length, credit mix, and new credit. Students toggle behaviors like missed payments or reducing debt and immediately see the score change on a color-coded gauge ranging from 300 (Poor) to 850 (Exceptional). The sim also shows how different credit score ranges affect real-world borrowing costs such as mortgage and auto loan interest rates.

## How to Use

1. **Read the gauge** at the center-left of the display. The needle and large number show your current credit score, with color-coded ranges from red (Poor) to green (Exceptional).
2. **Review the factor breakdown** on the right side. Five horizontal bars show how each factor (Payment History 35%, Credit Utilization 30%, Credit Length 15%, Credit Mix 10%, New Credit 10%) contributes to your overall score.
3. **Toggle financial behaviors** using the checkboxes in the control area. Negative behaviors include "Missed payment," "Maxed credit card," and "Opened new account." Positive behaviors include "Paid on time 6 months" and "Reduced debt 50%."
4. **Observe the impact** on both the overall score gauge and the individual factor bars. Notice which factors are most sensitive to your choices.
5. **Check the Typical Impact section** on the right to see how your score affects mortgage and auto loan interest rates.
6. **Click the Reset button** to return all behaviors to their default state and start over.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/credit-score/main.html"
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

- Basic understanding of borrowing and lending
- Familiarity with the concept of interest rates
- Awareness that banks and lenders evaluate borrowers before issuing loans

### Activities

1. **Exploration** (5 min): Toggle each behavior one at a time and record which single action causes the largest score change. Rank the five behaviors from most impactful to least impactful.
2. **Guided Practice** (5 min): Start with a baseline score, then simulate a "worst case" scenario by checking all negative behaviors. Note the score and resulting interest rates. Then simulate a "best case" by checking only positive behaviors. Calculate how much more a person with a poor score would pay over 30 years on a $250,000 mortgage compared to someone with an excellent score.
3. **Assessment** (5 min): Write a brief action plan for a fictional person with a 580 credit score. Identify which two behaviors they should change first and explain why, based on the factor weights shown in the simulator.

### Assessment

- Students can identify the five factors that make up a FICO credit score and their relative weights
- Students can explain how specific financial behaviors raise or lower a credit score
- Students can connect credit scores to real-world borrowing costs and calculate the financial impact of different score ranges

## References

1. [Credit Score](https://en.wikipedia.org/wiki/Credit_score) - Wikipedia overview of credit scoring systems, history, and how scores are calculated
2. [What Is a Credit Score?](https://www.investopedia.com/terms/c/credit_score.asp) - Investopedia article explaining FICO score components and ranges
3. [Credit and Debt](https://www.khanacademy.org/college-careers-more/personal-finance/pf-interest-and-debt) - Khan Academy lessons on credit, debt, and interest rates
