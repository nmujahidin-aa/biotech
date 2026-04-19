<template>
  <div class="mv-divider" :class="variant"></div>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'default' },
})
</script>

<style scoped>
.mv-divider {
  height: 1px;
  margin: 20px 0;
}
.default {
  background: linear-gradient(90deg, rgba(109, 40, 217, 0.7), rgba(14, 165, 233, 0.4), transparent);
}
.subtle {
  background: linear-gradient(90deg, rgba(109, 40, 217, 0.3), transparent);
}
.cyan {
  background: linear-gradient(90deg, rgba(14, 165, 233, 0.6), rgba(109, 40, 217, 0.3), transparent);
}
</style>
