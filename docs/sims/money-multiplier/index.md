---
title: Fractional Reserve Money Multiplier
description: Interactive p5.js MicroSim for fractional reserve money multiplier.
image: /sims/money-multiplier/money-multiplier.png
og:image: /sims/money-multiplier/money-multiplier.png
twitter:image: /sims/money-multiplier/money-multiplier.png
social:
   cards: false
quality_score: 76
---

# Fractional Reserve Money Multiplier

<iframe src="main.html" height="562px" width="100%" scrolling="no"></iframe>

[Run the Fractional Reserve Money Multiplier MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim visualizes how a single deposit multiplies through the banking system under fractional reserve banking. When a bank receives a deposit, it keeps a fraction as reserves and lends out the rest, which gets deposited in another bank, which lends again, and so on. Students can watch this chain reaction unfold step by step or in auto-play mode, seeing how an initial $1,000 deposit can create thousands of dollars in total deposits across the banking system.

## How to Use

1. **Set the Initial Deposit:** Use the deposit slider to choose a starting amount from $100 to $10,000.
2. **Set the Reserve Ratio:** Use the reserve slider to set the percentage each bank must hold in reserve (from 5% to 50%). A lower ratio means more money creation.
3. **Step Through Rounds:** Click the "Step" button to advance one bank at a time, watching each deposit split into reserves (dark green) and loans (light green).
4. **Use Auto-Play:** Click "Auto-Play" to watch the chain reaction animate automatically. Adjust the speed slider to control the animation pace. Click "Pause" to stop.
5. **Reset:** Click "Reset" to start over with current slider settings.
6. **Show the Formula:** Check "Show Formula" to display the money multiplier equation: Money Multiplier = 1 / Reserve Ratio.
7. **Read the Totals:** The summary panel shows running totals for deposits, reserves, and loans, plus the current and theoretical maximum money multiplier.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/money-multiplier/main.html"
        height="562px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Economics)

### Duration
10-15 minutes

### Prerequisites

- Understanding of what banks do with deposits (lend money to borrowers)
- Basic knowledge of fractions and percentages
- Familiarity with the concept of reserves and why banks hold them

### Activities

1. **Exploration** (5 min): Set the reserve ratio to 10% and the deposit to $1,000. Click "Step" through all 10 rounds and record total deposits after each round. Note how each successive bank creates less new money. Check "Show Formula" to see the theoretical maximum.
2. **Guided Practice** (5 min): Compare reserve ratios of 10%, 20%, and 50%. For each, predict the theoretical money multiplier before running the simulation, then verify. Discuss why a higher reserve ratio means less money creation and how this gives central banks a policy tool.
3. **Assessment** (5 min): Answer: If the Federal Reserve raises the required reserve ratio from 10% to 20%, what happens to the money supply? Use the simulation to demonstrate your answer with specific dollar amounts.

### Assessment

- Students can explain how fractional reserve banking creates money through the lending cycle
- Students can calculate the money multiplier given a reserve ratio (1 / reserve ratio)
- Students can predict how changes in the reserve ratio affect total money creation in the economy

## References

1. [Money Multiplier - Wikipedia](https://en.wikipedia.org/wiki/Money_multiplier) - Explanation of the money multiplier concept and its relationship to reserve requirements
2. [Fractional-Reserve Banking - Wikipedia](https://en.wikipedia.org/wiki/Fractional-reserve_banking) - How banks create money by lending out deposits while keeping a fraction in reserve
3. [The Money Multiplier - Khan Academy](https://www.khanacademy.org/economics-finance-domain/macroeconomics/macro-economic-indicators-and-the-business-cycle/macro-the-money-market/v/the-money-multiplier) - Video walkthrough of money creation through the banking system
