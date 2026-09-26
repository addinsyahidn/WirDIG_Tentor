import React from 'react';
import logoImg from '../assets/logo.jpg';

export const Logo = ({ 
  size = 'md', 
  variant = 'horizontal', 
  theme = 'light',
  className = '',
  useImage = false 
}) => {
  const heights = {
    xs: 26,
    sm: 32,
    md: 40,
    lg: 52,
    xl: 72,
  };

  const currentHeight = typeof size === 'number' ? size : (heights[size] || 40);

  if (useImage) {
    return (
      <img 
        src={logoImg} 
        alt="TemanTutor Logo" 
        style={{ 
          height: `${currentHeight}px`, 
          width: 'auto',
          borderRadius: size === 'xs' || size === 'sm' ? '6px' : '10px',
          objectFit: 'contain',
          display: 'inline-block',
          verticalAlign: 'middle'
        }}
        className={className}
      />
    );
  }

  // Exact brand colors from uploaded logo
  const navyBg = '#353956';
  const capLavender = '#8B95C9';
  const textWhite = '#FFFFFF';
  const textNavy = '#353956';
  const textLavender = '#6B74A8';

  const textColor = theme === 'dark' ? textWhite : textNavy;
  const subtextColor = theme === 'dark' ? capLavender : textLavender;

  if (variant === 'icon-only') {
    return (
      <div 
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: `${currentHeight}px`,
          height: `${currentHeight}px`,
          borderRadius: `${Math.round(currentHeight * 0.22)}px`,
          backgroundColor: theme === 'dark' ? navyBg : 'transparent',
          boxShadow: theme === 'dark' ? '0 2px 8px rgba(53, 57, 86, 0.25)' : 'none',
          flexShrink: 0,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          width={currentHeight * 0.85}
          height={currentHeight * 0.85}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="50,18 82,31 50,44 18,31"
            fill={capLavender}
          />
          <path
            d="M 30 36 C 30 36 36 47 50 47 C 64 47 70 36 70 36 L 70 42 C 70 42 64 53 50 53 C 36 53 30 42 30 42 Z"
            fill={capLavender}
          />
          <path
            d="M 66 31 L 76 43 L 76 50"
            stroke={capLavender}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="76" cy="52" r="2.5" fill={capLavender} />
          <circle cx="50" cy="31" r="2.5" fill={theme === 'dark' ? navyBg : 'white'} />
          <path
            d="M 38 42 C 22 47 10 63 12 80 C 13 93 22 104 35 108 C 22 101 13 90 13 77 C 13 61 24 48 38 42 Z"
            fill={capLavender}
          />
        </svg>
      </div>
    );
  }

  // Horizontal Logo layout matching the exact uploaded logo
  return (
    <div 
      className={`teman-tutor-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${Math.max(6, Math.round(currentHeight * 0.22))}px`,
        textDecoration: 'none',
        userSelect: 'none',
      }}
    >
      {/* Visual Badge Emblem */}
      <div
        style={{
          width: `${currentHeight}px`,
          height: `${currentHeight}px`,
          borderRadius: `${Math.round(currentHeight * 0.24)}px`,
          background: theme === 'dark' 
            ? 'linear-gradient(135deg, #3f4469 0%, #2f3350 100%)' 
            : 'linear-gradient(135deg, #353956 0%, #282c44 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(53, 57, 86, 0.25)',
          flexShrink: 0,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          width={currentHeight * 0.8}
          height={currentHeight * 0.8}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Mortarboard Hat */}
          <polygon
            points="50,16 84,30 50,44 16,30"
            fill="#8B95C9"
          />
          <path
            d="M 28 35 C 28 35 35 46 50 46 C 65 46 72 35 72 35 L 72 41 C 72 41 65 52 50 52 C 35 52 28 41 28 41 Z"
            fill="#8B95C9"
          />
          <path
            d="M 68 30 L 78 43 L 78 50"
            stroke="#8B95C9"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="78" cy="52" r="3" fill="#8B95C9" />
          <circle cx="50" cy="30" r="2.5" fill="#353956" />

          {/* Sweeping Crescent Orbit Ring */}
          <path
            d="M 42 42 C 24 47 11 63 13 80 C 14 92 23 103 36 107 C 22 100 14 89 14 77 C 14 62 25 49 42 42 Z"
            fill="#8B95C9"
          />
        </svg>
      </div>

      {/* Brand Typography matching logo text TEMAN TUTOR */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
          <span
            style={{
              fontSize: `${currentHeight * 0.44}px`,
              fontWeight: '900',
              color: textColor,
              letterSpacing: '-0.02em',
              fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
            }}
          >
            TEMAN
          </span>
          <span
            style={{
              fontSize: `${currentHeight * 0.44}px`,
              fontWeight: '800',
              color: '#8B95C9',
              letterSpacing: '-0.02em',
              fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
            }}
          >
            TUTOR
          </span>
        </div>
        <span
          style={{
            fontSize: `${Math.max(8.5, currentHeight * 0.2)}px`,
            fontWeight: '600',
            color: subtextColor,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginTop: '2px',
          }}
        >
          Platform Penghubung Tentor & Murid
        </span>
      </div>
    </div>
  );
};
