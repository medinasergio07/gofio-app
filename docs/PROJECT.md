# Project overview

## Goals

We build a small, working mobile app and defend **the app and how we built it**, in English.
Git, GitHub and GitHub Actions are how we prove the "how": every decision, change and check is in the repository history.

1. Deliver an MVP that runs live on a real iPhone through Expo Go.
2. Back every training suggestion with published scientific evidence.
3. Run the whole project through GitHub: issues, feature branches, reviewed pull requests, Actions and releases.
4. Make every member able to explain **any** part of the app, not only their own (see [Understanding the whole app](#understanding-the-whole-app)).

## Scope

| Feature | MVP (must have) | Stretch (only if time allows) |
| --- | --- | --- |
| Sign-up and profile | Email login (Firebase Auth); age, height, weight, goal, allergies, training days | Google / Apple sign-in |
| Plan generation | Weekly routine and daily meal plan as structured JSON, shown as cards | Regenerate a single day or meal |
| **Evidence library** | Curated studies linked to each exercise; "Why this?" shows the source behind an exercise | Evidence for nutrition rules; strength of evidence filter |
| Calorie target | Computed in code (Mifflin-St Jeor + activity factor), not by the AI | Macro split per goal |
| Progress | Log a workout as done; log weight; weight-over-time chart | Streaks, reminders |
| History | Last generated plan cached on the device | Plan history |

**Out of scope:** payments, social features, wearables, food photo recognition, and any medical diagnosis.

The detailed behaviour of each feature is in `docs/USE-CASES.md` (issue #11).

## Evidence library

General-purpose AI models can invent exercises, numbers and even references.
So Gofio never lets the AI choose freely: it may only build routines from **exercises in our catalog**, and every exercise in the catalog is linked to at least one study that the team has read and summarised.

| Collection | Holds | Written by |
| --- | --- | --- |
| `evidence/{id}` | One study: title, authors, year, journal, DOI, study type (meta-analysis, RCT, review, guideline), population, key finding in one plain-English sentence, tags | Team (curators), through a pull request |
| `exercises/{id}` | One exercise: name, muscle groups, equipment, level, how-to, `evidenceIds[]` | Team, through a pull request |

How it is used:

1. `generatePlan` reads the catalog and gives the model only the exercises that fit the user's goal, level and equipment.
2. The server rejects any plan that contains an exercise id that isn't in the catalog.
3. In the app, tapping an exercise opens **"Why this?"**: the study's finding, its type and year, and a link to the DOI.

The library starts as JSON files in `data/evidence/` in the repository. A GitHub Actions job validates them on every pull request (required fields, DOI format, no exercise without evidence, no broken references). A script then loads them into Firestore. This way every article added to the app has a reviewed pull request behind it.

Starting sources, to be verified and summarised by the curators:

- Schoenfeld, Ogborn & Krieger (2017). Dose-response relationship between weekly resistance training volume and increases in muscle mass. *J Sports Sci*. Meta-analysis.
- Jäger et al. (2017). ISSN position stand: protein and exercise. *J Int Soc Sports Nutr*. doi:10.1186/s12970-017-0177-8.
- Mifflin et al. (1990). A new predictive equation for resting energy expenditure in healthy individuals. *Am J Clin Nutr*. Basis of our calorie formula.
- Bull et al. (2020). WHO guidelines on physical activity and sedentary behaviour. *Br J Sports Med*.

Search PubMed or Google Scholar for meta-analyses and position stands first; single small studies only when nothing better exists.

## Architecture

```text
┌──────────────┐  login, profile, logs  ┌──────────────────────────┐
│  Mobile app  │ ─────────────────────► │ Firebase Auth +          │
│  (Expo, TS)  │ ◄───────────────────── │ Cloud Firestore          │
│              │  plan, "Why this?"     │ users · evidence ·       │
└──────┬───────┘                        │ exercises                │
       │ generatePlan(profile)          └──────▲─────────▲─────────┘
       ▼                                       │ catalog │ save plan
┌──────────────────────────────┐   prompt   ┌──┴─────────┴┐
│ Server function generatePlan │ ─────────► │     LLM     │
│ • holds the API key          │ ◄───────── │ (JSON mode) │
│ • sends only catalog         │   JSON     └─────────────┘
│   exercises                  │
│ • validates the JSON schema  │
│ • rejects unknown exercises  │
│ • removes declared allergens │
└──────────────────────────────┘

data/evidence/*.json ──(pull request + GitHub Actions validation)──► seed script ──► Firestore
```

The app **never** calls the AI directly. The server function holds the key, builds the prompt from the user's profile and the evidence-backed catalog, validates the answer, and only then saves it.

The calorie target comes from our own formula. The AI only arranges foods and exercises around it.

### Firestore data model (first draft)

```text
users/{uid}
  profile: { age, heightCm, weightKg, sex, goal, activityLevel, trainingDays, allergies[] }
  calorieTarget: number
  consentAt: timestamp
users/{uid}/plans/{planId}
  createdAt, week: [{ day, exerciseIds[], sets, reps }], meals: [...]
users/{uid}/logs/{logId}
  date, type: "workout" | "weight", value
exercises/{exerciseId}          (read-only for users)
  name, muscleGroups[], equipment, level, howTo, evidenceIds[]
evidence/{evidenceId}           (read-only for users)
  title, authors, year, journal, doi, studyType, population, finding, tags[]
```

Security rules: each user reads and writes only their own `users/{uid}` tree; `exercises` and `evidence` are read-only from the app.

### Open question

Cloud Functions need Firebase's pay-as-you-go plan (a card on file, with a free quota). If the team can't use it, a small free server (for example Node on Render) plays the same role.

## Responsible AI, health and privacy

Weight, allergies and fitness goals are health data under the GDPR, so we collect the minimum and treat AI output as a suggestion, never as advice.

- **Evidence first:** the AI can only choose evidence-backed exercises from our catalog; unknown exercises are rejected.
- **Not medical advice:** disclaimer on first launch and on every plan.
- **Safety limits in code:** calorie targets never go below a safe floor; extreme goals are refused.
- **Allergies:** checked twice, in the prompt and again after the response.
- **Privacy:** explicit consent at sign-up, nothing sold or shared, per-user Firestore rules, and a "delete my account and data" option.
- **Secrets:** API keys only in server environment variables; `.env` is ignored by Git; secret scanning is on.

## Understanding the whole app

We use AI tools to help us build Gofio. That is allowed, but at the defense **any member may be asked about any part of the app**. These habits make sure nobody ships code they can't explain:

1. **Explain it in the pull request.** Every PR has a "How it works" section in the author's own words, and an "AI assistance" section saying what was generated and how it was checked.
2. **The reviewer asks one question.** Before approving, the reviewer asks at least one "why" or "what happens if" question in the PR. The author answers it in writing.
3. **Decisions are written down.** Important choices (library, data model, prompt design) get a short note in `docs/decisions/`: the options, what we chose and why.
4. **Weekly explain-back.** 15 minutes a week: each member explains, in English, a part of the app they did *not* build.

## Roles

Each member owns one area and reviews another, so everyone can answer questions on two parts of the project.

| Role | Owns | Reviews |
| --- | --- | --- |
| Mobile UI lead | Screens, navigation, charts | AI integration |
| AI integration lead | Server function, prompt, JSON validation | Evidence library |
| Evidence and data lead | Evidence library, exercise catalog, Firestore model and rules | Mobile UI |
| DevOps / Git lead | Repo, branch protection, GitHub Actions, releases | All PRs as second reviewer |
| Product and defense lead | Use cases, issues board, README, slides, rehearsals | Docs PRs |

## Phases

1. **Setup:** repository, branch protection, CI, Expo skeleton, Firebase project, use cases.
2. **MVP build:** profile, evidence library, plan generation, progress logging. Tag `v0.1.0` at the first working demo.
3. **Hardening:** validation, safety limits, tests, bug fixes.
4. **Freeze and rehearse:** tag `v1.0.0`, record the backup demo video, rehearse the defense.

Dates depend on the defense date, which is still to be confirmed.
