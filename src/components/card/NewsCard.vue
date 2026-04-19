<template>
  <div class="news-card" @click="$emit('click')">
    <!-- Image -->
    <div class="card-img-wrap">
      <img v-if="news.image" :src="news.image" :alt="news.title" class="card-img" />
      <div v-else class="card-img-empty">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(168,85,247,0.5)"
          stroke-width="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M7 8h10M7 12h10M7 16h6" />
        </svg>
      </div>
      <div class="img-overlay"></div>
    </div>

    <!-- Body -->
    <div class="card-body">
      <div class="card-top">
        <MvChip variant="accent">{{ news.category }}</MvChip>
        <span class="card-date">{{ news.date }}</span>
        <span class="card-read">{{ news.readTime }}</span>
      </div>
      <h3 class="card-title">{{ news.title }}</h3>
      <p class="card-desc">{{ truncate(news.blocks) }}</p>
      <div class="card-footer">
        <span class="card-author">{{ news.author }}</span>
        <span class="read-more">Baca selengkapnya <span class="arrow">→</span></span>
      </div>
    </div>

    <!-- Right glow line -->
    <div class="card-accent-line"></div>
  </div>
</template>

<script setup>
import MvChip from '@/components/ui/MvChip.vue'

defineProps({ news: { type: Object, required: true } })
defineEmits(['click'])

const truncate = (blocks) => {
  const first = blocks?.find((b) => b.type === 'p')
  if (!first) return ''
  return first.value.length > 160 ? first.value.slice(0, 160) + '...' : first.value
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&family=Exo+2:wght@400;500;600&display=swap');

.news-card {
  display: flex;
  align-items: stretch;
  border-radius: 14px;
  overflow: hidden;
  background: rgba(22, 6, 44, 0.6);
  border: 1px solid rgba(168, 85, 247, 0.15);
  backdrop-filter: blur(12px);
  cursor: pointer;
  position: relative;
  transition:
    transform 0.25s,
    border-color 0.25s,
    box-shadow 0.25s;
}

.news-card:hover {
  transform: translateX(6px);
  border-color: rgba(168, 85, 247, 0.45);
  box-shadow:
    -4px 0 0 #7c3aed,
    0 8px 32px rgba(109, 40, 217, 0.25);
}

/* Image */
.card-img-wrap {
  position: relative;
  width: 200px;
  flex-shrink: 0;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}

.news-card:hover .card-img {
  transform: scale(1.06);
}

.card-img-empty {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a0030, #0e0020);
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 60%, rgba(22, 6, 44, 0.8));
}

/* Body */
.card-body {
  flex: 1;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.card-top {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.card-date,
.card-read {
  font-family: 'Exo 2', sans-serif;
  font-size: 11px;
  color: rgba(168, 85, 247, 0.55);
}

.card-read {
  margin-left: auto;
  background: rgba(109, 40, 217, 0.15);
  border: 1px solid rgba(109, 40, 217, 0.2);
  border-radius: 20px;
  padding: 2px 8px;
}

.card-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: #f3e8ff;
  margin: 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-desc {
  font-family: 'Exo 2', sans-serif;
  font-size: 13px;
  color: #9d7ec0;
  line-height: 1.65;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid rgba(109, 40, 217, 0.12);
}

.card-author {
  font-family: 'Exo 2', sans-serif;
  font-size: 12px;
  color: #7c3aed;
  font-weight: 500;
}

.read-more {
  font-family: 'Exo 2', sans-serif;
  font-size: 12px;
  color: rgba(168, 85, 247, 0.6);
  font-weight: 500;
  transition: color 0.2s;
}

.news-card:hover .read-more {
  color: #c084fc;
}

.arrow {
  display: inline-block;
  transition: transform 0.2s;
}

.news-card:hover .arrow {
  transform: translateX(4px);
}

/* Left accent line on hover */
.card-accent-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, #7c3aed, #c084fc, #0ea5e9);
  opacity: 0;
  transition: opacity 0.25s;
}

.news-card:hover .card-accent-line {
  opacity: 1;
}

/* Responsive */
@media (max-width: 600px) {
  .card-img-wrap {
    width: 110px;
  }
  .card-title {
    font-size: 14px;
  }
  .card-desc {
    display: none;
  }
}
</style>
