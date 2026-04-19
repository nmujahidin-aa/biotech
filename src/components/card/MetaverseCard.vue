<template>
  <div>
    <div class="mv-card" @click="openModal">
      <div class="mv-inner">
        <div class="scan"></div>
        <div class="particles" ref="ptsRef"></div>
        <div class="icon-wrap">
          <div class="ring"></div>
          <div class="ring2"></div>
          <div class="icon-bg">
            <span class="card-icon" v-html="cardIcon"></span>
          </div>
        </div>
        <div class="mv-text">
          <p class="mv-title">{{ cardTitle }}</p>
          <p class="mv-sub">{{ cardSubtitle }}</p>
        </div>
      </div>
    </div>

    <!-- ===== MODAL OVERLAY ===== -->
    <Teleport to="body">
      <div class="overlay" :class="{ show: isOpen }" @click.self="closeModal">
        <div class="modal" :class="{ show: isOpen }">
          <div class="modal-inner">
            <div class="modal-glow"></div>
            <div class="modal-glow2"></div>
            <div class="modal-scan"></div>

            <button class="close-btn" @click="closeModal">
              <div class="close-x"></div>
            </button>

            <div class="modal-header">
              <div class="modal-icon">
                <span class="card-icon" v-html="cardIcon"></span>
              </div>
              <div>
                <p class="modal-htag">Malang Biotech Metaverse</p>
                <p class="modal-htitle">{{ modalData.title }}</p>
              </div>
            </div>

            <div class="divider"></div>

            <div class="content-area" v-html="modalData.html"></div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  cardTitle: {
    type: String,
    default: 'Interactive H5P Learning',
  },
  cardSubtitle: {
    type: String,
    default: 'Video dan kuis interaktif yang menarik',
  },
  // Terima string SVG atau HTML emoji bebas, contoh:
  // '<svg width="18" height="18" ...>...</svg>'  atau  '🎬'
  cardIcon: {
    type: String,
    default: `<svg width="18" height="18" viewBox="0 0 18 18" fill="white"><polygon points="4,2 16,9 4,16"/></svg>`,
  },
  modalData: {
    type: Object,
    default: () => ({
      title: 'Interactive H5P Learning',
      html: `
        <h1>Apa itu H5P?</h1>
        <p><strong>H5P</strong> adalah framework open-source untuk membuat konten interaktif berbasis HTML5.</p>
        <h2>Fitur Unggulan</h2>
        <ul>
          <li>Video interaktif dengan pertanyaan di dalamnya</li>
          <li>Quiz dan kuis beragam format</li>
          <li>Presentasi interaktif Course Presentation</li>
          <li>Drag and Drop activities</li>
        </ul>
        <blockquote>H5P memungkinkan siapa saja membuat konten e-learning profesional tanpa keahlian coding.</blockquote>
        <h2>Contoh Embed</h2>
        <pre><code>&lt;iframe src="https://your-site.com/h5p/embed/1"
  width="100%" height="400"
  frameborder="0"&gt;
&lt;/iframe&gt;</code></pre>
        <h2>Tipe Konten</h2>
        <table>
          <tr><th>Tipe</th><th>Kegunaan</th></tr>
          <tr><td>Interactive Video</td><td>Video dengan kuis embed di tengah</td></tr>
          <tr><td>Course Presentation</td><td>Slide deck interaktif</td></tr>
          <tr><td>Quiz (Question Set)</td><td>Kumpulan soal berganda</td></tr>
          <tr><td>Drag the Words</td><td>Isi teks dengan drag &amp; drop</td></tr>
          <tr><td>Branching Scenario</td><td>Alur cerita bercabang</td></tr>
        </table>
      `,
    }),
  },
})

const isOpen = ref(false)
const ptsRef = ref(null)

const openModal = () => {
  isOpen.value = true
}
const closeModal = () => {
  isOpen.value = false
}

onMounted(() => {
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div')
    p.className = 'pt'
    p.style.left = Math.random() * 100 + '%'
    p.style.setProperty('--dx', Math.random() * 40 - 20 + 'px')
    p.style.animationDuration = 3 + Math.random() * 4 + 's'
    p.style.animationDelay = Math.random() * 4 + 's'
    ptsRef.value?.appendChild(p)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&family=Exo+2:wght@400;600&display=swap');

/* ===========================
   CARD
=========================== */
.mv-card {
  position: relative;
  width: 100%;
  max-width: 520px;
  border-radius: 20px;
  padding: 2px;
  background: linear-gradient(135deg, #7b2ff7, #c84bff, #00d4ff, #7b2ff7);
  background-size: 300% 300%;
  animation: borderAnim 4s ease infinite;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  font-family: 'Exo 2', sans-serif;
}

.mv-card:hover {
  transform: translateY(-6px) scale(1.015);
  box-shadow:
    0 20px 60px rgba(123, 47, 247, 0.5),
    0 0 40px rgba(200, 75, 255, 0.3);
}

.mv-inner {
  background: linear-gradient(135deg, #150025 0%, #0e0020 50%, #0a001a 100%);
  border-radius: 18px;
  padding: 24px 28px;
  display: flex;
  align-items: center;
  gap: 22px;
  position: relative;
  overflow: hidden;
}

.mv-inner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 20% 50%, rgba(123, 47, 247, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

/* Scan line */
.scan {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(200, 75, 255, 0.6), transparent);
  animation: scanAnim 3s ease-in-out infinite;
  pointer-events: none;
}

/* Particles */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  border-radius: 18px;
}

.pt {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(200, 75, 255, 0.7);
  border-radius: 50%;
  animation: ptFloat linear infinite;
}

/* Icon */
.icon-wrap {
  position: relative;
  flex-shrink: 0;
  width: 62px;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.5px solid rgba(200, 75, 255, 0.5);
  animation: ringPulse 2s ease-in-out infinite;
}

.ring2 {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1px solid rgba(123, 47, 247, 0.25);
  animation: ringPulse 2s ease-in-out infinite 0.5s;
}

.icon-bg {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6d28d9, #a855f7);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
}

/* Text */
.mv-text {
  flex: 1;
  position: relative;
  z-index: 1;
}

.mv-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 1px;
  text-align: left;
  text-shadow: 0 0 20px rgba(200, 75, 255, 0.6);
}

.mv-sub {
  font-size: 13px;
  color: #c084fc;
  margin: 0;
  text-align: left;
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 1;
}

/* ===========================
   OVERLAY & MODAL
=========================== */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(5, 0, 20, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s ease;
  backdrop-filter: blur(6px);
  padding: 20px;
}

.overlay.show {
  opacity: 1;
  pointer-events: all;
}

.modal {
  position: relative;
  width: 100%;
  max-width: 580px;
  border-radius: 24px;
  padding: 2px;
  background: linear-gradient(135deg, #7b2ff7, #c84bff, #00d4ff, #c84bff, #7b2ff7);
  background-size: 400% 400%;
  animation: borderAnim 3s ease infinite;
  transform: scale(0.85) translateY(30px);
  transition:
    transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.35s ease;
  opacity: 0;
}

.modal.show {
  transform: scale(1) translateY(0);
  opacity: 1;
}

.modal-inner {
  background: linear-gradient(160deg, #130022 0%, #0c001a 60%, #08001a 100%);
  border-radius: 22px;
  padding: 32px 32px 28px;
  position: relative;
  overflow: hidden;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-inner::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.modal-inner {
  scrollbar-width: none;
}

/* Glow blobs */
.modal-glow {
  position: absolute;
  top: -60px;
  right: -60px;
  width: 200px;
  height: 200px;
  background: rgba(123, 47, 247, 0.25);
  border-radius: 50%;
  filter: blur(50px);
  pointer-events: none;
}

.modal-glow2 {
  position: absolute;
  bottom: -40px;
  left: -40px;
  width: 150px;
  height: 150px;
  background: rgba(0, 212, 255, 0.15);
  border-radius: 50%;
  filter: blur(40px);
  pointer-events: none;
}

.modal-scan {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(200, 75, 255, 0.5), transparent);
  animation: scanAnim 4s ease-in-out infinite;
  pointer-events: none;
}

/* Close button */
.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(123, 47, 247, 0.3);
  border: 1px solid rgba(200, 75, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  transition:
    background 0.2s,
    transform 0.2s;
  flex-shrink: 0;
}

.close-btn:hover {
  background: rgba(200, 75, 255, 0.4);
  transform: rotate(90deg);
}

.close-x {
  position: relative;
  width: 12px;
  height: 12px;
}

.close-x::before,
.close-x::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: #e879f9;
  transform-origin: center;
}

.close-x::before {
  transform: translateY(-50%) rotate(45deg);
}

.close-x::after {
  transform: translateY(-50%) rotate(-45deg);
}

/* Modal header */
.modal-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
  padding-right: 40px;
  position: relative;
  z-index: 2;
}

.modal-icon {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6d28d9, #a855f7);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 16px rgba(168, 85, 247, 0.5);
}

.modal-htag {
  font-family: 'Rajdhani', sans-serif;
  font-size: 11px;
  letter-spacing: 2px;
  color: #9333ea;
  text-transform: uppercase;
  margin: 0 0 3px;
}

.modal-htitle {
  font-family: 'Rajdhani', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-shadow: 0 0 16px rgba(200, 75, 255, 0.5);
}

/* Divider */
.divider {
  height: 1px;
  background: linear-gradient(90deg, rgba(123, 47, 247, 0.6), rgba(0, 212, 255, 0.4), transparent);
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
}

/* ===========================
   CONTENT AREA — semua HTML element
=========================== */
.content-area {
  position: relative;
  z-index: 2;
  color: #d4b8f0;
  font-family: 'Exo 2', sans-serif;
  font-size: 14px;
  line-height: 1.8;
}

.content-area :deep(h1) {
  font-family: 'Rajdhani', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 0 12px rgba(200, 75, 255, 0.4);
  margin: 0 0 14px;
}

.content-area :deep(h2) {
  font-family: 'Rajdhani', sans-serif;
  font-size: 19px;
  font-weight: 700;
  color: #e9d5ff;
  margin: 18px 0 10px;
}

.content-area :deep(h3) {
  font-family: 'Rajdhani', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #c084fc;
  margin: 14px 0 6px;
}

.content-area :deep(p) {
  margin: 0 0 12px;
  color: #c4a8e0;
}

.content-area :deep(img) {
  max-width: 100%;
  border-radius: 10px;
  border: 1px solid rgba(168, 85, 247, 0.3);
  margin: 10px 0;
  box-shadow: 0 0 20px rgba(123, 47, 247, 0.3);
  display: block;
}

.content-area :deep(ul),
.content-area :deep(ol) {
  padding-left: 22px;
  margin: 0 0 12px;
}

.content-area :deep(li) {
  color: #c4a8e0;
  margin-bottom: 5px;
}

.content-area :deep(strong) {
  color: #e9d5ff;
  font-weight: 600;
}

.content-area :deep(em) {
  color: #a78bfa;
  font-style: italic;
}

.content-area :deep(a) {
  color: #818cf8;
  text-decoration: none;
  border-bottom: 1px solid rgba(129, 140, 248, 0.3);
  transition: color 0.2s;
}

.content-area :deep(a:hover) {
  color: #c084fc;
}

.content-area :deep(blockquote) {
  border-left: 3px solid #7c3aed;
  padding: 10px 16px;
  margin: 12px 0;
  background: rgba(123, 47, 247, 0.1);
  border-radius: 0 8px 8px 0;
  color: #a78bfa;
  font-style: italic;
}

.content-area :deep(code) {
  background: rgba(123, 47, 247, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 4px;
  padding: 2px 7px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #c084fc;
}

.content-area :deep(pre) {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(123, 47, 247, 0.3);
  border-radius: 10px;
  padding: 16px;
  overflow-x: auto;
  margin: 12px 0;
}

.content-area :deep(pre code) {
  background: none;
  border: none;
  padding: 0;
  font-size: 12px;
  color: #a5f3fc;
}

.content-area :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
  font-size: 13px;
}

.content-area :deep(th) {
  background: rgba(123, 47, 247, 0.25);
  color: #e9d5ff;
  padding: 9px 13px;
  text-align: left;
  border: 1px solid rgba(168, 85, 247, 0.2);
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px;
  letter-spacing: 0.5px;
}

.content-area :deep(td) {
  padding: 9px 13px;
  border: 1px solid rgba(168, 85, 247, 0.12);
  color: #c4a8e0;
}

.content-area :deep(tr:nth-child(even) td) {
  background: rgba(123, 47, 247, 0.06);
}

.content-area :deep(hr) {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, rgba(123, 47, 247, 0.5), rgba(0, 212, 255, 0.3), transparent);
  margin: 16px 0;
}

/* ===========================
   KEYFRAMES
=========================== */
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

@keyframes scanAnim {
  0% {
    top: 0%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

@keyframes ringPulse {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

@keyframes ptFloat {
  0% {
    transform: translateY(100%) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-20px) translateX(var(--dx));
    opacity: 0;
  }
}
</style>
