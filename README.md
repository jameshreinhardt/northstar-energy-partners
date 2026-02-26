# Northstar Energy Partners

Modern one-page marketing site built with **Next.js 14** (App Router) and **Tailwind CSS**.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

**Note:** If the project lives in a path that contains an exclamation mark (e.g. `Move it!`), Webpack may fail. To build, run from a directory whose path does not include `!`, for example:

```bash
cp -r northstar-next ~/Desktop/northstar-next && cd ~/Desktop/northstar-next && npm run build
```

Or move the `northstar-next` folder to a path without special characters, then run `npm run build` and `npm start`.

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript
- Fade-in on scroll (Intersection Observer)
- Responsive, sticky nav, smooth scroll to contact
