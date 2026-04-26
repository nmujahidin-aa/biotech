<template>
  <aside class="sidebar">
    <!-- ===== VIDEO SECTION ===== -->
    <div v-if="videos && videos.length" class="video-section">
      <!-- Header -->
      <div class="sidebar-header">
        <div class="sidebar-dot red"></div>
        <span class="sidebar-label">Related Videos</span>
        <span class="video-count">{{ videos.length }} video</span>
      </div>

      <!-- Thumbnail card -->
      <div class="video-thumb-card" @click="$emit('openVideo')">
        <!-- GDrive thumbnail dari video pertama -->
        <div class="vt-img-wrap">
          <img
            :src="`https://drive.google.com/thumbnail?id=${videos[0]}&sz=w640`"
            alt="Video thumbnail"
            class="vt-img"
            @error="thumbError"
          />
          <div class="vt-overlay">
            <!-- Play button -->
            <div class="vt-play">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
            <!-- Video count badge -->
            <div class="vt-badge" v-if="videos.length > 1">
              +{{ videos.length - 1 }} video lainnya
            </div>
          </div>
          <!-- Scan line effect -->
          <div class="vt-scan"></div>
        </div>

        <!-- NavButton -->
        <!-- <NavButton
          text="Tonton Video"
          icon="play"
          class="vt-nav-btn"
          @click.stop="$emit('openVideo')"
        /> -->
        <!-- <div>Tonton Video</div> -->
      </div>
    </div>

    <!-- ===== RELATED INTELLIGENCE ===== -->
    <div class="sidebar-header">
      <div class="sidebar-dot"></div>
      <span class="sidebar-label">Related Intelligence</span>
    </div>

    <div class="sidebar-list">
      <div v-for="item in items" :key="item.id" class="sidebar-item" @click="$emit('select', item)">
        <div class="si-img-wrap">
          <img v-if="item.image" :src="item.image" :alt="item.title" class="si-img" />
          <div v-else class="si-img-empty"></div>
          <div class="si-img-overlay"></div>
        </div>
        <div class="si-body">
          <MvChip variant="accent">{{ item.category }}</MvChip>
          <p class="si-title">{{ item.title }}</p>
          <span class="si-meta">{{ item.date }} · {{ item.readTime }}</span>
        </div>
      </div>
    </div>

    <!-- Network stats widget -->
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MvChip from '../../components/ui/MvChip.vue'
import NavButton from '../button/NavButton.vue'

defineProps({
  items: { type: Array, default: () => [] },
  videos: { type: Array, default: () => [] }, // array gdrive id
})

defineEmits(['select', 'openVideo'])

const syncPct = ref(0)
const stats = [
  { label: 'Active Nodes', value: '1.2M' },
  { label: 'Data Cores', value: '47 PB' },
  { label: 'Grid Latency', value: '0.3ms' },
]

onMounted(() => {
  setTimeout(() => {
    syncPct.value = 78
  }, 300)
})

const thumbError = (e) => {
  // fallback: hide img, tampilkan placeholder
  e.target.closest('.vt-img-wrap').classList.add('no-thumb')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&family=Exo+2:wght@400;500;600&display=swap');

.sidebar {
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ===========================
   SHARED HEADER
=========================== */
.sidebar-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #a855f7;
  box-shadow: 0 0 8px #a855f7;
  animation: dotPulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

.sidebar-dot.red {
  background: #f43f5e;
  box-shadow: 0 0 8px #f43f5e;
}

@keyframes dotPulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.sidebar-label {
  font-family: 'Rajdhani', sans-serif;
  font-size: 11px;
  letter-spacing: 2.5px;
  color: rgba(168, 85, 247, 0.7);
  text-transform: uppercase;
  flex: 1;
}

.video-count {
  font-family: 'Exo 2', sans-serif;
  font-size: 10px;
  color: rgba(168, 85, 247, 0.45);
  background: rgba(109, 40, 217, 0.15);
  border: 1px solid rgba(109, 40, 217, 0.2);
  border-radius: 20px;
  padding: 2px 8px;
}

/* ===========================
   VIDEO SECTION
=========================== */
.video-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.video-thumb-card {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(168, 85, 247, 0.18);
  background: rgba(22, 6, 44, 0.55);
  cursor: pointer;
  transition:
    border-color 0.25s,
    box-shadow 0.25s,
    transform 0.25s;
}

.video-thumb-card:hover {
  border-color: rgba(168, 85, 247, 0.5);
  box-shadow: 0 8px 28px rgba(109, 40, 217, 0.3);
  transform: translateY(-2px);
}

/* Thumbnail */
.vt-img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  background: linear-gradient(135deg, #1a0030, #0e0020);
}

.vt-img-wrap.no-thumb .vt-img {
  display: none;
}

.vt-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}

.video-thumb-card:hover .vt-img {
  transform: scale(1.04);
}

.vt-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.25s;
}

.video-thumb-card:hover .vt-overlay {
  background: rgba(0, 0, 0, 0.25);
}

.vt-play {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(109, 40, 217, 0.85);
  border: 2px solid rgba(192, 132, 252, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 24px rgba(109, 40, 217, 0.6);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.video-thumb-card:hover .vt-play {
  transform: scale(1.1);
  box-shadow: 0 0 36px rgba(109, 40, 217, 0.8);
}

.vt-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 20px;
  padding: 3px 8px;
  font-family: 'Exo 2', sans-serif;
  font-size: 10px;
  color: #c084fc;
  backdrop-filter: blur(4px);
}

/* Scan line on thumbnail */
.vt-scan {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(192, 132, 252, 0.5), transparent);
  animation: scanAnim 3.5s ease-in-out infinite;
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

/* NavButton wrapper */
.vt-nav-btn {
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 0 !important;
}

/* ===========================
   RELATED LIST
=========================== */
.sidebar-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar-item {
  display: flex;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  background: rgba(22, 6, 44, 0.5);
  border: 1px solid rgba(168, 85, 247, 0.1);
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s,
    transform 0.2s;
}

.sidebar-item:hover {
  border-color: rgba(168, 85, 247, 0.4);
  background: rgba(109, 40, 217, 0.15);
  transform: translateX(3px);
}

.si-img-wrap {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.si-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.si-img-empty {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a0030, #0e0020);
}
.si-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.3), transparent);
}

.si-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.si-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #e9d5ff;
  margin: 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.si-meta {
  font-family: 'Exo 2', sans-serif;
  font-size: 10px;
  color: rgba(168, 85, 247, 0.45);
}

/* ===========================
   WIDGET
=========================== */
.sidebar-widget {
  padding: 16px;
  border-radius: 12px;
  background: rgba(22, 6, 44, 0.5);
  border: 1px solid rgba(168, 85, 247, 0.12);
}

.widget-label {
  font-family: 'Rajdhani', sans-serif;
  font-size: 11px;
  letter-spacing: 2px;
  color: rgba(168, 85, 247, 0.6);
  text-transform: uppercase;
  margin-bottom: 10px;
}

.widget-bar-wrap {
  height: 4px;
  background: rgba(109, 40, 217, 0.15);
  border-radius: 4px;
  margin-bottom: 14px;
  overflow: hidden;
}

.widget-bar {
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #c084fc, #0ea5e9);
  border-radius: 4px;
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.widget-stats {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.wstat {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wstat-label {
  font-family: 'Exo 2', sans-serif;
  font-size: 11px;
  color: rgba(168, 85, 247, 0.5);
}
.wstat-val {
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #c084fc;
}
</style>
