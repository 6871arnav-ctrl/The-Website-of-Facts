# Adding Facts to TWoF

## Easiest workflow

1. Open `tools/fact-editor.html` locally.
2. Enter a fact and its source.
3. Import your current `data/facts.json` if it already contains facts.
4. Add the new fact.
5. Export `facts.json`.
6. Replace `data/facts.json` in the repository.
7. Commit and push to GitHub.
8. GitHub Pages publishes the updated site.

## Important

The editor is deliberately local and does not store GitHub credentials.

Do not place a GitHub personal access token in `fact-editor.html`, `app.js`, or any other public file.

## Future upgrade

If direct publishing becomes desirable, use an authenticated server/serverless function or a trusted CMS. Keep repository credentials on the server side.
