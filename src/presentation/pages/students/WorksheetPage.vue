<template>
  <MvBackground>
    <div class="scroll-container">
      <div class="ws-page">
        <!-- Page header -->
        <div class="page-header">
          <div class="header-left">
            <h1 class="header-title">Worksheet Interaktif</h1>
            <MvDivider class="header-divider" />
          </div>
        </div>

        <!-- Grid -->
        <div class="ws-grid">
          <WorksheetCard
            v-for="ws in worksheets"
            :key="ws.id"
            :worksheet="ws"
            @open="openWorksheet(ws)"
          />
        </div>

        <!-- Submit CTA section -->
        <div class="submit-section">
          <div class="submit-bg-glow"></div>
          <div class="submit-content">
            <div class="submit-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(192,132,252,0.9)"
                stroke-width="1.8"
              >
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </div>
            <div class="submit-text">
              <h3 class="submit-title">Sudah Selesai Mengerjakan?</h3>
              <p class="submit-sub">Upload foto jawaban worksheetmu dan kumpulkan sekarang.</p>
            </div>
            <button class="submit-btn" @click="openSubmission(null)">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <polyline points="16 16 12 12 8 16" />
                <line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
              Kumpulkan Tugas
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Worksheet embed modal -->
    <WorksheetEmbed :show="embedOpen" :worksheet="activeWorksheet" @close="embedOpen = false" />

    <!-- Submission form modal -->
    <SubmissionForm
      :show="submissionOpen"
      :worksheet="activeWorksheet"
      @close="submissionOpen = false"
    />
  </MvBackground>
  <footer class="footer"><NavButton to="/material" text="Back" /></footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { worksheets } from '@/presentation/constant/data/worksheet_data.js'
import MvBackground from '@/components/ui/MvBackground.vue'
import MvDivider from '@/components/ui/MvDivider.vue'
import WorksheetCard from '@/components/ui/WorksheetCard.vue'
import WorksheetEmbed from '@/components/ui/WorksheetEmbed.vue'
import SubmissionForm from '@/components/ui/SubmissionForm.vue'
import NavButton from '@/components/button/NavButton.vue'

const embedOpen = ref(false)
const submissionOpen = ref(false)
const activeWorksheet = ref(null)

const doneCount = ref(0) // bisa diisi dari firebase jika ada tracking

const openWorksheet = (ws) => {
  activeWorksheet.value = ws
  embedOpen.value = true
}

const openSubmission = (ws) => {
  if (ws) activeWorksheet.value = ws
  submissionOpen.value = true
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&family=Exo+2:wght@400;500;600&display=swap');

.ws-page {
  width: 100%;
  max-width: 2000px;
  padding: 60px 0 80px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* ── Header ── */
.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}

.header-left {
  flex: 1;
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
  margin: 0 0 20px;
  line-height: 1.6;
}

.header-divider {
  margin: 0;
  width: 60px;
}

.header-right {
  display: flex;
  gap: 14px;
  flex-shrink: 0;
  padding-bottom: 4px;
}

.stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 20px;
  background: rgba(22, 6, 44, 0.6);
  border: 1px solid rgba(168, 85, 247, 0.15);
  border-radius: 14px;
  backdrop-filter: blur(8px);
  min-width: 72px;
}

.stat-num {
  font-family: 'Rajdhani', sans-serif;
  font-size: 30px;
  font-weight: 700;
  color: #c084fc;
  line-height: 1;
  text-shadow: 0 0 16px rgba(192, 132, 252, 0.4);
}

.stat-label {
  font-family: 'Exo 2', sans-serif;
  font-size: 11px;
  color: rgba(168, 85, 247, 0.5);
  margin-top: 4px;
}

/* ── Grid ── */
.ws-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

/* ── Submit CTA ── */
.submit-section {
  position: relative;
  border-radius: 20px;
  padding: 2px;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.6), rgba(14, 165, 233, 0.4));
  overflow: hidden;
}

.submit-bg-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 30% 50%, rgba(109, 40, 217, 0.3) 0%, transparent 70%);
  pointer-events: none;
}

.submit-content {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 28px;
  background: linear-gradient(135deg, rgba(18, 4, 38, 0.95) 0%, rgba(10, 0, 26, 0.95) 100%);
  border-radius: 18px;
  position: relative;
  z-index: 1;
}

.submit-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.5), rgba(168, 85, 247, 0.3));
  border: 1px solid rgba(192, 132, 252, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 20px rgba(109, 40, 217, 0.3);
}

.submit-text {
  flex: 1;
}

.submit-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 4px;
}

.submit-sub {
  font-family: 'Exo 2', sans-serif;
  font-size: 13px;
  color: #9d7ec0;
  margin: 0;
}

.submit-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #6d28d9, #a855f7);
  border: none;
  border-radius: 12px;
  padding: 12px 22px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: 0 4px 20px rgba(109, 40, 217, 0.4);
  transition:
    opacity 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
}

.submit-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(109, 40, 217, 0.5);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .ws-grid {
    grid-template-columns: 1fr;
  }
  .submit-content {
    flex-direction: column;
    text-align: center;
  }
  .submit-btn {
    width: 100%;
    justify-content: center;
  }
  .header-title {
    font-size: 30px;
  }
}

.scroll-container {
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  scrollbar-width: none;
}
.scroll-container::-webkit-scrollbar {
  width: 0;
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
</style>
