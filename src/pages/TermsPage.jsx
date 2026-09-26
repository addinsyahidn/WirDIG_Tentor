import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ChevronRight, Coins, FileCheck, Users } from 'lucide-react';

export const TermsPage = () => {
  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: 'calc(100vh - 4.5rem)', padding: '3rem 0 5rem' }}>
      <div className="container-custom" style={{ maxWidth: '840px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--slate-500)', marginBottom: '1.25rem' }}>
          <Link to="/" style={{ color: 'var(--slate-500)' }}>Beranda</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--slate-800)', fontWeight: '600' }}>Syarat & Ketentuan</span>
        </div>

        <div className="card" style={{ padding: '2.5rem', lineHeight: '1.7', color: 'var(--slate-700)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
            Syarat & Ketentuan Layanan TemanTutor
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--slate-400)', marginBottom: '2rem' }}>
            Model Penghubung Berbasis Token • Terakhir diperbarui: 26 September 2026
          </p>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
              1. Definisi & Peran Platform
            </h2>
            <p>
              TemanTutor adalah platform penghubung (connector bridge) berbasis sistem token yang memfasilitasi pertemuan antara Murid yang membutuhkan bimbingan les dengan Tentor berkualifikasi. Platform ini murni berfungsi sebagai sarana pertukaran informasi lowongan mengajar dan kontak profesional, tanpa memotong komisi persentase sesi belajar.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
              2. Ketentuan Sistem Token & Pembelian QRIS
            </h2>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Posting Tawaran Murid:</strong> Setiap kali murid memposting kebutuhan les di Bursa Job, saldo token akan dipotong sebanyak <strong>1 Token</strong>.</li>
              <li><strong>Melamar Tawaran Tentor:</strong> Setiap kali tentor mengajukan lamaran pada tawaran murid, saldo token akan dipotong sebanyak <strong>1 Token</strong>.</li>
              <li><strong>Pembelian Token:</strong> Token dapat dibeli melalui pembayaran instan QRIS GoPay Merchant resmi TemanTutor. Token yang sudah dibeli bersifat digital dan tidak dapat diuangkan kembali (non-refundable).</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
              3. Transaksi & Pembayaran Biaya Sesi Les (0% Komisi)
            </h2>
            <p>
              TemanTutor <strong>tidak mengambil potongan komisi sepeser pun (0% fee)</strong> dari tarif les yang disepakati. Seluruh pembayaran honor les dilakukan secara langsung dan mandiri antara pihak murid dan tentor sesuai kesepakatan kedua belah pihak (misalnya via transfer bank, e-wallet, atau tunai saat tatap muka).
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
              4. Kewajiban Sertifikat & Kualifikasi Akademik Tentor
            </h2>
            <p>
              Seluruh pengguna yang mendaftar sebagai Tentor diwajibkan mengunggah lampiran sertifikat, ijazah perguruan tinggi, atau dokumen bukti kompetensi mengajar yang valid saat registrasi. Pihak tentor bertanggung jawab penuh atas keaslian dan kebenaran seluruh dokumen yang dilampirkan.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
              5. Perlindungan Murid di Bawah Umur (SD & SMP)
            </h2>
            <p>
              Untuk murid kategori minor (jenjang SD dan SMP), pendaftaran akun wajib menyertakan nama dan kontak WhatsApp orang tua/wali pendamping. Tentor yang mengambil pekerjaan les murid minor wajib menjaga etika profesi pengajar dan menghormati norma perlindungan anak.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
              6. Batas Tanggung Jawab Platform
            </h2>
            <p>
              TemanTutor tidak bertanggung jawab secara langsung atas ketidakhadiran, pembatalan jadwal pribadi di luar aplikasi, atau perselisihan nominal honor di luar sistem token platform. Pengguna disarankan untuk melakukan konfirmasi jadwal dan metode belajar secara jelas melalui WhatsApp sebelum memulai sesi pertama.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
