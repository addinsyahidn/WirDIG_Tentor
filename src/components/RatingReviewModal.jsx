import React, { useState } from 'react';
import { Star, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RatingReviewModal = ({ booking, isOpen, onClose }) => {
  const { currentUser, submitReview, currentRole } = useApp();
  const [rating, setRating] = useState(5);
  const [clarity, setClarity] = useState(5);
  const [punctuality, setPunctuality] = useState(5);
  const [friendliness, setFriendliness] = useState(5);
  const [comment, setComment] = useState('');
  const [tutorFeedbackComment, setTutorFeedbackComment] = useState('');

  if (!isOpen || !booking) return null;

  const isStudent = currentRole === 'student';

  const handleSubmit = (e) => {
    e.preventDefault();
    submitReview({
      bookingId: booking.id,
      tutorId: booking.tutorId,
      studentId: booking.studentId,
      rating,
      criteria: { clarity, punctuality, friendliness },
      comment: isStudent ? comment : 'Review dari tentor untuk murid.',
      tutorFeedback: !isStudent
        ? {
            rating,
            comment: tutorFeedbackComment || comment,
          }
        : null,
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '520px', padding: '1.75rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--amber-50)',
              color: 'var(--amber-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Star size={24} fill="currentColor" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>
                {isStudent ? 'Beri Penilaian untuk Tentor' : 'Beri Penilaian untuk Murid'}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                Sesi: {booking.subject}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--slate-400)' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Overall Rating Star Picker */}
          <div style={{ textAlign: 'center', margin: '1.25rem 0' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--slate-700)', marginBottom: '0.5rem' }}>
              Rating Keseluruhan:
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: star <= rating ? 'var(--amber-400)' : 'var(--slate-300)',
                    transition: 'transform 0.15s',
                  }}
                >
                  <Star size={34} fill={star <= rating ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
          </div>

          {/* Criteria Breakdown */}
          {isStudent && (
            <div style={{
              backgroundColor: 'var(--slate-50)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--slate-200)',
              marginBottom: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--slate-700)' }}>Kejelasan Penjelasan & Materi:</span>
                <select
                  value={clarity}
                  onChange={(e) => setClarity(Number(e.target.value))}
                  className="form-select"
                  style={{ width: '100px', padding: '0.3rem 0.5rem' }}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                  <option value={4}>⭐⭐⭐⭐ (4)</option>
                  <option value={3}>⭐⭐⭐ (3)</option>
                  <option value={2}>⭐⭐ (2)</option>
                  <option value={1}>⭐ (1)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--slate-700)' }}>Ketepatan Waktu & Kedisiplinan:</span>
                <select
                  value={punctuality}
                  onChange={(e) => setPunctuality(Number(e.target.value))}
                  className="form-select"
                  style={{ width: '100px', padding: '0.3rem 0.5rem' }}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                  <option value={4}>⭐⭐⭐⭐ (4)</option>
                  <option value={3}>⭐⭐⭐ (3)</option>
                  <option value={2}>⭐⭐ (2)</option>
                  <option value={1}>⭐ (1)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--slate-700)' }}>Keramahan & Kesabaran Pengajar:</span>
                <select
                  value={friendliness}
                  onChange={(e) => setFriendliness(Number(e.target.value))}
                  className="form-select"
                  style={{ width: '100px', padding: '0.3rem 0.5rem' }}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                  <option value={4}>⭐⭐⭐⭐ (4)</option>
                  <option value={3}>⭐⭐⭐ (3)</option>
                  <option value={2}>⭐⭐ (2)</option>
                  <option value={1}>⭐ (1)</option>
                </select>
              </div>
            </div>
          )}

          {/* Written Feedback */}
          <div className="form-group">
            <label className="form-label">
              {isStudent ? 'Tulis Ulasan / Testimoni Anda:' : 'Catatan untuk Murid & Semangat Belajar:'}
            </label>
            <textarea
              rows={4}
              required
              placeholder={isStudent ? 'Ceritakan pengalaman belajar Anda dengan tentor ini...' : 'Berikan feedback positif atau catatan materi yang perlu diperdalam...'}
              value={isStudent ? comment : tutorFeedbackComment}
              onChange={(e) => isStudent ? setComment(e.target.value) : setTutorFeedbackComment(e.target.value)}
              className="form-textarea"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.25rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <Sparkles size={16} /> Kirim Review 2 Arah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
