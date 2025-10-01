import React from 'react';

// Adinkra Symbol SVGs as React components
export const GYE_NYAME = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="50" cy="25" r="8" fill="currentColor"/>
    <rect x="46" y="33" width="8" height="34" fill="currentColor"/>
    <circle cx="25" cy="50" r="8" fill="currentColor"/>
    <rect x="33" y="46" width="34" height="8" fill="currentColor"/>
    <circle cx="75" cy="50" r="8" fill="currentColor"/>
    <circle cx="50" cy="75" r="8" fill="currentColor"/>
  </svg>
);

export const SANKOFA = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
    <path d="M50 20 C70 20, 80 40, 60 60 L40 60 C20 40, 30 20, 50 20 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="50" cy="15" r="5" fill="currentColor"/>
    <path d="M50 65 Q30 75, 40 85 Q50 90, 60 85 Q70 75, 50 65" fill="currentColor"/>
  </svg>
);

export const DWENNIMMEN = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="3" fill="none"/>
    <path d="M30 30 L70 70 M70 30 L30 70" stroke="currentColor" strokeWidth="2"/>
    <circle cx="30" cy="30" r="8" fill="currentColor"/>
    <circle cx="70" cy="30" r="8" fill="currentColor"/>
    <circle cx="30" cy="70" r="8" fill="currentColor"/>
    <circle cx="70" cy="70" r="8" fill="currentColor"/>
  </svg>
);

export const ADWO = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
    <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M20 50 L80 50 M50 20 L50 80" stroke="currentColor" strokeWidth="2"/>
    <circle cx="35" cy="35" r="5" fill="currentColor"/>
    <circle cx="65" cy="35" r="5" fill="currentColor"/>
    <circle cx="35" cy="65" r="5" fill="currentColor"/>
    <circle cx="65" cy="65" r="5" fill="currentColor"/>
  </svg>
);

export const NYAME_DUA = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
    <path d="M50 80 L50 20" stroke="currentColor" strokeWidth="4"/>
    <path d="M30 40 L50 20 L70 40" stroke="currentColor" strokeWidth="3" fill="none"/>
    <circle cx="50" cy="15" r="6" fill="currentColor"/>
    <rect x="45" y="75" width="10" height="10" fill="currentColor"/>
  </svg>
);

export const MATE_MASIE = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
    <path d="M20 50 Q50 20, 80 50 Q50 80, 20 50" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="35" cy="40" r="4" fill="currentColor"/>
    <circle cx="65" cy="40" r="4" fill="currentColor"/>
    <path d="M40 60 Q50 70, 60 60" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

type AdinkraSymbolProps = {
  symbol: 'gye-nyame' | 'sankofa' | 'dwennimmen' | 'adwo' | 'nyame-dua' | 'mate-masie';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

const AdinkraSymbol: React.FC<AdinkraSymbolProps> = ({ symbol, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const symbolComponents = {
    'gye-nyame': GYE_NYAME,
    'sankofa': SANKOFA,
    'dwennimmen': DWENNIMMEN,
    'adwo': ADWO,
    'nyame-dua': NYAME_DUA,
    'mate-masie': MATE_MASIE
  };

  const SymbolComponent = symbolComponents[symbol];

  return (
    <div className={`${sizeClasses[size]} ${className} opacity-60 hover:opacity-90 transition-all duration-500 hover:scale-110`}>
      <SymbolComponent />
    </div>
  );
};

export default AdinkraSymbol;