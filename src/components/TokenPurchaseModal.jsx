import React, { useState } from 'react';
import {
  X,
  Coins,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Clock,
  ArrowRight,
  Flame,
  Check,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { formatRupiah } from '../utils/pricing';

export const TOKEN_PACKAGES = [
  {
    id: 'pack_1',
    tokens: 1,
    title: 'Paket Satuan (Trial)',
    price: 3000,
    originalPrice: 3000,
    discount: 0,
    badge: null,
    perToken: 3000,
    desc: 'Untuk 1x pasang tawaran atau 1x lamaran mengajar.',
  },
  {
    id: 'pack_5',
    tokens: 5,
    title: 'Paket Hemat 5 Token',
    price: 13000,
    originalPrice: 15000,
    discount: 2000,
    badge: 'Hemat Rp 2.000 (Diskon 13%)',
    perToken: 2600,
    desc: 'Bisa untuk 5x pasang tawaran les atau 5x lamaran.',
  },
  {
    id: 'pack_10',
    tokens: 10,
    title: 'Paket Populer 10 Token',
    price: 25000,
    originalPrice: 30000,
    discount: 5000,
    badge: 'Paling Laris 🔥 (Hemat Rp 5.000)',
    perToken: 2500,
    desc: 'Pilihan favorit murid & tentor aktif.',
    isPopular: true,
  },
  {
    id: 'pack_20',
    tokens: 20,
    title: 'Paket Super Pro 20 Token',
    price: 48000,
    originalPrice: 60000,
    discount: 12000,
    badge: 'Diskon Rp 12.000 (Hemat 20%)',
    perToken: 2400,
    desc: 'Ideal untuk tentor profesional yang aktif melamar.',
  },
  {
    id: 'pack_50',
    tokens: 50,
    title: 'Paket Master 50 Token',
    price: 115000,
    originalPrice: 150000,
    discount: 35000,
    badge: 'Diskon Terbesar (Hemat Rp 35.000)',
    perToken: 2300,
    desc: 'Tarif paling hemat (Rp 2.300/token) untuk intensif.',
  },
];

export const TokenPurchaseModal = () => {
  const {
    activeTokenModal,
    setActiveTokenModal,
    currentUser,
    buyTokens,
    showToast,
  } = useApp();

  const [selectedPackage, setSelectedPackage] = useState(TOKEN_PACKAGES[2]); // Default 10 tokens
  const [step, setStep] = useState('choose_package'); // 'choose_package' | 'qris_payment'
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!activeTokenModal) return null;

  const handleProceedToQRIS = () => {
    setStep('qris_payment');
  };

  const handleSimulateQRISPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      buyTokens(selectedPackage.tokens, selectedPackage.price, 'QRIS GoPay Merchant');

      // Efek konfeti selebrasi
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // ignore if canvas-confetti fails
      }

      setTimeout(() => {
        setIsSuccess(false);
        setStep('choose_package');
        setActiveTokenModal(false);
      }, 2300);
    }, 1200);
  };

  const handleClose = () => {
    if (isProcessing) return;
    setStep('choose_package');
    setIsSuccess(false);
    setActiveTokenModal(false);
  };

  const currentTokens = currentUser?.tokens ?? 0;

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '560px',
          padding: '1.75rem',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: '20px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: '#fef3c7',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Coins size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' }}>
                Beli Token Kredit WirDIG
              </h3>
              <p style={{ margin: '0.15rem 0 0', fontSize: '0.75rem', color: '#64748b' }}>
                Gunakan token untuk mempublikasikan tawaran les (murid) atau mengajukan lamaran (tentor).
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            disabled={isProcessing}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '0.25rem' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Current Balance Indicator */}
        <div style={{
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          padding: '0.75rem 1rem',
          border: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem',
        }}>
          <div style={{ fontSize: '0.8rem', color: '#475569' }}>
            Saldo Token Anda Saat Ini:
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '1.1rem', fontWeight: '900', color: '#d97706' }}>
            <Coins size={18} />
            <span>{currentTokens} Token</span>
          </div>
        </div>

        {/* STEP 1: CHOOSE PACKAGE */}
        {step === 'choose_package' && (
          <div>
            <div style={{ fontSize: '0.825rem', fontWeight: '800', color: '#334155', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
              Pilih Paket Token:
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
              {TOKEN_PACKAGES.map((pkg) => {
                const isSelected = selectedPackage.id === pkg.id;

                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: '14px',
                      border: isSelected ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
                      backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: isSelected ? '#dbeafe' : '#f1f5f9',
                        color: isSelected ? '#2563eb' : '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '900',
                        fontSize: '0.9rem',
                      }}>
                        {pkg.tokens}x
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: '800', fontSize: '0.9rem', color: '#0f172a' }}>
                            {pkg.title}
                          </span>
                          {pkg.badge && (
                            <span style={{
                              fontSize: '0.65rem',
                              fontWeight: '800',
                              padding: '0.15rem 0.45rem',
                              borderRadius: '6px',
                              backgroundColor: pkg.isPopular ? '#fef3c7' : '#dcfce7',
                              color: pkg.isPopular ? '#b45309' : '#15803d',
                            }}>
                              {pkg.badge}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.725rem', color: '#64748b', marginTop: '0.1rem' }}>
                          {pkg.desc}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', minWidth: '95px' }}>
                      {pkg.discount > 0 && (
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                          {formatRupiah(pkg.originalPrice)}
                        </div>
                      )}
                      <div style={{ fontSize: '1.05rem', fontWeight: '900', color: isSelected ? '#2563eb' : '#0f172a' }}>
                        {formatRupiah(pkg.price)}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: '#64748b' }}>
                        @{formatRupiah(pkg.perToken)}/token
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Benefit Summary */}
            <div style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              fontSize: '0.75rem',
              color: '#166534',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <Zap size={16} color="#16a34a" />
              <span>Token tidak memiliki batas kedaluwarsa & langsung aktif setelah bayar QRIS.</span>
            </div>

            {/* Action Buttons */}
            <button
              onClick={handleProceedToQRIS}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '0.95rem',
                fontWeight: '800',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              <span>Lanjut Bayar QRIS ({formatRupiah(selectedPackage.price)})</span>
              <ArrowRight size={17} />
            </button>
          </div>
        )}

        {/* STEP 2: QRIS GOPAY MERCHANT PAYMENT */}
        {step === 'qris_payment' && (
          <div>
            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.25rem 0' }}>
                  Pembayaran QRIS Berhasil!
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 1rem 0' }}>
                  +{selectedPackage.tokens} Token telah ditambahkan ke akun Anda.
                </p>
                <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: '700' }}>
                  Total Saldo Baru: {currentTokens} Token
                </div>
              </div>
            ) : (
              <div>
                {/* QRIS Card */}
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  textAlign: 'center',
                  marginBottom: '1.25rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0f172a' }}>
                      QRIS GoPay Merchant
                    </span>
                    <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                      Otomatis Verifikasi
                    </span>
                  </div>

                  {/* QRIS Barcode Box */}
                  <div style={{
                    display: 'inline-block',
                    padding: '1rem',
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '2px solid #0f172a',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.06)',
                    marginBottom: '0.75rem',
                  }}>
                    {/* Simulated Authentic QRIS Code */}
                    <svg
                      width="180"
                      height="180"
                      viewBox="0 0 180 180"
                      style={{ display: 'block', margin: '0 auto' }}
                    >
                      <rect width="180" height="180" fill="#ffffff" />
                      {/* Outer corner squares */}
                      <rect x="15" y="15" width="45" height="45" fill="#0f172a" rx="4" />
                      <rect x="22" y="22" width="31" height="31" fill="#ffffff" rx="2" />
                      <rect x="28" y="28" width="19" height="19" fill="#0f172a" rx="2" />

                      <rect x="120" y="15" width="45" height="45" fill="#0f172a" rx="4" />
                      <rect x="127" y="22" width="31" height="31" fill="#ffffff" rx="2" />
                      <rect x="133" y="28" width="19" height="19" fill="#0f172a" rx="2" />

                      <rect x="15" y="120" width="45" height="45" fill="#0f172a" rx="4" />
                      <rect x="22" y="127" width="31" height="31" fill="#ffffff" rx="2" />
                      <rect x="28" y="133" width="19" height="19" fill="#0f172a" rx="2" />

                      {/* Pattern Matrix */}
                      <rect x="70" y="20" width="12" height="12" fill="#0f172a" />
                      <rect x="90" y="20" width="18" height="12" fill="#0f172a" />
                      <rect x="70" y="40" width="18" height="12" fill="#0f172a" />
                      <rect x="95" y="40" width="12" height="12" fill="#0f172a" />

                      <rect x="20" y="70" width="15" height="12" fill="#0f172a" />
                      <rect x="45" y="70" width="20" height="12" fill="#0f172a" />
                      <rect x="75" y="65" width="30" height="30" fill="#00aa13" rx="4" />
                      <text x="90" y="84" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">QRIS</text>

                      <rect x="115" y="70" width="15" height="12" fill="#0f172a" />
                      <rect x="140" y="70" width="20" height="12" fill="#0f172a" />

                      <rect x="70" y="105" width="12" height="18" fill="#0f172a" />
                      <rect x="90" y="105" width="18" height="12" fill="#0f172a" />
                      <rect x="70" y="135" width="25" height="12" fill="#0f172a" />
                      <rect x="105" y="125" width="15" height="25" fill="#0f172a" />
                      <rect x="130" y="105" width="30" height="12" fill="#0f172a" />
                      <rect x="130" y="130" width="15" height="18" fill="#0f172a" />
                      <rect x="150" y="130" width="15" height="18" fill="#0f172a" />
                    </svg>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
                    NMID: <strong>ID102026WIRDIG01</strong> • Merchant: <strong>WirDIG Tentor Official</strong>
                  </div>

                  <div style={{
                    backgroundColor: '#f8fafc',
                    padding: '0.65rem 1rem',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid #e2e8f0',
                  }}>
                    <span style={{ fontSize: '0.8rem', color: '#475569' }}>Total Tagihan:</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: '900', color: '#2563eb' }}>
                      {formatRupiah(selectedPackage.price)}
                    </span>
                  </div>
                </div>

                {/* Instructions */}
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                  1. Buka aplikasi <strong>GoPay, BCA, Mandiri, ShopeePay, Dana, OVO, atau Mobile Banking</strong> apa saja.<br />
                  2. Scan kode QRIS di atas dan pastikan nama merchant adalah <strong>WirDIG Tentor Official</strong>.<br />
                  3. Klik tombol konfirmasi di bawah untuk memverifikasi otomatis.
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  <button
                    type="button"
                    onClick={() => setStep('choose_package')}
                    disabled={isProcessing}
                    className="btn btn-secondary"
                    style={{ flex: '0 0 35%' }}
                  >
                    Ganti Paket
                  </button>

                  <button
                    type="button"
                    onClick={handleSimulateQRISPayment}
                    disabled={isProcessing}
                    className="btn btn-emerald"
                    style={{
                      flex: 1,
                      padding: '0.8rem',
                      fontSize: '0.9rem',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    {isProcessing ? (
                      <span>Memverifikasi Pembayaran...</span>
                    ) : (
                      <>
                        <Check size={16} />
                        <span>Saya Sudah Bayar QRIS</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
