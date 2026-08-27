---
routeSlug: "economia-del-comportamiento"
lang: "en"
title: "A Solid Programme and a Fragile Catalogue"
summary: "What survives of behavioral economics once it is measured outside the lab, and what that implies for investment decisions."
tags: ["behavioral economics", "publication bias", "behavioral finance"]
date: "2024-01-24"
readMinutes: 8
featured: false
---

There is a comfortable way to tell the story of behavioral economics and a useful one. The comfortable version says that traditional economics assumed rational agents, that psychology proved we are not, and that a toolkit for improving decisions follows. The useful version begins by separating two things the first conflates: the research programme, which studies how people decide under real cognitive constraints, and the catalogue of effects, that list of named biases circulating through corporate decks and popular books. Our thesis is that the programme is solid and the catalogue is fragile, and the distinction is not academic: it determines whether a behavioral intervention accomplishes anything once applied at scale. I wrote an earlier version of this text in 2024 that rested almost entirely on the catalogue. This is the correction.

## What the critique of the rational agent actually established

The maximising agent model was never a psychological description. It was an instrumental assumption: if deviations from maximisation are idiosyncratic and cancel in the aggregate, the model predicts well even though every individual deviates. What Kahneman and Tversky showed, and this contribution survives intact, is that the deviations are systematic and directional. Loss aversion does not scatter behaviour around the optimum; it shifts it in a predictable direction. The reference point matters. How an option is presented changes the choice even when the option set is identical. That invalidates the aggregate cancellation assumption, which was the model's strong defence, and it is a first-order contribution.

What does not follow is that every anomaly documented in the laboratory constitutes a stable, generalisable and actionable mechanism. That inference was drawn too quickly, in part because the format of a behavioral finding - a memorably named effect with an elegant experiment - travels well outside academia. The field accumulated an inventory of effects that keeps growing with no theory organising it and no criterion establishing which are primitive and which are the same mechanisms surfacing under different presentation.

The objection does not come from outside. Ulrike Malmendier, who writes the introduction to the 2026 edition of the *Behavioral Economics Guide*, the field's annual reference publication, reconstructs the trajectory in two waves: the first, building on Tversky and Kahneman, compiled the catalogue of systematic decision-making errors; the second carried those findings into empirical studies of consumers, investors, managers and policymakers. Her assessment is that the programme stalled at a decisive point. Where the neoclassical model treated the agent as a perfectly programmed computer, the behavioral model turned it into a program "prone to systematic bugs", no less mechanical: once the biases are identified and modelled, the program is assumed to run the same way for everyone, at every point in their lives. What a person has lived through does not enter the model. Gigerenzer, who wrote the introduction to the 2016 edition, arrives somewhere similar by another route: many of these supposed errors are ecologically rational heuristics, and calling a deviation from a normative model a bias presupposes that the normative model is the right yardstick, which has to be argued case by case (Gigerenzer, 2018).

## The number that organises the discussion

The most useful evidence for calibrating expectations comes not from theoretical critique but from comparing what gets published against what gets implemented. DellaVigna and Linos (2022) assembled 126 randomised trials covering some 23 million individuals, including every trial run by two of the largest behavioral units in the United States public sector, and compared them against a sample of trials published in academic journals drawn from two meta-analyses. In the academic papers the average effect of a nudge on take-up is 8.7 percentage points, a 33.4% increase over control. In the implementation units the average effect is 1.4 percentage points, an 8.0% increase.

That figure admits two mistaken readings and one correct one. The pessimistic reading says nudges do not work, and it is false: 1.4 percentage points is a substantial and statistically robust effect, and against the near-zero cost of reordering a form or rewriting a letter, the return on investment remains high. The naive reading says the difference reflects real-world implementation friction, and it is also false by the authors' own account: a meta-analysis model incorporating statistical power, intervention characteristics and selective publication attributes roughly 70% of the gap to the last of these, compounded by low power. The correct reading is that the published catalogue is biased upward by construction, and that anyone planning an intervention using magnitudes drawn from the literature is overstating the effect by a factor near six.

## The case worth examining closely

The problem does not end with publication bias. In 2012 PNAS published a paper by Shu, Mazar, Gino, Ariely and Bazerman reporting that signing an honesty declaration at the top of a form rather than at the bottom reduced under-reporting. The finding was cheap to implement and immediately applicable, and it was adopted by insurers, corporations and public agencies. In 2020 the authors themselves published six failed replication attempts and, in doing so, released the original data for the first time. A group of anonymous researchers downloaded it and found, in the field experiment conducted with an auto insurer, anomalies explicable only by fabrication. The authors requested retraction in July 2021. In June 2023, Data Colada documented that data in a different study within the same paper had also been tampered with, by a different person.

The precise shape of the problem is worth dwelling on, because it is not the shape usually described. This is not one dishonest researcher in an otherwise healthy field. It is that a result with enormous demand appetite - agencies wanted a cheap intervention against declarative fraud - stayed in circulation and in graduate classrooms for eight years while the data remained unavailable, and collapsed only when data-sharing norms changed. The detection mechanism was neither peer review nor conceptual replication, which had failed in 2020 without triggering any suspicion of fraud. It was forensic inspection of a file nobody had previously seen. That says something about the state of controls in the field that no discussion of any particular bias can say.

## Where the thesis fits poorly

If the preceding argument were the whole story, we should expect behavioral interventions to fade at scale generally, and they do not. Automatic enrolment in retirement savings plans is the clearest counterexample, and it is telling that Malmendier cites it as one of the field's real achievements alongside simplified disclosure forms: switching the default from opt-in to opt-out produces participation jumps of tens of percentage points, sustained, replicated across populations and firms, at a magnitude no information campaign achieves. The asymmetry is informative. Effects that survive scaling tend to operate on the architecture of the decision - what happens if the subject does nothing - rather than on cognition. Those that fade tend to depend on the subject processing a message in a particular way. That regularity has not been formalised as a criterion, and it would be valuable if it were.

There is also an evidence gap worth naming: nearly all the calibration literature comes from interventions in high-income countries, on populations with digital access, in domains where an administrative record permits measuring take-up. We do not know how much of this transfers to contexts of high inflation, widespread informality and short planning horizons, which is precisely the Argentine context.

## The conjecture: measure the gap rather than teach the list

Here we move from review to a proposal of our own, untested in this text.

Applying behavioral economics to investment decisions usually takes the form of education: explaining anchoring, loss aversion and sunk cost to the investor, on the implicit expectation that awareness of a bias corrects it. That expectation rests on weak empirical footing. The conjecture I want to test is that the return on a behavioral intervention in investing depends, in part, on whether it modifies the decision process or only the decision-maker's knowledge, and that this difference is measurable.

The natural metric exists and is little used in the local market. It compares a fund's time-weighted return, which is the one the fund publishes, against the money-weighted return of its holders, which incorporates when they actually subscribed and redeemed. The difference between the two is a direct measure of the cost of behaviour: how much the average investor loses relative to the instrument they chose, by entering late and exiting early. The specification is straightforward on Argentine mutual fund data: build both series by fund and by category, and test whether the gap is systematically negative and whether its magnitude rises with fund volatility and with subscription and redemption frequency. The interesting falsifiable prediction is that the gap is larger in equity categories and in periods of currency stress, and that it responds to product architecture - redemption terms, minimums, distribution channel - rather than to the investor's stated profile.

The limits are serious. I have no prior magnitude estimate for the Argentine market, and importing one from developed markets would be a mistake, since flow composition and macroeconomic regime differ. Separating the investor's decision from that of the advising channel is hard to identify with aggregate data. And a negative gap is consistent with explanations that are not behavioral, starting with liquidity needs, which under high inflation can dominate any consideration of bias.

## Scope

This work leaves aside the normative debate over nudging, namely under what conditions designing someone else's choice architecture is legitimate, which is a problem of political philosophy before it is one of evidence. Nor do I address the use of these techniques for commercial ends against the recipient's interest, which deserves its own treatment and which the popular literature tends to mention in passing.

---

### References

DellaVigna, S. and Linos, E. (2022). RCTs to scale: comprehensive evidence from two nudge units. *Econometrica*, 90(1), 81-116.

Gigerenzer, G. and Brighton, H. (2009). Homo heuristicus: why biased minds make better inferences. *Topics in Cognitive Science*, 1(1), 107-143.

Gigerenzer, G. (2018). The bias bias in behavioral economics. *Review of Behavioral Economics*, 5(3-4), 303-336.

Malmendier, U. (2026). Homo experiens: why behavioral economics needs the life sciences. Introduction. In A. Samson (ed.), *The Behavioral Economics Guide 2026*. https://www.behavioraleconomics.com/be-guide/

Samson, A. (ed.). (2026). *The Behavioral Economics Guide 2026*. ISSN 2398-2020. https://www.behavioraleconomics.com/be-guide/

Kahneman, D. and Tversky, A. (1979). Prospect theory: an analysis of decision under risk. *Econometrica*, 47(2), 263-291.

Madrian, B. and Shea, D. (2001). The power of suggestion: inertia in 401(k) participation and savings behavior. *Quarterly Journal of Economics*, 116(4), 1149-1187.

Shu, L., Mazar, N., Gino, F., Ariely, D. and Bazerman, M. (2012). Signing at the beginning makes ethics salient and decreases dishonest self-reports in comparison to signing at the end. *PNAS*, 109(38), 15197-15200. Retracted 2021.

Simmons, J., Nelson, L. and Simonsohn, U. Data Colada, posts 98 (2021) and 109 (2023).

Thaler, R. and Sunstein, C. (2008). *Nudge: improving decisions about health, wealth, and happiness*. Yale University Press.
