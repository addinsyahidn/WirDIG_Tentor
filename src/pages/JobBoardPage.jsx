import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Search,
  Clock,
  ChevronRight,
  Send,
  X,
  BookOpen,
  User,
  MessageSquare,
  Coins,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatRupiah } from '../utils/pricing';
import { timeAgo } from '../utils/dateFormatter';

export const JobBoardPage = () => {
  const { jobs, applyToJob, educationLevels, currentUser, showToast, setActiveTokenModal } = useApp();

  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');

  // Modal "Tawarkan Diri"
  const [proposeJob, setProposeJob] = useState(null);
  const [proposalMessage, setProposalMessage] = useState('');

  const filteredJobs = jobs.filter((job) => {
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      const matchesTitle = (job.title || '').toLowerCase().includes(q);
      const matchesDesc = (job.description || '').toLowerCase().includes(q);
      const matchesSub = (job.subject || '').toLowerCase().includes(q);
      if (!matchesTitle && !matchesDesc && !matchesSub) return false;
    }

    if (selectedLevel !== 'all' && job.level !== selectedLevel) return false;

    return true;
  });

  const handleOpenProposeModal = (job) => {
    setProposeJob(job);
    setProposalMessage(
      `Halo ${job.studentName}, saya tertarik untuk membimbing Anda di mapel ${job.subject}. Saya memiliki metode belajar yang sesuai dengan kebutuhan Anda.`
    );
  };

  const handleConfirmPropose = (e) => {
    e.preventDefault();
    if (!proposeJob) return;

    applyToJob(proposeJob.id, proposalMessage);
    setProposeJob(null);
    setProposalMessage('');
  };

  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: 'calc(100vh - 3.75rem)', padding: '2rem 0 3.5rem' }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--slate-500)', marginBottom: '0.2rem' }}>
              <Link to="/" style={{ color: 'var(--slate-500)', textDecoration: 'none' }}>Beranda</Link>
              <ChevronRight size={13} />
              <span style={{ color: 'var(--slate-800)', fontWeight: '600' }}>Bursa Kebutuhan Murid</span>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--slate-900)', margin: '0.15rem 0' }}>
              Bursa Kebutuhan Tentor
            </h1>
            <p style={{ fontSize: '0.825rem', color: 'var(--slate-500)', margin: 0 }}>
              Daftar permintaan les yang di-up langsung oleh murid. Ambil tawaran mengajar menggunakan <strong>1 Token Kredit</strong>.
            </p>
          </div>

          <div style={{
            padding: '0.5rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#fef3c7',
            border: '1px solid #fde68a',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.75rem',
            color: '#92400e',
          }}>
            <Coins size={16} color="#d97706" />
            <span>Saldo Anda: <strong>{currentUser?.tokens ?? 0} Token</strong></span>
            <button
              onClick={() => setActiveTokenModal(true)}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem', backgroundColor: '#ffffff', color: '#b45309' }}
            >
              + Top Up
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="card" style={{ padding: '0.75rem 1rem', marginBottom: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 200px', position: 'relative' }}>
            <input
              type="text"
              placeholder="Cari mapel (cth: Matematika, Fisika, Bahasa Inggris)..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '1.85rem', paddingRight: '0.5rem' }}
            />
            <Search size={14} color="var(--slate-400)" style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          <div style={{ flex: '0 1 170px' }}>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="form-select"
            >
              <option value="all">Semua Jenjang</option>
              {educationLevels.map((lvl) => (
                <option key={lvl.id} value={lvl.id}>
                  {lvl.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginLeft: 'auto' }}>
            <strong>{filteredJobs.length}</strong> tawaran murid aktif
          </div>
        </div>

        {/* Job Requests List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredJobs.length === 0 ? (
            <div className="card" style={{ padding: '3.5rem 1.5rem', textAlign: 'center', color: 'var(--slate-500)' }}>
              <Briefcase size={36} color="var(--slate-400)" style={{ margin: '0 auto 0.5rem' }} />
              <p style={{ fontWeight: '700', fontSize: '0.95rem' }}>Belum ada tawaran les yang sesuai kriteria ini.</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--slate-400)', marginTop: '0.25rem' }}>
                Silakan coba ganti filter jenjang atau kata kunci pencarian mapel.
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const sessionMinutes = job.durationMinutes || 60;
              const feePerSession = job.feePerSession || job.studentInputPrice || 100000;
              const hasApplied = (job.applicants || []).some((a) => a.tutorId === currentUser?.id);

              return (
                <div
                  key={job.id}
                  className="card card-hover"
                  style={{
                    padding: '1.4rem',
                    borderLeft: hasApplied ? '4px solid var(--emerald-600)' : '4px solid var(--primary-600)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem' }}>
                    {/* Left: Detail Permintaan Murid */}
                    <div style={{ flex: '1 1 340px' }}>
                      {/* Top Badges */}
                      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '0.5rem' }}>
                        <span className="badge badge-primary" style={{ fontWeight: '700' }}>
                          <BookOpen size={12} style={{ display: 'inline', marginRight: '3px' }} />
                          {job.subject}
                        </span>
                        <span className="badge badge-slate" style={{ textTransform: 'uppercase' }}>
                          {job.level}
                        </span>
                        <span className="badge badge-slate">
                          <Clock size={11} style={{ display: 'inline', marginRight: '3px' }} />
                          {sessionMinutes} Menit / Sesi
                        </span>
                        <span style={{ fontSize: '0.725rem', color: 'var(--slate-400)' }}>
                          • Dipos {timeAgo(job.createdAt)}
                        </span>
                      </div>

                      {/* Judul & Nama Siswa */}
                      <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--slate-900)', margin: '0 0 0.35rem' }}>
                        {job.title}
                      </h3>

                      <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <User size={13} color="var(--primary-600)" />
                        <span>Oleh Murid: <strong>{job.studentName}</strong></span>
                        {job.isMinor && (
                          <span className="badge badge-rose" style={{ fontSize: '0.625rem', padding: '0.1rem 0.35rem' }}>
                            Minor (Didampingi Orang Tua)
                          </span>
                        )}
                      </div>

                      {/* Deskripsi Kebutuhan Murid */}
                      <p style={{
                        fontSize: '0.85rem',
                        color: 'var(--slate-700)',
                        lineHeight: '1.5',
                        backgroundColor: 'var(--slate-50)',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: '1px solid var(--slate-100)',
                        margin: '0 0 0.75rem',
                      }}>
                        {job.description}
                      </p>

                      {/* Detail Tambahan: Jadwal & Media */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Calendar size={13} color="var(--slate-400)" />
                          Jadwal: <strong>{job.preferredSchedule || 'Fleksibel'}</strong>
                        </span>
                        <span>• Media: <strong>{(job.preferredPlatforms || ['Google Meet']).join(', ')}</strong></span>
                      </div>
                    </div>

                    {/* Right: Fee Box & Tombol Menawarkan Diri */}
                    <div style={{
                      flex: '0 1 240px',
                      backgroundColor: 'var(--primary-50)',
                      padding: '1.1rem',
                      borderRadius: '12px',
                      border: '1.5px solid var(--primary-200)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '0.85rem',
                    }}>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--primary-800)', fontWeight: '600' }}>
                          Fee yang Ditawarkan Murid:
                        </div>
                        <div style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--primary-800)', margin: '0.15rem 0' }}>
                          {formatRupiah(feePerSession)}
                          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--slate-500)' }}> / sesi</span>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--slate-500)' }}>
                          Durasi: {sessionMinutes} Menit
                        </div>
                      </div>

                      {/* Action: Tawarkan Diri */}
                      <div>
                        {hasApplied ? (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.35rem',
                            padding: '0.55rem',
                            backgroundColor: '#ffffff',
                            borderRadius: '8px',
                            border: '1px solid var(--emerald-300)',
                            color: 'var(--emerald-800)',
                            fontWeight: '700',
                            fontSize: '0.785rem',
                            textAlign: 'center',
                          }}>
                            <CheckCircle2 size={15} color="var(--emerald-600)" />
                            <span>Lamaran Terkirim</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleOpenProposeModal(job)}
                            className="btn btn-emerald"
                            style={{ width: '100%', padding: '0.6rem', fontSize: '0.825rem', fontWeight: '700' }}
                          >
                            <Send size={14} /> Tawarkan Diri (-1 Token)
                          </button>
                        )}
                        <div style={{ fontSize: '0.675rem', color: 'var(--slate-400)', textAlign: 'center', marginTop: '0.35rem' }}>
                          {job.proposalsCount || 0} tentor telah melamar
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal: Menawarkan Diri */}
      {proposeJob && (
        <div className="modal-backdrop" onClick={() => setProposeJob(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '500px', padding: '1.75rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--emerald-50)',
                  color: 'var(--emerald-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Send size={18} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '800', color: 'var(--slate-900)' }}>
                    Tawarkan Diri Mengajar
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                    Kirim pesan perkenalan & ketersediaan Anda langsung ke murid
                  </p>
                </div>
              </div>
              <button
                onClick={() => setProposeJob(null)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--slate-400)' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleConfirmPropose}>
              {/* Ringkasan Job */}
              <div style={{
                backgroundColor: 'var(--slate-50)',
                padding: '0.85rem',
                borderRadius: '8px',
                border: '1px solid var(--slate-200)',
                marginBottom: '1rem',
                fontSize: '0.8rem',
              }}>
                <div style={{ fontWeight: '700', color: 'var(--slate-800)', marginBottom: '0.2rem' }}>
                  {proposeJob.title}
                </div>
                <div style={{ color: 'var(--slate-500)', display: 'flex', gap: '0.75rem' }}>
                  <span>Mapel: <strong>{proposeJob.subject}</strong></span>
                  <span>Durasi: <strong>{proposeJob.durationMinutes || 60} Menit</strong></span>
                  <span style={{ color: 'var(--primary-700)' }}>
                    Fee: <strong>{formatRupiah(proposeJob.feePerSession || proposeJob.studentInputPrice)}/sesi</strong>
                  </span>
                </div>
              </div>

              {/* Input Pesan Pengantar */}
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" style={{ fontWeight: '700' }}>
                  <MessageSquare size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  Pesan Pengantar untuk Murid:
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ceritakan pengalaman Anda di materi ini, ketersediaan jam mengajar, atau bagaimana Anda bisa membantu murid memahami materi..."
                  value={proposalMessage}
                  onChange={(e) => setProposalMessage(e.target.value)}
                  className="form-textarea"
                />
              </div>

              {/* Token Fee Notice */}
              <div style={{
                backgroundColor: (currentUser?.tokens ?? 0) < 1 ? '#fef2f2' : '#f0fdf4',
                border: (currentUser?.tokens ?? 0) < 1 ? '1px solid #fecaca' : '1px solid #bbf7d0',
                borderRadius: '10px',
                padding: '0.65rem 0.85rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.4rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Coins size={16} color={(currentUser?.tokens ?? 0) < 1 ? '#ef4444' : '#16a34a'} />
                  <div>
                    <span style={{ fontSize: '0.785rem', fontWeight: '800', color: (currentUser?.tokens ?? 0) < 1 ? '#991b1b' : '#166534' }}>
                      Biaya Melamar: 1 Token Kredit
                    </span>
                    <span style={{ fontSize: '0.725rem', color: (currentUser?.tokens ?? 0) < 1 ? '#b91c1c' : '#15803d', marginLeft: '0.35rem' }}>
                      (Saldo Anda: <strong>{currentUser?.tokens ?? 0} Token</strong>)
                    </span>
                  </div>
                </div>

                {(currentUser?.tokens ?? 0) < 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setProposeJob(null);
                      setActiveTokenModal(true);
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.725rem', padding: '0.2rem 0.5rem', color: '#b91c1c', borderColor: '#fca5a5', backgroundColor: '#ffffff' }}
                  >
                    + Beli Token QRIS (Rp 3.000)
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setProposeJob(null)}
                  className="btn btn-secondary"
                >
                  Batal
                </button>

                {(currentUser?.tokens ?? 0) < 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setProposeJob(null);
                      setActiveTokenModal(true);
                    }}
                    className="btn btn-emerald"
                    style={{ padding: '0.6rem 1.25rem' }}
                  >
                    <Coins size={14} /> Beli Token QRIS Dulu
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-emerald"
                    style={{ padding: '0.6rem 1.25rem' }}
                  >
                    <Send size={14} /> Kirim Lamaran (-1 Token)
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
