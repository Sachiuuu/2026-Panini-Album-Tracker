# Panini 2026 Tracker

Track your **FIFA World Cup 2026** sticker album (USA · Mexico · Canada).  
Mark stickers as you collect them, filter what's missing, search by country or code, and export your progress to use on another device.

## Live Web App

**[worldcup2026tracker.netlify.app](https://worldcup2026tracker.netlify.app)**

Open it on any phone browser and tap **Add to Home Screen** to install it like a native app.

## Features

- Mark and unmark stickers with a tap — progress is saved locally on your device
- Browse the full album in order: special cards → stadiums → Groups A–L
- Filter by **All / Have / Missing** in every section and team page
- Search stickers by country name or code (e.g. `MEX5`, `STA3`)
- Dashboard with collected / missing count, emblems, team photos, and top / bottom 5 rankings
- Export your progress as a `.json` file and import it on another device
- Available in Spanish, English, and French
- Works on iOS, Android, and the web

## Running Locally

**Prerequisites:** Node 18+, [Expo Go](https://expo.dev/client) on your phone (optional).

```bash
git clone https://github.com/Sachiuuu/2026-Panini-Album-Tracker.git
cd 2026-Panini-Album-Tracker
npm install
```

Start the development server:

```bash
npm start        # iOS / Android via Expo Go
npm run web      # Web — opens at localhost:8081
```

## Building the Web Version

```bash
npx expo export --platform web --clear
```

Output goes to `dist/`. Drag that folder to [Netlify](https://netlify.com) to deploy.

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Expo SDK 54 + expo-router v6 |
| UI | React Native + React Native Web |
| State | Zustand 5 (persisted with AsyncStorage) |
| Language | TypeScript |

## Album Data

Sticker counts and group assignments match the official Panini FIFA World Cup 2026 album.  
Two playoff spots are marked `TBD` until the intercontinental play-offs are decided.

## License

MIT
