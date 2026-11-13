import React from 'react';
import { Music, VolumeX } from 'lucide-react';
import { AppView } from '../types/ecosystem';

interface TopNavProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  musicOn: boolean;
  onToggleMusic: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentView,
  onNavigate,
  musicOn,
  onToggleMusic,
}) => {
  const navItems: { id: AppView; label: string }[] = [
    { id: 'home', label: 'Beranda' },
    { id: 'materi', label: 'Materi' },
    { id: 'games', label: 'Permainan' },
    { id: 'scores', label: 'Nilai' },
    { id: 'closing', label: 'Penutup' },
  ];

  return (
    <header className="no-print sticky top-0 z-40 border-b border-emerald-200/80 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 md:gap-8">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="font-display text-lg font-bold tracking-tight text-emerald-900 whitespace-nowrap shrink-0 cursor-pointer sm:text-xl"
        >
          Dunia Ekosistem
        </button>

        <nav className="flex items-center gap-3 overflow-x-auto sm:gap-6">
          {navItems.map((item) => {
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`min-h-[40px] border-b-2 px-1.5 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer sm:text-base ${
                  active
                    ? 'border-emerald-600 text-emerald-800'
                    : 'border-transparent text-emerald-950/70 hover:text-emerald-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="shrink-0">
          <button
            type="button"
            onClick={onToggleMusic}
            aria-pressed={musicOn}
            className={`inline-flex min-h-[42px] items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              musicOn
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'border border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
            }`}
          >
            {musicOn ? (
              <>
                <Music className="h-4 w-4" />
                <span className="hidden sm:inline">Musik Aktif</span>
              </>
            ) : (
              <>
                <VolumeX className="h-4 w-4" />
                <span className="hidden sm:inline">Musik Mati</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
