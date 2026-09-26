/**
 * Initial Seed Data for TemanTutor Platform
 * Pure Token-Based Bridge (Job Board & Penghubung Tutor - Murid)
 * Clean Run Mode (Tanpa Akun Simulasi Dummy)
 */

export const SUBJECT_CATEGORIES = [
  {
    id: 'mipa',
    name: 'MIPA (Sains & Matematika)',
    subjects: [
      { id: 'matematika', name: 'Matematika' },
      { id: 'fisika', name: 'Fisika' },
      { id: 'kimia', name: 'Kimia' },
      { id: 'biologi', name: 'Biologi' },
    ],
  },
  {
    id: 'bahasa',
    name: 'Bahasa & Sastra',
    subjects: [
      { id: 'inggris', name: 'Bahasa Inggris' },
      { id: 'mandarin', name: 'Bahasa Mandarin' },
      { id: 'jepang', name: 'Bahasa Jepang' },
      { id: 'indonesia', name: 'Bahasa Indonesia' },
      { id: 'arab', name: 'Bahasa Arab' },
    ],
  },
  {
    id: 'ujian',
    name: 'Persiapan Ujian & Seleksi',
    subjects: [
      { id: 'utbk_snbt', name: 'UTBK / SNBT' },
      { id: 'toefl_ielts', name: 'TOEFL & IELTS' },
      { id: 'kedinasan_cpns', name: 'SKD CPNS / Kedinasan' },
      { id: 'olimpiade_osn', name: 'Olimpiade Sains (OSN)' },
    ],
  },
  {
    id: 'it_coding',
    name: 'IT, Coding & Digital Skill',
    subjects: [
      { id: 'web_dev', name: 'Web Development (HTML/CSS/JS/React)' },
      { id: 'python_data', name: 'Python & Data Science' },
      { id: 'ui_ux', name: 'UI/UX Design (Figma)' },
    ],
  },
  {
    id: 'seni_musik',
    name: 'Seni & Musik',
    subjects: [
      { id: 'piano', name: 'Piano & Keyboard' },
      { id: 'gitar', name: 'Gitar Klasik / Akustik' },
      { id: 'vokal', name: 'Vokal & Olah Suara' },
    ],
  },
];

export const EDUCATION_LEVELS = [
  { id: 'sd', label: 'SD (Sekolah Dasar)', isMinor: true },
  { id: 'smp', label: 'SMP (Sekolah Menengah Pertama)', isMinor: true },
  { id: 'sma', label: 'SMA / SMK (Sekolah Menengah Atas)', isMinor: false },
  { id: 'kuliah', label: 'Mahasiswa / Perguruan Tinggi', isMinor: false },
  { id: 'umum', label: 'Umum & Profesional', isMinor: false },
];

export const TEACHING_PLATFORMS = [
  {
    id: 'google_meet',
    name: 'Google Meet',
    type: 'online',
    icon: 'Video',
    desc: 'Sesi online video conference via Google Meet.',
  },
  {
    id: 'zoom',
    name: 'Zoom Meeting',
    type: 'online',
    icon: 'Video',
    desc: 'Sesi online video conference via Zoom Meeting.',
  },
  {
    id: 'discord',
    name: 'Discord Call / Screen Share',
    type: 'online',
    icon: 'MessageSquare',
    desc: 'Sesi online via server/voice call Discord.',
  },
  {
    id: 'offline',
    name: 'Tatap Muka Langsung',
    type: 'offline',
    icon: 'MapPin',
    desc: 'Tutor datang ke rumah murid atau bertemu di lokasi publik.',
  },
];

// Akun master admin untuk mengelola platform. Akun simulasi dummy murid & tentor telah dihapus untuk uji coba run murni.
export const INITIAL_USERS = [
  {
    id: 'user_admin',
    name: 'Super Moderator (Admin)',
    email: 'admin@temantutor.id',
    username: 'admin',
    phone: '081100009999',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    userType: 'admin',
    city: 'Jakarta Pusat',
    tokens: 999,
    password: 'admin@WirDIG2024',
  },
];

export const INITIAL_JOB_REQUESTS = [];

export const INITIAL_REVIEWS = [];

export const INITIAL_CHAT_THREADS = [];

export const INITIAL_NOTIFICATIONS = [];

export const INITIAL_SUBJECT_REQUESTS = [];
