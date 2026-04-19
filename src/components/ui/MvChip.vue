<template>
  <span class="mv-chip" :class="variant">
    <slot />
  </span>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'default' }, // 'default' | 'muted' | 'accent'
})
</script>

<style scoped>
.mv-chip {
  font-size: 11px;
  font-weight: 600;
  border-radius: 20px;
  padding: 4px 12px;
  letter-spacing: 0.3px;
  white-space: nowrap;
  font-family: 'Exo 2', sans-serif;
}
.default {
  color: #a855f7;
  background: rgba(109, 40, 217, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.25);
}
.muted {
  color: #c084fc;
  background: rgba(109, 40, 217, 0.12);
  border: 1px solid rgba(168, 85, 247, 0.15);
}
.accent {
  color: #e879f9;
  background: rgba(192, 38, 211, 0.2);
  border: 1px solid rgba(232, 121, 249, 0.3);
  animation: chipPulse 3s ease-in-out infinite;
}
@keyframes chipPulse {
  0%,
  100% {
    box-shadow: 0 0 0 rgba(232, 121, 249, 0);
  }
  50% {
    box-shadow: 0 0 10px rgba(232, 121, 249, 0.3);
  }
}
</style>
