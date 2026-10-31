<script setup lang="ts">
import type { Hint } from '~/composables/useControls'

defineProps<{ hints: Hint[] }>()
const device = useInputDevice()

const KEY_LABELS = { confirm: 'Enter', back: 'Esc', move: 'Arrows' } as const
const PAD_LABELS = { confirm: 'A', back: 'B' } as const
const SWITCH_LABELS = { keyboard: ['PgUp', 'PgDn'], gamepad: ['LB', 'RB'] } as const
</script>

<template>
  <div class="hints" role="note" aria-label="Controls">
    <span v-for="hint in hints" :key="hint.input" class="hint" :class="{ end: hint.input === 'switch' }">
      <template v-if="hint.input === 'switch'">
        <span v-for="label in SWITCH_LABELS[device]" :key="label" class="glyph key">{{ label }}</span>
      </template>
      <template v-else-if="device === 'keyboard'">
        <span class="glyph key" :class="{ confirm: hint.input === 'confirm' }">{{ KEY_LABELS[hint.input] }}</span>
      </template>
      <template v-else-if="hint.input === 'move'">
        <span class="glyph" aria-label="D-pad">
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M7 1h6v6h6v6h-6v6H7v-6H1V7h6z" fill="currentColor" />
          </svg>
        </span>
      </template>
      <template v-else>
        <span class="glyph" :class="{ confirm: hint.input === 'confirm' }">{{ PAD_LABELS[hint.input] }}</span>
      </template>
      {{ hint.label }}
    </span>
  </div>
</template>

<style scoped>
.hints {
  position: absolute;
  left: var(--safe-x);
  right: var(--safe-x);
  bottom: var(--safe-y);
  z-index: 11;
  display: flex;
  align-items: center;
  gap: var(--space-8);
}

.hint {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.hint.end {
  margin-left: auto;
}

.glyph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--glyph);
  height: var(--glyph);
  flex: none;
  border-radius: var(--radius-full);
  background: var(--surface-raised);
  color: var(--ink);
  box-shadow: inset 0 0 0 2px var(--line-strong);
  font-size: 18px;
  line-height: 1;
  font-weight: 700;
}

/* Keys and shoulder buttons are square-cut slabs; only face buttons and the d-pad are discs. */
.glyph.key {
  width: auto;
  min-width: var(--glyph);
  padding: 0 var(--space-3);
  border-radius: var(--radius-none);
  font-size: 16px;
  letter-spacing: 0.02em;
}

.glyph.confirm {
  background: var(--accent);
  color: var(--on-accent);
  box-shadow: none;
}
</style>
