import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  GraduationCap,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  Eye,
  EyeOff,
  FileText,
  Upload,
  Coins,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';

export const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') || 'register';
  const initialRole = searchParams.get('role') || 'student';

  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState(initialRole);
  const [educationLevel, setEducationLevel] = useState('sma');

  // Form Fields
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Login form fields (if in login mode)
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Minor parent contact fields
  const isMinor = role === 'student' && (educationLevel === 'sd' || educationLevel === 'smp');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentRelation, setParentRelation] = useState('Orang Tua Kandung');

  // Tutor specific fields (Wajib Sertifikat / Ijazah)
  const [headline, setHeadline] = useState('');
  const [education, setEducation] = useState('');
  const [certificate, setCertificate] = useState('');
  const [uploadedCertificate, setUploadedCertificate] = useState(false);

  const { registerUser, loginUser, showToast } = useApp();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = registerUser({
      name,
      username: username.trim() || email.split('@')[0],
      email,
      phone,
      password: password || 'password123',
      role,
      isMinor,
      educationLevel,
      parentName: isMinor ? parentName : null,
      parentPhone: isMinor ? parentPhone : null,
      parentRelation: isMinor ? parentRelation : null,
      headline: role === 'tutor' ? headline : null,
      education: role === 'tutor' ? education : null,
      certificate: role === 'tutor' ? certificate : null,
    });

    if (role === 'tutor') navigate('/tutor/dashboard');
    else navigate('/student/dashboard');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const result = loginUser(loginEmail, loginPassword);
    if (result.success) {
      showToast(`Selamat datang kembali, ${result.user.name}!`);
      if (result.user.role === 'admin') navigate('/admin');
      else if (result.user.role === 'tutor') navigate('/tutor/dashboard');
      else navigate('/student/dashboard');
    } else {
      setErrorMessage(result.message || 'Username atau password salah.');
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: 'calc(100vh - 4.5rem)', padding: '3rem 0 5rem', display: 'flex', alignItems: 'center' }}>
      <div className="container-custom" style={{ maxWidth: '580px', width: '100%' }}>
        {/* Main Auth Card */}
        <div className="card" style={{ padding: '2.5rem', boxShadow: 'var(--shadow-xl)' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <Logo size={42} variant="horizontal" theme="light" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--slate-900)' }}>
              {mode === 'register' ? 'Buat Akun Baru' : 'Masuk ke Akun'}
            </h2>
            <p style={{ fontSize: '0.825rem', color: 'var(--slate-500)', marginTop: '0.2rem' }}>
              {mode === 'register'
                ? 'Pilih peran dan lengkapi data diri Anda.'
                : 'Selamat datang kembali di TemanTutor.'}
            </p>
          </div>

          {/* Mode switch */}
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--slate-100)',
            padding: '0.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
          }}>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMessage(''); }}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: mode === 'register' ? 'white' : 'transparent',
                fontWeight: mode === 'register' ? '700' : '500',
                color: mode === 'register' ? 'var(--primary-700)' : 'var(--slate-600)',
                boxShadow: mode === 'register' ? 'var(--shadow-sm)' : 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              Daftar Akun
            </button>
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMessage(''); }}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: mode === 'login' ? 'white' : 'transparent',
                fontWeight: mode === 'login' ? '700' : '500',
                color: mode === 'login' ? 'var(--primary-700)' : 'var(--slate-600)',
                boxShadow: mode === 'login' ? 'var(--shadow-sm)' : 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              Masuk Akun
            </button>
          </div>

          {errorMessage && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              color: '#b91c1c',
              fontSize: '0.8rem',
              marginBottom: '1.25rem',
            }}>
              <AlertCircle size={15} />
              <span>{errorMessage}</span>
            </div>
          )}

          {mode === 'register' ? (
            <form onSubmit={handleRegister}>
              {/* Role Selection */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">Saya Ingin Mendaftar Sebagai:</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: role === 'student' ? '2px solid var(--primary-600)' : '1px solid var(--slate-200)',
                      backgroundColor: role === 'student' ? 'var(--primary-50)' : 'white',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ fontWeight: '700', fontSize: '0.9rem', color: role === 'student' ? 'var(--primary-700)' : 'var(--slate-800)', marginBottom: '0.2rem' }}>
                      🎓 Murid / Orang Tua
                    </div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--slate-500)' }}>
                      Pasang tawaran kebutuhan les (1 Token)
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('tutor')}
                    style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: role === 'tutor' ? '2px solid var(--emerald-600)' : '1px solid var(--slate-200)',
                      backgroundColor: role === 'tutor' ? 'var(--emerald-50)' : 'white',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ fontWeight: '700', fontSize: '0.9rem', color: role === 'tutor' ? 'var(--emerald-700)' : 'var(--slate-800)', marginBottom: '0.2rem' }}>
                      👨‍🏫 Tentor / Pengajar
                    </div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--slate-500)' }}>
                      Lamar tawaran murid di Bursa Job (1 Token)
                    </div>
                  </button>
                </div>
              </div>

              {/* Basic Fields */}
              <div className="form-group">
                <label className="form-label">Nama Lengkap:</label>
                <input
                  type="text"
                  required
                  placeholder={role === 'tutor' ? 'Contoh: Dimas Surya, S.Si' : 'Contoh: Budi Pratama'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Username Akun:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: budipratama"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Alamat Email:</label>
                <input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nomor WhatsApp / Kontak:</label>
                <input
                  type="tel"
                  required
                  placeholder="081234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Kata Sandi:</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Minimal 6 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    style={{ paddingRight: '2.5rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      color: 'var(--slate-400)',
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Student Minor Fields */}
              {role === 'student' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Jenjang Pendidikan Murid:</label>
                    <select
                      value={educationLevel}
                      onChange={(e) => setEducationLevel(e.target.value)}
                      className="form-select"
                    >
                      <option value="sd">SD (Sekolah Dasar) • Wajib Didampingi Ortu</option>
                      <option value="smp">SMP (Sekolah Menengah Pertama) • Wajib Didampingi Ortu</option>
                      <option value="sma">SMA / SMK (Sekolah Menengah Atas)</option>
                      <option value="kuliah">Mahasiswa / Perguruan Tinggi</option>
                      <option value="umum">Umum & Profesional</option>
                    </select>
                  </div>

                  {isMinor && (
                    <div style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--rose-50)',
                      border: '1.5px solid var(--rose-200)',
                      marginBottom: '1.25rem',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--rose-800)', fontWeight: '800', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                        <UserCheck size={16} />
                        Perlindungan Khusus Murid SD/SMP (Minor)
                      </div>
                      <p style={{ fontSize: '0.775rem', color: 'var(--rose-900)', lineHeight: '1.4', marginBottom: '0.75rem' }}>
                        Sesuai kebijakan keamanan, akun murid jenjang SD & SMP wajib mencantumkan kontak orang tua/wali resmi.
                      </p>

                      <div className="form-group" style={{ marginBottom: '0.65rem' }}>
                        <label className="form-label" style={{ fontSize: '0.785rem', color: 'var(--rose-900)' }}>Nama Orang Tua / Wali:</label>
                        <input
                          type="text"
                          required
                          placeholder="Nama lengkap Ayah / Ibu"
                          value={parentName}
                          onChange={(e) => setParentName(e.target.value)}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.785rem', color: 'var(--rose-900)' }}>Nomor WhatsApp Orang Tua:</label>
                        <input
                          type="tel"
                          required
                          placeholder="081234567890"
                          value={parentPhone}
                          onChange={(e) => setParentPhone(e.target.value)}
                          className="form-input"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Tutor Specific Fields */}
              {role === 'tutor' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Headline / Ringkasan Keahlian:</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Tutor Matematika & Fisika Juara Olimpiade | 5+ Thn Pengalaman"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Latar Belakang Pendidikan / Kampus:</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: S1 Fisika - Institut Teknologi Bandung"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  {/* Mandatory Certificate Section */}
                  <div style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--emerald-50)',
                    border: '1.5px solid var(--emerald-200)',
                    marginBottom: '1.25rem',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--emerald-800)', fontWeight: '800', fontSize: '0.875rem', marginBottom: '0.4rem' }}>
                      <ShieldCheck size={16} />
                      Lampiran Dokumen / Sertifikat (Wajib Bagi Tentor)
                    </div>
                    <p style={{ fontSize: '0.775rem', color: 'var(--emerald-900)', lineHeight: '1.4', marginBottom: '0.75rem' }}>
                      Untuk menjaga kualitas bimbingan, tentor wajib melampirkan ijazah, sertifikat pendidik, atau bukti keahlian akademik.
                    </p>

                    <div className="form-group" style={{ marginBottom: '0.65rem' }}>
                      <label className="form-label" style={{ fontSize: '0.785rem', color: 'var(--emerald-900)' }}>Nama Sertifikat / Ijazah:</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Ijazah S1 Fisika ITB & Sertifikat Pendidik"
                        value={certificate}
                        onChange={(e) => setCertificate(e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.65rem',
                      backgroundColor: 'white',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px dashed var(--emerald-300)',
                    }}>
                      <Upload size={16} color="var(--emerald-600)" />
                      <span style={{ fontSize: '0.75rem', color: 'var(--slate-600)', flex: 1 }}>
                        {uploadedCertificate ? '✓ File Sertifikat / Ijazah Terpilih' : 'Unggah Foto/Scan Sertifikat (PDF/JPG)'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setUploadedCertificate(true)}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                      >
                        {uploadedCertificate ? 'Ganti File' : 'Pilih File'}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Terms Agreement */}
              <div style={{ marginBottom: '1.25rem', fontSize: '0.775rem', color: 'var(--slate-600)' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    required
                    defaultChecked
                    style={{ marginTop: '2px', accentColor: 'var(--primary-600)' }}
                  />
                  <span>
                    Saya menyetujui <Link to="/terms" target="_blank" style={{ color: 'var(--primary-600)', fontWeight: '600' }}>Syarat & Ketentuan</Link> serta <Link to="/privacy-policy" target="_blank" style={{ color: 'var(--primary-600)', fontWeight: '600' }}>Kebijakan Privasi</Link> TemanTutor.
                  </span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.65rem' }}>
                <CheckCircle2 size={16} /> Daftar Sekarang (+3 Token Gratis)
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.825rem', color: 'var(--slate-500)' }}>
                Sudah punya akun?{' '}
                <Link to="/login" style={{ color: 'var(--primary-600)', fontWeight: '700', textDecoration: 'none' }}>
                  Masuk di sini
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label className="form-label">Email atau Username:</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan email atau username akun"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Kata Sandi:</label>
                <input
                  type="password"
                  required
                  placeholder="Masukkan password akun"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="form-input"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
                Masuk Sekarang
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.825rem', color: 'var(--slate-500)' }}>
                Belum punya akun?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  style={{ border: 'none', background: 'transparent', color: 'var(--primary-600)', fontWeight: '700', cursor: 'pointer', padding: 0 }}
                >
                  Daftar di sini
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
