---
name: Obol
description: Passage back to every game.
colors:
  struck-oxblood: "#961e1e"
  bone-on-oxblood: "#fdf3e6"
  sunrise-orange: "#fc6820"
  ash-on-orange: "#120c0b"
  gilt-gold: "#fea517"
  sun-band-1: "#aa2b1d"
  sun-band-2: "#df3c23"
  sun-band-3: "#fc6820"
  sun-band-4: "#fea517"
  sun-band-5: "#fdc459"
  banked-ash: "#120c0b"
  ash-panel: "#1c1413"
  raised-ash: "#2a1e1c"
  faint-seam: "#4a3632"
  die-edge: "#8a6b60"
  bone: "#f6ece1"
  worn-bone: "#bfa898"
  verdigris: "#6cc7e0"
  coral-warning: "#ff8a7a"
  night-scrim: "#120c0bd9"
typography:
  title:
    fontFamily: "Outfit, Segoe UI, system-ui, sans-serif"
    fontSize: "44px"
    fontWeight: 700
    lineHeight: "48px"
    letterSpacing: "-0.01em"
  headline-large:
    fontFamily: "Outfit, Segoe UI, system-ui, sans-serif"
    fontSize: "44px"
    fontWeight: 800
    lineHeight: "48px"
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Outfit, Segoe UI, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 800
    lineHeight: "32px"
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Outfit, Segoe UI, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: "32px"
  label:
    fontFamily: "Outfit, Segoe UI, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: "24px"
    letterSpacing: "0.01em"
  caption:
    fontFamily: "Outfit, Segoe UI, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: "22px"
    letterSpacing: "0.02em"
  glyph:
    fontFamily: "Outfit, Segoe UI, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1
  key:
    fontFamily: "Outfit, Segoe UI, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.02em"
  data:
    fontFamily: "JetBrains Mono, ui-monospace, Cascadia Mono, Menlo, monospace"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: "24px"
    fontFeature: "tnum"
rounded:
  none: "0px"
  sm: "4px"
  full: "9999px"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  space-6: "24px"
  space-8: "32px"
  space-12: "48px"
  safe-x: "96px"
  safe-y: "54px"
  slot: "8px"
  glyph: "36px"
  target-min: "56px"
components:
  system-tile:
    backgroundColor: "{colors.ash-panel}"
    textColor: "{colors.bone}"
    typography: "{typography.headline}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  system-tile-large:
    backgroundColor: "{colors.ash-panel}"
    textColor: "{colors.bone}"
    typography: "{typography.headline-large}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  system-tile-current:
    backgroundColor: "{colors.struck-oxblood}"
    textColor: "{colors.bone-on-oxblood}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  game-row:
    backgroundColor: "transparent"
    textColor: "{colors.worn-bone}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px"
    width: "372px"
    height: "92px"
  game-row-selected:
    backgroundColor: "{colors.raised-ash}"
    textColor: "{colors.bone}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px"
    width: "372px"
    height: "92px"
  game-art:
    rounded: "{rounded.none}"
    width: "54px"
    height: "72px"
  preview-frame:
    backgroundColor: "{colors.ash-panel}"
    rounded: "{rounded.none}"
    width: "776px"
    height: "582px"
  sample-label:
    backgroundColor: "{colors.banked-ash}"
    textColor: "{colors.worn-bone}"
    typography: "{typography.caption}"
    rounded: "{rounded.none}"
    padding: "0 8px"
    height: "30px"
  hint-key:
    backgroundColor: "{colors.raised-ash}"
    textColor: "{colors.bone}"
    typography: "{typography.key}"
    rounded: "{rounded.none}"
    padding: "0 12px"
    height: "36px"
  hint-key-confirm:
    backgroundColor: "{colors.sunrise-orange}"
    textColor: "{colors.ash-on-orange}"
    typography: "{typography.key}"
    rounded: "{rounded.none}"
    padding: "0 12px"
    height: "36px"
  controller-glyph:
    backgroundColor: "{colors.raised-ash}"
    textColor: "{colors.bone}"
    typography: "{typography.glyph}"
    rounded: "{rounded.full}"
    size: "36px"
  controller-glyph-confirm:
    backgroundColor: "{colors.sunrise-orange}"
    textColor: "{colors.ash-on-orange}"
    typography: "{typography.glyph}"
    rounded: "{rounded.full}"
    size: "36px"
  launch-overlay:
    backgroundColor: "{colors.night-scrim}"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
  launch-sheet:
    backgroundColor: "{colors.raised-ash}"
    textColor: "{colors.bone}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "48px"
    width: "720px"
  button-primary:
    backgroundColor: "{colors.sunrise-orange}"
    textColor: "{colors.ash-on-orange}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "56px"
  button-secondary:
    backgroundColor: "{colors.banked-ash}"
    textColor: "{colors.bone}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "56px"
  badge:
    backgroundColor: "{colors.banked-ash}"
    textColor: "{colors.worn-bone}"
    typography: "{typography.caption}"
    rounded: "{rounded.sm}"
    padding: "0 8px"
    height: "30px"
---

# Design System: Obol

## Overview

**Creative North Star: "The Coin for Passage"**

An obol was the small coin paid for passage across the river. Obol's interface is that coin: a small, heavy, well-made object that gets a person across to the game and asks for nothing else. It is struck, not drawn. Every form is either a square-cut slab or a perfect disc, taken directly from the wordmark's stems and bowls, and the one ornament the system allows is the logo's sun: five hard-edged bands from deep red to gold.

The mood is warm, heavy and quiet. The screen is a dark, warm near-black seen from the couch on a TV, and the chrome stays down in that dark so the games carry the colour: box art and a moving picture of the highlighted game. Weight comes from Outfit at 700 to 800 and from solid fills, not from noise. Components are refined and restrained: flat at rest, edged rather than boxed, and lit only when they hold focus. Depth is tonal, never shadowed.

Density is low and deliberate, sized for 1920 x 1080 at ten feet. At any moment exactly one element holds focus, and it is the most obviously lit thing on screen: a gold ring and a slight 1.03 rise. Everything else stays still, except the preview, which plays the highlighted game once the selection rests.

**Key Characteristics:**
- Dark-first (Banked Ash ground), with a light theme for handheld and desktop use.
- Two shapes only: square-cut slabs (0px) and full discs (9999px).
- The striped sun is the signature; its five bands always appear together, in order.
- Focus is a ring plus a gentle scale; nothing casts a shadow.
- Type sized for the couch: nothing below 16px.
- The game is the hero: systems sit in a mosaic weighted by game count, and the highlighted game gets the largest single area on screen.

## Colors

A warm, near-monochrome ash-and-bone base struck with one oxblood, lit by the five-band sun.

### Primary
- **Struck Oxblood** (#961e1e): the brand, the exact logo red. Used as a fill: the current system's tile in the mosaic, the slot cut through the sun on that tile, text selection. Never text on dark grounds (2.3:1); text on it is Bone on Oxblood (#fdf3e6, 7.6:1). In the light theme it also serves as the accent and the focus ring.

### Secondary
- **Sunrise Orange** (#fc6820): the dark theme's interactive accent: the confirm key or button in the hint bar, the primary button, the text caret. Labels on it are Ash on Orange (#120c0b, 6.6:1). In the light theme this role passes to Struck Oxblood.
- **Gilt Gold** (#fea517): the dark theme's focus ring (9.8:1 on Banked Ash). Its only other appearance is as band 4 inside the complete sun.

### Tertiary
- **Sun Bands 1 to 5** (#aa2b1d, #df3c23, #fc6820, #fea517, #fdc459): the logo's sun, exact. Used only together, in order, top to bottom, as hard-edged stripes: the sun risen in the current system's tile, the sun on the launch sheet, and in future a striped progress bar or loading mark.

### Neutral
- **Banked Ash** (#120c0b): the screen. The full-bleed ground behind the mosaic, the list and the preview; game rows sit straight on it at rest. Also a placeholder-art shape colour.
- **Ash Panel** (#1c1413): panels on the ground: system tiles at rest, and the preview frame behind its picture.
- **Raised Ash** (#2a1e1c): the selected game row, glyph discs and key slabs, menus, dialogs, the launch sheet. Also a placeholder-art shape colour.
- **Faint Seam** (#4a3632): decorative hairlines and the list's scroll track (under 3:1), and one placeholder-art ground.
- **Die Edge** (#8a6b60): any edge that defines a control or frame: the preview frame, placeholder thumbnails, the Sample clip label, glyph discs and key slabs, secondary buttons, badges; at least 3.3:1 on every ground. Also a placeholder-art colour.
- **Bone** (#f6ece1): primary text, glyph letters, the selected game's title. Also a placeholder-art colour.
- **Worn Bone** (#bfa898): metadata, totals, unselected game rows, tile game counts at rest, the scroll thumb and the "N of M" position line (7.1:1 or better on every ground). Also a placeholder-art ground.
- **Verdigris** (#6cc7e0): success and "verified" status, teal so it never depends on red-green discrimination. Always with a word.
- **Coral Warning** (#ff8a7a): errors that block play (missing BIOS, bad checksum). Always with a word.
- **Night Scrim** (#120c0b at 85%): dims the home screen behind the launch overlay, and a running game behind the pause menu. The hint bar stays above it.

### Light theme
Same names, light values: Banked Ash #f6efe6, Ash Panel #fffaf3, Raised Ash #ffffff, Faint Seam #d9c7b6, Die Edge #8f776a, Bone #2a1513, Worn Bone #6e5850, Verdigris #0f6a85, Coral Warning #b3261e, Night Scrim #2a1513 at 60%. Accent and focus become Struck Oxblood, with Bone on Oxblood labels. The brand and sun values do not change.

### Placeholder art
Until real box art arrives, each game's thumbnail is a 54 x 72 stand-in built from the palette: one flat ground and one flat shape (disc, horizon, pillars, eclipse, band, moon, stripes), framed by a 1px Die Edge inset edge so a thumbnail whose colours match the ground still holds its rectangle. The ground and shape pairs are Bone with Banked Ash, Die Edge with Banked Ash, Worn Bone with Raised Ash, Faint Seam with Bone, and Bone with Die Edge: bone, ash and die-edge tones only. Never Struck Oxblood, never the sun or a sun band, never Gilt Gold; those belong to the current system tile and the focus ring. Placeholders are marked synthetic in the data and real box art replaces them.

### Named Rules
**The Struck Once Rule.** Struck Oxblood is a fill, never body text on a dark ground. If it needs to read as words, it is the wrong colour.

**The Gilt Rule.** In the dark theme Gilt Gold means focus and only focus. Outside the ring it appears only as band 4 inside the complete sun, so the eye always finds where it is.

**The Five Bands Rule.** The sun bands appear together, in order 1 to 5, top to bottom, hard-edged. Never reorder, never blend, never use a single band as text or fill.

**The One Current Rule.** On the home screen, Struck Oxblood and the sun mark the current system; apart from text selection, no other tile, thumbnail or fill is oxblood. Placeholder art and every other tile stay in ash and bone, so the current system is the only red on the screen.

## Typography

**Display Font:** Outfit (with Segoe UI, system-ui)
**Body Font:** Outfit (with Segoe UI, system-ui)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, Cascadia Mono), tabular numerals

**Character:** One geometric sans whose round bowls echo the o, b and d of the wordmark, set heavy for names and plain for reading, beside a mono that is used only for numbers and file names.

### Hierarchy
- **Title** (700, 44px, 48px): a game's name in the preview and on the launch sheet; one line, ellipsis.
- **Headline Large** (800, 44px, 48px): a system's short name ("SNES") on the tiles of the larger half of the library by game count (at or above the median count).
- **Headline** (800, 28px, 32px): a system's short name on the tiles of the smaller half. Tile size class follows game count, not the tile's shape.
- **Body** (400, 22px, 32px): game descriptions and dialog copy; keep lines to about 62ch, and clamp descriptions to three lines.
- **Label** (600, 20px, 0.01em): game titles in the list, controller hints, buttons. Sentence case.
- **Caption** (500, 16px, 0.02em): metadata (year, genre, players, tile game counts, "N of M", the Sample clip label). The floor.
- **Glyph** (700, 18px) and **Key** (700, 16px, 0.02em): letters inside controller discs and key slabs.
- **Data** (JetBrains Mono 500, 18px, 24px, tabular): numerals (years, counts, play time, list position), the clock, file names. Inside a caption line, numerals keep the line's size or step up to 18px; their letter-spacing drops to 0.

The current system's full name ("Super Nintendo") is carried by a visually hidden h1 for screen readers; the home screen has no visible display-size heading.

### Named Rules
**The Couch Floor Rule.** Nothing is set below 16px. If it does not fit at 16px, cut words.

**The Honest Mono Rule.** JetBrains Mono is for numbers and file names a person might compare or type, and for the clock. Words beside a number stay in Outfit: in "10 games", "Played 3h 12m" and "1 of 10" only the numerals are mono, and a year is always mono. Never for flavour.

## Layout

The spatial model is a 1920 x 1080 canvas read from about ten feet, scaled as a whole to fit the screen. Everything readable or focusable sits inside the TV title-safe area, 96px from the left and right and 54px from the top and bottom; art and backgrounds may bleed past it.

The home screen is three columns under a top bar, with the hint bar on the bottom safe edge. All three columns start at y 140.
- **Top bar** (y 54, 48px tall): the reversed logo (40px tall) with the library totals beside it, 24px apart ("9 systems · 66 games", numerals in Data); the clock in Data at the right safe edge.
- **Systems mosaic** (x 96 to 584, y 140 to 932; a 488 x 792 frame): one tile per system, laid out as a squarified treemap weighted by game count, largest first. Each weight is floored at 6% of the library so a small system still gets a usable target. Tile edges that fall within 40px of each other are snapped to one shared seam so rows and columns line up; the frame's own edges never move. Tiles sit 16px apart, on whole pixels.
- **Game list** (x 616 to 1016, y 140 to 932): a window of exactly eight whole rows on a 100px pitch (92px rows, 8px apart), its bottom level with the mosaic. Rows are 372px wide, leaving room for a 4px scroll track on the column's right edge, inset 16px from the window's top and bottom and 32px clear of the preview. The track appears only when a system has more than eight games. The window's clip box reaches into the gutters (16px above and below, 12px left, 24px right) so the focused row's ring and scale are never cut off while the rows' own edges sit on the column lines. The "N of M" position line sits 12px below the window. The selected row scrolls to the nearest edge of the window: smoothly within a system, instantly when the system changes.
- **Game preview** (x 1048 to 1824, from y 140): a 4:3 screen (776 x 582), then the title 32px below, the meta line 8px below that, and the description 16px below.
- **Hint bar** (on the bottom safe edge): hints 32px apart, 12px between a glyph and its verb; the system-switch hint sits at the right end.

Columns are separated by 32px of ground on both sides of the list; nothing divides them but space. Every focusable element is at least 56px tall.

Spacing runs on a 4px base (4, 8, 12, 16, 24, 32, 48). The 8px slot, the cut through the logo's o and d, is a motif rather than a spacer: it is the gap in split elements, such as the cut through the sun.

## Elevation & Depth

Obol is flat. Depth comes from three tonal steps, Banked Ash to Ash Panel to Raised Ash, and from nothing else. No element casts a shadow, at rest or in focus. The only outer box-shadow in the system is the focus ring, which is a stroke rather than elevation; every other box-shadow is an inset stroke that draws an edge without changing size. The one overlay, Night Scrim, dims rather than lifts; a dialog on it is a solid Raised Ash plate so the dimmed screen never reads through the message.

### Shadow Vocabulary
- **Focus ring** (`box-shadow: 0 0 0 3px #120c0b, 0 0 0 7px #fea517`): every focused element. A 3px ground-coloured gap, then 4px of solid Gilt Gold. In the light theme the gap is #f6efe6 and the ring is #961e1e.
- **Control edge** (`box-shadow: inset 0 0 0 2px #8a6b60`): glyph discs, key slabs, secondary buttons. Dropped on accent-filled confirm glyphs.
- **Label edge** (`box-shadow: inset 0 0 0 1.5px #8a6b60`): the Sample clip label and badges.
- **Frame edge** (`box-shadow: inset 0 0 0 1px #8a6b60`): the preview screen and placeholder thumbnails, drawn over the picture so the frame holds its shape when the picture's ground matches the page.

### Named Rules
**The Tonal Step Rule.** To lift something, move it one tonal step up (ground, panel, raised). Never add a shadow, and never place Raised Ash straight on Banked Ash across a large area; step through Ash Panel. The one exception is a dialog plate over Night Scrim, where the scrim is the step.

## Shapes

The form language is the wordmark's: square-cut slabs and perfect circles, nothing in between. Tiles, rows, frames, thumbnails, labels, key slabs, buttons, plates and panels are square (0px). Discs are full circles (9999px): the sun, pad face buttons and the d-pad glyph, toggles, and disc shapes inside placeholder art. The one exception is the badge, at 4px, so small chips don't read as sharp at a distance. Edges on controls are drawn as inset strokes in Die Edge rather than borders, so they never change an element's size.

The signature silhouette is the sun: a disc of five hard bands, split down the middle by the 8px slot. In the mosaic it waits just below the current system's tile and rises into it, clipped by the tile and bleeding off its top and right edges. It is sized to its tile: a diameter of 62% of the tile's height or 55% of its width, whichever is smaller, set 16% of its diameter past the right edge and 10% above the top. On the launch sheet it appears whole, without the slot.

### Named Rules
**The Slab or Disc Rule.** Every shape is a 0px slab or a 9999px disc. A medium radius is never the answer.

## Components

### Buttons
Restrained, square and edged; lit only by focus. (Not on the home screen; the launch overlay is a stub with no buttons yet.)
- **Shape:** square-cut (0px), at least 56px tall, 24px side padding, Label type.
- **Primary:** Sunrise Orange fill with Ash on Orange label (dark); Struck Oxblood with Bone on Oxblood (light). One per screen or dialog. It may lead with a small 28px glyph disc naming its button.
- **Secondary:** transparent with a 2px Die Edge inset stroke and a Bone label.
- **Focus:** the focus ring plus a 1.03 scale over 120ms. There is no hover state to rely on.
- **Disabled:** 45% opacity, skipped by navigation.

### Chips
- **Badge:** 30px tall, 4px corners, a 1.5px Die Edge inset stroke, Worn Bone caption text; numerals in Data. Accent for a person's own marks (Favorite), Verdigris for verified, Coral Warning for what blocks play. Status chips always carry a word and a leading mark. (Not on the home screen.)
- **Sample clip label:** square-cut, 30px tall, 8px side padding, Banked Ash with a 1.5px Die Edge inset and Worn Bone caption text in Outfit. Pinned 16px in from the preview screen's top left on every sample clip, so stand-in footage is never mistaken for the game.

### Navigation
- **Style:** spatial focus driven by keyboard and gamepad; exactly one focused element at a time, with DOM focus kept in step for screen readers (one roving tab stop per column). In the mosaic, each direction moves to the nearest tile that way: overlap on the cross axis wins, then distance. Right from a tile with no neighbour that way, or confirm, steps into the game list; left or back steps out of the list to the mosaic. Up and down move within the list, and confirm in the list opens the launch overlay. Page Up and Page Down (LB and RB) step through systems in mosaic order, largest first, from either column.

### Hint Bar
Every action names its input, on the bottom safe edge, in Label type with a glyph before each verb. Labels follow the last-used device, and the set follows the focused zone: the mosaic shows Move and Games; the list shows Move, Play, Systems and Change system; the launch overlay shows Close.
- **Keyboard keys and shoulder buttons** (Enter, Esc, Arrows, PgUp, PgDn, LB, RB): square-cut slabs, 36px tall, at least 36px wide, 12px side padding, Raised Ash with a 2px Die Edge inset, Key type.
- **Pad face buttons and the d-pad** (A, B, and a 20px cross drawn inline): 36px discs, Raised Ash with a 2px Die Edge inset, Glyph type.
- **Confirm** (Enter or A): filled with the accent, Ash on Orange letters, no edge.
- It stays above Night Scrim when the launch overlay is open.

### System Tile (signature)
One slab per system in the mosaic, sized by the treemap: its short name over its game count in Caption ("10 games", the number in Data at 18px), set at the tile's bottom left with 16px top and bottom and 24px side padding. Names are Headline Large for the larger half of the library by game count and Headline otherwise, on one line. At rest a tile is Ash Panel with Bone name and Worn Bone count. The current system, and only the current system, is Struck Oxblood with Bone on Oxblood text, and the striped sun rises into it from below over 220ms, split by the 8px slot cut in oxblood (see Shapes); the fill changes over 160ms. It stays oxblood with its sun risen while focus is in the game list. In focus it takes the ring and a 1.03 scale about its centre over 120ms, above its neighbours.

### Game Row (signature)
A 372 x 92 row straight on Banked Ash: a 54 x 72 (3:4) thumbnail, 24px gap, then the title in Label over the year (in Data) and genre in Caption, both Worn Bone. The selected row is Raised Ash with Bone text and keeps that while focus is in the mosaic. In focus it takes the ring and a 1.03 scale from its left edge over 120ms. Titles truncate with an ellipsis on one line. Thumbnails show real box art, or the palette placeholder (see Colors) until it exists. At the window's right edge, the 4px scroll track in Faint Seam with a Worn Bone thumb that follows over 120ms; below the window, the "N of M" position line in Caption with its numerals in Data.

### Game Preview (signature)
A 776 x 582 (4:3) screen on Ash Panel with a 1px Die Edge inset edge, then the title in Title, the meta line in Caption (year in Data, genre, players, and "Played" with play time in Data when there is any), and the description in Body, three lines at most. The clip's still frame shows at once; the video loads 350ms after the selection rests, so holding a direction doesn't thrash the player, and fades in over 200ms once it is actually playing. It plays muted and looping. Under reduced motion the still stays and no video loads. Every sample clip carries the Sample clip label.

### Launch Overlay
Night Scrim over the whole home screen with a centred solid plate: Raised Ash, 720px wide, 48px padding, square-cut. On it, the full sun at 160px rising 48px into place over 220ms, the game's title in Title 48px below, its file name in Data in Worn Bone 12px below that, and a plain Body message 32px below in Bone. In this build it is a stub that says launching isn't connected; back closes it. The hint bar stays above the scrim.

## Do's and Don'ts

### Do:
- **Do** keep every focusable element at least 56px tall and every readable thing inside the 96px / 54px safe area.
- **Do** mark focus with the ring (3px ground gap, 4px Gilt Gold or Struck Oxblood) plus a 1.03 scale, and nothing more.
- **Do** keep the current system oxblood and the selected game on Raised Ash when focus moves to the other column, so the ring shows where you are and the fills show what you picked.
- **Do** build depth from Banked Ash, Ash Panel and Raised Ash alone.
- **Do** use the five sun bands together, in order, hard-edged.
- **Do** pair every status colour with a word and a mark.
- **Do** label stand-in media ("Sample clip") and keep placeholder art to bone, ash and die-edge tones, so nothing synthetic passes for real.
- **Do** show square-cut slabs for keyboard keys and shoulder buttons, and discs only for pad face buttons and the d-pad, following the last-used device.
- **Do** drop the scale (keep the ring), stop transitions, and show the clip's still instead of video when reduced motion is requested.
- **Do** size system tiles by game count and keep the mosaic's seams shared, so the tiles read as one struck block.

### Don't:
- **Don't** add shadows, glows or lift to any element, focused or not.
- **Don't** use any corner radius other than 0px, 4px (badges) or 9999px (discs).
- **Don't** set Struck Oxblood as text on a dark ground, or put the oxblood logo on a dark ground; use the reversed logo.
- **Don't** use Gilt Gold for anything but focus in the dark theme, outside its place as band 4 of the complete sun.
- **Don't** put Struck Oxblood, the sun or Gilt Gold in placeholder art.
- **Don't** set anything below 16px, or use JetBrains Mono for words; only numerals, the clock and file names.
- **Don't** blend, reorder or isolate the sun bands, or fade between them.
- **Don't** start a preview video before the selection has rested for 350ms.
