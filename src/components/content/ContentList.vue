<template>
  <component
    :is="ordered ? 'ol' : 'ul'"
    class="mv-list"
    :type="ordered ? tipe : null"
    :class="{ ordered }"
  >
    <li v-for="(item, i) in items" :key="i" v-html="item"></li>
  </component>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
  ordered: { type: Boolean, default: false },
  tipe: { type: String, default: 'a' },
})
</script>

<style scoped>
.mv-list {
  padding-left: 22px;
  margin: 0 0 14px;
  font-family: 'Exo 2', sans-serif;
  font-size: 15px;
  line-height: 1.85;
}
.mv-list li {
  color: #c4a8e0;
  margin-bottom: 6px;
  padding-left: 4px;
}
.mv-list:not(.ordered) li::marker {
  color: #7c3aed;
}
.mv-list.ordered li::marker {
  color: #7c3aed;
  font-weight: 600;
}
</style>
