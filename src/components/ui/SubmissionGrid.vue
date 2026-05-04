<template>
  <div class="submission-grid-container">
    <div class="grid-header">
      <div class="header-left">
        <h2 class="grid-title">
          <span class="title-gradient">Poster Gallery</span>
        </h2>
        <p class="grid-subtitle">
          <span class="count-badge">{{ submissions.length }}</span> Karya Kreatif
        </p>
      </div>
      
      <div class="header-right">
        <!-- Search Bar -->
        <div class="search-bar">
          <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Cari poster..."
            class="search-input"
          />
        </div>
        
        <!-- View Toggle -->
        <div class="view-toggle">
          <button 
            @click="viewMode = 'grid'" 
            :class="{ active: viewMode === 'grid' }"
            class="toggle-btn"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button 
            @click="viewMode = 'list'" 
            :class="{ active: viewMode === 'list' }"
            class="toggle-btn"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="metaverse-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      <p class="loading-text">Loading Metaverse Gallery...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <div class="error-glow"></div>
      <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p>{{ error }}</p>
      <button @click="$emit('retry')" class="retry-btn">Coba Lagi</button>
    </div>
    
    <!-- Empty State -->
    <div v-else-if="filteredSubmissions.length === 0" class="empty-state">
      <div class="empty-animation">
        <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <p class="empty-title">Belum Ada Poster</p>
      <p class="empty-hint">Data submission akan muncul di sini</p>
    </div>
    
    <!-- Grid View -->
    <div v-else-if="viewMode === 'grid'" class="grid-layout">
      <SubmissionCard
        v-for="submission in paginatedSubmissions"
        :key="submission.id"
        :submission="submission"
        @click="openDetail"
      />
    </div>
    
    <!-- List View -->
    <div v-else class="list-layout">
      <div 
        v-for="submission in paginatedSubmissions" 
        :key="submission.id"
        class="list-item"
        @click="openDetail(submission)"
      >
        <img :src="submission.imageUrl" class="list-thumb" @error="handleThumbError" />
        <div class="list-info">
          <h4>{{ submission.studentName }}</h4>
          <p>{{ formatDate(submission.submittedAt) }}</p>
        </div>
        <svg class="list-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
    
    <!-- Pagination -->
    <div v-if="filteredSubmissions.length > 0" class="pagination">
      <button 
        @click="currentPage--" 
        :disabled="currentPage === 1"
        class="page-btn"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <div class="page-numbers">
        <button 
          v-for="page in totalPages" 
          :key="page"
          @click="currentPage = page"
          :class="{ active: currentPage === page }"
          class="page-num"
        >
          {{ page }}
        </button>
      </div>
      
      <button 
        @click="currentPage++" 
        :disabled="currentPage === totalPages"
        class="page-btn"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
    
    <!-- Detail Modal -->
    <SubmissionModal
      v-if="selectedSubmission"
      :submission="selectedSubmission"
      @close="closeDetail"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SubmissionCard from './SubmissionCard.vue'
import SubmissionModal from './SubmissionModal.vue'

const props = defineProps({
  submissions: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  }
})

defineEmits(['retry'])

// Local state
const searchQuery = ref('')
const viewMode = ref('grid')
const currentPage = ref(1)
const itemsPerPage = 12
const selectedSubmission = ref(null)

// Filtered submissions
const filteredSubmissions = computed(() => {
  if (!searchQuery.value) return props.submissions
  
  return props.submissions.filter(sub => 
    sub.studentName?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Pagination
const totalPages = computed(() => 
  Math.ceil(filteredSubmissions.value.length / itemsPerPage)
)

const paginatedSubmissions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredSubmissions.value.slice(start, end)
})

// Reset page when filter changes
const resetPagination = () => {
  currentPage.value = 1
}

// Watch for filter changes
import { watch } from 'vue'
watch(searchQuery, resetPagination)

// Open detail modal
const openDetail = (submission) => {
  selectedSubmission.value = submission
  document.body.style.overflow = 'hidden'
}

// Close detail modal
const closeDetail = () => {
  selectedSubmission.value = null
  document.body.style.overflow = 'auto'
}

// Format date for list view
const formatDate = (date) => {
  if (!date) return '-'
  let dateObj = date
  if (date?.toDate) dateObj = date.toDate()
  else if (typeof date === 'string') dateObj = new Date(date)
  else if (date?.seconds) dateObj = new Date(date.seconds * 1000)
  
  return dateObj.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// Handle thumb error
const handleThumbError = (e) => {
  e.target.src = 'https://via.placeholder.com/60x60?text=No+Image'
}
</script>

<style scoped>
.submission-grid-container {
  padding: 24px;
  background: linear-gradient(135deg, #0f0717 0%, #1a0b2e 100%);
  min-height: 100vh;
}

/* Header Styles */
.grid-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
  padding: 20px 24px;
  background: rgba(26, 11, 46, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  border: 1px solid rgba(139, 92, 246, 0.3);
}

.title-gradient {
  background: linear-gradient(135deg, #c084fc, #a855f7, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 28px;
  font-weight: 700;
  font-family: 'Rajdhani', monospace;
}

.grid-subtitle {
  margin: 8px 0 0;
  font-size: 14px;
  color: #a78bfa;
}

.count-badge {
  display: inline-block;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  padding: 2px 8px;
  border-radius: 20px;
  color: white;
  font-weight: 700;
  margin-right: 8px;
}

.header-right {
  display: flex;
  gap: 16px;
  align-items: center;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 40px;
  padding: 8px 16px;
  transition: all 0.3s;
}

.search-bar:focus-within {
  border-color: #c084fc;
  box-shadow: 0 0 15px rgba(192, 132, 252, 0.3);
}

.search-icon {
  width: 18px;
  height: 18px;
  color: #a78bfa;
}

.search-input {
  background: none;
  border: none;
  color: white;
  font-size: 14px;
  outline: none;
  min-width: 200px;
}

.search-input::placeholder {
  color: rgba(168, 85, 247, 0.5);
}

.view-toggle {
  display: flex;
  gap: 8px;
  background: rgba(0, 0, 0, 0.4);
  padding: 4px;
  border-radius: 40px;
  border: 1px solid rgba(139, 92, 246, 0.3);
}

.toggle-btn {
  background: none;
  border: none;
  padding: 8px 12px;
  border-radius: 32px;
  cursor: pointer;
  color: #a78bfa;
  transition: all 0.3s;
  display: flex;
  align-items: center;
}

.toggle-btn svg {
  width: 18px;
  height: 18px;
}

.toggle-btn.active {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
}

/* Grid Layout */
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  animation: fadeInUp 0.5s ease;
}

/* List Layout */
.list-layout {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(26, 11, 46, 0.6);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid rgba(139, 92, 246, 0.2);
}

.list-item:hover {
  transform: translateX(8px);
  border-color: rgba(139, 92, 246, 0.5);
  background: rgba(26, 11, 46, 0.8);
  box-shadow: 0 5px 20px rgba(139, 92, 246, 0.2);
}

.list-thumb {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
}

.list-info {
  flex: 1;
}

.list-info h4 {
  margin: 0 0 4px;
  color: #f0e6ff;
  font-size: 16px;
}

.list-info p {
  margin: 0;
  color: #a78bfa;
  font-size: 12px;
}

.list-arrow {
  width: 20px;
  height: 20px;
  color: #c084fc;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
  padding: 20px;
}

.page-btn {
  background: rgba(26, 11, 46, 0.6);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 12px;
  padding: 8px 12px;
  cursor: pointer;
  color: #c084fc;
  transition: all 0.3s;
}

.page-btn:hover:not(:disabled) {
  background: #8b5cf6;
  color: white;
  border-color: #8b5cf6;
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-btn svg {
  width: 18px;
  height: 18px;
}

.page-numbers {
  display: flex;
  gap: 8px;
}

.page-num {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(26, 11, 46, 0.6);
  border: 1px solid rgba(139, 92, 246, 0.3);
  cursor: pointer;
  color: #a78bfa;
  transition: all 0.3s;
}

.page-num.active {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  border-color: transparent;
}

.page-num:hover:not(.active) {
  background: rgba(139, 92, 246, 0.3);
}

/* Loading Spinner Metaverse Style */
.metaverse-spinner {
  position: relative;
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
}

.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
}

.spinner-ring:nth-child(1) {
  border-top-color: #c084fc;
  animation-delay: 0s;
}

.spinner-ring:nth-child(2) {
  border-right-color: #8b5cf6;
  animation-delay: 0.5s;
}

.spinner-ring:nth-child(3) {
  border-bottom-color: #ec4899;
  animation-delay: 1s;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  color: #a78bfa;
  text-align: center;
  font-family: 'Rajdhani', monospace;
  letter-spacing: 2px;
}

/* Empty & Error States */
.empty-state, .error-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-animation {
  margin-bottom: 20px;
}

.empty-icon, .error-icon {
  width: 80px;
  height: 80px;
  color: #8b5cf6;
  opacity: 0.5;
}

.empty-title {
  font-size: 20px;
  color: #c084fc;
  margin: 16px 0 8px;
}

.empty-hint {
  color: #a78bfa;
  font-size: 14px;
}

.error-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.2), transparent);
  border-radius: 50%;
  filter: blur(30px);
}

.retry-btn {
  margin-top: 20px;
  padding: 10px 24px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border: none;
  border-radius: 40px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(139, 92, 246, 0.4);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .submission-grid-container {
    padding: 16px;
  }
  
  .grid-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header-right {
    flex-direction: column;
  }
  
  .grid-layout {
    grid-template-columns: 1fr;
  }
  
  .title-gradient {
    font-size: 22px;
  }
  
  .search-input {
    min-width: auto;
  }
}
</style>