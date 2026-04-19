<script setup>
import NavButton from '@/components/button/NavButton.vue'
import NewsCard from '@/components/card/NewsCard.vue'
</script>

<template>
  <NewsCard
    title="Berita Bioteknologi Terkini"
    content="Dapatkan update terbaru tentang perkembangan bioteknologi, inovasi, dan penemuan menarik di dunia bioteknologi."
  />

  <footer class="footer">
    <NavButton to="/" text="Back" />
    <NavButton to="/material" text="Next" />
  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}
</style>
