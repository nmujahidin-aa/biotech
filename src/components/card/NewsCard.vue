<template>
  <div class="news-page">
    <!-- BG Effects -->
    <!-- <div class="bg-grid"></div>
    <div class="orb orb1"></div>
    <div class="orb orb2"></div>
    <div class="orb orb3"></div> -->

    <!-- ===== LIST VIEW ===== -->
    <transition name="page-slide">
      <div v-if="!activeNews" class="list-view" key="list">
        <!-- Header -->
        <!-- <div class="page-header">
          <div class="header-tag">Latest Updates</div>
          <h1 class="page-title">Berita & Informasi</h1>
          <p class="page-sub">
            Tetap terhubung dengan informasi terkini dari dunia pembelajaran digital
          </p>
          <div class="header-line"></div>
        </div> -->

        <!-- Featured News (index 0) -->
        <!-- <div class="featured-card" @click="openNews(newsList[0])">
          <div class="featured-img-wrap">
            <img
              v-if="newsList[0].image"
              :src="newsList[0].image"
              :alt="newsList[0].title"
              class="featured-img"
            />
            <div v-else class="featured-img-placeholder">
              <span class="placeholder-icon" v-html="newsList[0].icon || defaultIcon"></span>
            </div>
            <div class="featured-overlay"></div>
            <div class="featured-badge">{{ newsList[0].category }}</div>
          </div>
          <div class="featured-body">
            <div class="meta-row">
              <span class="meta-date">{{ newsList[0].date }}</span>
              <span class="meta-dot"></span>
              <span class="meta-author">{{ newsList[0].author }}</span>
              <span class="meta-read">{{ newsList[0].readTime }}</span>
            </div>
            <h2 class="featured-title">{{ newsList[0].title }}</h2>
            <p class="featured-desc">
              {{ truncate(newsList[0].content, 200) }}
              <span class="read-more">Baca selengkapnya →</span>
            </p>
          </div>
        </div> -->

        <!-- Grid Cards -->
        <div class="news-grid">
          <div
            v-for="(item, i) in newsList.slice(1)"
            :key="i"
            class="news-card"
            @click="openNews(item)"
          >
            <div class="card-img-wrap">
              <img v-if="item.image" :src="item.image" :alt="item.title" class="card-img" />
              <div v-else class="card-img-placeholder">
                <span class="placeholder-icon sm" v-html="item.icon || defaultIcon"></span>
              </div>
              <span class="card-badge">{{ item.category }}</span>
            </div>
            <div class="card-body">
              <div class="meta-row">
                <span class="meta-date">{{ item.date }}</span>
                <span class="meta-read">{{ item.readTime }}</span>
              </div>
              <h3 class="card-title">{{ item.title }}</h3>
              <p class="card-desc">
                {{ truncate(item.content, 200) }}
                <span class="read-more">Baca selengkapnya →</span>
              </p>
              <div class="card-footer">
                <span class="card-author">{{ item.author }}</span>
                <span class="card-arrow">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- ===== DETAIL VIEW ===== -->
    <transition name="page-slide">
      <div v-if="activeNews" class="detail-view" key="detail">
        <button class="back-btn" @click="closeNews">
          <span class="back-arrow">←</span>
          <span>Kembali ke Berita</span>
        </button>

        <div class="detail-wrap">
          <!-- Hero image -->
          <div class="detail-hero">
            <img
              v-if="activeNews.image"
              :src="activeNews.image"
              :alt="activeNews.title"
              class="detail-hero-img"
            />
            <div v-else class="detail-hero-placeholder">
              <span class="placeholder-icon xl" v-html="activeNews.icon || defaultIcon"></span>
            </div>
            <div class="detail-hero-overlay"></div>
            <span class="detail-badge">{{ activeNews.category }}</span>
          </div>

          <!-- Article -->
          <div class="detail-article">
            <div class="detail-meta">
              <span class="meta-date">{{ activeNews.date }}</span>
              <span class="meta-dot"></span>
              <span class="meta-author">{{ activeNews.author }}</span>
              <span class="meta-dot"></span>
              <span class="meta-read">{{ activeNews.readTime }}</span>
            </div>

            <h1 class="detail-title">{{ activeNews.title }}</h1>
            <div class="detail-divider"></div>
            <div class="detail-content" v-html="activeNews.content"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeNews = ref(null)

const defaultIcon = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(168,85,247,0.6)" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 8h10M7 12h10M7 16h6"/></svg>`

const truncate = (html, len) => {
  const text = html.replace(/<[^>]+>/g, '')
  return text.length > len ? text.slice(0, len).trimEnd() + '... ' : text
}

const openNews = (item) => {
  activeNews.value = item
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
const closeNews = () => {
  activeNews.value = null
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// =====================
// DATA — ganti sesuai kebutuhan
// =====================
const newsList = ref([
  {
    title: 'H5P Kini Hadir dengan Fitur AI-Powered Quiz Generation',
    category: 'Teknologi',
    author: 'Reza Pratama',
    date: '18 Apr 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80',
    content: `
      <p>Platform H5P telah merilis pembaruan besar yang memperkenalkan fitur <strong>AI-Powered Quiz Generation</strong>, memungkinkan instruktur membuat kuis interaktif hanya dari teks atau dokumen yang diunggah.</p>
      <h2>Apa yang Baru?</h2>
      <p>Dengan teknologi large language model terbaru, H5P kini bisa menganalisis konten pembelajaran dan secara otomatis menghasilkan berbagai format pertanyaan — mulai dari pilihan ganda, true/false, hingga drag-and-drop.</p>
      <h2>Cara Kerja Fiturnya</h2>
      <ol>
        <li>Unggah materi pembelajaran dalam format PDF, DOCX, atau teks biasa</li>
        <li>Pilih tipe kuis yang diinginkan</li>
        <li>AI akan menganalisis dan menghasilkan pertanyaan otomatis</li>
        <li>Review dan edit hasilnya sebelum dipublikasikan</li>
      </ol>
      <blockquote>Fitur ini memangkas waktu pembuatan konten hingga 80%, kata CEO H5P dalam konferensi EdTech Global 2026.</blockquote>
      <h2>Dampak bagi Dunia Pendidikan</h2>
      <p>Para pendidik di seluruh dunia menyambut positif pembaruan ini. Dengan berkurangnya beban teknis, guru dan dosen bisa lebih fokus pada kualitas pengajaran daripada proses pembuatan konten.</p>
    `,
  },
  {
    title: 'Tren E-Learning 2026: Metaverse Classroom Mulai Mainstream',
    category: 'Tren',
    author: 'Sari Dewi',
    date: '16 Apr 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=700&q=80',
    content: `
      <p>Ruang kelas metaverse bukan lagi fiksi ilmiah. Tahun 2026 menandai titik balik di mana teknologi VR dan AR akhirnya cukup terjangkau untuk diimplementasikan di sekolah-sekolah menengah.</p>
      <h2>Perkembangan Terkini</h2>
      <p>Beberapa platform seperti <strong>EduVerse</strong> dan <strong>ClassroomXR</strong> kini menawarkan paket berlangganan yang bisa diakses dengan headset seharga di bawah 2 juta rupiah.</p>
      <p>Studi dari Universitas Stanford menunjukkan bahwa siswa yang belajar via metaverse memiliki retensi pengetahuan <strong>40% lebih tinggi</strong> dibandingkan pembelajaran konvensional.</p>
      <blockquote>Ini bukan tentang teknologi yang keren, ini tentang bagaimana otak kita belajar lebih baik melalui pengalaman langsung.</blockquote>
      <h2>Tantangan yang Masih Ada</h2>
      <ul>
        <li>Infrastruktur internet yang belum merata</li>
        <li>Konten lokal yang masih terbatas</li>
        <li>Kebutuhan pelatihan guru yang signifikan</li>
      </ul>
    `,
  },
  {
    title: 'Update Platform: Fitur Kolaborasi Real-Time Diluncurkan',
    category: 'Update',
    author: 'Tim Redaksi',
    date: '14 Apr 2026',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&q=80',
    content: `
      <p>Pembaruan besar telah mendarat di platform kami. Fitur <strong>kolaborasi real-time</strong> kini tersedia untuk semua pengguna, memungkinkan beberapa instruktur mengerjakan satu kursus secara bersamaan.</p>
      <h2>Fitur Kolaborasi Baru</h2>
      <ul>
        <li>Multi-editor dengan cursor tracking</li>
        <li>Comment dan annotation langsung di konten</li>
        <li>Version history dengan rollback mudah</li>
        <li>Live preview yang tersinkronisasi</li>
      </ul>
      <p>Fitur ini terinspirasi dari workflow desainer dan developer modern, kini hadir untuk dunia pendidikan.</p>
    `,
  },
  {
    title: 'Studi: Gamifikasi Tingkatkan Motivasi Belajar hingga 60%',
    category: 'Riset',
    author: 'Dr. Ahmad Fauzi',
    date: '12 Apr 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=700&q=80',
    content: `
      <p>Penelitian terbaru yang melibatkan 2.400 pelajar dari 12 negara Asia Tenggara menunjukkan hasil mengejutkan: gamifikasi dalam e-learning dapat meningkatkan motivasi belajar hingga <strong>60%</strong>.</p>
      <h2>Metodologi Penelitian</h2>
      <p>Studi berlangsung selama 6 bulan dengan membagi peserta ke dalam dua kelompok — kelompok kontrol menggunakan LMS konvensional, sementara kelompok eksperimen menggunakan platform dengan elemen gamifikasi penuh.</p>
      <h2>Temuan Utama</h2>
      <ul>
        <li>Tingkat penyelesaian kursus naik dari 34% menjadi 71%</li>
        <li>Waktu belajar harian meningkat rata-rata 28 menit</li>
        <li>Skor tes akhir 23% lebih tinggi pada kelompok gamifikasi</li>
      </ul>
      <blockquote>Otak manusia merespons reward dan tantangan jauh lebih baik daripada kewajiban pasif.</blockquote>
      <p>Penelitian ini dipublikasikan di <em>Journal of Educational Technology</em> edisi April 2026.</p>
    `,
  },
  {
    title: 'Workshop Gratis: Membuat Konten H5P Interaktif dari Nol',
    category: 'Event',
    author: 'Tim Event',
    date: '10 Apr 2026',
    readTime: '2 min read',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80',
    content: `
      <p>Kami dengan bangga mengumumkan seri workshop gratis <strong>"H5P Masterclass"</strong> yang akan diselenggarakan setiap Sabtu sepanjang bulan Mei 2026.</p>
      <h2>Jadwal Workshop</h2>
      <table>
        <tr><th>Tanggal</th><th>Topik</th><th>Durasi</th></tr>
        <tr><td>3 Mei</td><td>Pengenalan H5P & Setup</td><td>2 jam</td></tr>
        <tr><td>10 Mei</td><td>Interactive Video</td><td>3 jam</td></tr>
        <tr><td>17 Mei</td><td>Quiz & Assessment</td><td>3 jam</td></tr>
        <tr><td>24 Mei</td><td>Course Presentation</td><td>3 jam</td></tr>
      </table>
      <h2>Cara Daftar</h2>
      <p>Pendaftaran dibuka mulai 20 April 2026. Kapasitas terbatas 50 peserta per sesi. Daftarkan dirimu sekarang melalui halaman Event di platform ini.</p>
    `,
  },
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&family=Exo+2:wght@400;500;600&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

/* ===========================
   BASE
=========================== */
.news-page {
  min-height: 100vh;
  /* background: #07000f; */
  font-family: 'Exo 2', sans-serif;
  position: relative;
  overflow-x: hidden;
  padding: 0 0 80px;
}

.bg-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(138, 43, 226, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(138, 43, 226, 0.07) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
  z-index: 0;
}

.orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.18;
  pointer-events: none;
  z-index: 0;
}
.orb1 {
  width: 400px;
  height: 400px;
  background: #6d28d9;
  top: -100px;
  left: -100px;
}
.orb2 {
  width: 300px;
  height: 300px;
  background: #c026d3;
  bottom: 10%;
  right: -80px;
}
.orb3 {
  width: 200px;
  height: 200px;
  background: #0ea5e9;
  top: 40%;
  left: 60%;
}

/* ===========================
   LIST VIEW
=========================== */
.list-view {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: 60px 24px 0;
}

/* Header */
.page-header {
  margin-bottom: 48px;
}

.header-tag {
  font-family: 'Rajdhani', sans-serif;
  font-size: 11px;
  letter-spacing: 3px;
  color: #a855f7;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.page-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 42px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 10px;
  text-shadow: 0 0 40px rgba(168, 85, 247, 0.3);
  line-height: 1.1;
}

.page-sub {
  font-size: 15px;
  color: #9d7ec0;
  margin: 0 0 24px;
  max-width: 500px;
  line-height: 1.6;
}

.header-line {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #7c3aed, #c084fc, transparent);
  border-radius: 2px;
}

/* Featured card */
.featured-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(168, 85, 247, 0.15);
  cursor: pointer;
  margin-bottom: 40px;
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    border-color 0.3s;
}

.featured-card:hover {
  transform: translateY(-4px);
  border-color: rgba(168, 85, 247, 0.4);
  box-shadow: 0 16px 48px rgba(109, 40, 217, 0.25);
}

.featured-img-wrap {
  position: relative;
  min-height: 320px;
  overflow: hidden;
}

.featured-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.featured-card:hover .featured-img {
  transform: scale(1.04);
}

.featured-img-placeholder {
  width: 100%;
  height: 100%;
  min-height: 320px;
  background: linear-gradient(135deg, #1a0030, #0e0020);
  display: flex;
  align-items: center;
  justify-content: center;
}

.featured-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.3) 0%, transparent 60%);
  pointer-events: none;
}

.featured-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(109, 40, 217, 0.85);
  border: 1px solid rgba(192, 132, 252, 0.4);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 600;
  color: #e9d5ff;
  letter-spacing: 1px;
  text-transform: uppercase;
  backdrop-filter: blur(6px);
}

.featured-body {
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.meta-date {
  font-size: 12px;
  color: #7c3aed;
  font-weight: 500;
}
.meta-author {
  font-size: 12px;
  color: #9d7ec0;
}
.meta-read {
  font-size: 11px;
  color: #6b21a8;
  background: rgba(109, 40, 217, 0.15);
  border: 1px solid rgba(109, 40, 217, 0.25);
  border-radius: 20px;
  padding: 2px 8px;
  margin-left: auto;
}
.meta-dot {
  width: 3px;
  height: 3px;
  background: rgba(168, 85, 247, 0.4);
  border-radius: 50%;
}

.featured-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: #fff;
  line-height: 1.25;
  margin: 0;
}

.featured-desc {
  font-size: 14px;
  color: #9d7ec0;
  line-height: 1.7;
  margin: 0;
}

.read-more {
  color: #a855f7;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.2s;
}

.read-more:hover {
  color: #c084fc;
}

/* News grid */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.news-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(168, 85, 247, 0.12);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    border-color 0.3s;
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  transform: translateY(-4px);
  border-color: rgba(168, 85, 247, 0.35);
  box-shadow: 0 12px 36px rgba(109, 40, 217, 0.2);
}

.card-img-wrap {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.news-card:hover .card-img {
  transform: scale(1.05);
}

.card-img-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a0030, #0e0020);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(109, 40, 217, 0.85);
  border: 1px solid rgba(192, 132, 252, 0.35);
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 10px;
  font-weight: 600;
  color: #e9d5ff;
  letter-spacing: 1px;
  text-transform: uppercase;
  backdrop-filter: blur(4px);
}

.card-body {
  background-color: #1a0030;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.card-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: #f3e8ff;
  line-height: 1.3;
  margin: 0;
}

.card-desc {
  font-size: 13px;
  color: #9d7ec0;
  line-height: 1.65;
  margin: 0;
  flex: 1;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  padding-top: 12px;
  border-top: 1px solid rgba(168, 85, 247, 0.1);
}

.card-author {
  font-size: 12px;
  color: #7c3aed;
  font-weight: 500;
}

.card-arrow {
  font-size: 14px;
  color: rgba(168, 85, 247, 0.4);
  transition:
    color 0.2s,
    transform 0.2s;
}

.news-card:hover .card-arrow {
  color: #a855f7;
  transform: translateX(4px);
}

/* ===========================
   DETAIL VIEW
=========================== */
.detail-view {
  position: relative;
  z-index: 1;
  max-width: 780px;
  margin: 0 auto;
  padding: 48px 24px 0;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(109, 40, 217, 0.15);
  border: 1px solid rgba(168, 85, 247, 0.25);
  border-radius: 30px;
  padding: 8px 18px;
  font-family: 'Exo 2', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #c084fc;
  cursor: pointer;
  margin-bottom: 36px;
  transition:
    background 0.2s,
    border-color 0.2s,
    transform 0.2s;
}

.back-btn:hover {
  background: rgba(109, 40, 217, 0.3);
  border-color: rgba(168, 85, 247, 0.5);
  transform: translateX(-3px);
}

.back-arrow {
  font-size: 15px;
}

.detail-wrap {
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(168, 85, 247, 0.15);
  border-radius: 20px;
  overflow: hidden;
}

.detail-hero {
  position: relative;
  height: 360px;
  overflow: hidden;
}

.detail-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-hero-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a0030, #0e0020);
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(7, 0, 15, 0.85) 100%);
}

.detail-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(109, 40, 217, 0.9);
  border: 1px solid rgba(192, 132, 252, 0.4);
  border-radius: 20px;
  padding: 5px 14px;
  font-size: 11px;
  font-weight: 600;
  color: #e9d5ff;
  letter-spacing: 1px;
  text-transform: uppercase;
  backdrop-filter: blur(6px);
}

.detail-article {
  padding: 36px 40px 48px;
}

.detail-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.detail-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 34px;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  margin: 0 0 20px;
  text-shadow: 0 0 30px rgba(168, 85, 247, 0.25);
}

.detail-divider {
  height: 1px;
  background: linear-gradient(90deg, rgba(109, 40, 217, 0.7), rgba(0, 212, 255, 0.3), transparent);
  margin-bottom: 28px;
}

/* Detail content — all HTML elements */
.detail-content {
  color: #c4a8e0;
  font-size: 15px;
  line-height: 1.85;
}

.detail-content :deep(h1) {
  font-family: 'Rajdhani', sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: #fff;
  margin: 28px 0 12px;
  text-shadow: 0 0 12px rgba(168, 85, 247, 0.3);
}

.detail-content :deep(h2) {
  font-family: 'Rajdhani', sans-serif;
  font-size: 21px;
  font-weight: 700;
  color: #e9d5ff;
  margin: 24px 0 10px;
}

.detail-content :deep(h3) {
  font-family: 'Rajdhani', sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: #c084fc;
  margin: 18px 0 8px;
}

.detail-content :deep(p) {
  margin: 0 0 16px;
  color: #c4a8e0;
}

.detail-content :deep(img) {
  max-width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(168, 85, 247, 0.25);
  margin: 16px 0;
  display: block;
  box-shadow: 0 8px 32px rgba(109, 40, 217, 0.2);
}

.detail-content :deep(ul),
.detail-content :deep(ol) {
  padding-left: 22px;
  margin: 0 0 16px;
}

.detail-content :deep(li) {
  color: #c4a8e0;
  margin-bottom: 6px;
}

.detail-content :deep(strong) {
  color: #f3e8ff;
  font-weight: 600;
}

.detail-content :deep(em) {
  color: #a78bfa;
  font-style: italic;
}

.detail-content :deep(a) {
  color: #818cf8;
  text-decoration: none;
  border-bottom: 1px solid rgba(129, 140, 248, 0.3);
  transition: color 0.2s;
}

.detail-content :deep(a:hover) {
  color: #c084fc;
}

.detail-content :deep(blockquote) {
  border-left: 3px solid #7c3aed;
  padding: 12px 20px;
  margin: 20px 0;
  background: rgba(109, 40, 217, 0.1);
  border-radius: 0 10px 10px 0;
  color: #a78bfa;
  font-family: 'Lora', serif;
  font-style: italic;
  font-size: 16px;
}

.detail-content :deep(code) {
  background: rgba(109, 40, 217, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 4px;
  padding: 2px 7px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: #c084fc;
}

.detail-content :deep(pre) {
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(109, 40, 217, 0.3);
  border-radius: 12px;
  padding: 18px;
  overflow-x: auto;
  margin: 16px 0;
}

.detail-content :deep(pre code) {
  background: none;
  border: none;
  padding: 0;
  font-size: 13px;
  color: #a5f3fc;
}

.detail-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 14px;
}

.detail-content :deep(th) {
  background: rgba(109, 40, 217, 0.25);
  color: #e9d5ff;
  padding: 10px 14px;
  text-align: left;
  border: 1px solid rgba(168, 85, 247, 0.2);
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: 0.5px;
}

.detail-content :deep(td) {
  padding: 10px 14px;
  border: 1px solid rgba(168, 85, 247, 0.1);
  color: #c4a8e0;
}

.detail-content :deep(tr:nth-child(even) td) {
  background: rgba(109, 40, 217, 0.06);
}

.detail-content :deep(hr) {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, rgba(109, 40, 217, 0.5), rgba(0, 212, 255, 0.3), transparent);
  margin: 20px 0;
}

/* ===========================
   PLACEHOLDER ICON SIZES
=========================== */
.placeholder-icon {
  display: flex;
}
.placeholder-icon.sm :deep(svg) {
  width: 28px;
  height: 28px;
}
.placeholder-icon.xl :deep(svg) {
  width: 64px;
  height: 64px;
}

/* ===========================
   PAGE TRANSITION
=========================== */
.page-slide-enter-active,
.page-slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.page-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.page-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* ===========================
   RESPONSIVE
=========================== */
@media (max-width: 768px) {
  .featured-card {
    grid-template-columns: 1fr;
  }
  .featured-img-wrap {
    min-height: 200px;
  }
  .featured-body {
    padding: 24px 20px;
  }
  .featured-title {
    font-size: 20px;
  }
  .page-title {
    font-size: 30px;
  }
  .news-grid {
    grid-template-columns: 1fr;
  }
  .detail-article {
    padding: 24px 20px 36px;
  }
  .detail-title {
    font-size: 24px;
  }
  .detail-hero {
    height: 220px;
  }
}
</style>
