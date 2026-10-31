<script setup lang="ts">
import { library, totalGames } from '~/data/library'
import { layoutMosaic, nearest } from '~/utils/mosaic'
import type { Action, Hint } from '~/composables/useControls'

type Zone = 'systems' | 'games' | 'launch'

const VIDEO_DWELL = 350
// The systems mosaic fills the left column, its bottom level with the game list's window.
const MOSAIC_FRAME = { x: 96, y: 140, w: 488, h: 792 }

const tiles = layoutMosaic(library.map(s => ({ item: s, value: s.games.length })), MOSAIC_FRAME, 16)
// Names step up a size for the bigger half of the library, by game count.
const counts = library.map(s => s.games.length).sort((a, b) => a - b)
const largeFrom = counts[Math.floor(counts.length / 2)]!

const zone = ref<Zone>('systems')
const systemId = ref(tiles[0]!.item.id)
const selected = reactive<Record<string, number>>({})

const system = computed(() => library.find(s => s.id === systemId.value)!)
const gameIndex = computed(() => selected[system.value.id] ?? 0)
const game = computed(() => system.value.games[gameIndex.value]!)
const time = useClock()
const reduced = usePrefersReducedMotion()

const hints = computed<Hint[]>(() => {
  if (zone.value === 'launch') return [{ input: 'back', label: 'Close' }]
  if (zone.value === 'games') {
    return [
      { input: 'move', label: 'Move' },
      { input: 'confirm', label: 'Play' },
      { input: 'back', label: 'Systems' },
      { input: 'switch', label: 'Change system' },
    ]
  }
  return [
    { input: 'move', label: 'Move' },
    { input: 'confirm', label: 'Games' },
  ]
})

// The preview video waits until the selection rests, so holding a direction doesn't thrash the player.
const videoSrc = ref<string | null>(null)
let dwell: ReturnType<typeof setTimeout> | undefined
watch([game, reduced], () => {
  clearTimeout(dwell)
  videoSrc.value = null
  if (reduced.value) return
  dwell = setTimeout(() => (videoSrc.value = game.value.video.src), VIDEO_DWELL)
}, { immediate: true })
onBeforeUnmount(() => clearTimeout(dwell))

// Page Up / Page Down step through systems in mosaic order, largest first.
function stepSystem(step: number) {
  const i = tiles.findIndex(t => t.item.id === systemId.value)
  systemId.value = tiles[Math.min(tiles.length - 1, Math.max(0, i + step))]!.item.id
}

function moveGame(step: number) {
  const last = system.value.games.length - 1
  selected[system.value.id] = Math.min(last, Math.max(0, gameIndex.value + step))
}

function act(action: Action) {
  switch (zone.value) {
    case 'launch':
      if (action === 'back') zone.value = 'games'
      return
    case 'systems': {
      if (action === 'prev') return stepSystem(-1)
      if (action === 'next') return stepSystem(1)
      if (action === 'confirm') return void (zone.value = 'games')
      if (action === 'back') return
      const from = tiles.find(t => t.item.id === systemId.value)!
      const to = nearest(from, tiles, action)
      if (to) systemId.value = to.item.id
      else if (action === 'right') zone.value = 'games'
      return
    }
    case 'games':
      if (action === 'up') moveGame(-1)
      else if (action === 'down') moveGame(1)
      else if (action === 'prev') stepSystem(-1)
      else if (action === 'next') stepSystem(1)
      else if (action === 'left' || action === 'back') zone.value = 'systems'
      else if (action === 'confirm') zone.value = 'launch'
  }
}

useControls(act)

// Keep the DOM focus on whatever the controls have focused, for screen readers and Tab.
function focusCurrent() {
  if (zone.value === 'launch') return
  const key = zone.value === 'systems' ? `system:${systemId.value}` : `game:${gameIndex.value}`
  document.querySelector<HTMLElement>(`[data-focus-key="${key}"]`)?.focus({ preventScroll: true })
}
watch([zone, systemId, gameIndex], () => nextTick(focusCurrent), { flush: 'post' })
onMounted(focusCurrent)

function onFocusIn(e: FocusEvent) {
  const key = (e.target as HTMLElement).dataset?.focusKey
  if (!key || zone.value === 'launch') return
  const [kind, value] = key.split(':') as [string, string]
  if (kind === 'system') {
    zone.value = 'systems'
    systemId.value = value
  }
  else {
    zone.value = 'games'
    selected[system.value.id] = Number(value)
  }
}

function openSystem(id: string) {
  systemId.value = id
  zone.value = 'games'
}

function play(index: number) {
  selected[system.value.id] = index
  zone.value = 'launch'
}
</script>

<template>
  <ObolStage>
    <main class="home" @focusin="onFocusIn">
      <header class="top">
        <div class="brand">
          <img class="logo" src="/obol-logo-reversed.png" alt="Obol" width="91" height="40">
          <p class="totals"><span class="mono">{{ library.length }}</span> systems<span class="sep" aria-hidden="true">·</span><span class="mono">{{ totalGames }}</span> games</p>
        </div>
        <p class="clock mono" aria-label="Current time">{{ time }}</p>
      </header>

      <h1 class="visually-hidden">{{ system.name }}</h1>
      <nav class="mosaic" aria-label="Systems">
        <SystemTile
          v-for="tile in tiles"
          :key="tile.item.id"
          :system="tile.item"
          :rect="tile"
          :large="tile.item.games.length >= largeFrom"
          :current="tile.item.id === systemId"
          :focused="zone === 'systems' && tile.item.id === systemId"
          @open="openSystem"
        />
      </nav>
      <GameList :system="system" :selected-index="gameIndex" :focused="zone === 'games'" @play="play" />
      <GamePreview :game="game" :video-src="videoSrc" />

      <HintBar :hints="hints" />
      <LaunchOverlay v-if="zone === 'launch'" :game="game" />
    </main>
  </ObolStage>
</template>

<style scoped>
.home {
  position: absolute;
  inset: 0;
}

.top {
  position: absolute;
  left: var(--safe-x);
  right: var(--safe-x);
  top: var(--safe-y);
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.logo {
  display: block;
  height: 40px;
  width: auto;
}

.totals {
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  color: var(--ink-muted);
}

.sep {
  margin: 0 0.5em;
}

.clock {
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
}
</style>
