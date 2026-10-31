<script setup lang="ts">
import type { System } from '~/data/library'

const props = defineProps<{ system: System, selectedIndex: number, focused: boolean }>()
const emit = defineEmits<{ play: [index: number] }>()

// The window shows whole rows only: 8 rows on a 100px pitch.
const VISIBLE_ROWS = 8

const list = ref<HTMLElement>()
const reduced = usePrefersReducedMotion()
const scroll = reactive({ top: 0, height: 1, client: 1 })

function measure() {
  const el = list.value
  if (!el) return
  scroll.top = el.scrollTop
  scroll.height = el.scrollHeight
  scroll.client = el.clientHeight
}

const track = computed(() => {
  const ratio = Math.min(1, scroll.client / scroll.height)
  return {
    visible: ratio < 1,
    size: `${ratio * 100}%`,
    offset: `${(scroll.top / scroll.height) * 100}%`,
  }
})

// Keep the selected row in view as it moves.
watch(() => [props.system.id, props.selectedIndex] as const, async ([, index], old) => {
  await nextTick()
  const row = list.value?.querySelector<HTMLElement>(`[data-focus-key="game:${index}"]`)
  const sameSystem = old?.[0] === props.system.id
  row?.scrollIntoView({ block: 'nearest', behavior: sameSystem && !reduced.value ? 'smooth' : 'instant' })
  measure()
}, { immediate: true })
onMounted(measure)
</script>

<template>
  <section class="games" :aria-label="`${system.name} games`">
    <div class="window">
      <ul ref="list" class="list" :style="{ '--rows': VISIBLE_ROWS }" @scroll.passive="measure">
        <li v-for="(game, i) in system.games" :key="game.id">
          <button
            class="row"
            :class="{ 'is-selected': i === selectedIndex, 'is-focused': focused && i === selectedIndex }"
            :tabindex="i === selectedIndex ? 0 : -1"
            :data-focus-key="`game:${i}`"
            @click="emit('play', i)"
          >
            <GameArt class="thumb" :art="game.art" />
            <span class="text">
              <span class="title">{{ game.title }}</span>
              <span class="sub"><span class="mono">{{ game.year }}</span><span class="sep" aria-hidden="true">·</span>{{ game.genre }}</span>
            </span>
          </button>
        </li>
      </ul>
      <div v-if="track.visible" class="track" aria-hidden="true">
        <span class="thumb-bar" :style="{ height: track.size, top: track.offset }" />
      </div>
    </div>
    <p class="position">
      <span class="mono">{{ selectedIndex + 1 }}</span> of <span class="mono">{{ system.games.length }}</span>
    </p>
  </section>
</template>

<style scoped>
.games {
  position: absolute;
  left: 616px;
  top: 140px;
  width: 400px;
}

.window {
  position: relative;
}

/* Row pitch is 100px (92px row + 8px gap); eight rows run exactly from y 140 to 932, level with
   the mosaic. The clip box reaches into the gutters (negative margins equal to its padding) so the
   rows' own edges sit on the column lines while the focus ring and 1.03 scale still have room. */
.list {
  height: calc(var(--rows) * 100px - 8px + 2 * var(--space-4));
  margin: calc(-1 * var(--space-4)) calc(-1 * var(--space-6)) calc(-1 * var(--space-4)) calc(-1 * var(--space-3));
  padding: var(--space-4) var(--space-6) var(--space-4) var(--space-3);
  list-style: none;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

/* On the column's own right edge, clear of the focused row's ring and 32px from the preview. */
.track {
  position: absolute;
  right: 0;
  top: var(--space-4);
  bottom: var(--space-4);
  width: 4px;
  background: var(--line);
}

.thumb-bar {
  position: absolute;
  left: 0;
  width: 100%;
  background: var(--ink-muted);
  transition: top 120ms var(--ease-out);
}

.row {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  /* Leaves room for the track: the focused row grows 1.03 from its left edge, plus the 7px ring. */
  width: calc(100% - var(--space-6) - 4px);
  height: 92px;
  padding: var(--space-2);
  border: 0;
  border-radius: var(--radius-none);
  background: transparent;
  color: var(--ink-muted);
  text-align: left;
  cursor: pointer;
  scroll-margin-block: var(--space-4);
  transform-origin: left center;
  transition:
    transform 120ms var(--ease-out),
    box-shadow 120ms var(--ease-out),
    background-color 120ms var(--ease-out);
}

.row:focus {
  outline: none;
}

.thumb {
  width: 54px;
  height: 72px;
  flex: none;
}

.text {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 0;
}

.title {
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sub {
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.sub .mono {
  letter-spacing: 0;
}

.sep {
  margin: 0 0.5em;
}

.row.is-selected {
  background: var(--surface-raised);
  color: var(--ink);
}

.row.is-focused {
  box-shadow: var(--focus-ring);
  transform: scale(1.03);
}

.position {
  margin-top: var(--space-3);
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--ink-muted);
}

.position .mono {
  letter-spacing: 0;
}

@media (prefers-reduced-motion: reduce) {
  .row,
  .thumb-bar {
    transition: none;
  }

  .row.is-focused {
    transform: none;
  }
}
</style>
