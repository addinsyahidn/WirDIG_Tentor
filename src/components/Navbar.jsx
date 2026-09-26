import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  Bell,
  User,
  ShieldCheck,
  Briefcase,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  CheckCircle2,
  LogOut,
  LogIn,
  Coins,
  PlusCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';

export const Navbar = () => {
  const {
    currentUser,
    currentRole,
    switchRole,
    switchUser,
    logoutUser,
    users,
    notifications,
    setActiveTokenModal,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const unreadNotifs = currentUser
    ? notifications.filter((n) => n.userId === currentUser.id && !n.isRead)
    : [];

  const handleRoleChange = (role) => {
    switchRole(role);
    setRoleDropdownOpen(false);
    if (role === 'admin') navigate('/admin');
    else if (role === 'tutor') navigate('/tutor/dashboard');
    else navigate('/student/dashboard');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'white',
      borderBottom: '1px solid var(--slate-200)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container-custom">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '3.75rem'
        }}>
          {/* Brand Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Logo size={36} variant="horizontal" theme="light" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '1.25rem' }} className="desktop-nav">
            {/* Bursa Job (Kebutuhan Murid) */}
            <Link
              to="/job-board"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.85rem',
                fontWeight: isActive('/job-board') ? '700' : '500',
                color: isActive('/job-board') ? 'var(--primary-600)' : 'var(--slate-600)',
                padding: '0.35rem 0.25rem',
                textDecoration: 'none',
              }}
            >
              <Briefcase size={14} /> Bursa Kebutuhan Tentor
            </Link>

            {/* Dashboard Shortcut */}
            {currentRole === 'student' && (
              <Link
                to="/student/dashboard"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.85rem',
                  fontWeight: isActive('/student/dashboard') ? '700' : '500',
                  color: isActive('/student/dashboard') ? 'var(--primary-600)' : 'var(--slate-600)',
                  padding: '0.35rem 0.25rem',
                  textDecoration: 'none',
                }}
              >
                <GraduationCap size={14} /> Dashboard Murid
              </Link>
            )}

            {currentRole === 'tutor' && (
              <Link
                to="/tutor/dashboard"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.85rem',
                  fontWeight: isActive('/tutor/dashboard') ? '700' : '500',
                  color: isActive('/tutor/dashboard') ? 'var(--primary-600)' : 'var(--slate-600)',
                  padding: '0.35rem 0.25rem',
                  textDecoration: 'none',
                }}
              >
                <Briefcase size={14} /> Dashboard Tentor
              </Link>
            )}

            {currentRole === 'admin' && (
              <Link
                to="/admin"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.85rem',
                  fontWeight: isActive('/admin') ? '700' : '500',
                  color: isActive('/admin') ? 'var(--rose-600)' : 'var(--slate-600)',
                  padding: '0.35rem 0.25rem',
                  textDecoration: 'none',
                }}
              >
                <ShieldCheck size={14} /> Panel Admin
              </Link>
            )}

            <Link
              to="/how-it-works"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.85rem',
                fontWeight: isActive('/how-it-works') ? '700' : '500',
                color: isActive('/how-it-works') ? 'var(--primary-600)' : 'var(--slate-600)',
                padding: '0.35rem 0.25rem',
                textDecoration: 'none',
              }}
            >
              <HelpCircle size={14} /> Cara Kerja & Token
            </Link>
          </nav>

          {/* Right Action Tools */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {currentUser ? (
              <>
                {/* Role Switcher Pill */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => {
                      setRoleDropdownOpen(!roleDropdownOpen);
                      setUserDropdownOpen(false);
                      setNotifDropdownOpen(false);
                    }}
                    className={`badge ${
                      currentRole === 'admin'
                        ? 'badge-rose'
                        : currentRole === 'tutor'
                        ? 'badge-emerald'
                        : 'badge-primary'
                    }`}
                    style={{
                      cursor: 'pointer',
                      padding: '0.3rem 0.6rem',
                      fontSize: '0.725rem',
                      border: '1px solid currentColor',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      backgroundColor: 'transparent',
                    }}
                  >
                    <span>Role:</span>
                    <strong>
                      {currentRole === 'admin'
                        ? 'Admin'
                        : currentRole === 'tutor'
                        ? 'Tentor'
                        : 'Murid'}
                    </strong>
                    <ChevronDown size={11} />
                  </button>

                  {roleDropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '120%',
                        right: 0,
                        width: '210px',
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--slate-200)',
                        padding: '0.4rem',
                        zIndex: 110,
                      }}
                    >
                      <button
                        onClick={() => handleRoleChange('student')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          padding: '0.45rem 0.6rem',
                          borderRadius: 'var(--radius-sm)',
                          border: 'none',
                          backgroundColor: currentRole === 'student' ? 'var(--primary-50)' : 'transparent',
                          color: currentRole === 'student' ? 'var(--primary-700)' : 'var(--slate-700)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                        }}
                      >
                        <span>🎓 Murid</span>
                        {currentRole === 'student' && <CheckCircle2 size={14} color="var(--primary-600)" />}
                      </button>

                      <button
                        onClick={() => handleRoleChange('tutor')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          padding: '0.45rem 0.6rem',
                          borderRadius: 'var(--radius-sm)',
                          border: 'none',
                          backgroundColor: currentRole === 'tutor' ? 'var(--emerald-50)' : 'transparent',
                          color: currentRole === 'tutor' ? 'var(--emerald-700)' : 'var(--slate-700)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          marginTop: '0.2rem',
                        }}
                      >
                        <span>👨‍🏫 Tentor</span>
                        {currentRole === 'tutor' && <CheckCircle2 size={14} color="var(--emerald-600)" />}
                      </button>

                      {currentUser?.role === 'admin' && (
                        <button
                          onClick={() => handleRoleChange('admin')}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            padding: '0.45rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            border: 'none',
                            backgroundColor: currentRole === 'admin' ? 'var(--rose-50)' : 'transparent',
                            color: currentRole === 'admin' ? 'var(--rose-600)' : 'var(--slate-700)',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            marginTop: '0.2rem',
                          }}
                        >
                          <span>🛡️ Admin Panel</span>
                          {currentRole === 'admin' && <CheckCircle2 size={14} color="var(--rose-600)" />}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Token Balance Pill */}
                <button
                  onClick={() => setActiveTokenModal(true)}
                  style={{
                    cursor: 'pointer',
                    padding: '0.28rem 0.65rem',
                    fontSize: '0.725rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid #fcd34d',
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontWeight: '800',
                    transition: 'all 0.15s ease',
                  }}
                  title="Saldo Token Kredit. Digunakan untuk memasang atau melamar tawaran les."
                >
                  <Coins size={13} color="#d97706" />
                  <span>{currentUser?.tokens ?? 0} Token</span>
                  <span style={{
                    backgroundColor: '#d97706',
                    color: '#ffffff',
                    borderRadius: '4px',
                    padding: '0 0.25rem',
                    fontSize: '0.625rem',
                    fontWeight: '900',
                  }}>
                    + Beli
                  </span>
                </button>

                {/* Notifications Button */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => {
                      setNotifDropdownOpen(!notifDropdownOpen);
                      setUserDropdownOpen(false);
                      setRoleDropdownOpen(false);
                    }}
                    style={{
                      position: 'relative',
                      width: '2rem',
                      height: '2rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--slate-200)',
                      backgroundColor: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'var(--slate-600)',
                    }}
                    title="Notifikasi"
                  >
                    <Bell size={15} />
                    {unreadNotifs.length > 0 && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '-3px',
                          right: '-3px',
                          backgroundColor: 'var(--rose-600)',
                          color: 'white',
                          fontSize: '0.6rem',
                          fontWeight: '700',
                          width: '15px',
                          height: '15px',
                          borderRadius: '9999px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {unreadNotifs.length}
                      </span>
                    )}
                  </button>

                  {notifDropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '120%',
                        right: 0,
                        width: '300px',
                        maxHeight: '360px',
                        overflowY: 'auto',
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--slate-200)',
                        padding: '0.6rem',
                        zIndex: 110,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', paddingBottom: '0.4rem', borderBottom: '1px solid var(--slate-100)' }}>
                        <span style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--slate-900)' }}>Notifikasi</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--primary-600)' }}>{unreadNotifs.length} baru</span>
                      </div>

                      {notifications.filter((n) => n.userId === currentUser.id).length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '1rem 0', color: 'var(--slate-400)', fontSize: '0.8rem' }}>
                          Tidak ada notifikasi.
                        </div>
                      ) : (
                        notifications
                          .filter((n) => n.userId === currentUser.id)
                          .slice(0, 5)
                          .map((n) => (
                            <div
                              key={n.id}
                              onClick={() => {
                                setNotifDropdownOpen(false);
                                if (n.link) navigate(n.link);
                              }}
                              style={{
                                padding: '0.5rem',
                                borderRadius: 'var(--radius-sm)',
                                backgroundColor: n.isRead ? 'transparent' : 'var(--primary-50)',
                                marginBottom: '0.3rem',
                                cursor: 'pointer',
                              }}
                            >
                              <div style={{ fontWeight: '600', fontSize: '0.785rem', color: 'var(--slate-800)' }}>
                                {n.title}
                              </div>
                              <div style={{ fontSize: '0.725rem', color: 'var(--slate-500)', lineHeight: '1.3' }}>
                                {n.message}
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  )}
                </div>

                {/* User Profile Button */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(!userDropdownOpen);
                      setNotifDropdownOpen(false);
                      setRoleDropdownOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.25rem 0.5rem 0.25rem 0.25rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--slate-200)',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      style={{ width: '1.75rem', height: '1.75rem', borderRadius: '9999px', objectFit: 'cover' }}
                    />
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--slate-800)', maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} className="user-name-desktop">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <ChevronDown size={12} color="var(--slate-400)" />
                  </button>

                  {userDropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '120%',
                        right: 0,
                        width: '240px',
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--slate-200)',
                        padding: '0.5rem',
                        zIndex: 110,
                      }}
                    >
                      <div style={{ padding: '0.35rem 0.5rem 0.5rem', borderBottom: '1px solid var(--slate-100)' }}>
                        <div style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--slate-900)' }}>{currentUser.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--slate-500)' }}>{currentUser.email}</div>
                      </div>

                      <div style={{ padding: '0.35rem 0', borderBottom: '1px solid var(--slate-100)' }}>
                        {currentRole === 'tutor' ? (
                          <Link
                            to="/tutor/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.5rem', fontSize: '0.8rem', color: 'var(--slate-700)', textDecoration: 'none' }}
                          >
                            <Briefcase size={14} color="var(--emerald-600)" /> Dashboard Tentor
                          </Link>
                        ) : currentRole === 'student' ? (
                          <Link
                            to="/student/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.5rem', fontSize: '0.8rem', color: 'var(--slate-700)', textDecoration: 'none' }}
                          >
                            <GraduationCap size={14} color="var(--primary-600)" /> Dashboard Murid
                          </Link>
                        ) : (
                          <Link
                            to="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.5rem', fontSize: '0.8rem', color: 'var(--slate-700)', textDecoration: 'none' }}
                          >
                            <ShieldCheck size={14} color="var(--rose-600)" /> Panel Admin
                          </Link>
                        )}

                        <Link
                          to="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.5rem', fontSize: '0.8rem', color: 'var(--slate-700)', textDecoration: 'none' }}
                        >
                          <User size={14} /> Edit Profil
                        </Link>
                      </div>

                      {/* Keluar / Logout */}
                      <div style={{ paddingTop: '0.35rem', borderTop: '1px solid var(--slate-100)', marginTop: '0.35rem' }}>
                        <button
                          type="button"
                          onClick={() => {
                            logoutUser();
                            setUserDropdownOpen(false);
                            navigate('/login');
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            width: '100%',
                            padding: '0.45rem 0.65rem',
                            borderRadius: 'var(--radius-sm)',
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            color: 'var(--rose-600)',
                            textAlign: 'left',
                          }}
                        >
                          <LogOut size={14} /> Keluar Akun
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Link
                  to="/login"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.4rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'white',
                    border: '1px solid var(--slate-300)',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    color: 'var(--slate-700)',
                    textDecoration: 'none',
                  }}
                >
                  <LogIn size={13} /> Masuk
                </Link>
                <Link
                  to="/register"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.4rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--primary-600)',
                    border: 'none',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    color: 'white',
                    textDecoration: 'none',
                  }}
                >
                  Daftar
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.35rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--slate-200)',
                backgroundColor: 'white',
                color: 'var(--slate-700)',
                cursor: 'pointer',
              }}
              className="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '0.75rem 0 1rem',
              borderTop: '1px solid var(--slate-200)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <Link
              to="/job-board"
              onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem', color: 'var(--slate-800)', fontWeight: '600', fontSize: '0.85rem', textDecoration: 'none' }}
            >
              <Briefcase size={15} /> Bursa Kebutuhan Tentor
            </Link>

            {currentRole === 'student' && (
              <Link
                to="/student/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem', color: 'var(--slate-800)', fontWeight: '600', fontSize: '0.85rem', textDecoration: 'none' }}
              >
                <GraduationCap size={15} /> Dashboard Murid
              </Link>
            )}

            {currentRole === 'tutor' && (
              <Link
                to="/tutor/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem', color: 'var(--slate-800)', fontWeight: '600', fontSize: '0.85rem', textDecoration: 'none' }}
              >
                <Briefcase size={15} /> Dashboard Tentor
              </Link>
            )}

            {currentRole === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem', color: 'var(--slate-800)', fontWeight: '600', fontSize: '0.85rem', textDecoration: 'none' }}
              >
                <ShieldCheck size={15} /> Panel Admin
              </Link>
            )}

            <Link
              to="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem', color: 'var(--slate-800)', fontWeight: '600', fontSize: '0.85rem', textDecoration: 'none' }}
            >
              <HelpCircle size={15} /> Cara Kerja & Token
            </Link>

            {currentUser ? (
              <button
                type="button"
                onClick={() => {
                  logoutUser();
                  setMobileMenuOpen(false);
                  navigate('/login');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 0.4rem',
                  color: 'var(--rose-600)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  borderTop: '1px solid var(--slate-100)',
                  marginTop: '0.25rem',
                }}
              >
                <LogOut size={15} /> Keluar Akun ({currentUser.name})
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', borderTop: '1px solid var(--slate-100)', paddingTop: '0.5rem' }}>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <LogIn size={14} /> Masuk
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .user-name-desktop { display: inline-block !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
};
