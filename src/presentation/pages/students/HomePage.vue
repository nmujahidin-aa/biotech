<script setup>
import NavButton from '@/components/button/NavButton.vue'
import MetaverseCard from '@/components/card/MetaverseCard.vue'
import { introData, exploreData, featuresData } from '@/presentation/constant/data/home_data.js'
</script>

<template>
  <div class="home">
    <img src="@/assets/images/title.png" alt="title" class="title" />

    <div class="menu">
      <MetaverseCard
        card-title="Pengenalan Web"
        card-subtitle="Memahami dasar platform dan cara penggunaannya"
        :modal-data="introData"
      />
      <MetaverseCard
        card-title="Eksplorasi"
        card-subtitle="Menjelajahi materi dan fitur yang tersedia"
        :modal-data="exploreData"
      />
      <MetaverseCard
        card-title="Fitur Unggulan"
        card-subtitle="Mengenal fitur utama yang mendukung pembelajaran"
        :modal-data="featuresData"
      />
    </div>

    <NavButton to="/news" text="Here We Go" />
  </div>
</template>

<style>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
  text-align: center;
}

.title {
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
}

.home :deep(.navButton) {
  margin-top: 10px;
}

@media (min-width: 768px) {
  .menu {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
}

@media (max-width: 767px) {
  .menu {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
}
</style>
