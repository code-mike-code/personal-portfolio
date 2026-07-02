# Personal Portfolio (Code Mike)

Personal portfolio website built with React — scroll-driven project showcase, GitHub repositories, about section with photo gallery, and a contact form.

## Sections

*   **Hero** — animated headline with a subtle orbit graphic element.
*   **Selected Work** — GSAP-pinned, scroll-driven showcase of client projects (video/placeholder media, live links, details modal), "What makes my work different" block, and section closure.
*   **GitHub** — pinned repositories rendered as physics-driven bouncing orbs (elastic collisions, size pulse, collision edge glow) linking to the repos.
*   **About** — bio, personal interests, and a masonry photo gallery with hover captions.
*   **Contact** — EmailJS-powered contact form.

## Technologies Used

*   **React 18** — core UI library (HashRouter for routing).
*   **GSAP + ScrollTrigger** — scroll-driven and pinned animations.
*   **Lenis** — smooth scrolling.
*   **Webpack 5 / Babel** — bundling and transpilation.
*   **Jest** — component testing.
*   **ESLint** — code quality.
*   **CSS + CSS Modules** — styling (ecru palette, page grid lines, coral `#d96a55` / teal `#2b9dad` accents).
*   **EmailJS** — contact form submissions.
*   **Google Analytics 4** — consent-gated analytics (see below).

## Google Analytics

GA4 is integrated with privacy-first defaults:

*   The gtag script is **loaded only after the user accepts cookies** in the consent modal (`CookieConsentModal`). Consent choice (`accepted`/`declined`) is stored in `localStorage`.
*   On repeat visits GA initializes automatically only if consent was previously accepted.
*   `anonymize_ip` is enabled.
*   The Measurement ID comes from the `REACT_APP_GA_MEASUREMENT_ID` env variable — no ID configured (e.g. local dev) means GA is never loaded.

Implementation: `src/utils/analytics.js` (loader) + wiring in `src/App.jsx`.

## Security Note

The GitHub section fetches pinned repositories via the GitHub GraphQL API using a token from `src/components/Projects/github.secret.js`. This file is **gitignored**, but any token bundled into a client-side app is extractable by visitors. Use a fine-grained token with **read-only, public-repo scope only**, or better — proxy the request through a serverless function (Vercel/Netlify) so no token ships in the browser. `mock-repos.js` is available as a token-free fallback.

## Getting Started

### Prerequisites

[Node.js](https://nodejs.org/) 14+ and npm.

### Installation

1.  Clone the repository:
    ```sh
    git clone <YOUR_REPOSITORY_URL>
    ```
2.  Navigate to the project directory:
    ```sh
    cd personal-portfolio
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```
4.  **Configure environment variables:**
    ```sh
    cp .env.example .env
    ```
    Then edit `.env`:
    ```env
    # EmailJS (required for the contact form)
    REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
    REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
    REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here

    # GitHub (optional, for the GitHub section)
    REACT_APP_GITHUB_USERNAME=your_github_username
    REACT_APP_GITHUB_TOKEN=your_github_token_here

    # Google Analytics 4 (optional, loaded only after cookie consent)
    REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
    ```
    **EmailJS credentials:** sign up at [EmailJS](https://www.emailjs.com/), create a service and a template, copy the Service ID, Template ID and Public Key.

    **Note:** `.env` is gitignored and will not be committed.

### Running the Project

Development server (usually `http://localhost:8080`):
```sh
npm start
```

### Building the Project

Optimized production build in `dist/`:
```sh
npm run build
```

### Code Quality

```sh
npm run lint      # ESLint check
npm run lint:fix  # auto-fix
npm test          # Jest tests
```

## Troubleshooting

**Contact form not working:**
- Ensure `.env` exists with valid EmailJS credentials.
- Check the browser console for missing env variable errors.

**Analytics not reporting:**
- GA loads only after accepting cookies and only when `REACT_APP_GA_MEASUREMENT_ID` is set at build time.

**Build errors:**
- Delete `node_modules` and `package-lock.json`, then `npm install` again.
- Restart the dev server after changing `webpack.config.js` or `.env`.

## Project Structure

```
/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── AboutMe/        # Bio, interests, photo gallery
│   │   ├── Banner/         # Tech banner
│   │   ├── Contact/        # Contact form (EmailJS)
│   │   ├── Header/         # Header + bottom nav
│   │   ├── Hero/           # Hero with orbit element
│   │   ├── PrivateProjects/# Selected Work showcase (GSAP pinned)
│   │   ├── Projects/       # GitHub section (physics orbs)
│   │   └── common/         # Button, ScrollReveal, CookieConsentModal, ...
│   ├── assets/             # Images (webp) and videos
│   ├── styles/             # Global styles (grid lines, palette)
│   ├── utils/
│   │   └── analytics.js    # Consent-gated GA4 loader
│   ├── App.jsx             # Main app component
│   └── index.js            # Entry point
├── .env.example            # Env template
├── package.json
└── webpack.config.js
```
