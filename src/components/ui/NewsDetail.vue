<template>
  <div class="detail-page">
    <!-- Back -->
    <button class="back-btn" @click="$emit('back')"><span>←</span> Kembali ke Berita</button>

    <div class="detail-layout">
      <!-- Article -->
      <article class="detail-article">
        <!-- Hero -->
        <div class="detail-hero">
          <img v-if="news.image" :src="news.image" :alt="news.title" class="hero-img" />
          <div v-else class="hero-empty"></div>
          <div class="hero-overlay"></div>
          <MvChip variant="accent" class="hero-badge">{{ news.category }}</MvChip>
        </div>

        <!-- Article body wrapped in MvCard -->
        <MvCard width="100%" height="auto" class="article-card">
          <div class="article-inner">
            <div class="scan-line"></div>

            <!-- Meta -->
            <div class="article-meta">
              <span class="meta-date">{{ news.date }}</span>
              <span class="meta-sep">·</span>
              <span class="meta-author">{{ news.author }}</span>
              <span class="meta-sep">·</span>
              <MvChip>{{ news.readTime }}</MvChip>
            </div>

            <!-- Title -->
            <h1 class="article-title">{{ news.title }}</h1>

            <MvDivider />

            <!-- Dynamic blocks -->
            <template v-for="(block, i) in news.blocks" :key="i">
              <ContentText v-if="block.type === 'h1'" tag="h1">{{ block.value }}</ContentText>
              <ContentText v-else-if="block.type === 'h2'" tag="h2">{{ block.value }}</ContentText>
              <ContentText v-else-if="block.type === 'h3'" tag="h3">{{ block.value }}</ContentText>
              <ContentText v-else-if="block.type === 'p'">{{ block.value }}</ContentText>
              <ContentImage
                v-else-if="block.type === 'image'"
                :src="block.src"
                :alt="block.alt"
                :caption="block.caption"
              />
              <ContentTable
                v-else-if="block.type === 'table'"
                :headers="block.headers"
                :rows="block.rows"
              />
              <ContentCode
                v-else-if="block.type === 'code'"
                :code="block.value"
                :language="block.language"
              />
              <ContentQuote v-else-if="block.type === 'quote'" :author="block.author">{{
                block.value
              }}</ContentQuote>
              <ContentList
                v-else-if="block.type === 'list'"
                :items="block.items"
                :ordered="block.ordered"
              />
              <MvDivider v-else-if="block.type === 'divider'" :variant="block.variant" />
            </template>
          </div>
        </MvCard>
      </article>

      <!-- Sidebar -->
      <NewsSidebar :items="related" @select="$emit('navigate', $event)" />
    </div>
  </div>
</template>

<script setup>
import MvCard from '../../components/ui/MvCard.vue'
import MvChip from '../../components/ui/MvChip.vue'
import MvDivider from '../../components/ui/MvDivider.vue'
import ContentText from '../../components/content/ContentText.vue'
import ContentImage from '../../components/content/ContentImage.vue'
import ContentTable from '../../components/content/ContentTable.vue'
import ContentCode from '../../components/content/ContentCode.vue'
import ContentQuote from '../../components/content/ContentQuote.vue'
import ContentList from '../../components/content/ContentList.vue'
import NewsSidebar from './NewsSidebar.vue'

defineProps({
  news: { type: Object, required: true },
  related: { type: Array, default: () => [] },
})

defineEmits(['back', 'navigate'])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&family=Exo+2:wght@400;500;600&display=swap');

.detail-page {
  width: 100%;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(109, 40, 217, 0.15);
  border: 1px solid rgba(168, 85, 247, 0.25);
  border-radius: 30px;
  padding: 8px 18px;
  font-family: 'Exo 2', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #c084fc;
  cursor: pointer;
  margin-bottom: 28px;
  transition:
    background 0.2s,
    transform 0.2s;
}

.back-btn:hover {
  background: rgba(109, 40, 217, 0.3);
  transform: translateX(-3px);
}

/* Layout: article + sidebar */
.detail-layout {
  display: flex;
  gap: 28px;
  align-items: flex-start;
}

.detail-article {
  flex: 1;
  min-width: 0;
}

/* Hero */
.detail-hero {
  position: relative;
  height: 320px;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-empty {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a0030, #0e0020);
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(18, 4, 38, 0.95) 100%);
}

.hero-badge {
  position: absolute;
  top: 16px;
  left: 16px;
}

/* Article card */
.article-card {
  border-radius: 0 0 16px 16px !important;
  border-top: none !important;
}

.article-inner {
  position: relative;
  padding: 28px 32px 36px;
  overflow: hidden;
}

.scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(192, 132, 252, 0.35), transparent);
  animation: scanAnim 5s ease-in-out infinite;
  pointer-events: none;
}

@keyframes scanAnim {
  0% {
    top: 0%;
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
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

.article-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  margin: 0 0 20px;
  text-shadow: 0 0 30px rgba(168, 85, 247, 0.25);
}

/* Sidebar hidden on mobile */
@media (max-width: 900px) {
  .detail-layout {
    flex-direction: column;
  }
  aside {
    width: 100% !important;
  }
  .detail-hero {
    height: 220px;
  }
  .article-title {
    font-size: 24px;
  }
  .article-inner {
    padding: 20px 18px 28px;
  }

  /* Layout: article + sidebar */
  .detail-layout {
    display: flex;
    gap: 28px;
    align-items: flex-start;
    flex-direction: row; /* Default PC */
  }

  .detail-article {
    flex: 1;
    min-width: 0; /* Mencegah konten overflow break layout */
  }

  /* Sidebar khusus PC */
  .detail-layout > :deep(aside),
  .detail-layout > .news-sidebar {
    width: 320px; /* Tentukan lebar sidebar di PC */
    flex-shrink: 0;
  }

  .detail-layout {
    flex-direction: column; /* Ubah ke tumpukan vertikal */
    gap: 40px; /* Beri jarak lebih besar antara berita dan sidebar di bawah */
  }

  .detail-article {
    width: 100%; /* Pastikan artikel selebar layar */
  }

  /* Memastikan Sidebar mengambil lebar penuh saat di bawah */
  .detail-layout > :deep(aside),
  .detail-layout > .news-sidebar {
    width: 100% !important;
    flex: none;
  }
}
</style>
