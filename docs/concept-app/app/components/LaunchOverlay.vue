<script setup lang="ts">
import type { Game } from '~/data/library'

defineProps<{ game: Game }>()
const root = ref<HTMLElement>()
onMounted(() => root.value?.focus({ preventScroll: true }))
</script>

<template>
  <div ref="root" class="overlay" role="dialog" aria-modal="true" aria-labelledby="launch-title" tabindex="-1">
    <div class="sheet">
      <ObolSun class="sun" />
      <h2 id="launch-title" class="title">{{ game.title }}</h2>
      <p class="data mono">{{ game.file }}</p>
      <p class="body">Launching games isn't connected in this build. Obol doesn't start an emulator yet.</p>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: grid;
  place-items: center;
  background: var(--scrim);
}

.overlay:focus {
  outline: none;
}

/* A solid plate, so the dimmed screen never reads through the message. */
.sheet {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 720px;
  padding: var(--space-12);
  background: var(--surface-raised);
  text-align: center;
}

.sun {
  width: 160px;
  animation: rise 220ms var(--ease-out) both;
}

.title {
  margin-top: var(--space-12);
  font-size: 44px;
  line-height: 48px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.data {
  margin-top: var(--space-3);
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  color: var(--ink-muted);
}

.body {
  margin-top: var(--space-8);
  font-size: 22px;
  line-height: 32px;
  color: var(--ink);
  text-wrap: balance;
}

@keyframes rise {
  from {
    transform: translateY(48px);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sun {
    animation: none;
  }
}
</style>
