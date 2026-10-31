<script setup lang="ts">
// Obol is laid out on a fixed 1920 x 1080 canvas and scaled as a whole to fit the screen.
const scale = ref(1)
const ready = ref(false)
const fit = () => {
  scale.value = Math.min(window.innerWidth / 1920, window.innerHeight / 1080)
}

onMounted(() => {
  fit()
  ready.value = true
  window.addEventListener('resize', fit)
})
onBeforeUnmount(() => window.removeEventListener('resize', fit))
</script>

<template>
  <div class="stage">
    <div class="canvas" :class="{ ready }" :style="{ transform: `translate(-50%, -50%) scale(${scale})` }">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.stage {
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: var(--ground);
}

.canvas {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 1920px;
  height: 1080px;
  transform-origin: center;
  visibility: hidden;
}

.canvas.ready {
  visibility: visible;
}
</style>
