import React from 'react';
import { BookOpen, HelpCircle, Trophy, Gamepad2, CheckCircle2, ArrowRight } from 'lucide-react';
import { AppView, GameId, MaterialId, StudentProgress } from '../types/ecosystem';
import { ASSETS } from '../data/learningContent';
import { CreatureIcon, SceneImage } from './CreatureArt';

interface HomeViewProps {
  progress: StudentProgress;
  overallPercent: number;
  onNavigate: (view: AppView) => void;
  onOpenMaterial: (id: MaterialId) => void;
  onOpenGame: (id: GameId) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  progress,
  overallPercent,
  onNavigate,
  onOpenMaterial,
  onOpenGame,
}) => {
  const materialTitles: { id: MaterialId; title: string; summary: string }[] = [
    { id: 1, title: 'Materi 1: Mengenal Ekosistem', summary: 'Pengertian ekosistem dan 5 contoh ekosistem di alam.' },
    { id: 2, title: 'Materi 2: Komponen Ekosistem', summary: 'Perbedaan komponen biotik (hidup) dan abiotik (tak hidup).' },
    { id: 3, title: 'Materi 3: Hubungan Antarmakhluk Hidup', summary: 'Cara makhluk hidup saling membutuhkan dalam ekosistem.' },
    { id: 4, title: 'Materi 4: Mengenal Simbiosis', summary: 'Mutualisme (+/+), Komensalisme (+/0), dan Parasitisme (+/-).' },
  ];

  const gameTitles: { id: GameId; title: string; subtitle: string }[] = [
    { id: 1, title: 'Game 1: Mencari Komponen Ekosistem', subtitle: 'Kelompokkan benda biotik dan abiotik.' },
    { id: 2, title: 'Game 2: Pasangkan Simbiosis', subtitle: 'Cocokkan 6 pasangan makhluk hidup.' },
    { id: 3, title: 'Game 3: Siapa Aku?', subtitle: 'Tebak hewan dan tumbuhan dari 10 petunjuk.' },
    { id: 4, title: 'Game 4: Benar atau Salah?', subtitle: 'Uji ketelitianmu dengan 10 pernyataan.' },
    { id: 5, title: 'Game 5: Petualangan Misi Akhir', subtitle: '15 soal tantangan untuk meraih Bintang Super!' },
  ];

  return (
    <div className="space-y-10">
      {/* Hero Banner Split */}
      <section className="overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-sm">
        <div className="grid items-stretch lg:grid-cols-12">
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-6 lg:p-10">
            <p className="text-sm font-semibold text-emerald-700">
              IPAS Kelas III SD · Mengenal Ekosistem dan Simbiosis
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-emerald-950 sm:text-4xl lg:text-[2.6rem]">
              SELAMAT DATANG DI DUNIA EKOSISTEM!
            </h1>

            <div className="mt-4 flex items-center gap-4 rounded-2xl border border-sky-200 bg-sky-50/80 p-4">
              <div className="shrink-0 animate-float-slow">
                <CreatureIcon creature="kiki" size={64} />
              </div>
              <p className="font-display text-lg font-medium leading-snug text-sky-950">
                Ayo belajar dan bermain bersama Kiki si Kupu-Kupu!
              </p>
            </div>

            {/* 3 Primary Action Buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => onOpenMaterial(1)}
                className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 px-6 py-3.5 font-display text-lg font-bold text-white shadow-sm transition-transform hover:bg-emerald-700 active:scale-95 whitespace-nowrap cursor-pointer"
              >
                <BookOpen className="h-5 w-5" />
                MULAI BELAJAR
              </button>

              <button
                type="button"
                onClick={() => onNavigate('guide')}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 py-3.5 font-display text-base font-bold text-amber-950 transition-transform hover:bg-amber-300 active:scale-95 whitespace-nowrap cursor-pointer"
              >
                <HelpCircle className="h-5 w-5" />
                PETUNJUK PERMAINAN
              </button>

              <button
                type="button"
                onClick={() => onNavigate('scores')}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-sky-300 bg-sky-50 px-5 py-3.5 font-display text-base font-bold text-sky-900 transition-transform hover:bg-sky-100 active:scale-95 whitespace-nowrap cursor-pointer"
              >
                <Trophy className="h-5 w-5 text-amber-600" />
                LIHAT NILAI
              </button>
            </div>
          </div>

          <div className="relative min-h-[260px] bg-emerald-100 lg:col-span-6 lg:min-h-[420px]">
            <SceneImage
              src={ASSETS.heroForest}
              alt="Hutan hijau dengan Kiki si kupu-kupu, lebah, burung, ikan, katak, kelinci, sungai, dan matahari cerah"
              fallbackTitle="Petualangan Seru di Dunia Ekosistem"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Progress Strip */}
      <section className="rounded-2xl border border-emerald-200 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold text-emerald-950">
              Kemajuan Petualanganmu
            </h2>
            <p className="text-sm text-emerald-800">
              Materi selesai: <span className="font-bold tabular-nums">{progress.completedMaterials.length}/4</span>
              <span className="mx-2" aria-hidden="true">·</span>
              Game selesai: <span className="font-bold tabular-nums">{Object.values(progress.gameScores).filter((g) => g.played).length}/5</span>
            </p>
          </div>
          <span className="font-display text-2xl font-bold text-emerald-700 tabular-nums">
            {overallPercent}%
          </span>
        </div>
        <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-emerald-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </section>

      {/* Peta Materi & Permainan */}
      <section className="grid gap-8 lg:grid-cols-2">
        {/* Materi List */}
        <div className="rounded-3xl border border-emerald-200 bg-white p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-bold text-emerald-950">
              Peta Materi Belajar
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('materi')}
              className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-900 whitespace-nowrap cursor-pointer"
            >
              Buka Semua <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {materialTitles.map((m) => {
              const done = progress.completedMaterials.includes(m.id);
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onOpenMaterial(m.id)}
                  className="flex w-full items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 text-left transition-colors hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer"
                >
                  <div>
                    <h3 className="font-display text-base font-bold text-emerald-950 sm:text-lg">
                      {m.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-emerald-800">{m.summary}</p>
                  </div>
                  <div className="shrink-0">
                    {done ? (
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
                        <CheckCircle2 className="h-5 w-5" /> Selesai
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-sky-700">
                        Pelajari <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Games List */}
        <div className="rounded-3xl border border-amber-200 bg-white p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-bold text-emerald-950">
              5 Game Edukasi Interaktif
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('games')}
              className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700 hover:text-amber-900 whitespace-nowrap cursor-pointer"
            >
              Pilih Game <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {gameTitles.map((g) => {
              const rec = progress.gameScores[g.id];
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => onOpenGame(g.id)}
                  className="flex w-full items-center justify-between gap-4 rounded-2xl border border-amber-100 bg-amber-50/50 p-4 text-left transition-colors hover:border-amber-300 hover:bg-amber-50 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-200 text-amber-900">
                      <Gamepad2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-emerald-950 sm:text-lg">
                        {g.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-emerald-800">{g.subtitle}</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    {rec.played ? (
                      <span className="font-display text-base font-bold text-emerald-700 tabular-nums">
                        {rec.percentage}%
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-amber-800">
                        Mainkan
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
