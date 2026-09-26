import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  ShieldCheck,
  Save,
  UserCheck,
  ChevronRight,
  GraduationCap,
  Sparkles,
  FileCheck,
  Coins,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfilePage = () => {
  const { currentUser, updateProfile, educationLevels, showToast } = useApp();

  const [name, setName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [city, setCity] = useState(currentUser.city || 'Jakarta');
  const [educationLevel, setEducationLevel] = useState(currentUser.educationLevel || 'sma');

  // Tutor Profile fields
  const [headline, setHeadline] = useState(currentUser.tutorProfile?.headline || '');
  const [bio, setBio] = useState(currentUser.tutorProfile?.bio || '');
  const [education, setEducation] = useState(currentUser.tutorProfile?.education || '');
  const [certificate, setCertificate] = useState(currentUser.tutorProfile?.certificate || '');

  // Parent fields
  const [parentName, setParentName] = useState(currentUser.parentContact?.parentName || '');
  const [parentPhone, setParentPhone] = useState(currentUser.parentContact?.parentPhone || '');

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(currentUser.id, {
      name,
      email,
      phone,
      city,
      educationLevel,
      parentContact: currentUser.userType === 'minor' ? {
        ...currentUser.parentContact,
        parentName,
        parentPhone,
      } : currentUser.parentContact,
      tutorProfile: currentUser.tutorProfile ? {
        ...currentUser.tutorProfile,
        headline,
        bio,
        education,
        certificate: certificate || 'Sertifikat Terlampir',
      } : null,
    });
    showToast('Profil berhasil disimpan!', 'success');
  };

  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: 'calc(100vh - 4.5rem)', padding: '2.5rem 0 4rem' }}>
      <div className="container-custom" style={{ maxWidth: '680px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--slate-500)', marginBottom: '1.25rem' }}>
          <Link to="/" style={{ color: 'var(--slate-500)' }}>Beranda</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--slate-800)', fontWeight: '600' }}>Pengaturan Profil</span>
        </div>

        <div className="card" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
            <img
              src={currentUser.avatar}
              alt=""
              style={{ width: '4.5rem', height: '4.5rem', borderRadius: '9999px', objectFit: 'cover' }}
            />
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--slate-900)' }}>
                {currentUser.name}
              </h1>
              <div style={{ fontSize: '0.85rem', color: 'var(--slate-500)', marginTop: '0.2rem' }}>
                Role: <strong>{currentUser.role.toUpperCase()}</strong> • Saldo: <strong>{currentUser.tokens || 0} Token</strong>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">Nama Lengkap:</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email:</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Nomor WhatsApp / Kontak:</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Kota / Lokasi:</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Minor Guardian fields */}
            {currentUser.userType === 'minor' && (
              <div style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--rose-50)',
                border: '1.5px solid var(--rose-200)',
                marginBottom: '1.25rem'
              }}>
                <div style={{ fontWeight: '800', fontSize: '0.85rem', color: 'var(--rose-800)', marginBottom: '0.5rem' }}>
                  Kontak Orang Tua / Wali Pendamping:
                </div>
                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label" style={{ fontSize: '0.8rem', color: 'var(--rose-900)' }}>Nama Orang Tua:</label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem', color: 'var(--rose-900)' }}>No. WhatsApp Orang Tua:</label>
                  <input
                    type="text"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
            )}

            {/* Tutor fields */}
            {currentUser.tutorProfile && (
              <div style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--emerald-50)',
                border: '1.5px solid var(--emerald-200)',
                marginBottom: '1.25rem'
              }}>
                <div style={{ fontWeight: '800', fontSize: '0.85rem', color: 'var(--emerald-800)', marginBottom: '0.5rem' }}>
                  Pengaturan Profil Mengajar & Sertifikasi:
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-600)', marginBottom: '0.85rem', lineHeight: '1.4' }}>
                  💡 <em>Catatan:</em> Informasi ini akan terlihat oleh murid saat Anda melamar tawaran les di Bursa Job (1 Token / lamaran).
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--emerald-900)' }}>Headline / Ringkasan Keahlian:</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--emerald-900)' }}>Latar Belakang Pendidikan / Kampus:</label>
                  <input
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="Contoh: S1 Pendidikan Matematika - Universitas Indonesia"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: 'var(--emerald-900)' }}>Lampiran Ijazah / Sertifikat:</label>
                  <input
                    type="text"
                    value={certificate}
                    onChange={(e) => setCertificate(e.target.value)}
                    placeholder="Contoh: Ijazah S1 & Sertifikat Pendidik (Terverifikasi)"
                    className="form-input"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ color: 'var(--emerald-900)' }}>Bio / Pengalaman Mengajar:</label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="form-textarea"
                  />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-primary">
                <Save size={16} /> Simpan Perubahan Profil
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
