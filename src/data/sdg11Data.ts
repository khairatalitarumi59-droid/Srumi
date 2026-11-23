export type ZoneType =
  | 'empty'
  | 'green_housing'
  | 'transit'
  | 'park'
  | 'waste'
  | 'heritage'
  | 'dense_road';

export type ClimateStressMode = 'normal' | 'monsoon' | 'heatwave';

export interface ZoneDefinition {
  id: ZoneType;
  label: string;
  shortLabel: string;
  sdgTarget: string;
  description: string;
  populationDelta: number;
  emissionDelta: number;
  greenAreaM2: number;
  floodScore: number;
  accentHex: string;
  bgClass: string;
  borderClass: string;
}

export const GRID_SIZE = 6; // 6x6 = 36 parcel

export const ZONE_DEFINITIONS: Record<ZoneType, ZoneDefinition> = {
  green_housing: {
    id: 'green_housing',
    label: 'Hunian Hijau',
    shortLabel: 'Hunian',
    sdgTarget: 'Target 11.1',
    description:
      'Rumah susun terjangkau dengan atap panel surya, ventilasi silang tropis, dan penampung air hujan.',
    populationDelta: 140,
    emissionDelta: 2.2,
    greenAreaM2: 350,
    floodScore: 4,
    accentHex: '#D97706',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-300',
  },
  transit: {
    id: 'transit',
    label: 'Halte LRT & Bus Listrik',
    shortLabel: 'Transit',
    sdgTarget: 'Target 11.2',
    description:
      'Simpul transportasi publik bebas emisi yang menghubungkan permukiman dengan jalur sepeda aman.',
    populationDelta: 0,
    emissionDelta: -4.2,
    greenAreaM2: 180,
    floodScore: 3,
    accentHex: '#0284C7',
    bgClass: 'bg-sky-50',
    borderClass: 'border-sky-300',
  },
  park: {
    id: 'park',
    label: 'Taman Spons & RTH',
    shortLabel: 'Taman',
    sdgTarget: 'Target 11.7',
    description:
      'Ruang terbuka hijau inklusif dengan kolam retensi banjir dan kanopi penurun suhu kota.',
    populationDelta: 0,
    emissionDelta: -3.5,
    greenAreaM2: 1950,
    floodScore: 14,
    accentHex: '#059669',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-300',
  },
  waste: {
    id: 'waste',
    label: 'Bank Sampah & Energi',
    shortLabel: 'Sirkular',
    sdgTarget: 'Target 11.6',
    description:
      'Pusat pemilahan sampah terpadu dan pengolah kompos perkotaan untuk menekan polusi.',
    populationDelta: 0,
    emissionDelta: -3.8,
    greenAreaM2: 200,
    floodScore: 2,
    accentHex: '#0D9488',
    bgClass: 'bg-teal-50',
    borderClass: 'border-teal-300',
  },
  heritage: {
    id: 'heritage',
    label: 'Cagar Budaya & Komunitas',
    shortLabel: 'Budaya',
    sdgTarget: 'Target 11.4',
    description:
      'Ruang pelestarian warisan arsitektur lokal, amphitheater warga, dan pusat edukasi sejarah.',
    populationDelta: 20,
    emissionDelta: -0.8,
    greenAreaM2: 750,
    floodScore: 5,
    accentHex: '#B45309',
    bgClass: 'bg-orange-50',
    borderClass: 'border-orange-300',
  },
  dense_road: {
    id: 'dense_road',
    label: 'Kawasan Padat & Aspal',
    shortLabel: 'Padat',
    sdgTarget: 'Baseline Kritis',
    description:
      'Area komersial padat kendaraan pribadi dengan permukaan beton kedap air dan emisi tinggi.',
    populationDelta: 90,
    emissionDelta: 7.4,
    greenAreaM2: 40,
    floodScore: -9,
    accentHex: '#DC2626',
    bgClass: 'bg-rose-50',
    borderClass: 'border-rose-300',
  },
  empty: {
    id: 'empty',
    label: 'Lahan Terbuka',
    shortLabel: 'Kosong',
    sdgTarget: 'Siap Rancang',
    description: 'Kavling kosong yang siap dikembangkan menjadi infrastruktur kota berkelanjutan.',
    populationDelta: 0,
    emissionDelta: 0,
    greenAreaM2: 260,
    floodScore: 1,
    accentHex: '#64748B',
    bgClass: 'bg-slate-50',
    borderClass: 'border-slate-200',
  },
};

export const TOOL_ORDER: ZoneType[] = [
  'green_housing',
  'transit',
  'park',
  'waste',
  'heritage',
  'dense_road',
  'empty',
];

export interface CityPreset {
  id: 'baseline' | 'crisis' | 'ideal';
  name: string;
  subtitle: string;
  transitRatio: number;
  solarSubsidy: number;
  drainageBudget: number;
  grid: ZoneType[];
}

export const CITY_PRESETS: CityPreset[] = [
  {
    id: 'baseline',
    name: 'Kota Awal 2026',
    subtitle: 'Campuran kawasan padat lama dan beberapa inisiatif hijau awal.',
    transitRatio: 35,
    solarSubsidy: 25,
    drainageBudget: 35,
    grid: [
      'dense_road', 'dense_road', 'green_housing', 'park', 'empty', 'empty',
      'dense_road', 'green_housing', 'transit', 'green_housing', 'empty', 'park',
      'empty', 'dense_road', 'dense_road', 'heritage', 'green_housing', 'empty',
      'park', 'empty', 'green_housing', 'transit', 'dense_road', 'waste',
      'empty', 'green_housing', 'dense_road', 'empty', 'park', 'empty',
      'empty', 'empty', 'waste', 'empty', 'empty', 'empty',
    ],
  },
  {
    id: 'crisis',
    name: 'Krisis Banjir & Polusi',
    subtitle: 'Dominasi beton kedap air dan kemacetan kendaraan pribadi.',
    transitRatio: 15,
    solarSubsidy: 10,
    drainageBudget: 15,
    grid: [
      'dense_road', 'dense_road', 'dense_road', 'dense_road', 'green_housing', 'empty',
      'dense_road', 'dense_road', 'green_housing', 'dense_road', 'dense_road', 'empty',
      'green_housing', 'dense_road', 'dense_road', 'dense_road', 'dense_road', 'green_housing',
      'dense_road', 'dense_road', 'transit', 'dense_road', 'empty', 'empty',
      'empty', 'green_housing', 'dense_road', 'dense_road', 'heritage', 'empty',
      'empty', 'empty', 'park', 'empty', 'empty', 'waste',
    ],
  },
  {
    id: 'ideal',
    name: 'Kota Ideal 2030',
    subtitle: 'Tata ruang berorientasi transit (TOD), taman spons, dan energi surya.',
    transitRatio: 78,
    solarSubsidy: 75,
    drainageBudget: 80,
    grid: [
      'park', 'green_housing', 'transit', 'green_housing', 'park', 'waste',
      'green_housing', 'transit', 'park', 'transit', 'green_housing', 'park',
      'park', 'green_housing', 'heritage', 'green_housing', 'park', 'empty',
      'waste', 'park', 'green_housing', 'transit', 'green_housing', 'park',
      'empty', 'green_housing', 'transit', 'park', 'heritage', 'green_housing',
      'park', 'empty', 'park', 'waste', 'park', 'empty',
    ],
  },
];

export interface SDG11Target {
  code: string;
  category: 'permukiman' | 'lingkungan' | 'kebijakan';
  categoryLabel: string;
  title: string;
  summary: string;
  indonesiaContext: string;
  linkedZone: ZoneType;
}

export const SDG11_TARGETS: SDG11Target[] = [
  {
    code: '11.1',
    category: 'permukiman',
    categoryLabel: 'Permukiman & Mobilitas',
    title: 'Perumahan Layak, Aman, dan Terjangkau',
    summary:
      'Menjamin akses bagi semua terhadap perumahan dan layanan dasar yang layak, aman, terjangkau, serta menata kawasan kumuh.',
    indonesiaContext:
      'Di kota besar Indonesia, rumah susun transit (TOD) membantu keluarga berpenghasilan menengah ke bawah tinggal dekat akses kerja tanpa harus tinggal di bantaran sungai rawan banjir.',
    linkedZone: 'green_housing',
  },
  {
    code: '11.2',
    category: 'permukiman',
    categoryLabel: 'Permukiman & Mobilitas',
    title: 'Sistem Transportasi Publik Aman & Inklusif',
    summary:
      'Menyediakan akses transportasi yang aman, terjangkau, mudah diakses bagi penyandang disabilitas, lansia, perempuan, dan anak.',
    indonesiaContext:
      'Integrasi BRT, KRL, MRT, LRT, dan trotoar teduh dengan jalur sepeda mendorong pelajar dan pekerja beralih dari kendaraan bermotor pribadi.',
    linkedZone: 'transit',
  },
  {
    code: '11.3',
    category: 'kebijakan',
    categoryLabel: 'Budaya & Kebijakan',
    title: 'Perencanaan Kota Partisipatif dan Terpadu',
    summary:
      'Meningkatkan urbanisasi inklusif dan berkelanjutan serta kapasitas perencanaan permukiman yang melibatkan masyarakat dan generasi muda.',
    indonesiaContext:
      'Forum musyawarah warga dan pemetaan partisipatif oleh pelajar SMA memungkinkan masalah titik rawan banjir atau minim lampu jalan tersampaikan langsung ke pemerintah daerah.',
    linkedZone: 'heritage',
  },
  {
    code: '11.4',
    category: 'kebijakan',
    categoryLabel: 'Budaya & Kebijakan',
    title: 'Pelestarian Warisan Budaya dan Alam Dunia',
    summary:
      'Memperkuat upaya melindungi dan menjaga warisan budaya serta warisan alam di kawasan perkotaan maupun pedesaan.',
    indonesiaContext:
      'Revitalisasi kawasan kota tua, kampung adat, dan ruang seni publik menjaga identitas sejarah kota sekaligus menggerakkan ekonomi kreatif lokal.',
    linkedZone: 'heritage',
  },
  {
    code: '11.5',
    category: 'lingkungan',
    categoryLabel: 'Lingkungan & Bencana',
    title: 'Pengurangan Risiko Bencana Perkotaan',
    summary:
      'Mengurangi secara signifikan jumlah korban dan kerugian ekonomi akibat bencana, terutama bencana terkait air seperti banjir.',
    indonesiaContext:
      'Konsep Kota Spons (taman retensi, biopori, dan sumur resapan) menyerap curah hujan tropis ekstrem sebelum meluap ke permukiman padat.',
    linkedZone: 'park',
  },
  {
    code: '11.6',
    category: 'lingkungan',
    categoryLabel: 'Lingkungan & Bencana',
    title: 'Kualitas Udara dan Pengelolaan Sampah Kota',
    summary:
      'Mengurangi dampak lingkungan per kapita perkotaan, termasuk perhatian khusus pada kualitas udara (PM2.5) dan pengelolaan limbah kota.',
    indonesiaContext:
      'Bank sampah digital, pengomposan organik sekolah, dan elektrifikasi armada angkut sampah mengurangi timbunan TPA dan emisi metana.',
    linkedZone: 'waste',
  },
  {
    code: '11.7',
    category: 'lingkungan',
    categoryLabel: 'Lingkungan & Bencana',
    title: 'Ruang Terbuka Hijau dan Publik yang Aman',
    summary:
      'Menyediakan akses universal terhadap ruang hijau dan ruang publik yang aman, inklusif, serta ramah anak, lansia, dan disabilitas.',
    indonesiaContext:
      'Standar WHO merekomendasikan minimal 9 m² ruang terbuka hijau per penduduk untuk menurunkan efek pulau panas perkotaan (Urban Heat Island).',
    linkedZone: 'park',
  },
  {
    code: '11.a',
    category: 'kebijakan',
    categoryLabel: 'Budaya & Kebijakan',
    title: 'Keterkaitan Positif Desa-Kota',
    summary:
      'Mendukung hubungan ekonomi, sosial, dan lingkungan yang positif antara kawasan perkotaan, pinggiran kota, dan pedesaan.',
    indonesiaContext:
      'Rantai pasok pangan lokal dari desa penyangga ke pasar kota mengurangi jejak karbon transportasi logistik.',
    linkedZone: 'transit',
  },
  {
    code: '11.b',
    category: 'lingkungan',
    categoryLabel: 'Lingkungan & Bencana',
    title: 'Kebijakan Adaptasi Perubahan Iklim',
    summary:
      'Meningkatkan jumlah kota yang menerapkan kebijakan terpadu menuju inklusi, efisiensi sumber daya, mitigasi, dan adaptasi iklim.',
    indonesiaContext:
      'Penerapan insentif panel surya atap dan kode bangunan hijau pada sekolah serta gedung publik menurunkan beban listrik puncak di siang hari.',
    linkedZone: 'green_housing',
  },
  {
    code: '11.c',
    category: 'permukiman',
    categoryLabel: 'Permukiman & Mobilitas',
    title: 'Bangunan Tangguh Berbahan Lokal',
    summary:
      'Mendukung pembangunan gedung yang berkelanjutan dan tangguh dengan memanfaatkan material lokal yang ramah lingkungan.',
    indonesiaContext:
      'Penggunaan material bambu laminasi, bata terakota berpori, dan desain ventilasi tropis menekan jejak karbon konstruksi.',
    linkedZone: 'green_housing',
  },
];

export interface CaseStudyItem {
  id: string;
  title: string;
  location: string;
  target: string;
  imagePath: string;
  imageAlt: string;
  summary: string;
  measurableImpact: string;
  studentTakeaway: string;
}

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'tod-corridor',
    title: 'Koridor Transit Hijau & Jalur Sepeda Aman',
    location: 'Jakarta & Surabaya',
    target: 'Target 11.2 · Mobilitas Bersih',
    imagePath: '/src/assets/images/sdg11_transit_corridor_1795402422912.jpg',
    imageAlt: 'Ilustrasi arsitektural koridor LRT listrik dengan jalur sepeda teduh dan taman resapan air hujan',
    summary:
      'Menggabungkan jalur LRT listrik, halte bus terintegrasi, jalur sepeda terproteksi, dan parit resapan tanaman di sisi jalan mengurangi ketergantungan pada motor dan mobil pribadi.',
    measurableImpact: 'Potensi penurunan emisi transportasi lokal hingga 42% per koridor padat.',
    studentTakeaway:
      'Di sekolah, siswa dapat memetakan rute jalan kaki dan bersepeda aman dalam radius 2 km menuju gerbang sekolah.',
  },
  {
    id: 'green-housing',
    title: 'Hunian Vertikal Tropis Berenergi Surya',
    location: 'Bandung & Semarang',
    target: 'Target 11.1 & 11.c · Hunian Layak',
    imagePath: '/src/assets/images/sdg11_green_housing_1795402423150.jpg',
    imageAlt: 'Ilustrasi apartemen hijau terjangkau dengan panel surya atap, kisi bambu, dan kolam penampung air hujan',
    summary:
      'Apartemen susun terjangkau memanfaatkan kisi bambu sebagai peneduh alami, taman langit di tiap lantai, panel surya atap, serta kolam penampung air hujan di halaman tengah.',
    measurableImpact: 'Suhu dalam ruangan lebih sejuk 3,5°C tanpa ketergantungan penuh pada pendingin udara.',
    studentTakeaway:
      'Prinsip ventilasi silang dan pemanenan air hujan dapat diuji coba langsung sebagai proyek sains kelas 11 pada bangunan sekolah.',
  },
  {
    id: 'sponge-park',
    title: 'Taman Spons & Pendopo Budaya Komunitas',
    location: 'Yogyakarta & Solo',
    target: 'Target 11.4, 11.5 & 11.7 · Kota Tangguh',
    imagePath: '/src/assets/images/sdg11_urban_sponge_park_1795402424188.jpg',
    imageAlt: 'Ilustrasi taman kota resapan air bertingkat dengan jembatan kayu dan pendopo budaya tradisional Indonesia',
    summary:
      'Lahan rawan genangan diubah menjadi lahan basah bertingkat yang menyaring air hujan secara alami, dilengkapi jalur pejalan kaki dan pendopo kayu untuk pertunjukan seni warga.',
    measurableImpact: 'Mampu menampung limpasan hujan ekstrem hingga 65% lebih baik dibanding lapangan beton.',
    studentTakeaway:
      'Kombinasi ekologi dan pelestarian budaya membuktikan bahwa solusi iklim justru mempererat ruang kebersamaan warga.',
  },
];

export interface StudentProjectTemplate {
  id: string;
  title: string;
  targetCode: string;
  category: string;
  defaultLocation: string;
  defaultDurationWeeks: number;
  defaultBudget: string;
  defaultMetricTarget: string;
  problemStatement: string;
  steps: string[];
}

export const STUDENT_PROJECT_TEMPLATES: StudentProjectTemplate[] = [
  {
    id: 'biopori-school',
    title: 'Taman Hujan & Jaringan Biopori Sekolah',
    targetCode: 'SDG 11.5 & 11.7',
    category: 'Ketahanan Banjir & Ruang Hijau',
    defaultLocation: 'Halaman Parkir & Lapangan SMA',
    defaultDurationWeeks: 8,
    defaultBudget: 'Rp 750.000 (pipa PVC, kompos, bibit tanaman lokal)',
    defaultMetricTarget: 'Menyerap 100% genangan halaman dalam 30 menit pasca hujan deras',
    problemStatement:
      'Area perkerasan paving atau aspal di sekolah sering menimbulkan genangan saat hujan lebat sekaligus meningkatkan suhu siang hari.',
    steps: [
      'Pemetaan titik genangan air saat hujan selama 1 minggu oleh tim siswa.',
      'Pembuatan 24 lubang resapan biopori dan 1 cekungan taman hujan berisi tanaman akar kuat.',
      'Pengisian sampah organik daun gugur sekolah ke dalam biopori untuk menjadi kompos.',
      'Pengukuran waktu surut genangan sebelum dan sesudah intervensi sebagai laporan data.',
    ],
  },
  {
    id: 'safe-bike-route',
    title: 'Pemetaan Jalur Aman Bersepeda & Jalan Kaki Pelajar',
    targetCode: 'SDG 11.2',
    category: 'Mobilitas Berkelanjutan',
    defaultLocation: 'Radius 2 km Sekitar Sekolah',
    defaultDurationWeeks: 6,
    defaultBudget: 'Rp 300.000 (cetak peta, rambu informasi kampanye)',
    defaultMetricTarget: 'Meningkatkan partisipasi siswa jalan kaki/sepeda sebesar 25% dalam 1 semester',
    problemStatement:
      'Banyak siswa yang tinggal dekat sekolah tetap diantar kendaraan bermotor karena minimnya informasi jalur teduh dan penyeberangan aman.',
    steps: [
      'Survei jarak tempat tinggal siswa dan identifikasi persimpangan berisiko tinggi.',
      'Audit kondisi trotoar, peneduh pohon, dan titik parkir sepeda di lingkungan sekolah.',
      'Penyusunan peta rute aman interaktif dan gerakan "Jumat Tanpa Kendaraan Pribadi".',
      'Evaluasi pengurangan jumlah kendaraan antar-jemput di gerbang sekolah setiap bulan.',
    ],
  },
  {
    id: 'qr-waste-bank',
    title: 'Bank Sampah Digital Berbasis QR Antar Kelas',
    targetCode: 'SDG 11.6',
    category: 'Pengelolaan Limbah Perkotaan',
    defaultLocation: 'Seluruh Ruang Kelas & Kantin',
    defaultDurationWeeks: 10,
    defaultBudget: 'Rp 500.000 (wadah pilah 3 kategori & timbangan digital)',
    defaultMetricTarget: 'Mengurangi volume sampah residu sekolah menuju TPA hingga 45%',
    problemStatement:
      'Sampah plastik botol minuman dan sisa organik kantin masih tercampur sehingga kehilangan nilai daur ulang.',
    steps: [
      'Penempatan titik pilah terstandar (organik, plastik/kertas bernilai, residu) per blok kelas.',
      'Pencatatan berat setoran sampah kelas menggunakan kartu atau kode QR sederhana.',
      'Penyaluran sampah terpilah ke bank sampah kelurahan dan pengolahan organik menjadi kompos.',
      'Publikasi papan capaian pengurangan sampah bulanan di mading sekolah.',
    ],
  },
  {
    id: 'heritage-archive',
    title: 'Papan Cerita Digital Warisan Arsitektur & Sejarah Lokal',
    targetCode: 'SDG 11.4 & 11.3',
    category: 'Pelestarian Budaya & Inklusi',
    defaultLocation: 'Kawasan Bersejarah / Pasar Tradisional Kota',
    defaultDurationWeeks: 8,
    defaultBudget: 'Rp 400.000 (plakat QR tahan cuaca & dokumentasi)',
    defaultMetricTarget: 'Mendokumentasikan 10 bangunan/tradisi bersejarah lokal untuk publik',
    problemStatement:
      'Generasi muda sering kurang mengenal sejarah bangunan cagar budaya dan ruang publik bersejarah di kotanya sendiri.',
    steps: [
      'Wawancara tokoh masyarakat, sejarawan lokal, dan arsiparis daerah.',
      'Dokumentasi foto arsitektur bangunan serta narasi sejarah yang ringkas dan inklusif.',
      'Pembuatan halaman informasi publik ringan yang dapat diakses lewat kode QR di lokasi.',
      'Pameran mini hasil riset siswa untuk warga sekitar dan komunitas sekolah.',
    ],
  },
];
