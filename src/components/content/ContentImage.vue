<template>
  <figure class="mv-figure">
    <img :src="src" :alt="alt" class="mv-img" :width="width" />
    <figcaption v-if="caption" class="mv-caption">{{ caption }}</figcaption>
    <figcaption v-if="source" class="mv-source" v-html="source"></figcaption>
  </figure>
</template>

<script setup>
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  caption: { type: String, default: '' },
  source: { type: String, default: '' },
  width: { type: [String, Number], default: '100%' },
})
</script>

<style scoped>
.mv-figure {
  margin: 16px 0;
}
.mv-img {
  border-radius: 12px;
  border: 1px solid rgba(168, 85, 247, 0.25);
  display: flex;
  justify-self: center;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(109, 40, 217, 0.15);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}
.mv-img:hover {
  transform: scale(1.01);
  box-shadow: 0 12px 40px rgba(109, 40, 217, 0.3);
}
.mv-caption {
  font-size: 12px;
  color: rgb(231, 208, 252);
  text-align: center;
  margin-top: 8px;
  /* font-style: italic; */
  font-family: 'Exo 2', sans-serif;
}
.mv-source {
  text-align: center;
  font-size: 11px;
  color: #aaa;
  margin-top: 4px;
}
</style>
