<template>
  <Teleport to="body">
    <transition name="embed-fade">
      <div v-if="show" class="embed-overlay">
        <div class="bg-grid"></div>

        <!-- Header -->
        <div class="embed-header">
          <button class="close-btn" @click="$emit('close')">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Kembali
          </button>

          <div class="header-info">
            <span class="header-subject">{{ worksheet.subject }}</span>
            <h2 class="header-title">{{ worksheet.title }}</h2>
          </div>

          <div class="header-meta">
            <span class="meta-pill">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              {{ worksheet.duration }}
            </span>
            <span
              class="meta-pill diff"
              :style="{ color: diff.color, background: diff.bg, borderColor: diff.border }"
              >{{ worksheet.difficulty }}</span
            >
          </div>
        </div>

        <div class="embed-body">
          <div class="iframe-wrap">
            <div class="iframe-border">
              <div class="iframe-inner">
                <div class="scan-line"></div>
                <div v-if="loading" class="iframe-loading">
                  <div class="loading-spinner"></div>
                  <p>Memuat worksheet...</p>
                </div>
                <div id="liveworksheet-container"></div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!loading && !props.worksheet.embedUrl" class="error-message">
          <p>Worksheet tidak dapat dimuat. Silakan periksa kembali parameter embed.</p>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { difficultyConfig } from '@/presentation/constant/data/worksheet_data'

const props = defineProps({
  show: { type: Boolean, required: true },
  worksheet: { type: Object, default: () => ({}) },
})

console.log('Props yang diterima:', props)

defineEmits(['close'])

const loading = ref(true)

const diff = computed(
  () => difficultyConfig[props.worksheet?.difficulty] ?? difficultyConfig['Mudah'],
)

function loadWorksheet() {
  if (!props.worksheet?.embedUrl || !props.worksheet?.lwId || !props.worksheet?.code) {
    console.error('Parameter embed tidak lengkap!')
    // apa parameter yang dibutuhkan: embedUrl, lwId, code
    console.log('Parameter yang diperlukan:', {
      embedUrl: props.worksheet?.embedUrl,
      lwId: props.worksheet?.lwId,
      code: props.worksheet?.code,
    })
    return
  }

  const container = document.getElementById('liveworksheet-container')
  if (container) container.innerHTML = ''

  const run = () => {
    if (typeof window.loadliveworksheetEmbed === 'function') {
      window.loadliveworksheetEmbed(
        props.worksheet.lwId,
        props.worksheet.code,
        props.worksheet.width || 11532,
        'www',
        'new',
        props.worksheet.embedUrl,
      )
      loading.value = false
    } else {
      console.error('Fungsi loadliveworksheetEmbed tidak ditemukan!')
    }
  }

  const existingScript = document.querySelector(
    'script[src="https://www.liveworksheets.com/embed/embed-link.js"]',
  )

  if (!existingScript) {
    const script = document.createElement('script')
    script.src = 'https://www.liveworksheets.com/embed/embed-link.js'
    script.onload = run
    document.body.appendChild(script)
  } else {
    run()
  }
}

onMounted(() => {
  if (props.show) {
    nextTick(() => {
      console.log('Modal dirender, memuat worksheet...')
      loadWorksheet()
    })
  }
})

watch(
  () => props.show,
  async (val) => {
    if (val) {
      loading.value = true
      await nextTick()
      console.log('Modal dibuka, memuat worksheet...')
      loadWorksheet()
    }
  },
)

console.log('Parameter worksheet:', props.worksheet)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&family=Exo+2:wght@400;500;600&display=swap');

.embed-overlay {
  position: fixed;
  inset: 0;
  z-index: 9998;
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

.embed-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 24px;
  border-bottom: 1px solid rgba(168, 85, 247, 0.15);
  background: rgba(18, 4, 38, 0.8);
  backdrop-filter: blur(12px);
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.close-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  background: rgba(109, 40, 217, 0.18);
  border: 1px solid rgba(168, 85, 247, 0.25);
  border-radius: 30px;
  padding: 7px 14px;
  font-family: 'Exo 2', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #c084fc;
  cursor: pointer;
  flex-shrink: 0;
  transition:
    background 0.2s,
    transform 0.2s;
}
.close-btn:hover {
  background: rgba(109, 40, 217, 0.35);
  transform: translateX(-2px);
}

.header-info {
  flex: 1;
  min-width: 0;
}

.header-subject {
  display: block;
  font-family: 'Rajdhani', sans-serif;
  font-size: 10px;
  letter-spacing: 2px;
  color: rgba(168, 85, 247, 0.55);
  text-transform: uppercase;
  margin-bottom: 2px;
}

.header-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #f3e8ff;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-meta {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.meta-pill {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'Exo 2', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: rgba(168, 85, 247, 0.6);
  background: rgba(109, 40, 217, 0.15);
  border: 1px solid rgba(109, 40, 217, 0.2);
  border-radius: 20px;
  padding: 4px 10px;
}

.meta-pill.diff {
  border: 1px solid;
}

.embed-body {
  flex: 1;
  padding: 20px 24px;
  display: flex;
  min-height: 0;
  position: relative;
  z-index: 1;
}

.iframe-wrap {
  flex: 1;
  display: flex;
  min-height: 0;
}

.iframe-border {
  flex: 1;
  border-radius: 16px;
  padding: 2px;
  background: linear-gradient(135deg, #7c3aed, #c084fc, #0ea5e9, #c084fc, #7c3aed);
  background-size: 300% 300%;
  animation: borderAnim 5s ease infinite;
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

.iframe-inner {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
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

.iframe-loading {
  position: absolute;
  inset: 0;
  background: #0c001a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  z-index: 3;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid rgba(109, 40, 217, 0.2);
  border-top-color: #a855f7;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.iframe-loading p {
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px;
  letter-spacing: 1.5px;
  color: rgba(168, 85, 247, 0.55);
  text-transform: uppercase;
  margin: 0;
}

.ws-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

/* Transition */
.embed-fade-enter-active,
.embed-fade-leave-active {
  transition: opacity 0.25s ease;
}
.embed-fade-enter-from,
.embed-fade-leave-to {
  opacity: 0;
}
</style>
