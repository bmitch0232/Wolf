# Wolf Golf Tracker

A free, mobile-friendly web app for tracking Wolf golf game scores.

## Features
- Track players, rounds, and points per hole
- Running point totals update as you type
- Vertical scorecard — no left/right scrolling
- Saves data locally in your browser (localStorage)
- Works on mobile and desktop
- Dark mode support

## How to use

### Option 1 — GitHub Pages (free hosting)
1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to **main branch / root**
4. Your app will be live at `https://yourusername.github.io/your-repo-name`

### Option 2 — Open locally
Just open `index.html` directly in any browser. No server needed.

## Data storage
All data is saved to `localStorage` in the browser. This means:
- Data persists between visits on the **same device & browser**
- Data does **not** sync across multiple devices

If you want multi-device sync, consider connecting a backend like Firebase Firestore (free tier).

## Files
```
index.html   ← the entire app (single file, no dependencies)
README.md    ← this file
```

## License
Free to use and modify.
