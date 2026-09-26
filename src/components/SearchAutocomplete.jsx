import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Search, BookOpen, User, Sparkles, X, ChevronRight, Star, ShieldCheck } from 'lucide-react';
import { SUBJECT_CATEGORIES, EDUCATION_LEVELS } from '../data/initialData';
import { formatRupiah } from '../utils/pricing';

export const SearchAutocomplete = ({
  placeholder = "Ketik mapel (Matematika, Fisika, UTBK, Coding, dll)...",
  initialValue = "",
  onSelectSubject,
  onSelectTutor,
  showTutors = true,
  autoFocus = false,
  className = "",
  style = {},
  inputStyle = {},
  variant = "hero", // 'hero' | 'compact' | 'sidebar'
}) => {
  const { users } = useApp();
  const navigate = useNavigate();

  const [query, setQuery] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Sync initialValue if changed
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  // Extract all subjects from categories
  const allSubjects = React.useMemo(() => {
    const list = [];
    SUBJECT_CATEGORIES.forEach((cat) => {
      cat.subjects.forEach((subj) => {
        list.push({
          id: subj.id,
          name: subj.name,
          categoryName: cat.name,
        });
      });
    });
    return list;
  }, []);

  // Filter tutors
  const allTutors = React.useMemo(() => {
    return users.filter((u) => u.role === 'tutor' && u.tutorProfile);
  }, [users]);

  // Compute matched items
  const suggestions = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    
    // If empty query, show popular subjects and top tutors
    if (!q) {
      return {
        popular: [
          { type: 'subject', id: 'matematika', name: 'Matematika', categoryName: 'MIPA', tag: '🔥 Populer' },
          { type: 'subject', id: 'fisika', name: 'Fisika', categoryName: 'MIPA', tag: '🔥 Populer' },
          { type: 'subject', id: 'inggris', name: 'Bahasa Inggris', categoryName: 'Bahasa', tag: '🔥 Populer' },
          { type: 'subject', id: 'utbk_snbt', name: 'UTBK / SNBT', categoryName: 'Persiapan Ujian', tag: '🔥 Top Search' },
          { type: 'subject', id: 'python_data', name: 'Python & Data Science', categoryName: 'IT & Coding', tag: '💻 Trending' },
        ],
        subjects: [],
        tutors: allTutors.slice(0, 3).map((t) => ({
          type: 'tutor',
          id: t.id,
          name: t.name,
          avatar: t.avatar,
          subjects: t.tutorProfile?.subjects || [],
          rating: t.tutorProfile?.rating || 5.0,
          hourlyRateNet: t.tutorProfile?.hourlyRateNet,
          isVerified: t.tutorProfile?.isVerified,
        })),
      };
    }

    // Match subjects
    const matchedSubjects = allSubjects
      .filter((s) => s.name.toLowerCase().includes(q) || s.categoryName.toLowerCase().includes(q))
      .slice(0, 5)
      .map((s) => ({ type: 'subject', ...s }));

    // Match tutors by name or subject
    const matchedTutors = showTutors
      ? allTutors
          .filter((t) => {
            const matchName = t.name.toLowerCase().includes(q);
            const matchSubject = t.tutorProfile?.subjects.some((subj) => subj.toLowerCase().includes(q));
            const matchBio = (t.tutorProfile?.bio || '').toLowerCase().includes(q);
            return matchName || matchSubject || matchBio;
          })
          .slice(0, 4)
          .map((t) => ({
            type: 'tutor',
            id: t.id,
            name: t.name,
            avatar: t.avatar,
            subjects: t.tutorProfile?.subjects || [],
            rating: t.tutorProfile?.rating || 5.0,
            hourlyRateNet: t.tutorProfile?.hourlyRateNet,
            isVerified: t.tutorProfile?.isVerified,
          }))
      : [];

    return {
      popular: [],
      subjects: matchedSubjects,
      tutors: matchedTutors,
    };
  }, [query, allSubjects, allTutors, showTutors]);

  // Flat list for keyboard navigation
  const flatSuggestions = React.useMemo(() => {
    if (!query.trim()) {
      return [...suggestions.popular, ...suggestions.tutors];
    }
    return [...suggestions.subjects, ...suggestions.tutors];
  }, [suggestions, query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectItem = (item) => {
    if (item.type === 'subject') {
      setQuery(item.name);
      setIsOpen(false);
      if (onSelectSubject) {
        onSelectSubject(item.name);
      } else {
        navigate(`/job-board?subject=${encodeURIComponent(item.name)}`);
      }
    } else if (item.type === 'tutor') {
      setIsOpen(false);
      if (onSelectTutor) {
        onSelectTutor(item);
      } else {
        navigate(`/job-board?search=${encodeURIComponent(item.name)}`);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < flatSuggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : flatSuggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < flatSuggestions.length) {
        e.preventDefault();
        handleSelectItem(flatSuggestions[selectedIndex]);
      } else if (query.trim()) {
        setIsOpen(false);
        if (onSelectSubject) {
          onSelectSubject(query.trim());
        } else {
          navigate(`/job-board?subject=${encodeURIComponent(query.trim())}`);
        }
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const hasResults = flatSuggestions.length > 0;

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', ...style }}>
      {/* Input Box */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
        <Search
          size={variant === 'hero' ? 16 : 14}
          color="var(--slate-400)"
          style={{ position: 'absolute', left: '0.65rem', pointerEvents: 'none', zIndex: 1 }}
        />
        
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
            if (onSelectSubject && variant === 'sidebar') {
              onSelectSubject(e.target.value);
            }
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className={variant === 'hero' ? '' : 'form-input'}
          style={{
            width: '100%',
            paddingLeft: '2.1rem',
            paddingRight: query ? '2rem' : '0.75rem',
            fontSize: variant === 'hero' ? '0.9rem' : '0.825rem',
            outline: 'none',
            border: variant === 'hero' ? 'none' : undefined,
            backgroundColor: variant === 'hero' ? 'transparent' : 'white',
            color: 'var(--slate-900)',
            fontWeight: '500',
            ...inputStyle,
          }}
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSelectedIndex(-1);
              if (onSelectSubject) onSelectSubject('');
              inputRef.current?.focus();
            }}
            style={{
              position: 'absolute',
              right: '0.5rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--slate-400)',
              padding: '0.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Hapus pencarian"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 12px 28px -4px rgba(0, 0, 0, 0.15), 0 4px 10px -2px rgba(0, 0, 0, 0.08)',
            border: '1px solid var(--slate-200)',
            zIndex: 1000,
            maxHeight: '380px',
            overflowY: 'auto',
            textAlign: 'left',
          }}
        >
          {!hasResults ? (
            <div style={{ padding: '1.25rem 1rem', textAlign: 'center', color: 'var(--slate-500)', fontSize: '0.825rem' }}>
              <p style={{ fontWeight: '600', color: 'var(--slate-700)', marginBottom: '0.25rem' }}>
                Tidak ada hasil untuk "{query}"
              </p>
              <p style={{ fontSize: '0.75rem' }}>Coba cari nama mapel umum seperti Matematika, Fisika, atau Bahasa Inggris.</p>
            </div>
          ) : (
            <div style={{ padding: '0.4rem' }}>
              {/* If empty query: Popular Suggestions */}
              {!query.trim() && suggestions.popular.length > 0 && (
                <div style={{ marginBottom: '0.5rem' }}>
                  <div style={{ padding: '0.35rem 0.6rem', fontSize: '0.7rem', fontWeight: '700', color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    🔥 Rekomendasi & Paling Dicari
                  </div>
                  {suggestions.popular.map((item, idx) => {
                    const isSelected = selectedIndex === idx;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectItem(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.5rem 0.65rem',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: isSelected ? 'var(--primary-50)' : 'transparent',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: 'var(--primary-100)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <BookOpen size={12} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.825rem', fontWeight: '600', color: isSelected ? 'var(--primary-700)' : 'var(--slate-800)' }}>
                              {item.name}
                            </div>
                            <div style={{ fontSize: '0.675rem', color: 'var(--slate-400)' }}>
                              Kategori: {item.categoryName}
                            </div>
                          </div>
                        </div>
                        <span style={{ fontSize: '0.675rem', backgroundColor: 'var(--amber-50)', color: 'var(--amber-800)', border: '1px solid var(--amber-200)', padding: '0.1rem 0.35rem', borderRadius: 'var(--radius-sm)', fontWeight: '600' }}>
                          {item.tag}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Matched Subjects */}
              {suggestions.subjects.length > 0 && (
                <div style={{ marginBottom: '0.5rem' }}>
                  <div style={{ padding: '0.35rem 0.6rem', fontSize: '0.7rem', fontWeight: '700', color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    📚 Mata Pelajaran
                  </div>
                  {suggestions.subjects.map((item, idx) => {
                    const isSelected = selectedIndex === idx;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectItem(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.5rem 0.65rem',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: isSelected ? 'var(--primary-50)' : 'transparent',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: 'var(--primary-100)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <BookOpen size={12} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.825rem', fontWeight: '600', color: isSelected ? 'var(--primary-700)' : 'var(--slate-800)' }}>
                              {item.name}
                            </div>
                            <div style={{ fontSize: '0.675rem', color: 'var(--slate-400)' }}>
                              Kategori: {item.categoryName}
                            </div>
                          </div>
                        </div>
                        <ChevronRight size={13} color="var(--slate-400)" />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Matched Tutors */}
              {suggestions.tutors.length > 0 && (
                <div>
                  <div style={{ padding: '0.35rem 0.6rem', fontSize: '0.7rem', fontWeight: '700', color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    👨‍🏫 Profil Tentor
                  </div>
                  {suggestions.tutors.map((item, idx) => {
                    const globalIdx = (!query.trim() ? suggestions.popular.length : suggestions.subjects.length) + idx;
                    const isSelected = selectedIndex === globalIdx;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectItem(item)}
                        onMouseEnter={() => setSelectedIndex(globalIdx)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.5rem 0.65rem',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: isSelected ? 'var(--emerald-50)' : 'transparent',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <img
                            src={item.avatar}
                            alt={item.name}
                            style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                              <span style={{ fontSize: '0.825rem', fontWeight: '700', color: isSelected ? 'var(--emerald-800)' : 'var(--slate-900)' }}>
                                {item.name}
                              </span>
                              {item.isVerified && (
                                <ShieldCheck size={12} color="var(--emerald-600)" />
                              )}
                            </div>
                            <div style={{ fontSize: '0.675rem', color: 'var(--slate-500)' }}>
                              {item.subjects.slice(0, 2).join(', ')} • ⭐ {item.rating}
                            </div>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '0.725rem', fontWeight: '700', color: 'var(--emerald-700)' }}>
                            {formatRupiah(item.hourlyRateNet)}/jam
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
