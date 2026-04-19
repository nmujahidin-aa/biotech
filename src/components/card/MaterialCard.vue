<template>
  <div class="material-page">
    <!-- BG -->
    <div class="bg-grid"></div>
    <div class="orb orb1"></div>
    <div class="orb orb2"></div>
    <div class="orb orb3"></div>

    <!-- Card -->
    <div class="material-card">
      <!-- Animated border glow -->
      <div class="card-glow-border"></div>

      <!-- Inner -->
      <div class="card-inner">
        <!-- Scan line effect -->
        <div class="scan-line"></div>

        <!-- Header -->
        <div class="card-header">
          <div class="header-left">
            <div class="header-icon">
              <span v-html="material.icon || defaultIcon"></span>
            </div>
            <div>
              <p class="header-tag">{{ material.category || 'Materi Pembelajaran' }}</p>
              <h1 class="header-title">{{ material.title }}</h1>
            </div>
          </div>
          <div class="header-meta">
            <span class="meta-chip">{{ material.readTime || '10 min read' }}</span>
            <span class="meta-chip author">{{ material.author || 'Instruktur' }}</span>
          </div>
        </div>

        <div class="card-divider"></div>

        <!-- Scrollable Content -->
        <div class="card-content">
          <div class="content-body" v-html="material.content"></div>
        </div>

        <!-- Footer -->
        <div class="card-footer">
          <div class="footer-tag">{{ material.category || 'Materi' }}</div>
          <div class="footer-date">{{ material.date || '' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const defaultIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(192,132,252,0.9)" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`

defineProps({
  material: {
    type: Object,
    default: () => ({
      title: 'Materi',
      category: 'Malang Biotech Metaverse',
      author: '',
      date: '',
      readTime: '12 min read',
      icon: '',
      content: `
        <h1>1. Pengertian Bioteknologi</h1>
        <p>
          Perkembangan ilmu pengetahuan dan teknologi sangat dipengaruhi oleh berkembangnya ilmu bioteknologi. Bioteknologi mengalami perkembangan yang sangat pesat dalam kurun waktu 20 tahun terakhir. Perkembangan bioteknologi sejalan dengan tingginya kebutuhan hidup manusia yang tidak sebanding dengan produksi yang memenuhi kebutuhan tersebut. Pada negara maju, bioteknologi mendapat perhatian yang sangat serius dan dikembangkan oleh pemerintah secara intensif untuk memenuhi kebutuhan manusia maupun untuk produksi industri. Bidang utama yang menjadi perhatian dalam pengembangan bioteknologi adalah pangan, farmasi, pengolahan limbah, dan rekayasa genetika. Pengembangan ilmu bioteknologi bertujuan untuk meningkatkan kesejahteraan dan kualitas hidup manusia.
        </p>
        <p>
          Bioteknologi merupakan pemanfaatan sistem kehidupan dan organisme untuk mengembangkan dan menciptakan produk baru untuk menghasilkan atau memodifikasi produk atau proses dengan tujuan memperoleh produk yang lebih baik dari segi kualitas maupun kuantitas serta singkat dalam waktu produksi. Bioteknologi berasal dari kata Bios yang artinya hidup, teuchos yang artinya alat, dan logos yang artinya hidup sehingga bioteknologi dapat diartikan sebagai cabang ilmu yang mempelajari pemanfaatkan mahluk hidup maupun produk dari mahluk hidup dalam proses produksi barang dan jasa untuk meningkatkan kesejahteraan umat manusia.
        </p>
        <p>
            Primrose mengartikan bioteknologi sebagai penerapan prinsip-prinsip biologi, biokimia, dan rekayasa dalam mengolah suatu bahan dan jasa memanfaatkan organisme hidup dan komponennya untuk menghasilkan barang dan jasa yang bermanfaat bagi manusia. <i>Office of Technical Assistance</i> (OTA), Amerika Serikat menyatakan bioteknologi sebagai teknik pendayagunaan organisme hidup atau bagian dari organisme tersebut untuk membuat atau memodifikasi produk guna meningkatkan atau memperbaiki sifat tanaman atau hewan. <i>European Federation of Biotechnology</i> menyatakan bahwa bioteknologi merupakan integrasi dari ilmu pengetahuan alam dan ilmu rekayasa dengan tujuan meningkatkan aplikasi organisme hidup, sel, atau bagian dari organisme hidup untuk menghasilkan barang dan jasa. Pengertian bioteknologi kemudian berkembang sejak penemuan metode pembuatan DNA rekombinan dan fusi sel sehingga mengarah ke proses bioteknologi modern. <i>Organization for Economic Co-operation and Development</i> (OECD) mendefenisikan bahwa teknologi merupakan penerapan prinsip pengetahuan dan rekayasa untuk penanganan dan pengolahan bahan dengan bantuan agen biologis dalam menghasilkan barang dan jasa yang mendukung pertumbuhan ekonomi.        
        </p>
        <p>
            Pengguaan istilah bioteknologi pertama kali diperkenalkan oleh ilmuwan asal Hungaria, Karl Ereky, pada tahun 1917 untuk menggambarkan interaksi biologi dan teknologi manusia dengan memanfaatkan sistem biologi serta organisme untuk mengubah bahan baku menjadi suatu produk yang berguna bagi masyarakat. Tonggak sejarah bioteknologi modern dimulai sejak tahun 1928 sejak antibiotik penicilin digunakan oleh Alexander Fleming untuk pengobatan penyakit kulit yang disebabkan oleh bakteri <i>Staphylococcus aureus</i>  hingga pada tahun 1940 penicilin digunakan untuk mengobati infeksi pada manusia. Tahun 1950, antibiotik berhasil ditemukan pada beberapa strain bakteri sehingga produksi skala besar mulai dilakukan untuk mendapatkan berbagai antibiotik untuk kepentingan pengobatan.        
        </p>

        <h1>2. Prinsip Dasar Bioteknologi</h1>
        <p>
          Bioteknologi merupakan ilmu multidisiplin yang melibatkan berbagai disiplin ilmu seperti biologi, kimia, biokimia, molekular, genetika, imunologi, dan mikrobiologi. Ruang lingkup bioteknologi sangat luas sehingga untuk mempermudah pembagian bioteknologi, para ilmuwan membagi bioteknologi menjadi bioteknologi merah, hijau, putih, dan biru.
        </p>
        <p>
          Bioteknologi merah merupakan cabang ilmu bioteknologi yang mempelajari aplikasi bioteknologi pada bidang medis mencapun tindakan pencegahan, diagnosis, dan pengobatan suatu penyakit. Bioteknologi hijau berkaitan dengan aplikasi bioteknologi pada hidang pertanian dan peternakan. Bioteknologi putih merupakan cabang bioteknologi yang diaplikasikan pada bidang industri dengan pemanfaatan mikroorganisme atau enzim untuk memproduksi produk baru baik produk pangan maupun tidak, biomaterial, biopolimer, dan senyawa baru dalam skala industri. Bioteknologi biru merupakan bioteknologi yang diaplikasikan dalam bidang akuatik mencakup perairan dan kelautan seperti pemanfaatan berbagai tumbuhan laut sebagai sumber energi dan biofuel. Penggolongan bioteknologi yang terbaru adalah bidang bioinformatika. Bioinformatika merupakan bidang multidisiplin yang mengkaji masalah biologi menggunakan komputasi. Perkembangan bioteknologi saat ini sejalan dengan perkembangan bioinfirmatika. Bioinformatikan memiliki peran penting dalam genomik fungonal, genomik struktural, dan proteomik yang mampu memproduksi kebutuhan penting yang bermanfaat bagi manusia.
        </p>
        <p>
            Prinsip dasar bioteknologi adalah adanya agen biologis (mikroba, enzim, sel), pendayagunaan teknologi untuk memanipulasi DNA, produk dan jasa yang diperoleh serta penggunaan berbagai disiplin ilmu yang berkaitan dengan produk. Para ilmuwan memberikan batasan terkait bioteknologi yaitu berkaitan dengan katalis biologi (enzim) untuk fungsi atau proses tertentu, penciptaan dengan memanfaatkan katalis, dan pemisaan atau pemurnian produk esensial atas produk yang dihasilkan.        
        </p>
        <p>
            Pemahaman prinsip dan batasan bioteknologi akan memberikan dasar konsep yang tepat dalam memahami bioteknologi untuk kepentingan manusia. Pada awalnya bioteknologi dianalogikan dengan industri yang menggunakan agen agen mikrobiologi untuk memproduksi barang dan jasa. Dalam perkemnangannya, tanaman dan hewan juga dapat dieksplorasi secara komersial. Dengan demikian ruang lingkup bioteknologi menjadi sangat luas, mencakup seluruh teknik untuk menghasilkan barang atau jasa dengan memanfaatkan sistem biologi maupun sel hidup.        
        </p>

        <h1>3. Sejarah Perkembangan Bioteknologi</h1>
        <p>
          Bioteknologi telah dimulai sejak manusia mulai meningkatkan kualitas hidupnya dengan memanfaatkan agen-agen biologi. Sejarah bioteknologi sebelum era teknologi maju diawali dengan ditemukannya proses fermentasi bir dan pembuatan keju oleh masyarakat Mesir dan Sumeria pada sekitar tahun 2000 SM, kemudian berkembang pada tahun 500 SM ditemukannya jamur penghasil antibiotik pada kedelai untuk menangani infeksi. Masyarakat mesir kuno telah mengenal pemanfaatan mikroorganisme untuk pembuatan bir, anggur, cuka, yogurt, dan lain-lain. Bahkan bangsa yunani kuno telah melakukan proses bioteknologi dengan melakukan pemuliaan pada tanaman-tanaman dengan kualitas baik serta melakukan ternak hewan-hewan yang potensial untuk dimanfaatkan oleh manusia. Perkembangan bioteknologi kemudian semakin berkembang sejak ditemukannya mikroskop oleh ilmuwan Belanda, Zacharias Jansshen, pada abad 16 dan ditemukannya sel oleh Robert Hooke dan bakteri oleh Antonii van Leeuwenhoek pada abad 17.
        </p>
        <p>
          Penemuan vaksinasi small pox oleh Edward Jenner menjadi tonggak sejarah perkembangan bioteknologi di bidang kesehatan. Pada abad 19, enzim dan protein mulai ditemukan dan pada saat yang sama, salah satu bakteri penting dalam proses pengembangan antibiotik secara bioteknologi, Escherichia coli, ditemukan. Suharto menemukan membagi Era perkembagan bioteknologi ke dalam 5 era yaitu:
            <ol type="a">
                <li>
                    Era Pra Pasteur, sebelum tahun 1865, penggunaan teknik fermentasi menggunakan mikroorganisme untuk menghasilkan produk.
                </li>
                <li>
                    Era Pasteur (1865-1940), pengembangan industri fermentasi untuk membuat etanol, butanol, asam organik serta pengolahan limbah secara aerob.
                </li>
                <li>
                    Era Antibiotik (1940-1960), pembuatan penisilin yang digunakan pada saat tentara Amerika di Normandy melakukan perang dunia kedua, vaksin virus, teknologi kultur sel hewan, teknologi fermentasi media cair, dan transformasi steorid.
                </li>
                <li>
                    Era Pasca Antibiotik (1960-1975), isolasi asam-asam amino, eludasi struktur DNA, protein sel tunggal, enzim, protein sel tunggal, biogas, dan teknologi DNA rekombinan.
                </li>
                <li>
                    Era Bioteknologi Modern (1975-sekarang), penggunaan rekayasa genetika, zat antibodi monoklonal, produksi hormon, dan lain-lain.
                </li>
            </ol>
        <p>
            Perkembangan dan kemajuan bioteknologi tidak dapat dilepaskan dari kemajuan ilmu-ilmu lainnya seperti mikrobiologi, biokimia, biologi molekuler, dan genetika. Bioteknologi modern terlahir diawali dengan inovasi para ilmuwan untuk mengembangkan teknologi DNA rekombinan. Perusahaan bioteknologi pertama di dunia, Genetech, di Amerika Serikat berhasil memproduksi protein hormon insulin rekombinan yang diintroduksikan ke dalam sel bakteri <i>E. coli</i> menggunakan teknologi DNA rekombinan. Bioteknologi molekuler berperan dalam proses memanipulasi organisme pada taraf seluler dan molekuler.    
        </p>

        <table>
          <thead>
            <tr>
              <th style="width: 10%; text-align: center;">Tahun</th>
              <th style="width: 90%; text-align: center;">Penemuan</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1917</td><td>Ereky memperkenalkan istilah Bioteknologi</td></tr>
            <tr><td>1943</td><td>Penisilin diproduksi dalam skala industri</td></tr>
            <tr><td>1944</td><td>Avery, Macleod, McCarty mendemonstrasikan bahwa DNA adalah bahan genetika</td></tr>
            <tr><td>1953</td><td>Watson dan Crick menemukan struktur DNA</td></tr>
            <tr><td>1961</td><td>Jurnal Biotechnology and Bioengineering didirikan</td></tr>
            <tr><td>1970</td><td>Enzim restriksi endonuklease pertama kali diisolasi</td></tr>
            <tr><td>1972</td><td>Khorana dan tim berhasil mensintesis secara kimiawi seluruh gen tRNA</td></tr>
            <tr><td>1973</td><td>Boyer dan Cohen memaparkan teknologi DNA rekombinan</td></tr>
            <tr><td>1975</td><td>Kohler dan Mistein menjabarkan produksi antibodi monoklonal</td></tr>
            <tr><td>1976</td><td>Perkembangan teknik-teknik untuk menentukan sekuen DNA</td></tr>
            <tr><td>1978</td><td>Genetech menghasilkan insulin manusia dalam E. coli untuk pertama kali</td></tr>
            <tr><td>1980</td><td>Mikroorganisme hasil rekayasa genetika dapat dipatenkan</td></tr>
            <tr><td>1981</td><td>Untuk pertama kali automated DNA synthesizers dijual secara komersial dan kit diagnostik berdasarkan antibodi disetujui untuk dipakai di Amerika Serikat</td></tr>
            <tr><td>1982</td><td>Vaksin hewan hasil teknologi DNA rekombinan disetujui pemakaiannya di Eropa</td></tr>
            <tr><td>1983</td><td>Plasmid Ti hasil rekayasa genetika dipakai untuk transformasi DNA rekombinan ke tanaman target</td></tr>
            <tr><td>1988</td><td>Amerika Serikat memberikan patent untuk mencit yang rentan kanker hasil rekayasa genetika</td></tr>
            <tr><td>1988</td><td>Metode Polymerase Chain Reaction dipublikasikan oleh Karry Mullis</td></tr>
            <tr><td>1990</td><td>Percobaan terapi gen sel somatik pada manusia disetujui oleh Amerika Serikat dan proyek pemetaan genom manusia mulai dilakukan</td></tr>
            <tr><td>1997</td><td>Kloning sel inti pada mamalia dengan menggunakan sel domba</td></tr>
            <tr><td>1999</td><td>Kode genetik lengkap dari kromosom manusia telah diuraikan</td></tr>
            <tr><td>2000</td><td>Para ilmuwan di Celera Genomics dan Human Genome Project menyelesaikan konsep kasar genom manusia</td></tr>
            <tr><td>2001</td><td>Majalah Science and Nature mempublikasi urutan genom manusia dan memungkinkan ilmuwan di seluruh dunia untuk meneliti dan mencari pengobatan baru untuk penyakit terkait genetik</td></tr>
            <tr><td>2002</td><td>Padi transgenik yang mengandung beta karoten mulai diproduksi</td></tr>
            <tr><td>2003</td><td>Pemetaan genom manusia telah selesai dilakukan</td></tr>
            <tr><td>2004</td><td>Penggunaan antibodi monoklonal yang merupakan antiangiogenik disetujui digunakan untuk terapi kanker</td></tr>
            <tr><td>2005</td><td>Penanaman tanaman transgenik dilakukan di 21 negara</td></tr>
            <tr><td>2006</td><td>Penggunaan vaksin untuk papillomavirus di 82 negara</td></tr>
            <tr><td>2007</td><td>Para ilmuwan menemukan cara menggunakan sel kulit manusia untuk membuat sel induk embrionik</td></tr>
            <tr><td>2008</td><td>Ahli kimia di Jepang untuk pertama kalinya membuat molekul DNA secara artifisial</td></tr>
            <tr><td>2009</td><td>Sekunesing genom virus H1N1</td></tr>
            <tr><td>2010</td><td>Craig Venter telah berhasil menunjukkan bahwa genom artifisial dapat bereplikasi secara otonom</td></tr>
            <tr><td>2012</td><td>Draft genom tanaman gandum telah selesai dianalisis</td></tr>
            <tr><td>2013</td><td>United States Food & Drug Administration mengeluarkan peraturan terkait dengan rancangan penggunaan obat biosimilar</td></tr>
          </tbody>
        </table>



        <h2>a. Bioteknologi Kuno (sebelum-1800)</h2>
        <p>
            Sebagian besar perkembangan bioteknologi dimasa kuno terjadi sebelum tahun 1800. Jika melihat semua perkembangan bioteknologi di masa kuno, sebagian besar penemuan diperoleh berdasarkan pengamatan umum tentang alam yang dapat digunakan untuk kehidupan manusia pada saat itu.
        </p>
        <p>
            Makanan, pakaian, dan tempat tinggal merupakan kebutuhan dasar manusia yang paling penting, terlepas pada masa apa pun manusia tersebut hidup. Satu- satunya yang berbeda adalah era dimana mereka berasal. Makanan telah menjadi kebutuhan yang tidak terelakkan sejak keberadaan manusia.    
        </p>
        <p>
            Pada awalnya, manusia memakan daging mentah kapanpun mereka menemukan hewan mati, namun akibat perubahan lingkungan, mereka mengalami kekurangan makanan. Pepatah lama mengatakan bahwa “kebutuhan adalah ibu dari semua penemuan”. Pada masa bioteknologi kuno, manusia mengeksplorasi kemungkinan untuk membuat makanan tersedia dengan cara menumbuhkannya didekat tempat tinggal mereka sehingga kebutuhan dasar untuk makanan dapat dipenuhi dengan mudah. Pada masa itu, manusia membawa bibit tanaman (sebagian besar biji-bijian) dan menaburkan bibit tersebut disekitar tempat tinggalnya. Seiring dengan kebutuhan dan pengetahuan untuk membudidayakan tanaman, manusia mulai memahami pentingnya air, cahaya, dan persyaratan lainnya yang dibutuhkan tanaman agar tumbuh dengan optimal. Prinsip kebutuhan yang sama juga mendorong manusia untuk memulai domestikasi pada hewan liar untuk membantu dan memenuhi kebutuhan hidup manusia.
        </p>
        <img src="@/assets/images/material/images.png" alt="sejarah" style="width: 100%; border-radius: 8px; margin: 16px 0;">
        <figcaption style="text-align: center; font-size: 14px; color: #aaa;">Gambar 1. Sejarah perkembangan bioteknologi. Beberapa penemuan penting telah digambarkan dalam grafik ini dengan kemungkinan untuk pertumbuhannya yang tidak terbatas di masa depan</figcaption>
        <figcaption style="text-align: center; font-size: 14px; color: #aaa;">(Sumber: Verma et al., 2011)</figcaption>
        
        <p>
            Pada masa ini, kebiasaan manusia untuk berburu dan mengumpulkan makanan telah hilang karena domestikasi menjadikan hewan buruan menjadi lebih dekat dan mengurangi resiko selama proses perburuan. Domestikasi hewan liar adalah awal dari observasi, implikasi, dan aplikasi pemuliaan hewan. Perkembangan ini diiringi juga dengan perkembangan pengetahuan manusia untuk mengembangkan metode pengawetan dan penyimpanan makanan. Manusia menggunakan gua-gua yang dingin untuk menyimpan makanan pada jangka yang panjang dan proses ini menjadi jalan bagi evolusi tempat-tempat penyimpanan produk makanan.
        </p>
        <img src="@/assets/images/material/images.png" alt="sejarah" style="width: 100%; border-radius: 8px; margin: 16px 0;">
        <figcaption style="text-align: center; font-size: 14px; color: #aaa;">Gambar 2. Masa bercocok tanam dan beternak di zaman Mesir kuno</figcaption>
        <figcaption style="text-align: center; font-size: 14px; color: #aaa;">(Sumber: <a href="http://www.canacopegdl.com" target="_blank">www.canacopegdl.com</a>)</figcaption>
        <p>
            Setelah teknologi penyimpanan berkembang, manusia beralih pada penemuan penemuan baru seperti keju, yoghurt, dan lain-lain. Ragi merupakan salah satu mikroba tertua yang telah digunakan untuk kepentingan manusia untuk membuat roti, produksi cuka, dan produk fermentasi lainnya termasuk minuman beralkohol. Cuka yang ditemukan memiliki kemampuan untuk menghambat pertumbuhan mikroba tertentu dan oleh karena itu, cuka juga sukses digunakan sebagai bahan pengawetan makanan. Penemuan dan manfaat dari proses ini mengarahkan manusia pada masa itu untuk menciptakan perbaikan lebih lanjut pada proses dan produk. Fermentasi merupakan cara yang sangat baik untuk memperbaiki kondisi kehidupan manusia pada masa itu karena menghasilkan banyak produk baru, meskipun mereka tidak paham tentang prinsip dibalik proses fermentasi.
        </p>

        <h2>b. Bioteknologi Klasik</h2>
        <p>
            Tahapan kedua perkembangan bioteknologi disebut dengan bioteknologi klasik. Tahapan ini terjadi dari tahun 1800 hingga hampir pertengahan abad ke dua puluh. Selama periode ini, berbagai variasi hasil observasi dengan bukti-bukti ilmiah mulai bermunculan dan sangat membantu untuk memecahkan pertanyaan- pertanyaan bioteknologi. Masing-masing penemuan membuka jalan bagi penemuan-penemuan baru.
        </p>
        <p>
            Dasar-dasar transfer informasi genetik merupakan inti dari bioteknologi. Penemuan ini pertama kalinya dikemukakan oleh Gregor john Mendel (1822-1884), biarawan Augustinian Austria, pada tumbuhan Pisum sativum. Mendel pada waktu itu mempresentasikan hukum pola pewarisan sifat pada forum Natural Science Society di Burn, Austria. Mendel menyatakan bahwa terdapat unit internal genetik yang tidak terlihat tetapi menjadi faktor penentu pewarisan sifat yang disebut dengan gen. Namun pada masa itu, para ilmuwan kurang tertarik dengan hasil penelitian yang diuraikan oleh Mendel hingga 34 tahun setelah kematiannya, ilmuwan lain seperti Hugo de Vries, Erich Von Tschermak, dan Carl Correns memvalidasi karya mendel pada tahun 1900. Alasan mengapa pada masa itu penelitian Mendel tidak mendapat perhatian adalah karena pada masa itu Teori Evolusi Charles Darwin begitu menyita perhatian publik sehingga menutupi pentingnya pekerjaan yang telah dilakukan oleh Mendel.
        </p>
        <p>
            Pada masa yang sama, Robert Brown menemukan inti sel, sementara pada tahun 1868, Fredich Miescher, ilmuwan asal Swiss menemukan nukein, yaitu senyawa yang terdiri dari asam nukleat yang diekstrak dari sel nanah yaitu sel darah putih. Kedua penemuan ini menjadi dasar perkembangan biologi molekuler modern untuk menemukan DNA sebagai materi genetik dan peran DNA dalam transfer informasi genetik. Pada tahun 1881, Robert Koch, seorang dokter asal Jerman menggambarkan koloni bakteri yang tumbuh dari irisan kentang (medium pada mikroba pertama). Walter Hesse, salah satu rekan kerja Robert Koch, menemukan agar-agar setelah melihat jeli yang selalu padat bahkan suhu tinggi di musim panas. Nutrien yang menjadikan jeli memadat kemudian menjadi media pertama yang paling dapat diterima untuk membuat kultur mikroba murni sehingga mikroba dapat diidentifikasi.
        </p>
        <img src="@/assets/images/material/images.png" alt="sejarah" style="width: 100%; border-radius: 8px; margin: 16px 0;">
        <figcaption style="text-align: center; font-size: 14px; color: #aaa;">Gambar 3. Gregor Mendel, biarawan asal Austria yang menemukan pola pewarisan sifat pada mahluk hidup.</figcaption>
        <figcaption style="text-align: center; font-size: 14px; color: #aaa;">(Sumber: <a href="http://www.nytimes.com" target="_blank"> www.nytimes.com</a>)</figcaption>

        <p>
            Pada tahun 1888, Heinrich Wilhem Gottfried Von Waldeyer-Hart, ilmuwan Jerman, menetapkan istilah kromosom, sebagai struktur yang terorganisir dari DNA dan protein yang ada di dalam sel. Penemuan penting selama periode ini adalah dikembangkannya vaksin terhadap cacar dan rabies oleh Edward Jenner, dokter Inggris dan Louis Pasteur, ahli biologi Prancis.
        </p>

        <img src="@/assets/images/material/images.png" alt="sejarah" style="width: 100%; border-radius: 8px; margin: 16px 0;">
        <figcaption style="text-align: center; font-size: 14px; color: #aaa;">Gambar 4. Edward Jenner, penemu vaksin untuk penyakit cacar dan rabies</figcaption>
        <figcaption style="text-align: center; font-size: 14px; color: #aaa;">(Sumber: <a href="http://www.missedinhistory.com" target="_blank"> www.missedinhistory.com</a>)</figcaption>

        <p>
            Pada saat ini, perkembangan ilmu biologi telah mencapai fase ekspoensial. Johannsen memberikan istilah “genotip” dan “fenotip”. Genotip menggambarkan konstitusi genetik yang terdapat pada suatu organisme sedangkan fenotip menggambarkan tampilan organisme yang sebenarnya. Pada saat ini, genetika telah mendapatkan perhatian masyarakat luas dan dianggap sebagai ilmu yang sangat penting. Pada saat itu, di Amerika Serikat dimulai gerakan Eugenic (perlakuan yang mengarah kepada peningkatan kualitas genetik) pada tahun 1924, akibatnya pada tahun tersebut, Undang-Undang Imigrasi Amerika Serikat digunakan untuk membatasi masuknya imigran dari wilayah Selatan dan Timur Eropa atas dasar rendahnya kualiatas genetiknya.
        </p>
        <p>
            Pada tahun 1928, Alexander Fleming, seorang dokter berkebangsaan inggris, menemukan senyawa antibiotik ketika mengamati satu mikroorganisme dapat digunakan untuk menghambat pertumbuhan dan membunuh mikroorganisme yang lain. Fleming melihat bahwa semua bakteri <i>(Staphylococcus)</i> mati ketika dalam medium yang sama terdapat jamur yang tumbuh. Fleming menyimpulkan bahwa penisilin merupakan zat toksin antibakteri yang berasal dari jamur <i>Penicillium notatum   </i>, dapat digunakan sebagai obat untuk melawan banyak penyakit menular yang diakibatkan oleh bakteri.
        </p>
















        <h3>1. Supervised Learning</h3>
        <p>
          Algoritma dilatih menggunakan data berlabel. Setiap contoh input dalam dataset memiliki label output yang sesuai.
          Model belajar memetakan input ke output berdasarkan contoh-contoh ini.
        </p>

        <h3>2. Unsupervised Learning</h3>
        <p>
          Algoritma dilatih menggunakan data <em>tidak berlabel</em>. Sistem mencoba mempelajari pola dan struktur tersembunyi
          dari data tanpa panduan eksplisit.
        </p>

        <h3>3. Reinforcement Learning</h3>
        <p>
          Sebuah agen belajar dengan berinteraksi dengan lingkungan, menerima reward untuk tindakan yang benar
          dan penalty untuk yang salah — mirip bagaimana manusia belajar melalui trial and error.
        </p>

        <blockquote>
          "Machine learning is the science of getting computers to learn without being explicitly programmed."
          — Andrew Ng
        </blockquote>

        <h2>Perbandingan Algoritma Populer</h2>
        <table>
          <thead>
            <tr>
              <th>Algoritma</th>
              <th>Tipe</th>
              <th>Kegunaan Utama</th>
              <th>Kompleksitas</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Linear Regression</td><td>Supervised</td><td>Prediksi nilai kontinu</td><td>Rendah</td></tr>
            <tr><td>Decision Tree</td><td>Supervised</td><td>Klasifikasi & regresi</td><td>Sedang</td></tr>
            <tr><td>Random Forest</td><td>Supervised</td><td>Klasifikasi akurasi tinggi</td><td>Sedang</td></tr>
            <tr><td>K-Means</td><td>Unsupervised</td><td>Clustering data</td><td>Rendah</td></tr>
            <tr><td>Neural Network</td><td>Supervised/RL</td><td>Pengenalan pola kompleks</td><td>Tinggi</td></tr>
          </tbody>
        </table>

        <h2>Contoh Implementasi dengan Python</h2>
        <pre><code>from sklearn.linear_model import LinearRegression
import numpy as np

# Data latih
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 5, 4, 5])

# Buat dan latih model
model = LinearRegression()
model.fit(X, y)

# Prediksi
prediksi = model.predict([[6]])
print(f"Prediksi untuk x=6: {prediksi[0]:.2f}")</code></pre>

        <h2>Aplikasi di Dunia Nyata</h2>
        <ul>
          <li><strong>Kesehatan</strong> — Deteksi kanker dari citra medis, prediksi penyakit, drug discovery</li>
          <li><strong>Keuangan</strong> — Deteksi penipuan kartu kredit, prediksi harga saham</li>
          <li><strong>Transportasi</strong> — Self-driving car, optimasi rute logistik</li>
          <li><strong>NLP</strong> — Chatbot, terjemahan mesin, analisis sentimen</li>
          <li><strong>E-commerce</strong> — Sistem rekomendasi produk, personalisasi pengalaman</li>
        </ul>

        <h2>Workflow Machine Learning</h2>
        <ol>
          <li>Pengumpulan dan pembersihan data</li>
          <li>Eksplorasi dan visualisasi data (EDA)</li>
          <li>Feature engineering dan seleksi fitur</li>
          <li>Pemilihan dan pelatihan model</li>
          <li>Evaluasi performa model</li>
          <li>Deployment dan monitoring</li>
        </ol>

        <hr>
        <p>
          Untuk memperdalam pemahaman, disarankan untuk berlatih langsung menggunakan dataset nyata dari
          <strong>Kaggle</strong> atau <strong>UCI Machine Learning Repository</strong> dan menerapkan konsep-konsep
          di atas pada proyek kecil mandiri.
        </p>
      `,
    }),
  },
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&family=Exo+2:wght@400;500;600&family=Fira+Code:wght@400;500&display=swap');

/* ===========================
   PAGE
=========================== */
.material-page {
  min-height: 100vh;
  background: #06000e;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  position: relative;
  overflow: hidden;
  font-family: 'Exo 2', sans-serif;
}

.bg-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(124, 58, 237, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124, 58, 237, 0.08) 1px, transparent 1px);
  background-size: 44px 44px;
  pointer-events: none;
  z-index: 0;
}

.orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
}
.orb1 {
  width: 500px;
  height: 500px;
  background: rgba(109, 40, 217, 0.28);
  top: -160px;
  left: -160px;
}
.orb2 {
  width: 350px;
  height: 350px;
  background: rgba(192, 38, 211, 0.2);
  bottom: -80px;
  right: -80px;
}
.orb3 {
  width: 250px;
  height: 250px;
  background: rgba(14, 165, 233, 0.12);
  top: 45%;
  left: 55%;
}

/* ===========================
   CARD
=========================== */
.material-card {
  position: relative;
  width: 80vw;
  height: 90vh;
  max-width: 1200px;
  border-radius: 24px;
  z-index: 1;
  /* Glassmorphism */
  background: rgba(30, 8, 55, 0.55);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(168, 85, 247, 0.2);
  box-shadow:
    0 0 0 1px rgba(109, 40, 217, 0.1),
    0 32px 80px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Animated gradient border glow */
.card-glow-border {
  position: absolute;
  inset: -1px;
  border-radius: 24px;
  background: linear-gradient(135deg, #7c3aed, #c084fc, #0ea5e9, #c084fc, #7c3aed);
  background-size: 300% 300%;
  animation: borderGlow 6s ease infinite;
  z-index: -1;
  opacity: 0.5;
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

.card-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(18, 4, 38, 0.6);
  border-radius: 23px;
  overflow: hidden;
}

/* Scan line */
.scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(192, 132, 252, 0.4), transparent);
  animation: scanAnim 5s ease-in-out infinite;
  pointer-events: none;
  z-index: 10;
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

/* ===========================
   HEADER
=========================== */
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
  margin: 0 0 4px;
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

.meta-chip {
  font-size: 11px;
  font-weight: 600;
  color: #a855f7;
  background: rgba(109, 40, 217, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.25);
  border-radius: 20px;
  padding: 4px 12px;
  letter-spacing: 0.3px;
  white-space: nowrap;
}

.meta-chip.author {
  color: #c084fc;
  background: rgba(109, 40, 217, 0.12);
}

/* ===========================
   DIVIDER
=========================== */
.card-divider {
  height: 1px;
  margin: 0 36px;
  background: linear-gradient(90deg, rgba(109, 40, 217, 0.7), rgba(14, 165, 233, 0.4), transparent);
  flex-shrink: 0;
}

/* ===========================
   SCROLLABLE CONTENT
=========================== */
.card-content {
  flex: 1;
  overflow-y: auto;
  padding: 32px 36px;
  scrollbar-width: none;
  width: 100%;
}

.card-content::-webkit-scrollbar {
  width: 0;
}

.content-body {
  color: #c4a8e0;
  font-size: 15px;
  line-height: 1.85;
  text-align: justify;
}

/* All HTML elements inside content */
.content-body :deep(h1) {
  font-family: 'Rajdhani', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 16px;
  text-shadow: 0 0 20px rgba(192, 132, 252, 0.3);
  line-height: 1.2;
}

.content-body :deep(h2) {
  font-family: 'Rajdhani', sans-serif;
  font-size: 21px;
  font-weight: 700;
  color: #e9d5ff;
  margin: 28px 0 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(109, 40, 217, 0.3);
}

.content-body :deep(h3) {
  font-family: 'Rajdhani', sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: #c084fc;
  margin: 20px 0 8px;
}

.content-body :deep(p) {
  margin: 0 0 14px;
  color: #c4a8e0;
}

.content-body :deep(img) {
  max-width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(168, 85, 247, 0.25);
  margin: 14px 0;
  display: block;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(109, 40, 217, 0.15);
}

.content-body :deep(ul),
.content-body :deep(ol) {
  padding-left: 22px;
  margin: 0 0 14px;
}

.content-body :deep(li) {
  color: #c4a8e0;
  margin-bottom: 6px;
  padding-left: 4px;
}

.content-body :deep(ul li::marker) {
  color: #7c3aed;
}

.content-body :deep(ol li::marker) {
  color: #7c3aed;
  font-weight: 600;
}

.content-body :deep(strong) {
  color: #f3e8ff;
  font-weight: 600;
}

.content-body :deep(em) {
  color: #a78bfa;
  font-style: italic;
}

.content-body :deep(a) {
  color: #818cf8;
  text-decoration: none;
  border-bottom: 1px solid rgba(129, 140, 248, 0.35);
  transition: color 0.2s;
}

.content-body :deep(a:hover) {
  color: #c084fc;
}

.content-body :deep(blockquote) {
  border-left: 3px solid #7c3aed;
  padding: 14px 20px;
  margin: 20px 0;
  background: rgba(109, 40, 217, 0.1);
  border-radius: 0 10px 10px 0;
  color: #a78bfa;
  font-style: italic;
  font-size: 15px;
  line-height: 1.7;
}

.content-body :deep(code) {
  font-family: 'Fira Code', monospace;
  background: rgba(109, 40, 217, 0.22);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 5px;
  padding: 2px 7px;
  font-size: 13px;
  color: #c084fc;
}

.content-body :deep(pre) {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(109, 40, 217, 0.35);
  border-radius: 14px;
  padding: 20px 22px;
  overflow-x: auto;
  margin: 16px 0;
  scrollbar-width: thin;
  scrollbar-color: rgba(109, 40, 217, 0.4) transparent;
}

.content-body :deep(pre::-webkit-scrollbar) {
  height: 4px;
}
.content-body :deep(pre::-webkit-scrollbar-thumb) {
  background: rgba(109, 40, 217, 0.4);
  border-radius: 4px;
}

.content-body :deep(pre code) {
  font-family: 'Fira Code', monospace;
  background: none;
  border: none;
  padding: 0;
  font-size: 13px;
  color: #a5f3fc;
  line-height: 1.7;
}

.content-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 14px;
  border-radius: 12px;
  overflow: hidden;
}

.content-body :deep(thead tr) {
  background: rgba(109, 40, 217, 0.3);
}

.content-body :deep(th) {
  color: #e9d5ff;
  padding: 11px 16px;
  text-align: left;
  border-bottom: 1px solid rgba(168, 85, 247, 0.25);
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.content-body :deep(td) {
  padding: 10px 16px;
  border-bottom: 1px solid rgba(168, 85, 247, 0.08);
  color: #c4a8e0;
}

.content-body :deep(tr:last-child td) {
  border-bottom: none;
}

.content-body :deep(tbody tr:hover td) {
  background: rgba(109, 40, 217, 0.08);
}

.content-body :deep(hr) {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, rgba(109, 40, 217, 0.5), rgba(14, 165, 233, 0.3), transparent);
  margin: 24px 0;
}

/* ===========================
   FOOTER
=========================== */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 36px;
  border-top: 1px solid rgba(109, 40, 217, 0.15);
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.15);
}

.footer-tag {
  font-family: 'Rajdhani', sans-serif;
  font-size: 11px;
  letter-spacing: 2px;
  color: rgba(168, 85, 247, 0.5);
  text-transform: uppercase;
}

.footer-date {
  font-size: 11px;
  color: rgba(168, 85, 247, 0.35);
}

/* ===========================
   RESPONSIVE
=========================== */
@media (max-width: 768px) {
  .material-card {
    width: 95vw;
    height: 92vh;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 20px 16px;
    gap: 12px;
  }

  .card-divider {
    margin: 0 20px;
  }
  .card-content {
    padding: 20px;
  }
  .card-footer {
    padding: 12px 20px;
  }

  .header-title {
    font-size: 18px;
  }

  .content-body :deep(h1) {
    font-size: 22px;
  }
  .content-body :deep(h2) {
    font-size: 18px;
  }
}
</style>
