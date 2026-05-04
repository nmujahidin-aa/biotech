<!-- components/submission/SubmissionModal.vue -->
<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-container" @click.stop>
      <!-- Close Button -->
      <button class="modal-close" @click="$emit('close')">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div class="modal-content-wrapper">
        <!-- Image Section -->
        <div class="modal-image-section">
          <div class="image-container">
            <img 
              :src="submission.imageUrl" 
              :alt="submission.studentName"
              class="modal-image"
              @error="handleImageError"
            />
            <div class="image-glow"></div>
          </div>
        </div>
        
        <!-- Info Section -->
        <div class="modal-info-section">
          <!-- User Header -->
          <div class="info-header">
            <div class="user-avatar-large">
              <span>{{ getInitials(submission.studentName) }}</span>
            </div>
            <div class="user-meta">
              <h3>{{ submission.studentName }}</h3>
              <div class="post-time">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ formatFullDate(submission.submittedAt) }}</span>
              </div>
            </div>
          </div>
          
          <!-- Caption -->
          <div class="info-caption" v-if="submission.caption">
            <p>{{ submission.caption }}</p>
          </div>
          
          <!-- Engagement Stats -->
          <div class="info-stats">
            <div class="stat">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{{ submission.likes || 0 }} Likes</span>
            </div>
            <div class="stat">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{{ submission.comments || 0 }} Comments</span>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="info-actions">
            <button class="action-btn like-btn" @click="handleLike">
              <svg :fill="liked ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{{ liked ? 'Liked' : 'Like' }}</span>
            </button>
            
            <button class="action-btn download-btn" @click="downloadImage">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{{ isDownloading ? 'Downloading...' : 'Download' }}</span>
            </button>
            
            <button class="action-btn share-btn" @click="sharePost">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share</span>
            </button>
          </div>
          
          <!-- Close Button Footer -->
          <button class="close-footer-btn" @click="$emit('close')">
            Tutup
          </button>
        </div>
      </div>
    </div>
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

defineEmits(['close'])

const liked = ref(false)
const isDownloading = ref(false)

// Get initials
const getInitials = (name) => {
  if (!name) return '?'
  return name.split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

// Format full date
const formatFullDate = (date) => {
  if (!date) return 'Unknown date'
  
  let dateObj = date
  if (date?.toDate) dateObj = date.toDate()
  else if (typeof date === 'string') dateObj = new Date(date)
  else if (date?.seconds) dateObj = new Date(date.seconds * 1000)
  
  return dateObj.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Handle like
const handleLike = () => {
  liked.value = !liked.value
  // You can implement Firebase update here
}

// Download image
const downloadImage = async () => {
  if (!props.submission.imageUrl) return
  
  isDownloading.value = true
  
  try {
    const response = await fetch(props.submission.imageUrl)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `poster_${props.submission.studentName.replace(/\s+/g, '_')}_${Date.now()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Download error:', error)
  } finally {
    isDownloading.value = false
  }
}

// Share post
const sharePost = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: `Poster by ${props.submission.studentName}`,
        text: props.submission.caption || 'Check out this poster!',
        url: props.submission.imageUrl
      })
    } catch (err) {
      console.log('Share cancelled')
    }
  } else {
    // Fallback - copy to clipboard
    await navigator.clipboard.writeText(props.submission.imageUrl)
    alert('Link copied to clipboard!')
  }
}

// Handle image error
const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/800x800?text=Image+Not+Found'
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-container {
  position: relative;
  width: 90vw;
  max-width: 1200px;
  height: 85vh;
  max-height: 800px;
  background: linear-gradient(135deg, #1a0b2e, #0f0717);
  border-radius: 32px;
  overflow: hidden;
  border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: 0 0 80px rgba(139, 92, 246, 0.2);
  animation: slideUp 0.4s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s;
}

.modal-close:hover {
  background: #ef4444;
  transform: rotate(90deg);
}

.modal-close svg {
  width: 20px;
  height: 20px;
}

.modal-content-wrapper {
  display: flex;
  height: 100%;
}

/* Image Section */
.modal-image-section {
  flex: 1.2;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  z-index: 1;
}

.image-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent);
  pointer-events: none;
}

/* Info Section */
.modal-info-section {
  flex: 0.8;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: linear-gradient(135deg, rgba(26, 11, 46, 0.9), rgba(15, 7, 23, 0.95));
  border-left: 1px solid rgba(139, 92, 246, 0.2);
}

.info-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
}

.user-avatar-large {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(139, 92, 246, 0.5);
}

.user-avatar-large span {
  color: white;
  font-weight: 700;
  font-size: 20px;
  font-family: 'Rajdhani', monospace;
}

.user-meta h3 {
  margin: 0 0 6px;
  color: #f0e6ff;
  font-size: 18px;
}

.post-time {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #a78bfa;
}

.post-time svg {
  width: 14px;
  height: 14px;
}

.info-caption {
  flex: 1;
  max-height: 200px;
  overflow-y: auto;
  padding-right: 8px;
}

.info-caption p {
  color: #c4b5fd;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

/* Custom scrollbar */
.info-caption::-webkit-scrollbar {
  width: 4px;
}

.info-caption::-webkit-scrollbar-track {
  background: rgba(139, 92, 246, 0.1);
  border-radius: 10px;
}

.info-caption::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.5);
  border-radius: 10px;
}

.info-stats {
  display: flex;
  gap: 24px;
  padding: 16px 0;
  border-top: 1px solid rgba(139, 92, 246, 0.2);
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
}

.stat {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #c084fc;
  font-size: 14px;
}

.stat svg {
  width: 18px;
  height: 18px;
}

.info-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 40px;
  color: #c084fc;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn svg {
  width: 18px;
  height: 18px;
}

.action-btn:hover {
  background: rgba(139, 92, 246, 0.3);
  transform: translateY(-2px);
}

.like-btn {
  background: rgba(236, 72, 153, 0.15);
  border-color: rgba(236, 72, 153, 0.3);
  color: #ec4899;
}

.like-btn:hover {
  background: rgba(236, 72, 153, 0.3);
}

.close-footer-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border: none;
  border-radius: 40px;
  color: white;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.close-footer-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(139, 92, 246, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-container {
    width: 95vw;
    height: 90vh;
  }
  
  .modal-content-wrapper {
    flex-direction: column;
  }
  
  .modal-image-section {
    flex: 1;
    min-height: 300px;
  }
  
  .modal-info-section {
    flex: 1;
    padding: 20px;
  }
  
  .info-actions {
    flex-direction: column;
  }
  
  .modal-close {
    top: 10px;
    right: 10px;
    width: 32px;
    height: 32px;
  }
}
</style>