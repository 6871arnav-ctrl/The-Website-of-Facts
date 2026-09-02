# TWoF Data Schema

`data/facts.json` is the content database used by the public website.

Minimum fact:

```json
{
  "id": "unique-id",
  "title": "A surprising title",
  "category": "physics",
  "summary": "A short explanation.",
  "explanation": "The core explanation."
}
```

Recommended full fact:

```json
{
  "id": "unique-id",
  "title": "A surprising title",
  "category": "physics",
  "topic": "Example topic",
  "tags": ["tag-one", "tag-two"],
  "summary": "The quick version.",
  "whySurprising": "Why a visitor might not expect this.",
  "explanation": "The evidence-based explanation.",
  "deepDive": "A deeper connection or context.",
  "sources": [
    {
      "title": "Source title",
      "url": "https://example.org/source"
    }
  ],
  "relatedFacts": ["another-fact-id"],
  "image": "",
  "imageCaption": ""
}
```

Allowed categories:

- `space`
- `history`
- `physics`
- `biology`
- `mathematics`
- `chemistry`

The website ignores optional fields it does not currently display, allowing the schema to grow without breaking older facts.
