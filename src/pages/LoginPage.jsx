import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Coins,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';

export const LoginPage = () => {
  const { loginUser, showToast } = useApp();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage('Silakan masukkan username atau email Anda.');
      return;
    }

    if (!password) {
      setErrorMessage('Silakan masukkan password akun Anda.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = loginUser(identifier.trim(), password);
      setIsLoading(false);

      if (result.success) {
        showToast(`Selamat datang kembali, ${result.user.name}!`);
        if (result.user.role === 'admin') {
          navigate('/admin');
        } else if (result.user.role === 'tutor') {
          navigate('/tutor/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      } else {
        setErrorMessage(result.message || 'Username atau password tidak sesuai.');
      }
    }, 400);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: '#0b132b',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Glow Orbs */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, rgba(37,99,235,0) 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '25%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0) 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
      }} />

      {/* LEFT PANEL - Value Showcase */}
      <div style={{
        flex: '1 1 50%',
        padding: '3.5rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 2,
        color: '#f8fafc',
      }} className="login-left-panel">
        <div>
          {/* Brand Logo Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3.5rem' }}>
            <Logo size={42} variant="horizontal" theme="dark" />
          </div>

          {/* Headline */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(37,99,235,0.2)',
            border: '1px solid rgba(59,130,246,0.3)',
            color: '#93c5fd',
            fontSize: '0.785rem',
            fontWeight: '600',
            marginBottom: '1.25rem',
          }}>
            <Coins size={14} color="#f59e0b" />
            <span>Platform Penghubung Tentor & Murid Berbasis Token</span>
          </div>

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            color: '#ffffff',
          }}>
            Temukan Kebutuhan Les, <br />
            <span style={{
              background: 'linear-gradient(135deg, #60a5fa 0%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Terhubung Langsung & Efisien.
            </span>
          </h1>

          <p style={{
            fontSize: '0.95rem',
            color: '#94a3b8',
            lineHeight: '1.6',
            maxWidth: '520px',
            marginBottom: '2.5rem',
          }}>
            Masuk untuk mempublikasikan kebutuhan belajar Anda, melamar job mengajar di Bursa Kebutuhan Tentor, atau berkomunikasi langsung dengan pengajar idaman.
          </p>

          {/* 2 Pillars Card */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            maxWidth: '560px',
          }}>
            <div style={{
              padding: '1.1rem',
              borderRadius: '16px',
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(59,130,246,0.2)',
                color: '#60a5fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.65rem',
              }}>
                <GraduationCap size={20} />
              </div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#f1f5f9', margin: '0 0 0.25rem' }}>
                Untuk Murid
              </h4>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0, lineHeight: '1.4' }}>
                Gunakan 1 token untuk up kebutuhan les dan terima lamaran langsung dari tentor bersertifikat.
              </p>
            </div>

            <div style={{
              padding: '1.1rem',
              borderRadius: '16px',
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(16,185,129,0.2)',
                color: '#34d399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.65rem',
              }}>
                <Briefcase size={20} />
              </div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#f1f5f9', margin: '0 0 0.25rem' }}>
                Untuk Tentor
              </h4>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0, lineHeight: '1.4' }}>
                Gunakan 1 token untuk melamar tawaran murid di Bursa Job tanpa potongan komisi fee mengajar.
              </p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.785rem', color: '#94a3b8' }}>
            <Coins size={16} color="#f59e0b" />
            <span>Sistem Token Kredit Terintegrasi QRIS</span>
          </div>

          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            © {new Date().getFullYear()} TemanTutor Indonesia
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Login Card */}
      <div style={{
        flex: '1 1 50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 2rem',
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '2.5rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          {/* Card Header */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.75rem',
              fontWeight: '700',
              color: '#2563eb',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.35rem',
            }}>
              <span>Portal Akses TemanTutor</span>
            </div>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: '800',
              color: '#0f172a',
              letterSpacing: '-0.02em',
              margin: '0 0 0.35rem',
            }}>
              Selamat Datang! 👋
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
              Silakan masuk dengan akun Anda untuk mulai belajar atau mengambil tawaran mengajar.
            </p>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '10px',
              color: '#b91c1c',
              fontSize: '0.8rem',
              marginBottom: '1.25rem',
            }}>
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Main Login Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.1rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.825rem',
                fontWeight: '700',
                color: '#334155',
                marginBottom: '0.35rem',
              }}>
                Username atau Email
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  placeholder="Masukkan username atau email Anda"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.6rem',
                    fontSize: '0.875rem',
                    borderRadius: '12px',
                    border: '1.5px solid #e2e8f0',
                    outline: 'none',
                    boxSizing: 'border-box',
                    backgroundColor: '#f8fafc',
                    color: '#0f172a',
                  }}
                />
                <User
                  size={16}
                  color="#94a3b8"
                  style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label style={{
                  fontSize: '0.825rem',
                  fontWeight: '700',
                  color: '#334155',
                }}>
                  Password
                </label>
                <span
                  onClick={() => showToast('Silakan hubungi admin support di support@temantutor.id untuk reset kata sandi.', 'info')}
                  style={{ fontSize: '0.75rem', color: '#2563eb', cursor: 'pointer', fontWeight: '500' }}
                >
                  Lupa kata sandi?
                </span>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Masukkan password akun"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 2.6rem 0.75rem 2.6rem',
                    fontSize: '0.875rem',
                    borderRadius: '12px',
                    border: '1.5px solid #e2e8f0',
                    outline: 'none',
                    boxSizing: 'border-box',
                    backgroundColor: '#f8fafc',
                    color: '#0f172a',
                  }}
                />
                <Lock
                  size={16}
                  color="#94a3b8"
                  style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    padding: '0.2rem',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
            }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', cursor: 'pointer', fontSize: '0.8rem', color: '#475569' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: '#2563eb', cursor: 'pointer', borderRadius: '4px' }}
                />
                <span>Ingat saya di perangkat ini</span>
              </label>

              <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <CheckCircle2 size={13} /> Sesi Aman
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontWeight: '700',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)',
              }}
            >
              {isLoading ? (
                <span>Memverifikasi akun...</span>
              ) : (
                <>
                  <span>Masuk Sekarang</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* Admin Note */}
          <div style={{
            marginTop: '1.25rem',
            padding: '0.65rem 0.85rem',
            backgroundColor: '#f8fafc',
            borderRadius: '10px',
            border: '1px dashed #cbd5e1',
            fontSize: '0.725rem',
            color: '#64748b',
            textAlign: 'center',
          }}>
            🛡️ <strong>Akses Admin Master:</strong> username <code>admin</code> • password <code>admin@WirDIG2024</code>
          </div>

          {/* Divider */}
          <div style={{
            position: 'relative',
            textAlign: 'center',
            margin: '1.5rem 0 1.25rem',
          }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: '#e2e8f0' }} />
            <span style={{
              position: 'relative',
              backgroundColor: '#ffffff',
              padding: '0 0.75rem',
              fontSize: '0.775rem',
              color: '#94a3b8',
              fontWeight: '600',
            }}>
              Belum Punya Akun?
            </span>
          </div>

          <Link
            to="/register"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#f8fafc',
              border: '1.5px solid #cbd5e1',
              borderRadius: '12px',
              fontSize: '0.875rem',
              fontWeight: '700',
              color: '#334155',
              textDecoration: 'none',
              boxSizing: 'border-box',
            }}
          >
            <span>Daftar Akun Baru (Murid atau Tentor)</span>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .login-left-panel {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
