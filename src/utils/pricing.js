/**
 * Utility Helpers for TemanTutor Platform
 * Token-based connection model: 100% direct fee, no commission cuts, no escrow holding.
 */

export const formatRupiah = (amount) => {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

export const calculatePricing = (studentInputPrice) => {
  const price = Math.max(0, Number(studentInputPrice) || 0);
  return {
    studentPrice: price,
    netTutorReceived: price,
    adminFee: 0,
    feeRate: 0,
    feePercentage: 0,
  };
};
