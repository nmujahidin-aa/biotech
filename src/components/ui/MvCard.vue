<template>
  <div class="mv-card" :style="cardStyle">
    <div class="glow-border"></div>
    <div class="card-inner">
      <div class="scan-line"></div>
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  width: { type: String, default: '80vw' },
  height: { type: String, default: '90vh' },
})
</script>

<script>
export default {
  computed: {
    cardStyle() {
      return { width: this.width, height: this.height }
    },
  },
}
</script>

<style scoped>
.mv-card {
  position: relative;
  border-radius: 24px;
  background: rgba(30, 8, 55, 0.55);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(168, 85, 247, 0.2);
  box-shadow:
    0 0 0 1px rgba(109, 40, 217, 0.1),
    0 32px 80px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.glow-border {
  position: absolute;
  inset: -1px;
  border-radius: 24px;
  background: linear-gradient(135deg, #7c3aed, #c084fc, #0ea5e9, #c084fc, #7c3aed);
  background-size: 300% 300%;
  animation: borderGlow 6s ease infinite;
  z-index: -1;
  opacity: 0.5;
}

.card-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(18, 4, 38, 0.6);
  border-radius: 23px;
  overflow: hidden;
}

.scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(192, 132, 252, 0.4), transparent);
  animation: scanAnim 5s ease-in-out infinite;
  pointer-events: none;
  z-index: 10;
}

@keyframes borderGlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes scanAnim {
  0% {
    top: 0%;
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}
</style>
