# Commonwealth Motor Company — Website

A static, dependency-free multi-page website for Commonwealth Motor Company: warm ivory paper,
bronze and graphite panels, Cormorant Garamond display type over Manrope, hairline rules,
numbered stage blocks and quiet pull quotes.

There is no build step and no framework. Upload the folder to any static host and it runs.

## Run it

Open `index.html` directly, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000/>.

To publish, upload the whole folder to any static host (Netlify, GitHub Pages, S3, Cloudflare
Pages, plain nginx). No server-side runtime is required.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home |
| `commission.html` | The Commission |
| `design-philosophy.html` | Design Philosophy |
| `engineering-craftsmanship.html` | Engineering & Craftsmanship |
| `demonstrator.html` | The Demonstrator |
| `ownership.html` | Ownership |
| `begin-a-commission.html` | Begin a Commission |
| `privacy.html` | Privacy Policy |

Each page repeats the shared header and footer markup, so the site works from plain static hosting
with no templating, JavaScript injection, or build step. The header collapses to a menu button at
1180px.

## Structure

```
index.html … privacy.html              the eight pages
assets/
  favicon.svg
  css/
    site.css     tokens, base, layout, components and pages (one stylesheet)
  js/
    site.js      mobile navigation panel + enquiry form
```

### Editing the design

`assets/css/site.css` is the single source of truth, organised in labelled sections:

1. **Tokens** — palette, type, spacing and easing custom properties.
2. **Base** — reset, typography, utilities, page-enter motion.
3. **Header** — sticky bar, underlined nav links, mobile panel.
4. **Layout** — `.w` content width, `.band` panels, `.split` / `.hero` grids.
5. **Components** — buttons, media panels, pull quotes, pillars, stage lists,
   quiet lists, FAQ accordions, the "Continue" link, dark surfaces.
6. **Pages** — the sticky commission stage index, commission stage blocks, the enquiry form.
7. **Footer.**

**Palette** — Warm Ivory `#F3F0E8`, Dark Bronze `#514438`, Graphite `#30343A`,
Brushed Silver `#A7AAAB`, Muted Oxblood `#653B3D`, plus a warm panel tint `#E8E3D7`.

**Type** — Cormorant Garamond (display) and Manrope (sans), loaded from Google Fonts.
Both fall back to system serif/sans if the network is unavailable.

### Photography

Media slots are the `.ph` panels. Each currently holds a serif pull quote on a graphite or bronze
field. To use a real image, replace the panel's contents with an `<img>` or `<picture>` and keep
the surrounding grid column. The slots are marked with `<!-- Image slot -->` comments in the HTML.

## Before you go live

A short checklist of the remaining pieces:

1. **Connect the enquiry form.** The form on `begin-a-commission.html` currently validates in the
   browser and shows a confirmation — it does **not** yet send anywhere. Point it at your email
   service or CRM (e.g. Formspree, Netlify Forms, your own endpoint). There is a
   `<!-- Connect this form… -->` comment marking the spot.
2. **Add photography** to the `.ph` panels.
3. **Review `privacy.html`** against your final data practices once the form is connected.
4. **Add contact details** if you want them on the site — none are currently published.
5. **Replace `assets/favicon.svg`** if you have a final mark.
6. **Set your domain** — add canonical URLs and an Open Graph / social share image to each page's
   `<head>` once the live address is known.

## Accessibility & behaviour notes

- Semantic landmarks, one `h1` per page, visually-hidden skip link, visible focus states.
- The FAQ uses native `<details>`/`<summary>`, so it works without JavaScript.
- The mobile navigation is a JavaScript panel; a `<noscript>` style keeps the full nav visible if
  JavaScript is unavailable.
- The commission stage index is sticky under the header and updates the active stage on scroll
  (`aria-current="location"`); it is a plain anchor list, so it also works without JavaScript.
- Restrained motion (fade only) with full `prefers-reduced-motion` support.
- No horizontal overflow, tested from 320px to 1920px.
