import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  PlusCircle,
  Briefcase,
  UserCheck,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  BookOpen,
  User,
  Coins,
  CheckCircle2,
  Clock,
  Star,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CreateJobModal } from '../components/CreateJobModal';
import { formatRupiah } from '../utils/pricing';
import { timeAgo } from '../utils/dateFormatter';

export const StudentDashboard = () => {
  const {
    currentUser,
    jobs,
    reviews,
    setActiveTokenModal,
    getOrCreateChatThread,
  } = useApp();

  const navigate = useNavigate();

  const [createJobModalOpen, setCreateJobModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('my_jobs');

  const myJobs = jobs.filter((j) => j.studentId === currentUser.id);
  const totalApplicants = myJobs.reduce((sum, j) => sum + (j.applicants?.length || 0), 0);

  const handleOpenChat = (tutorId) => {
    getOrCreateChatThread(tutorId);
    navigate('/chat');
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
          gap: '0.75rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <h1 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--slate-900)' }}>
                Dashboard Murid: {currentUser.name}
              </h1>
              {currentUser.userType === 'minor' && (
                <span className="badge badge-rose" style={{ fontSize: '0.65rem' }}>
                  <UserCheck size={11} /> Minor SD/SMP
                </span>
              )}
            </div>
            <p style={{ color: 'var(--slate-500)', fontSize: '0.825rem' }}>
              Kelola tawaran les yang Anda publikasikan dan hubungi tentor yang telah melamar.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/job-board" className="btn btn-secondary btn-sm">
              <Briefcase size={14} /> Lihat Bursa Job
            </Link>
            <button
              onClick={() => setCreateJobModalOpen(true)}
              className="btn btn-primary btn-sm"
            >
              <PlusCircle size={14} /> Up Kebutuhan Tentor (-1 Token)
            </button>
          </div>
        </div>

        {/* Compact Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.85rem',
          marginBottom: '1.5rem'
        }}>
          {/* Token Balance Card */}
          <div className="card" style={{ padding: '1rem', borderLeft: '3px solid #f59e0b', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: '700' }}>Saldo Token Kredit</div>
                <Coins size={14} color="#d97706" />
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#b45309', marginTop: '0.15rem' }}>
                {currentUser?.tokens ?? 0} Token
              </div>
            </div>
            <button
              onClick={() => setActiveTokenModal(true)}
              className="btn btn-secondary btn-sm"
              style={{
                marginTop: '0.45rem',
                fontSize: '0.7rem',
                padding: '0.25rem 0.5rem',
                backgroundColor: '#fef3c7',
                color: '#92400e',
                borderColor: '#fde68a',
                fontWeight: '700',
              }}
            >
              + Beli Token QRIS (Rp 3.000)
            </button>
          </div>

          <div className="card" style={{ padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: '600' }}>Tawaran Les Dipublikasikan</div>
            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--slate-900)', marginTop: '0.15rem' }}>
              {myJobs.length} Tawaran
            </div>
          </div>

          <div className="card" style={{ padding: '1rem', borderLeft: '3px solid var(--emerald-600)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: '600' }}>Total Tentor yang Melamar</div>
            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--emerald-600)', marginTop: '0.15rem' }}>
              {totalApplicants} Pelamar
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--slate-200)', marginBottom: '1.25rem' }}>
          <button
            onClick={() => setActiveTab('my_jobs')}
            style={{
              padding: '0.6rem 1rem',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === 'my_jobs' ? '2.5px solid var(--primary-600)' : '2.5px solid transparent',
              color: activeTab === 'my_jobs' ? 'var(--primary-700)' : 'var(--slate-500)',
              fontWeight: activeTab === 'my_jobs' ? '700' : '500',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <span>Tawaran Les Saya</span>
            <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
              {myJobs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            style={{
              padding: '0.6rem 1rem',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === 'reviews' ? '2.5px solid var(--primary-600)' : '2.5px solid transparent',
              color: activeTab === 'reviews' ? 'var(--primary-700)' : 'var(--slate-500)',
              fontWeight: activeTab === 'reviews' ? '700' : '500',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            Ulasan ({reviews.filter((r) => r.studentId === currentUser.id).length})
          </button>
        </div>

        {/* Tab 1: My Posted Jobs */}
        {activeTab === 'my_jobs' && (
          <div>
            {myJobs.length === 0 ? (
              <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--slate-500)' }}>
                <Briefcase size={36} color="var(--slate-400)" style={{ margin: '0 auto 0.5rem' }} />
                <p style={{ fontWeight: '700', marginBottom: '0.5rem' }}>Anda belum mempublikasikan tawaran les.</p>
                <p style={{ fontSize: '0.825rem', color: 'var(--slate-400)', marginBottom: '1.25rem' }}>
                  Pasang kebutuhan bimbingan belajar Anda agar tentor berkualitas dapat segera melamar.
                </p>
                <button onClick={() => setCreateJobModalOpen(true)} className="btn btn-primary btn-sm">
                  <PlusCircle size={14} /> Up Kebutuhan Tentor (-1 Token)
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {myJobs.map((job) => {
                  const duration = job.durationMinutes || 60;
                  const feePerSession = job.feePerSession || job.studentInputPrice || 100000;
                  const applicants = job.applicants || [];

                  return (
                    <div key={job.id} className="card" style={{ padding: '1.35rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                        <div style={{ flex: 1, minWidth: '260px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                            <span className="badge badge-emerald">Aktif di Bursa</span>
                            <span className="badge badge-primary">{job.subject}</span>
                            <span className="badge badge-slate">{job.level?.toUpperCase()}</span>
                            <span className="badge badge-slate">{duration} Menit/Sesi</span>
                            <span style={{ fontSize: '0.725rem', color: 'var(--slate-400)' }}>• Dipos {timeAgo(job.createdAt)}</span>
                          </div>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--slate-900)', margin: '0.25rem 0' }}>
                            {job.title}
                          </h3>
                          <p style={{ fontSize: '0.825rem', color: 'var(--slate-600)', margin: '0.25rem 0 0.5rem' }}>
                            {job.description}
                          </p>
                          <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                            Jadwal: <strong>{job.preferredSchedule}</strong> • Media: <strong>{(job.preferredPlatforms || ['Google Meet']).join(', ')}</strong>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right', minWidth: '160px' }}>
                          <div style={{ fontSize: '0.7rem', color: 'var(--slate-400)' }}>Fee yang Anda Tawarkan:</div>
                          <div style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--primary-700)' }}>
                            {formatRupiah(feePerSession)}
                            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--slate-500)' }}> / sesi</span>
                          </div>
                        </div>
                      </div>

                      {/* Daftar Pelamar Tentor */}
                      {applicants.length > 0 ? (
                        <div style={{
                          marginTop: '1.25rem',
                          paddingTop: '1rem',
                          borderTop: '1.5px dashed var(--emerald-300)',
                          backgroundColor: '#f0fdf4',
                          padding: '1.25rem',
                          borderRadius: '12px',
                          border: '1px solid #bbf7d0',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#166534', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <span>🎯 {applicants.length} Tentor Mengajukan Diri:</span>
                            </div>
                            <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                              Pelamar Aktif
                            </span>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            {applicants.map((a, idx) => (
                              <div
                                key={a.id || idx}
                                style={{
                                  backgroundColor: '#ffffff',
                                  padding: '1rem 1.15rem',
                                  borderRadius: '10px',
                                  border: '1px solid #dcfce7',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.65rem' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <img
                                      src={a.tutorAvatar}
                                      alt={a.tutorName}
                                      style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #10b981' }}
                                    />
                                    <div>
                                      <div style={{ fontWeight: '800', fontSize: '0.925rem', color: 'var(--slate-900)' }}>
                                        {a.tutorName}
                                      </div>
                                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-600)', marginTop: '0.1rem' }}>
                                        🎓 {a.tutorEducation || a.tutorHeadline || 'Tentor Berpengalaman'}
                                      </div>
                                      {a.tutorCertificate && (
                                        <div style={{ fontSize: '0.7rem', color: '#047857', marginTop: '0.1rem', fontWeight: '600' }}>
                                          📜 {a.tutorCertificate}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Kontak & WhatsApp */}
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                                    {a.tutorPhone && a.tutorPhone !== '-' && (
                                      <a
                                        href={`https://wa.me/${a.tutorPhone.replace(/[^0-9]/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-secondary btn-sm"
                                        style={{ fontSize: '0.725rem', padding: '0.3rem 0.6rem', color: '#16a34a', borderColor: '#bbf7d0', textDecoration: 'none' }}
                                      >
                                        <Phone size={12} /> WA: {a.tutorPhone}
                                      </a>
                                    )}
                                    {a.tutorEmail && (
                                      <span style={{ fontSize: '0.725rem', color: 'var(--slate-500)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <Mail size={12} /> {a.tutorEmail}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Pesan Penawaran */}
                                <div style={{
                                  backgroundColor: '#f8fafc',
                                  borderLeft: '3px solid #10b981',
                                  padding: '0.65rem 0.85rem',
                                  borderRadius: '0 8px 8px 0',
                                  fontSize: '0.8rem',
                                  color: 'var(--slate-700)',
                                  marginBottom: '0.65rem',
                                }}>
                                  <div style={{ fontSize: '0.675rem', fontWeight: '700', color: '#059669', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                                    Pesan Penawaran Mengajar:
                                  </div>
                                  <div>"{a.proposalText}"</div>
                                </div>

                                {/* Action Buttons */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.4rem', borderTop: '1px solid #f1f5f9' }}>
                                  <span style={{ fontSize: '0.7rem', color: 'var(--slate-400)' }}>
                                    Melamar: {timeAgo(a.appliedAt)}
                                  </span>

                                  <button
                                    onClick={() => handleOpenChat(a.tutorId)}
                                    className="btn btn-primary btn-sm"
                                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                                  >
                                    <MessageSquare size={13} /> Chat Tentor Ini
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div style={{
                          marginTop: '0.85rem',
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          backgroundColor: '#f8fafc',
                          border: '1px dashed #cbd5e1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '0.775rem',
                          color: 'var(--slate-500)',
                        }}>
                          <span>⏳ Belum ada tentor yang menawarkan diri. Tawaran Anda sedang tayang di Bursa Job.</span>
                          <span className="badge badge-slate" style={{ fontSize: '0.65rem' }}>0 Pelamar</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Reviews */}
        {activeTab === 'reviews' && (
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '1rem' }}>Ulasan yang Anda Berikan</h3>
            {reviews.filter((r) => r.studentId === currentUser.id).length === 0 ? (
              <p style={{ fontSize: '0.825rem', color: 'var(--slate-400)' }}>Belum ada ulasan yang ditulis.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {reviews
                  .filter((r) => r.studentId === currentUser.id)
                  .map((rev) => (
                    <div key={rev.id} style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>Mapel: {rev.subject}</span>
                        <span style={{ color: '#d97706', fontWeight: '800', fontSize: '0.8rem' }}>⭐ {rev.rating}/5</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', margin: 0 }}>"{rev.comment}"</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>

      <CreateJobModal
        isOpen={createJobModalOpen}
        onClose={() => setCreateJobModalOpen(false)}
      />
    </div>
  );
};
