<template>
  <Teleport to="body">
    <transition name="form-slide">
      <div v-if="show" class="form-overlay" @click.self="$emit('close')">
        <div class="form-panel">
          <div class="panel-glow-border"></div>
          <div class="panel-inner">
            <div class="panel-scan"></div>

            <!-- Header -->
            <div class="panel-header">
              <div>
                <p class="panel-eyebrow">Pengumpulan Tugas</p>
                <h2 class="panel-title">Submit Poster</h2>
              </div>
              <button class="close-btn" @click="$emit('close')">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <MvDivider />

            <!-- SUCCESS STATE -->
            <div v-if="state === 'success'" class="success-state">
              <div class="success-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22c55e"
                  stroke-width="2"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 class="success-title">Tugas Berhasil Dikumpulkan!</h3>
              <p class="success-sub">Jawaban kamu sudah tersimpan. Semangat terus belajarnya! 🚀</p>
              <button class="btn-primary" @click="reset">Tutup</button>
            </div>

            <!-- FORM STATE -->
            <div v-else class="form-body">
              <!-- Nama siswa -->
              <div class="field">
                <label class="field-label">Nama Lengkap <span class="required">*</span></label>
                <div class="input-wrap" :class="{ error: errors.name, focused: focus.name }">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="Masukkan nama lengkap kamu"
                    class="mv-input"
                    @focus="focus.name = true"
                    @blur="((focus.name = false), validateName())"
                  />
                </div>
                <p v-if="errors.name" class="field-error">{{ errors.name }}</p>
              </div>

              <!-- Upload file -->
              <div class="field">
                <label class="field-label">Upload Jawaban <span class="required">*</span></label>
                <div
                  class="dropzone"
                  :class="{ dragging, 'has-file': file, error: errors.file }"
                  @click="triggerFile"
                  @dragover.prevent="dragging = true"
                  @dragleave="dragging = false"
                  @drop.prevent="onDrop"
                >
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="hidden-input"
                    @change="onFileChange"
                  />

                  <!-- Preview -->
                  <div v-if="file" class="file-preview">
                    <img :src="previewUrl" alt="preview" class="preview-img" />
                    <div class="preview-info">
                      <p class="preview-name">{{ file.name }}</p>
                      <p class="preview-size">{{ fileSize }}</p>
                    </div>
                    <button class="remove-file" @click.stop="removeFile">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <!-- Empty state -->
                  <div v-else class="dropzone-empty">
                    <div class="dz-icon">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(168,85,247,0.5)"
                        stroke-width="1.5"
                      >
                        <polyline points="16 16 12 12 8 16" />
                        <line x1="12" y1="12" x2="12" y2="21" />
                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                      </svg>
                    </div>
                    <p class="dz-main">Drag & drop atau <span class="dz-link">pilih file</span></p>
                    <p class="dz-sub">PNG, JPG, JPEG — maks. 5 MB</p>
                  </div>
                </div>
                <p v-if="errors.file" class="field-error">{{ errors.file }}</p>
              </div>

              <!-- Upload progress -->
              <div v-if="state === 'uploading'" class="progress-wrap">
                <div class="progress-header">
                  <span class="progress-label">Mengunggah...</span>
                  <span class="progress-pct">{{ uploadPct }}%</span>
                </div>
                <div class="progress-bar-bg">
                  <div class="progress-bar-fill" :style="{ width: uploadPct + '%' }"></div>
                </div>
                <p class="progress-step">{{ progressStep }}</p>
              </div>

              <!-- Error message -->
              <div v-if="state === 'error'" class="error-banner">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f43f5e"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {{ errorMsg }}
              </div>

              <!-- Submit -->
              <button class="btn-primary" :disabled="state === 'uploading'" @click="submit">
                <span v-if="state === 'uploading'" class="btn-spinner"></span>
                <svg
                  v-else
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
                {{ state === 'uploading' ? 'Mengumpulkan...' : 'Kumpulkan Tugas' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import MvDivider from '../../components/ui/MvDivider.vue'

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDD1yZstmkVwm2cGs_k1mnL6pH21SQcRFE',
  authDomain: 'biotech-malang.firebaseapp.com',
  projectId: 'biotech-malang',
  storageBucket: 'biotech-malang.firebasestorage.app',
  messagingSenderId: '407516385593',
  appId: '1:407516385593:web:45e5f9f033b1d7c8d4d8e8',
  measurementId: 'G-L2YZZH2R74',
}

const CLOUDINARY_CLOUD_NAME = 'dqmvbfja3'
const CLOUDINARY_UPLOAD_PRESET = 'biotech'

const firebaseApp = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG)
const db = getFirestore(firebaseApp)

const props = defineProps({
  show: { type: Boolean, required: true },
  worksheet: { type: Object, default: () => ({}) },
})
defineEmits(['close'])

const state = ref('idle')
const uploadPct = ref(0)
const progressStep = ref('')
const errorMsg = ref('')

const form = ref({ name: '' })
const errors = ref({ name: '', file: '' })
const focus = ref({ name: false })

const fileInput = ref(null)
const file = ref(null)
const previewUrl = ref('')
const dragging = ref(false)

const fileSize = computed(() => {
  if (!file.value) return ''
  const kb = file.value.size / 1024
  return kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb.toFixed(0)} KB`
})

watch(
  () => props.show,
  (v) => {
    if (!v) reset()
  },
)

// ── validation
const validateName = () => {
  errors.value.name = form.value.name.trim().length < 3 ? 'Nama minimal 3 karakter' : ''
}

const validateFile = () => {
  if (!file.value) {
    errors.value.file = 'Harap upload file jawaban'
    return false
  }
  if (file.value.size > 5 * 1024 * 1024) {
    errors.value.file = 'Ukuran file maksimal 5 MB'
    return false
  }
  errors.value.file = ''
  return true
}

// ── file handlers
const triggerFile = () => fileInput.value?.click()
const removeFile = () => {
  file.value = null
  previewUrl.value = ''
}

const setFile = (f) => {
  if (!f) return
  file.value = f
  previewUrl.value = URL.createObjectURL(f)
  errors.value.file = ''
}

const onFileChange = (e) => setFile(e.target.files[0])
const onDrop = (e) => {
  dragging.value = false
  setFile(e.dataTransfer.files[0])
}

// ── upload to Cloudinary
const uploadToCloudinary = async (f) => {
  const fd = new FormData()
  fd.append('file', f)
  fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
  fd.append('folder', 'worksheet_submissions')

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`)

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        uploadPct.value = Math.round((e.loaded / e.total) * 70) // 0–70%
      }
    }

    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText)
        resolve(data.secure_url)
      } else {
        reject(new Error('Upload ke Cloudinary gagal'))
      }
    }

    xhr.onerror = () => reject(new Error('Koneksi gagal saat upload'))
    xhr.send(fd)
  })
}

// ── save to Firestore
const saveToFirestore = async (imageUrl) => {
  uploadPct.value = 85
  progressStep.value = 'Menyimpan data...'

  await addDoc(collection(db, 'submissions'), {
    studentName: form.value.name.trim(),
    imageUrl,
    submittedAt: serverTimestamp(),
  })

  uploadPct.value = 100
}

// ── main submit
const submit = async () => {
  validateName()
  if (errors.value.name || !validateFile()) return

  try {
    state.value = 'uploading'
    uploadPct.value = 0
    progressStep.value = 'Mengunggah gambar ke cloud...'

    const imageUrl = await uploadToCloudinary(file.value)

    progressStep.value = 'Menyimpan ke database...'
    await saveToFirestore(imageUrl)

    state.value = 'success'
  } catch (err) {
    state.value = 'error'
    errorMsg.value = err.message || 'Terjadi kesalahan, coba lagi.'
  }
}

const reset = () => {
  state.value = 'idle'
  uploadPct.value = 0
  form.value.name = ''
  errors.value = { name: '', file: '' }
  file.value = null
  previewUrl.value = ''
  errorMsg.value = ''
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&family=Exo+2:wght@400;500;600&display=swap');

/* ── Overlay ── */
.form-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(5, 0, 20, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  backdrop-filter: blur(8px);
}

.form-panel {
  position: relative;
  width: 100%;
  max-width: 480px;
  border-radius: 22px;
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

.panel-glow-border {
  display: none;
} /* border handled by wrapper */

.panel-inner {
  position: relative;
  background: linear-gradient(160deg, #130022 0%, #0c001a 100%);
  border-radius: 20px;
  overflow: hidden;
}

.panel-scan {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(192, 132, 252, 0.35), transparent);
  animation: scanAnim 5s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
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

/* ── Panel header ── */
.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px 24px 0px;
  position: relative;
  z-index: 1;
}

.panel-eyebrow {
  font-family: 'Rajdhani', sans-serif;
  font-size: 10px;
  letter-spacing: 2.5px;
  color: rgba(168, 85, 247, 0.55);
  text-transform: uppercase;
  margin: 0 0 4px;
}

.panel-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
}

.close-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(109, 40, 217, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c084fc;
  cursor: pointer;
  flex-shrink: 0;
  transition:
    background 0.2s,
    transform 0.2s;
}

.close-btn:hover {
  background: rgba(168, 85, 247, 0.3);
  transform: rotate(90deg);
}

/* ── Form body ── */
.form-body {
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: relative;
  z-index: 1;
}

/* Worksheet info box */
.ws-info-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: rgba(109, 40, 217, 0.12);
  border: 1px solid rgba(168, 85, 247, 0.15);
  border-radius: 12px;
}

.ws-info-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(109, 40, 217, 0.25);
  border: 1px solid rgba(168, 85, 247, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ws-info-label {
  font-family: 'Exo 2', sans-serif;
  font-size: 10px;
  color: rgba(168, 85, 247, 0.5);
  margin: 0 0 2px;
  letter-spacing: 0.5px;
}

.ws-info-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #e9d5ff;
  margin: 0;
  line-height: 1.3;
}

/* Fields */
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-family: 'Exo 2', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: rgba(168, 85, 247, 0.7);
  letter-spacing: 0.3px;
}

.required {
  color: #f43f5e;
}

.input-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(22, 6, 44, 0.6);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 10px;
  padding: 0 14px;
  color: rgba(168, 85, 247, 0.4);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.input-wrap.focused {
  border-color: rgba(168, 85, 247, 0.55);
  box-shadow: 0 0 0 3px rgba(109, 40, 217, 0.12);
}

.input-wrap.error {
  border-color: rgba(244, 63, 94, 0.5);
}

.mv-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: 'Exo 2', sans-serif;
  font-size: 13px;
  color: #e9d5ff;
  padding: 12px 0;
}

.mv-input::placeholder {
  color: rgba(168, 85, 247, 0.3);
}

.field-error {
  font-family: 'Exo 2', sans-serif;
  font-size: 11px;
  color: #f43f5e;
  margin: 0;
}

/* Dropzone */
.dropzone {
  border: 1.5px dashed rgba(168, 85, 247, 0.25);
  border-radius: 12px;
  background: rgba(22, 6, 44, 0.4);
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s;
  overflow: hidden;
}

.dropzone:hover,
.dropzone.dragging {
  border-color: rgba(168, 85, 247, 0.55);
  background: rgba(109, 40, 217, 0.1);
}

.dropzone.has-file {
  border-style: solid;
  border-color: rgba(168, 85, 247, 0.3);
}
.dropzone.error {
  border-color: rgba(244, 63, 94, 0.4);
}

.hidden-input {
  display: none;
}

.dropzone-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 28px 16px;
}

.dz-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(109, 40, 217, 0.15);
  border: 1px solid rgba(168, 85, 247, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}

.dz-main {
  font-family: 'Exo 2', sans-serif;
  font-size: 13px;
  color: rgba(168, 85, 247, 0.6);
  margin: 0;
  text-align: center;
}

.dz-link {
  color: #a855f7;
  font-weight: 600;
}

.dz-sub {
  font-family: 'Exo 2', sans-serif;
  font-size: 11px;
  color: rgba(168, 85, 247, 0.35);
  margin: 0;
}

/* File preview */
.file-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
}

.preview-img {
  width: 52px;
  height: 52px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid rgba(168, 85, 247, 0.25);
  flex-shrink: 0;
}

.preview-info {
  flex: 1;
  min-width: 0;
}

.preview-name {
  font-family: 'Exo 2', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #e9d5ff;
  margin: 0 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.preview-size {
  font-family: 'Exo 2', sans-serif;
  font-size: 11px;
  color: rgba(168, 85, 247, 0.45);
  margin: 0;
}

.remove-file {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(244, 63, 94, 0.15);
  border: 1px solid rgba(244, 63, 94, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f43f5e;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s;
}

.remove-file:hover {
  background: rgba(244, 63, 94, 0.3);
}

/* Progress */
.progress-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px;
  background: rgba(109, 40, 217, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.15);
  border-radius: 12px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-label {
  font-family: 'Exo 2', sans-serif;
  font-size: 12px;
  color: rgba(168, 85, 247, 0.7);
}

.progress-pct {
  font-family: 'Rajdhani', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #c084fc;
}

.progress-bar-bg {
  height: 4px;
  background: rgba(109, 40, 217, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #c084fc, #0ea5e9);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-step {
  font-family: 'Exo 2', sans-serif;
  font-size: 11px;
  color: rgba(168, 85, 247, 0.45);
  margin: 0;
}

/* Error banner */
.error-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: rgba(244, 63, 94, 0.08);
  border: 1px solid rgba(244, 63, 94, 0.2);
  border-radius: 10px;
  font-family: 'Exo 2', sans-serif;
  font-size: 12px;
  color: #f43f5e;
}

/* Submit button */
.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 13px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6d28d9, #a855f7);
  border: none;
  font-family: 'Rajdhani', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition:
    opacity 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
  box-shadow: 0 4px 20px rgba(109, 40, 217, 0.4);
}

.btn-primary:hover:not(:disabled) {
  opacity: 0.92;
  transform: translateY(-1px);
  box-shadow: 0 8px 28px rgba(109, 40, 217, 0.5);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-spinner {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Success state */
.success-state {
  padding: 16px 24px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.success-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(34, 197, 94, 0.1);
  border: 2px solid rgba(34, 197, 94, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 24px rgba(34, 197, 94, 0.2);
}

.success-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.success-sub {
  font-family: 'Exo 2', sans-serif;
  font-size: 13px;
  color: #9d7ec0;
  margin: 0;
  line-height: 1.6;
}

/* Transition */
.form-slide-enter-active,
.form-slide-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.form-slide-enter-from,
.form-slide-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
