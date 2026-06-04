---
title: Price Floor Visualizer
description: Interactive p5.js MicroSim for price floor visualizer.
image: /sims/price-floor-visualizer/price-floor-visualizer.png
og:image: /sims/price-floor-visualizer/price-floor-visualizer.png
twitter:image: /sims/price-floor-visualizer/price-floor-visualizer.png
social:
   cards: false
quality_score: 76
---

# Price Floor Visualizer

<iframe src="main.html" height="542px" width="100%" scrolling="no"></iframe>

[Run the Price Floor Visualizer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim demonstrates how price floors work using a minimum wage example in the labor market. When the minimum wage is set above the equilibrium wage, a surplus of labor (unemployment) develops as more workers want jobs than employers are willing to hire. The simulation shows employed workers (green dots) and unemployed workers (red X marks), calculates the deadweight loss, and compares total wage income under the floor versus at equilibrium.

## How to Use

1. **Adjust the "Set Min Wage" slider** to set the minimum wage from $8 to $20 per hour.
2. **Observe the red dashed line** representing the price floor. When it rises above the equilibrium wage of $12/hr, a "BINDING FLOOR" warning appears.
3. **Read the info panel** on the right showing jobs available (labor demand), workers seeking work (labor supply), and the number of unemployed workers.
4. **Check "Show Winners & Losers"** to see who benefits (workers who keep their jobs at higher wages) and who is harmed (workers who lose jobs or cannot find work).
5. **Check "Show Equilibrium"** to display the gold equilibrium point for reference.
6. **Click "Remove Floor"** to set the minimum wage at $8 (below equilibrium), making it non-binding.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/price-floor-visualizer/main.html"
        height="542px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Economics)

### Duration
10-15 minutes

### Prerequisites

- Understanding of supply and demand and market equilibrium
- Knowledge of the labor market (workers supply labor, employers demand labor)

### Activities

1. **Exploration** (5 min): Set the minimum wage to $8 and slowly increase it. At what wage does unemployment first appear? Record the unemployment at $13, $16, and $19. What pattern do you see?
2. **Guided Practice** (5 min): Enable "Show Winners & Losers." At a minimum wage of $16, compare the total wage income (floor income) to the equilibrium income. Are total wages higher or lower? Discuss the trade-off between higher wages for some and unemployment for others.
3. **Assessment** (5 min): A state is debating raising the minimum wage from $12 to $15. Using the simulation, calculate the number of workers who gain (higher wages), the number who lose (unemployment), and the change in total wage income. Write a recommendation.

### Assessment

- Students can explain why a price floor only affects the market when set above the equilibrium price
- Students can calculate the surplus (unemployment) created by a binding minimum wage
- Students can analyze the trade-offs between higher wages for some workers and reduced employment for others

## References

1. [Price floor - Wikipedia](https://en.wikipedia.org/wiki/Price_floor) - Overview of price floors including minimum wage as a common example.
2. [Minimum wage - Wikipedia](https://en.wikipedia.org/wiki/Minimum_wage) - History, economic arguments, and empirical evidence on minimum wage policies.
3. [Minimum Wage and Price Floors - Khan Academy](https://www.khanacademy.org/economics-finance-domain/microeconomics/consumer-producer-surplus/deadweight-loss-tutorial/v/minimum-wage-and-price-floors) - Video lesson on how price floors create surpluses in labor markets.
