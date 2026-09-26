import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TokenPurchaseModal } from './components/TokenPurchaseModal';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { AuthPage } from './pages/AuthPage';
import { JobBoardPage } from './pages/JobBoardPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { TutorDashboard } from './pages/TutorDashboard';
import { ChatPage } from './pages/ChatPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { ProfilePage } from './pages/ProfilePage';

import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const ToastNotification = () => {
  const { toastMessage } = useApp();
  if (!toastMessage) return null;

  const messageText = typeof toastMessage === 'string' ? toastMessage : toastMessage?.message || '';
  const messageType = typeof toastMessage === 'object' && toastMessage?.type ? toastMessage.type : 'success';

  return (
    <div className="toast-container">
      <div className={`toast toast-${messageType}`}>
        {messageType === 'warning' && <AlertCircle size={18} color="var(--amber-400)" />}
        {messageType === 'error' && <AlertCircle size={18} color="var(--rose-400)" />}
        {messageType === 'info' && <Info size={18} color="var(--primary-200)" />}
        {messageType === 'success' && <CheckCircle size={18} color="var(--emerald-400)" />}
        <span>{messageText}</span>
      </div>
    </div>
  );
};

// Route Guard untuk mewajibkan login sebelum mengakses halaman
const RequireAuth = ({ children }) => {
  const { currentUserId } = useApp();
  if (!currentUserId) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Route Guard khusus Admin
const AdminGuard = () => {
  const { currentUser, currentRole } = useApp();
  if (!currentUser || currentUser.role !== 'admin') {
    const target = currentRole === 'tutor' ? '/tutor/dashboard' : '/student/dashboard';
    return <Navigate to={target} replace />;
  }
  return <AdminDashboard />;
};

const AppContent = () => {
  const { currentUserId, currentRole } = useApp();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const getHomeRedirect = () => {
    if (!currentUserId) return '/login';
    if (currentRole === 'tutor') return '/tutor/dashboard';
    if (currentRole === 'admin') return '/admin';
    return '/student/dashboard';
  };

  return (
    <div className="app-container">
      {!isAuthPage && <Navbar />}

      <main className="main-content" style={{ padding: isAuthPage ? 0 : undefined }}>
        <Routes>
          {/* Akses root '/' diarahkan sesuai sesi login */}
          <Route path="/" element={<Navigate to={getHomeRedirect()} replace />} />

          {/* Landing Page */}
          <Route path="/landing" element={<LandingPage />} />

          {/* Halaman Login & Register */}
          <Route
            path="/login"
            element={currentUserId ? <Navigate to={getHomeRedirect()} replace /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={currentUserId ? <Navigate to={getHomeRedirect()} replace /> : <AuthPage />}
          />

          {/* Bursa Job: Terbuka untuk Tentor, Murid & Admin (Wajib Login) */}
          <Route
            path="/job-board"
            element={
              <RequireAuth>
                <JobBoardPage />
              </RequireAuth>
            }
          />

          {/* Redirect /tutors to /job-board */}
          <Route path="/tutors" element={<Navigate to="/job-board" replace />} />
          <Route path="/tutors/*" element={<Navigate to="/job-board" replace />} />

          {/* Dashboard Murid & Tentor (Wajib Login) */}
          <Route
            path="/student/dashboard"
            element={
              <RequireAuth>
                <StudentDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/tutor/dashboard"
            element={
              <RequireAuth>
                <TutorDashboard />
              </RequireAuth>
            }
          />

          {/* Chat & Admin & Profile (Wajib Login) */}
          <Route
            path="/chat"
            element={
              <RequireAuth>
                <ChatPage />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminGuard />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />

          {/* Halaman Informasi Publik */}
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}

      {/* Global Token Modal & Notifications */}
      <TokenPurchaseModal />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}
