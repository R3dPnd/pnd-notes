---
title: Bug-bounty program landscape (program-selection reference)
area: security
tags: [bounty, recon, scope, reference]
summary: Passive survey of 32 public bounty/VDP programs to help choose which are worth a proper scope read. Not a findings report; no authorization to test anything.
updated: 2026-10-15
---
# Engagement: bounty-landscape (program-selection reference)

> **NO AUTHORIZATION EXISTS.** No authorization exists for any program or asset listed here. Nothing in this document authorizes testing, probing, or any traffic to any target. Any active work requires (1) the program's policy read directly from the primary source and (2) an explicit in/out verdict from Sen of Saturday first. When a policy is ambiguous, the default is out of scope / ask.

- **Date:** 2026-10-15
- **Agent(s):** Saudade of Sunday (recon, passive), Sen of Saturday (readiness assessment, document)
- **Target(s):** None. Survey of public bounty/VDP programs only.
- **Authorization:** None. Passive, public-source reading only (RoE section 1).
- **Scope & exclusions:** No assets are scoped. Per-program scope is unknown unless stated, and none has been validated.

## Summary
This is a landscape survey of 32 recon entries across vendor-run programs and bounty platforms, built to help choose programs worth a proper scope read. It is not a findings report. Verification labels are carried over exactly as recon supplied them, and no figure has been added or upgraded. Most program scope pages (all HackerOne and Bugcrowd program pages, and Google Bug Hunters rules pages) rendered no body and were not read.

## Method
- Passive reading of public program pages and listings by Saudade of Sunday. No traffic was sent to any in-scope asset.
- Labels, unchanged from recon:
  - **CONFIRMED-POLICY**: read from the program's own policy page. Headline figures only unless stated.
  - **CONFIRMED-LISTING**: read from a platform listing, not the program policy. Ranges may be cached. Policies are unread.
  - **SUSPECTED**: secondary source, unverified, or only partly read.
  - **PARTIAL**: headline only, scope and exclusions unread (GitHub).
- Readiness column: written by Sen of Saturday. It records what must still be read or confirmed before any active work could even be scoped. It is not a scope verdict.

## Caveats (read first)
- HackerOne program pages, Bugcrowd program pages, and Google Bug Hunters rules pages rendered no body, so none were read. Scope and exclusions for every program on those platforms are unknown.
- Listing ranges may be cached. Highest staleness risks are the Chrome figures and the Microsoft 365 Copilot window.
- Secondary sources: ThaiCERT/SecurityAffairs (Google, May 2026), Gigazine (Anthropic, 2026-05-08).
- Intigriti "public" status is inferred from an unverified confidentiality code mapping.
- YesWeHack: 55 programs, pages 1-2 of 3 read. Currency unspecified on listed amounts.
- Immunefi index lists 170 programs, with payout stats mostly "Private".
- Some Bugcrowd low tiers are points-only. 298 Bugcrowd engagements are listed.

## Programs by group

### A. Big-vendor and OS/browser programs

| # | Program | Platform / source | Reported rewards | Label | Scope-validation readiness |
|---|---|---|---|---|---|
| 1 | Google/Alphabet VRP | bughunters.google.com (self-hosted) | Paid, public. News: 2025 top single award $250k, $17.1M total paid. Web/apps/Cloud. | SUSPECTED | Rules pages rendered no body, so unread. Figures are from news. Scope unknown. Read Bug Hunters rules directly. |
| 2 | Android & Google Devices VRP | bughunters.google.com | Titan M zero-click w/ persistence $1.5M, without $750k, secure element exfil $375k. Pixel/Titan M, Google-maintained components. | SUSPECTED (secondary) | Rules unread. Amounts are secondary-sourced. Device and hardware testing needs separate scoping. |
| 3 | Chrome VRP | bughunters.google.com | Memory-safety base $500 (SecurityAffairs May 2026) vs $2,000 (Oct 13 2026 secondary report). **Conflict.** Full chain up to $250k + $250k MiraclePtr bonus. | SUSPECTED | Rules unread. Sources conflict and are high staleness risk. Primary page must resolve the discrepancy. |
| 4 | Microsoft MSRC hub | microsoft.com/en-us/msrc/bounty | Cloud up to $100k, Endpoint/On-Prem up to $250k, Zero Day Quest up to $100k. Zero Day Quest $5M pool claim unverified. | CONFIRMED-POLICY (headline caps only) | Hub-level caps only. Each sub-program's scope page must be read separately. The $5M claim is not confirmed. |
| 5 | Microsoft Edge | microsoft.com/en-us/msrc/bounty-new-edge | $500-$30k (page also says $250-$30k). Sandbox escape $20-30k. DoS out of scope. Bugs reproducing in Chrome excluded. Unlikely user interaction may be downgraded. | CONFIRMED-POLICY | Policy read. The page is internally inconsistent on the floor ($500 vs $250). Asset list and technique rules still need an explicit verdict. |
| 6 | Microsoft 365 Copilot | microsoft.com/en-us/msrc/bounty-m365-copilot | $250-$30k. **Time-boxed Feb 17-Mar 18 2026**, Zero Day Quest live-event participants only. OOS: prompt injection without impact beyond attacker, hallucinations, system prompt leakage. | CONFIRMED-POLICY | **Not currently open. Time-boxed program closed.** Not eligible for any work. |
| 7 | Apple Security Bounty | security.apple.com/bounty | Up to $2M (kernel network zero-click), $1M iCloud data / PCC RCE, $350k user-space network zero-click. Bonuses: beta +50%, Lockdown bypass +100%, both +150% (max >$5M). Target Flags. PoC wanted. Subdomain takeover up to $5k. Donations doubled. Low beginner-friendliness. | CONFIRMED-POLICY | Policy read. Per-category scope and device/research-environment requirements still need a verdict. Subdomain takeover technique needs explicit scope confirmation. |
| 8 | Meta | bugbounty.meta.com | $500 min, Mobile RCE $300k, ATO $130k. Hacker Plus up to +30%. Third-party in scope only via passive own-device traffic. Test accounts. One issue per report. Open redirects / public profile info = false positives. Spam/SE/DoS OOS. WhatsApp Private Processing invite-only. | CONFIRMED-POLICY | Policy read. Test-account rules and the third-party limits must be applied per asset. WhatsApp Private Processing is invite-only, so out unless invited. |
| 10 | Mozilla Client | mozilla.org/en-US/security/client-bug-bounty/ | Up to $20k, UXSS $10k, sec-high $3k. OOS: EOL products, unbundled 3rd-party, reports containing CVSS/severity keywords. Dupes within 48h split. Sanctioned countries and staff excluded. Safe harbor stated. | CONFIRMED-POLICY | Policy read, safe harbor stated. Check eligibility (country/staff) and the product list. |
| 11 | Mozilla Web | mozilla.org/en-US/security/bug-bounty/ | Amounts not shown. | CONFIRMED-POLICY (no amounts) | Policy page read but payouts unknown. Web asset list needs a verdict. |
| 13 | Samsung Mobile | security.samsungmobile.com/rewardsProgram.smsb | $200-$1M. Excludes crash-only without attack path, no-PoC, email submissions. Ticketing system. Sole discretion. | CONFIRMED-POLICY | Policy read. Device and model scope must be confirmed. Payout is at Samsung's sole discretion. |

### B. Security-/privacy-focused product vendors and exchanges

| # | Program | Platform / source | Reported rewards | Label | Scope-validation readiness |
|---|---|---|---|---|---|
| 9 | GitHub | HackerOne hackerone.com/github; bounty.github.com | Public $10k+ critical, private $30k+. | PARTIAL (headline only) | **Scope and exclusions unread.** HackerOne policy unread, so scope unknown. |
| 14 | Proton | proton.me/security/bug-bounty | Critical $25-50k, exceptional up to $100k. Email submission. PoC/impact path required. Paid after fix. Safe harbor page. Low severity unpaid by default. | CONFIRMED-POLICY | Policy read. Safe harbor page exists but must be read in full. Need the asset list. |
| 15 | Kraken | kraken.com/features/security/bug-bounty | Low $500-1k, Critical $100k-$1.5M, paid in BTC. Email submission. Intermediate account + ID verification required. Ack 1 business day, triage 10, payment 14 days after confirmation. Excludes scanner output, AI-generated reports, missing headers w/o exploitability, version disclosure. | CONFIRMED-POLICY | Policy read. Requires a verified account and ID. Scanner-based and AI-generated reports are excluded. Account setup is a prerequisite before any scoping. |

### C. Web3

| # | Program | Platform / source | Reported rewards | Label | Scope-validation readiness |
|---|---|---|---|---|---|
| 12 | Ethereum Foundation | ethereum.org/en/bug-bounty/ | Low $2k, Med $10k, High $50k, Critical $1M (ETH/DAI). Glamsterdam time multipliers 0.5x/2.0x/1.5x. OOS: infra (web/DNS/email), ERC-20/ENS contracts. Local testnets only. PoC required. ID verification. Public disclosure = ineligible. | CONFIRMED-POLICY | Policy read. Local testnets only, so no live-network traffic. ID verification needed. Multiplier windows must be checked against the current date. |
| 16 | Ethena | immunefi.com/bug-bounty/ethena/information/ | Critical 10% of funds at risk, cap $3M, min $100k. PoC all severities. Local fork only. Full KYC. Primacy of Impact. ~28 assets. Excludes DoS/SE/oracle/automated high-traffic. | CONFIRMED-POLICY | Policy read. Full KYC required. Local fork only. Asset-by-asset verdict needed for the ~28 assets. |
| 17 | ENS | immunefi.com/bug-bounty/ens/information/ | Critical contracts cap $250k, High $25-100k. Web/app Critical flat $25k (only no-user-action fund loss / unauthorized mint / key leak). KYC language inconsistent. Local fork only. | CONFIRMED-POLICY | Policy read. KYC requirement is inconsistent and must be resolved. Local fork only. |

### D. AI / LLM

| # | Program | Platform / source | Reported rewards | Label | Scope-validation readiness |
|---|---|---|---|---|---|
| 18 | Anthropic | HackerOne hackerone.com/anthropic | Public since 2026-05-08 (reported). Low $100-250 / $250-750 core; Med $250-750 / $1-2.5k core; High $1-2.5k / $3-5k core; Emergency $3-5k / $7.5-10k core. $550,835 paid across 429 cases. Conflicting $25k invite-only CBRN jailbreak claim unverified. | SUSPECTED (Gigazine) | **HackerOne policy unread, scope unknown.** All figures are secondary. The invite-only claim is unverified. |
| 19 | OpenAI Safety | bugcrowd.com/engagements/openai-safety | $250-$7,500. Separate OpenAI security program reportedly $100k max (Mar 2025 reporting), unverified. | CONFIRMED-LISTING | Bugcrowd policy unread, scope unknown. The separate security program is unverified and unlocated. |
| 6 | Microsoft 365 Copilot | (see group A) | | | Time-boxed program closed. |

### E. Bugcrowd-hosted programs (policies unread)

| # | Program | Reported rewards | Label | Scope-validation readiness |
|---|---|---|---|---|
| 20 | Okta | $100-$75,000 | CONFIRMED-LISTING | Bugcrowd policy unread, scope unknown. |
| 21 | Zendesk (managed) | $100-$50,000 | CONFIRMED-LISTING | Bugcrowd policy unread, scope unknown. Managed program. |
| 22 | Chime (managed) | $50-$20,000 | CONFIRMED-LISTING | Bugcrowd policy unread, scope unknown. Managed program. |
| 23 | Bitpanda | $100-$15,000 | CONFIRMED-LISTING | Bugcrowd policy unread, scope unknown. |
| 24 | Immutable | $25-$10,000 | CONFIRMED-LISTING | Bugcrowd policy unread, scope unknown. Low tier may be points-only. |
| 25 | Verisign | $100-$10,000 | CONFIRMED-LISTING | Bugcrowd policy unread, scope unknown. |

### F. Intigriti-hosted programs (policies unread; public status inferred)

| # | Program | Reported rewards | Label | Scope-validation readiness |
|---|---|---|---|---|
| 26 | Altera | $500-$30k | CONFIRMED-LISTING | Public status inferred only. Policy unread, scope unknown. |
| 26 | Arm | $500-$20k | CONFIRMED-LISTING | Public status inferred only. Policy unread, scope unknown. |
| 27 | NVIDIA | $150-$15k | CONFIRMED-LISTING | Public status inferred. Policy unread. A separate NVIDIA VDP is VDP-only, no payout. |
| 27 | DigitalOcean | $50-$10k | CONFIRMED-LISTING | Public status inferred. Policy unread, scope unknown. |
| 27 | Dropbox | $100-$15k | CONFIRMED-LISTING | Public status inferred. Policy unread. A separate Dropbox VDP is VDP-only, no payout. |
| 27 | Monzo | GBP 50-12.5k | CONFIRMED-LISTING | Public status inferred. Policy unread, scope unknown. |
| 27 | Intigriti platform program | up to EUR 13,337 | CONFIRMED-LISTING | Public status inferred. Policy unread, scope unknown. |
| 27 | Grafana VDP, Coca-Cola VDP | Zero range | CONFIRMED-LISTING | **VDP-only, no payout.** |
| 27 | BMW Group Automotive, Capital.com | Up to EUR 15k each | Unexamined | Not examined. Nothing known beyond the listing. |

### G. YesWeHack, public sector, and VDP-only

| # | Program | Reported rewards | Label | Scope-validation readiness |
|---|---|---|---|---|
| 28 | Swiss Post E-Voting | Up to 230,000 (currency unspecified) | CONFIRMED-LISTING | Policy unread. Currency unknown. Election infrastructure, so scope and rules need especially careful reading. |
| 28 | Doctolib, Kiteworks | Up to 50,000 (currency unspecified) | CONFIRMED-LISTING | Policy unread, scope unknown. Doctolib handles health data, so handling rules matter. |
| 28 | OVHcloud | Up to 12,500 (currency unspecified) | CONFIRMED-LISTING | Policy unread, scope unknown. |
| 28 | YesWeHack Dojo | n/a | CONFIRMED-LISTING | **A CTF, not a bounty.** No payout. Remaining listing page 3 of 3 unread. |
| 29 | Quebec Government | Up to 3,000 | CONFIRMED-LISTING | Policy unread, scope unknown. Government systems, so read rules carefully. |
| 29 | Mon Espace Santé | Up to 8,000 | CONFIRMED-LISTING | Policy unread. Health-data service. |
| 29 | City of Vienna | Points to $3,500 | CONFIRMED-LISTING | Policy unread. Points-based, so payout nature unclear. |
| 29 | Santé Publique France, Dossier Medical Partagé | Not stated | CONFIRMED-LISTING | Policy unread, payout unknown. |
| 30 | US federal VDPs (CISA BOD 20-01) | VDP-only, no payment expectation | CONFIRMED-POLICY (template) | **VDP-only, no payout.** Only the template was read. Each agency's own policy must be read. |
| 32 | curl | NO bounty ("never offers rewards") | CONFIRMED-POLICY | **No bounty.** |

### H. HackerOne programs with unreadable amounts

| # | Program | Notes | Label | Scope-validation readiness |
|---|---|---|---|---|
| 31 | Cloudflare | Amounts unreadable | SUSPECTED | HackerOne policy unread, scope unknown. |
| 31 | GitLab | Don't request compensation. Public projects on GitLab.com are outside bounty. | SUSPECTED | HackerOne policy unread. The compensation and public-project notes need confirming from the primary policy. |
| 31 | Shopify | Amounts unreadable | SUSPECTED | HackerOne policy unread, scope unknown. |
| 31 | Node.js | HackerOne Signal >=1.0 required. Reward availability unknown (April 2026 secondary report of pause due to IBB funding stop; IBB submissions reportedly paused). | SUSPECTED | Policy unread. Reward availability unknown and possibly paused. Signal requirement is a gate. |

## Suggested shortlist (suggestion only)

This is a suggestion based solely on the recon data above. It is not a scope verdict, not a recommendation to test anything, and not authorization. Every item still needs the readiness step in the table above.

- **Beginner-friendly web/SaaS (reading candidates):** programs with a policy already read and web-oriented scope. Meta (#8), Proton (#14), Mozilla Web (#11), Kraken (#15, needs ID verification). Bugcrowd and Intigriti SaaS names (Okta, Zendesk, Dropbox, DigitalOcean, Monzo) have wider ranges but their policies are unread. Apple is marked low beginner-friendliness in recon.
- **High-ceiling research:** Apple (#7), Samsung Mobile (#13), Microsoft hub (#4) and Edge (#5), Android/Titan M (#2, SUSPECTED), Chrome (#3, conflicting figures), Mozilla Client (#10). These are policy-read except the Google entries, which are SUSPECTED.
- **Web3:** Ethereum Foundation (#12), Ethena (#16), ENS (#17). All policy-read, all local testnet or fork only, with ID or KYC requirements.
- **AI/LLM:** Anthropic (#18, SUSPECTED, scope unknown), OpenAI Safety (#19, listing only). Microsoft 365 Copilot (#6) is closed and should not be shortlisted.
- **Public-sector:** Quebec Government, Mon Espace Santé, City of Vienna, Swiss Post E-Voting (#28-29), all listing-only. US federal VDPs (#30) are VDP-only with no payout, and curl (#32) has no bounty, so neither has a payout.
- **Excluded from shortlist (not open or no payout):** Microsoft 365 Copilot (time-boxed, closed), Dropbox/NVIDIA/Grafana/Coca-Cola VDPs, CISA-template VDPs, curl, YesWeHack Dojo.

## Out of scope / not tested
Everything. No asset was tested, probed, or enumerated. No authorization exists for any program here.

## References
Primary policy pages (read by recon, unchanged URLs as listed in the tables): Microsoft MSRC, Apple Security Bounty, Meta, Mozilla, Ethereum.org, Samsung Mobile, Proton, Kraken, Immunefi (Ethena, ENS), CISA VDP template, curl. Listings: Bugcrowd, Intigriti, YesWeHack. Secondary: ThaiCERT/SecurityAffairs (Google, May 2026), Gigazine (Anthropic, 2026-05-08).
