<script setup lang="ts">
import type { GameArt } from '~/data/library'

// Placeholder box art built from the palette. Real box art replaces this.
defineProps<{ art: GameArt }>()
</script>

<template>
  <span class="art" :class="art.shape" :style="{ '--bg': art.bg, '--fg': art.fg }" aria-hidden="true">
    <i />
    <i v-if="art.shape === 'pillars' || art.shape === 'stripes'" />
    <i v-if="art.shape === 'stripes'" />
  </span>
</template>

<style scoped>
.art {
  position: relative;
  display: block;
  overflow: hidden;
  background: var(--bg);
}

/* A drawn edge, so art whose colours match the ground still holds its rectangle. */
.art::after {
  content: "";
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 0 1px var(--line-strong);
  pointer-events: none;
}

.art i {
  position: absolute;
  display: block;
  background: var(--fg);
}

.disc i { width: 62%; aspect-ratio: 1; left: 19%; top: 24%; border-radius: var(--radius-full); }
.horizon i { left: 0; right: 0; bottom: 0; height: 38%; }
.band i { left: 12%; right: 12%; top: 46%; height: 9%; }
.moon i { width: 42%; aspect-ratio: 1; right: 12%; top: 10%; border-radius: var(--radius-full); }
.eclipse i { width: 88%; aspect-ratio: 1; left: -20%; bottom: -24%; border-radius: var(--radius-full); }
.pillars i:nth-child(1) { left: 18%; width: 16%; top: 16%; bottom: 0; }
.pillars i:nth-child(2) { left: 44%; width: 30%; top: 44%; bottom: 0; }
.stripes i { left: 0; right: 0; height: 8%; }
.stripes i:nth-child(1) { top: 52%; }
.stripes i:nth-child(2) { top: 66%; }
.stripes i:nth-child(3) { top: 80%; }
</style>
