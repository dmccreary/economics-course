---
title: Tax Incidence Explorer
description: Interactive p5.js MicroSim for tax incidence explorer.
image: /sims/tax-incidence-explorer/tax-incidence-explorer.png
og:image: /sims/tax-incidence-explorer/tax-incidence-explorer.png
twitter:image: /sims/tax-incidence-explorer/tax-incidence-explorer.png
social:
   cards: false
quality_score: 76
---

# Tax Incidence Explorer

<iframe src="main.html" height="562px" width="100%" scrolling="no"></iframe>

[Run the Tax Incidence Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim demonstrates the key insight of tax incidence: it does not matter whether a tax is legally imposed on buyers or sellers because the economic burden depends on the relative elasticities of supply and demand. Students can adjust the tax amount and the elasticity of both curves to see how the burden splits between buyers (who pay a higher price) and sellers (who receive a lower price). The simulation also calculates government revenue and deadweight loss.

## How to Use

1. **Adjust the Tax Amount slider** to set a per-unit tax from $0 to $8. Watch the dashed "S + Tax" curve shift upward from the original supply curve.
2. **Adjust the Demand Elasticity slider** to make the demand curve more elastic (flatter) or inelastic (steeper). Notice how the buyer's share of the tax burden changes.
3. **Adjust the Supply Elasticity slider** to change the slope of the supply curve. Observe how the seller's share of the burden responds.
4. **Read the info panel** on the right showing the buyer's price, seller's price, tax burden percentages with visual bars, government revenue, and deadweight loss.
5. **Toggle "Show Deadweight Loss"** to show or hide the gray DWL triangle.
6. **Click "Reset"** to return all sliders to default values.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/tax-incidence-explorer/main.html"
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

- Understanding of supply and demand curves and elasticity
- Knowledge of market equilibrium and how taxes shift curves

### Activities

1. **Exploration** (5 min): Set the tax to $4 with both elasticities at 1.0. Record the buyer and seller burden percentages. Then make demand very inelastic (0.3) and record again. Who bears more of the tax when demand is inelastic?
2. **Guided Practice** (5 min): Set demand elasticity to 2.0 (elastic) and supply elasticity to 0.5 (inelastic). Record the burden split. Now swap them (demand=0.5, supply=2.0). What rule emerges about which side bears more of the tax?
3. **Assessment** (5 min): The government imposes a $3 tax on gasoline (inelastic demand, elastic supply). Predict who bears most of the burden, then verify using the simulation. Explain why the legal assignment of the tax to sellers does not change the economic outcome.

### Assessment

- Students can state the key insight that tax burden depends on elasticity, not legal assignment
- Students can predict which side bears more of a tax based on relative elasticities
- Students can calculate and interpret deadweight loss from taxation

## References

1. [Tax incidence - Wikipedia](https://en.wikipedia.org/wiki/Tax_incidence) - Overview of how tax burdens are distributed between buyers and sellers based on elasticity.
2. [Deadweight loss - Wikipedia](https://en.wikipedia.org/wiki/Deadweight_loss) - Explanation of the efficiency loss created by taxation.
3. [Tax Incidence and Deadweight Loss - Khan Academy](https://www.khanacademy.org/economics-finance-domain/microeconomics/consumer-producer-surplus/deadweight-loss-tutorial/v/taxation-and-dead-weight-loss) - Video lesson on how taxes create wedges between buyer and seller prices.
