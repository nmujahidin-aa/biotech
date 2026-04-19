<template>
  <blockquote class="mv-quote">
    <p class="quote-text"><slot /></p>
    <cite v-if="author" class="quote-author">— {{ author }}</cite>
  </blockquote>
</template>

<script setup>
defineProps({
  author: { type: String, default: '' },
})
</script>

<style scoped>
.mv-quote {
  border-left: 3px solid #7c3aed;
  padding: 14px 20px;
  margin: 20px 0;
  background: rgba(109, 40, 217, 0.1);
  border-radius: 0 10px 10px 0;
}
.quote-text {
  color: #a78bfa;
  font-style: italic;
  font-size: 15px;
  line-height: 1.7;
  margin: 0;
  font-family: 'Exo 2', sans-serif;
}
.quote-author {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  color: rgba(168, 85, 247, 0.6);
  font-style: normal;
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: 1px;
}
</style>
