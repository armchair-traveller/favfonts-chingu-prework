# Favorite Fonts

- Attempts to fulfill [basic requirements for tier 2 favfonts](https://github.com/chingu-voyages/voyage-prework-tier2-favfonts) (no extras)
- Vanilla JavaScript. No React, Sass, or other framework/library. In terms of APIs, only browser APIs and the Google Fonts API were used.

## JavaScript quick overview

- Basic fetch from Google Fonts API, `.then` queued functions are solely for creating cards using `Card` class.
  - Card creation is handled w/ `Card` class --- card element creation / DOM manipulation is also handled, with inline styling for some basic transitions/visibility.
- `FontFace` browser API used for adding, loading fonts, and avoiding FOUT.
- `IntersectionObserver` browser API used for handling back to top button visibility and loading cards (a form of lazy loading).

## Resources

- Uses [Feather](https://feathericons.com/) for icons
  - Exception: CSS + Arial font for back to top, font size dropdown, and font card (add)  buttons