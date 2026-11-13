import React from 'react';
import { ArrowLeft, BookOpen, Volume2, Gamepad2, Award } from 'lucide-react';
import { AppView } from '../types/ecosystem';
import { CreatureIcon } from './CreatureArt';

interface GuideViewProps {
  onNavigate: (view: AppView) => void;
  onStartLearning: () => void;
}

export const GuideView: React.FC<GuideViewProps> = ({
  onNavigate,
  onStartLearning,
}) => {
  const steps = [
    {
      number: '1',
      title: 'Baca dan Dengarkan Materi (Materi 1 sampai 4)',
      description:
        'Tekan tombol MULAI BELAJAR untuk mengenal ekosistem, komponen biotik dan abiotik, hubungan antarmakhluk hidup, dan simbiosis.',
      icon: BookOpen,
      tone: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    },
    {
      number: '2',
      title: 'Putar Suara Ibu Guru & Musik Ceria',
      description:
        'Di setiap halaman materi terdapat tombol Putar Suara Guru agar kamu bisa mendengarkan penjelasan dengan jelas. Kamu juga bisa menyalakan musik ceria di bagian atas layar.',
      icon: Volume2,
      tone: 'bg-sky-50 border-sky-200 text-sky-900',
    },
    {
      number: '3',
      title: 'Mainkan 5 Game Edukasi Interaktif',
      description:
        'Setelah belajar, mainkan Game 1 sampai Game 5. Kamu bisa menyeret gambar (drag and drop) atau menekan gambar lalu memilih kotak tujuan.',
      icon: Gamepad2,
      tone: 'bg-amber-50 border-amber-200 text-amber-950',
    },
    {
      number: '4',
      title: 'Kumpulkan Bintang & Raih Sertifikat Digital',
      description:
        'Setiap jawabanmu akan langsung dinilai otomatis. Setelah selesai, buka halaman Nilai untuk melihat skor dan mencetak Sertifikat Digital atas namamu!',
      icon: Award,
      tone: 'bg-orange-50 border-orange-200 text-orange-950',
    },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </button>
      </div>

      <section className="rounded-3xl border border-emerald-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <CreatureIcon creature="kiki" size={76} className="shrink-0 animate-float-slow" />
          <div>
            <h1 className="font-display text-3xl font-bold text-emerald-950">
              Petunjuk Permainan bersama Kiki
            </h1>
            <p className="mt-1 text-base text-emerald-800">
              Ikuti 4 langkah mudah ini supaya petualangan belajarmu semakin seru dan mendapat nilai Bintang Super!
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.number}
                className={`rounded-2xl border p-5 ${s.tone}`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white font-display text-lg font-bold shadow-xs">
                    {s.number}
                  </span>
                  <Icon className="h-6 w-6 shrink-0" />
                </div>
                <h2 className="mt-3 font-display text-lg font-bold">
                  {s.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed opacity-90">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={onStartLearning}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-display text-lg font-bold text-white transition-transform hover:bg-emerald-700 active:scale-95 cursor-pointer"
          >
            Ayo Mulai Materi 1!
          </button>
        </div>
      </section>
    </div>
  );
};
