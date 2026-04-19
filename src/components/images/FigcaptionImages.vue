<script setup>
defineProps({
  imagesWithCapt: {
    src: String,
    alt: String,
    caption: String,
    source: String,
  },
})
</script>

<template>
  <img :src="imagesWithCapt.src" :alt="imagesWithCapt.alt" class="images" />
  <figcaption class="caption" v-html="imagesWithCapt.caption"></figcaption>
  <figcaption class="source" v-html="imagesWithCapt.source"></figcaption>
</template>

<style>
.images {
  width: 100%;
  border-radius: 8px;
  margin: 16px 0;
}
.caption {
  text-align: center;
  font-size: 14px;
  color: #aaa;
}
.source {
  text-align: center;
  font-size: 12px;
  color: #aaa;
  margin-top: 4px;
}
</style>
