import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Coins,
  ShieldCheck,
  Star,
  ArrowRight,
  CheckCircle2,
  Zap,
  Users,
  MessageSquare,
  Sparkles,
  MapPin,
  Clock,
  Briefcase,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatRupiah } from '../utils/pricing';
import { SearchAutocomplete } from '../components/SearchAutocomplete';

export const LandingPage = () => {
  const { jobs, educationLevels, currentUserId, currentRole, setActiveTokenModal } = useApp();
  const navigate = useNavigate();

  const [searchSubject, setSearchSubject] = useState('');
  const [searchLevel, setSearchLevel] = useState('all');

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (searchSubject) params.set('subject', searchSubject);
    if (searchLevel && searchLevel !== 'all') params.set('level', searchLevel);
    navigate(`/job-board?${params.toString()}`);
  };

  const handleQuickCategory = (subject) => {
    navigate(`/job-board?subject=${encodeURIComponent(subject)}`);
  };

  const openJobs = jobs.filter((j) => j.status === 'open');

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section style={{
        backgroundColor: 'white',
        padding: '3.5rem 0 4rem',
        borderBottom: '1px solid var(--slate-200)',
      }}>
        <div className="container-custom" style={{ maxWidth: '840px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--primary-50)',
            border: '1px solid var(--primary-200)',
            color: 'var(--primary-700)',
            fontSize: '0.8rem',
            fontWeight: '700',
            marginBottom: '1.25rem',
          }}>
            <Coins size={15} color="var(--primary-600)" />
            <span>Platform Penghubung Tentor & Murid Berbasis Token • 0% Komisi</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.9rem, 4vw, 2.6rem)',
            fontWeight: '900',
            color: 'var(--slate-900)',
            lineHeight: '1.2',
            marginBottom: '1rem',
            letterSpacing: '-0.025em',
          }}>
            Hubungkan Murid & Tentor Terbaik, <br />
            <span style={{ color: 'var(--primary-600)' }}>Tanpa Potongan Komisi Sesi Les</span>
          </h1>

          <p style={{
            fontSize: '1rem',
            color: 'var(--slate-600)',
            lineHeight: '1.6',
            marginBottom: '2rem',
            maxWidth: '680px',
            margin: '0 auto 2rem',
          }}>
            TemanTutor adalah jembatan langsung antara murid dan pengajar privat. Murid memposting kebutuhan les menggunakan <strong>1 Token</strong>, Tentor mengambil job dengan <strong>1 Token</strong>. Terhubung langsung via WhatsApp tanpa perantara!
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} style={{
            backgroundColor: 'white',
            padding: '0.5rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--slate-300)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            alignItems: 'center',
            marginBottom: '1.25rem',
            textAlign: 'left',
          }}>
            <div style={{ flex: '1 1 260px' }}>
              <SearchAutocomplete
                placeholder="Cari kebutuhan mapel (Matematika, Fisika, UTBK, Coding...)"
                initialValue={searchSubject}
                onSelectSubject={(subj) => {
                  setSearchSubject(subj);
                  navigate(`/job-board?subject=${encodeURIComponent(subj)}`);
                }}
                variant="hero"
              />
            </div>

            <div style={{ flex: '0 1 170px', borderLeft: '1px solid var(--slate-200)', paddingLeft: '0.5rem' }}>
              <select
                value={searchLevel}
                onChange={(e) => setSearchLevel(e.target.value)}
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.825rem', color: 'var(--slate-700)', backgroundColor: 'transparent', cursor: 'pointer' }}
              >
                <option value="all">Semua Jenjang</option>
                {educationLevels.map((lvl) => (
                  <option key={lvl.id} value={lvl.id}>
                    {lvl.label}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 1.4rem' }}>
              <Search size={15} /> Cari di Bursa
            </button>
          </form>

          {/* Quick Subject Tags */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem', fontSize: '0.775rem', color: 'var(--slate-500)' }}>
            <span style={{ fontWeight: '600' }}>Kategori Populer:</span>
            {['Matematika', 'Fisika', 'Bahasa Inggris', 'UTBK / SNBT', 'Python & Coding'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleQuickCategory(tag)}
                style={{
                  border: '1px solid var(--slate-200)',
                  backgroundColor: 'var(--slate-50)',
                  color: 'var(--slate-700)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            <Link to="/job-board" className="btn btn-primary btn-lg">
              <Briefcase size={18} /> Buka Bursa Kebutuhan Tentor
            </Link>
            {!currentUserId && (
              <Link to="/register?role=tutor" className="btn btn-emerald btn-lg">
                <FileCheck size={18} /> Daftar Jadi Tentor
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* 2. THREE KEY VALUE PROPOSITIONS */}
      <section style={{ padding: '3rem 0', backgroundColor: 'var(--slate-50)', borderBottom: '1px solid var(--slate-200)' }}>
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--primary-100)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Coins size={20} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--slate-900)' }}>Sistem Token Transparan</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: '1.5' }}>
                Murid gunakan <strong>1 Token</strong> untuk pasang kebutuhan les. Tentor gunakan <strong>1 Token</strong> untuk melamar. Top up instan lewat QRIS.
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--emerald-100)', color: 'var(--emerald-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={20} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--slate-900)' }}>0% Potongan Komisi</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: '1.5' }}>
                TemanTutor tidak memotong honor mengajar tentor. 100% tarif les dibayarkan langsung antara murid dan tentor.
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--indigo-100)', color: 'var(--indigo-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={20} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--slate-900)' }}>Tentor Bersertifikat</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: '1.5' }}>
                Setiap tentor wajib melampirkan ijazah/sertifikat saat mendaftar. Murid dapat meninjau kualifikasi dan langsung terhubung via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BURSA KEBUTUHAN TERBARU PREVIEW */}
      <section style={{ padding: '3.5rem 0', backgroundColor: 'white' }}>
        <div className="container-custom">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary-600)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                <Sparkles size={14} /> Lowongan Mengajar Terbuka
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--slate-900)' }}>
                Bursa Kebutuhan Tentor Terbaru
              </h2>
              <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem' }}>
                Tawaran les aktif dari murid yang siap diambil oleh tentor berkualitas.
              </p>
            </div>
            <Link to="/job-board" className="btn btn-outline-primary btn-sm">
              Lihat Semua ({openJobs.length} Tawaran) <ArrowRight size={14} />
            </Link>
          </div>

          {openJobs.length === 0 ? (
            <div className="card" style={{ padding: '3rem 2rem', textAlign: 'center', color: 'var(--slate-500)', backgroundColor: 'var(--slate-50)', border: '1px dashed var(--slate-300)' }}>
              <Briefcase size={36} color="var(--slate-400)" style={{ margin: '0 auto 0.5rem' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--slate-800)', marginBottom: '0.35rem' }}>
                Belum Ada Tawaran Les Aktif di Bursa
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', maxWidth: '480px', margin: '0 auto 1.25rem' }}>
                Jadilah murid pertama yang memposting kebutuhan bimbingan belajar, atau daftar sebagai tentor untuk bersiap mengambil job les.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link to="/student/dashboard" className="btn btn-primary btn-sm">
                  Posting Kebutuhan Les (1 Token)
                </Link>
                <Link to="/register?role=tutor" className="btn btn-emerald btn-sm">
                  Daftar Jadi Tentor
                </Link>
              </div>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.25rem',
            }}>
              {openJobs.slice(0, 3).map((job) => {
                const applicantCount = job.applicants ? job.applicants.length : 0;
                const price = job.feePerSession || job.studentInputPrice || job.budget || 100000;
                return (
                  <div key={job.id} className="card card-hover" style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                        {job.subject}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={12} /> {job.preferredSchedule || job.schedule || 'Fleksibel'}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--slate-900)', marginBottom: '0.4rem', lineHeight: '1.3' }}>
                      {job.title}
                    </h3>

                    <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', lineHeight: '1.4', marginBottom: '1rem', flex: 1 }}>
                      {job.description || job.notes || 'Dicari pengajar les privat berpengalaman dan telaten.'}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.775rem', color: 'var(--slate-500)', marginBottom: '1rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={13} color="var(--slate-400)" /> {job.location || 'Online'}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Users size={13} color="var(--slate-400)" /> {applicantCount} pelamar
                      </span>
                    </div>

                    <div style={{
                      paddingTop: '0.85rem',
                      borderTop: '1px solid var(--slate-100)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      <div>
                        <div style={{ fontSize: '0.675rem', color: 'var(--slate-400)' }}>Anggaran Les:</div>
                        <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--emerald-700)' }}>
                          {formatRupiah(price)}
                        </div>
                      </div>

                      <Link to="/job-board" className="btn btn-primary btn-sm">
                        Lamar (1 Token)
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 4. 4-STEP HOW IT WORKS */}
      <section style={{ padding: '3.5rem 0', backgroundColor: 'var(--slate-50)', borderTop: '1px solid var(--slate-200)' }}>
        <div className="container-custom" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '0.4rem' }}>
              Alur Kerja Simpel Berbasis Token
            </h2>
            <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem' }}>
              Hanya 4 langkah mudah menghubungkan kebutuhan les tanpa ribet administrasi.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
          }}>
            <div className="card" style={{ padding: '1.35rem' }}>
              <div style={{ fontWeight: '900', fontSize: '1.25rem', color: 'var(--primary-600)', marginBottom: '0.35rem' }}>01.</div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--slate-900)' }}>Beli Token QRIS</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', lineHeight: '1.4' }}>
                Top up token saldo instan menggunakan QRIS GoPay Merchant mulai dari Rp 10.000.
              </p>
            </div>

            <div className="card" style={{ padding: '1.35rem' }}>
              <div style={{ fontWeight: '900', fontSize: '1.25rem', color: 'var(--emerald-600)', marginBottom: '0.35rem' }}>02.</div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--slate-900)' }}>Murid Pasang Kebutuhan</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', lineHeight: '1.4' }}>
                Murid memposting tawaran les dengan 1 Token (mata pelajaran, jadwal, dan budget yang diinginkan).
              </p>
            </div>

            <div className="card" style={{ padding: '1.35rem' }}>
              <div style={{ fontWeight: '900', fontSize: '1.25rem', color: 'var(--amber-600)', marginBottom: '0.35rem' }}>03.</div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--slate-900)' }}>Tentor Melamar Job</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', lineHeight: '1.4' }}>
                Tentor bersertifikat memilih tawaran yang cocok di bursa dan mengajukan lamaran dengan 1 Token.
              </p>
            </div>

            <div className="card" style={{ padding: '1.35rem' }}>
              <div style={{ fontWeight: '900', fontSize: '1.25rem', color: 'var(--emerald-600)', marginBottom: '0.35rem' }}>04.</div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--slate-900)' }}>Terhubung Langsung</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', lineHeight: '1.4' }}>
                Kontak WhatsApp dan pesan instan terbuka. Jadwal dan honor ditransaksikan langsung 100% tanpa potongan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DUAL CTA */}
      <section style={{ padding: '3.5rem 0', backgroundColor: 'white', borderTop: '1px solid var(--slate-200)' }}>
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--slate-900)', color: 'white', border: 'none' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem' }}>
                Butuh Bimbingan Les Privat?
              </h3>
              <p style={{ color: 'var(--slate-400)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                Pasang kebutuhan les privat Anda sekarang dan dapatkan lamaran langsung dari tentor bersertifikat pilihan.
              </p>
              <Link to="/student/dashboard" className="btn btn-primary">
                Posting Kebutuhan Les (1 Token)
              </Link>
            </div>

            <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--slate-900)', color: 'white', border: 'none' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem' }}>
                Tertarik Mengajar Sebagai Tentor?
              </h3>
              <p style={{ color: 'var(--slate-400)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                Ambil tawaran mengajar langsung dari murid di Bursa Job tanpa potongan komisi sepeser pun!
              </p>
              <Link to="/job-board" className="btn btn-emerald">
                Buka Bursa Job & Lamar (1 Token)
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
