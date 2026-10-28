<script setup lang="ts">
import type { GameInfo } from '~/types/game'

const props = defineProps<{ game: GameInfo }>()
const emit = defineEmits<{ controls: [controls: string] }>()

const canvas = ref<HTMLCanvasElement | null>(null)
const screen = ref<HTMLElement | null>(null)
const { status, error, controls, audioSuspended, resumeAudio } = useGameRuntime(() => props.game.scriptUrl, canvas, screen)

watch(controls, value => emit('controls', value))
</script>

<template>
  <!-- A fixed 16:9 stage. The screen keeps the game's native aspect inside
       it; the space around the screen is for cabinet art later. -->
  <div class="stage">
    <div class="cabinet" aria-hidden="true">
      <slot name="cabinet" />
    </div>

    <!-- useGameRuntime sets --game-aspect here (native width / height). -->
    <div ref="screen" class="screen">
      <!-- SDL finds its canvas with document.querySelector('#canvas'), so the
           id is required (one game runs at a time). SDL sets the width/height
           attributes itself; CSS scales it. -->
      <canvas
        id="canvas"
        ref="canvas"
        tabindex="-1"
        :aria-label="`${game.title} game screen`"
        @contextmenu.prevent
      />

      <div v-if="status === 'loading'" class="overlay">
        <p>Loading {{ game.title }}…</p>
      </div>
      <div v-else-if="status === 'error'" class="overlay overlay--error" role="alert">
        <p>{{ error }}</p>
      </div>
      <button
        v-else-if="audioSuspended"
        type="button"
        class="audio-hint"
        @click="resumeAudio"
      >
        Click or press any key for sound
      </button>
    </div>
  </div>
</template>

<style scoped>
.stage {
  position: relative;
  aspect-ratio: 16 / 9;
  /* Fit the largest 16:9 box into the parent (a size container). */
  width: min(100cqw, 100cqh * 16 / 9);
  container-type: size;
  background: var(--stage-bg);
  overflow: hidden;
}

.cabinet {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.screen {
  position: absolute;
  inset: 0;
  margin: auto;
  --game-aspect: 1.3333; /* a single number: it's also used as a divisor below */
  aspect-ratio: var(--game-aspect);
  /* As tall as the stage, unless that would make it wider than the stage. */
  height: min(100cqh, 100cqw / var(--game-aspect));
  background: #000;
}

.screen canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
  image-rendering: pixelated;
  outline: none;
}

.overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1rem;
  text-align: center;
  background: rgb(0 0 0 / 0.8);
  color: var(--fg-dim);
}

.overlay--error {
  color: var(--danger);
}

.audio-hint {
  position: absolute;
  left: 50%;
  bottom: 0.75rem;
  translate: -50% 0;
  white-space: nowrap;
  font: inherit;
  font-size: 0.8rem;
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgb(0 0 0 / 0.75);
  color: var(--fg);
  cursor: pointer;
}
</style>
