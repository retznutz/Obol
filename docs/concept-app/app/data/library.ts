// SYNTHETIC LIBRARY. Every game title, description, file name and play time here is invented
// demonstration data, every clip is a generated sample, and every thumbnail is palette placeholder
// art. Which emulator cores Obol uses is still undecided, so none are named. Replace all of it
// with the real scanned library.

export type ArtShape = 'disc' | 'horizon' | 'pillars' | 'eclipse' | 'band' | 'moon' | 'stripes'

export interface GameArt {
  shape: ArtShape
  bg: string
  fg: string
}

export interface Game {
  id: string
  title: string
  year: number
  genre: string
  players: string
  description: string
  minutesPlayed: number
  file: string
  art: GameArt
  video: { src: string, poster: string, sample: boolean }
}

export interface System {
  id: string
  short: string
  name: string
  games: Game[]
}

type Row = [title: string, year: number, genre: string, players: string, description: string, minutesPlayed?: number]

// Placeholder art keeps to bone, ash and die-edge. Oxblood and the sun belong to the current system
// tile alone, and gold to the focus ring.
const PALETTES: [bg: string, fg: string][] = [
  ['#f6ece1', '#120c0b'],
  ['#8a6b60', '#120c0b'],
  ['#bfa898', '#2a1e1c'],
  ['#4a3632', '#f6ece1'],
  ['#f6ece1', '#8a6b60'],
]
const SHAPES: ArtShape[] = ['disc', 'horizon', 'pillars', 'eclipse', 'band', 'moon', 'stripes']
const CLIPS = ['runner', 'shooter', 'stacker']

// How many of each system's sample games to keep, so the sample libraries differ in size and the
// systems mosaic has something to weigh. Played games are listed first, so they are always kept.
const SAMPLE_SIZE: Record<string, number> = { snes: 10, ps1: 10, md: 9, gba: 8, gb: 7, nes: 7, arcade: 6, n64: 5, pce: 4 }

const slug = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function system(id: string, short: string, name: string, ext: string, region: string, rows: Row[]): System {
  const games = rows
    .slice(0, SAMPLE_SIZE[id] ?? rows.length)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([title, year, genre, players, description, minutesPlayed = 0], i): Game => {
      const seed = i + id.length * 3
      const [bg, fg] = PALETTES[seed % PALETTES.length]!
      const shape = SHAPES[seed % SHAPES.length]!
      const clip = `/media/clips/${CLIPS[seed % CLIPS.length]}-${seed % PALETTES.length}`
      return {
        id: `${id}-${slug(title)}`,
        title, year, genre, players, description, minutesPlayed,
        file: id === 'arcade' ? `${slug(title).replace(/-/g, '')}.zip` : `${slug(title)} (${region}).${ext}`,
        art: { shape, bg, fg },
        video: { src: `${clip}.mp4`, poster: `${clip}.jpg`, sample: true },
      }
    })
  return { id, short, name, games }
}

export const library: System[] = [
  system('snes', 'SNES', 'Super Nintendo', 'sfc', 'USA', [
    ['Lantern Drift', 1994, 'Adventure', '1 player', 'A lighthouse keeper rows between islands at night, relighting the coast one lamp at a time. Each island hides a keeper\'s log, and together they explain why the lights went out.', 192],
    ['Hollow Bell', 1993, 'Action RPG', '1 player', 'Ring the old bell beneath the monastery to wake the mountain, then climb it before dawn. Every chime opens a new path and wakes something that would rather sleep.', 120],
    ['Paper Kite Rally', 1991, 'Racing', '1-2 players', 'Steer paper kites through rooftop gates on gusts that change every lap. Fold new wings between races, and race a friend on a split screen.', 15],
    ['Brass Orchard', 1995, 'Puzzle', '1-2 players', 'Wind clockwork trees so their fruit drops into the right baskets before the bell. Later orchards add gears that turn two trees at once and baskets that move.'],
    ['Cinder Knights', 1992, 'Beat \'em up', '1-2 players', 'Two smiths fight their way up a burning forge city to win back the guild\'s anvil. Pick up hammers, tongs and the occasional bellows along the way.', 64],
    ['Gull Harbor Golf', 1993, 'Sports', '1-4 players', 'Eighteen seaside holes where the tide moves the water hazards between shots. Read the tide table, wait out the waves, or play straight across the harbour.'],
    ['Quill and Quarry', 1996, 'RPG', '1 player', 'A scribe and a stonecutter map a buried kingdom, one page and one tunnel at a time. What the scribe writes down becomes the floor the stonecutter walks on.', 845],
    ['Starboard Siege', 1994, 'Shooter', '1-2 players', 'Hold a riverboat against airships in a vertical shooter where the deck turns with the river. A second player can take the stern gun.'],
    ['Thimble Town', 1995, 'Simulation', '1 player', 'Build a village small enough to fit on a sewing table, then keep its tiny people happy. Watch out for the cat, the scissors and the occasional dropped button.'],
    ['Velvet Comet', 1992, 'Platformer', '1 player', 'A courier cat leaps between moving trains to deliver the last letter of the night. Forty stages of carriages, signal towers and one very long tunnel.', 33],
  ]),
  system('ps1', 'PS1', 'PlayStation', 'chd', 'USA', [
    ['Starling Circuit', 1997, 'Racing', '1-2 players', 'Anti-gravity bikes race through a city that rearranges its streets every season. Learn the spring layout and the autumn one will still surprise you.', 22],
    ['Glasswing', 1998, 'RPG', '1 player', 'A glassblower\'s apprentice travels with a living window that looks onto other places. Step through it to reach towns the map says no longer exist.', 610],
    ['Night Ferry 2', 1999, 'Adventure', '1 player', 'The ferry runs again, and every passenger has a story to finish before the far shore. Choose whom to listen to; the crossing only lasts one night.', 95],
    ['Ash Garden', 1997, 'Survival horror', '1 player', 'Tend a greenhouse at the edge of a quiet town while something waits in the soil. Water the plants by day and keep the lamps lit through the night.'],
    ['Bolt Parade', 1998, 'Platformer', '1 player', 'A wind-up robot marches through a toy factory, collecting springs to stay awake. Run out of spring and you finish the level standing very still.'],
    ['Copperline', 1996, 'Puzzle', '1-2 players', 'Lay rail across shifting tiles before the copper train reaches the gap. Two players can race to finish the same line from opposite ends.'],
    ['Driftwood Derby', 1999, 'Racing', '1-4 players', 'Raft races down rivers that branch, flood and freeze as the day goes on. Four players share the river and all of its rocks.'],
    ['Frost Ledger', 2000, 'Strategy', '1 player', 'Run a winter trading post, balancing furs, firewood and favours until the thaw. Every trader remembers how you treated them last year.', 240],
    ['Harbor Lights', 1998, 'Fighting', '1-2 players', 'Dock workers settle their disputes on the pier after the last shift. Twelve fighters, each with a crane, a cargo net or a tide to use.'],
    ['Low Orbit Lounge', 1999, 'Rhythm', '1-2 players', 'Mix drinks to the beat for astronauts on a slowly turning station. Miss the rhythm and the drinks start floating away.'],
  ]),
  system('md', 'MD', 'Mega Drive', 'md', 'World', [
    ['Cobalt Run', 1992, 'Platformer', '1 player', 'A blue miner sprints through collapsing tunnels, racing the flood to the surface. Speed through the shafts or stop to dig out trapped miners for a better ending.', 48],
    ['Iron Gull', 1991, 'Shooter', '1 player', 'A seaplane pilot clears the coast of clockwork battleships, one harbour at a time. Land on the water to refuel, rearm and listen to the dockside rumours.', 36],
    ['Saltmarsh Brawl', 1993, 'Beat \'em up', '1-2 players', 'Fishermen take back their marsh from a gang of eel smugglers. Fight through reed beds, stilt houses and a very slippery fish market.', 210],
    ['Amber Alley', 1990, 'Action', '1 player', 'Rooftop chases through a city lit only by its streetlamps. Stay in the light, because whatever is in the dark is faster than you.'],
    ['Basalt Fist', 1992, 'Fighting', '1-2 players', 'Eight fighters meet on a volcanic island where the arena cools between rounds. The ground cracks, hardens and changes shape as each match goes on.'],
    ['Dune Courier', 1991, 'Racing', '1 player', 'Deliver the mail across the desert by sand sled before the post office closes. Read the wind on the dunes, because it moves the roads.'],
    ['Gearwell', 1994, 'Puzzle', '1-2 players', 'Connect gears across a wall of cogs to raise the old mine elevator. Each floor adds a cog that turns the wrong way.'],
    ['Mosaic Knight', 1993, 'Action RPG', '1 player', 'A knight made of tiles rebuilds a shattered chapel as she fights through it. Every tile she finds can go into her armour or back into the walls.', 75],
    ['Red Tide Rally', 1992, 'Sports', '1-4 players', 'Beach volleyball where the tide shrinks the court every few points. Play fast before the sea takes the back line.'],
    ['Thunder Kettle', 1990, 'Platformer', '1 player', 'A runaway kettle steams its way home through a giant\'s kitchen. Build up pressure to jump higher, but don\'t boil over.'],
  ]),
  system('gba', 'GBA', 'Game Boy Advance', 'gba', 'USA', [
    ['Tidewater Tactics', 2002, 'Strategy', '1-2 players', 'Turn-based battles on islands that flood and drain every few turns. Time your march with the tide, or watch your army swim back.', 100],
    ['Pocket Orchard', 2003, 'Simulation', '1 player', 'Grow a pocket-sized orchard and trade its fruit with the town by train. Seasons pass in real time, so the cherries are ready when they are ready.', 845],
    ['Mirror Lake', 2004, 'Adventure', '1 player', 'Explore a lakeside town and its reflection, where every choice is mirrored. Open a door on one side and it closes on the other.', 64],
    ['Ember Scouts', 2003, 'RPG', '1 player', 'A troop of scouts earns its badges by keeping wildfires out of the valley. Each scout has a skill, and every badge unlocks a new one.'],
    ['Fable Forge', 2002, 'Action RPG', '1 player', 'Hammer story pages into weapons that change as the tale changes. A sword forged from a sad chapter swings differently from a happy one.'],
    ['Kite Courier', 2001, 'Platformer', '1 player', 'Glide on a kite between floating post offices high above the sea. Updrafts carry you further; storms carry you somewhere else entirely.'],
    ['Lumen Labyrinth', 2004, 'Puzzle', '1 player', 'Guide a beam of light through rotating mirrors to open each door. A hundred rooms, and the last ten are all one room.'],
    ['Night Market Kart', 2003, 'Racing', '1-4 players', 'Kart races weave through the stalls of a market after closing time. Knock over the right stalls for a boost and the wrong ones for a chase.'],
    ['Rook and Raven', 2005, 'Strategy', '1-2 players', 'Chess-like skirmishes on a board that grows by one row every round. Plan for the board you will have, not the one you have now.'],
    ['Wildflower Cup', 2002, 'Sports', '1-2 players', 'Village football played on meadows of uneven grass and wandering sheep. The sheep are neutral, mostly.'],
  ]),
  system('gb', 'GB', 'Game Boy', 'gb', 'World', [
    ['Mossback Keep', 1990, 'Adventure', '1 player', 'A tortoise carries a castle on its back across a flooded valley. Keep the castle\'s people fed while the tortoise looks for dry land.', 425],
    ['Tiny Lighthouse', 1992, 'Puzzle', '1 player', 'Rotate the lamp to guide each boat past the rocks and into harbour. Fog rolls in on later levels and hides half the coast.', 58],
    ['Brick and Moss', 1991, 'Puzzle', '1-2 players', 'Stack bricks so the moss can climb all the way to the top of the wall. Link two systems to race the same wall from both sides.', 12],
    ['Acorn Express', 1993, 'Platformer', '1 player', 'A squirrel delivers acorns along a railway built through the treetops. Late deliveries make for a hungry winter.'],
    ['Beetle Derby', 1991, 'Racing', '1-2 players', 'Race beetles along the garden path, dodging puddles and pebbles. Train your beetle between races on a diet of leaves.'],
    ['Cloud Cartographer', 1994, 'Adventure', '1 player', 'Map the shapes of clouds before the wind changes them. Complete maps sell for more in the sky town market.'],
    ['Fog Fishing', 1992, 'Sports', '1 player', 'Fish a misty lake where the only thing you can see is your line. Learn each fish by the way it pulls.'],
    ['Pocket Pirates', 1993, 'Strategy', '1-2 players', 'Short naval battles between two very small pirate crews. Win a battle and you keep a sailor from the other ship.'],
    ['Star Shepherd', 1995, 'Action', '1 player', 'Herd falling stars back into the sky with a very long crook. Lose too many and the night gets noticeably darker.'],
    ['Tin Soldier March', 1990, 'Shooter', '1 player', 'A toy soldier defends the shelf from a line of wind-up invaders. Each wave winds a little faster than the last.'],
  ]),
  system('nes', 'NES', 'Nintendo Entertainment System', 'nes', 'USA', [
    ['Copper Canyon', 1987, 'Platformer', '1 player', 'Ride mine carts through a canyon full of switchbacks and broken track. Lean into turns and jump the gaps before the cart does it for you.', 77],
    ['Owl Patrol', 1989, 'Action', '1 player', 'An owl guards the forest at night, catching thieves by moonlight. Silent flight sneaks up on them; hooting scares them off.', 31],
    ['Rooftop Ramble', 1986, 'Platformer', '1-2 players', 'Hop between rooftops to catch the laundry the wind has stolen. Two players take turns, and the wind doesn\'t.', 9],
    ['Badger Brigade', 1988, 'Strategy', '1 player', 'Dig tunnels under the meadow to outmanoeuvre the foxes. Every tunnel you dig is one the foxes can use too.'],
    ['Chalk Comet', 1987, 'Shooter', '1 player', 'A chalk-drawn ship defends the blackboard from a squadron of erasers. Draw power-ups in the margins between waves.'],
    ['Dungeon Lantern', 1988, 'RPG', '1 player', 'Explore a dungeon where your lantern burns lower with every step. Oil is treasure here, and so is a good map.'],
    ['Ice Harbor Hockey', 1989, 'Sports', '1-2 players', 'Hockey on a frozen harbour, with fishing holes to skate around. The ice gets thinner as the season goes on.'],
    ['Pixel Picnic', 1986, 'Puzzle', '1-2 players', 'Clear the picnic blanket before the ants arrive in force. Match the food to clear it, and save the cake for last.'],
    ['Signal Hill', 1990, 'Adventure', '1 player', 'Climb the hill and light the signal before the storm reaches the town. Villagers along the way each know a shortcut.'],
    ['Turnip Tycoon', 1988, 'Simulation', '1 player', 'Grow, store and sell turnips through one very long winter. Prices rise with the snow, and so does the risk.'],
  ]),
  system('arcade', 'Arcade', 'Arcade', 'zip', '', [
    ['Blast Harbor', 1986, 'Shooter', '1-2 players', 'Defend the harbour from waves of paper-boat raiders. Two cannons, one on each pier, and the boats keep getting bigger.', 18],
    ['Comet Alley', 1982, 'Shooter', '1 player', 'Steer through a narrow alley of comets that never stops tightening. Score keeps climbing as long as you can keep flying.', 41],
    ['Neon Pier', 1991, 'Fighting', '1-2 players', 'Fighters brawl on a pier lit by flickering signs. Each signboard that breaks changes the arena\'s lighting.', 6],
    ['Arcadia Dash', 1984, 'Racing', '1 player', 'Top-down races around a fairground, past the carousel and the coconut shy. Grab tickets on the track to buy a faster car.'],
    ['Bumper Bandits', 1983, 'Action', '1-2 players', 'Bumper cars full of bandits chase a single bag of loot. Whoever holds it at the bell keeps it.'],
    ['Crate Crusher', 1985, 'Puzzle', '1 player', 'Smash crates in the right order to clear the warehouse floor. Some crates hold more crates.'],
    ['Ghost Ferris', 1987, 'Action', '1 player', 'Ride a haunted Ferris wheel and catch the ghosts at the top of each turn. Miss one and it rides with you.'],
    ['Laser Lagoon', 1988, 'Shooter', '1-2 players', 'Laser duels between hovercraft over a tropical lagoon. Bounce shots off the water to hit from below.'],
    ['Pinwheel Panic', 1982, 'Action', '1 player', 'Keep every pinwheel spinning as the wind dies down. Blow on the slow ones, but don\'t run out of breath.'],
    ['Turbo Tram', 1989, 'Racing', '1 player', 'Race trams through the city at rush hour without spilling a passenger. Every stop you skip costs you a fare.'],
  ]),
  system('n64', 'N64', 'Nintendo 64', 'z64', 'USA', [
    ['Kestrel 64', 1998, 'Flight', '1 player', 'Fly a kestrel across hills and canyons, riding thermals to stay aloft. Hunt, nest and follow the seasons south.', 133],
    ['Fjord Racer', 1999, 'Racing', '1-4 players', 'Boat races through narrow fjords, under waterfalls and past glaciers. Four players split the screen and the spray.', 54],
    ['Clockwork Garden', 2000, 'Adventure', '1 player', 'Wind the garden\'s clockwork creatures to bring spring back. Each creature you wake opens another corner of the garden.', 260],
    ['Bramble Brawl', 1999, 'Fighting', '1-4 players', 'Four-player scraps in a hedge maze that regrows behind you. Knock rivals into the thorns for points.'],
    ['Canyon Couriers', 1998, 'Action', '1-2 players', 'Deliver parcels across rope bridges strung over a deep canyon. Heavier parcels pay more and sway more.'],
    ['Lantern League', 2000, 'Sports', '1-4 players', 'Night football played with a glowing ball under a starry sky. The ball dims when it is kicked too hard.'],
    ['Moon Kart', 1997, 'Racing', '1-4 players', 'Kart races in low gravity across the craters of the moon. Every jump lasts longer than you expect.'],
    ['Orbit Orchard', 2001, 'Simulation', '1 player', 'Run an orchard on a small planet that turns beneath your feet. Plant on the sunny side and harvest on the other.'],
    ['Snowline', 1998, 'Sports', '1-2 players', 'Snowboard down a mountain whose runs change with the weather. Fresh snow is fast; ice is faster and less forgiving.'],
    ['Tide Temple', 1999, 'Adventure', '1 player', 'Explore a temple that floods and empties with the tide. Some rooms can only be reached at high water.'],
  ]),
  system('pce', 'PCE', 'PC Engine', 'pce', 'Japan', [
    ['Signal Fire', 1989, 'Shooter', '1 player', 'Fly between hilltop beacons, lighting each one in turn. Enemy kites try to put them out behind you.', 27],
    ['Moonlit Express', 1990, 'Platformer', '1 player', 'Jump across the cars of a night train to find a lost ticket. The conductor is always one carriage behind.', 70],
    ['Puzzle Pagoda', 1991, 'Puzzle', '1-2 players', 'Stack falling roof tiles into a pagoda before the bell rings. Clean floors earn a lantern for the next storey.', 140],
    ['Bamboo Blade', 1990, 'Action', '1 player', 'A swordsman guards a bamboo grove through four seasons. Each season brings new rivals and new hiding places.'],
    ['Cherry Rocket', 1989, 'Shooter', '1-2 players', 'A rocket carved from a cherry stone defends the orchard. Collect blossoms for spread shots and stones for shields.'],
    ['Drum Dojo', 1992, 'Rhythm', '1-2 players', 'Beat the drums in time to pass the dojo\'s trials. Masters play faster, and they never miss.'],
    ['Fox Lantern', 1991, 'Adventure', '1 player', 'A fox carries a lantern through a village where the spirits are awake. Light shows the spirits; darkness hides you from them.'],
    ['Koi Circuit', 1990, 'Racing', '1-2 players', 'Race koi through the ponds and streams of a temple garden. Leap waterfalls for shortcuts.'],
    ['Paper Samurai', 1992, 'Fighting', '1-2 players', 'Origami warriors duel across a cluttered desk. Fold new moves between rounds.'],
    ['Typhoon Tower', 1993, 'Puzzle', '1 player', 'Build a tower strong enough to stand through the typhoon. Wind direction changes with every floor.'],
  ]),
]

export const totalGames = library.reduce((sum, s) => sum + s.games.length, 0)

export function formatPlaytime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h}h ${String(m).padStart(2, '0')}m` : `${h}h`
}
