import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Coins,
  Zap,
  ShieldCheck,
  HeartHandshake,
  CheckCircle,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { Logo } from './Logo';
import { useApp } from '../context/AppContext';

export const Footer = () => {
  const { setActiveTokenModal } = useApp();

  return (
    <footer style={{
      backgroundColor: 'var(--slate-900)',
      color: 'var(--slate-300)',
      padding: '4rem 0 2rem',
      marginTop: 'auto',
      borderTop: '1px solid var(--slate-800)'
    }}>
      <div className="container-custom">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Brand & Value Proposition */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <Logo size={40} variant="horizontal" theme="dark" />
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--slate-400)', lineHeight: '1.5', marginBottom: '1rem' }}>
              Platform penghubung les privat terpercaya di Indonesia dengan sistem token praktis dan 0% potongan komisi sesi.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                <Coins size={12} /> Sistem Token Praktis
              </span>
              <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                <Zap size={12} /> 0% Potongan Komisi
              </span>
            </div>
          </div>

          {/* Quick Links for Students */}
          <div>
            <h4 style={{ color: 'white', fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.75rem' }}>
              Untuk Murid
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.825rem' }}>
              <li>
                <Link to="/job-board" style={{ color: 'var(--slate-400)', transition: 'color 0.2s' }}>
                  Bursa Kebutuhan Tentor
                </Link>
              </li>
              <li>
                <Link to="/student/dashboard" style={{ color: 'var(--slate-400)', transition: 'color 0.2s' }}>
                  Dashboard & Tawaran Saya
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" style={{ color: 'var(--slate-400)', transition: 'color 0.2s' }}>
                  Cara Kerja Sistem Token
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" style={{ color: 'var(--slate-400)', transition: 'color 0.2s' }}>
                  Perlindungan Murid SD / SMP
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links for Tutors */}
          <div>
            <h4 style={{ color: 'white', fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.75rem' }}>
              Untuk Tentor
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.825rem' }}>
              <li>
                <Link to="/job-board" style={{ color: 'var(--slate-400)', transition: 'color 0.2s' }}>
                  Bursa Tawaran Murid
                </Link>
              </li>
              <li>
                <Link to="/tutor/dashboard" style={{ color: 'var(--slate-400)', transition: 'color 0.2s' }}>
                  Dashboard Lamaran Saya
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setActiveTokenModal(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--slate-400)',
                    cursor: 'pointer',
                    fontSize: '0.825rem',
                    textAlign: 'left'
                  }}
                >
                  Top Up Token QRIS
                </button>
              </li>
              <li>
                <Link to="/terms" style={{ color: 'var(--slate-400)', transition: 'color 0.2s' }}>
                  Ketentuan Layanan Tentor
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Safety */}
          <div>
            <h4 style={{ color: 'white', fontSize: '0.95rem', fontWeight: '700', marginBottom: '1rem' }}>
              Keamanan & Legalitas
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              <li>
                <Link to="/terms" style={{ color: 'var(--slate-400)', transition: 'color 0.2s' }}>
                  Syarat & Ketentuan Layanan
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" style={{ color: 'var(--slate-400)', transition: 'color 0.2s' }}>
                  Kebijakan Privasi (UU PDP)
                </Link>
              </li>
              <li>
                <span style={{ color: 'var(--slate-500)', display: 'block', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                  Media Pembelajaran:
                  <br />Google Meet • Zoom • Discord • Tatap Muka
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid var(--slate-800)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--slate-500)'
        }}>
          <div>
            © {new Date().getFullYear()} TemanTutor Indonesia. Seluruh hak cipta dilindungi undang-undang.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Platform Penghubung Bebas Komisi</span>
            <span>Sistem Token Terjangkau</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
