# Gofio

**Fuel. Train. Track.** An AI-powered fitness and nutrition app built with React Native (Expo) and Firebase.

Team project for *Professional Skills for Engineers (HPI)*, Degree in Data Science and Engineering (GCID), ULPGC.

> **Why "Gofio"?** Gofio is the toasted-grain flour that has fuelled Canarian farmers and fishermen for centuries.
> Our app does the same job for your training: the right fuel and the right plan.

## What the app does

Gofio turns a user's profile into a weekly training routine and a daily meal plan, then lets them log workouts and weight.
Every exercise in a plan comes from our **evidence library**, a curated set of scientific studies, so the app can always answer *"why this exercise?"*.

| # | Screen | What the user does |
| --- | --- | --- |
| 1 | Welcome and login | Creates an account or logs in, and accepts the health-data notice |
| 2 | Profile | Enters age, height, weight, goal, allergies and training days |
| 3 | Plan | Sees the weekly routine and today's meals as cards; taps an exercise to see the study behind it |
| 4 | Log | Marks a workout as done and records today's weight |
| 5 | Progress | Sees the weight-over-time chart and the week's summary |

The full scope, architecture and safety rules are in [docs/PROJECT.md](docs/PROJECT.md).

## Tech stack

| Layer | Choice |
| --- | --- |
| Mobile app | React Native + Expo, TypeScript |
| Login and data | Firebase Auth + Cloud Firestore |
| AI | A server function (`generatePlan`) that calls the LLM; the API key never ships in the app |
| Evidence library | Curated scientific articles in Firestore; the AI may only pick exercises backed by them |
| Calorie target | Mifflin-St Jeor formula, computed in our own code |
| CI | GitHub Actions: type check, lint and tests on every pull request |

## Team

| Member | Role |
| --- | --- |
| Sergio Alejandro Medina Ospina | DevOps / Git lead |
| Laura Chevarría Saravia | _to be assigned_ |
| Daniel Betancor Andueza | _to be assigned_ |
| Álvaro Ginés Gómez | _to be assigned_ |
| Yousef Ahmed Kassem | _to be assigned_ |

## Getting started

New to the team? Start with **[docs/ONBOARDING.md](docs/ONBOARDING.md)**. It takes you from zero to your first pull request.

Quick version, once Git and Node.js are installed:

```bash
git clone https://github.com/medinasergio07/gofio-app.git
cd gofio-app
npm install
npx expo start
```

Scan the QR code with **Expo Go** on your phone to run the app.

## How we work

Read [CONTRIBUTING.md](CONTRIBUTING.md) before your first commit. In short:

1. Every change starts as an **issue**.
2. Every issue gets its own **branch** from `main`.
3. Every branch reaches `main` only through a reviewed **pull request**.
4. `main` must always compile.

## Documentation

| Document | Read it when |
| --- | --- |
| [docs/ONBOARDING.md](docs/ONBOARDING.md) | You are setting up your computer or making your first contribution |
| [CONTRIBUTING.md](CONTRIBUTING.md) | You need the Git workflow, branch names or commit rules |
| [docs/PROJECT.md](docs/PROJECT.md) | You need the scope, architecture, roles or phases |
| docs/USE-CASES.md (issue #11) | You need to know exactly what the app must do |
| [docs/DEFENSE.md](docs/DEFENSE.md) | We prepare the final defense in English |
| [docs/first-issues.md](docs/first-issues.md) | You want to know who does what first |
| [CHANGELOG.md](CHANGELOG.md) | You want to see what changed in each release |

## Disclaimer

Gofio gives general fitness and nutrition suggestions. It is **not medical advice**. Anyone with a medical condition should consult a professional.
