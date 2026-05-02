<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { collection, query, orderBy, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '@/config/firebase'
import EasyDataTable from 'vue3-easy-data-table'
import MvBackground from '@/components/ui/MvBackground.vue'
import 'vue3-easy-data-table/dist/style.css'

// State
const items = ref([])
const loading = ref(true)
const error = ref(null)
let unsubscribe = null // Untuk real-time listener

// Modal state untuk preview gambar
const showModal = ref(false)
const selectedImage = ref('')
const selectedStudentName = ref('')
const isDownloading = ref(false)

// Headers table
const headers = [
  { text: 'Poster', value: 'imageUrl', sortable: false },
  { text: 'Nama Student', value: 'studentName', sortable: true },
  { text: 'Submitted At', value: 'submittedAt', sortable: true },
]

// Format tanggal
const formatDate = (date) => {
  if (!date) return '-'

  // Handle Firestore Timestamp
  let dateObj = date
  if (date?.toDate) {
    dateObj = date.toDate()
  } else if (typeof date === 'string') {
    dateObj = new Date(date)
  } else if (date?.seconds) {
    // Handle Timestamp dengan seconds
    dateObj = new Date(date.seconds * 1000)
  }

  return dateObj.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Buka modal preview
const openImagePreview = (imageUrl, studentName) => {
  selectedImage.value = imageUrl
  selectedStudentName.value = studentName
  showModal.value = true
  // Prevent scrolling background
  document.body.style.overflow = 'hidden'
}

// Tutup modal
const closeModal = () => {
  showModal.value = false
  selectedImage.value = ''
  selectedStudentName.value = ''
  // Restore scrolling
  document.body.style.overflow = 'auto'
}

// Download gambar
const downloadImage = async () => {
  if (!selectedImage.value) return

  isDownloading.value = true

  try {
    // Fetch gambar dari URL
    const response = await fetch(selectedImage.value)
    const blob = await response.blob()

    // Create download link
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url

    // Generate filename: poster_nama_timestamp.jpg
    const fileName = `poster_${selectedStudentName.value.replace(/\s+/g, '_')}_${Date.now()}.jpg`
    link.download = fileName

    // Trigger download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Cleanup
    window.URL.revokeObjectURL(url)

    // Optional: show success message
    console.log('Download berhasil')
  } catch (error) {
    console.error('Download error:', error)
    alert('Gagal mendownload gambar. Silakan coba lagi.')
  } finally {
    isDownloading.value = false
  }
}

// Fetch data dari Firebase (once)
const fetchSubmissions = async () => {
  loading.value = true
  error.value = null

  try {
    const submissionsRef = collection(db, 'submissions')
    const q = query(submissionsRef, orderBy('submittedAt', 'desc'))
    const querySnapshot = await getDocs(q)

    const fetchedItems = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      fetchedItems.push({
        id: doc.id,
        imageUrl: data.imageUrl || 'https://via.placeholder.com/80',
        studentName: data.studentName || 'Anonymous',
        submittedAt: data.submittedAt,
      })
    })

    items.value = fetchedItems
    console.log(`✅ Berhasil mengambil ${fetchedItems.length} data`)
  } catch (err) {
    console.error('❌ Error fetching data:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Real-time listener (OTOMATIS update jika ada perubahan)
const subscribeToSubmissions = () => {
  const submissionsRef = collection(db, 'submissions')
  const q = query(submissionsRef, orderBy('submittedAt', 'desc'))

  return onSnapshot(
    q,
    (querySnapshot) => {
      const fetchedItems = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        fetchedItems.push({
          id: doc.id,
          imageUrl: data.imageUrl || 'https://via.placeholder.com/80',
          studentName: data.studentName || 'Anonymous',
          submittedAt: data.submittedAt,
        })
      })
      items.value = fetchedItems
      loading.value = false
      console.log(`🔄 Real-time update: ${fetchedItems.length} data`)
    },
    (err) => {
      console.error('❌ Real-time error:', err)
      error.value = err.message
      loading.value = false
    },
  )
}

// Lifecycle
onMounted(() => {
  unsubscribe = subscribeToSubmissions()
})

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
  }
  // Cleanup modal scroll
  document.body.style.overflow = 'auto'
})
</script>

<template>
  <MvBackground class="page-wrapper">
    <div class="table-container">
      <!-- Header -->
      <div class="table-header">
        <div>
          <h2>Poster Submissions</h2>
          <p v-if="!loading">{{ items.length }} submission tersedia</p>
          <p v-else>Loading data...</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Mengambil data dari Firebase...</p>
        <p class="hint">Pastikan koneksi internet aktif</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p>Error: {{ error }}</p>
        <button @click="fetchSubmissions" class="retry-btn">Coba Lagi</button>
      </div>

      <!-- Table -->
      <EasyDataTable
        v-else
        :headers="headers"
        :items="items"
        :rows-per-page="5"
        :rows-per-page-options="[5, 10, 25, 50]"
        :buttons-pagination="true"
        table-class-name="custom-table"
      >
        <!-- Poster Column (imageUrl) - Bisa DIKLIK -->
        <template #item-imageUrl="{ imageUrl, studentName }">
          <div class="poster-cell">
            <img
              :src="imageUrl"
              class="poster-img clickable"
              :title="`Klik untuk melihat poster ${studentName}`"
              @click="openImagePreview(imageUrl, studentName)"
              @error="(e) => (e.target.src = 'https://via.placeholder.com/80?text=No+Image')"
            />
            <span class="zoom-hint">🔍 Klik untuk preview</span>
          </div>
        </template>

        <!-- Student Name Column -->
        <template #item-studentName="{ studentName }">
          <div class="name-cell">
            <span class="name-text">{{ studentName }}</span>
          </div>
        </template>

        <!-- Submitted At Column -->
        <template #item-submittedAt="{ submittedAt }">
          <div class="date-cell">
            <svg class="date-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{{ formatDate(submittedAt) }}</span>
          </div>
        </template>

        <!-- Empty state -->
        <template #empty-message>
          <div class="empty-state">
            <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p>📭 Belum ada data submission</p>
            <p class="empty-hint">Data akan muncul setelah ada submission dari siswa</p>
          </div>
        </template>
      </EasyDataTable>
    </div>

    <!-- MODAL PREVIEW GAMBAR -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <!-- Header Modal -->
        <div class="modal-header">
          <div>
            <h3>Preview Poster</h3>
            <p class="modal-student-name">{{ selectedStudentName }}</p>
          </div>
          <button class="close-btn" @click="closeModal">✕</button>
        </div>

        <!-- Image Preview -->
        <div class="modal-body">
          <img
            :src="selectedImage"
            class="preview-image"
            :alt="`Poster ${selectedStudentName}`"
            @error="(e) => (e.target.src = 'https://via.placeholder.com/500?text=Image+Not+Found')"
          />
        </div>

        <!-- Footer Modal dengan Tombol Download -->
        <div class="modal-footer">
          <button class="download-btn" @click="downloadImage" :disabled="isDownloading">
            <svg
              v-if="!isDownloading"
              class="btn-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <div v-else class="spinner-small"></div>
            {{ isDownloading ? 'Mengunduh...' : 'Download Gambar' }}
          </button>
          <button class="close-btn-footer" @click="closeModal">Tutup</button>
        </div>
      </div>
    </div>
  </MvBackground>
</template>

<style scoped>
.page-wrapper {
  padding: 40px 24px;
  width: 90vw;
}

/* Container card utama */
.table-container {
  width: 100%;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

/* Header simpel - no kotak2 */
.table-header {
  padding: 24px 32px;
  background: white;
  border-bottom: 1px solid #f0f0f0;
}

.table-header h2 {
  margin: 0 0 6px 0;
  font-size: 24px;
  font-weight: 600;
  color: #1a202c;
  letter-spacing: -0.3px;
}

.table-header p {
  margin: 0;
  font-size: 14px;
  color: #718096;
}

/* Custom table styling */
:deep(.custom-table) {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

:deep(.custom-table .v3dt__thead) {
  background: #fafbfc;
}

:deep(.custom-table .v3dt__thead th) {
  padding: 16px 24px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #4a5568;
  border-bottom: 1px solid #e2e8f0;
  background: #fafbfc;
}

:deep(.custom-table .v3dt__tbody td) {
  padding: 16px 24px;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

:deep(.custom-table .v3dt__tbody tr:hover) {
  background: #fafbfc;
  transition: all 0.2s ease;
}

/* Poster styling dengan efek hover dan klik */
.poster-cell {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.poster-img {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 2px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
}

.poster-img.clickable:hover {
  transform: scale(1.05);
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.zoom-hint {
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  opacity: 0;
  transition: opacity 0.2s;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  pointer-events: none;
  font-weight: 500;
}

.poster-cell:hover .zoom-hint {
  opacity: 1;
}

/* Name styling */
.name-cell {
  display: flex;
  align-items: center;
}

.name-text {
  font-weight: 500;
  color: #2d3748;
  font-size: 15px;
}

/* Date styling */
.date-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #718096;
  font-size: 13px;
}

.date-icon {
  width: 16px;
  height: 16px;
  color: #a0aec0;
}

:deep(.custom-table .v3dt__footer) {
  background: white;
  padding: 100px 100px;
  border-top: 1px solid #e2e8f0;
  margin-top: 0;
  height: 100px;
}

:deep(.custom-table .v3dt-pagination) {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}

:deep(.custom-table .v3dt-pagination .v3dt-pagination__rows-selector) {
  display: flex;
  align-items: center;
  gap: 8px;
}

:deep(.custom-table select) {
  padding: 6px 28px 6px 12px;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  background: white;
  font-size: 13px;
  color: #2d3748;
  cursor: pointer;
}

:deep(.custom-table button) {
  padding: 6px 12px;
  border: 1px solid #cbd5e0;
  background: white;
  border-radius: 8px;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s;
}

:deep(.custom-table button:hover:not(:disabled)) {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

:deep(.custom-table .v3dt-pagination__item--active) {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

/* Styling footer pagination */
:deep(.easy-data-table__rows-selector) {
  position: relative;
}

:deep(.easy-data-table__rows-selector ul.select-items) {
  position: absolute !important;
  bottom: 100% !important; /* Biar muncul di atas */
  top: auto !important; /* Matikan top default */
  margin-bottom: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 9999;
}

/* Styling tambahan */
:deep(.easy-data-table__rows-selector ul.select-items.show) {
  display: block;
  position: absolute !important;
  bottom: 100% !important;
  top: auto !important;
  left: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 4px 0;
  min-width: 80px;
}

:deep(.easy-data-table__rows-selector ul.select-items li) {
  padding: 8px 16px;
  cursor: pointer;
  list-style: none;
  font-size: 14px;
}

:deep(.easy-data-table__rows-selector ul.select-items li:hover) {
  background: #f3f4f6;
}
/* Tablee end */

/* MODAL STYLES - Professional */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  max-width: 90vw;
  max-height: 90vh;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  margin: 0 0 4px 0;
  font-size: 20px;
  font-weight: 600;
  color: white;
}

.modal-student-name {
  margin: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: white;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.modal-body {
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0f172a;
  min-height: 400px;
  max-height: 60vh;
  overflow: auto;
}

.preview-image {
  max-width: 100%;
  max-height: 60vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 16px 24px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

.download-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
}

.download-btn:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.download-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.close-btn-footer {
  padding: 10px 24px;
  background: #e2e8f0;
  color: #475569;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
}

.close-btn-footer:hover {
  background: #cbd5e1;
  transform: translateY(-1px);
}

/* Loading state */
.loading-state {
  padding: 60px 24px;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 16px;
  border: 3px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.hint {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 8px;
}

.error-state {
  padding: 60px 24px;
  text-align: center;
  color: #ef4444;
}

.error-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
}

.retry-btn {
  margin-top: 16px;
  padding: 8px 20px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.empty-state {
  padding: 60px 24px;
  text-align: center;
  color: #9ca3af;
}

.empty-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
}

.empty-hint {
  font-size: 12px;
  margin-top: 8px;
}

/* Responsive */
@media (max-width: 768px) {
  .page-wrapper {
    padding: 16px;
  }

  .table-header {
    padding: 16px 20px;
  }

  .table-header h2 {
    font-size: 20px;
  }

  :deep(.custom-table .v3dt__thead th),
  :deep(.custom-table .v3dt__tbody td) {
    padding: 12px 16px;
  }

  .poster-img {
    width: 40px;
    height: 40px;
  }

  .name-text {
    font-size: 13px;
  }

  /* Modal responsive */
  .modal-content {
    width: 95vw;
    max-height: 95vh;
  }

  .modal-header {
    padding: 16px;
  }

  .modal-header h3 {
    font-size: 18px;
  }

  .modal-body {
    padding: 16px;
    min-height: 300px;
  }

  .preview-image {
    max-height: 50vh;
  }

  .modal-footer {
    padding: 12px 16px;
    flex-direction: column;
  }

  .download-btn,
  .close-btn-footer {
    justify-content: center;
  }

  .zoom-hint {
    display: none;
  }
}
</style>
