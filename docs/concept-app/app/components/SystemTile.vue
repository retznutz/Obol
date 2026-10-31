<script setup lang="ts">
import type { System } from '~/data/library'
import type { Rect } from '~/utils/mosaic'

// `large` is decided by game count (the bigger half of the library), not by the tile's shape.
const props = defineProps<{ system: System, rect: Rect, large: boolean, current: boolean, focused: boolean }>()
const emit = defineEmits<{ open: [id: string] }>()

// The sun waits below the tile and rises into the current system, bleeding off its top and right edges.
const sun = computed(() => {
  const { w, h } = props.rect
  const d = Math.round(Math.min(h * 0.62, w * 0.55))
  return { d, right: -Math.round(d * 0.16), top: -Math.round(d * 0.1) }
})
</script>

<template>
  <button
    class="tile"
    :class="{ large, 'is-current': current, 'is-focused': focused }"
    :style="{
      left: `${rect.x}px`,
      top: `${rect.y}px`,
      width: `${rect.w}px`,
      height: `${rect.h}px`,
      '--sun-d': `${sun.d}px`,
      '--sun-right': `${sun.right}px`,
      '--sun-top': `${sun.top}px`,
    }"
    :tabindex="current ? 0 : -1"
    :data-focus-key="`system:${system.id}`"
    :aria-label="`${system.name}, ${system.games.length} games`"
    :aria-current="current ? 'true' : undefined"
    @click="emit('open', system.id)"
  >
    <ObolSun class="sun" cut="var(--oxblood)" />
    <span class="name">{{ system.short }}</span>
    <span class="count"><span class="mono">{{ system.games.length }}</span> games</span>
  </button>
</template>

<style scoped>
.tile {
  position: absolute;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: var(--space-1);
  padding: var(--space-4) var(--space-6);
  border: 0;
  border-radius: var(--radius-none);
  background: var(--surface);
  color: var(--ink);
  text-align: left;
  cursor: pointer;
  transition:
    transform 120ms var(--ease-out),
    box-shadow 120ms var(--ease-out),
    background-color 160ms var(--ease-out);
}

.tile:focus {
  outline: none;
}

.name {
  position: relative;
  z-index: 1;
  font-size: 28px;
  line-height: 32px;
  font-weight: 800;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.large .name {
  font-size: 44px;
  line-height: 48px;
}

.count {
  position: relative;
  z-index: 1;
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--ink-muted);
  white-space: nowrap;
}

.count .mono {
  font-size: 18px;
  letter-spacing: 0;
}

.sun {
  position: absolute;
  width: var(--sun-d);
  right: var(--sun-right);
  top: calc(100% + 8px);
  transition: top 220ms var(--ease-out);
}

.tile.is-current {
  background: var(--oxblood);
  color: var(--on-oxblood);
}

.tile.is-current .count {
  color: var(--on-oxblood);
}

.tile.is-current .sun {
  top: var(--sun-top);
}

.tile.is-focused {
  box-shadow: var(--focus-ring);
  transform: scale(1.03);
  z-index: 2;
}

@media (prefers-reduced-motion: reduce) {
  .tile,
  .sun {
    transition: none;
  }

  .tile.is-focused {
    transform: none;
  }
}
</style>
