import React from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Video,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Zap,
  Users,
  QrCode,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HowItWorksPage = () => {
  const { setActiveTokenModal } = useApp();

  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: 'calc(100vh - 4.5rem)', padding: '3rem 0 5rem' }}>
      <div className="container-custom" style={{ maxWidth: '960px' }}>
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>Panduan Platform</span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '1rem' }}>
            Cara Kerja Sistem Token & Jembatan Langsung
          </h1>
          <p style={{ color: 'var(--slate-600)', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '720px', margin: '0 auto' }}>
            TemanTutor bertindak sebagai penghubung murni antara Murid dan Tentor dengan sistem token yang adil, efisien, dan <strong>0% potongan komisi sesi</strong>.
          </p>
        </div>

        {/* Token Mechanism Explainer Card */}
        <div className="card" style={{ padding: '2.5rem', marginBottom: '3rem', borderLeft: '5px solid var(--primary-600)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{
              width: '2.75rem',
              height: '2.75rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary-50)',
              color: 'var(--primary-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Coins size={26} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--slate-900)' }}>
                Bagaimana Sistem Token Bekerja?
              </h2>
              <div style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>
                Sistem pay-per-connection yang praktis tanpa langganan mengikat.
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--slate-700)', lineHeight: '1.6', marginBottom: '1.75rem' }}>
            Website ini hanya sebatas <strong>penghubung profesional</strong> antara murid dan tentor. Anda tidak perlu membayar komisi persentase yang mahal dari setiap pertemuan les. Cukup gunakan token untuk memposting atau mengambil job:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            marginBottom: '1.75rem'
          }}>
            <div style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--primary-50)',
              border: '1px solid var(--primary-200)',
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--primary-700)', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                👦 UNTUK MURID
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-900)', margin: '0.25rem 0' }}>
                1 Token / Job Post
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--slate-600)', lineHeight: '1.4' }}>
                Gunakan 1 Token untuk memposting kebutuhan les di Bursa Job. Tentor bersertifikat akan melamar langsung ke tawaran Anda.
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--emerald-50)',
              border: '1px solid var(--emerald-200)',
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--emerald-700)', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                👨‍🏫 UNTUK TENTOR
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--emerald-900)', margin: '0.25rem 0' }}>
                1 Token / Lamaran Job
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--slate-600)', lineHeight: '1.4' }}>
                Gunakan 1 Token untuk mengambil/melamar tawaran les di bursa. Kontak WhatsApp murid langsung terbuka untuk Anda.
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--amber-50)',
              border: '1px solid var(--amber-200)',
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--amber-800)', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                💸 0% KOMISI SESI
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--amber-900)', margin: '0.25rem 0' }}>
                100% Honor Milik Anda
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--slate-600)', lineHeight: '1.4' }}>
                Tidak ada potongan admin 15% atau escrow berbelit-belit. Kesepakatan biaya les dibayar langsung antara murid dan tentor.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => setActiveTokenModal(true)}
              className="btn btn-primary"
            >
              <QrCode size={16} /> Beli / Top Up Token QRIS GoPay Merchant
            </button>
          </div>
        </div>

        {/* 3 Main Advantages */}
        <div style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '1.5rem', textAlign: 'center' }}>
            Keunggulan Model Penghubung Berbasis Token
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <FileCheck size={28} color="var(--emerald-600)" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--slate-900)' }}>
                Wajib Lampirkan Sertifikat
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: '1.5' }}>
                Setiap tentor wajib mengunggah sertifikat/ijazah pendukung saat pendaftaran sehingga kualifikasi akademik transparan bagi murid.
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <Zap size={28} color="var(--primary-600)" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--slate-900)' }}>
                Kontak Langsung via WhatsApp
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: '1.5' }}>
                Setelah tentor melamar job, tombol WhatsApp langsung tersedia. Anda bisa langsung berdiskusi materi dan jadwal tanpa sensor.
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <ShieldCheck size={28} color="var(--indigo-600)" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--slate-900)' }}>
                Bebas Atur Jadwal & Tarif
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: '1.5' }}>
                Murid bebas memasukkan budget yang disanggupi, dan tentor bebas memilih tawaran yang sesuai tarif target mereka.
              </p>
            </div>
          </div>
        </div>

        {/* Platforms Information */}
        <div className="card" style={{ padding: '2.5rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
            Fleksibilitas Media Belajar Mengajar
          </h2>
          <p style={{ fontSize: '0.925rem', color: 'var(--slate-600)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Sesi les disepakati dan berlangsung pada media belajar pilihan terbaik Anda:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)', backgroundColor: 'var(--slate-50)' }}>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--slate-900)', marginBottom: '0.25rem' }}>
                🎥 Google Meet
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                Praktis tanpa instal aplikasi, link terhubung langsung.
              </div>
            </div>

            <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)', backgroundColor: 'var(--slate-50)' }}>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--slate-900)', marginBottom: '0.25rem' }}>
                💻 Zoom Meeting
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                Fitur whiteboard canggih dan breakout room interaktif.
              </div>
            </div>

            <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)', backgroundColor: 'var(--slate-50)' }}>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--slate-900)', marginBottom: '0.25rem' }}>
                🎮 Discord Server
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                Sangat cocok untuk screen-share coding & diskusi non-formal.
              </div>
            </div>

            <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)', backgroundColor: 'var(--slate-50)' }}>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--slate-900)', marginBottom: '0.25rem' }}>
                📍 Tatap Muka Langsung
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                Bertemu di rumah murid, perpustakaan, atau cafe terdekat.
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/job-board" className="btn btn-primary btn-lg">
            Buka Bursa Kebutuhan Tentor <ArrowRight size={18} />
          </Link>
          <button
            onClick={() => setActiveTokenModal(true)}
            className="btn btn-emerald btn-lg"
          >
            <Coins size={18} /> Beli Token QRIS
          </button>
        </div>
      </div>
    </div>
  );
};
