---
title: Inflation and the Business Cycle
description: Understand how inflation is measured, why prices rise, and how economic cycles create recessions and recoveries
generated_by: claude skill chapter-content-generator
date: 2026-01-27
version: 0.03
reading_level: junior in high school (grade 11)
---

# Inflation and the Business Cycle

## Summary

This chapter explores price level changes and economic fluctuations. Students will learn how inflation is measured using the Consumer Price Index, why moderate inflation occurs, and the economic problems caused by high inflation or deflation. The chapter also covers the business cycle and recessions.

After completing this chapter, students will be able to interpret inflation data and understand how economic cycles affect jobs, prices, and growth.

## Concepts Covered

This chapter covers the following 7 concepts from the learning graph:

1. Inflation
2. Consumer Price Index
3. Inflation Rate
4. Deflation
5. Purchasing Power
6. Recession
7. Stagflation

## Prerequisites

This chapter builds on concepts from:

- [Chapter 7: Measuring the Economy](../07-measuring-economy/index.md)
- [Chapter 8: Employment and Unemployment](../08-employment-unemployment/index.md)

---

## Your Money Is Shrinking (Sort Of)

Here's something that might blow your mind: a dollar today is worth less than a dollar was when your parents were your age. Not because someone physically changed the bills—but because prices have risen. The same piece of paper buys less stuff.

This is **inflation**, and understanding it is one of the most practical economic superpowers you can have. You've probably noticed it yourself: remember when your favorite snack cost less? Or when streaming services didn't raise their prices every year?

By the end of this chapter, you'll understand why prices generally rise over time, how economists measure it, and why a little inflation is actually considered healthy. You'll also learn about the scary scenarios—what happens when inflation goes crazy, or when the opposite happens and prices start falling.

Most importantly, you'll be able to see through the hype. Every time inflation ticks up, headlines scream about economic disaster. Every election, politicians blame each other for rising prices. With your new knowledge, you'll be able to separate legitimate concerns from manufactured panic.

Let's dive in.

## What Is Inflation?

**Inflation** is a sustained increase in the general price level of goods and services in an economy over time.

Let's unpack that definition:

- **Sustained**: Not a one-time price spike, but ongoing increases
- **General price level**: Most prices rising, not just a few items
- **Over time**: Measured month-to-month or year-to-year

When inflation occurs, each unit of currency (like a dollar) buys fewer goods and services than before. Your money doesn't literally shrink—but its purchasing power does.

!!! note "Not All Price Increases Are Inflation"
    If gas prices spike because of a hurricane hitting oil refineries, that's not really "inflation"—it's a supply shock to one product. Inflation means the overall price level is rising. Economists look at broad measures, not individual items.

### Why Does Inflation Happen?

Economists identify two main causes:

**1. Demand-Pull Inflation** ("Too much money chasing too few goods")

When consumers and businesses want to buy more stuff than the economy can produce, prices get bid up. This often happens when:

- The economy is booming and everyone has jobs
- Government pumps money into the economy (stimulus checks, etc.)
- Interest rates are very low, making borrowing cheap

Think of it like an auction: if more bidders show up with more money, prices rise.

**2. Cost-Push Inflation** (Rising production costs)

When it becomes more expensive to make things, producers raise prices to maintain their profits. Causes include:

- Rising wages (workers demand more pay)
- Higher energy costs (oil price spikes)
- Supply chain problems (can't get materials)
- Higher raw material costs

This is like the restaurant raising menu prices because their food suppliers increased prices.

| Type | Cause | Example |
|------|-------|---------|
| Demand-Pull | Too much spending | Economic boom, stimulus payments |
| Cost-Push | Higher production costs | Oil crisis, supply chain disruption |

In reality, both types often occur together, making it hard to pinpoint exact causes.

## The Consumer Price Index (CPI)

How do we actually measure inflation? We can't check the price of every product in the economy. Instead, economists use the **Consumer Price Index (CPI)**.

The **CPI** measures the average change in prices paid by urban consumers for a "basket" of goods and services over time.

Here's how it works:

1. **Define a "market basket"**: A representative collection of goods and services that typical consumers buy
2. **Track prices**: Check the prices of everything in the basket regularly
3. **Calculate the index**: Compare current prices to a base year
4. **Report changes**: Express how much prices have risen or fallen

### What's in the Basket?

The Bureau of Labor Statistics (BLS) surveys thousands of households to determine what Americans actually buy. The basket includes:

| Category | Weight (approx.) | Examples |
|----------|------------------|----------|
| Housing | 33% | Rent, utilities, furniture |
| Transportation | 15% | Cars, gas, insurance, public transit |
| Food & Beverages | 14% | Groceries, restaurants |
| Medical Care | 9% | Insurance, doctors, prescriptions |
| Education & Communication | 7% | Tuition, phones, internet |
| Recreation | 5% | Entertainment, sports, hobbies |
| Apparel | 3% | Clothing, shoes |
| Other | 14% | Personal care, miscellaneous |

The "weight" matters because not all spending is equal. Housing takes a bigger chunk of most budgets than clothing, so housing price changes affect the CPI more.

#### Diagram: CPI Market Basket

<iframe src="../../sims/cpi-basket-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>CPI Market Basket Explorer MicroSim</summary>
Type: microsim

Bloom Taxonomy Level: Understand (L2)
Bloom Verb: explain, interpret, demonstrate

Learning Objective: Students will explain how the CPI is constructed from weighted categories and interpret how price changes in different categories affect the overall index.

Purpose: Make the abstract CPI calculation concrete by letting students manipulate prices and see the effects.

Canvas Layout:
- Left side (400px): Visual basket with category icons and price displays
- Right side (250px): CPI calculation and index display

Visual Elements:
- Shopping basket graphic divided into weighted sections
- Category icons (house, car, food, medicine, etc.)
- Size of section represents weight in index
- Price tags showing current prices
- CPI dial or gauge showing current index value
- Base year comparison (100 = base year)

Interactive Controls:
- Slider for each category: price change % (-10% to +20%)
- Preset scenarios:
  - "Oil Crisis" (transportation +30%, others moderate)
  - "Housing Boom" (housing +15%)
  - "Tech Deflation" (electronics -10%)
  - "Stable Economy" (all +2-3%)
- "Reset to Baseline" button
- Toggle: "Show my spending" (adjust weights to personal budget)

Data Visibility Requirements:
- Stage 1: Show baseline basket with all prices at 100
- Stage 2: Adjust one category - show contribution to total CPI
- Stage 3: Show formula: CPI = Σ(Category Price Change × Weight)
- Stage 4: Compare weighted vs unweighted average

Behavior:
- Moving category sliders updates CPI in real-time
- Visual shows categories expanding/shrinking based on price changes
- Display: "Overall CPI: X" and "Inflation Rate: Y%"
- When "my spending" toggled:
  - Adjust weights to personal patterns
  - Show "Your personal inflation rate: Z%"
  - Compare to official CPI

Critical Thinking Feature:
- "Why might your inflation feel different than the official rate?"
- Shows how personal spending patterns create different experiences

Instructional Rationale: Interactive weight manipulation helps students understand why the CPI might not match their personal experience. Seeing how different categories contribute makes the index construction transparent.

Implementation: p5.js with visual basket, sliders, and real-time calculation
</details>

### Calculating the CPI

The CPI is expressed as an index number relative to a base period (currently 1982-1984 = 100).

$$\text{CPI} = \frac{\text{Cost of basket in current year}}{\text{Cost of basket in base year}} \times 100$$

If the CPI is 310, that means prices are 3.1 times higher than in the base period. A basket that cost $100 in 1982-1984 now costs $310.

## The Inflation Rate

The **inflation rate** is the percentage change in the price level from one period to another.

$$\text{Inflation Rate} = \frac{\text{CPI}_{\text{current}} - \text{CPI}_{\text{previous}}}{\text{CPI}_{\text{previous}}} \times 100$$

If the CPI was 300 last year and is 310 this year:

$$\text{Inflation Rate} = \frac{310 - 300}{300} \times 100 = 3.3\%$$

This means prices rose by 3.3% over the year.

### What's a "Normal" Inflation Rate?

In most developed economies, central banks target around **2% annual inflation**. Why not 0%?

- **Some inflation is healthy**: It encourages spending and investment (why hold cash if it loses value?)
- **It provides wiggle room**: Central banks can cut interest rates during recessions
- **It's hard to hit exactly 0%**: Small positive target is more achievable
- **Deflation is worse**: As we'll see, falling prices cause serious problems

| Inflation Rate | Description | Typical Concern |
|----------------|-------------|-----------------|
| 0% or negative | Deflation | Serious concern |
| 1-3% | Low/moderate | Target range |
| 4-6% | Elevated | Causes concern |
| 7-10% | High | Significant problem |
| 10%+ | Very high | Economic distress |
| 50%+ monthly | Hyperinflation | Economic collapse |

### Core Inflation vs. Headline Inflation

You'll often hear about "core inflation" in the news. What's the difference?

- **Headline inflation**: The full CPI, including everything
- **Core inflation**: CPI excluding food and energy prices

Why exclude food and energy? Because they're volatile—they bounce up and down a lot based on weather, geopolitics, and other short-term factors. Core inflation gives a cleaner picture of underlying price trends.

!!! warning "Critical Thinking Alert"
    When politicians cite inflation numbers, check whether they're using headline or core. During an oil price spike, headline inflation looks scary while core might be calm. Someone could choose whichever number supports their argument.

## Purchasing Power: What Your Money Actually Buys

**Purchasing power** is the quantity of goods and services that a unit of currency can buy.

When inflation rises, purchasing power falls. Your $20 bill hasn't changed, but it buys fewer tacos, fewer gallons of gas, fewer movie tickets.

This is why we distinguish between:

- **Nominal values**: The actual dollar amount (what the price tag says)
- **Real values**: Adjusted for inflation (actual purchasing power)

Remember from Chapter 7 how we talked about nominal vs. real GDP? Same concept applies here to wages, savings, and prices.

### The Erosion of Savings

Here's where inflation gets personal. If you have $1,000 in savings earning 1% interest, but inflation is 4%, you're actually losing purchasing power:

- Nominal gain: $1,000 × 1% = $10
- Real loss: $1,000 × (1% - 4%) = -$30 in purchasing power

Your bank account shows more dollars, but those dollars buy less. You've effectively lost money in real terms.

This is why financial advisors emphasize **real returns** (return after inflation), not just nominal returns.

#### Diagram: Inflation Impact Calculator

<iframe src="../../sims/inflation-calculator/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Inflation Impact Calculator MicroSim</summary>
Type: microsim

Bloom Taxonomy Level: Apply (L3)
Bloom Verb: calculate, apply, demonstrate

Learning Objective: Students will calculate how inflation erodes purchasing power over time and compare nominal vs. real values.

Purpose: Make the abstract concept of purchasing power loss concrete with personal numbers.

Canvas Layout:
- Left side (350px): Input panel
- Right side (350px): Results visualization

Visual Elements:
- Input fields for:
  - Starting amount ($100 - $10,000)
  - Years (1-50)
  - Annual inflation rate (0-15%)
  - Interest/return rate (0-15%)
- Two visual representations:
  - Stack of dollar bills shrinking over time
  - Line graph showing nominal vs real value
- Final comparison: "Your $X will be worth $Y in purchasing power"

Interactive Controls:
- Sliders for all input values
- "Show historical scenario" presets:
  - "1970s High Inflation" (10% average)
  - "2010s Low Inflation" (2% average)
  - "Normal Conditions" (3% average)
- Toggle: "Add returns" to see if investments beat inflation
- "Calculate" button (auto-updates)

Data Visibility Requirements:
- Stage 1: Show starting amount
- Stage 2: Apply inflation year by year
- Stage 3: Show nominal amount unchanged (or growing with interest)
- Stage 4: Show real purchasing power declining
- Stage 5: Final comparison with equivalent goods

Behavior:
- Real-time calculation as sliders move
- Dollar stack visual shrinks proportionally
- Graph shows diverging lines (nominal vs real)
- "In X years, your $1,000 will buy what $Y buys today"
- If returns > inflation: "You're beating inflation!"
- If returns < inflation: "Inflation is winning—your money is shrinking"

Instructional Rationale: Visualizing the erosion of purchasing power makes the urgency of inflation clear. Students see why savings accounts earning less than inflation mean losing money in real terms.

Implementation: p5.js with inputs, animated dollar visual, and dual-line chart
</details>

### Winners and Losers from Inflation

Inflation doesn't affect everyone equally. Some people benefit, while others suffer:

**Losers from Inflation:**

- **Savers**: Money in savings accounts loses purchasing power
- **People on fixed incomes**: Retirees with set pensions see their buying power decline
- **Lenders**: If you lent money at 5% interest and inflation jumps to 8%, you're losing in real terms
- **Workers without raises**: If wages don't keep up with inflation, real pay falls

**Winners from Inflation:**

- **Borrowers**: If you borrowed at fixed rates, you repay with "cheaper" dollars
- **Homeowners with mortgages**: Your debt becomes easier to pay in real terms
- **Asset owners**: Real estate, stocks often rise with or faster than inflation
- **Government**: Tax brackets and debt become relatively smaller

| Group | Effect of Inflation | Why |
|-------|---------------------|-----|
| Savers | Negative | Purchasing power erodes |
| Fixed-income retirees | Negative | Benefits don't adjust fast enough |
| Borrowers (fixed rate) | Positive | Repay with "cheaper" dollars |
| Homeowners (mortgage) | Positive | Debt shrinks in real terms |
| Workers without raises | Negative | Real wages fall |

!!! tip "Inflation and Student Loans"
    Here's a silver lining for future you: if you have fixed-rate student loans, inflation actually helps you. You'll repay those loans with dollars that are worth less than when you borrowed them. (This doesn't mean high inflation is good—just that there's one small consolation!)

## Deflation: When Prices Fall (And Why That's Bad)

Wait—if rising prices are bad, wouldn't falling prices be good? Surprisingly, **deflation** (a sustained decrease in the general price level) is often worse than moderate inflation.

**Deflation** seems great at first: your money buys more! But here's the problem:

### The Deflation Spiral

1. **Consumers delay purchases**: "Why buy a TV today if it'll be cheaper next month?" This reduces spending.
2. **Businesses cut production**: Less demand means less production needed.
3. **Workers get laid off**: Lower production means fewer jobs.
4. **Spending falls further**: Unemployed people spend less.
5. **Prices fall more**: The cycle continues.

This is a **deflationary spiral**, and it can be incredibly hard to escape.

### Real Debt Burden Increases

During deflation, debts become harder to repay. If you owe $100,000 on a mortgage and prices fall 10%, you still owe $100,000—but your income probably fell too, while the debt didn't.

In inflation, debts shrink in real terms. In deflation, debts grow in real terms. This can crush borrowers and cause widespread defaults.

### Historical Examples

- **The Great Depression (1930s)**: Prices fell dramatically, unemployment hit 25%, and the economy collapsed
- **Japan (1990s-2010s)**: Decades of near-zero or negative inflation led to economic stagnation

This is why central banks really, really want to avoid deflation—even if it means accepting some inflation.

## Recession: When the Economy Contracts

A **recession** is a significant decline in economic activity spread across the economy, lasting more than a few months.

You encountered recessions briefly in Chapter 7 when we discussed the business cycle. Let's go deeper.

### How Do We Know We're in a Recession?

The National Bureau of Economic Research (NBER) officially declares recessions based on several indicators:

- **Real GDP decline**: The economy is producing less
- **Rising unemployment**: Businesses are laying off workers
- **Falling income**: People are earning less
- **Declining retail sales**: Consumers are spending less
- **Falling industrial production**: Factories are producing less

The old rule of thumb—"two consecutive quarters of declining GDP"—is a simplification. The NBER looks at a broader picture.

### What Causes Recessions?

Recessions can be triggered by various factors:

- **Financial crises**: Bank failures, credit crunches (2008)
- **External shocks**: Pandemics (2020), oil embargoes (1973)
- **Bursting bubbles**: Housing bubble (2008), dot-com bubble (2001)
- **Policy mistakes**: Central banks raising rates too aggressively
- **Declining confidence**: Businesses and consumers become pessimistic and cut spending

Often, multiple factors combine. The 2008 recession involved a housing bubble, financial crisis, and credit crunch all at once.

### Recent US Recessions

| Recession | Duration | Cause | Peak Unemployment |
|-----------|----------|-------|-------------------|
| 2020 (COVID) | 2 months | Pandemic lockdowns | 14.7% |
| 2007-2009 | 18 months | Financial crisis, housing bubble | 10.0% |
| 2001 | 8 months | Dot-com bubble, 9/11 | 6.3% |
| 1990-1991 | 8 months | Oil shock, credit crunch | 7.8% |
| 1981-1982 | 16 months | Fed fighting inflation | 10.8% |

### The Human Cost

Statistics don't capture how recessions feel. During recessions:

- People lose jobs and struggle to find new ones
- Families lose homes to foreclosure
- Businesses that people spent years building close permanently
- Recent graduates enter a terrible job market
- Stress and uncertainty affect mental health

Understanding recessions isn't just academic—it helps you prepare for economic hard times and understand what policy responses might help.

#### Diagram: Recession Indicators Dashboard

<iframe src="../../sims/recession-dashboard/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Recession Indicators Dashboard MicroSim</summary>
Type: microsim

Bloom Taxonomy Level: Analyze (L4)
Bloom Verb: analyze, examine, compare

Learning Objective: Students will analyze multiple economic indicators to assess whether the economy is heading toward, in, or recovering from a recession.

Purpose: Show how economists use multiple data points to identify recessions, not just GDP.

Canvas Layout:
- Main area (500px): Dashboard with multiple indicator panels
- Right side (150px): Overall assessment and controls

Visual Elements:
- Six indicator mini-panels:
  1. Real GDP growth (line chart)
  2. Unemployment rate (line chart)
  3. Consumer confidence (gauge)
  4. Retail sales (bar chart)
  5. Industrial production (line chart)
  6. Leading indicators (composite)
- Color coding: Green (healthy), Yellow (warning), Red (recession)
- Overall "Economy Status" indicator
- Timeline selector for historical periods

Interactive Controls:
- Time period selector: 2000-2025
- Preset buttons:
  - "2008 Financial Crisis"
  - "2020 COVID Recession"
  - "2010-2019 Expansion"
  - "Current"
- Animation: "Watch the recession unfold" (time-lapse through recession)
- Individual indicator deep-dive on click

Behavior:
- Selecting time period updates all indicators simultaneously
- Colors change to reflect economic conditions
- "Overall Assessment" updates: "Expansion," "Warning Signs," "Recession," "Recovery"
- Clicking indicator shows larger view with more detail
- Animation shows how indicators change through recession cycle

Data (historical US data):
- GDP growth turning negative
- Unemployment rising from ~4% to 10%+
- Confidence plummeting
- Retail sales dropping
- Industrial production falling

Instructional Rationale: Analyzing multiple indicators simultaneously shows that recessions are complex economic events, not just a single number. Students learn to see patterns and leading indicators.

Implementation: p5.js with multiple mini-charts and time-synchronized data
</details>

## Stagflation: The Worst of Both Worlds

**Stagflation** is the unfortunate combination of stagnant economic growth, high unemployment, AND high inflation occurring simultaneously.

This is the economic nightmare scenario because the usual policy tools don't work well:

- **To fight inflation**: Raise interest rates, reduce spending → But this worsens unemployment
- **To fight unemployment**: Lower interest rates, increase spending → But this worsens inflation

You're trapped: every solution makes one problem worse.

### The 1970s: Stagflation in Action

The classic example is the United States in the 1970s:

- **Oil shocks** (1973 and 1979): OPEC oil embargoes caused energy prices to skyrocket
- **Cost-push inflation**: Higher energy costs pushed up prices across the economy
- **Slowing growth**: High energy costs hurt businesses, causing layoffs
- **Result**: High inflation (10-13%) AND high unemployment (7-9%) at the same time

The standard playbook didn't work. It took aggressive Federal Reserve action in the early 1980s (raising interest rates dramatically) to finally break the inflation—but it caused a severe recession first.

### Why Stagflation Is Rare

Stagflation typically requires a specific type of shock—usually a supply-side shock that raises costs while reducing output (like an oil embargo). Normally:

- High inflation occurs during economic booms (demand-pull)
- High unemployment occurs during recessions (weak demand)

They don't usually happen together, which is why stagflation is so disorienting when it occurs.

## Hidden Inflation: Shrinkflation and Quality Changes

Here's something the official CPI might not fully capture: **shrinkflation**.

**Shrinkflation** occurs when products get smaller while prices stay the same. That candy bar that used to be 3.5 oz is now 3.0 oz—same price! Technically not inflation (price didn't rise), but you're getting less for your money.

Companies love shrinkflation because:

- Consumers notice price increases
- Consumers often don't notice size decreases
- The per-unit price rises without changing the sticker price

**Quality changes** work similarly but in both directions:

- Your phone might cost the same as five years ago, but it's WAY more powerful (quality improved)
- Your airline ticket might cost the same, but now you pay extra for bags, food, and seat selection (quality declined)

The BLS tries to adjust for these changes, but it's imperfect. Your personal experience of inflation might differ from the official number.

!!! tip "Spot the Shrinkflation"
    Next time you're at the store, check the "unit price" (price per ounce, per pound, etc.) on the shelf tag. This reveals shrinkflation because even if the package price stays the same, the unit price rises when the product shrinks.

## Critical Thinking: Inflation in the Wild

Let's apply your critical thinking skills to how inflation data gets used in public debate.

### Red Flag #1: Cherry-Picking the Measure

Headline vs. core inflation can tell very different stories. Food and energy spiking? Headline inflation looks scary while core stays calm. Check which measure is being cited.

### Red Flag #2: Year-Over-Year vs. Month-Over-Month

Monthly inflation can be volatile. Year-over-year comparisons are more stable but can be distorted by what happened 12 months ago. If prices spiked last year then stabilized, year-over-year will look bad even if current conditions are fine.

### Red Flag #3: "Inflation Is Destroying the Economy!"

Some inflation (2-3%) is normal and even healthy. Headlines often treat any inflation as a crisis. Ask: What's the actual number? How does it compare to historical norms?

### Red Flag #4: Ignoring Wage Growth

If inflation is 4% but wages grew 5%, workers are actually better off in real terms. Always compare inflation to wage growth to get the full picture.

### Red Flag #5: Blaming the Wrong Cause

Inflation has many causes—supply chains, energy costs, monetary policy, consumer demand. Politicians often blame whatever supports their narrative and ignore other factors.

??? question "Practice: Analyzing Inflation Claims"
    A headline screams: "Inflation SOARS to 7%—Highest in 40 Years!" What questions should you ask before panicking?

    You should ask:
    1. Is this headline or core inflation?
    2. What's driving it? (Supply shocks? Demand? Both?)
    3. What's the monthly trend? (Still rising, or stabilizing?)
    4. How do wages compare? Are real wages falling?
    5. What's the comparison period? (Year-over-year from a weird base?)
    6. What are other developed countries experiencing? (Global vs. local issue?)
    7. What are inflation expectations? (Temporary or becoming entrenched?)

## Key Takeaways

You've unlocked crucial inflation superpowers:

1. **Inflation** is a sustained increase in the general price level—moderate inflation is normal
2. The **CPI** measures inflation using a weighted basket of goods and services
3. The **inflation rate** is the percentage change in prices over time—target is around 2%
4. **Purchasing power** is what your money actually buys—it falls when inflation rises
5. **Deflation** (falling prices) is often worse than inflation—it can create vicious spirals
6. **Recessions** are broad economic contractions with falling output and rising unemployment
7. **Stagflation** is the nightmare combo of high inflation AND high unemployment
8. Your **personal inflation** may differ from official CPI based on your spending patterns
9. **Shrinkflation** is hidden inflation—same price, smaller package
10. Always check **nominal vs. real** values and **headline vs. core** inflation

## Practice Questions

Test your understanding:

1. If the CPI was 280 last year and is 294 this year, what is the inflation rate?

2. Why do economists consider 2% inflation healthy, rather than targeting 0%?

3. You have $5,000 in savings earning 2% interest. Inflation is 5%. Are you gaining or losing purchasing power? By how much?

4. Your favorite cereal costs the same as last year, but the box went from 18 oz to 15 oz. What's happening, and what's the effective price increase?

5. During the 1970s oil crisis, the US experienced stagflation. Why couldn't the government simply lower interest rates to reduce unemployment?

---

## Next Steps

Now that you understand how inflation affects prices and purchasing power, you're ready to explore the tools governments use to manage the economy. In the next chapter, we'll examine **Money, Banking, and the Federal Reserve**—how the financial system works and how the Fed tries to keep inflation and unemployment in balance.

Your economic superpower now includes seeing through inflation hype and understanding what those price changes actually mean for your wallet. That's knowledge you'll use for the rest of your life!
