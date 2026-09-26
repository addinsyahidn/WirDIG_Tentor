import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USERS,
  INITIAL_JOB_REQUESTS,
  INITIAL_REVIEWS,
  INITIAL_CHAT_THREADS,
  INITIAL_NOTIFICATIONS,
  INITIAL_SUBJECT_REQUESTS,
  SUBJECT_CATEGORIES,
  EDUCATION_LEVELS,
  TEACHING_PLATFORMS,
} from '../data/initialData';
import {
  saveUserToGoogleSheet,
  exportUsersToSpreadsheetCSV,
  exportSingleJobToSpreadsheetCSV,
  exportAllJobsWithApplicantsCSV,
  getSheetWebhookUrl,
  setSheetWebhookUrl,
} from '../services/sheetService';

const AppContext = createContext();

const STORAGE_KEYS = {
  USERS: 'wirdig_tentor_users_v3',
  CURRENT_USER_ID: 'wirdig_tentor_current_user_id_v3',
  CURRENT_ROLE: 'wirdig_tentor_current_role_v3',
  JOBS: 'wirdig_tentor_jobs_v3',
  REVIEWS: 'wirdig_tentor_reviews_v3',
  CHATS: 'wirdig_tentor_chats_v3',
  NOTIFICATIONS: 'wirdig_tentor_notifications_v3',
  SUBJECT_REQUESTS: 'wirdig_tentor_subject_requests_v3',
  CUSTOM_SUBJECT_CATEGORIES: 'wirdig_tentor_custom_categories_v3',
};

export const AppProvider = ({ children }) => {
  // 1. Initial State Loaders with LocalStorage persistence
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    const rawUsers = saved ? JSON.parse(saved) : INITIAL_USERS;
    return rawUsers.map((u) => ({
      ...u,
      tokens: u.tokens !== undefined ? u.tokens : 3, // Bonus token awal
    }));
  });

  const [subjectCategories, setSubjectCategories] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_SUBJECT_CATEGORIES);
    return saved ? JSON.parse(saved) : SUBJECT_CATEGORIES;
  });

  const [subjectRequests, setSubjectRequests] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUBJECT_REQUESTS);
    return saved ? JSON.parse(saved) : INITIAL_SUBJECT_REQUESTS;
  });

  const [currentUserId, setCurrentUserId] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
    if (!saved || saved === 'null' || saved === 'undefined') return null;
    return saved;
  });

  const [currentRole, setCurrentRole] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_ROLE);
    if (!saved || saved === 'null' || saved === 'undefined') return null;
    return saved;
  });

  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.JOBS);
    return saved ? JSON.parse(saved) : INITIAL_JOB_REQUESTS;
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [chatThreads, setChatThreads] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CHATS);
    return saved ? JSON.parse(saved) : INITIAL_CHAT_THREADS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // UI States
  const [activeTokenModal, setActiveTokenModal] = useState(false); // Token purchase modal
  const [toastMessage, setToastMessage] = useState(null);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUserId) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    }
  }, [currentUserId]);

  useEffect(() => {
    if (currentRole) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, currentRole);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_ROLE);
    }
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chatThreads));
  }, [chatThreads]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_SUBJECT_CATEGORIES, JSON.stringify(subjectCategories));
  }, [subjectCategories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBJECT_REQUESTS, JSON.stringify(subjectRequests));
  }, [subjectRequests]);

  // Current active user object
  const currentUser = currentUserId ? users.find((u) => u.id === currentUserId) || null : null;

  // Helper Toast
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Helper Add Notification
  const addNotification = ({ userId, title, message, type = 'info', link = '/' }) => {
    const newNotif = {
      id: `notif_${Date.now()}`,
      userId,
      title,
      message,
      type,
      link,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // 2. User & Auth Actions
  const loginUser = (identifier, password) => {
    const trimId = identifier.trim().toLowerCase();
    const foundUser = users.find(
      (u) =>
        u.email?.toLowerCase() === trimId ||
        u.username?.toLowerCase() === trimId ||
        u.name?.toLowerCase() === trimId
    );

    if (!foundUser) {
      return { success: false, message: 'Akun tidak ditemukan. Periksa kembali email/username kamu.' };
    }

    if (foundUser.role === 'admin') {
      const adminPassword = foundUser.password || 'admin@WirDIG2024';
      if (password !== adminPassword) {
        return { success: false, message: 'Password admin salah.' };
      }
    } else {
      const expectedPassword = foundUser.password || 'password123';
      if (password !== expectedPassword) {
        return { success: false, message: 'Password salah. Coba lagi.' };
      }
    }

    setCurrentUserId(foundUser.id);
    setCurrentRole(foundUser.role);
    return { success: true, user: foundUser };
  };

  const logoutUser = () => {
    setCurrentUserId(null);
    setCurrentRole(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_ROLE);
    showToast('Kamu telah keluar dari akun.', 'info');
  };

  const switchUser = (userId, role = null) => {
    const targetUser = users.find((u) => u.id === userId);
    if (!targetUser) return;
    setCurrentUserId(userId);
    if (role) {
      setCurrentRole(role);
    } else {
      setCurrentRole(targetUser.role === 'admin' ? 'admin' : targetUser.role);
    }
    showToast(`Beralih akun ke: ${targetUser.name} (${role || targetUser.role})`, 'info');
  };

  const switchRole = (newRole) => {
    if (newRole === 'admin' && currentUser?.role !== 'admin') return;
    setCurrentRole(newRole);
    showToast(`Mode aktif diubah ke: ${newRole === 'student' ? 'Murid' : newRole === 'tutor' ? 'Tentor' : 'Admin'}`, 'info');
  };

  const registerUser = (userData) => {
    const newId = `user_${Date.now()}`;
    const newUser = {
      id: newId,
      name: userData.name,
      email: userData.email,
      username: userData.username || userData.email.split('@')[0],
      password: userData.password || 'password123',
      phone: userData.phone,
      avatar: userData.avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      role: userData.role || 'student',
      userType: userData.isMinor ? 'minor' : 'adult',
      educationLevel: userData.educationLevel || 'sma',
      city: userData.city || 'Jakarta',
      tokens: 3, // Bonus 3 token pendaftaran
      parentContact: userData.isMinor
        ? {
            parentName: userData.parentName,
            parentPhone: userData.parentPhone,
            parentEmail: userData.parentEmail || '',
            relation: userData.parentRelation || 'Orang Tua',
            consentApproved: true,
          }
        : null,
      tutorProfile:
        userData.role === 'tutor'
          ? {
              headline: userData.headline || 'Tentor Berdedikasi',
              bio: userData.bio || '',
              subjects: userData.subjects || ['Matematika'],
              levels: userData.levels || ['sd', 'smp', 'sma'],
              hourlyRateNet: Number(userData.hourlyRateNet) || 100000,
              platforms: userData.platforms || ['google_meet', 'zoom'],
              city: userData.city || 'Jakarta',
              rating: 5.0,
              reviewCount: 0,
              completedSessionsCount: 0,
              education: userData.education || 'Sarjana Pendidikan',
              certificate: userData.certificate || userData.diplomaName || 'Ijazah / Sertifikat Terlampir',
              experienceYears: Number(userData.experienceYears) || 1,
            }
          : null,
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUserId(newId);
    setCurrentRole(newUser.role);
    showToast(`Registrasi berhasil! Selamat datang di WirDIG, ${newUser.name}.`);
    return newUser;
  };

  const updateProfile = (userId, updatedData) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            ...updatedData,
            tutorProfile: updatedData.tutorProfile
              ? { ...u.tutorProfile, ...updatedData.tutorProfile }
              : u.tutorProfile,
          };
        }
        return u;
      })
    );
    showToast('Profil berhasil diperbarui!');
  };

  // 3. Token System Actions
  const buyTokens = (amount, price, paymentMethod = 'QRIS GoPay Merchant') => {
    if (!currentUser) return;
    const currentTokens = currentUser.tokens !== undefined ? currentUser.tokens : 3;
    const newTokens = currentTokens + amount;

    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, tokens: newTokens } : u))
    );

    addNotification({
      userId: currentUser.id,
      title: '🪙 Top Up Token Berhasil!',
      message: `Selamat, +${amount} Token telah berhasil ditambahkan ke akun Anda via ${paymentMethod}. Total saldo: ${newTokens} Token.`,
      type: 'token_purchased',
      link: currentUser.role === 'student' ? '/student/dashboard' : '/tutor/dashboard',
    });

    showToast(`Berhasil membeli +${amount} Token (${paymentMethod})!`, 'success');
  };

  const deductToken = (amount = 1, purpose = 'Pengajuan') => {
    if (!currentUser) return { success: false, reason: 'unauthenticated' };
    const currentTokens = currentUser.tokens !== undefined ? currentUser.tokens : 3;

    if (currentTokens < amount) {
      setActiveTokenModal(true);
      showToast('Token Anda tidak mencukupi (Sisa 0). Silakan top up token lewat QRIS terlebih dahulu.', 'warning');
      return { success: false, reason: 'insufficient_tokens' };
    }

    const newTokens = currentTokens - amount;
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, tokens: newTokens } : u))
    );

    return { success: true, remainingTokens: newTokens };
  };

  // 4. Job Requests (Bursa Job & Up Kebutuhan)
  const createJobRequest = (jobData) => {
    const tokenCheck = deductToken(1, 'Up Kebutuhan Tentor');
    if (!tokenCheck.success) {
      return null;
    }

    const feePerSession = Number(jobData.feePerSession) || 100000;
    const sessionCount = Number(jobData.sessionCount) || 1;
    const totalStudentPrice = feePerSession * sessionCount;

    const newJob = {
      id: `job_${Date.now()}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email || '',
      studentPhone: currentUser.phone || '',
      studentAvatar: currentUser.avatar,
      isMinor: currentUser.userType === 'minor',
      parentName: currentUser.parentContact?.parentName || null,
      parentPhone: currentUser.parentContact?.parentPhone || null,
      title: jobData.title,
      subject: jobData.subject,
      level: jobData.level,
      feePerSession: feePerSession,
      durationMinutes: Number(jobData.durationMinutes) || 60,
      studentInputPrice: totalStudentPrice,
      preferredPlatforms: jobData.preferredPlatforms || ['google_meet'],
      preferredSchedule: jobData.preferredSchedule,
      location: jobData.location || 'Online',
      description: jobData.description,
      sessionCount: sessionCount,
      status: 'open',
      createdAt: new Date().toISOString(),
      proposalsCount: 0,
      applicants: [],
    };

    setJobs((prev) => [newJob, ...prev]);
    showToast(`Permintaan les baru berhasil dipublikasikan! (-1 Token, sisa: ${tokenCheck.remainingTokens})`);
    return newJob;
  };

  const applyToJob = (jobId, proposalText) => {
    if (!currentUser) return false;

    const tokenCheck = deductToken(1, 'Melamar Tawaran Murid');
    if (!tokenCheck.success) {
      return false;
    }

    const applicantData = {
      id: `appl_${Date.now()}`,
      tutorId: currentUser.id,
      tutorName: currentUser.name,
      tutorAvatar: currentUser.avatar,
      tutorEmail: currentUser.email || '',
      tutorPhone: currentUser.phone || '-',
      tutorHeadline: currentUser.tutorProfile?.headline || 'Tentor Berpengalaman',
      tutorBio: currentUser.tutorProfile?.bio || '',
      tutorEducation: currentUser.tutorProfile?.education || 'Sarjana Pendidikan',
      tutorCertificate: currentUser.tutorProfile?.certificate || 'Sertifikat Kualifikasi Terlampir',
      tutorExperience: currentUser.tutorProfile?.experienceYears || 1,
      tutorCity: currentUser.city || 'Online',
      proposalText: proposalText || 'Saya siap membimbing dan mengajar sesuai kebutuhan Anda.',
      appliedAt: new Date().toISOString(),
    };

    let targetJob = null;

    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === jobId) {
          targetJob = j;
          const currentApplicants = j.applicants || [];
          const alreadyIndex = currentApplicants.findIndex((a) => a.tutorId === currentUser.id);
          let updatedApplicants;
          if (alreadyIndex >= 0) {
            updatedApplicants = [...currentApplicants];
            updatedApplicants[alreadyIndex] = applicantData;
          } else {
            updatedApplicants = [applicantData, ...currentApplicants];
          }

          return {
            ...j,
            applicants: updatedApplicants,
            proposalsCount: updatedApplicants.length,
          };
        }
        return j;
      })
    );

    if (targetJob) {
      addNotification({
        userId: targetJob.studentId,
        title: '🎉 Ada Tentor yang Menawarkan Diri!',
        message: `${currentUser.name} (${applicantData.tutorHeadline}) menawarkan diri untuk permintaan les: "${targetJob.title}". Cek deskripsi & kontaknya di Dashboard.`,
        type: 'job_proposal',
        link: '/student/dashboard',
      });
    }

    showToast(`Lamaran berhasil dikirimkan ke ${targetJob?.studentName || 'murid'}! (-1 Token, sisa: ${tokenCheck.remainingTokens})`);
    return true;
  };

  // 5. Reviews & Ratings
  const submitReview = ({ tutorId, studentId, rating, criteria, comment, tutorFeedback }) => {
    const newRev = {
      id: `rev_${Date.now()}`,
      tutorId,
      studentId: studentId || currentUser.id,
      studentName: currentUser.name,
      studentAvatar: currentUser.avatar,
      rating: Number(rating) || 5,
      criteria: criteria || { clarity: 5, punctuality: 5, friendliness: 5 },
      comment,
      createdAt: new Date().toISOString(),
      tutorFeedback: tutorFeedback || null,
    };

    setReviews((prev) => [newRev, ...prev]);

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === tutorId && u.tutorProfile) {
          const tutorRevs = [...reviews.filter((r) => r.tutorId === tutorId), newRev];
          const avg =
            tutorRevs.reduce((acc, curr) => acc + curr.rating, 0) / (tutorRevs.length || 1);
          return {
            ...u,
            tutorProfile: {
              ...u.tutorProfile,
              rating: Number(avg.toFixed(2)),
              reviewCount: tutorRevs.length,
            },
          };
        }
        return u;
      })
    );

    showToast('Ulasan dan rating berhasil dikirimkan!');
  };

  // 6. Direct Chat & Communication
  const sendMessage = (threadId, text) => {
    if (!text.trim()) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    setChatThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          return {
            ...t,
            lastMessage: text.trim(),
            lastMessageTime: new Date().toISOString(),
            messages: [...t.messages, newMsg],
          };
        }
        return t;
      })
    );
  };

  const getOrCreateChatThread = (otherUserId) => {
    let thread = chatThreads.find(
      (t) =>
        t.participants.includes(currentUser.id) &&
        t.participants.includes(otherUserId)
    );

    if (!thread) {
      const otherUser = users.find((u) => u.id === otherUserId);
      thread = {
        id: `thread_${currentUser.id}_${otherUserId}_${Date.now()}`,
        participants: [currentUser.id, otherUserId],
        lastMessage: 'Percakapan dimulai.',
        lastMessageTime: new Date().toISOString(),
        isMinorSafetyFlagged: currentUser.userType === 'minor' || otherUser?.userType === 'minor',
        messages: [],
      };
      setChatThreads((prev) => [thread, ...prev]);
    }
    return thread;
  };

  // 7. Admin User Management
  const toggleUserStatus = (userId, newStatus = 'active', reason = '') => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            accountStatus: newStatus,
            suspensionReason: reason,
          };
        }
        return u;
      })
    );
    showToast(`Status pengguna berhasil diubah ke: ${newStatus}`);
  };

  // 8. Request New Subject & Moderation
  const requestNewSubject = ({ subjectName, categoryId, level, description, syllabusPoints = [] }) => {
    const targetCat = subjectCategories.find((c) => c.id === categoryId) || subjectCategories[0];
    const levelObj = EDUCATION_LEVELS.find((l) => l.id === level) || { label: level };

    const parsedSyllabus = Array.isArray(syllabusPoints)
      ? syllabusPoints
      : String(syllabusPoints || '').split('\n').map((s) => s.trim()).filter(Boolean);

    const newRequest = {
      id: `subj_req_${Date.now()}`,
      tutorId: currentUser.id,
      tutorName: currentUser.name,
      tutorAvatar: currentUser.avatar,
      subjectName: subjectName.trim(),
      categoryId: targetCat.id,
      categoryName: targetCat.name,
      level: level || 'umum',
      levelLabel: levelObj.label || 'Umum',
      description: description.trim(),
      syllabusPoints: parsedSyllabus.length > 0 ? parsedSyllabus : ['Pengenalan materi dasar', 'Studi kasus & latihan soal'],
      status: 'pending',
      createdAt: new Date().toISOString(),
      reviewedAt: null,
      adminNote: '',
    };

    setSubjectRequests((prev) => [newRequest, ...prev]);

    const adminUser = users.find((u) => u.role === 'admin');
    if (adminUser) {
      addNotification({
        userId: adminUser.id,
        title: `Pengajuan Mapel Baru: "${subjectName}"`,
        message: `Tentor ${currentUser.name} mengajukan mapel baru "${subjectName}" (${levelObj.label}). Menunggu persetujuan admin.`,
        type: 'subject_request',
        link: '/admin',
      });
    }

    showToast(`Pengajuan mapel "${subjectName}" berhasil dikirim ke Admin untuk ditinjau!`);
    return newRequest;
  };

  const adminApproveSubjectRequest = (requestId, adminNote = '') => {
    const request = subjectRequests.find((r) => r.id === requestId);
    if (!request) return;

    const subjectSlug = request.subjectName.toLowerCase().replace(/[^a-z0-9]+/g, '_');

    setSubjectCategories((prev) => {
      let foundCategory = false;
      const updated = prev.map((cat) => {
        if (cat.id === request.categoryId) {
          foundCategory = true;
          const exists = cat.subjects.some((s) => s.name.toLowerCase() === request.subjectName.toLowerCase());
          if (!exists) {
            return {
              ...cat,
              subjects: [...cat.subjects, { id: subjectSlug, name: request.subjectName }],
            };
          }
        }
        return cat;
      });

      if (!foundCategory && updated.length > 0) {
        updated[0].subjects.push({ id: subjectSlug, name: request.subjectName });
      }

      return updated;
    });

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === request.tutorId && u.tutorProfile) {
          const currentSubjects = u.tutorProfile.subjects || [];
          if (!currentSubjects.includes(request.subjectName)) {
            return {
              ...u,
              tutorProfile: {
                ...u.tutorProfile,
                subjects: [...currentSubjects, request.subjectName],
              },
            };
          }
        }
        return u;
      })
    );

    setSubjectRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: 'approved',
              reviewedAt: new Date().toISOString(),
              adminNote: adminNote || 'Disetujui oleh Admin.',
            }
          : r
      )
    );

    addNotification({
      userId: request.tutorId,
      title: `🎉 Mapel Disetujui: "${request.subjectName}"`,
      message: `Pengajuan mapel "${request.subjectName}" telah DISETUJUI oleh Admin dan sekarang aktif di katalog & profil Anda!`,
      type: 'subject_approved',
      link: '/tutor/dashboard',
    });

    showToast(`Mata pelajaran "${request.subjectName}" resmi disetujui & aktif di platform!`);
  };

  const adminRejectSubjectRequest = (requestId, adminNote = '') => {
    const request = subjectRequests.find((r) => r.id === requestId);
    if (!request) return;

    setSubjectRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: 'rejected',
              reviewedAt: new Date().toISOString(),
              adminNote: adminNote || 'Tidak memenuhi kriteria platform / duplikat.',
            }
          : r
      )
    );

    addNotification({
      userId: request.tutorId,
      title: `Pengajuan Mapel Ditolak: "${request.subjectName}"`,
      message: `Pengajuan mapel "${request.subjectName}" belum dapat disetujui. Catatan: ${adminNote || 'Tidak memenuhi panduan kurikulum / duplikasi.'}`,
      type: 'subject_rejected',
      link: '/tutor/dashboard',
    });

    showToast(`Pengajuan mapel "${request.subjectName}" telah ditolak.`);
  };

  // 9. Notifications Actions
  const markNotificationAsRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    if (!currentUser) return;
    setNotifications((prev) =>
      prev.map((n) => (n.userId === currentUser.id ? { ...n, isRead: true } : n))
    );
  };

  const value = {
    users,
    currentUser,
    currentUserId,
    currentRole,
    loginUser,
    logoutUser,
    switchUser,
    switchRole,
    registerUser,
    updateProfile,
    jobs,
    createJobRequest,
    applyToJob,
    reviews,
    submitReview,
    chatThreads,
    sendMessage,
    getOrCreateChatThread,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    toggleUserStatus,
    subjectRequests,
    requestNewSubject,
    adminApproveSubjectRequest,
    adminRejectSubjectRequest,
    activeTokenModal,
    setActiveTokenModal,
    buyTokens,
    deductToken,
    toastMessage,
    showToast,
    subjectCategories,
    educationLevels: EDUCATION_LEVELS,
    teachingPlatforms: TEACHING_PLATFORMS,
    // Spreadsheet & Database Services
    exportUsersToSpreadsheetCSV,
    exportSingleJobToSpreadsheetCSV,
    exportAllJobsWithApplicantsCSV,
    getSheetWebhookUrl,
    setSheetWebhookUrl,
    saveUserToGoogleSheet,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
