# Contributing to Gofio

This guide is the team's single way of working with Git and GitHub. New here? Do [docs/ONBOARDING.md](docs/ONBOARDING.md) first. It follows the commands taught in the HPI Git unit.

## Golden rules

1. **`main` never contains code that does not compile.** Functional bugs are acceptable; compilation errors are not. CI checks this on every pull request.
2. **Nobody pushes directly to `main`.** Changes arrive only through pull requests with at least one approval.
3. **One issue, one branch, one pull request.**
4. **Never rewrite shared history.** To undo something already on `main`, use `git revert`, never `git reset`.
5. **Never commit secrets.** API keys go in `.env` files, which are ignored by Git.

## 1. First-time setup (once per computer)

```bash
git config --global user.name "Your Name"
git config --global user.email "your-github-email@example.com"
git clone https://github.com/medinasergio07/gofio-app.git
cd gofio-app
```

Use the same email as your GitHub account, so your commits count as yours.

## 2. Start work on an issue

Always start from an up-to-date `main`:

```bash
git switch main
git pull origin main
git switch -c feature/12-weight-chart
```

### Branch names

`<type>/<issue-number>-<short-name>`

| Type | Use for |
| --- | --- |
| `feature/` | New functionality |
| `fix/` | Bug fixes |
| `docs/` | Documentation only |
| `chore/` | Setup, configuration, dependencies |

## 3. Commit your changes

```bash
git status
git add src/screens/ProgressScreen.tsx
git commit -m "feat(progress): add weight chart (#12)"
```

Staged something by mistake? `git restore --staged <file>` takes it out of the Staging Area without losing your changes.

### Commit messages (Conventional Commits, in English)

`<type>(<scope>): <what changed> (#issue)`

| Type | Meaning |
| --- | --- |
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `refactor` | Code change that is neither a fix nor a feature |
| `test` | Adding or fixing tests |
| `chore` | Configuration, dependencies, tooling |

Good: `fix(auth): show error when password is too short (#18)`
Bad: `changes`, `fix stuff`, `asdf`

Keep commits small and focused: one logical change per commit.

## 4. Keep your branch up to date

Before opening a pull request, bring in the latest `main` with a rebase so your commits sit on top of it:

```bash
git fetch origin
git rebase origin/main
```

If there are conflicts, Git stops and marks the files. Fix them, then:

```bash
git add <fixed-file>
git rebase --continue
```

After a rebase, push your **own feature branch** with:

```bash
git push --force-with-lease origin feature/12-weight-chart
```

Only ever force-push your own feature branch, never `main`.

## 5. Open a pull request

```bash
git push -u origin feature/12-weight-chart
```

On GitHub, open a pull request into `main`, fill in the template, and write `Closes #12` so the issue closes on merge.

## 6. Review

- Every pull request needs **one approval** from another member.
- Reviewers check: does it compile, does it do what the issue asks, is it readable?
- Before approving, ask the author **at least one "why" or "what happens if" question** in the PR. The author answers in writing. These answers are our defense preparation.
- Leave comments in English. Ask questions; suggest, don't just demand.
- The author fixes comments with new commits on the same branch.

## 7. Merge

When CI passes and the PR is approved, the author merges it with **"Create a merge commit"**, so the branch stays visible in the history graph. Then delete the branch:

```bash
git switch main
git pull origin main
git branch -d feature/12-weight-chart
```

## 8. Undoing things

| Situation | Command |
| --- | --- |
| Discard unsaved changes in a file | `git restore <file>` |
| Unstage a file | `git restore --staged <file>` |
| Undo your last local commit (not pushed yet) | `git reset --soft HEAD~1` |
| Undo a commit already on `main` | `git revert <commit>` (through a PR) |
| Bring one commit from another branch | `git cherry-pick <commit>` |

## 9. Releases

Important versions are marked with tags on `main`. Before tagging, move the `[Unreleased]` entries in [CHANGELOG.md](CHANGELOG.md) under the new version (through a normal PR).

```bash
git switch main
git pull origin main
git tag v0.1.0
git push origin v0.1.0
```

Planned: `v0.1.0` first working demo, `v1.0.0` defense build.

## 10. Merge conflicts

Conflicts are normal. When one happens:

1. Resolve it locally and make sure the app still compiles.
2. Explain in the pull request what clashed and how you solved it.
3. Add the label `conflict-resolved` to the PR, so we can find good examples for the defense.

## 11. Using AI tools

AI tools are allowed and useful. The rule is simple: **you only commit what you can explain.**

- Fill in the **AI assistance** section of the PR: what was generated and how you checked it.
- Run the code, read the relevant docs, and add a test when the logic matters (formulas, validation).
- Never paste API keys, personal data or other people's data into an AI tool.
- Never add a scientific reference you haven't opened yourself. AI tools invent plausible-looking citations. Every study in `data/evidence/` needs a DOI that resolves.
- Important design decisions go in `docs/decisions/` as a short note: options, choice, reason.
