<template>
  <component v-if="tag !== 'p'" :is="tag" class="mv-heading" :class="tag">
    <slot />
  </component>

  <p v-else class="mv-paragraph">
    <slot />
  </p>
</template>

<script setup>
defineProps({
  tag: { type: String, default: 'p' },
})
</script>

<style scoped>
.mv-paragraph {
  color: #c4a8e0;
  font-family: 'Exo 2', sans-serif;
  font-size: 15px;
  line-height: 1.85;
  margin: 0 0 14px;
}
.mv-heading {
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  margin: 0 0 12px;
  line-height: 1.2;
}
.h1 {
  font-size: 28px;
  color: #fff;
  text-shadow: 0 0 20px rgba(192, 132, 252, 0.3);
}
.h2 {
  font-size: 21px;
  color: #e9d5ff;
  margin-top: 28px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(109, 40, 217, 0.3);
}
.h3 {
  font-size: 17px;
  color: #c084fc;
  margin-top: 20px;
}
</style>
