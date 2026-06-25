# Git Commit Message Skill

Generate a conventional commit message from staged changes and commit.

**Trigger:** when the user says "write a commit message", "generate a commit", "commit my changes", or runs `/commit-msg`.

## Workflow

1. **Check for staged changes**
   Run `git diff --staged --stat`. If the output is empty, stop and tell the user nothing is staged — they need to `git add` first.

2. **Read the full staged diff**
   Run `git diff --staged` to understand exactly what changed.

3. **Generate the commit message** using this format:

   ```
   type(scope): short subject
   
   - bullet of what changed
   - bullet of why / motivation
   ```

   **Types:** `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`

   **Rules:**
   - Subject line must be under 60 characters
   - `scope` is the area of code changed (e.g. `home`, `CoinCard`, `hooks`) — omit if the change spans many areas
   - Body bullets are optional for trivial changes; include them when the why isn't obvious from the subject
   - Do not add a co-authored-by trailer — the user will handle attribution

4. **Show the message to the user** before committing so they can confirm or adjust it.

5. **Run the commit**
   ```
   git commit -m "type(scope): subject" -m "- bullet one\n- bullet two"
   ```
   Use two `-m` flags so git formats the subject and body with the correct blank-line separator.
