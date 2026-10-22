# Campus Lost & Found

## Requirements
Install Node.js (LTS version).

## Setup
Open a terminal in this folder and run:

```bash
npm install
npm start
```

Then open http://localhost:3000 in your browser.

## API
- `GET /api/items` returns a JSON array of reports.
- `POST /api/items` accepts JSON with `title`, `description`, `location`, `type`, `date`, and `contact`.
- Successful POST returns `{ "item": { ... } }`, matching the frontend's `result.item` handling.

Reports are stored in `data/items.json`. This JSON-file storage is suitable for a demo, not a production deployment.
