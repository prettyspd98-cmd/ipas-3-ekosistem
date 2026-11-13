import React, { useState } from 'react';
import { RotateCcw, ArrowRight, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { GAME2_PAIRS } from '../../data/learningContent';
import { GameScoreRecord } from '../../types/ecosystem';
import { CreatureIcon } from '../CreatureArt';
import { audioEngine } from '../../utils/audioEngine';

interface Game2SymbiosisMatchProps {
  onComplete: (record: GameScoreRecord) => void;
  onNextGame: () => void;
}

type SymbiosisChoice = 'mutualisme' | 'komensalisme' | 'parasitisme';

export const Game2SymbiosisMatch: React.FC<Game2SymbiosisMatchProps> = ({
  onComplete,
  onNextGame,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<SymbiosisChoice | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentPair = GAME2_PAIRS[currentIndex];
  const hasAnswered = selectedChoice !== null;
  const isCorrect = selectedChoice === currentPair.answer;

  const choices: {
    id: SymbiosisChoice;
    label: string;
    symbol: string;
    desc: string;
    style: string;
  }[] = [
    {
      id: 'mutualisme',
      label: 'Mutualisme',
      symbol: '(+/+)',
      desc: 'Saling menguntungkan',
      style: 'border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-950',
    },
    {
      id: 'komensalisme',
      label: 'Komensalisme',
      symbol: '(+/0)',
      desc: 'Satu untung, satu tidak terpengaruh',
      style: 'border-sky-300 bg-sky-50 hover:bg-sky-100 text-sky-950',
    },
    {
      id: 'parasitisme',
      label: 'Parasitisme',
      symbol: '(+/-)',
      desc: 'Satu untung, satu dirugikan',
      style: 'border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-950',
    },
  ];

  const handleSelect = (choice: SymbiosisChoice) => {
    if (hasAnswered) return;
    setSelectedChoice(choice);

    const right = choice === currentPair.answer;
    if (right) {
      audioEngine.playCorrectSound();
      audioEngine.speakShortFeedback('Hebat! Jawabanmu benar!');
      setCorrectCount((c) => c + 1);
    } else {
      audioEngine.playWrongSound();
      audioEngine.speakShortFeedback('Tetap semangat! Yuk lihat penjelasannya.');
      setWrongCount((w) => w + 1);
    }
  };

  const handleNextPair = () => {
    audioEngine.playClickSound();
    if (currentIndex + 1 < GAME2_PAIRS.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedChoice(null);
    } else {
      const score = correctCount * 10;
      const maxScore = GAME2_PAIRS.length * 10;
      const percentage = Math.round((correctCount / GAME2_PAIRS.length) * 100);
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
    setCurrentIndex(0);
    setSelectedChoice(null);
    setCorrectCount(0);
    setWrongCount(0);
    setFinished(false);
  };

  const percent = Math.round((correctCount / GAME2_PAIRS.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-white p-5">
        <div>
          <h2 className="font-display text-2xl font-bold text-emerald-950">
            Game 2: Pasangkan Pasangan Simbiosis
          </h2>
          <p className="mt-1 text-sm text-emerald-800 sm:text-base">
            Pilih jenis simbiosis yang tepat untuk setiap pasangan makhluk hidup di bawah ini!
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
              Pasangan {currentIndex + 1} dari {GAME2_PAIRS.length}
            </span>
            <span className="tabular-nums">
              Benar: {correctCount}
            </span>
          </div>

          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-emerald-100">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-300"
              style={{
                width: `${Math.round(((currentIndex + (hasAnswered ? 1 : 0)) / GAME2_PAIRS.length) * 100)}%`,
              }}
            />
          </div>

          {/* Organism Pair Display */}
          <div className="mt-6 flex flex-col items-center rounded-3xl border border-amber-200 bg-amber-50/70 p-6 text-center">
            <div className="flex items-center justify-center gap-6">
              <div className="rounded-2xl bg-white p-4 shadow-xs">
                <CreatureIcon creature={currentPair.creatureA} size={84} />
              </div>
              <span className="font-display text-3xl font-bold text-amber-600">+</span>
              <div className="rounded-2xl bg-white p-4 shadow-xs">
                <CreatureIcon creature={currentPair.creatureB} size={84} />
              </div>
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold text-emerald-950">
              {currentPair.pairName}
            </h3>
            <p className="mt-1 text-sm text-emerald-800">
              Termasuk jenis simbiosis apakah hubungan ini?
            </p>
          </div>

          {/* Choices */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {choices.map((c) => {
              const isPicked = selectedChoice === c.id;
              const isRightAnswer = hasAnswered && currentPair.answer === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  disabled={hasAnswered}
                  onClick={() => handleSelect(c.id)}
                  className={`flex min-h-[86px] flex-col items-center justify-center rounded-2xl border-2 p-4 text-center transition-transform cursor-pointer disabled:cursor-default ${
                    !hasAnswered
                      ? `${c.style} active:scale-95`
                      : isRightAnswer
                        ? 'border-emerald-600 bg-emerald-100 text-emerald-950 ring-2 ring-emerald-500/40'
                        : isPicked
                          ? 'border-rose-500 bg-rose-100 text-rose-950 animate-wobble'
                          : 'border-slate-200 bg-slate-50 text-slate-500 opacity-70'
                  }`}
                >
                  <span className="font-display text-lg font-bold">
                    {c.label} {c.symbol}
                  </span>
                  <span className="mt-1 text-xs font-medium">{c.desc}</span>
                </button>
              );
            })}
          </div>

          {/* Post-answer explanation */}
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
                      : `Hampir tepat! Jawaban yang benar adalah Simbiosis ${currentPair.answer.toUpperCase()}.`}
                  </p>
                  <p className="mt-1 text-base">{currentPair.explanation}</p>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextPair}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 font-display text-base font-bold text-white hover:bg-emerald-700 cursor-pointer"
                >
                  {currentIndex + 1 < GAME2_PAIRS.length ? 'Pasangan Berikutnya' : 'Lihat Hasil Game 2'}
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
            Game 2 Selesai! Kamu Hebat!
          </h3>
          <p className="mt-2 text-lg font-semibold text-emerald-900 tabular-nums">
            Benar: {correctCount} dari {GAME2_PAIRS.length} ({percent}%)
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
              Lanjut ke Game 3
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
