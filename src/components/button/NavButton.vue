<script setup>
defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
  text: {
    type: String,
    default: 'Next',
  },
})
</script>

<template>
  <router-link :to="to">
    <div class="navButton">{{ text }}</div>
  </router-link>
</template>

<style>
.navButton {
  font-family: url('@assets/fonts/bernoru/bernoru.otf');

  display: inline-block;
  padding: 0.5rem 2rem;
  background-color: #ffffff;
  color: rgb(255, 0, 221);
  border-radius: 100px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;

  filter: drop-shadow(0 0 5px #ffffff) drop-shadow(0 0 10px #ffffff);
}

.navButton:hover {
  background-color: #9333ea;
  color: rgb(255, 255, 255);
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 5px #9333ea) drop-shadow(0 0 10px #9333ea);
}
</style>
