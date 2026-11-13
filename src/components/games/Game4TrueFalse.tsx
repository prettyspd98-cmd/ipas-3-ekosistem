import React, { useState } from 'react';
import { RotateCcw, ArrowRight, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { GAME4_STATEMENTS } from '../../data/learningContent';
import { GameScoreRecord } from '../../types/ecosystem';
import { CreatureIcon } from '../CreatureArt';
import { audioEngine } from '../../utils/audioEngine';

interface Game4TrueFalseProps {
  onComplete: (record: GameScoreRecord) => void;
  onNextGame: () => void;
}

export const Game4TrueFalse: React.FC<Game4TrueFalseProps> = ({
  onComplete,
  onNextGame,
}) => {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const item = GAME4_STATEMENTS[index];
  const hasAnswered = picked !== null;
  const isCorrect = picked === item.isTrue;

  const handleGuess = (guess: boolean) => {
    if (hasAnswered) return;
    setPicked(guess);

    if (guess === item.isTrue) {
      audioEngine.playCorrectSound();
      audioEngine.speakShortFeedback('Hebat! Jawabanmu benar!');
      setCorrectCount((c) => c + 1);
    } else {
      audioEngine.playWrongSound();
      audioEngine.speakShortFeedback('Yuk, perhatikan penjelasannya!');
      setWrongCount((w) => w + 1);
    }
  };

  const handleNext = () => {
    audioEngine.playClickSound();
    if (index + 1 < GAME4_STATEMENTS.length) {
      setIndex((i) => i + 1);
      setPicked(null);
    } else {
      const score = correctCount * 10;
      const maxScore = GAME4_STATEMENTS.length * 10;
      const percentage = Math.round((correctCount / GAME4_STATEMENTS.length) * 100);
      const stars = percentage >= 90 ? 5 : percentage >= 75 ? 4 : percentage >= 60 ? 3 : 2;
      audioEngine.playVictorySound();
      setFinished(true);
      onComplete({
        played: true,
        score,
        maxScore,
        percentage,
        correctCount,
        wrongCount,
        stars,
      });
    }
  };

  const handleReset = () => {
    audioEngine.playClickSound();
    setIndex(0);
    setPicked(null);
    setCorrectCount(0);
    setWrongCount(0);
    setFinished(false);
  };

  const percent = Math.round((correctCount / GAME4_STATEMENTS.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-white p-5">
        <div>
          <h2 className="font-display text-2xl font-bold text-emerald-950">
            Game 4: Benar atau Salah?
          </h2>
          <p className="mt-1 text-sm text-emerald-800 sm:text-base">
            Baca pernyataan di bawah ini, lalu tekan tombol besar <strong>BENAR</strong> atau <strong>SALAH</strong>!
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-900 hover:bg-emerald-100 cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          Ulangi Game
        </button>
      </div>

      {!finished ? (
        <div className="rounded-3xl border border-emerald-200 bg-white p-6 sm:p-8">
          <div className="flex items-center justify-between text-sm font-bold text-emerald-800">
            <span className="tabular-nums">
              Pernyataan {index + 1} dari {GAME4_STATEMENTS.length}
            </span>
            <span className="tabular-nums">Benar: {correctCount}</span>
          </div>

          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-emerald-100">
            <div
              className="h-full rounded-full bg-sky-500 transition-all duration-300"
              style={{
                width: `${Math.round(((index + (hasAnswered ? 1 : 0)) / GAME4_STATEMENTS.length) * 100)}%`,
              }}
            />
          </div>

          <div className="mt-6 flex flex-col items-center rounded-3xl border border-sky-200 bg-sky-50/70 p-6 text-center sm:p-8">
            <CreatureIcon creature={item.creature} size={88} className="animate-float-slow" />
            <p className="mt-4 max-w-2xl font-display text-xl font-bold leading-snug text-emerald-950 sm:text-2xl">
              &ldquo;{item.statement}&rdquo;
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              disabled={hasAnswered}
              onClick={() => handleGuess(true)}
              className={`flex min-h-[76px] items-center justify-center gap-3 rounded-2xl border-2 font-display text-2xl font-bold transition-transform cursor-pointer disabled:cursor-default ${
                !hasAnswered
                  ? 'border-emerald-500 bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95'
                  : item.isTrue
                    ? 'border-emerald-600 bg-emerald-100 text-emerald-950 ring-2 ring-emerald-500/40'
                    : picked === true
                      ? 'border-rose-500 bg-rose-100 text-rose-950 animate-wobble'
                      : 'border-slate-200 bg-slate-50 text-slate-400'
              }`}
            >
              <CheckCircle2 className="h-7 w-7" />
              BENAR
            </button>

            <button
              type="button"
              disabled={hasAnswered}
              onClick={() => handleGuess(false)}
              className={`flex min-h-[76px] items-center justify-center gap-3 rounded-2xl border-2 font-display text-2xl font-bold transition-transform cursor-pointer disabled:cursor-default ${
                !hasAnswered
                  ? 'border-rose-500 bg-rose-500 text-white hover:bg-rose-600 active:scale-95'
                  : !item.isTrue
                    ? 'border-emerald-600 bg-emerald-100 text-emerald-950 ring-2 ring-emerald-500/40'
                    : picked === false
                      ? 'border-rose-500 bg-rose-100 text-rose-950 animate-wobble'
                      : 'border-slate-200 bg-slate-50 text-slate-400'
              }`}
            >
              <XCircle className="h-7 w-7" />
              SALAH
            </button>
          </div>

          {hasAnswered && (
            <div
              className={`mt-6 rounded-2xl border p-5 animate-pop-success ${
                isCorrect
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                  : 'border-orange-300 bg-orange-50 text-orange-950'
              }`}
            >
              <p className="font-display text-lg font-bold">
                {isCorrect ? 'Hebat! Jawabanmu Benar!' : 'Yuk perhatikan penjelasannya:'}
              </p>
              <p className="mt-1 text-base">{item.explanation}</p>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 font-display text-base font-bold text-white hover:bg-emerald-700 cursor-pointer"
                >
                  {index + 1 < GAME4_STATEMENTS.length ? 'Pernyataan Berikutnya' : 'Lihat Hasil Game 4'}
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-emerald-300 bg-emerald-50 p-8 text-center animate-pop-success">
          <div className="flex justify-center">
            <Sparkles className="h-12 w-12 text-amber-500" />
          </div>
          <h3 className="mt-3 font-display text-2xl font-bold text-emerald-950">
            Game Benar atau Salah Selesai!
          </h3>
          <p className="mt-2 text-lg font-semibold text-emerald-900 tabular-nums">
            Benar: {correctCount} dari {GAME4_STATEMENTS.length} ({percent}%)
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-emerald-300 bg-white px-5 py-2.5 font-display text-base font-bold text-emerald-900 hover:bg-emerald-100 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Main Lagi
            </button>
            <button
              type="button"
              onClick={onNextGame}
              className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 font-display text-base font-bold text-amber-950 hover:bg-amber-300 cursor-pointer"
            >
              Menuju Misi Akhir (Game 5)!
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
