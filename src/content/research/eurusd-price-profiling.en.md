---
routeSlug: "eurusd-price-profiling"
lang: "en"
title: "EURUSD price profiling: a statistical characterization before any hypothesis"
summary: "18 descriptive analyses of EURUSD over 1,439,786 M1 bars (2022-2025), audited against a false-discovery-rate correction on the 101 tests run across the line. A document about method, not a signal."
tags: ["price-profiling", "eurusd", "descriptive-statistics", "market-microstructure", "methodology"]
date: "2026-08-14"
readMinutes: 10
featured: false
---

## Why profile before hypothesizing

Most research processes begin with an idea about the market and then look for
data that supports it. We prefer to invert that order at least once per
instrument, and ask a more basic question first: what does this price series
actually do, independent of any strategy we might have in mind? This case
study is that groundwork for EURUSD. It is a reference document rather than a
discovery, and it is written to be consulted while designing future research
lines.

The distinction matters operationally. This write-up carries no PASA / NO PASA
/ DESCARTADA verdict, because no signal is being tested here - there is only a
set of measurements taken on the full historical sample. Any hypothesis that
later touches one of these patterns still needs its own economic rationale and
its own out-of-sample test. Treating a profiling result as the origin of a
hypothesis would mean mining the same dataset twice for the same effect, which
is a well-documented route to a false positive.

We should also be explicit about what stays outside the scope of this page.
The exact magnitudes, directions and specific time windows behind each finding
belong to the underlying research and are not published here. What we do
publish is the method: how each question was posed, how hard it was tested,
and what happened to the results that turned out to be noise. Readers looking
for a tradable pattern will not find one; readers evaluating research process
will find the part that actually distinguishes one process from another.

## Data and method

The sample is EURUSD M1 bid quotes from HistData, covering 2022-01-02 to
2025-12-31 - 1,439,786 M1 bars, aggregated upward to H1 and daily bars.
Sessions are defined in EST without DST adjustment: Asia, London and New York,
plus the overlap and gap windows between them. The choice to fix the session
clock instead of following DST keeps session boundaries stable across the four
years, at the cost of a one-hour drift relative to local market hours during
part of each year.

The statistical toolkit is deliberately conventional: one-sample and
two-sample t-tests, ANOVA, Pearson correlation, the Jarque-Bera normality
test, binomial tests, the Wald-Wolfowitz runs test and chi-square tests of
independence. Every result is recorded internally with its statistic, its
p-value and its sample size, and flagged as in-sample. Eighteen analyses were
run in total, covering session and hourly bias, weekday and monthly
seasonality, the shape of the return distribution, weekend gap behaviour,
run-length independence, round-number reactions, month-end effects, and the
way each session's high and low interact with the prior session's range.

## Where the structure actually lives

The first result concerns resolution more than it concerns the market.
Aggregating returns by full trading session smooths over variation that is
genuinely there: several individual hours show a statistically significant
directional bias that the session-level average does not. Crossing that
hourly dimension with the weekday sharpens it further, since some of those
biases concentrate on particular days and are absent on others - a structure
invisible from either dimension examined alone. We take this as a
methodological warning more than as a finding about EURUSD. The level of
aggregation at which a researcher chooses to look is itself a modelling
decision, and a null result at one resolution says very little about the next
one down.

A related result sits less comfortably with the rest of the document. Testing
the full weekly sample, Friday's return and the following Monday's return turn
out to be statistically related. We report it because it contradicts the
informal assumption that adjacent trading days are independent draws, and
because we cannot currently explain the mechanism. Weekend information flow,
positioning effects around the weekly close and a simple artefact of the fixed
session clock are all plausible in part, and this dataset cannot separate
them. Resolving it would require either a second instrument with the same
weekly structure or an intraday decomposition of the Monday open, neither of
which is part of this study.

## Session ranges, breakouts and memory

Four of the eighteen analyses address the same underlying question: when a
session takes out the extremes of a previous session's range, does anything
follow? Testing every link in the daily session chain with a chi-square test
of independence, we find one specific link with a statistically significant
continuation effect of meaningful size. The remaining links show nothing.
Where the effect appears, its direction is continuation, and we would rather
report the asymmetry plainly than dress a single significant cell as a general
property of the instrument.

Two adjacent results give that finding context. Certain pairs of consecutive
sessions show a much higher tendency for the later session to remain entirely
inside the earlier session's range instead of breaking out of it, without
either side of the range being favoured - no directional tilt toward taking
the high more often than the low, or the reverse. And when we compare a
session against its own range one day earlier, and separately against the
session that immediately preceded it intraday, the day-over-day comparison
shows the higher tendency to extend. Our reading is that some sessions carry
more memory of their own prior activity than of the session that handed off
to them hours earlier, which is consistent with participant composition being
more stable across days at the same clock time than across the trading day
itself. That mechanism is an interpretation, not something these tests
identify.

The intraday placement of extremes follows the same logic: certain windows of
the day are considerably more likely to contain the day's high or low than
others, in a way consistent with differences in overlapping-market liquidity.
The weekly equivalent - the distribution of weekly highs and lows across
weekdays - is uneven as well, but we never formally tested it for
significance, so it stands here as a descriptive note and nothing more.

## Distribution shape and risk context

H1 returns show excess kurtosis of 15.6, with Jarque-Bera rejecting normality
at effectively zero p-value for both H1 and daily bars (n = 24,125 and 1,052
respectively). This is the one result we report in full, including its
magnitude, because it is risk context and carries no directional edge: a
normal distribution assumption used for stop placement or position sizing
would meaningfully understate the probability of extreme moves at the H1
horizon. The daily bars are better behaved than the hourly ones, which is the
expected aggregation effect and a reminder that the horizon at which risk is
parameterised matters as much as the parameter itself.

Weekend gaps, by contrast, turn out to be a smaller phenomenon than their
reputation suggests. They are small on average and the large majority close
within a short window after the reopen, which we read as reopen-liquidity
noise, with little sign of information-driven repricing carrying into the
week.

## What showed no evidence

Null results are worth stating plainly, and in this case there is no cost to
publishing them in full since none of them is monetizable. Daily direction
shows no significant deviation from randomness under the Wald-Wolfowitz runs
test (p = 0.309). Round 50-pip levels produce no systematic reaction (binomial
p = 0.069, close enough to the conventional threshold that we would not treat
a rejection here as settled either way). Plain daily returns show no isolated
weekday directional bias, with p > 0.08 for every weekday, which is a
different question from the hourly pattern described above and does not
contradict it. Session-breakout incidence shows no monthly seasonality once
tested correctly. There is no summer lull effect over June to August (p =
0.78), and no month-end rebalancing effect either on range (p = 0.73) or on
direction (p = 0.68).

## The audit, which is the actual result

The most important output of this line of research is methodological. When we
broke the session-continuation findings down further, by calendar month and by
weekday, an internal audit of our own analysis caught two real problems.

The first is a validity failure in the test itself. Chi-square tests of
independence require a minimum expected count per cell - the conventional rule
of thumb being five - and the finer breakdown produced several cells well
below it, which invalidates the chi-square approximation in exactly the places
where the most interesting patterns appeared. Rebuilding that breakdown on a
test appropriate to sparse cells changed which patterns survived. That is the
uncomfortable part: the original version of the analysis was not wrong in its
arithmetic, it was wrong in its choice of test, and nothing in the output
flagged it. Only a deliberate re-examination did.

The second problem is multiplicity. Across this entire research line we ran
101 statistical tests, and at a 5% nominal threshold a handful of significant
results is what pure chance produces. We applied the Benjamini-Hochberg
procedure, which controls the false discovery rate - the expected proportion
of false positives among the results declared significant - rather than the
family-wise error rate, on the grounds that this is exploratory profiling
where a controlled share of false positives is an acceptable price for
retaining power. The correction cut the count of defensible significant
results appreciably.

Every finding reported above survives both checks. The ones that did not were
dropped instead of being kept with a caveat attached, which we consider the
only honest option: a corrected result reported with an asterisk tends to be
remembered without it.

One open issue remains, and we would rather name it than let it pass. The
Benjamini-Hochberg correction was applied to the 101 tests as a single family,
which is a defensible choice but not the only one. A stricter reading would
argue that the family should include every test run across every research
line on this instrument, and a looser one would treat each of the eighteen
analyses as its own family. The first would remove more findings than we
removed; the second would restore some. We chose the intermediate definition
before seeing which results it would eliminate, and we record it here so the
choice is auditable.

## How this document is used, and what it does not license

This profiling is consulted, and deliberately never mined. Its function is to
build intuition about the instrument before a hypothesis is formalised
elsewhere in the process: where volatility concentrates, how fat the tails
are, which calendar effects are real and which are folklore, how one
session's range relates to the next.

There is a cost to that discipline which is worth stating. Because every
effect described here was measured on the full 2022-2025 sample, that sample
is now partly spent for these specific questions. A hypothesis built on one of
these patterns cannot be validated out-of-sample on the same four years in any
meaningful sense; genuine validation would require a different period, a
different instrument or a forward-testing window that did not exist when the
profiling was run. In my view that constraint is the correct one to accept.
The alternative is a research process that keeps finding what it already
knows is there.

## Further detail

The full technical detail - exact magnitudes, directions, specific time
windows, every parameter tested and the complete set of figures - is kept in a
private research repository, since it forms part of an ongoing research
asset. Reach out if you would like to discuss the methodology or a specific
result in more depth.
