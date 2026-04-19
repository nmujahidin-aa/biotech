<template>
  <div class="card-header">
    <div class="header-left">
      <div class="header-icon">
        <span v-html="icon || defaultIcon"></span>
      </div>
      <div>
        <p class="header-tag">{{ tag }}</p>
        <h1 class="header-title">{{ title }}</h1>
      </div>
    </div>
    <div class="header-meta">
      <slot name="meta">
        <MvChip v-if="readTime">{{ readTime }}</MvChip>
        <MvChip v-if="author" variant="muted">{{ author }}</MvChip>
      </slot>
    </div>
  </div>
  <div class="card-divider"></div>
</template>

<script setup>
import MvChip from './MvChip.vue'

defineProps({
  title: { type: String, required: true },
  tag: { type: String, default: 'Materi Pembelajaran' },
  icon: { type: String, default: '' },
  readTime: { type: String, default: '' },
  author: { type: String, default: '' },
})

const defaultIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(192,132,252,0.9)" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`
</script>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 36px 24px;
  flex-shrink: 0;
  gap: 16px;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}
.header-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.6), rgba(168, 85, 247, 0.4));
  border: 1px solid rgba(192, 132, 252, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 16px rgba(109, 40, 217, 0.4);
}
.header-tag {
  font-family: 'Rajdhani', sans-serif;
  font-size: 11px;
  letter-spacing: 2.5px;
  color: #9333ea;
  text-transform: uppercase;
  margin: 0 0 0px;
  text-align: justify;
}
.header-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-shadow: 0 0 24px rgba(192, 132, 252, 0.4);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.header-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.card-divider {
  height: 1px;
  margin: 0 36px;
  background: linear-gradient(90deg, rgba(109, 40, 217, 0.7), rgba(14, 165, 233, 0.4), transparent);
  flex-shrink: 0;
}
</style>
