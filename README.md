# 🐺 Wolf Golf Tracker

A free, browser-based app to track your Wolf golf game — players, rounds, and points per hole. Data saves automatically in your browser with no account or server required.

## Features

- **Player Roster** — Add and manage players across all rounds
- **Rounds** — Create rounds with a name, date, and selected players
- **Points Scorecard** — Enter points per player per hole (supports negatives), scroll vertically only
- **Live Leaderboard** — Updates instantly as you enter points
- **Export to CSV** — Download any round as a CSV to open in Google Sheets or Excel
- **Auto-save** — All data persists in your browser's localStorage

---

## Getting Started (Run Locally)

### Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

### Install & Run

```bash
# 1. Clone or download this repo
git clone https://github.com/YOUR_USERNAME/wolf-golf-tracker.git
cd wolf-golf-tracker

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

---

## Deploy to GitHub Pages (Free Hosting)

This lets anyone on your group access the app from a public URL for free.

### Step 1 — Push to GitHub

1. Create a new repo at [github.com/new](https://github.com/new) named `wolf-golf-tracker`
2. Push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wolf-golf-tracker.git
git push -u origin main
```

### Step 2 — Update `package.json` homepage

Open `package.json` and update the `homepage` field with your actual GitHub username:

```json
"homepage": "https://YOUR_USERNAME.github.io/wolf-golf-tracker"
```

### Step 3 — Deploy

```bash
npm run deploy
```

This builds the app and pushes it to a `gh-pages` branch automatically.

### Step 4 — Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select the `gh-pages` branch
4. Click **Save**

Your app will be live at:
```
https://YOUR_USERNAME.github.io/wolf-golf-tracker
```

It may take 1–2 minutes to go live the first time.

---

## Saving Data to Google Sheets

Each round has a **CSV Export** button. After a round:

1. Click **↓ Export CSV** on the scorecard or round list
2. Open [Google Sheets](https://sheets.google.com)
3. **File → Import → Upload** your CSV file

---

## Project Structure

```
wolf-golf-tracker/
├── public/
│   └── index.html          # HTML entry point
├── src/
│   ├── index.js            # React entry point
│   └── App.js              # Main app (all components + styles)
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Data Storage

All data is stored in your browser's **localStorage** under the key `wolf-golf-tracker`. This means:

- Data persists between sessions on the same browser/device
- Data does **not** sync between devices automatically
- Clearing browser data will erase your rounds (use CSV export to back up)

---

## Tech Stack

- [React 18](https://react.dev/)
- Vanilla CSS (no UI framework)
- localStorage for persistence
- Google Fonts (Playfair Display, DM Mono, DM Sans)
