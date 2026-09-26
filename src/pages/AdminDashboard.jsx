import React, { useState } from 'react';
import {
  ShieldCheck,
  FileSpreadsheet,
  Download,
  Phone,
  Mail,
  User,
  Briefcase,
  Clock,
  Send,
  ExternalLink,
  Coins,
  CheckCircle2,
  XCircle,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatRupiah } from '../utils/pricing';
import { formatDateIndo, timeAgo } from '../utils/dateFormatter';

export const AdminDashboard = () => {
  const {
    users,
    jobs,
    subjectRequests,
    adminApproveSubjectRequest,
    adminRejectSubjectRequest,
    toggleUserStatus,
    exportSingleJobToSpreadsheetCSV,
    exportAllJobsWithApplicantsCSV,
    exportUsersToSpreadsheetCSV,
    getSheetWebhookUrl,
    setSheetWebhookUrl,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState('job_spreadsheets');
  const [webhookUrl, setWebhookUrl] = useState(() => (getSheetWebhookUrl ? getSheetWebhookUrl() : ''));
  const [showWebhookConfig, setShowWebhookConfig] = useState(false);

  const totalTutors = users.filter((u) => u.role === 'tutor').length;
  const totalStudents = users.filter((u) => u.role === 'student').length;
  const totalProposals = jobs.reduce((sum, j) => sum + (j.applicants?.length || 0), 0);

  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: 'calc(100vh - 3.75rem)', padding: '2rem 0 3.5rem' }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <span className="badge badge-rose" style={{ fontSize: '0.65rem' }}>
              <ShieldCheck size={11} /> Admin & Moderator
            </span>
          </div>
          <h1 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--slate-900)' }}>
            Pusat Kontrol & Database TemanTutor
          </h1>
          <p style={{ fontSize: '0.825rem', color: 'var(--slate-500)', margin: '0.15rem 0 0' }}>
            Kelola database tawaran murid, sinkronisasi Google Sheets, dan akun pengguna.
          </p>
        </div>

        {/* Compact Metrics Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.85rem',
          marginBottom: '1.5rem'
        }}>
          <div className="card" style={{ padding: '1rem', borderLeft: '3px solid var(--primary-600)' }}>
            <div style={{ fontSize: '0.725rem', color: 'var(--slate-500)', fontWeight: '700', textTransform: 'uppercase' }}>
              Total Tawaran Les (Bursa Job)
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--primary-700)', marginTop: '0.15rem' }}>
              {jobs.length} Tawaran
            </div>
          </div>

          <div className="card" style={{ padding: '1rem', borderLeft: '3px solid var(--emerald-600)' }}>
            <div style={{ fontSize: '0.725rem', color: 'var(--slate-500)', fontWeight: '700', textTransform: 'uppercase' }}>
              Total Lamaran Tentor
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--emerald-600)', marginTop: '0.15rem' }}>
              {totalProposals} Lamaran
            </div>
          </div>

          <div className="card" style={{ padding: '1rem' }}>
            <div style={{ fontSize: '0.725rem', color: 'var(--slate-500)', fontWeight: '700', textTransform: 'uppercase' }}>
              Pengguna Terdaftar
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--slate-900)', marginTop: '0.15rem' }}>
              {users.length} Akun <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: '500' }}>({totalStudents} Murid, {totalTutors} Tentor)</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--slate-200)',
          marginBottom: '1.25rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setActiveTab('job_spreadsheets')}
            style={{
              padding: '0.5rem 0.85rem',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === 'job_spreadsheets' ? '2.5px solid var(--emerald-600)' : '2.5px solid transparent',
              color: activeTab === 'job_spreadsheets' ? 'var(--emerald-700)' : 'var(--slate-600)',
              fontWeight: activeTab === 'job_spreadsheets' ? '800' : '500',
              cursor: 'pointer',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <FileSpreadsheet size={15} color="var(--emerald-600)" />
            <span>Tawaran Murid & Spreadsheet Pelamar</span>
            <span className="badge badge-emerald" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
              {jobs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            style={{
              padding: '0.5rem 0.85rem',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === 'users' ? '2.5px solid var(--primary-600)' : '2.5px solid transparent',
              color: activeTab === 'users' ? 'var(--primary-700)' : 'var(--slate-600)',
              fontWeight: activeTab === 'users' ? '700' : '500',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
          >
            Manajemen Akun ({users.length})
          </button>

          <button
            onClick={() => setActiveTab('subjects')}
            style={{
              padding: '0.5rem 0.85rem',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === 'subjects' ? '2.5px solid var(--primary-600)' : '2.5px solid transparent',
              color: activeTab === 'subjects' ? 'var(--primary-700)' : 'var(--slate-600)',
              fontWeight: activeTab === 'subjects' ? '700' : '500',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
          >
            Pengajuan Mapel Baru ({subjectRequests.filter((r) => r.status === 'pending').length})
          </button>
        </div>

        {/* Tab 1: Job Requests & Spreadsheets */}
        {activeTab === 'job_spreadsheets' && (
          <div>
            <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '1.25rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--slate-900)', margin: '0 0 0.2rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FileSpreadsheet size={18} color="#059669" />
                    <span>Database Spreadsheet Tawaran Murid & Pelamar Tentor</span>
                  </h3>
                  <p style={{ fontSize: '0.775rem', color: 'var(--slate-500)', margin: 0 }}>
                    Setiap tawaran murid memuat nomor WhatsApp, Email, dan data seluruh Tentor yang melamar.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => exportAllJobsWithApplicantsCSV(jobs, users)}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.775rem', padding: '0.45rem 0.8rem', color: '#047857', borderColor: '#a7f3d0' }}
                  >
                    <Download size={14} /> Unduh Master Spreadsheet (.CSV)
                  </button>

                  <button
                    onClick={() => exportUsersToSpreadsheetCSV(users)}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.775rem', padding: '0.45rem 0.8rem' }}
                  >
                    <FileSpreadsheet size={14} /> Unduh Database User (.CSV)
                  </button>

                  <button
                    onClick={() => setShowWebhookConfig(!showWebhookConfig)}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.775rem', padding: '0.45rem 0.8rem' }}
                  >
                    ⚙️ Setup Webhook Google Sheets
                  </button>
                </div>
              </div>

              {/* Webhook Config Panel */}
              {showWebhookConfig && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                    URL Webhook Google Apps Script (Untuk Sinkronisasi Otomatis Realtime ke Google Spreadsheet):
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '650px' }}>
                    <input
                      type="url"
                      placeholder="https://script.google.com/macros/s/.../exec"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="form-input"
                      style={{ fontSize: '0.8rem', padding: '0.45rem 0.75rem' }}
                    />
                    <button
                      onClick={() => {
                        setSheetWebhookUrl(webhookUrl);
                        showToast('URL Google Apps Script berhasil disimpan!');
                      }}
                      className="btn btn-emerald btn-sm"
                    >
                      Simpan URL
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* List of Job Requests */}
            {jobs.length === 0 ? (
              <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--slate-500)' }}>
                Belum ada tawaran murid yang dipasang di platform.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {jobs.map((job) => {
                  const student = users.find((u) => u.id === job.studentId);
                  const studentName = student?.name || job.studentName || 'Murid';
                  const studentEmail = student?.email || job.studentEmail || '-';
                  const studentPhone = student?.phone || job.studentPhone || '-';
                  const studentAvatar = student?.avatar || job.studentAvatar;
                  const feePerSession = job.feePerSession || job.studentInputPrice || 100000;
                  const duration = job.durationMinutes || 60;
                  const applicants = job.applicants || [];

                  return (
                    <div
                      key={job.id}
                      className="card"
                      style={{
                        padding: '1.5rem',
                        borderLeft: '4px solid #10b981',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                      }}
                    >
                      {/* Job Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ flex: 1, minWidth: '280px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                            <span className="badge badge-emerald">ID: {job.id}</span>
                            <span className="badge badge-primary">{job.subject}</span>
                            <span className="badge badge-slate">{job.level?.toUpperCase()}</span>
                            <span className="badge badge-slate">{duration} Menit/Sesi</span>
                            <span style={{ fontSize: '0.725rem', color: 'var(--slate-400)' }}>• Dipos {timeAgo(job.createdAt)}</span>
                          </div>

                          <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--slate-900)', margin: '0.2rem 0' }}>
                            {job.title}
                          </h2>
                          <p style={{ fontSize: '0.825rem', color: 'var(--slate-600)', margin: '0.25rem 0 0.5rem' }}>
                            "{job.description}"
                          </p>
                          <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                            Jadwal: <strong>{job.preferredSchedule}</strong>
                          </div>
                        </div>

                        {/* Fee Box */}
                        <div style={{
                          backgroundColor: '#f8fafc',
                          padding: '0.85rem 1rem',
                          borderRadius: '10px',
                          border: '1px solid #e2e8f0',
                          textAlign: 'right',
                          minWidth: '180px'
                        }}>
                          <div style={{ fontSize: '0.7rem', color: 'var(--slate-400)' }}>Fee yang Ditawarkan:</div>
                          <div style={{ fontSize: '1.15rem', fontWeight: '900', color: 'var(--primary-700)' }}>
                            {formatRupiah(feePerSession)} <span style={{ fontSize: '0.7rem', fontWeight: '600' }}>/ sesi</span>
                          </div>
                        </div>
                      </div>

                      {/* 2-Column Grid: Student Contacts vs Applicants */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                        {/* Student Contacts */}
                        <div style={{
                          backgroundColor: '#f0fdf4',
                          border: '1px solid #bbf7d0',
                          padding: '0.85rem 1rem',
                          borderRadius: '10px',
                        }}>
                          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#166534', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <User size={13} /> Informasi Kontak Murid:
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                            <img
                              src={studentAvatar}
                              alt={studentName}
                              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div>
                              <div style={{ fontWeight: '800', fontSize: '0.875rem', color: 'var(--slate-900)' }}>
                                {studentName}
                              </div>
                              <div style={{ fontSize: '0.725rem', color: 'var(--slate-500)' }}>
                                Akun ID: {job.studentId}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.785rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#15803d' }}>
                              <Phone size={13} />
                              <span>WhatsApp / HP: <strong>{studentPhone}</strong></span>
                              {studentPhone && studentPhone !== '-' && (
                                <a
                                  href={`https://wa.me/${studentPhone.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: '#16a34a', textDecoration: 'none', marginLeft: 'auto', fontSize: '0.725rem', fontWeight: '700' }}
                                >
                                  Buka WA ↗
                                </a>
                              )}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--slate-600)' }}>
                              <Mail size={13} />
                              <span>Email: <strong>{studentEmail}</strong></span>
                            </div>
                            {(job.parentName || student?.parentContact?.parentName) && (
                              <div style={{ fontSize: '0.725rem', color: 'var(--slate-500)', marginTop: '0.2rem', paddingTop: '0.2rem', borderTop: '1px dashed #bbf7d0' }}>
                                Wali/Ortu: <strong>{job.parentName || student?.parentContact?.parentName}</strong> ({job.parentPhone || student?.parentContact?.parentPhone || '-'})
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Applicants Summary */}
                        <div style={{
                          backgroundColor: '#eff6ff',
                          border: '1px solid #bfdbfe',
                          padding: '0.85rem 1rem',
                          borderRadius: '10px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}>
                          <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1e40af', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              <Briefcase size={13} /> Ringkasan Lamaran Tentor:
                            </div>
                            <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#1d4ed8' }}>
                              {applicants.length} Tentor Melamar
                            </div>
                          </div>

                          <button
                            onClick={() => exportSingleJobToSpreadsheetCSV(job, student)}
                            className="btn btn-emerald btn-sm"
                            style={{ width: '100%', marginTop: '0.75rem', fontSize: '0.8rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                          >
                            <Download size={14} /> Unduh Spreadsheet (.CSV)
                          </button>
                        </div>
                      </div>

                      {/* Applicants List */}
                      {applicants.length > 0 && (
                        <div style={{
                          backgroundColor: '#ffffff',
                          borderRadius: '10px',
                          border: '1px solid #e2e8f0',
                          padding: '0.85rem',
                          marginTop: '0.5rem',
                        }}>
                          <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '0.65rem' }}>
                            📋 Rincian Pelamar Tentor ({applicants.length} Orang):
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                            {applicants.map((a, idx) => (
                              <div
                                key={a.id || idx}
                                style={{
                                  padding: '0.75rem 0.85rem',
                                  borderRadius: '8px',
                                  backgroundColor: '#f8fafc',
                                  border: '1px solid #e2e8f0',
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <img
                                      src={a.tutorAvatar}
                                      alt={a.tutorName}
                                      style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                    <div>
                                      <div style={{ fontWeight: '800', fontSize: '0.85rem', color: 'var(--slate-900)' }}>
                                        {a.tutorName}
                                      </div>
                                      <div style={{ fontSize: '0.725rem', color: 'var(--slate-500)' }}>
                                        🎓 {a.tutorEducation || a.tutorHeadline}
                                      </div>
                                      {a.tutorCertificate && (
                                        <div style={{ fontSize: '0.7rem', color: '#047857', fontWeight: '600' }}>
                                          📜 {a.tutorCertificate}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                                    {a.tutorPhone && a.tutorPhone !== '-' && (
                                      <a
                                        href={`https://wa.me/${a.tutorPhone.replace(/[^0-9]/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#16a34a', fontWeight: '700', textDecoration: 'none' }}
                                      >
                                        <Phone size={12} /> WA: {a.tutorPhone}
                                      </a>
                                    )}
                                    {a.tutorEmail && (
                                      <span style={{ color: 'var(--slate-600)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <Mail size={12} /> {a.tutorEmail}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div style={{ fontSize: '0.775rem', backgroundColor: '#ffffff', padding: '0.4rem 0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0', color: 'var(--slate-800)' }}>
                                  <strong>Pesan Lamaran:</strong> "{a.proposalText}"
                                </div>

                                <div style={{ fontSize: '0.675rem', color: 'var(--slate-400)', marginTop: '0.35rem', textAlign: 'right' }}>
                                  Melamar: {formatDateIndo(a.appliedAt)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Users Management */}
        {activeTab === 'users' && (
          <div className="card" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {users.map((u) => (
                <div key={u.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.6rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--slate-50)',
                  border: '1px solid var(--slate-200)',
                  fontSize: '0.8rem'
                }}>
                  <div>
                    <strong>{u.name}</strong> <span style={{ color: 'var(--slate-500)' }}>({u.email})</span> • Role: <strong>{u.role.toUpperCase()}</strong> • Saldo Token: <strong style={{ color: '#d97706' }}>{u.tokens ?? 0} Token</strong>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    <span className={`badge ${u.accountStatus === 'suspended' ? 'badge-rose' : 'badge-emerald'}`}>
                      {u.accountStatus === 'suspended' ? 'Suspended' : 'Aktif'}
                    </span>
                    {u.accountStatus === 'suspended' ? (
                      <button onClick={() => toggleUserStatus(u.id, 'active')} className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem' }}>
                        Aktifkan
                      </button>
                    ) : (
                      <button onClick={() => toggleUserStatus(u.id, 'suspended')} className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem', color: 'var(--rose-600)' }}>
                        Suspend
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Subject Requests Moderation */}
        {activeTab === 'subjects' && (
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '1rem' }}>Moderasi Pengajuan Mapel Baru</h3>
            {subjectRequests.length === 0 ? (
              <p style={{ fontSize: '0.825rem', color: 'var(--slate-400)' }}>Belum ada pengajuan mapel baru.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {subjectRequests.map((req) => (
                  <div key={req.id} style={{ padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800' }}>{req.subjectName}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                          Oleh Tentor: {req.tutorName} • Jenjang: {req.levelLabel}
                        </span>
                      </div>
                      <span className={`badge ${req.status === 'approved' ? 'badge-emerald' : req.status === 'rejected' ? 'badge-rose' : 'badge-amber'}`}>
                        {req.status}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', margin: '0.25rem 0' }}>{req.description}</p>
                    {req.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                        <button onClick={() => adminRejectSubjectRequest(req.id)} className="btn btn-secondary btn-sm" style={{ color: 'var(--rose-600)' }}>
                          <XCircle size={13} /> Tolak
                        </button>
                        <button onClick={() => adminApproveSubjectRequest(req.id)} className="btn btn-emerald btn-sm">
                          <CheckCircle2 size={13} /> Setujui
                        </button>
                      </div>
                    )}
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
