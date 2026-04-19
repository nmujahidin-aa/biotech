<template>
  <MvBackground>
    <MvCard>
      <div class="card-scroll">
        <div class="content-wrap">
          <div class="news-page">
            <!-- ===== LIST VIEW ===== -->
            <transition name="slide-fade" mode="out-in">
              <div v-if="!activeNews" key="list" class="list-view">
                <!-- Header -->
                <div class="page-header">
                  <p class="header-eyebrow">Malang Biotech Meteverse</p>
                  <h1 class="header-title">What happened about Malang's Biotech Today?</h1>
                  <p class="header-sub">
                    Tetap terhubung dengan informasi terkini dari dunia pembelajaran digital
                  </p>
                  <div class="header-line"></div>
                </div>

                <!-- Featured (first item) -->
                <!-- <div class="featured-wrap" @click="open(newsList[0])">
                  <div class="featured-img-wrap">
                    <img
                      v-if="newsList[0].image"
                      :src="newsList[0].image"
                      :alt="newsList[0].title"
                      class="featured-img"
                    />
                    <div v-else class="featured-img-empty"></div>
                    <div class="featured-overlay"></div>
                    <MvChip variant="accent" class="featured-badge">{{ newsList[0].tag }}</MvChip>
                  </div>
                  <div class="featured-body">
                    <div class="featured-meta">
                      <span class="meta-date">{{ newsList[0].date }}</span>
                      <span class="meta-sep">·</span>
                      <span class="meta-author">{{ newsList[0].author }}</span>
                      <MvChip class="meta-chip-read">{{ newsList[0].readTime }}</MvChip>
                    </div>
                    <h2 class="featured-title">{{ newsList[0].title }}</h2>
                    <p class="featured-desc">
                      {{ truncate(newsList[0].blocks) }}
                      <span class="read-more">Baca selengkapnya →</span>
                    </p>
                  </div>
                </div> -->

                <!-- Horizontal card list -->
                <div class="card-list">
                  <NewsCard
                    v-for="item in newsList.slice()"
                    :key="item.id"
                    :news="item"
                    @click="open(item)"
                  />
                </div>
              </div>
            </transition>

            <!-- ===== DETAIL VIEW ===== -->
            <transition name="slide-fade" mode="out-in">
              <NewsDetail
                v-if="activeNews"
                key="detail"
                :news="activeNews"
                :related="related"
                @back="close"
                @navigate="open"
              />
            </transition>
          </div>
        </div>
      </div>
    </MvCard>
  </MvBackground>
  <footer class="footer">
    <NavButton to="/" text="Back" />
    <NavButton to="/material" text="Next" />
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { newsList } from '@/presentation/constant/data/news_data'

import MvBackground from '@/components/ui/MvBackground.vue'
import MvChip from '@/components/ui/MvChip.vue'
import NewsCard from '@/components/card/NewsCard.vue'
import NewsDetail from '@/components/ui/NewsDetail.vue'

import NavButton from '@/components/button/NavButton.vue'
import MvCard from '@/components/ui/MvCard.vue'

const activeNews = ref(null)

const related = computed(() => newsList.filter((n) => n.id !== activeNews.value?.id).slice(0, 4))

const truncate = (blocks) => {
  const first = blocks?.find((b) => b.type === 'p')
  if (!first) return ''
  return first.value.length > 200 ? first.value.slice(0, 200) + '... ' : first.value + ' '
}

const open = (item) => {
  activeNews.value = item
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const close = () => {
  activeNews.value = null
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&family=Exo+2:wght@400;500;600&display=swap');

.card-scroll {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  padding: 28px 36px;
}
.card-scroll::-webkit-scrollbar {
  width: 0;
}
.content-wrap {
  text-align: justify;
}

.news-page {
  width: 100%;
  /* max-width: 1100px; */
  padding: 60px 0 80px;
  position: relative;
  z-index: 1;
}

/* ===========================
   LIST VIEW
=========================== */
.list-view {
  width: 100%;
}

/* Header */
.page-header {
  margin-bottom: 40px;
}

.header-eyebrow {
  font-family: 'Rajdhani', sans-serif;
  font-size: 11px;
  letter-spacing: 3px;
  color: #a855f7;
  text-transform: uppercase;
  margin: 0 0 10px;
}

.header-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 42px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 10px;
  text-shadow: 0 0 40px rgba(168, 85, 247, 0.3);
  line-height: 1.1;
}

.header-sub {
  font-family: 'Exo 2', sans-serif;
  font-size: 15px;
  color: #9d7ec0;
  margin: 0 0 24px;
  max-width: 500px;
  line-height: 1.6;
}

.header-line {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #7c3aed, #c084fc, transparent);
  border-radius: 2px;
}

/* Featured */
.featured-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(168, 85, 247, 0.18);
  background: rgba(22, 6, 44, 0.55);
  backdrop-filter: blur(14px);
  cursor: pointer;
  margin-bottom: 28px;
  transition:
    border-color 0.25s,
    box-shadow 0.25s,
    transform 0.25s;
}

.featured-wrap:hover {
  border-color: rgba(168, 85, 247, 0.45);
  box-shadow: 0 16px 48px rgba(109, 40, 217, 0.25);
  transform: translateY(-3px);
}

.featured-img-wrap {
  position: relative;
  min-height: 280px;
  overflow: hidden;
}

.featured-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.featured-wrap:hover .featured-img {
  transform: scale(1.04);
}
.featured-img-empty {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a0030, #0e0020);
}

.featured-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.3) 0%, transparent 60%);
}

.featured-badge {
  position: absolute;
  top: 16px;
  left: 16px;
}

.featured-body {
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.featured-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.meta-date,
.meta-author {
  font-family: 'Exo 2', sans-serif;
  font-size: 12px;
  color: rgba(168, 85, 247, 0.6);
}

.meta-sep {
  color: rgba(168, 85, 247, 0.3);
}

.meta-chip-read {
  margin-left: auto;
}

.featured-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #f3e8ff;
  line-height: 1.25;
  margin: 0;
}

.featured-desc {
  font-family: 'Exo 2', sans-serif;
  font-size: 13px;
  color: #9d7ec0;
  line-height: 1.7;
  margin: 0;
}

.read-more {
  color: #a855f7;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}

/* Card list */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* ===========================
   PAGE TRANSITION
=========================== */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(24px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-24px);
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

/* ===========================
   RESPONSIVE
=========================== */
@media (max-width: 900px) {
  .featured-wrap {
    grid-template-columns: 1fr;
  }
  .featured-img-wrap {
    min-height: 200px;
  }
  .featured-body {
    padding: 20px;
  }
  .header-title {
    font-size: 30px;
  }
}
</style>
