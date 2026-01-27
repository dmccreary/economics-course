---
title: Money and Banking
description: Understand what money is, how banks create money through fractional reserve banking, and how the Federal Reserve manages the economy
generated_by: claude skill chapter-content-generator
date: 2026-01-27
version: 0.03
reading_level: junior in high school (grade 11)
---

# Money and Banking

## Summary

This chapter introduces the monetary system and financial institutions. Students will learn what makes something money, the functions money serves, and how banks create money through fractional reserve banking. The chapter examines the role of the Federal Reserve as the central bank of the United States.

After completing this chapter, students will understand how the banking system works and how monetary policy tools affect the economy.

## Concepts Covered

This chapter covers the following 13 concepts from the learning graph:

1. Money
2. Functions of Money
3. Medium of Exchange
4. Store of Value
5. Fiat Money
6. Money Supply
7. Banks
8. Fractional Reserve Banking
9. Federal Reserve
10. Central Bank
11. Interest Rates
12. Open Market Operations
13. Quantitative Easing

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: What is Economics?](../01-what-is-economics/index.md)
- [Chapter 9: Inflation and the Business Cycle](../09-inflation-business-cycle/index.md)

---

## What Even IS Money?

Here's a question that sounds simple but gets weird fast: **What is money?**

You probably have some in your pocket or bank account right now. But have you ever really thought about what makes those pieces of paper (or numbers on a screen) valuable? Why can you trade them for pizza, but you can't trade a random rock for pizza?

This chapter will bend your brain a little. You'll discover that money is stranger than you think, that banks do something surprising with your deposits, and that a group of people in Washington DC have enormous influence over the economy through decisions most people don't understand.

By the end, you'll have a superpower that most adults lack: actually understanding how the monetary system works. This matters because interest rates affect your future mortgage, student loans, car payments, and job prospects. The more you understand, the better financial decisions you'll make.

Let's start with the basics—which turn out to be not so basic at all.

## What Is Money?

**Money** is anything that is widely accepted as payment for goods and services and repayment of debts.

Read that again: *anything* that is *widely accepted*. Money isn't inherently valuable—it's valuable because everyone agrees it's valuable. This is a wild concept when you really think about it.

Throughout history, people have used many things as money:

- **Shells**: Cowrie shells in Africa and Asia
- **Salt**: So valuable that Roman soldiers were sometimes paid in it (the word "salary" comes from salt!)
- **Cigarettes**: Used as money in prisons and POW camps
- **Gold and silver**: The classics
- **Paper notes**: Promises to pay, eventually became money themselves
- **Digital entries**: Most money today is just numbers in computers

What do all these have in common? People agreed to accept them in exchange for other things. That's it. Money is a social agreement.

!!! note "Money vs. Currency vs. Wealth"
    These terms are related but different:
    - **Money**: Anything accepted as payment (includes digital balances)
    - **Currency**: Physical money (coins and bills)
    - **Wealth**: Total value of everything you own (house, car, investments, etc.)

    Most "money" today isn't physical currency—it's digital records in bank computers.

## Functions of Money

For something to work well as money, it needs to perform three key **functions of money**:

### 1. Medium of Exchange

A **medium of exchange** is something people accept as payment in transactions.

This is money's primary job. Without it, you'd need **barter**—directly trading goods for goods. Want pizza? Hope you have something the pizza shop wants!

Barter has a huge problem: the **double coincidence of wants**. You need to find someone who:
1. Has what you want, AND
2. Wants what you have

Good luck with that. Money solves this by being something everyone accepts.

### 2. Store of Value

A **store of value** is something that maintains its purchasing power over time.

You can earn money today and spend it next month (or next year). The money "stores" your value until you need it. This only works if money maintains relatively stable value—which is why high inflation is so damaging. If prices double every month, money is a terrible store of value.

### 3. Unit of Account

Money provides a common measure for comparing the value of different goods and services.

Instead of knowing that one chicken equals three loaves of bread equals half a pair of shoes, we just price everything in dollars. Chicken: $8. Bread: $3. Shoes: $60. Much simpler!

| Function | What It Means | Example |
|----------|---------------|---------|
| Medium of Exchange | Accepted as payment | You pay $20 for a shirt |
| Store of Value | Holds value over time | You save $100 for next month |
| Unit of Account | Common measuring stick | "This costs $50, that costs $30" |

## What Makes GOOD Money?

Not everything works well as money. Good money has these characteristics:

- **Durability**: Doesn't fall apart (tomatoes = bad money)
- **Portability**: Easy to carry (giant stones = bad money)
- **Divisibility**: Can be split into smaller units (diamonds = bad money—can't cut them easily)
- **Uniformity**: Every unit is the same (artwork = bad money—each piece is different)
- **Limited Supply**: Scarce enough to maintain value (seawater = bad money)
- **Acceptability**: People actually want it (random rocks = bad money)

#### Diagram: Money Characteristics Evaluator

<iframe src="../../sims/money-evaluator/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Money Characteristics Evaluator MicroSim</summary>
Type: microsim

Bloom Taxonomy Level: Understand (L2)
Bloom Verb: classify, compare, evaluate

Learning Objective: Students will evaluate different items as potential money by assessing their characteristics against the requirements for good money.

Purpose: Make abstract money characteristics concrete by applying them to specific items.

Canvas Layout:
- Left side (350px): Item selector and display
- Right side (350px): Characteristics rating and verdict

Visual Elements:
- Item cards to select from:
  - Gold coins
  - Paper dollars
  - Cigarettes (prison money)
  - Seashells
  - Cattle
  - Bitcoin
  - Salt
  - Giant stone discs (Yap Island)
- Six characteristic meters (0-10 scale):
  - Durability
  - Portability
  - Divisibility
  - Uniformity
  - Limited Supply
  - Acceptability
- Overall "Money Score" gauge
- Historical context blurb for each item

Interactive Controls:
- Click item to select
- "Rate This Item" mode: students rate characteristics before reveal
- "Show Actual Ratings" button
- "Compare Two Items" toggle
- "Why did this work historically?" info popup

Behavior:
- Selecting item shows it with historical context
- Meters fill to show characteristic ratings
- Overall score calculated from weighted characteristics
- Comparison mode shows two items side by side
- Discussion prompts: "Why might cigarettes work as money in prison but not outside?"

Data for items:
- Gold: High on most except portability
- Paper dollars: High on all (with government backing for acceptability)
- Bitcoin: Mixed (high divisibility, low acceptability currently, limited supply)
- Cattle: Low on divisibility, portability; high on acceptability historically

Instructional Rationale: Evaluating specific items makes abstract characteristics concrete. Students discover why modern money evolved to have specific features and why historical money forms eventually failed.

Implementation: p5.js with item cards, animated meters, and comparison mode
</details>

## Fiat Money: Money by Decree

Here's the part where money gets really interesting (and a little unsettling).

**Fiat money** is money that has value because a government declares it has value, not because it's backed by a physical commodity like gold.

The US dollar used to be backed by gold—you could literally exchange dollars for gold at a fixed rate. But that ended in 1971. Now, dollars are fiat money. They have value because:

1. The government says they're legal tender (must be accepted for debts)
2. You have to pay taxes in dollars (creates demand)
3. Everyone agrees to accept them (social convention)

That's it. There's no gold in Fort Knox backing your dollars. The Federal Reserve can create new dollars essentially out of thin air.

This sounds scary, but it actually gives the government flexibility to manage the economy. The gold standard had major problems—it limited the money supply and made recessions worse because the government couldn't respond.

!!! warning "Critical Thinking: Gold Standard Nostalgia"
    You'll sometimes hear people say we should return to the gold standard. Before agreeing, consider:
    - Gold supply is fixed—economy can't grow faster than gold mining
    - Gold standard countries had MORE frequent and severe recessions
    - Countries on the gold standard suffered worse during the Great Depression
    - Gold's value fluctuates based on jewelry demand and mining output

    The gold standard wasn't a golden age. It had serious problems that fiat money solved.

### What About Cryptocurrency?

Cryptocurrencies like Bitcoin are an interesting experiment in money. Let's evaluate them:

| Characteristic | Bitcoin | Analysis |
|----------------|---------|----------|
| Durability | High | Digital, doesn't degrade |
| Portability | High | Send anywhere instantly |
| Divisibility | High | Can divide to tiny fractions |
| Uniformity | High | Every Bitcoin is identical |
| Limited Supply | High | Capped at 21 million |
| Acceptability | Low | Few places accept it |

Bitcoin scores well on most characteristics except the most important one: acceptability. You can't pay rent, buy groceries, or pay taxes with Bitcoin in most places. For now, it's more of a speculative investment than practical money.

## The Money Supply

The **money supply** is the total amount of money in circulation in an economy.

But what counts as "money"? Economists use different measures:

### M1: The Narrow Measure

M1 includes the most liquid forms of money—things you can spend immediately:

- Currency (coins and paper money)
- Checking account deposits
- Traveler's checks

### M2: The Broader Measure

M2 includes M1 plus less liquid forms:

- Savings accounts
- Money market accounts
- Small time deposits (CDs under $100,000)

| Measure | What's Included | Liquidity |
|---------|-----------------|-----------|
| M1 | Currency + Checking | Highest |
| M2 | M1 + Savings + Money Markets | High |

Why does this matter? The money supply affects inflation, interest rates, and economic activity. Too much money chasing too few goods = inflation. Too little money = recession risk.

## Banks: More Than Just Vaults

When you think of a **bank**, you might imagine a vault full of cash. But modern banks are much more interesting (and important) than that.

Banks perform several critical functions:

1. **Accept deposits**: Hold your money safely
2. **Make loans**: Lend money to borrowers
3. **Process payments**: Move money between accounts
4. **Create money**: Wait, what?!

Yes, banks create money. This is where things get wild.

## Fractional Reserve Banking: How Banks Create Money

**Fractional reserve banking** is a system where banks keep only a fraction of deposits as reserves and lend out the rest.

Here's how it works:

1. You deposit $1,000 in your bank account
2. The bank is required to keep some as reserves (say, 10%)
3. The bank keeps $100 in reserves and lends $900 to someone else
4. That person deposits the $900 in their bank
5. Their bank keeps $90 and lends $810
6. And so on...

Your original $1,000 becomes much more money in the system!

### The Money Multiplier

The **money multiplier** shows how much money the banking system creates from an initial deposit:

$$\text{Money Multiplier} = \frac{1}{\text{Reserve Ratio}}$$

With a 10% reserve ratio:

$$\text{Money Multiplier} = \frac{1}{0.10} = 10$$

Your $1,000 deposit could create up to $10,000 in the banking system!

| Round | Deposit | Reserves (10%) | Amount Lent |
|-------|---------|----------------|-------------|
| 1 | $1,000 | $100 | $900 |
| 2 | $900 | $90 | $810 |
| 3 | $810 | $81 | $729 |
| 4 | $729 | $73 | $656 |
| ... | ... | ... | ... |
| Total | $10,000 | $1,000 | $9,000 |

#### Diagram: Fractional Reserve Money Multiplier

<iframe src="../../sims/money-multiplier/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Fractional Reserve Money Multiplier MicroSim</summary>
Type: microsim

Bloom Taxonomy Level: Apply (L3)
Bloom Verb: calculate, demonstrate, apply

Learning Objective: Students will demonstrate how fractional reserve banking creates money by tracing deposits through multiple rounds of lending.

Purpose: Visualize the "magic" of money creation that most people don't understand.

Canvas Layout:
- Left side (450px): Animated flow diagram showing money multiplying
- Right side (250px): Controls and running totals

Visual Elements:
- Bank buildings in a row (Bank A, B, C, D, E...)
- Animated money/coin icons flowing between banks
- For each round:
  - Deposit arrives (green arrow in)
  - Reserve kept (stays in vault)
  - Loan made (blue arrow out)
  - Deposit at next bank (cycle continues)
- Running totals panel:
  - Total Deposits Created
  - Total Reserves Held
  - Total Loans Made
  - Money Multiplier achieved

Interactive Controls:
- Initial deposit amount slider ($100 - $10,000)
- Reserve ratio slider (5% - 25%)
- "Step Through" button (one round at a time)
- "Auto-Play" button (watch it all unfold)
- Speed control
- "Reset" button
- "Show Formula" toggle

Data Visibility Requirements:
- Stage 1: Initial deposit enters Bank A
- Stage 2: Bank A keeps reserves, lends remainder
- Stage 3: Loan becomes deposit at Bank B
- Stage 4: Process repeats through multiple banks
- Stage 5: Show diminishing amounts until negligible
- Final: Display total money created vs initial deposit

Behavior:
- Money icons visually flow between banks
- Each bank shows: Deposit received, Reserves kept, Loan made
- Running total updates in real-time
- Multiplier display: "Your $1,000 became $X in the banking system!"
- Lower reserve ratio = higher multiplier (more money created)
- Higher reserve ratio = lower multiplier (less money created)

Edge cases:
- At very low reserve ratios, show money creation is very high
- At 100% reserve ratio, no money multiplication (show this case)

Instructional Rationale: Visualizing money flowing through the banking system makes the abstract money multiplier concrete. Students see that banks don't just store money—they create it through lending.

Implementation: p5.js with animated money flow, bank icons, and real-time calculation
</details>

### Is This a Scam?

When people first learn about fractional reserve banking, they often feel alarmed. "Banks lend out my money? They only keep 10%?!"

Here's the thing: this system has worked for centuries and enables economic growth. Without it, banks couldn't make loans, businesses couldn't borrow to expand, and you couldn't get a mortgage or car loan.

The system works because:

- Not everyone withdraws all their money at once (usually)
- Banks are regulated and insured (FDIC insurance up to $250,000)
- The Federal Reserve acts as lender of last resort

When the system breaks down (bank runs), it's very bad. But with proper regulation, fractional reserve banking enables the credit that modern economies depend on.

## The Federal Reserve: America's Central Bank

The **Federal Reserve** (the "Fed") is the **central bank** of the United States.

A **central bank** is a government institution that manages a nation's money supply and oversees the banking system.

The Fed was created in 1913 after a series of banking panics convinced lawmakers that the US needed a central authority to stabilize the financial system.

### What Does the Fed Do?

The Federal Reserve has several key responsibilities:

1. **Conducts monetary policy**: Influences interest rates and money supply
2. **Supervises banks**: Ensures they're operating safely
3. **Maintains financial stability**: Prevents and responds to crises
4. **Provides banking services**: Processes payments, holds reserves

### The Fed's Structure

The Fed isn't a single institution—it's a system:

- **Board of Governors**: 7 members appointed by the President, confirmed by Senate
- **Federal Open Market Committee (FOMC)**: Makes monetary policy decisions
- **12 Regional Federal Reserve Banks**: Located across the country

The Chair of the Fed (currently a presidential appointee) is one of the most powerful economic positions in the world. Their words can move markets.

!!! note "Is the Fed Part of the Government?"
    Sort of. The Fed is independent within the government—it makes monetary policy decisions without direct political control. This independence is designed to prevent politicians from manipulating money supply for short-term electoral gains. But the President appoints Fed leaders, and Congress created and oversees the Fed.

## Interest Rates: The Fed's Main Tool

**Interest rates** are the price of borrowing money, expressed as a percentage of the loan amount.

When you borrow $10,000 at 5% interest, you pay back $10,500 over time. The $500 is the interest—the price you pay for using someone else's money.

The Fed influences interest rates throughout the economy by setting the **federal funds rate**—the rate banks charge each other for overnight loans.

### How Interest Rates Affect the Economy

When the Fed changes rates, it ripples through the entire economy:

**Lower Interest Rates:**
- Borrowing becomes cheaper
- People buy more houses, cars, and stuff (on credit)
- Businesses invest more (cheaper to borrow for expansion)
- Economy speeds up
- Risk: Can cause inflation if too much spending

**Higher Interest Rates:**
- Borrowing becomes expensive
- People buy less (especially big purchases requiring loans)
- Businesses invest less (expensive to borrow)
- Economy slows down
- Risk: Can cause recession if raised too much

| Fed Action | Borrowing Cost | Spending | Economic Effect |
|------------|----------------|----------|-----------------|
| Lower Rates | Cheaper | Increases | Stimulates growth |
| Raise Rates | More expensive | Decreases | Slows growth |

#### Diagram: Fed Interest Rate Simulator

<iframe src="../../sims/fed-rate-simulator/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Fed Interest Rate Simulator MicroSim</summary>
Type: microsim

Bloom Taxonomy Level: Apply (L3)
Bloom Verb: demonstrate, apply, predict

Learning Objective: Students will demonstrate how changes in the federal funds rate affect different interest rates throughout the economy and predict impacts on economic activity.

Purpose: Show the ripple effects of Fed policy decisions on real-world rates that affect people's lives.

Canvas Layout:
- Left side (400px): Fed rate control and cascading effects display
- Right side (300px): Economic impact indicators

Visual Elements:
- Central "Fed Funds Rate" dial (0% - 10%)
- Cascading rate displays branching from fed rate:
  - Prime rate (Fed + 3%)
  - Mortgage rates (Fed + spread)
  - Auto loan rates
  - Credit card rates
  - Savings account rates
- Economic indicator gauges:
  - Consumer spending
  - Business investment
  - Housing market activity
  - Inflation pressure
  - Unemployment trend

Interactive Controls:
- Fed rate slider (0% - 10%)
- "Raise 0.25%" and "Lower 0.25%" buttons
- Time lag toggle (show immediate vs delayed effects)
- Historical presets:
  - "2008 Crisis Response" (rates near 0%)
  - "1980s Inflation Fight" (rates at 20%)
  - "Normal Times" (rates at 2-3%)
- "Show Who Wins/Loses" toggle

Data Visibility Requirements:
- Stage 1: Show current fed rate
- Stage 2: Show how other rates follow (with spreads)
- Stage 3: Show economic indicators responding
- Stage 4: Show time lag effects (economy responds slowly)

Behavior:
- Moving fed rate slider updates all cascading rates
- Economic indicators shift with rate changes
- Time lag mode shows: "Rates changed now, economy responds in 6-18 months"
- Winners/losers panel:
  - Lower rates: "Winners: Borrowers, homebuyers, businesses. Losers: Savers, retirees."
  - Higher rates: "Winners: Savers, bond investors. Losers: Borrowers, homebuyers."
- Historical presets show extreme scenarios with context

Instructional Rationale: Visualizing the cascade from Fed policy to real-world rates makes monetary policy tangible. Students see how Fed decisions affect mortgage rates, car loans, and savings—things that will matter in their lives.

Implementation: p5.js with central dial, branching rate displays, and economic gauges
</details>

### The Fed's Dual Mandate

Congress has given the Fed two main goals:

1. **Maximum employment**: Keep unemployment low
2. **Price stability**: Keep inflation low (around 2%)

These goals sometimes conflict. To fight inflation, the Fed raises rates, which can increase unemployment. To fight unemployment, the Fed lowers rates, which can increase inflation.

The Fed constantly balances these competing objectives. There's no perfect answer—just difficult trade-offs.

## Open Market Operations

**Open market operations** are the Fed's primary tool for implementing monetary policy. The Fed buys and sells government bonds to influence the money supply and interest rates.

Here's how it works:

**To Lower Interest Rates (Stimulate Economy):**
1. Fed buys government bonds from banks
2. Banks receive cash (reserves increase)
3. More reserves = banks can lend more
4. More lending = lower interest rates

**To Raise Interest Rates (Slow Economy):**
1. Fed sells government bonds to banks
2. Banks pay cash (reserves decrease)
3. Fewer reserves = banks lend less
4. Less lending = higher interest rates

The Fed does this regularly through the Federal Open Market Committee (FOMC), which meets about 8 times per year.

## Quantitative Easing: The Unconventional Tool

**Quantitative easing (QE)** is an unconventional monetary policy where the central bank purchases large amounts of securities to inject money into the economy.

Normal open market operations involve short-term government bonds. QE goes further—buying long-term bonds, mortgage-backed securities, and sometimes other assets.

The Fed used QE massively during:

- **2008-2014**: Response to financial crisis
- **2020-2022**: Response to COVID-19 pandemic

### How QE Works

1. Fed creates new money (digitally)
2. Uses it to buy bonds from banks and investors
3. Sellers now have cash instead of bonds
4. They deposit cash in banks or invest elsewhere
5. This pushes down long-term interest rates
6. Cheaper borrowing (hopefully) stimulates economy

### QE Controversies

QE is controversial for several reasons:

**Critics say:**
- It could cause inflation (though this hasn't happened much)
- It benefits wealthy asset owners (stock and bond prices rise)
- It creates market distortions (artificially low rates)
- It's "printing money" (sort of, but not exactly)

**Supporters say:**
- It prevented worse recessions
- Inflation stayed controlled despite QE
- It's better than doing nothing during crises
- All major central banks used it successfully

!!! tip "Critical Thinking: 'Printing Money' Claims"
    You'll hear people say the Fed is "printing money," implying imminent hyperinflation. The reality is more nuanced:
    - QE creates bank reserves, not cash in circulation
    - Banks don't automatically lend more (they might hold reserves)
    - Inflation depends on spending, not just money supply
    - The Fed has tools to reverse QE if needed

    Massive QE after 2008 and 2020 didn't cause hyperinflation. The relationship between money supply and inflation is more complex than "more money = more inflation."

## Critical Thinking: Money and Banking Myths

Let's address some common misconceptions:

### Myth #1: "Banks Lend Out Your Deposits"

Partially true. Banks lend based on deposits, but your specific dollars aren't sitting in a vault waiting for you. Banking is a flow, not a storage system.

### Myth #2: "The Fed Is Printing Money Recklessly"

The Fed creates reserves, not physical cash. This affects the economy through complex channels, not by directly inflating prices. Central bankers are professionals trying to balance difficult trade-offs, not reckless money-printers.

### Myth #3: "We Should Return to the Gold Standard"

The gold standard had serious problems: more frequent recessions, inability to respond to crises, and deflation that hurt debtors. Modern monetary policy has problems too, but the gold standard wasn't a paradise.

### Myth #4: "Cryptocurrency Will Replace the Dollar"

Cryptocurrencies are interesting innovations, but they currently lack the key feature money needs: widespread acceptability. You can't pay taxes, rent, or most businesses with Bitcoin. This may change, but it hasn't happened yet.

??? question "Practice: Analyzing Monetary Policy Claims"
    A social media post says: "The Fed printed $5 trillion during COVID! No wonder inflation is skyrocketing—it's all the Fed's fault!" What questions should you ask before sharing this?

    You should ask:
    1. What exactly did the Fed "print"? (Reserves vs. cash in circulation?)
    2. What was the alternative? (Let the economy collapse?)
    3. What caused the inflation? (Supply chains? Energy? Demand? All of these?)
    4. How does US inflation compare to other countries? (They had inflation too, despite different policies)
    5. What's the lag between Fed actions and economic effects?
    6. Is the Fed actually able to control inflation perfectly?

## Key Takeaways

You've unlocked powerful monetary superpowers:

1. **Money** is anything widely accepted as payment—it's a social agreement
2. Money serves as a **medium of exchange**, **store of value**, and **unit of account**
3. **Fiat money** has value because of government decree and social acceptance, not physical backing
4. The **money supply** (M1, M2) measures how much money exists in the economy
5. **Banks** don't just store money—they create it through lending
6. **Fractional reserve banking** multiplies deposits into more money through the lending process
7. The **Federal Reserve** is the US central bank that manages monetary policy
8. **Interest rates** are the Fed's main tool—lower rates stimulate, higher rates slow the economy
9. **Open market operations** involve buying/selling bonds to influence rates and money supply
10. **Quantitative easing** is the Fed's unconventional tool for crises—buying assets to inject money
11. The Fed balances **dual mandate**: maximum employment AND price stability
12. Most "money printing" claims oversimplify a complex system
13. Modern money is strange but works better than historical alternatives

## Practice Questions

Test your understanding:

1. Why is money valuable if it's just paper (or digital numbers)?

2. If the reserve ratio is 20%, what is the money multiplier? If someone deposits $5,000, how much total money could be created in the banking system?

3. The Fed wants to slow down an overheating economy with rising inflation. Should it raise or lower interest rates? Why?

4. What's the difference between open market operations and quantitative easing?

5. Your friend says, "We should go back to the gold standard so the government can't manipulate the money supply." What are some counterarguments?

---

## Next Steps

Now that you understand how money works and how the Fed manages the economy, you're ready to explore the other major tool governments have: spending and taxes. In the next chapter, we'll examine **Fiscal Policy**—how government budgets, taxation, and spending affect economic growth and stability.

Your economic superpower now includes understanding the mysterious world of money and banking. When you hear about the Fed raising rates or debates about monetary policy, you'll actually know what's happening—and that's more than most adults can say!
