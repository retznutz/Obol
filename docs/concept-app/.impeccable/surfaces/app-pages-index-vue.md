---
version: 1
slug: "app-pages-index-vue"
primary_target: "app/pages/index.vue"
related_targets: []
---

# Home screen

## Scope

The first screen after boot, at `app/pages/index.vue`. Mode: Operate. Viewed on a TV at 1920 x 1080 from the couch; driven by keyboard and gamepad.

## Task

Pick a system, then pick a game from that system's list; the highlighted game shows a video and a description. This build covers the full-library state only, with synthetic library data and sample clips; launching a game is a stub.

## Chosen structure

Owner-pinned, in two steps: first the mosaic was taking most of the room, so the screen became three columns (systems, game list, preview); then the owner asked for the mosaic back as the systems column, made wider by narrowing the game list, and for no large system title at the top.

## Direction contract

THESIS: The whole library at a glance and the chosen game in motion, side by side: systems as a weighted mosaic, the highlighted game as a moving picture with its story. Refuses a wall of equal system cards and a list that only shows names.

OWN-WORLD: Banked Ash ground. Systems are square-cut Ash Panel tiles sized by library; the current system is the one oxblood tile, with the striped sun risen into it, split by the 8px slot. Game rows are square-cut on ground, raised to Raised Ash when selected. Outfit for names, JetBrains Mono only for numerals. Gilt Gold only on the focus ring. No shadows, no radius but discs.

STORY: A guest sees every system at once, moves to one, steps right into its games, scrolls the list and watches each highlighted game play in the preview with its description, then confirms to play.

FIRST VIEWPORT: Top safe edge: reversed logo and library totals left, clock right; no system title. Mosaic at x 96 to 584, y 140 to 932: nine system tiles weighted by game count, 16px apart, the largest top left. List at x 616 to 1016: a window of eight whole game rows (54 x 72 thumb, title, year and genre) with room for the focus ring on both sides, a scroll track and an "N of M" line. Preview at x 1048 to 1824: 4:3 video, title at 44px, year, genre, players and play time, three-line description. Bottom safe edge: hint bar for the last-used device.

FORM: Owner-pinned mosaic, list and preview (the dealt Library mosaic, restored beside a game list and preview); seed:50969b501cb814b5. Signature interaction: the current system's tile turns oxblood with its sun risen, and moving through the list swaps the preview video after a short dwell.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Open decisions

- Real video and box art sources (scraper) are undecided; the build ships labeled sample clips and palette placeholder art.
- Long libraries (hundreds of games) will need list virtualisation and letter jumps.
