# Defense plan

The defense is entirely in English and is about **the app and how we built it**.
Git, GitHub and GitHub Actions are not the topic. They are our evidence: we use the repository to *show* how each part of the app was made.

Any member may be asked about any part of the app. See [Understanding the whole app](PROJECT.md#understanding-the-whole-app).

## Running order

| # | Part | Content | Shown with | Speaker |
| --- | --- | --- | --- | --- |
| 1 | Problem and product | Who the user is, what Gofio solves, why evidence matters in fitness apps | 2 slides | _tbd_ |
| 2 | Use cases | The main use cases and how they map to screens | Use case diagram (`docs/USE-CASES.md`) | _tbd_ |
| 3 | Live demo | Sign up → profile → generate plan → "Why this?" on an exercise → log a workout and weight → progress chart | iPhone with Expo Go | _tbd_ |
| 4 | How it works | Architecture: app, Firebase, `generatePlan`, LLM; why the key is on the server; how the plan is validated | Diagram + real code | _tbd_ |
| 5 | Evidence library | How a study gets into the app: pull request → Actions validation → seed → "Why this?" | A real PR and its Actions run | _tbd_ |
| 6 | How we built it | One feature followed end to end: issue → branch → commits → review questions → CI → merge → release | GitHub (issue, PR, Actions, tags) | _tbd_ |
| 7 | Lessons learned and Q&A | What worked, what we'd change, how we used AI responsibly | | everyone |

## Things to collect during the project

- One issue with a clean story (issue → branch → PR with review questions → merge). Note its number here: `#__`
- One evidence PR whose validation failed in Actions and was then fixed. It shows the check working.
- PRs labelled `conflict-resolved`: pick the clearest one in case we're asked.
- Screenshots of the Projects board at each phase.
- The Insights → Contributors page near the end.
- Tags `v0.1.0` and `v1.0.0`.

## Questions to rehearse

**About the app**

- Who is Gofio for, and how is it different from other fitness apps?
- Walk us through what happens, step by step, when the user taps "Generate my plan".
- How do you stop the AI from inventing exercises or references?
- How did you choose which studies go into the evidence library? What makes a source good enough?
- What happens if the model returns invalid JSON or ignores an allergy?
- Why is the calorie target calculated in code and not by the AI? Explain the formula.
- How do you protect users' health data?
- Why React Native and Expo instead of native Swift or Flutter?
- Which use case was the hardest to implement, and why?

**About how you built it**

- How did you split the work, and how did you make sure everyone understands all of it?
- How did you use AI tools, and how did you check what they produced?
- What does your GitHub Actions workflow check, and why those checks?
- Why do you rebase before review and then use a merge commit?
- When would you use `git revert` instead of `git reset`?
- What would you do differently with two more months?

## Fallbacks for the day

| Risk | Fallback |
| --- | --- |
| No Wi-Fi or slow network | Mobile hotspot; pre-recorded demo video |
| AI response slow or failing | A plan generated beforehand, cached in the app |
| API free quota runs out | Second provider configured; demo account with a saved plan |
| Phone problem | Second phone with Expo Go and the demo account logged in |
