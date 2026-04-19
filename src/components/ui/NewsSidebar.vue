<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-dot"></div>
      <span class="sidebar-label">Related News</span>
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
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MvChip from '../../components/ui/MvChip.vue'

defineProps({ items: { type: Array, default: () => [] } })
defineEmits(['select'])

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

/* Header */
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
}

/* List */
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

/* Widget */
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
