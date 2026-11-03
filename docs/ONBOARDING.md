# Onboarding: from zero to your first pull request

Welcome to the Gofio team. Follow these steps in order. It takes about 30 minutes.
If you get stuck, ask in the team group and paste the exact error message.

## 1. Accounts

1. Create a GitHub account at <https://github.com/signup> if you don't have one.
2. Send your GitHub **username** to Sergio.
3. Accept the invitation: you'll get an email, or open <https://github.com/medinasergio07/gofio-app/invitations>.

## 2. Install the tools

| Tool | Why | Get it |
| --- | --- | --- |
| Git | Version control | <https://git-scm.com/downloads> |
| Node.js 20 LTS | Runs Expo and the tooling | <https://nodejs.org> |
| VS Code (recommended) | Editor with a built-in Git panel | <https://code.visualstudio.com> |
| Expo Go (on your phone) | Runs the app without building it | App Store / Google Play |

Check that everything works:

```bash
git --version
node --version   # should print v20.x or newer
npm --version
```

## 3. Configure Git (once per computer)

Use the **same email as your GitHub account**, so your commits count as yours on the Insights page (the teacher checks it).

```bash
git config --global user.name "Your Name"
git config --global user.email "your-github-email@example.com"
git config --global init.defaultBranch main
```

## 4. Get the code

```bash
git clone https://github.com/medinasergio07/gofio-app.git
cd gofio-app
```

The first time you push, Git asks you to log in to GitHub. On Windows a browser window opens; accept it.
If it asks for a password, use a [personal access token](https://github.com/settings/tokens), not your GitHub password.

## 5. Run the app

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go. Your phone and computer must be on the same Wi-Fi.
On the university network, use `npx expo start --tunnel` if the QR code doesn't connect.

Before pushing, check that the code compiles exactly as CI will:

```bash
npm run typecheck
```

To add a library, always use `npx expo install <package>` (not `npm install`): it picks the version that matches our Expo SDK.

## 6. Your first contribution (practice run)

Do this once, with a tiny change, to learn the whole flow before touching real code.

1. On GitHub, open your assigned issue. Note its number, for example `#5`.
2. Create your branch from an up-to-date `main`:

   ```bash
   git switch main
   git pull origin main
   git switch -c docs/5-add-my-name
   ```

3. Edit `README.md`: put your role in the Team table (once roles are decided).
4. Commit:

   ```bash
   git status
   git add README.md
   git commit -m "docs(readme): add my role to the team table (#5)"
   ```

5. Push and open the pull request:

   ```bash
   git push -u origin docs/5-add-my-name
   ```

   GitHub prints a link. Open it, fill in the template, and write `Closes #5`.
6. Ask a teammate to review. When CI is green and you have one approval, click **Create a merge commit**.
7. Clean up:

   ```bash
   git switch main
   git pull origin main
   git branch -d docs/5-add-my-name
   ```

That's the loop for every task. The details, including rebasing and conflicts, are in [CONTRIBUTING.md](../CONTRIBUTING.md).

## 7. Team habits

- **Pull before you start, every time.** Most conflicts come from working on an old `main`.
- **Small pull requests.** One screen or one function per PR is easy to review.
- **Write in English** in commits, PRs, issues and code comments. It's practice for the defense.
- **Review within 24 hours** when someone asks you.
- **Never commit `.env`** or any key. If you do by accident, tell Sergio straight away: the key must be changed, deleting the file is not enough.
- **Move your card** on the Projects board: To do → In progress → In review → Done.

## Quick reference

| I want to… | Command |
| --- | --- |
| See what changed | `git status` |
| See the history graph | `git log --oneline --graph --all` |
| Get the latest `main` | `git switch main` then `git pull origin main` |
| Update my branch with `main` | `git fetch origin` then `git rebase origin/main` |
| Discard changes in a file | `git restore <file>` |
| Unstage a file | `git restore --staged <file>` |
| Undo my last commit (not pushed) | `git reset --soft HEAD~1` |
