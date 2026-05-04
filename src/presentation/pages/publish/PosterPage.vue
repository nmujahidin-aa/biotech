<template>
  <MvBackground class="submissions-page">
    <SubmissionGrid
      :submissions="items"
      :loading="loading"
      :error="error"
      @retry="fetchSubmissions"
    />
  </MvBackground>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '@/config/firebase'
import MvBackground from '@/components/ui/MvBackground.vue'
import SubmissionGrid from '@/components/ui/SubmissionGrid.vue'

const items = ref([])
const loading = ref(true)
const error = ref(null)
let unsubscribe = null

// Fetch data with real-time listener
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
          imageUrl: data.imageUrl || 'https://via.placeholder.com/400x400?text=No+Image',
          studentName: data.studentName || 'Anonymous',
          submittedAt: data.submittedAt,
          caption: data.caption || '',
          likes: data.likes || 0,
          comments: data.comments || 0
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
    }
  )
}

const fetchSubmissions = () => {
  loading.value = true
  error.value = null
  if (unsubscribe) unsubscribe()
  unsubscribe = subscribeToSubmissions()
}

onMounted(() => {
  unsubscribe = subscribeToSubmissions()
})

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
  }
})
</script>

<style scoped>
.submissions-page {
  padding: 0 !important;
  min-height: 100vh;
  /* PASTIKAN overflow diizinkan */
  overflow-y: auto;
  overflow-x: hidden;
  display: block;
}

/* Jika MvBackground punya overflow hidden, override */
:deep(.mv-background) {
  overflow-y: auto !important;
  overflow-x: hidden !important;
  min-height: 100vh;
  height: auto !important;
}
</style>