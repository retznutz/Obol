<script setup lang="ts">
import type { GameInfo } from '~/types/game'

const route = useRoute()
const url = computed(() => `/api/games/${route.params.system}/${route.params.id}`)
const { data: game, error } = await useFetch<GameInfo>(url)

const controls = ref('')

useHead({ title: () => (game.value ? `${game.value.title} · Obol` : 'Obol') })
</script>

<template>
  <div class="play">
    <header class="play__bar">
      <NuxtLink to="/" class="back">← Games</NuxtLink>
      <h1 v-if="game">{{ game.title }}</h1>
      <span class="system">{{ route.params.system }}</span>
    </header>

    <main class="play__stage">
      <p v-if="error" class="missing" role="alert">
        {{ error.statusCode === 404 ? 'No such game.' : "Couldn't load this game." }}
      </p>
      <!-- Keyed so moving between games always tears down the old instance. -->
      <GameStage v-else-if="game" :key="game.scriptUrl" :game="game" @controls="controls = $event" />
    </main>

    <footer class="play__help">
      <span v-if="controls">{{ controls }}</span>
      <span><kbd>P</kbd> pause · <kbd>F3</kbd> reset</span>
    </footer>
  </div>
</template>

<style scoped>
.play {
  height: 100dvh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.play__bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--line);
}

.play__bar h1 {
  margin: 0;
  font-size: 1rem;
  text-transform: capitalize;
}

.back {
  text-decoration: none;
  color: var(--fg-dim);
}

.back:hover {
  color: var(--fg);
}

.system {
  margin-left: auto;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--fg-dim);
}

.play__stage {
  /* GameStage sizes its 16:9 box against this container. */
  container-type: size;
  min-height: 0;
  display: grid;
  place-items: center;
}

.missing {
  color: var(--danger);
}

.play__help {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25rem 1.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  color: var(--fg-dim);
}

kbd {
  padding: 0 0.3rem;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--panel);
  color: var(--fg);
  font-size: 0.75rem;
}
</style>
