<script setup lang="ts">
import type { GameInfo } from '~/types/game'

const { data: games, status, error } = await useFetch<GameInfo[]>('/api/games', { default: () => [] })

const systems = computed(() => {
  const bySystem = new Map<string, GameInfo[]>()
  for (const game of games.value) {
    bySystem.set(game.system, [...(bySystem.get(game.system) ?? []), game])
  }
  return [...bySystem].map(([name, list]) => ({ name, games: list }))
})

useHead({ title: 'Obol' })
</script>

<template>
  <main class="library">
    <header class="library__header">
      <h1>Obol</h1>
      <p>{{ games.length }} {{ games.length === 1 ? 'game' : 'games' }}</p>
    </header>

    <p v-if="status === 'pending'" class="note">Loading games…</p>
    <p v-else-if="error" class="note note--error" role="alert">
      Couldn't reach the game API. Is Obol.Api running?
    </p>
    <p v-else-if="!games.length" class="note">
      No games found. Add <code>&lt;name&gt;.mjs</code> + <code>&lt;name&gt;.wasm</code> pairs under <code>games/&lt;system&gt;/</code>.
    </p>

    <section v-for="system in systems" :key="system.name" class="system" :aria-labelledby="`system-${system.name}`">
      <h2 :id="`system-${system.name}`">{{ system.name }}</h2>
      <ul class="grid">
        <li v-for="game in system.games" :key="game.id">
          <NuxtLink class="card" :to="`/play/${game.system}/${game.id}`">
            <span class="card__title">{{ game.title }}</span>
            <span class="card__meta">{{ game.id }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.library {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem;
}

.library__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid var(--line);
  margin-bottom: 1.5rem;
}

.library__header h1 {
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}

.library__header p {
  margin: 0;
  color: var(--fg-dim);
}

.system h2 {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg-dim);
  margin: 0 0 0.75rem;
}

.grid {
  list-style: none;
  margin: 0 0 2rem;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));
  gap: 0.75rem;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.25rem;
  aspect-ratio: 4 / 3;
  padding: 1rem;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--panel);
  text-decoration: none;
  transition: border-color 0.15s, transform 0.15s;
}

.card:hover,
.card:focus-visible {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.card__title {
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: capitalize;
}

.card__meta {
  font-size: 0.8rem;
  color: var(--fg-dim);
}

.note {
  color: var(--fg-dim);
}

.note--error {
  color: var(--danger);
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}
</style>
