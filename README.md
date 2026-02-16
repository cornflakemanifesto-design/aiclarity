# AI Clarity

AI Concierge Service — helping solopreneurs and creative professionals navigate the world of AI.

## Local Development

```bash
npm install
npm start
```

Visit `http://localhost:3000`

## Admin Panel

Click the ⚙ gear icon (bottom-right) to open the admin panel.

**Default password:** `aiclarity2026`

Change this in the admin panel under **Design → Security**.

## Deploy to Render

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Deploy

## API Endpoints

- `GET /api/content` — Get saved CMS content
- `POST /api/content` — Save CMS content
- `POST /api/contact` — Submit contact form
- `GET /api/contacts` — Get contact submissions (for admin)

## Features

### Easter Egg Landing Page

The root URL (`/`) displays an interactive landing page with a playful "click here" experience that reveals a surprise before redirecting to the main site at `/home`.

## Project Structure

```
├── server.js          # Express server + API routes
├── package.json
├── public/
│   ├── index.html     # Full site + admin CMS
│   ├── landing.html   # Easter egg landing page
│   └── haley.jpg      # Easter egg reveal image
├── data/              # Auto-created, stores JSON data
│   ├── content.json   # CMS content (gitignored)
│   └── contacts.json  # Form submissions (gitignored)
└── .gitignore
```
