/**
 * Service Integrasi Google Spreadsheet & Local Database (Gratis 100%)
 * 
 * 1. Simpan akun & data ke LocalStorage (Persistent Browser Database)
 * 2. Simpan otomatis ke Google Spreadsheet via Google Apps Script Webhook (Gratis tanpa kuota berbayar)
 * 3. Fitur Ekspor ke format CSV / Excel Spreadsheet kapan saja
 */

const SHEET_STORAGE_KEY = 'temantentor_sheet_webhook_url';
const USERS_CLOUD_SYNC_KEY = 'temantentor_synced_users';

/**
 * Dapatkan URL Webhook Google Apps Script yang tersimpan
 */
export const getSheetWebhookUrl = () => {
  return localStorage.getItem(SHEET_STORAGE_KEY) || '';
};

/**
 * Simpan / perbarui URL Webhook Google Apps Script
 */
export const setSheetWebhookUrl = (url) => {
  if (url) {
    localStorage.setItem(SHEET_STORAGE_KEY, url.trim());
  } else {
    localStorage.removeItem(SHEET_STORAGE_KEY);
  }
};

/**
 * Kirim data pendaftaran pengguna baru ke Google Spreadsheet
 * Menggunakan fetch 'no-cors' agar tidak diblokir CORS oleh Google Apps Script
 */
export const saveUserToGoogleSheet = async (user) => {
  const webhookUrl = getSheetWebhookUrl();

  const payload = {
    action: 'REGISTER_USER',
    timestamp: new Date().toISOString(),
    id: user.id,
    name: user.name,
    username: user.username || user.email.split('@')[0],
    email: user.email,
    phone: user.phone || '-',
    role: user.role, // 'student' | 'tutor'
    roleLabel: user.role === 'student' ? 'Murid' : 'Tentor',
    educationLevel: user.educationLevel || '-',
    city: user.city || '-',
    isMinor: user.userType === 'minor' ? 'Ya (SD/SMP)' : 'Tidak (Dewasa/SMA)',
    createdAt: user.createdAt || new Date().toLocaleString('id-ID'),
  };

  // Simpan log sinkronisasi lokal
  try {
    const raw = localStorage.getItem(USERS_CLOUD_SYNC_KEY);
    const list = raw ? JSON.parse(raw) : [];
    list.unshift(payload);
    localStorage.setItem(USERS_CLOUD_SYNC_KEY, JSON.stringify(list.slice(0, 100)));
  } catch (err) {
    console.warn('Gagal menyimpan log lokal sync:', err);
  }

  // Jika belum memasang URL Google Apps Script, hanya simpan di storage lokal browser
  if (!webhookUrl) {
    console.info(
      'ℹ️ [Database/Spreadsheet] Data user tersimpan di Local Database. Untuk otomatis kirim ke Google Spreadsheet langsung, masukkan URL Google Apps Script Anda di Pengaturan Spreadsheet.'
    );
    return { success: true, mode: 'local_storage', data: payload };
  }

  try {
    // Kirim ke Google Apps Script Web App
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.info('✅ [Spreadsheet Sync] Data pengguna berhasil dikirim ke Google Spreadsheet:', user.name);
    return { success: true, mode: 'google_sheet', data: payload };
  } catch (error) {
    console.warn('⚠️ Gagal mengirim ke Google Sheet webhook, fallback ke local storage:', error);
    return { success: true, mode: 'local_storage_fallback', error: error.message };
  }
};

/**
 * Ekspor seluruh data akun pengguna ke file CSV (Kompatibel dengan Google Sheets & Excel)
 */
export const exportUsersToSpreadsheetCSV = (usersList = []) => {
  if (!usersList || usersList.length === 0) return;

  const headers = [
    'ID Akun',
    'Nama Lengkap',
    'Username',
    'Email',
    'No WhatsApp / Telepon',
    'Peran (Role)',
    'Tipe Akun',
    'Jenjang Pendidikan',
    'Kota',
    'Tanggal Terdaftar',
  ];

  const rows = usersList.map((u) => [
    `"${u.id || ''}"`,
    `"${(u.name || '').replace(/"/g, '""')}"`,
    `"${(u.username || u.email?.split('@')[0] || '').replace(/"/g, '""')}"`,
    `"${u.email || ''}"`,
    `"${u.phone || ''}"`,
    `"${u.role === 'student' ? 'Murid / Siswa' : u.role === 'tutor' ? 'Tentor / Guru' : 'Admin'}"`,
    `"${u.userType === 'minor' ? 'Minor (Dibawah Umur)' : 'Reguler'}"`,
    `"${(u.educationLevel || '').toUpperCase()}"`,
    `"${u.city || ''}"`,
    `"${u.createdAt || '-'}"`,
  ]);

  const csvContent =
    '\uFEFF' + // UTF-8 BOM agar terbaca rapi di Excel / Google Sheets
    [headers.join(','), ...rows.map((e) => e.join(','))].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Database_Pengguna_WirDIG_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Ekspor SATU Tawaran Murid Spesifik beserta Semua Tentor yang Melamar (Nomor WA, Email, Nama Murid & Tentor)
 * Setiap tawaran murid menghasilkan file spreadsheet tersendiri sesuai permintaan admin.
 */
export const exportSingleJobToSpreadsheetCSV = (job, studentUser = null) => {
  if (!job) return;

  const applicants = job.applicants || [];
  const duration = job.durationMinutes || 60;
  const feePerSession = job.feePerSession || Math.round((job.studentInputPrice || 100000) / (job.sessionCount || 1));
  const netFee = job.netFeePerSession || Math.round(feePerSession * 0.85);
  const adminFee = Math.round(feePerSession * 0.15);

  const studentName = studentUser?.name || job.studentName || '-';
  const studentEmail = studentUser?.email || job.studentEmail || '-';
  const studentPhone = studentUser?.phone || job.studentPhone || '-';

  const lines = [
    `"=== SPREADSHEET DETAIL TAWARAN LES & PELAMAR TENTOR ==="`,
    `"ID Tawaran","${job.id}"`,
    `"Judul Permintaan","${(job.title || '').replace(/"/g, '""')}"`,
    `"Mata Pelajaran","${job.subject || ''}"`,
    `"Jenjang","${(job.level || '').toUpperCase()}"`,
    `"Durasi Per Sesi","${duration} Menit"`,
    `"Fee Murid Per Sesi","Rp ${feePerSession.toLocaleString('id-ID')}"`,
    `"Fee Bersih Tentor (85%)","Rp ${netFee.toLocaleString('id-ID')}"`,
    `"Potongan Admin (15%)","Rp ${adminFee.toLocaleString('id-ID')}"`,
    `"Jadwal Yang Diminta","${(job.preferredSchedule || '').replace(/"/g, '""')}"`,
    `"Deskripsi Kebutuhan","${(job.description || '').replace(/"/g, '""')}"`,
    `"Waktu Dipublikasikan","${job.createdAt || '-'}"`,
    ``,
    `"=== INFORMASI KONTAK SISWA / MURID ==="`,
    `"Nama Siswa","${studentName.replace(/"/g, '""')}"`,
    `"Email Siswa","${studentEmail}"`,
    `"Nomor WhatsApp Siswa","${studentPhone}"`,
    `"Kontak Orang Tua / Wali","${(job.parentName || studentUser?.parentContact?.parentName || '-').replace(/"/g, '""')} (${job.parentPhone || studentUser?.parentContact?.parentPhone || '-'})"`,
    ``,
    `"=== DAFTAR TENTOR YANG MENAWARKAN DIRI (${applicants.length} PELAMAR) ==="`,
    [
      'No',
      'Nama Tentor',
      'Email Tentor',
      'No WhatsApp Tentor',
      'Pendidikan & Keahlian Tentor',
      'Deskripsi / Bio Tentor',
      'Pesan Tawaran / Lamaran Mengajar',
      'Waktu Mengajukan Lamaran',
    ].map((h) => `"${h}"`).join(','),
  ];

  if (applicants.length === 0) {
    lines.push(`"","Belum ada tentor yang menawarkan diri untuk tawaran ini.","","","","","",""`);
  } else {
    applicants.forEach((a, idx) => {
      lines.push([
        idx + 1,
        `"${(a.tutorName || '').replace(/"/g, '""')}"`,
        `"${a.tutorEmail || ''}"`,
        `"${a.tutorPhone || ''}"`,
        `"${(a.tutorEducation || a.tutorHeadline || '').replace(/"/g, '""')}"`,
        `"${(a.tutorBio || '').replace(/"/g, '""')}"`,
        `"${(a.proposalText || '').replace(/"/g, '""')}"`,
        `"${a.appliedAt || '-'}"`,
      ].join(','));
    });
  }

  const csvContent = '\uFEFF' + lines.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const cleanSubject = (job.subject || 'Mapel').replace(/[^a-zA-Z0-9]/g, '_');
  const cleanStudent = studentName.replace(/[^a-zA-Z0-9]/g, '_');
  link.setAttribute('href', url);
  link.setAttribute('download', `Spreadsheet_Tawaran_${cleanSubject}_${cleanStudent}_${job.id}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Ekspor SEMUA Tawaran Murid + Data Pelamar Lengkap (Admin Global Spreadsheet)
 */
export const exportAllJobsWithApplicantsCSV = (jobsList = [], usersList = []) => {
  if (!jobsList || jobsList.length === 0) return;

  const headers = [
    'ID Tawaran',
    'Mata Pelajaran',
    'Jenjang',
    'Durasi (Menit)',
    'Fee Murid / Sesi (Rp)',
    'Net Tentor 85% (Rp)',
    'Admin Fee 15% (Rp)',
    'Nama Murid',
    'Email Murid',
    'No WA Murid',
    'Nama Tentor Pelamar',
    'Email Tentor Pelamar',
    'No WA Tentor Pelamar',
    'Pendidikan / Keahlian Tentor',
    'Pesan Tawaran Tentor',
    'Waktu Melamar',
    'Status Tawaran',
  ];

  const rows = [];

  jobsList.forEach((job) => {
    const student = usersList.find((u) => u.id === job.studentId);
    const studentName = student?.name || job.studentName || '-';
    const studentEmail = student?.email || job.studentEmail || '-';
    const studentPhone = student?.phone || job.studentPhone || '-';

    const feePerSession = job.feePerSession || Math.round((job.studentInputPrice || 100000) / (job.sessionCount || 1));
    const netFee = job.netFeePerSession || Math.round(feePerSession * 0.85);
    const adminFee = Math.round(feePerSession * 0.15);

    const applicants = job.applicants || [];

    if (applicants.length === 0) {
      rows.push([
        `"${job.id}"`,
        `"${job.subject || ''}"`,
        `"${(job.level || '').toUpperCase()}"`,
        `"${job.durationMinutes || 60}"`,
        `"${feePerSession}"`,
        `"${netFee}"`,
        `"${adminFee}"`,
        `"${studentName.replace(/"/g, '""')}"`,
        `"${studentEmail}"`,
        `"${studentPhone}"`,
        `"(Belum ada pelamar)"`,
        `"-"`,
        `"-"`,
        `"-"`,
        `"-"`,
        `"-"`,
        `"${job.status || 'open'}"`,
      ]);
    } else {
      applicants.forEach((a) => {
        rows.push([
          `"${job.id}"`,
          `"${job.subject || ''}"`,
          `"${(job.level || '').toUpperCase()}"`,
          `"${job.durationMinutes || 60}"`,
          `"${feePerSession}"`,
          `"${netFee}"`,
          `"${adminFee}"`,
          `"${studentName.replace(/"/g, '""')}"`,
          `"${studentEmail}"`,
          `"${studentPhone}"`,
          `"${(a.tutorName || '').replace(/"/g, '""')}"`,
          `"${a.tutorEmail || ''}"`,
          `"${a.tutorPhone || ''}"`,
          `"${(a.tutorEducation || a.tutorHeadline || '').replace(/"/g, '""')}"`,
          `"${(a.proposalText || '').replace(/"/g, '""')}"`,
          `"${a.appliedAt || '-'}"`,
          `"${job.status || 'open'}"`,
        ]);
      });
    }
  });

  const csvContent =
    '\uFEFF' +
    [headers.join(','), ...rows.map((e) => e.join(','))].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Database_Semua_Tawaran_dan_Pelamar_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Panduan Script Google Apps Script Gratis (untuk disalin ke Google Sheets Admin)
 */
export const GOOGLE_APPS_SCRIPT_TEMPLATE = `
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);
    
    // Jika aksi adalah Lamaran Tentor (Job Proposal)
    if (data.action === 'JOB_PROPOSAL') {
      var sheetName = "Tawaran_" + (data.jobSubject || "Mapel").substring(0, 15);
      var sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
      
      if (sheet.getLastRow() === 0) {
        sheet.appendRow([
          "Waktu Melamar", "ID Tawaran", "Mata Pelajaran", "Jenjang", "Fee Murid/Sesi", "Net Tentor (85%)",
          "Nama Murid", "Email Murid", "WA Murid",
          "Nama Tentor Pelamar", "Email Tentor", "WA Tentor", "Keahlian & Edukasi", "Pesan Lamaran"
        ]);
      }
      
      sheet.appendRow([
        data.appliedAt || new Date().toLocaleString(),
        data.jobId || "",
        data.jobSubject || "",
        data.jobLevel || "",
        data.feePerSession || "",
        data.netFee || "",
        data.studentName || "",
        data.studentEmail || "",
        data.studentPhone || "",
        data.tutorName || "",
        data.tutorEmail || "",
        data.tutorPhone || "",
        data.tutorHeadline || "",
        data.proposalText || ""
      ]);
    } else {
      // Registrasi Pengguna Baru
      var userSheet = ss.getSheetByName("Pengguna") || ss.getActiveSheet();
      if (userSheet.getLastRow() === 0) {
        userSheet.appendRow([
          "Waktu Daftar", "ID", "Nama Lengkap", "Username", 
          "Email", "No HP / WA", "Role", "Jenjang", "Kota", "Status Minor"
        ]);
      }
      userSheet.appendRow([
        data.createdAt || new Date().toLocaleString(),
        data.id || "",
        data.name || "",
        data.username || "",
        data.email || "",
        data.phone || "",
        data.roleLabel || data.role || "",
        data.educationLevel || "",
        data.city || "",
        data.isMinor || ""
      ]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({status: "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({status: "error", message: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
`.trim();


