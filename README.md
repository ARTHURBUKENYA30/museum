# UPPC Print Heritage Museum Website

## Files
- `index.html`, `about.html`, `collections.html`, `exhibitions.html`, `visit.html`, `programs.html`, `news.html`, `support.html`, `contact.html`: individual website pages.
- `style.css`: the one shared stylesheet, including the Uganda flag palette and responsive layouts.
- `script.js`: the one shared JavaScript file for the mobile menu, current year, and contact form helper.
- `images/`: image and icon assets retained from the supplied website archive.

## Preview locally
Open `index.html` in a modern browser. No build tools or package installation are required.

## Editing guide
- Change the national-colour palette in the `:root` block near the top of `style.css`.
- Edit page content in the relevant HTML file.
- Site-wide navigation and footer links are repeated in each HTML page so the pages work as plain static files.
- Shared interactive behaviour is documented in `script.js`.
- Code is grouped with explanatory comments to make maintenance easier.

## Important production notes
- The contact form is a static front-end helper. It prepares an email draft and does not send messages from a server. Confirm the correct recipient address and connect a reliable backend/form service before launch.
- The UPPCFC footer URL was supplied as `www.govinfohub`; it is linked as `https://www.govinfohub/`. Please verify that this is the intended destination before publishing.
- The history entries and leadership details were supplied in the request and have been placed on the timeline. Verify historical claims, names, titles and dates with the museum before public release.
