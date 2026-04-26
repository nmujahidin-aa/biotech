<template>
  <div class="video-page">
    <!-- BG -->
    <div class="bg-grid"></div>
    <div class="orb orb1"></div>
    <div class="orb orb2"></div>

    <!-- Header bar -->
    <div class="vp-header">
      <button class="back-btn" @click="$emit('close')">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Kembali
      </button>

      <div class="vp-title-wrap">
        <p class="vp-eyebrow">Related Videos</p>
        <h2 class="vp-title">{{ newsTitle }}</h2>
      </div>

      <!-- Video counter -->
      <div class="vp-counter">
        <span class="counter-cur">{{ activeIdx + 1 }}</span>
        <span class="counter-sep">/</span>
        <span class="counter-tot">{{ videos.length }}</span>
      </div>
    </div>

    <!-- Main content -->
    <div class="vp-body">
      <!-- Player -->
      <div class="player-wrap">
        <div class="player-border">
          <div class="player-inner">
            <div class="scan-line"></div>
            <iframe
              :key="activeIdx"
              :src="`https://drive.google.com/file/d/${videos[activeIdx]}/preview`"
              class="player-iframe"
              allow="autoplay"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <!-- Prev / Next -->
        <div class="player-nav" v-if="videos.length > 1">
          <button class="nav-btn" :disabled="activeIdx === 0" @click="activeIdx--">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Video Sebelumnya
          </button>
          <div class="nav-dots">
            <span
              v-for="(_, i) in videos"
              :key="i"
              class="dot"
              :class="{ active: i === activeIdx }"
              @click="activeIdx = i"
            ></span>
          </div>
          <button class="nav-btn" :disabled="activeIdx === videos.length - 1" @click="activeIdx++">
            Video Selanjutnya
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Playlist sidebar -->
      <div class="playlist" v-if="videos.length > 1">
        <p class="playlist-label">Daftar Video</p>
        <div
          v-for="(id, i) in videos"
          :key="id"
          class="playlist-item"
          :class="{ active: i === activeIdx }"
          @click="activeIdx = i"
        >
          <!-- GDrive thumbnail -->
          <div class="pi-thumb-wrap">
            <img
              :src="`https://drive.google.com/thumbnail?id=${id}&sz=w320`"
              :alt="`Video ${i + 1}`"
              class="pi-thumb"
              @error="onThumbError"
            />
            <div class="pi-thumb-overlay">
              <div class="pi-play-icon" v-if="i !== activeIdx">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
              <div class="pi-playing" v-else><span></span><span></span><span></span></div>
            </div>
          </div>
          <div class="pi-info">
            <p class="pi-title">Video {{ i + 1 }}</p>
            <p class="pi-sub">{{ i === activeIdx ? 'Sedang diputar' : 'Klik untuk putar' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  newsTitle: { type: String, default: '' },
  videos: { type: Array, required: true },
})

defineEmits(['close'])

const activeIdx = ref(0)

const onThumbError = (e) => {
  e.target.style.display = 'none'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&family=Exo+2:wght@400;500;600&display=swap');

/* ===========================
   PAGE
=========================== */
.video-page {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: #06000e;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Exo 2', sans-serif;
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(124, 58, 237, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124, 58, 237, 0.07) 1px, transparent 1px);
  background-size: 44px 44px;
  pointer-events: none;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
}
.orb1 {
  width: 400px;
  height: 400px;
  background: rgba(109, 40, 217, 0.22);
  top: -120px;
  left: -80px;
}
.orb2 {
  width: 300px;
  height: 300px;
  background: rgba(192, 38, 211, 0.15);
  bottom: -60px;
  right: -60px;
}

/* ===========================
   HEADER
=========================== */
.vp-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 28px;
  border-bottom: 1px solid rgba(168, 85, 247, 0.15);
  background: rgba(18, 4, 38, 0.7);
  backdrop-filter: blur(12px);
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(109, 40, 217, 0.18);
  border: 1px solid rgba(168, 85, 247, 0.25);
  border-radius: 30px;
  padding: 7px 16px;
  font-family: 'Exo 2', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #c084fc;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.2s;
  flex-shrink: 0;
}

.back-btn:hover {
  background: rgba(109, 40, 217, 0.35);
  transform: translateX(-2px);
}

.vp-title-wrap {
  flex: 1;
  min-width: 0;
}

.vp-eyebrow {
  font-family: 'Rajdhani', sans-serif;
  font-size: 10px;
  letter-spacing: 2.5px;
  color: rgba(168, 85, 247, 0.55);
  text-transform: uppercase;
  margin: 0 0 2px;
}

.vp-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #f3e8ff;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.vp-counter {
  display: flex;
  align-items: baseline;
  gap: 3px;
  font-family: 'Rajdhani', sans-serif;
  flex-shrink: 0;
}

.counter-cur {
  font-size: 28px;
  font-weight: 700;
  color: #c084fc;
  line-height: 1;
}
.counter-sep {
  font-size: 16px;
  color: rgba(168, 85, 247, 0.4);
}
.counter-tot {
  font-size: 16px;
  color: rgba(168, 85, 247, 0.4);
}

/* ===========================
   BODY
=========================== */
.vp-body {
  flex: 1;
  display: flex;
  gap: 20px;
  padding: 24px 28px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

/* ===========================
   PLAYER
=========================== */
.player-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.player-border {
  flex: 1;
  border-radius: 18px;
  padding: 2px;
  background: linear-gradient(135deg, #7c3aed, #c084fc, #0ea5e9, #c084fc, #7c3aed);
  background-size: 300% 300%;
  animation: borderAnim 5s ease infinite;
  position: relative;
  min-height: 0;
}

@keyframes borderAnim {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.player-inner {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: #000;
}

.scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(192, 132, 252, 0.4), transparent);
  animation: scanAnim 4s ease-in-out infinite;
  pointer-events: none;
  z-index: 2;
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

.player-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

/* Prev / Next nav */
.player-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-shrink: 0;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(109, 40, 217, 0.18);
  border: 1px solid rgba(168, 85, 247, 0.25);
  border-radius: 30px;
  padding: 8px 16px;
  font-family: 'Exo 2', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #c084fc;
  cursor: pointer;
  transition:
    background 0.2s,
    opacity 0.2s;
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-btn:not(:disabled):hover {
  background: rgba(109, 40, 217, 0.35);
}

.nav-dots {
  display: flex;
  gap: 8px;
  align-items: center;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(168, 85, 247, 0.25);
  border: 1px solid rgba(168, 85, 247, 0.3);
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.2s;
}

.dot.active {
  background: #a855f7;
  box-shadow: 0 0 8px rgba(168, 85, 247, 0.6);
  transform: scale(1.2);
}

/* ===========================
   PLAYLIST
=========================== */
.playlist {
  width: 260px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  scrollbar-width: none;
}
.playlist::-webkit-scrollbar {
  width: 0;
}

.playlist-label {
  font-family: 'Rajdhani', sans-serif;
  font-size: 11px;
  letter-spacing: 2px;
  color: rgba(168, 85, 247, 0.55);
  text-transform: uppercase;
  margin: 0 0 4px;
}

.playlist-item {
  display: flex;
  gap: 10px;
  padding: 10px;
  border-radius: 12px;
  background: rgba(22, 6, 44, 0.55);
  border: 1px solid rgba(168, 85, 247, 0.12);
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s,
    transform 0.2s;
}

.playlist-item:hover {
  border-color: rgba(168, 85, 247, 0.35);
  background: rgba(109, 40, 217, 0.18);
  transform: translateX(3px);
}

.playlist-item.active {
  border-color: rgba(168, 85, 247, 0.5);
  background: rgba(109, 40, 217, 0.25);
  box-shadow: -3px 0 0 #7c3aed;
}

.pi-thumb-wrap {
  position: relative;
  width: 80px;
  height: 54px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: linear-gradient(135deg, #1a0030, #0e0020);
}

.pi-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pi-thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pi-play-icon {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(109, 40, 217, 0.7);
  border: 1px solid rgba(168, 85, 247, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Equalizer animation for playing */
.pi-playing {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 20px;
}

.pi-playing span {
  width: 3px;
  background: #a855f7;
  border-radius: 2px;
  animation: eq 0.8s ease-in-out infinite alternate;
}
.pi-playing span:nth-child(1) {
  height: 60%;
  animation-delay: 0s;
}
.pi-playing span:nth-child(2) {
  height: 100%;
  animation-delay: 0.15s;
}
.pi-playing span:nth-child(3) {
  height: 40%;
  animation-delay: 0.3s;
}

@keyframes eq {
  from {
    transform: scaleY(0.4);
  }
  to {
    transform: scaleY(1);
  }
}

.pi-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
}

.pi-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #e9d5ff;
  margin: 0;
}

.pi-sub {
  font-size: 11px;
  color: rgba(168, 85, 247, 0.5);
  margin: 0;
  font-family: 'Exo 2', sans-serif;
}

.playlist-item.active .pi-sub {
  color: #a855f7;
}

/* ===========================
   RESPONSIVE
=========================== */
@media (max-width: 768px) {
  .vp-body {
    flex-direction: column;
    padding: 16px;
  }
  .playlist {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
  }
  .playlist-item {
    flex-shrink: 0;
    width: 180px;
  }
  .vp-title {
    font-size: 14px;
  }
}
</style>
