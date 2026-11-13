import React from 'react';
import { CheckCircle2, Trophy, Home } from 'lucide-react';
import { AppView } from '../types/ecosystem';
import { ASSETS } from '../data/learningContent';
import { SceneImage } from './CreatureArt';

interface ClosingViewProps {
  onNavigate: (view: AppView) => void;
}

export const ClosingView: React.FC<ClosingViewProps> = ({ onNavigate }) => {
  const learnedTopics = [
    'Mengenal ekosistem.',
    'Mengenal komponen biotik dan abiotik.',
    'Memahami hubungan antarmakhluk hidup.',
    'Mengenal simbiosis mutualisme.',
    'Mengenal simbiosis komensalisme.',
    'Mengenal simbiosis parasitisme.',
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-sm">
        <div className="relative h-64 w-full bg-sky-100 sm:h-80 md:h-96">
          <SceneImage
            src={ASSETS.closingFriends}
            alt="Kiki si Kupu-Kupu merayakan keberhasilan bersama teman-teman hewan di taman bunga"
            fallbackTitle="Kiki si Kupu-Kupu dan Teman-Teman"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-6 sm:p-8 md:p-10">
          <h1 className="font-display text-2xl font-bold text-emerald-950 sm:text-4xl">
            HEBAT! KAMU TELAH MENJELAJAHI DUNIA EKOSISTEM!
          </h1>

          <p className="mt-4 text-base font-semibold text-emerald-900 sm:text-lg">
            Hari ini kita sudah belajar:
          </p>

          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {learnedTopics.map((topic) => (
              <li
                key={topic}
                className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-base font-medium text-emerald-950"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
            <p className="font-display text-lg font-semibold leading-relaxed text-amber-950 sm:text-xl">
              &ldquo;Semua makhluk hidup memiliki peran dalam ekosistem. Mari kita menjaga alam dan menyayangi semua ciptaan Tuhan!&rdquo;
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('scores')}
              className="inline-flex min-h-[50px] items-center gap-2 rounded-2xl bg-amber-400 px-6 py-3 font-display text-lg font-bold text-amber-950 transition-transform hover:bg-amber-300 active:scale-95 cursor-pointer"
            >
              <Trophy className="h-5 w-5" />
              Lihat Nilai & Sertifikat
            </button>

            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex min-h-[50px] items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-display text-lg font-bold text-white transition-transform hover:bg-emerald-700 active:scale-95 cursor-pointer"
            >
              <Home className="h-5 w-5" />
              Kembali ke Menu Utama
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
