<template>
  <div class="submission-card" @click="$emit('click', submission)">
    <div class="card-glow"></div>
    
    <div class="card-image-container">
      <img 
        :src="submission.imageUrl" 
        :alt="`Poster by ${submission.studentName}`"
        class="card-image"
        @error="handleImageError"
      />
      
      <div class="image-overlay"></div>
      
      <div class="like-heart" v-if="showHeart">❤️</div>
    </div>
    
    <div class="card-content">
      <div class="user-info">
        <div class="avatar">
          <span class="avatar-text">{{ getInitials(submission.studentName) }}</span>
        </div>
        <div class="user-details">
          <h4 class="username">{{ submission.studentName }}</h4>
          <p class="timestamp">{{ formatRelativeTime(submission.submittedAt) }}</p>
        </div>
      </div>
      
      <p class="caption" v-if="submission.caption">
        {{ truncateText(submission.caption, 100) }}
      </p>
      
      <div class="engagement">
        <div class="engagement-item">
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{{ submission.likes || 0 }}</span>
        </div>
        <div class="engagement-item">
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{{ submission.comments || 0 }}</span>
        </div>
      </div>
      
      <div class="view-detail">
        <span>Lihat Postingan</span>
        <svg class="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
    
    <div class="card-scan"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  submission: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])

const showHeart = ref(false)

// Get initials from name
const getInitials = (name) => {
  if (!name) return '?'
  return name.split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

const formatRelativeTime = (date) => {
  if (!date) return 'Baru saja'
  
  let dateObj = date
  if (date?.toDate) dateObj = date.toDate()
  else if (typeof date === 'string') dateObj = new Date(date)
  else if (date?.seconds) dateObj = new Date(date.seconds * 1000)
  
  const now = new Date()
  const diffMs = now - dateObj
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 1) return 'Baru saja'
  if (diffMins < 60) return `${diffMins} menit lalu`
  if (diffHours < 24) return `${diffHours} jam lalu`
  if (diffDays < 7) return `${diffDays} hari lalu`
  return dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
}

// Truncate text
const truncateText = (text, maxLength) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/400x400?text=No+Image'
}
</script>

<style scoped>
.submission-card {
  position: relative;
  background: linear-gradient(135deg, rgba(26, 11, 46, 0.95), rgba(18, 6, 34, 0.98));
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  backdrop-filter: blur(10px);
}

.submission-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow: 
    0 20px 40px -12px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(139, 92, 246, 0.3),
    0 0 20px rgba(139, 92, 246, 0.3);
}

/* Glow effect on hover */
.card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.4), transparent 70%);
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
  z-index: 0;
}

.submission-card:hover .card-glow {
  opacity: 1;
}

.card-image-container {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.submission-card:hover .card-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.submission-card:hover .image-overlay {
  opacity: 1;
}

.like-heart {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  font-size: 48px;
  animation: heartPop 0.5s ease;
  pointer-events: none;
}

@keyframes heartPop {
  0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
  50% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
}

.card-content {
  position: relative;
  z-index: 2;
  padding: 16px;
  background: linear-gradient(135deg, rgba(26, 11, 46, 0.95), rgba(18, 6, 34, 0.98));
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(139, 92, 246, 0.5);
  flex-shrink: 0;
}

.avatar-text {
  color: white;
  font-weight: 700;
  font-size: 14px;
  font-family: 'Rajdhani', monospace;
}

.user-details {
  flex: 1;
}

.username {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #f0e6ff;
  font-family: 'Rajdhani', monospace;
}

.timestamp {
  margin: 2px 0 0;
  font-size: 11px;
  color: rgba(168, 85, 247, 0.6);
}

.caption {
  font-size: 13px;
  color: #c4b5fd;
  line-height: 1.5;
  margin: 0 0 12px 0;
  font-family: 'Exo 2', sans-serif;
}

.engagement {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  padding-top: 8px;
  border-top: 1px solid rgba(139, 92, 246, 0.2);
}

.engagement-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #a78bfa;
}

.icon {
  width: 16px;
  height: 16px;
}

.view-detail {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #c084fc;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s;
}

.submission-card:hover .view-detail {
  color: #e9d5ff;
  gap: 8px;
}

.arrow-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s;
}

.submission-card:hover .arrow-icon {
  transform: translateX(4px);
}

.card-scan {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #c084fc, #8b5cf6, #ec4899, transparent);
  top: 0;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.submission-card:hover .card-scan {
  opacity: 1;
  animation: scanMove 2s ease-in-out infinite;
}

@keyframes scanMove {
  0% { top: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
</style>