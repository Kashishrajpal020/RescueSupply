# RescueSupply 🌿

A premium, responsive food-rescue web app built with React + Vite.

**Flow:** Restaurant → Food Donation → Live Map → NGO/Volunteer → Pickup → Community → Impact.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Enabling the real Google Map (optional)

The app works great out of the box with a custom fallback map — no setup
required. To switch to a real Google Map:

1. Get an API key at the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis).
2. Copy `.env.example` to `.env`.
3. Add your key:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_key_here
   ```
4. Restart `npm run dev`.

`src/components/MapView.jsx` automatically detects the key and swaps in the
real `@react-google-maps/api` map — every other page keeps working exactly
the same way. Never commit a real key to source control.

## Project structure

```text
src/
├── components/       Reusable UI pieces (Navbar, Footer, cards, MapView…)
├── pages/            One file per route (Home, MapPage, DonateFood…)
├── data/             Mock donation data used as the prototype's "database"
├── context/          DonationsContext — shared React state for the whole app
├── App.jsx           Route definitions + shared layout
├── main.jsx          React + Router entry point
└── index.css         Design tokens and all component styles
```

## How the demo flow works

1. A restaurant fills out **Donate Food** — the new donation is added to
   shared state via `DonationsContext`.
2. It instantly appears in **Available Food** and as a new pin on the
   **Live Map**.
3. An NGO/volunteer clicks **Accept Pickup** — status moves from
   `Available` → `Pickup Pending`.
4. On **My Rescues**, they advance the status through `Picked Up` →
   `Rescued` using the interactive timeline.
5. **Impact** updates live: meals rescued, people served and successful
   pickups all reflect the current state.

Everything runs on frontend React state — no backend required for the prototype.

## Design system

Colors, radii, shadows and type scale are defined once as CSS variables in
`src/index.css` (see the `:root` block) so the whole app stays visually
consistent. Headings use **Manrope**, body text uses **Inter**.
