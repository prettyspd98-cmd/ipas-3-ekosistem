import React, { useState } from 'react';
import { RotateCcw, ArrowRight, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { GAME3_QUESTIONS } from '../../data/learningContent';
import { GameScoreRecord } from '../../types/ecosystem';
import { CreatureIcon } from '../CreatureArt';
import { audioEngine } from '../../utils/audioEngine';

interface Game3WhoAmIProps {
  onComplete: (record: GameScoreRecord) => void;
  onNextGame: () => void;
}

export const Game3WhoAmI: React.FC<Game3WhoAmIProps> = ({
  onComplete,
  onNextGame,
}) => {
  const [index, setIndex] = useState(0);
  const [pickedOption, setPickedOption] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = GAME3_QUESTIONS[index];
  const hasAnswered = pickedOption !== null;
  const isCorrect = pickedOption === q.correctAnswer;

  const handleAnswer = (opt: string) => {
    if (hasAnswered) return;
    setPickedOption(opt);
    if (opt === q.correctAnswer) {
      audioEngine.playCorrectSound();
      audioEngine.speakShortFeedback('Hebat! Jawabanmu benar!');
      setCorrectCount((c) => c + 1);
    } else {
      audioEngine.playWrongSound();
      audioEngine.speakShortFeedback('Yuk, simak penjelasannya!');
      setWrongCount((w) => w + 1);
    }
  };

  const handleNext = () => {
    audioEngine.playClickSound();
    if (index + 1 < GAME3_QUESTIONS.length) {
      setIndex((i) => i + 1);
      setPickedOption(null);
    } else {
      const score = correctCount * 10;
      const maxScore = GAME3_QUESTIONS.length * 10;
      const percentage = Math.round((correctCount / GAME3_QUESTIONS.length) * 100);
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
    setPickedOption(null);
    setCorrectCount(0);
    setWrongCount(0);
    setFinished(false);
  };

  const percent = Math.round((correctCount / GAME3_QUESTIONS.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-white p-5">
        <div>
          <h2 className="font-display text-2xl font-bold text-emerald-950">
            Game 3: Siapa Aku? (Tebak Gambar)
          </h2>
          <p className="mt-1 text-sm text-emerald-800 sm:text-base">
            Perhatikan gambar dan baca petunjuknya, lalu tebak siapakah aku!
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
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-bold text-emerald-800">
            <span className="tabular-nums">
              Soal {index + 1} dari {GAME3_QUESTIONS.length} · {q.level}
            </span>
            <span className="tabular-nums">Skor Sementara: {correctCount * 10}</span>
          </div>

          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-emerald-100">
            <div
              className="h-full rounded-full bg-amber-500 transition-all duration-300"
              style={{
                width: `${Math.round(((index + (hasAnswered ? 1 : 0)) / GAME3_QUESTIONS.length) * 100)}%`,
              }}
            />
          </div>

          <div className="mt-6 grid items-center gap-6 md:grid-cols-12">
            <div className="flex flex-col items-center justify-center rounded-3xl border border-sky-200 bg-sky-50/80 p-6 md:col-span-4">
              <div className="animate-float-slow">
                <CreatureIcon creature={q.creature} size={116} />
              </div>
            </div>

            <div className="md:col-span-8">
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
                <p className="font-display text-lg font-semibold leading-relaxed text-emerald-950 sm:text-xl">
                  &ldquo;{q.clue}&rdquo;
                </p>
              </div>

              <div className="mt-4 grid gap-3">
                {q.options.map((opt, optIdx) => {
                  const letter = String.fromCharCode(65 + optIdx);
                  const isPicked = pickedOption === opt;
                  const isRight = hasAnswered && opt === q.correctAnswer;
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={hasAnswered}
                      onClick={() => handleAnswer(opt)}
                      className={`flex min-h-[54px] items-center gap-3 rounded-2xl border-2 px-5 py-3 text-left font-display text-lg font-bold transition-transform cursor-pointer disabled:cursor-default ${
                        !hasAnswered
                          ? 'border-emerald-200 bg-white text-emerald-950 hover:border-emerald-500 hover:bg-emerald-50 active:scale-[0.99]'
                          : isRight
                            ? 'border-emerald-600 bg-emerald-100 text-emerald-950'
                            : isPicked
                              ? 'border-rose-500 bg-rose-100 text-rose-950 animate-wobble'
                              : 'border-slate-200 bg-slate-50 text-slate-400'
                      }`}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
                        {letter}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
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
                      ? 'Hebat! Jawabanmu Benar!'
                      : `Belum tepat! Jawaban yang benar adalah ${q.correctAnswer}.`}
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
                  {index + 1 < GAME3_QUESTIONS.length ? 'Soal Berikutnya' : 'Lihat Hasil Game 3'}
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
            Tebak Gambar Siapa Aku Selesai!
          </h3>
          <p className="mt-2 text-lg font-semibold text-emerald-900 tabular-nums">
            Benar: {correctCount} dari {GAME3_QUESTIONS.length} ({percent}%)
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
              className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 font-display text-base font-bold text-white hover:bg-emerald-700 cursor-pointer"
            >
              Lanjut ke Game 4
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
