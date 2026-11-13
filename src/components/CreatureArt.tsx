import React, { useState } from 'react';
import { CreatureKey } from '../types/ecosystem';

interface SceneImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const SceneImage: React.FC<SceneImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle = 'Ilustrasi Dunia Ekosistem',
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-emerald-100 via-sky-100 to-amber-100 p-6 text-center ${className}`}
      >
        <CreatureIcon creature="kiki" size={72} />
        <p className="mt-2 font-display text-base font-semibold text-emerald-900">
          {fallbackTitle}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

interface CreatureIconProps {
  creature: CreatureKey;
  size?: number;
  className?: string;
}

export const CreatureIcon: React.FC<CreatureIconProps> = ({
  creature,
  size = 64,
  className = '',
}) => {
  switch (creature) {
    case 'kiki':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <g className="origin-center animate-wing-flutter">
            <ellipse cx="28" cy="40" rx="20" ry="24" transform="rotate(-18 28 40)" fill="#38BDF8" stroke="#0284C7" strokeWidth="3" />
            <ellipse cx="68" cy="40" rx="20" ry="24" transform="rotate(18 68 40)" fill="#38BDF8" stroke="#0284C7" strokeWidth="3" />
            <circle cx="24" cy="36" r="7" fill="#FDE047" />
            <circle cx="72" cy="36" r="7" fill="#FDE047" />
            <ellipse cx="30" cy="64" rx="14" ry="15" transform="rotate(14 30 64)" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
            <ellipse cx="66" cy="64" rx="14" ry="15" transform="rotate(-14 66 64)" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
          </g>
          <rect x="42" y="34" width="12" height="38" rx="6" fill="#78350F" />
          <circle cx="48" cy="30" r="12" fill="#FDE047" stroke="#78350F" strokeWidth="2.5" />
          <circle cx="44" cy="28" r="2.2" fill="#1E293B" />
          <circle cx="52" cy="28" r="2.2" fill="#1E293B" />
          <path d="M44 34 Q48 38 52 34" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M44 20 Q38 10 34 12" fill="none" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M52 20 Q58 10 62 12" fill="none" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="34" cy="12" r="3" fill="#0284C7" />
          <circle cx="62" cy="12" r="3" fill="#0284C7" />
        </svg>
      );

    case 'lebah':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <ellipse cx="36" cy="28" rx="12" ry="16" transform="rotate(-25 36 28)" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="3" />
          <ellipse cx="58" cy="28" rx="12" ry="16" transform="rotate(25 58 28)" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="3" />
          <ellipse cx="48" cy="54" rx="24" ry="18" fill="#FACC15" stroke="#854D0E" strokeWidth="3" />
          <path d="M38 38 V70 M50 36 V72 M62 39 V69" stroke="#451A03" strokeWidth="5" strokeLinecap="round" />
          <circle cx="28" cy="52" r="11" fill="#FDE047" stroke="#854D0E" strokeWidth="2.5" />
          <circle cx="25" cy="50" r="2.2" fill="#1E293B" />
          <path d="M23 56 Q27 59 31 56" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <path d="M72 54 L80 54" stroke="#451A03" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'bunga':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M48 48 V86" stroke="#16A34A" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="36" cy="70" rx="11" ry="6" transform="rotate(-25 36 70)" fill="#22C55E" />
          <ellipse cx="60" cy="66" rx="11" ry="6" transform="rotate(25 60 66)" fill="#22C55E" />
          <circle cx="48" cy="20" r="12" fill="#FB7185" />
          <circle cx="64" cy="30" r="12" fill="#F43F5E" />
          <circle cx="60" cy="48" r="12" fill="#FB7185" />
          <circle cx="36" cy="48" r="12" fill="#F43F5E" />
          <circle cx="32" cy="30" r="12" fill="#FB7185" />
          <circle cx="48" cy="36" r="12" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.5" />
          <circle cx="44" cy="34" r="2" fill="#713F12" />
          <circle cx="52" cy="34" r="2" fill="#713F12" />
          <path d="M44 39 Q48 42 52 39" fill="none" stroke="#713F12" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'burung':
    case 'jalak':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M24 68 L14 78 M24 68 L24 80" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
          <path d="M58 68 L54 80 M58 68 L64 78" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="48" cy="52" rx="22" ry="18" fill={creature === 'jalak' ? '#334155' : '#38BDF8'} stroke="#0F172A" strokeWidth="2.5" />
          <ellipse cx="46" cy="56" rx="14" ry="11" fill={creature === 'jalak' ? '#F1F5F9' : '#BAE6FD'} />
          <circle cx="64" cy="36" r="13" fill={creature === 'jalak' ? '#1E293B' : '#0EA5E9'} stroke="#0F172A" strokeWidth="2.5" />
          <polygon points="76,34 88,38 76,42" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          <circle cx="67" cy="33" r="2.5" fill="#FFFFFF" />
          <circle cx="67.5" cy="33" r="1.2" fill="#0F172A" />
          <ellipse cx="42" cy="50" rx="13" ry="8" transform="rotate(-15 42 50)" fill={creature === 'jalak' ? '#475569' : '#0284C7'} />
        </svg>
      );

    case 'ulat':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="24" cy="56" r="10" fill="#84CC16" stroke="#3F6212" strokeWidth="2.5" />
          <circle cx="38" cy="52" r="11" fill="#A3E635" stroke="#3F6212" strokeWidth="2.5" />
          <circle cx="52" cy="54" r="11" fill="#84CC16" stroke="#3F6212" strokeWidth="2.5" />
          <circle cx="68" cy="48" r="13" fill="#A3E635" stroke="#3F6212" strokeWidth="2.5" />
          <circle cx="72" cy="45" r="2.2" fill="#1E293B" />
          <path d="M68 53 Q72 56 76 53" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <path d="M64 35 L60 27 M72 35 L76 27" stroke="#3F6212" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'katak':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <ellipse cx="48" cy="76" rx="34" ry="10" fill="#4ADE80" stroke="#15803D" strokeWidth="2.5" />
          <ellipse cx="48" cy="54" rx="22" ry="18" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
          <ellipse cx="48" cy="59" rx="14" ry="11" fill="#DCFCE7" />
          <circle cx="36" cy="36" r="8" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
          <circle cx="60" cy="36" r="8" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
          <circle cx="36" cy="36" r="4" fill="#FFFFFF" />
          <circle cx="60" cy="36" r="4" fill="#FFFFFF" />
          <circle cx="36" cy="36" r="2" fill="#0F172A" />
          <circle cx="60" cy="36" r="2" fill="#0F172A" />
          <path d="M38 50 Q48 56 58 50" fill="none" stroke="#14532D" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'serangga':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <ellipse cx="38" cy="34" rx="10" ry="14" transform="rotate(-20 38 34)" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
          <ellipse cx="58" cy="34" rx="10" ry="14" transform="rotate(20 58 34)" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
          <ellipse cx="48" cy="54" rx="14" ry="18" fill="#FB923C" stroke="#9A3412" strokeWidth="2.5" />
          <circle cx="48" cy="34" r="9" fill="#9A3412" />
          <circle cx="45" cy="33" r="1.8" fill="#FFFFFF" />
          <circle cx="51" cy="33" r="1.8" fill="#FFFFFF" />
        </svg>
      );

    case 'ikan':
    case 'remora':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <polygon points="16,48 32,34 32,62" fill={creature === 'remora' ? '#64748B' : '#F97316'} stroke="#0F172A" strokeWidth="2.5" />
          <ellipse cx="54" cy="48" rx="24" ry="16" fill={creature === 'remora' ? '#94A3B8' : '#FB923C'} stroke="#0F172A" strokeWidth="2.5" />
          <path d="M44 34 Q52 24 60 34" fill={creature === 'remora' ? '#475569' : '#EA580C'} />
          <circle cx="67" cy="44" r="3" fill="#FFFFFF" />
          <circle cx="68" cy="44" r="1.5" fill="#0F172A" />
          <path d="M64 53 Q70 55 74 51" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'hiu':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <polygon points="44,24 56,40 36,40" fill="#475569" stroke="#1E293B" strokeWidth="2.5" />
          <polygon points="12,50 28,36 28,64" fill="#64748B" stroke="#1E293B" strokeWidth="2.5" />
          <ellipse cx="52" cy="52" rx="30" ry="16" fill="#64748B" stroke="#1E293B" strokeWidth="2.5" />
          <ellipse cx="55" cy="58" rx="22" ry="8" fill="#F8FAFC" />
          <circle cx="70" cy="47" r="3" fill="#0F172A" />
          <path d="M62 56 Q72 60 78 55" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'kelinci':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <ellipse cx="38" cy="24" rx="7" ry="18" fill="#FDE68A" stroke="#92400E" strokeWidth="2.5" />
          <ellipse cx="58" cy="24" rx="7" ry="18" fill="#FDE68A" stroke="#92400E" strokeWidth="2.5" />
          <ellipse cx="38" cy="24" rx="3.5" ry="12" fill="#FDA4AF" />
          <ellipse cx="58" cy="24" rx="3.5" ry="12" fill="#FDA4AF" />
          <circle cx="48" cy="56" r="22" fill="#FEF3C7" stroke="#92400E" strokeWidth="2.5" />
          <circle cx="41" cy="53" r="2.5" fill="#1E293B" />
          <circle cx="55" cy="53" r="2.5" fill="#1E293B" />
          <ellipse cx="48" cy="59" rx="3.5" ry="2.5" fill="#FB7185" />
          <path d="M43 64 Q48 68 53 64" fill="none" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'pohon':
    case 'mangga':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="41" y="52" width="14" height="32" rx="4" fill="#92400E" stroke="#451A03" strokeWidth="2.5" />
          <circle cx="48" cy="34" r="22" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
          <circle cx="32" cy="44" r="15" fill="#4ADE80" stroke="#15803D" strokeWidth="2.5" />
          <circle cx="64" cy="44" r="15" fill="#4ADE80" stroke="#15803D" strokeWidth="2.5" />
          {creature === 'mangga' && (
            <>
              <ellipse cx="36" cy="42" rx="5" ry="7" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
              <ellipse cx="58" cy="36" rx="5" ry="7" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
            </>
          )}
        </svg>
      );

    case 'rumput':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M26 78 Q22 44 16 32 Q32 48 36 78" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
          <path d="M42 78 Q48 34 48 20 Q56 42 56 78" fill="#4ADE80" stroke="#15803D" strokeWidth="2.5" />
          <path d="M62 78 Q70 46 80 34 Q72 58 72 78" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
          <rect x="14" y="74" width="68" height="10" rx="5" fill="#16A34A" />
        </svg>
      );

    case 'jamur':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="38" y="48" width="20" height="32" rx="8" fill="#FEF3C7" stroke="#92400E" strokeWidth="2.5" />
          <path d="M18 52 C18 24, 78 24, 78 52 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
          <circle cx="36" cy="38" r="5" fill="#FFFFFF" />
          <circle cx="56" cy="34" r="6" fill="#FFFFFF" />
          <circle cx="64" cy="45" r="4" fill="#FFFFFF" />
        </svg>
      );

    case 'bakteri':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="26" y="34" width="44" height="28" rx="14" fill="#34D399" stroke="#065F46" strokeWidth="3" />
          <circle cx="38" cy="48" r="4" fill="#065F46" />
          <circle cx="56" cy="45" r="5" fill="#A7F3D0" />
          <path d="M70 48 Q82 40 86 48 Q80 56 70 48" fill="none" stroke="#065F46" strokeWidth="3" strokeLinecap="round" />
          <path d="M26 44 L16 38 M26 52 L16 58" stroke="#065F46" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'manusia':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="32" r="15" fill="#FDBA74" stroke="#9A3412" strokeWidth="2.5" />
          <path d="M34 26 Q48 14 62 26" fill="#451A03" />
          <circle cx="43" cy="32" r="2" fill="#1E293B" />
          <circle cx="53" cy="32" r="2" fill="#1E293B" />
          <path d="M43 38 Q48 42 53 38" fill="none" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
          <path d="M28 80 C28 56, 68 56, 68 80 Z" fill="#38BDF8" stroke="#0369A1" strokeWidth="2.5" />
        </svg>
      );

    case 'air':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M48 16 C48 16, 24 44, 24 60 A24 24 0 0 0 72 60 C72 44, 48 16, 48 16 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="3" />
          <path d="M36 56 Q40 68 50 70" fill="none" stroke="#E0F2FE" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'tanah':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M16 68 Q28 40 48 44 Q68 40 80 68 Z" fill="#A16207" stroke="#713F12" strokeWidth="3" />
          <rect x="14" y="66" width="68" height="14" rx="6" fill="#854D0E" stroke="#451A03" strokeWidth="2.5" />
          <circle cx="36" cy="58" r="3" fill="#713F12" />
          <circle cx="56" cy="54" r="3" fill="#713F12" />
          <circle cx="64" cy="64" r="2.5" fill="#713F12" />
        </svg>
      );

    case 'udara':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M16 40 H62 A10 10 0 1 0 54 28" fill="none" stroke="#0EA5E9" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M22 54 H72 A9 9 0 1 1 64 66" fill="none" stroke="#38BDF8" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M18 68 H48" fill="none" stroke="#7DD3FC" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );

    case 'matahari':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="20" fill="#FACC15" stroke="#EA580C" strokeWidth="3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="48"
              y1="14"
              x2="48"
              y2="22"
              stroke="#F59E0B"
              strokeWidth="4"
              strokeLinecap="round"
              transform={`rotate(${deg} 48 48)`}
            />
          ))}
          <circle cx="42" cy="45" r="2.2" fill="#7C2D12" />
          <circle cx="54" cy="45" r="2.2" fill="#7C2D12" />
          <path d="M42 52 Q48 56 54 52" fill="none" stroke="#7C2D12" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case 'batu':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M18 66 L26 40 L48 32 L72 42 L78 68 Z" fill="#94A3B8" stroke="#475569" strokeWidth="3" strokeLinejoin="round" />
          <path d="M42 68 L54 50 L74 52 L80 68 Z" fill="#CBD5E1" stroke="#475569" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      );

    case 'suhu':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="40" y="16" width="16" height="46" rx="8" fill="#F1F5F9" stroke="#475569" strokeWidth="3" />
          <circle cx="48" cy="68" r="14" fill="#EF4444" stroke="#991B1B" strokeWidth="3" />
          <rect x="44" y="30" width="8" height="32" rx="4" fill="#EF4444" />
        </svg>
      );

    case 'kerbau':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M22 30 Q14 18 28 24 M74 30 Q82 18 68 24" fill="none" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="48" cy="56" rx="26" ry="20" fill="#64748B" stroke="#334155" strokeWidth="2.5" />
          <circle cx="48" cy="40" r="16" fill="#475569" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="42" cy="38" r="2.2" fill="#FFFFFF" />
          <circle cx="54" cy="38" r="2.2" fill="#FFFFFF" />
          <ellipse cx="48" cy="47" rx="9" ry="5" fill="#94A3B8" />
        </svg>
      );

    case 'anggrek':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M20 74 Q48 64 76 72" fill="none" stroke="#78350F" strokeWidth="7" strokeLinecap="round" />
          <path d="M48 66 V40" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
          <circle cx="48" cy="24" r="10" fill="#C084FC" />
          <circle cx="34" cy="36" r="10" fill="#A855F7" />
          <circle cx="62" cy="36" r="10" fill="#A855F7" />
          <circle cx="48" cy="36" r="7" fill="#FDE047" />
        </svg>
      );

    case 'benalu':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M16 66 Q48 58 80 66" fill="none" stroke="#78350F" strokeWidth="8" strokeLinecap="round" />
          <path d="M48 60 Q40 40 32 34 M48 60 Q56 38 66 32" fill="none" stroke="#65A30D" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="32" cy="30" rx="10" ry="6" transform="rotate(-20 32 30)" fill="#84CC16" stroke="#3F6212" strokeWidth="2" />
          <ellipse cx="66" cy="28" rx="10" ry="6" transform="rotate(20 66 28)" fill="#84CC16" stroke="#3F6212" strokeWidth="2" />
          <circle cx="48" cy="42" r="5" fill="#EF4444" />
        </svg>
      );

    case 'kutu':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <ellipse cx="48" cy="50" rx="16" ry="20" fill="#7C2D12" stroke="#451A03" strokeWidth="2.5" />
          <circle cx="48" cy="28" r="9" fill="#9A3412" stroke="#451A03" strokeWidth="2" />
          <path d="M32 42 L20 34 M32 52 L18 54 M32 62 L22 72" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M64 42 L76 34 M64 52 L78 54 M64 62 L74 72" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'kucing':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <polygon points="26,38 30,18 44,30" fill="#FB923C" stroke="#9A3412" strokeWidth="2.5" />
          <polygon points="70,38 66,18 52,30" fill="#FB923C" stroke="#9A3412" strokeWidth="2.5" />
          <circle cx="48" cy="52" r="22" fill="#FDBA74" stroke="#9A3412" strokeWidth="2.5" />
          <circle cx="40" cy="49" r="2.5" fill="#1E293B" />
          <circle cx="56" cy="49" r="2.5" fill="#1E293B" />
          <polygon points="45,55 51,55 48,59" fill="#FB7185" />
          <path d="M22 52 L34 54 M22 58 L34 58 M74 52 L62 54 M74 58 L62 58" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'cacing_pita':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <path d="M22 66 Q32 36 48 48 Q64 60 74 30" fill="none" stroke="#F472B6" strokeWidth="10" strokeLinecap="round" />
          <circle cx="74" cy="28" r="7" fill="#DB2777" />
          <circle cx="76" cy="26" r="1.8" fill="#FFFFFF" />
        </svg>
      );

    case 'hutan':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="26" y="54" width="10" height="24" fill="#78350F" />
          <rect x="58" y="50" width="12" height="28" fill="#78350F" />
          <circle cx="31" cy="40" r="18" fill="#16A34A" />
          <circle cx="64" cy="36" r="20" fill="#22C55E" />
          <rect x="12" y="74" width="72" height="8" rx="4" fill="#4ADE80" />
        </svg>
      );

    case 'sawah':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="14" y="54" width="68" height="24" rx="6" fill="#84CC16" />
          <path d="M16 64 H80" stroke="#65A30D" strokeWidth="3" />
          <path d="M28 56 V36 M40 56 V32 M56 56 V34 M68 56 V38" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="74" cy="26" r="10" fill="#FACC15" />
        </svg>
      );

    case 'sungai':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="14" y="24" width="68" height="54" rx="10" fill="#86EFAC" />
          <path d="M34 24 C20 44, 62 56, 44 78 L66 78 C82 56, 42 44, 56 24 Z" fill="#38BDF8" />
          <circle cx="24" cy="64" r="6" fill="#94A3B8" />
        </svg>
      );

    case 'laut':
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="12" y="28" width="72" height="50" rx="12" fill="#0EA5E9" />
          <path d="M16 40 Q30 32 44 40 T72 40" fill="none" stroke="#E0F2FE" strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="52" cy="58" rx="12" ry="7" fill="#FB923C" />
          <polygon points="34,58 42,52 42,64" fill="#FB923C" />
        </svg>
      );

    case 'kebun':
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" className={className} aria-hidden="true">
          <rect x="14" y="64" width="68" height="16" rx="6" fill="#4ADE80" />
          <path d="M32 64 V42 M64 64 V44" stroke="#16A34A" strokeWidth="4" />
          <circle cx="32" cy="38" r="10" fill="#FB7185" />
          <circle cx="32" cy="38" r="4" fill="#FACC15" />
          <circle cx="64" cy="40" r="10" fill="#FBBF24" />
          <circle cx="64" cy="40" r="4" fill="#78350F" />
        </svg>
      );
  }
};
