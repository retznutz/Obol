<script setup lang="ts">
// The logo's sun: five hard bands, top to bottom. `cut` draws the slot through it in that colour.
defineProps<{ cut?: string }>()
</script>

<template>
  <span class="sun" :class="{ 'has-cut': cut }" :style="cut ? { '--cut': cut } : undefined" aria-hidden="true" />
</template>

<style scoped>
.sun {
  position: relative;
  display: block;
  aspect-ratio: 1;
  border-radius: var(--radius-full);
  background: linear-gradient(
    to bottom,
    var(--sunset-1) 0 20%,
    var(--sunset-2) 20% 40%,
    var(--sunset-3) 40% 60%,
    var(--sunset-4) 60% 80%,
    var(--sunset-5) 80% 100%
  );
}

.has-cut::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: var(--slot);
  margin-left: calc(var(--slot) / -2);
  background: var(--cut);
}
</style>
