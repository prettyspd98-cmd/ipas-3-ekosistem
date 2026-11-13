import React, { useRef } from 'react';
import { Award, Printer, Download, RotateCcw, Star, ArrowLeft, Play } from 'lucide-react';
import { AppView, GameId, StudentProgress } from '../types/ecosystem';
import { getAwardCategory } from '../data/learningContent';
import { CreatureIcon } from './CreatureArt';

interface ScoresViewProps {
  progress: StudentProgress;
  onUpdateName: (name: string) => void;
  onOpenGame: (id: GameId) => void;
  onResetScores: () => void;
  onNavigate: (view: AppView) => void;
}

export const ScoresView: React.FC<ScoresViewProps> = ({
  progress,
  onUpdateName,
  onOpenGame,
  onResetScores,
  onNavigate,
}) => {
  const certRef = useRef<HTMLDivElement>(null);

  const gameMeta: { id: GameId; name: string }[] = [
    { id: 1, name: 'Game 1: Petualangan Mencari Komponen Ekosistem' },
    { id: 2, name: 'Game 2: Pasangkan Pasangan Simbiosis' },
    { id: 3, name: 'Game 3: Siapa Aku?' },
    { id: 4, name: 'Game 4: Benar atau Salah?' },
    { id: 5, name: 'Game 5: Petualangan Misi Akhir' },
  ];

  const playedGames = gameMeta.filter((g) => progress.gameScores[g.id].played);
  const averagePercent =
    playedGames.length > 0
      ? Math.round(
          playedGames.reduce((sum, g) => sum + progress.gameScores[g.id].percentage, 0) /
            playedGames.length
        )
      : 0;
  const totalStars = gameMeta.reduce(
    (sum, g) => sum + progress.gameScores[g.id].stars,
    0
  );
  const allGamesDone = playedGames.length === 5;
  const award = getAwardCategory(averagePercent);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCertificate = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 820;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#FFFDF7';
    ctx.fillRect(0, 0, 1200, 820);

    // Outer border
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 18;
    ctx.strokeRect(30, 30, 1140, 760);

    // Inner gold border
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 5;
    ctx.strokeRect(52, 52, 1096, 716);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#065F46';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('MEDIA PEMBELAJARAN IPAS KELAS 3 SD', 600, 130);

    ctx.fillStyle = '#064E3B';
    ctx.font = 'bold 54px sans-serif';
    ctx.fillText('SERTIFIKAT PENGHARGAAN', 600, 200);

    ctx.fillStyle = '#374151';
    ctx.font = '26px sans-serif';
    ctx.fillText('Diberikan dengan bangga kepada:', 600, 275);

    ctx.fillStyle = '#0284C7';
    ctx.font = 'bold 50px sans-serif';
    ctx.fillText(progress.studentName.trim() || 'Siswa Hebat Kelas 3 SD', 600, 350);

    ctx.fillStyle = '#1F2937';
    ctx.font = '25px sans-serif';
    ctx.fillText('Telah mengikuti petualangan belajar dan bermain:', 600, 425);
    ctx.font = 'bold 30px sans-serif';
    ctx.fillStyle = '#065F46';
    ctx.fillText('PETUALANGAN SERU DI DUNIA EKOSISTEM', 600, 472);

    ctx.fillStyle = '#D97706';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(
      `Predikat: ${playedGames.length > 0 ? award.title : 'PENJELAJAH ALAM'}`,
      600,
      548
    );

    ctx.fillStyle = '#374151';
    ctx.font = '24px sans-serif';
    ctx.fillText(
      `Nilai Rata-rata: ${averagePercent}%   |   Total Bintang: ${totalStars}   |   Game Selesai: ${playedGames.length}/5`,
      600,
      605
    );

    ctx.fillStyle = '#065F46';
    ctx.font = 'italic 22px sans-serif';
    ctx.fillText('Dipandu oleh Kiki si Kupu-Kupu — Terus Semangat Menjaga Alam!', 600, 695);

    const link = document.createElement('a');
    link.download = `Sertifikat-Ekosistem-${(progress.studentName || 'Siswa').replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="no-print flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </button>

        <button
          type="button"
          onClick={onResetScores}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-800 hover:bg-rose-100 cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          Ulangi Semua Nilai
        </button>
      </div>

      {/* Summary Cards */}
      <section className="no-print rounded-3xl border border-emerald-200 bg-white p-6 sm:p-8">
        <h1 className="font-display text-3xl font-bold text-emerald-950">
          Catatan Nilai & Prestasi Belajar
        </h1>
        <p className="mt-1 text-base text-emerald-800">
          Lihat hasil skormu di setiap permainan. Kamu bisa mengulangi permainan kapan saja untuk nilai yang lebih tinggi!
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-800">Permainan Selesai</p>
            <p className="mt-1 font-display text-3xl font-bold text-emerald-950 tabular-nums">
              {playedGames.length} / 5
            </p>
          </div>
          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
            <p className="text-sm font-semibold text-sky-800">Rata-rata Nilai</p>
            <p className="mt-1 font-display text-3xl font-bold text-sky-950 tabular-nums">
              {averagePercent}%
            </p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-900">Total Bintang</p>
            <p className="mt-1 flex items-center gap-2 font-display text-3xl font-bold text-amber-950 tabular-nums">
              <Star className="h-7 w-7 fill-amber-400 text-amber-500" />
              {totalStars}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {gameMeta.map((g) => {
            const rec = progress.gameScores[g.id];
            return (
              <div
                key={g.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4"
              >
                <div>
                  <h2 className="font-display text-lg font-bold text-emerald-950">
                    {g.name}
                  </h2>
                  {rec.played ? (
                    <p className="mt-0.5 text-sm text-emerald-800 tabular-nums">
                      Skor: <strong>{rec.score}/{rec.maxScore}</strong> ({rec.percentage}%) · Benar: {rec.correctCount} · Salah: {rec.wrongCount}
                    </p>
                  ) : (
                    <p className="mt-0.5 text-sm text-emerald-700">
                      Belum dimainkan pada sesi ini.
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {rec.played && (
                    <div className="flex items-center gap-0.5" aria-label={`${rec.stars} bintang`}>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`h-5 w-5 ${
                            idx < rec.stars
                              ? 'fill-amber-400 text-amber-500'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => onOpenGame(g.id)}
                    className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 whitespace-nowrap cursor-pointer"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    {rec.played ? 'Main Lagi' : 'Mainkan'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Digital Certificate */}
      <section className="space-y-4">
        <div className="no-print flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex-1 min-w-[240px]">
            <label
              htmlFor="student-name-input"
              className="block font-display text-base font-bold text-amber-950"
            >
              Tulis Nama Lengkapmu untuk Sertifikat Digital:
            </label>
            <input
              id="student-name-input"
              type="text"
              value={progress.studentName}
              onChange={(e) => onUpdateName(e.target.value)}
              placeholder="Contoh: Siti Rahmawati"
              className="mt-2 w-full max-w-md rounded-xl border border-amber-300 bg-white px-4 py-2.5 text-base font-medium text-emerald-950 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleDownloadCertificate}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              Unduh Gambar Sertifikat
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-amber-300 bg-white px-4 py-2.5 text-sm font-semibold text-amber-950 hover:bg-amber-100 cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              Cetak Sertifikat
            </button>
          </div>
        </div>

        <div
          ref={certRef}
          className="print-certificate relative overflow-hidden rounded-3xl border-8 border-emerald-600 bg-[#FFFDF7] p-6 text-center shadow-sm sm:p-10"
        >
          <div className="rounded-2xl border-2 border-amber-400 p-6 sm:p-8">
            <div className="flex justify-center">
              <CreatureIcon creature="kiki" size={76} />
            </div>

            <p className="mt-2 text-xs font-bold tracking-widest text-emerald-700 sm:text-sm">
              MEDIA PEMBELAJARAN IPAS KELAS 3 SD
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold text-emerald-950 sm:text-4xl">
              SERTIFIKAT DIGITAL
            </h2>
            <p className="mt-4 text-base text-emerald-800">
              Diberikan dengan bangga kepada:
            </p>

            <p className="mt-2 font-display text-3xl font-bold text-sky-700 sm:text-4xl">
              {progress.studentName.trim() || 'Siswa Hebat Kelas 3 SD'}
            </p>

            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-emerald-900">
              {allGamesDone
                ? 'Telah menyelesaikan seluruh materi dan 5 permainan edukatif dalam petualangan:'
                : 'Telah aktif belajar dan bermain menjelajahi materi Ekosistem dan Simbiosis dalam petualangan:'}
            </p>
            <p className="mt-1 font-display text-xl font-bold text-emerald-800">
              PETUALANGAN SERU DI DUNIA EKOSISTEM
            </p>

            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-3">
              <Award className="h-6 w-6 text-amber-600" />
              <span className="font-display text-lg font-bold text-amber-950">
                {playedGames.length > 0 ? award.title : 'CALON BINTANG EKOSISTEM'}
              </span>
              <span className="text-sm font-semibold text-amber-800 tabular-nums">
                · Nilai Rata-rata {averagePercent}% · {totalStars} Bintang
              </span>
            </div>

            <p className="mt-6 text-sm italic text-emerald-700">
              &ldquo;Mari kita menjaga alam dan menyayangi semua ciptaan Tuhan!&rdquo; — Kiki si Kupu-Kupu
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
