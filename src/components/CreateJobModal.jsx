import React, { useState } from 'react';
import {
  Briefcase,
  X,
  PlusCircle,
  Calendar,
  Clock,
  BookOpen,
  Coins,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatRupiah } from '../utils/pricing';

export const CreateJobModal = ({ isOpen, onClose }) => {
  const {
    createJobRequest,
    subjectCategories,
    educationLevels,
    teachingPlatforms,
    currentUser,
    setActiveTokenModal,
  } = useApp();

  const [title, setTitle] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Matematika');
  const [customSubject, setCustomSubject] = useState('');
  const [level, setLevel] = useState('sma');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [feePerSession, setFeePerSession] = useState(100000);
  const [preferredPlatforms, setPreferredPlatforms] = useState(['google_meet']);
  const [preferredSchedule, setPreferredSchedule] = useState('Sore (16:00 - 18:00 WIB)');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const activeSubjectName = customSubject.trim() || selectedSubject;

  const togglePlatform = (platId) => {
    if (preferredPlatforms.includes(platId)) {
      if (preferredPlatforms.length > 1) {
        setPreferredPlatforms(preferredPlatforms.filter((p) => p !== platId));
      }
    } else {
      setPreferredPlatforms([...preferredPlatforms, platId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createJobRequest({
      title: title.trim() || `Butuh Tentor ${activeSubjectName} (${durationMinutes} Menit/Sesi)`,
      subject: activeSubjectName,
      level,
      feePerSession: Number(feePerSession) || 100000,
      durationMinutes: Number(durationMinutes) || 60,
      sessionCount: 1,
      preferredPlatforms,
      preferredSchedule,
      description:
        description.trim() ||
        `Mencari tentor untuk bimbingan belajar ${activeSubjectName} jenjang ${level.toUpperCase()}. Durasi ${durationMinutes} menit/sesi, fee Rp ${Number(feePerSession).toLocaleString('id-ID')}/sesi.`,
    });

    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px', padding: '1.75rem', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary-50)',
              color: 'var(--primary-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Briefcase size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                Up Kebutuhan Tentor
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', margin: '0.15rem 0 0' }}>
                Pasang kriteria les Anda di Bursa Job. Tentor yang cocok akan melamar dan menghubungi Anda langsung.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--slate-400)' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Mapel & Jenjang */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontWeight: '700' }}>
                <BookOpen size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Mata Pelajaran (Mapel):
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  if (e.target.value !== 'Lainnya') setCustomSubject('');
                }}
                className="form-select"
              >
                {subjectCategories.flatMap((cat) =>
                  cat.subjects.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({cat.name})
                    </option>
                  ))
                )}
                <option value="Lainnya">+ Tulis Mapel Lainnya</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontWeight: '700' }}>
                Jenjang Pendidikan:
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="form-select"
              >
                {educationLevels.map((lvl) => (
                  <option key={lvl.id} value={lvl.id}>
                    {lvl.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedSubject === 'Lainnya' && (
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Tulis Nama Mapel / Keahlian Khusus:</label>
              <input
                type="text"
                required
                placeholder="Contoh: Coding Python Anak, Robotika SMP, Akuntansi Keuangan"
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                className="form-input"
              />
            </div>
          )}

          {/* Judul Permintaan */}
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label className="form-label" style={{ fontWeight: '700' }}>
              Judul / Target Belajar:
            </label>
            <input
              type="text"
              placeholder={`Contoh: Butuh Tentor ${activeSubjectName} Persiapan Ujian / Tugas`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
            />
          </div>

          {/* Deskripsi Kebutuhan */}
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label className="form-label" style={{ fontWeight: '700' }}>
              Deskripsi Kebutuhan & Target Belajar:
            </label>
            <textarea
              rows={3}
              required
              placeholder="Jelaskan materi yang ingin dipelajari, kendala yang dihadapi, apakah butuh bimbingan intensif dari dasar, dsb."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
            />
          </div>

          {/* Durasi & Fee per Sesi */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.85rem',
            backgroundColor: 'var(--slate-50)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--slate-200)',
            marginBottom: '1rem',
          }}>
            <div>
              <label className="form-label" style={{ fontWeight: '700' }}>
                <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Durasi Tiap Sesi:
              </label>
              <select
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="form-select"
              >
                <option value={45}>45 Menit</option>
                <option value={60}>60 Menit (1 Jam)</option>
                <option value={90}>90 Menit (1.5 Jam)</option>
                <option value={120}>120 Menit (2 Jam)</option>
              </select>
            </div>

            <div>
              <label className="form-label" style={{ fontWeight: '700' }}>
                Fee yang Ditawarkan (per sesi):
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ fontWeight: '700', color: 'var(--slate-500)', fontSize: '0.85rem' }}>Rp</span>
                <input
                  type="number"
                  step="10000"
                  min="20000"
                  required
                  value={feePerSession}
                  onChange={(e) => setFeePerSession(Number(e.target.value) || 0)}
                  className="form-input"
                  style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--primary-700)' }}
                />
              </div>
            </div>
          </div>

          {/* Preferred Schedule & Platform */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.25rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontWeight: '700' }}>
                <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Prakiraan Jadwal:
              </label>
              <input
                type="text"
                placeholder="Contoh: Senin & Rabu 16:30"
                value={preferredSchedule}
                onChange={(e) => setPreferredSchedule(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontWeight: '700' }}>
                Platform / Media:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {teachingPlatforms.map((plat) => {
                  const isSelected = preferredPlatforms.includes(plat.id);
                  return (
                    <button
                      key={plat.id}
                      type="button"
                      onClick={() => togglePlatform(plat.id)}
                      style={{
                        padding: '0.3rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        border: isSelected ? '1.5px solid var(--primary-600)' : '1px solid var(--slate-200)',
                        backgroundColor: isSelected ? 'var(--primary-50)' : 'white',
                        color: isSelected ? 'var(--primary-700)' : 'var(--slate-700)',
                        fontSize: '0.725rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      {plat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Token Cost Notice */}
          <div style={{
            backgroundColor: (currentUser?.tokens ?? 0) < 1 ? '#fef2f2' : '#f0fdf4',
            border: (currentUser?.tokens ?? 0) < 1 ? '1px solid #fecaca' : '1px solid #bbf7d0',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Coins size={18} color={(currentUser?.tokens ?? 0) < 1 ? '#ef4444' : '#16a34a'} />
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: '800', color: (currentUser?.tokens ?? 0) < 1 ? '#991b1b' : '#166534' }}>
                  Biaya Publikasi: 1 Token Kredit
                </div>
                <div style={{ fontSize: '0.725rem', color: (currentUser?.tokens ?? 0) < 1 ? '#b91c1c' : '#15803d' }}>
                  Saldo Token Anda: <strong>{currentUser?.tokens ?? 0} Token</strong>
                </div>
              </div>
            </div>

            {(currentUser?.tokens ?? 0) < 1 && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setActiveTokenModal(true);
                }}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem', color: '#b91c1c', borderColor: '#fca5a5', backgroundColor: '#ffffff' }}
              >
                + Beli Token QRIS (Rp 3.000)
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', borderTop: '1px solid var(--slate-200)', paddingTop: '1rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Batal
            </button>

            {(currentUser?.tokens ?? 0) < 1 ? (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setActiveTokenModal(true);
                }}
                className="btn btn-emerald"
                style={{ padding: '0.65rem 1.4rem' }}
              >
                <Coins size={15} /> Beli Token QRIS Dulu
              </button>
            ) : (
              <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1.4rem' }}>
                <PlusCircle size={15} /> Publikasikan Tawaran (-1 Token)
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
