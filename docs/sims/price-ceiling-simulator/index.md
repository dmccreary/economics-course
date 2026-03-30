---
title: Price Ceiling Simulator
description: Interactive p5.js MicroSim for price ceiling simulator.
image: /sims/price-ceiling-simulator/price-ceiling-simulator.png
og:image: /sims/price-ceiling-simulator/price-ceiling-simulator.png
twitter:image: /sims/price-ceiling-simulator/price-ceiling-simulator.png
social:
   cards: false
quality_score: 76
---

# Price Ceiling Simulator

<iframe src="main.html" height="542px" width="100%" scrolling="no"></iframe>

[Run the Price Ceiling Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim demonstrates how price ceilings work using a rent control example in the apartment market. When the ceiling is set below the equilibrium rent, a shortage develops as quantity demanded exceeds quantity supplied. The simulation shows the deadweight loss triangle, calculates the exact shortage in apartment units, and when the "Show Consequences" option is enabled, lists real-world effects like reduced housing quality, long waiting lists, and black market rents.

## How to Use

1. **Adjust the "Set Ceiling" slider** to set the maximum legal rent from $500 to $2,000 per month.
2. **Observe the red dashed line** representing the price ceiling. When it falls below the equilibrium of $1,500, a "BINDING CEILING" warning appears.
3. **Read the info panel** on the right to see the quantities supplied and demanded, the size of the shortage, and whether the ceiling is binding.
4. **Check "Show Consequences"** to see a list of unintended effects including winners (lucky renters) and losers (those who cannot find housing).
5. **Check "Show Equilibrium"** to display the gold equilibrium point for reference.
6. **Click "Remove Ceiling"** to set the ceiling at $2,000 (above equilibrium), making it non-binding.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/price-ceiling-simulator/main.html"
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
- Knowledge of what a shortage is

### Activities

1. **Exploration** (5 min): Set the ceiling to $2,000, then slowly lower it. At what price does the ceiling become binding? Record the shortage at ceiling prices of $1,200, $900, and $600. What pattern do you see?
2. **Guided Practice** (5 min): Enable "Show Consequences." At a ceiling of $800, identify who benefits and who is harmed. Discuss: is rent control fair if it helps some renters but makes others unable to find housing?
3. **Assessment** (5 min): A city sets a rent ceiling of $1,000. Using the simulation, calculate the shortage and deadweight loss. Write a brief policy memo arguing for or against this ceiling, using evidence from the simulation.

### Assessment

- Students can explain why a price ceiling only affects the market when set below the equilibrium price
- Students can calculate the shortage created by a binding price ceiling
- Students can analyze the trade-offs and unintended consequences of price ceilings

## References

1. [Price ceiling - Wikipedia](https://en.wikipedia.org/wiki/Price_ceiling) - Overview of price ceilings, binding vs. non-binding, and real-world examples.
2. [Rent regulation - Wikipedia](https://en.wikipedia.org/wiki/Rent_regulation) - History and economic analysis of rent control policies worldwide.
3. [Price Ceilings and Floors - Khan Academy](https://www.khanacademy.org/economics-finance-domain/microeconomics/consumer-producer-surplus/deadweight-loss-tutorial/v/rent-control-and-deadweight-loss) - Video lesson on how price controls create deadweight loss.
