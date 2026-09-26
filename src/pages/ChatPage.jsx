import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Video,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ChatPage = () => {
  const {
    chatThreads,
    currentUser,
    users,
    sendMessage,
  } = useApp();

  const myThreads = chatThreads.filter((t) => t.participants.includes(currentUser.id));
  const [selectedThreadId, setSelectedThreadId] = useState(myThreads[0]?.id || null);
  const [inputMessage, setInputMessage] = useState('');

  const activeThread = chatThreads.find((t) => t.id === selectedThreadId) || myThreads[0];
  const otherUserId = activeThread?.participants.find((id) => id !== currentUser.id);
  const otherUser = users.find((u) => u.id === otherUserId);

  const handleSend = (e) => {
    e.preventDefault();
    if (activeThread && inputMessage.trim()) {
      sendMessage(activeThread.id, inputMessage);
      setInputMessage('');
    }
  };

  const handleQuickInsertLink = (platform) => {
    let link = '';
    if (platform === 'gmeet') link = 'https://meet.google.com/tt-room-sesi-belajar';
    else if (platform === 'zoom') link = 'https://zoom.us/j/9876543210';
    else if (platform === 'discord') link = 'https://discord.gg/temantutor-live-room';

    setInputMessage((prev) => (prev ? `${prev} ${link}` : `Ini link sesi pembelajaran kita: ${link}`));
  };

  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: 'calc(100vh - 4.5rem)', padding: '2rem 0 3rem' }}>
      <div className="container-custom">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem',
          height: '75vh',
        }}
        className="chat-layout"
        >
          {/* Left Sidebar: Threads List */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--slate-200)', backgroundColor: 'var(--slate-50)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', fontSize: '1rem', color: 'var(--slate-900)' }}>
                <MessageSquare size={18} color="var(--primary-600)" /> Pesan & Koordinasi Belajar
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
              {myThreads.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--slate-400)', fontSize: '0.85rem' }}>
                  Belum ada percakapan aktif.
                </div>
              ) : (
                myThreads.map((thread) => {
                  const partnerId = thread.participants.find((id) => id !== currentUser.id);
                  const partner = users.find((u) => u.id === partnerId);
                  const isSelected = thread.id === activeThread?.id;

                  return (
                    <div
                      key={thread.id}
                      onClick={() => setSelectedThreadId(thread.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: isSelected ? 'var(--primary-50)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                        marginBottom: '0.25rem',
                        borderLeft: isSelected ? '3px solid var(--primary-600)' : '3px solid transparent',
                      }}
                    >
                      <img
                        src={partner?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                        alt=""
                        style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: '700', fontSize: '0.85rem', color: isSelected ? 'var(--primary-800)' : 'var(--slate-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {partner?.name || 'Pengguna'}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.725rem', color: 'var(--slate-500)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '0.1rem' }}>
                          {thread.lastMessage || 'Percakapan baru'}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Pane: Active Chat Conversation */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {activeThread && otherUser ? (
              <>
                {/* Chat Top Header */}
                <div style={{
                  padding: '0.85rem 1.25rem',
                  borderBottom: '1px solid var(--slate-200)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'white'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={otherUser.avatar}
                      alt={otherUser.name}
                      style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--slate-900)' }}>
                          {otherUser.name}
                        </span>
                        {activeThread.isMinorSafetyFlagged && (
                          <span className="badge badge-rose" style={{ fontSize: '0.65rem' }}>
                            <UserCheck size={12} /> Minor (Didampingi Ortu)
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--slate-500)' }}>
                        {otherUser.role === 'tutor' ? 'Tentor' : 'Murid'} • {otherUser.phone || otherUser.email}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Connection Note */}
                <div style={{
                  padding: '0.6rem 1.25rem',
                  backgroundColor: '#f0fdf4',
                  borderBottom: '1px solid #bbf7d0',
                  fontSize: '0.75rem',
                  color: '#166534',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                  <span>
                    <strong>Terhubung Langsung:</strong> Silakan koordinasikan jadwal belajar, materi, link meeting, atau nomor WhatsApp langsung dengan nyaman.
                  </span>
                </div>

                {/* Messages Body */}
                <div style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  backgroundColor: 'var(--slate-50)'
                }}>
                  {activeThread.messages.map((msg) => {
                    const isMe = msg.senderId === currentUser.id;

                    return (
                      <div
                        key={msg.id}
                        style={{
                          alignSelf: isMe ? 'flex-end' : 'flex-start',
                          maxWidth: '75%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: isMe ? 'flex-end' : 'flex-start',
                        }}
                      >
                        <div style={{
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-lg)',
                          backgroundColor: isMe ? 'var(--primary-600)' : 'white',
                          color: isMe ? 'white' : 'var(--slate-800)',
                          boxShadow: 'var(--shadow-sm)',
                          fontSize: '0.875rem',
                          lineHeight: '1.45',
                          border: isMe ? 'none' : '1px solid var(--slate-200)',
                          borderBottomRightRadius: isMe ? '4px' : 'var(--radius-lg)',
                          borderBottomLeftRadius: !isMe ? '4px' : 'var(--radius-lg)',
                        }}>
                          {msg.text}
                        </div>

                        <div style={{ fontSize: '0.65rem', color: 'var(--slate-400)', marginTop: '0.2rem', padding: '0 0.25rem' }}>
                          {msg.senderName} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Shortcuts Bar for Meeting Links */}
                <div style={{
                  padding: '0.4rem 1rem',
                  backgroundColor: 'white',
                  borderTop: '1px solid var(--slate-200)',
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center',
                  fontSize: '0.75rem',
                }}>
                  <span style={{ color: 'var(--slate-400)', fontWeight: '600' }}>Sisipkan Link:</span>
                  <button
                    type="button"
                    onClick={() => handleQuickInsertLink('gmeet')}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                  >
                    <Video size={12} color="var(--primary-600)" /> Google Meet
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickInsertLink('zoom')}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                  >
                    <Video size={12} color="var(--primary-600)" /> Zoom
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickInsertLink('discord')}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                  >
                    Discord
                  </button>
                </div>

                {/* Input Send Area */}
                <form onSubmit={handleSend} style={{
                  padding: '0.85rem 1rem',
                  backgroundColor: 'white',
                  borderTop: '1px solid var(--slate-100)',
                  display: 'flex',
                  gap: '0.5rem'
                }}>
                  <input
                    type="text"
                    placeholder="Ketik pesan untuk koordinasi jadwal & materi..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="form-input"
                    style={{ borderRadius: 'var(--radius-full)' }}
                  />
                  <button type="submit" className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)', padding: '0.65rem 1.25rem' }}>
                    <Send size={16} />
                  </button>
                </form>
              </>
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--slate-400)' }}>
                Pilih salah satu percakapan di sebelah kiri.
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .chat-layout {
            grid-template-columns: 320px 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
