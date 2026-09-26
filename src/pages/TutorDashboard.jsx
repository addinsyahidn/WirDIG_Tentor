import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Coins,
  Briefcase,
  Star,
  MessageSquare,
  Sparkles,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatRupiah } from '../utils/pricing';
import { timeAgo } from '../utils/dateFormatter';

export const TutorDashboard = () => {
  const {
    currentUser,
    jobs,
    reviews,
    getOrCreateChatThread,
    setActiveTokenModal,
  } = useApp();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('applied_jobs');

  const profile = currentUser.tutorProfile || {
    rating: 5.0,
    reviewCount: 0,
    education: 'Sarjana Pendidikan',
    certificate: 'Sertifikat Terlampir',
  };

  // Find all jobs where this tutor has submitted an application
  const myAppliedJobs = jobs.filter((j) =>
    (j.applicants || []).some((a) => a.tutorId === currentUser.id)
  );

  const handleOpenChat = (studentId) => {
    getOrCreateChatThread(studentId);
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
                Dashboard Tentor: {currentUser.name}
              </h1>
            </div>
            <p style={{ color: 'var(--slate-500)', fontSize: '0.825rem' }}>
              Pendidikan: <strong>{profile.education}</strong> • Kualifikasi: <strong>{profile.certificate || 'Sertifikat Terlampir'}</strong>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/job-board" className="btn btn-primary btn-sm">
              <Briefcase size={14} /> Jelajahi Bursa Job
            </Link>
          </div>
        </div>

        {/* Compact Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.85rem',
          marginBottom: '1.5rem'
        }}>
          {/* Saldo Token */}
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
              + Top Up Token QRIS (Rp 3.000)
            </button>
          </div>

          <div className="card" style={{ padding: '1rem', borderLeft: '3px solid var(--emerald-600)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: '600' }}>Lamaran Mengajar Terkirim</div>
            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--emerald-600)', marginTop: '0.15rem' }}>
              {myAppliedJobs.length} Tawaran
            </div>
          </div>

          <div className="card" style={{ padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: '600' }}>Reputasi & Rating</div>
            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--slate-900)', marginTop: '0.15rem' }}>
              ⭐ {profile.rating || 5.0} <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)', fontWeight: '400' }}>({profile.reviewCount || 0} ulasan)</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--slate-200)', marginBottom: '1.25rem' }}>
          <button
            onClick={() => setActiveTab('applied_jobs')}
            style={{
              padding: '0.6rem 1rem',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === 'applied_jobs' ? '2.5px solid var(--primary-600)' : '2.5px solid transparent',
              color: activeTab === 'applied_jobs' ? 'var(--primary-700)' : 'var(--slate-500)',
              fontWeight: activeTab === 'applied_jobs' ? '700' : '500',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <span>Lamaran Saya</span>
            <span className="badge badge-emerald" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
              {myAppliedJobs.length}
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
            Ulasan Murid ({reviews.filter((r) => r.tutorId === currentUser.id).length})
          </button>
        </div>

        {/* Tab 1: Applied Jobs */}
        {activeTab === 'applied_jobs' && (
          <div>
            {myAppliedJobs.length === 0 ? (
              <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--slate-500)' }}>
                <Briefcase size={36} color="var(--slate-400)" style={{ margin: '0 auto 0.5rem' }} />
                <p style={{ fontWeight: '700', marginBottom: '0.35rem' }}>Anda belum melamar tawaran les murid.</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--slate-400)', marginBottom: '1rem' }}>
                  Jelajahi bursa job aktif dan gunakan token Anda untuk menawarkan diri mengajar.
                </p>
                <Link to="/job-board" className="btn btn-primary btn-sm">
                  Buka Bursa Kebutuhan Tentor
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {myAppliedJobs.map((job) => {
                  const myApp = (job.applicants || []).find((a) => a.tutorId === currentUser.id);

                  return (
                    <div key={job.id} className="card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--emerald-600)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ flex: 1, minWidth: '280px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                            <span className="badge badge-emerald">
                              <CheckCircle2 size={12} /> Lamaran Terkirim
                            </span>
                            <span className="badge badge-primary">{job.subject}</span>
                            <span className="badge badge-slate">{job.level?.toUpperCase()}</span>
                            <span style={{ fontSize: '0.725rem', color: 'var(--slate-400)' }}>
                              • Melamar {timeAgo(myApp?.appliedAt || job.createdAt)}
                            </span>
                          </div>

                          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--slate-900)', margin: '0.25rem 0' }}>
                            {job.title}
                          </h3>

                          <div style={{ fontSize: '0.825rem', color: 'var(--slate-600)', marginBottom: '0.35rem' }}>
                            Murid: <strong>{job.studentName}</strong> • Media: <strong>{(job.preferredPlatforms || ['Google Meet']).join(', ')}</strong>
                          </div>

                          <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', margin: '0.25rem 0 0.5rem' }}>
                            "{job.description}"
                          </p>

                          {myApp?.proposalText && (
                            <div style={{
                              backgroundColor: '#f8fafc',
                              padding: '0.5rem 0.75rem',
                              borderRadius: '6px',
                              border: '1px solid #e2e8f0',
                              fontSize: '0.75rem',
                              color: 'var(--slate-700)',
                              marginTop: '0.35rem',
                            }}>
                              <strong>Pesan Anda:</strong> "{myApp.proposalText}"
                            </div>
                          )}
                        </div>

                        {/* Kontak Murid & Action */}
                        <div style={{ textAlign: 'right', minWidth: '200px' }}>
                          <div style={{ fontSize: '0.7rem', color: 'var(--slate-400)' }}>Fee dari Murid:</div>
                          <div style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--primary-700)', marginBottom: '0.5rem' }}>
                            {formatRupiah(job.feePerSession || job.studentInputPrice)}
                            <span style={{ fontSize: '0.75rem', fontWeight: '500', color: 'var(--slate-500)' }}> / sesi</span>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'flex-end' }}>
                            {job.studentPhone && job.studentPhone !== '-' && (
                              <a
                                href={`https://wa.me/${job.studentPhone.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary btn-sm"
                                style={{ fontSize: '0.75rem', color: '#16a34a', borderColor: '#bbf7d0', textDecoration: 'none' }}
                              >
                                <Phone size={12} /> WA Murid: {job.studentPhone}
                              </a>
                            )}

                            <button
                              onClick={() => handleOpenChat(job.studentId)}
                              className="btn btn-primary btn-sm"
                              style={{ fontSize: '0.75rem' }}
                            >
                              <MessageSquare size={13} /> Chat Murid
                            </button>
                          </div>
                        </div>
                      </div>
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
            <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '1rem' }}>Ulasan dari Murid</h3>
            {reviews.filter((r) => r.tutorId === currentUser.id).length === 0 ? (
              <p style={{ fontSize: '0.825rem', color: 'var(--slate-400)' }}>Belum ada ulasan yang masuk.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {reviews
                  .filter((r) => r.tutorId === currentUser.id)
                  .map((rev) => (
                    <div key={rev.id} style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>{rev.studentName} ({rev.subject})</span>
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
    </div>
  );
};
