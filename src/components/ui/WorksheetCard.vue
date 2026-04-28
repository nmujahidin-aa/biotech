<template>
  <div class="ws-card" @click="$emit('open')">
    <!-- Number -->
    <div class="card-number">{{ String(worksheet.id).padStart(2, '0') }}</div>

    <!-- Animated border -->
    <div class="card-glow"></div>

    <div class="card-body">
      <!-- Top row -->
      <div class="card-top">
        <span class="subject-tag">{{ worksheet.subject }}</span>
        <span
          class="difficulty-badge"
          :style="{
            color: diff.color,
            background: diff.bg,
            borderColor: diff.border,
          }"
          >{{ worksheet.difficulty }}</span
        >
      </div>

      <!-- Title -->
      <h3 class="card-title">{{ worksheet.title }}</h3>
      <p class="card-desc">{{ worksheet.desc }}</p>

      <!-- Meta -->
      <div class="card-meta">
        <div class="meta-item">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          {{ worksheet.duration }}
        </div>
        <div class="meta-item">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          Liveworksheet
        </div>
      </div>

      <!-- CTA -->
      <div class="card-cta">
        <span class="cta-text">Kerjakan Sekarang</span>
        <div class="cta-arrow">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Hover scan line -->
    <div class="card-scan"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { difficultyConfig } from '@/presentation/constant/data/worksheet_data'

const props = defineProps({
  worksheet: { type: Object, required: true },
})
defineEmits(['open'])

const diff = computed(
  () => difficultyConfig[props.worksheet.difficulty] ?? difficultyConfig['Mudah'],
)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&family=Exo+2:wght@400;500;600&display=swap');

.ws-card {
  position: relative;
  border-radius: 18px;
  padding: 2px;
  background: linear-gradient(
    135deg,
    rgba(109, 40, 217, 0.5),
    rgba(168, 85, 247, 0.2),
    rgba(14, 165, 233, 0.3)
  );
  cursor: pointer;
  transition:
    transform 0.28s ease,
    box-shadow 0.28s ease;
  overflow: hidden;
}

.ws-card:hover {
  transform: translateY(-6px);
  box-shadow:
    0 20px 50px rgba(109, 40, 217, 0.3),
    0 0 0 1px rgba(168, 85, 247, 0.2);
}

.card-glow {
  position: absolute;
  inset: -1px;
  border-radius: 18px;
  background: linear-gradient(135deg, #7c3aed, #c084fc, #0ea5e9, #7c3aed);
  background-size: 300% 300%;
  opacity: 0;
  animation: borderGlow 4s ease infinite;
  transition: opacity 0.3s;
  z-index: 0;
}

.ws-card:hover .card-glow {
  opacity: 1;
}

@keyframes borderGlow {
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

.card-number {
  position: absolute;
  top: 16px;
  right: 18px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: rgba(109, 40, 217, 0.18);
  line-height: 1;
  z-index: 2;
  pointer-events: none;
  transition: color 0.3s;
}

.ws-card:hover .card-number {
  color: rgba(168, 85, 247, 0.25);
}

.card-body {
  position: relative;
  z-index: 2;
  background: linear-gradient(160deg, #130022 0%, #0c001a 100%);
  border-radius: 16px;
  padding: 22px 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.subject-tag {
  font-family: 'Exo 2', sans-serif;
  font-size: 10px;
  font-weight: 600;
  color: rgba(168, 85, 247, 0.7);
  background: rgba(109, 40, 217, 0.15);
  border: 1px solid rgba(109, 40, 217, 0.2);
  border-radius: 20px;
  padding: 3px 9px;
  letter-spacing: 0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

.difficulty-badge {
  font-family: 'Exo 2', sans-serif;
  font-size: 10px;
  font-weight: 600;
  border-radius: 20px;
  padding: 3px 9px;
  border: 1px solid;
  white-space: nowrap;
  flex-shrink: 0;
}

.card-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: #f3e8ff;
  line-height: 1.3;
  margin: 0;
  padding-right: 30px;
}

.card-desc {
  font-family: 'Exo 2', sans-serif;
  font-size: 12.5px;
  color: #9d7ec0;
  line-height: 1.6;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  gap: 14px;
  padding-top: 8px;
  border-top: 1px solid rgba(109, 40, 217, 0.15);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'Exo 2', sans-serif;
  font-size: 11px;
  color: rgba(168, 85, 247, 0.5);
}

.card-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
}

.cta-text {
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #a855f7;
  letter-spacing: 0.5px;
  transition: color 0.2s;
}

.ws-card:hover .cta-text {
  color: #c084fc;
}

.cta-arrow {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(109, 40, 217, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a855f7;
  transition:
    background 0.2s,
    transform 0.2s,
    color 0.2s;
}

.ws-card:hover .cta-arrow {
  background: rgba(109, 40, 217, 0.4);
  color: #e9d5ff;
  transform: translateX(2px);
}

.card-scan {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(192, 132, 252, 0.5), transparent);
  opacity: 0;
  animation: scanAnim 3s ease-in-out infinite;
  pointer-events: none;
  z-index: 3;
  transition: opacity 0.3s;
}

.ws-card:hover .card-scan {
  opacity: 1;
}

@keyframes scanAnim {
  0% {
    top: 0%;
  }
  100% {
    top: 100%;
  }
}
</style>
