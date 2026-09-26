import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ChevronRight, UserCheck, Lock, FileCheck } from 'lucide-react';

export const PrivacyPolicyPage = () => {
  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: 'calc(100vh - 4.5rem)', padding: '3rem 0 5rem' }}>
      <div className="container-custom" style={{ maxWidth: '840px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--slate-500)', marginBottom: '1.25rem' }}>
          <Link to="/" style={{ color: 'var(--slate-500)' }}>Beranda</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--slate-800)', fontWeight: '600' }}>Kebijakan Privasi</span>
        </div>

        <div className="card" style={{ padding: '2.5rem', lineHeight: '1.7', color: 'var(--slate-700)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
            Kebijakan Privasi & Perlindungan Data Pengguna
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--slate-400)', marginBottom: '2rem' }}>
            Sesuai Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27 Tahun 2022) Indonesia
          </p>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
              1. Pengumpulan Data Pengguna
            </h2>
            <p>
              Kami mengumpulkan informasi kontak dasar seperti nama lengkap, alamat email, nomor WhatsApp, jenjang pendidikan, serta dokumen kualifikasi (sertifikat, ijazah, atau transkrip keahlian) yang dilampirkan oleh pengguna yang mendaftar sebagai tentor untuk keperluan verifikasi kompetensi mengajar.
            </p>
          </section>

          {/* Minor Safety Section */}
          <section style={{
            marginBottom: '2rem',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--rose-50)',
            border: '1.5px solid var(--rose-200)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--rose-800)', fontWeight: '800', fontSize: '1.15rem', marginBottom: '0.5rem' }}>
              <UserCheck size={20} />
              2. Perlindungan Khusus Murid di Bawah Umur (Anak / Minor)
            </div>
            <p style={{ color: 'var(--slate-800)', marginBottom: '0.75rem' }}>
              TemanTutor sangat memprioritaskan keselamatan murid usia sekolah (jenjang SD dan SMP):
            </p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--slate-800)' }}>
              <li><strong>Pendaftaran Wajib Didampingi:</strong> Akun untuk murid SD & SMP wajib mencantumkan nama lengkap serta kontak WhatsApp orang tua/wali kandung.</li>
              <li><strong>Keterbukaan Kontak Orang Tua:</strong> Saat tentor melamar tawaran murid minor, kontak orang tua/wali akan disediakan untuk mempermudah koordinasi pendampingan belajar.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
              3. Berbagi Kontak untuk Komunikasi Langsung
            </h2>
            <p>
              Sebagai platform penghubung, ketika seorang tentor menggunakan 1 Token untuk melamar tawaran murid, data kontak WhatsApp, email, profil pengajaran, dan dokumen sertifikat tentor akan ditampilkan kepada murid pembuat tawaran agar kedua pihak dapat saling berkomunikasi secara langsung.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
              4. Keamanan Penyimpanan Data & Sertifikat
            </h2>
            <p>
              Seluruh data profil, riwayat token, dan dokumen sertifikat pengguna disimpan secara aman di basis data terenkripsi dan tidak akan pernah diperjualbelikan kepada pihak ketiga.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
              5. Hak Akses & Pengelolaan Akun
            </h2>
            <p>
              Setiap pengguna berhak memperbarui informasi profil, memperbarui nomor WhatsApp, atau mengajukan penutupan akun kapan saja melalui halaman Profil atau tim bantuan kami.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
