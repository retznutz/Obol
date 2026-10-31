<script setup lang="ts">
import { formatPlaytime, type Game } from '~/data/library'

// `videoSrc` arrives after the selection has rested for a moment, so scrolling doesn't thrash the player.
// Until then, and always under reduced motion, the clip's own still frame stands in.
const props = defineProps<{ game: Game, videoSrc: string | null }>()
const playing = ref(false)
watch(() => props.videoSrc, () => (playing.value = false))
</script>

<template>
  <section class="preview" aria-live="polite" :aria-label="`${game.title} preview`">
    <div class="screen">
      <img class="still" :src="game.video.poster" alt="" width="640" height="480">
      <video
        v-if="videoSrc"
        :key="videoSrc"
        class="video"
        :class="{ playing }"
        :src="videoSrc"
        :poster="game.video.poster"
        autoplay
        muted
        loop
        playsinline
        aria-hidden="true"
        @playing="playing = true"
      />
      <span v-if="game.video.sample" class="label">Sample clip</span>
    </div>

    <h2 class="title">{{ game.title }}</h2>
    <p class="meta">
      <span class="mono">{{ game.year }}</span><span class="sep" aria-hidden="true">·</span>{{ game.genre }}<span class="sep" aria-hidden="true">·</span>{{ game.players }}<template v-if="game.minutesPlayed">
        <span class="sep" aria-hidden="true">·</span>Played <span class="mono">{{ formatPlaytime(game.minutesPlayed) }}</span>
      </template>
    </p>
    <p class="description">{{ game.description }}</p>
  </section>
</template>

<style scoped>
.preview {
  position: absolute;
  left: 1048px;
  top: 140px;
  width: 776px;
}

.screen {
  position: relative;
  width: 776px;
  height: 582px;
  overflow: hidden;
  background: var(--surface);
}

/* A drawn edge, so the frame holds its shape when a clip's ground matches the page. */
.screen::after {
  content: "";
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 0 1px var(--line-strong);
  pointer-events: none;
}

.still,
.video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video {
  opacity: 0;
  transition: opacity 200ms var(--ease-out);
}

.video.playing {
  opacity: 1;
}

.label {
  position: absolute;
  left: var(--space-4);
  top: var(--space-4);
  height: 30px;
  display: inline-flex;
  align-items: center;
  padding: 0 var(--space-2);
  border-radius: var(--radius-none);
  background: var(--ground);
  box-shadow: inset 0 0 0 1.5px var(--line-strong);
  color: var(--ink-muted);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.title {
  margin-top: var(--space-8);
  font-size: 44px;
  line-height: 48px;
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta {
  margin-top: var(--space-2);
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--ink-muted);
}

.meta .mono {
  letter-spacing: 0;
}

.sep {
  margin: 0 0.5em;
}

.description {
  margin-top: var(--space-4);
  max-width: 62ch;
  font-size: 22px;
  line-height: 32px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (prefers-reduced-motion: reduce) {
  .video {
    transition: none;
  }
}
</style>
