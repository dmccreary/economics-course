---
title: Public Goods Contribution Game
description: Interactive p5.js MicroSim for public goods contribution game.
image: /sims/public-goods-game/public-goods-game.png
og:image: /sims/public-goods-game/public-goods-game.png
twitter:image: /sims/public-goods-game/public-goods-game.png
social:
   cards: false
quality_score: 76
---

# Public Goods Contribution Game

<iframe src="main.html" height="507px" width="100%" scrolling="no"></iframe>

[Run the Public Goods Contribution Game MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim simulates the classic public goods game to demonstrate the free rider problem. You and four AI players each start with $10 per round and choose how much to contribute to a shared public good (a park). All contributions are doubled and then split equally among all five players. The tension is clear: everyone benefits if all contribute, but each individual can earn more by contributing nothing and free-riding on others' contributions. This illustrates why public goods are underprovided by markets without collective action or government intervention.

## How to Use

1. **Set your contribution** using the "Give" slider (from $0 to $10 per round).
2. **Click "Submit Round"** to play one round. Your contribution and the AI players' contributions are pooled, doubled, and divided equally.
3. **Click "Play 5 Rounds"** to automatically play five consecutive rounds at your current contribution level.
4. **Observe the results panel** on the right showing the total pool, doubled amount, your share, and your payoff. The "What-if" section shows what you would have earned by free-riding ($0 contribution) versus full cooperation.
5. **Track your history** in the bar chart below, which shows your payoff for each round. The scoreboard shows cumulative totals for all players.
6. **Click Reset** to start a new 10-round game.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/economics-course/sims/public-goods-game/main.html"
        height="507px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Economics)

### Duration
10-15 minutes

### Prerequisites

- Understanding of public goods (non-excludable, non-rivalrous)
- Basic knowledge of incentives and rational self-interest
- Familiarity with the concept of market failure

### Activities

1. **Exploration** (5 min): Have students play a full 10-round game first with a contribution of $0 (pure free rider), then reset and play with a contribution of $10 (full cooperator). Compare the total earnings in each case and discuss the results.
2. **Guided Practice** (5 min): Ask students to find a contribution level that maximizes their personal payoff. Discuss why the individually rational choice (contribute less) leads to a collectively worse outcome (underfunded park). Connect this to real-world public goods like national defense, street lighting, and clean air.
3. **Assessment** (5 min): Students write a response explaining the free rider problem using evidence from the simulation, and propose one mechanism (taxation, social norms, or regulation) that could solve the underprovision of public goods.

### Assessment

- Students can explain the free rider problem and why it leads to underprovision of public goods.
- Students can identify the tension between individual rationality and collective welfare using payoff data from the game.
- Students can propose real-world solutions to the free rider problem and evaluate their effectiveness.

## References

1. [Public goods game - Wikipedia](https://en.wikipedia.org/wiki/Public_goods_game) -- Overview of the game theory model used to study voluntary contributions to public goods.
2. [Free-rider problem - Wikipedia](https://en.wikipedia.org/wiki/Free-rider_problem) -- Explanation of why individuals have incentives to undercontribute to shared resources.
3. [Public good (economics) - Wikipedia](https://en.wikipedia.org/wiki/Public_good_(economics)) -- Definition and characteristics of public goods, with examples and policy implications.
