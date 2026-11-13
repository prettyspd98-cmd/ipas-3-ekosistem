import React, { useState } from 'react';
import {
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Star,
  Award,
} from 'lucide-react';
import { GAME5_QUESTIONS, getAwardCategory } from '../../data/learningContent';
import { GameScoreRecord } from '../../types/ecosystem';
import { CreatureIcon } from '../CreatureArt';
import { audioEngine } from '../../utils/audioEngine';

interface Game5FinalMissionProps {
  onComplete: (record: GameScoreRecord) => void;
  onGoToScores: () => void;
  onGoToClosing: () => void;
}

export const Game5FinalMission: React.FC<Game5FinalMissionProps> = ({
  onComplete,
  onGoToScores,
  onGoToClosing,
}) => {
  const [index, setIndex] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = GAME5_QUESTIONS[index];
  const hasAnswered = selectedIdx !== null;
  const isCorrect = selectedIdx === q.correctIndex;

  const handleSelectOption = (optIndex: number) => {
    if (hasAnswered) return;
    setSelectedIdx(optIndex);

    if (optIndex === q.correctIndex) {
      audioEngine.playCorrectSound();
      audioEngine.speakShortFeedback('Hebat! Tambah 10 poin!');
      setCorrectCount((c) => c + 1);
    } else {
      audioEngine.playWrongSound();
      audioEngine.speakShortFeedback('Yuk, baca penjelasannya!');
      setWrongCount((w) => w + 1);
    }
  };

  const handleNext = () => {
    audioEngine.playClickSound();
    if (index + 1 < GAME5_QUESTIONS.length) {
      setIndex((i) => i + 1);
      setSelectedIdx(null);
    } else {
      const score = correctCount * 10;
      const maxScore = GAME5_QUESTIONS.length * 10;
      const percentage = Math.round((correctCount / GAME5_QUESTIONS.length) * 100);
      const award = getAwardCategory(percentage);
      audioEngine.playVictorySound();
      setFinished(true);
      onComplete({
        played: true,
        score,
        maxScore,
        percentage,
        correctCount,
        wrongCount,
        stars: award.stars,
      });
    }
  };

  const handleReset = () => {
    audioEngine.playClickSound();
    setIndex(0);
    setSelectedIdx(null);
    setCorrectCount(0);
    setWrongCount(0);
    setFinished(false);
  };

  const finalScore = correctCount * 10;
  const maxScore = GAME5_QUESTIONS.length * 10;
  const percentage = Math.round((correctCount / GAME5_QUESTIONS.length) * 100);
  const award = getAwardCategory(percentage);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-white p-5">
        <div>
          <h2 className="font-display text-2xl font-bold text-emerald-950">
            Game 5: Petualangan Misi Akhir
          </h2>
          <p className="mt-1 text-sm text-emerald-800 sm:text-base">
            15 soal tantangan tentang ekosistem dan simbiosis! Setiap jawaban benar bernilai <strong>10 poin</strong>.
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-900 hover:bg-emerald-100 cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          Ulangi Misi
        </button>
      </div>

      {!finished ? (
        <div className="rounded-3xl border border-emerald-200 bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-bold text-emerald-800">
            <span className="tabular-nums">
              Soal {index + 1} dari {GAME5_QUESTIONS.length} · Topik: {q.topic}
            </span>
            <span className="font-display text-base text-amber-700 tabular-nums">
              Poin: {correctCount * 10} / {maxScore}
            </span>
          </div>

          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-emerald-100">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-300"
              style={{
                width: `${Math.round(((index + (hasAnswered ? 1 : 0)) / GAME5_QUESTIONS.length) * 100)}%`,
              }}
            />
          </div>

          {/* Single Question Card */}
          <div className="mt-6 flex flex-col items-start gap-5 rounded-2xl border border-amber-200 bg-amber-50/60 p-5 sm:flex-row sm:items-center">
            <div className="shrink-0 rounded-2xl bg-white p-3 shadow-xs">
              <CreatureIcon creature={q.creature} size={76} />
            </div>
            <h3 className="font-display text-xl font-bold leading-snug text-emerald-950 sm:text-2xl">
              {q.question}
            </h3>
          </div>

          <div className="mt-5 grid gap-3">
            {q.options.map((opt, optIdx) => {
              const letter = String.fromCharCode(65 + optIdx);
              const isPicked = selectedIdx === optIdx;
              const isRight = hasAnswered && optIdx === q.correctIndex;
              return (
                <button
                  key={opt}
                  type="button"
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`flex min-h-[56px] items-center gap-3.5 rounded-2xl border-2 px-5 py-3.5 text-left text-base font-semibold transition-transform sm:text-lg cursor-pointer disabled:cursor-default ${
                    !hasAnswered
                      ? 'border-emerald-200 bg-white text-emerald-950 hover:border-emerald-500 hover:bg-emerald-50 active:scale-[0.99]'
                      : isRight
                        ? 'border-emerald-600 bg-emerald-100 text-emerald-950'
                        : isPicked
                          ? 'border-rose-500 bg-rose-100 text-rose-950 animate-wobble'
                          : 'border-slate-200 bg-slate-50 text-slate-400'
                  }`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 font-display text-sm font-bold text-white">
                    {letter}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {hasAnswered && (
            <div
              className={`mt-6 rounded-2xl border p-5 animate-pop-success ${
                isCorrect
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                  : 'border-orange-300 bg-orange-50 text-orange-950'
              }`}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
                ) : (
                  <XCircle className="mt-0.5 h-6 w-6 shrink-0 text-rose-600" />
                )}
                <div>
                  <p className="font-display text-lg font-bold">
                    {isCorrect
                      ? 'Hebat! Jawabanmu Benar (+10 poin)!'
                      : `Belum tepat! Jawaban yang benar adalah ${String.fromCharCode(65 + q.correctIndex)}.`}
                  </p>
                  <p className="mt-1 text-base">{q.explanation}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 font-display text-base font-bold text-white hover:bg-emerald-700 cursor-pointer"
                >
                  {index + 1 < GAME5_QUESTIONS.length ? 'Soal Berikutnya' : 'Selesaikan Misi Akhir'}
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-amber-300 bg-white p-6 text-center shadow-sm sm:p-10 animate-pop-success">
          <div className="flex justify-center">
            <CreatureIcon creature="kiki" size={96} className="animate-float-slow" />
          </div>

          <div
            className={`mt-4 inline-flex items-center gap-2 rounded-2xl border px-5 py-2 font-display text-xl font-bold sm:text-2xl ${award.badgeColor}`}
          >
            <Award className="h-6 w-6" />
            {award.title}
          </div>

          <div className="mt-4 flex justify-center gap-1.5" aria-label={`${award.stars} bintang penghargaan`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-9 w-9 ${
                  i < award.stars ? 'fill-amber-400 text-amber-500' : 'text-slate-200'
                }`}
              />
            ))}
          </div>

          <p className="mx-auto mt-4 max-w-xl text-base font-medium text-emerald-900 sm:text-lg">
            {award.message}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-xs font-bold text-emerald-800">Skor Akhir</p>
              <p className="mt-1 font-display text-2xl font-bold text-emerald-950 tabular-nums">
                {finalScore} / {maxScore}
              </p>
            </div>
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
              <p className="text-xs font-bold text-sky-800">Persentase Nilai</p>
              <p className="mt-1 font-display text-2xl font-bold text-sky-950 tabular-nums">
                {percentage}%
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-xs font-bold text-emerald-800">Jawaban Benar</p>
              <p className="mt-1 font-display text-2xl font-bold text-emerald-700 tabular-nums">
                {correctCount}
              </p>
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
              <p className="text-xs font-bold text-rose-800">Jawaban Salah</p>
              <p className="mt-1 font-display text-2xl font-bold text-rose-700 tabular-nums">
                {wrongCount}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl border border-emerald-300 bg-white px-5 py-2.5 font-display text-base font-bold text-emerald-900 hover:bg-emerald-50 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Ulangi Misi Akhir
            </button>
            <button
              type="button"
              onClick={onGoToScores}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-amber-400 px-6 py-2.5 font-display text-base font-bold text-amber-950 hover:bg-amber-300 cursor-pointer"
            >
              Lihat Nilai & Sertifikat
            </button>
            <button
              type="button"
              onClick={onGoToClosing}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-2.5 font-display text-base font-bold text-white hover:bg-emerald-700 cursor-pointer"
            >
              Halaman Penutup
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
