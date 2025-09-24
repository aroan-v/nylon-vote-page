# Vote Dashboard Tracker

## Introduction

This project started during a fandom vote competition where our team was falling behind. The gap was widening, and to make things worse, participation from our fandom was low. The few of us who were still voting felt like our efforts weren’t moving the needle. That’s when I began thinking: _how can I make voting easier and more motivating for the ones still in the fight?_

**My first idea was efficiency.** I dug into the host poll’s script, rooted it out, and re-injected it into my own page. Then I made five iframe copies of it, so voters could cast multiple votes faster across different browsers and devices. To prevent issues, I also figured out what triggered the rate limits and added instructions so voters could avoid getting blocked.

**The second idea was morale.** I built a **votes sent tracker** that counted every successful vote through the server’s response and stored the number in local storage. This way, each voter could see their personal total across sessions — a number they could proudly share with the group. I also added a **live gap counter** that refreshed every 3 seconds, plus a redesigned version of the results page that was far more engaging than the dull original.

In the end, the project hit its two goals:

1. **Empower the voters** by giving them a clear count of their contributions.
2. **Make voting less boring** by turning it into a more interactive and motivating experience.

We didn’t win the competition — we finished in second place — but morale was high. Voters could finally see and celebrate how much they had contributed, and that made the whole experience worth it.

## Main Features

- **5 Poll Frames**: I injected the original poll script and made 5 iframe copies, so voters could send multiple votes more easily across different browsers and devices.
- **Rate-Limit Instructions**: I tested and figured out what triggered the rate limits, then added steps so people could avoid getting blocked.
- **Votes Sent Counter**: Every successful vote response from the server added +1 to a local storage counter, so fans could track their lifetime total across sessions.
- **Live Gap Counter**: Updates every 3 seconds to show the gap between competitors.
- **Redesigned Results**: A cleaner, more engaging results board compared to the dull official page.

### Visualizations & Counters

- **Total Vote Tracker**: Shows how much a fan contributed overall, persisting across sessions.
- **Gap Counter**: Live updates to show if we’re catching up or falling behind.
- **Better UI**: Voting didn’t feel boring anymore because the results were actually nice to look at.

## Limitations

- Relies on the host poll’s server and API staying consistent.
- Best results needed multiple browsers or devices.
- Even with better efficiency and morale, the final ranking still depended on overall fandom participation (we ended up finishing in second place).

## Other Explored Concepts Through Research

- Figuring out and injecting third-party poll scripts.
- Detecting successful votes from server responses.
- Understanding and avoiding rate-limit triggers.
- Using local storage to persist counters.
- Designing a real-time dashboard that makes voting feel less dull.

## Applications Used

- **React + Next.js** as the web framework and constructor.
- **Zustand** for lightweight state management.
- **Tailwind CSS** for fast, utility-first styling.
- **HTML, CSS, JavaScript** for structure, styling, and core logic.
- **Iframes** to run multiple polls in parallel.
- **LocalStorage** for persisting vote counts across sessions.
- **Vercel** for deployment and hosting
- **Github** for version control

## Author

aroan-v
