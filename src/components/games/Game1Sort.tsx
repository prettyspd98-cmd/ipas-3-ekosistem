import React, { useState } from 'react';
import { RotateCcw, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { GAME1_ITEMS, Game1Item, ASSETS } from '../../data/learningContent';
import { GameScoreRecord } from '../../types/ecosystem';
import { CreatureIcon, SceneImage } from '../CreatureArt';
import { audioEngine } from '../../utils/audioEngine';

interface Game1SortProps {
  onComplete: (record: GameScoreRecord) => void;
  onNextGame: () => void;
}

export const Game1Sort: React.FC<Game1SortProps> = ({
  onComplete,
  onNextGame,
}) => {
  const [placedItems, setPlacedItems] = useState<Record<string, 'biotik' | 'abiotik'>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState<number>(0);
  const [triedWrongIds, setTriedWrongIds] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    text: string;
    detail?: string;
  } | null>(null);
  const [wobbleBox, setWobbleBox] = useState<'biotik' | 'abiotik' | null>(null);

  const remainingItems = GAME1_ITEMS.filter((item) => !placedItems[item.id]);
  const biotikItems = GAME1_ITEMS.filter((item) => placedItems[item.id] === 'biotik');
  const abiotikItems = GAME1_ITEMS.filter((item) => placedItems[item.id] === 'abiotik');
  const isFinished = remainingItems.length === 0;

  const finalizeGame = (finalWrongIds: Record<string, boolean>, totalWrong: number) => {
    const cleanFirstTry = GAME1_ITEMS.filter((i) => !finalWrongIds[i.id]).length;
    const score = cleanFirstTry * 10;
    const maxScore = GAME1_ITEMS.length * 10;
    const percentage = Math.round((score / maxScore) * 100);
    const stars = percentage >= 90 ? 5 : percentage >= 75 ? 4 : percentage >= 60 ? 3 : 2;
    audioEngine.playVictorySound();
    onComplete({
      played: true,
      score,
      maxScore,
      percentage,
      correctCount: cleanFirstTry,
      wrongCount: totalWrong,
      stars,
    });
  };

  const handleSortAttempt = (item: Game1Item, targetBox: 'biotik' | 'abiotik') => {
    if (placedItems[item.id]) return;

    if (item.category === targetBox) {
      audioEngine.playCorrectSound();
      audioEngine.speakShortFeedback('Hebat! Jawabanmu benar!');
      const nextPlaced = { ...placedItems, [item.id]: targetBox };
      setPlacedItems(nextPlaced);
      setSelectedId(null);
      setDraggedId(null);
      setFeedback({
        correct: true,
        text: `Hebat! Jawabanmu benar! ${item.name} termasuk Komponen ${targetBox === 'biotik' ? 'Biotik' : 'Abiotik'}.`,
        detail: item.reason,
      });

      if (Object.keys(nextPlaced).length === GAME1_ITEMS.length) {
        finalizeGame(triedWrongIds, wrongAttempts);
      }
    } else {
      audioEngine.playWrongSound();
      audioEngine.speakShortFeedback('Yuk, coba sekali lagi!');
      const nextWrongIds = { ...triedWrongIds, [item.id]: true };
      setTriedWrongIds(nextWrongIds);
      setWrongAttempts((w) => w + 1);
      setWobbleBox(targetBox);
      setTimeout(() => setWobbleBox(null), 450);
      setFeedback({
        correct: false,
        text: 'Yuk, coba sekali lagi!',
        detail: `Petunjuk: Apakah ${item.name} bisa bernapas dan tumbuh? Jika ya berarti Biotik, jika benda mati berarti Abiotik.`,
      });
    }
  };

  const handleDropOnBox = (e: React.DragEvent, targetBox: 'biotik' | 'abiotik') => {
    e.preventDefault();
    const idFromTransfer = e.dataTransfer.getData('text/plain') || draggedId;
    const item = GAME1_ITEMS.find((i) => i.id === idFromTransfer);
    if (item) {
      handleSortAttempt(item, targetBox);
    }
    setDraggedId(null);
  };

  const handleReset = () => {
    audioEngine.playClickSound();
    setPlacedItems({});
    setSelectedId(null);
    setDraggedId(null);
    setWrongAttempts(0);
    setTriedWrongIds({});
    setFeedback(null);
  };

  const cleanCorrectCount = GAME1_ITEMS.filter(
    (i) => placedItems[i.id] && !triedWrongIds[i.id]
  ).length;
  const currentScorePercent = Math.round((cleanCorrectCount / GAME1_ITEMS.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-white p-5">
        <div>
          <h2 className="font-display text-2xl font-bold text-emerald-950">
            Game 1: Petualangan Mencari Komponen Ekosistem
          </h2>
          <p className="mt-1 text-sm text-emerald-800 sm:text-base">
            Seret gambar ke kotak tujuan, atau <strong>klik gambar lalu klik kotak KOMPONEN BIOTIK / ABIOTIK</strong>!
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

      {/* Forest Scene Preview */}
      <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-sky-50">
        <SceneImage
          src={ASSETS.bioticAbiotic}
          alt="Pemandangan hutan berisi pohon, kupu-kupu, batu, air, burung, matahari, tanah, dan rumput"
          fallbackTitle="Ekosistem Hutan"
          className="h-40 w-full object-cover sm:h-52"
        />
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`rounded-2xl border p-4 animate-pop-success ${
            feedback.correct
              ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
              : 'border-orange-300 bg-orange-50 text-orange-950'
          }`}
        >
          <p className="font-display text-lg font-bold">{feedback.text}</p>
          {feedback.detail && <p className="mt-1 text-sm">{feedback.detail}</p>}
        </div>
      )}

      {/* Remaining Cards Pool */}
      {!isFinished ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="font-display text-base font-bold text-amber-950">
              Objek Ekosistem ({remainingItems.length} tersisa):
            </p>
            {selectedId && (
              <span className="text-xs font-bold text-sky-800">
                Sekarang klik salah satu kotak di bawah!
              </span>
            )}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {remainingItems.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  draggable
                  onDragStart={(e) => {
                    setDraggedId(item.id);
                    setSelectedId(item.id);
                    e.dataTransfer.setData('text/plain', item.id);
                  }}
                  onClick={() => {
                    audioEngine.playClickSound();
                    setSelectedId(isSelected ? null : item.id);
                  }}
                  className={`flex flex-col items-center rounded-2xl border-2 bg-white p-3 text-center transition-transform hover:scale-[1.03] active:scale-95 cursor-grab active:cursor-grabbing ${
                    isSelected
                      ? 'border-amber-500 ring-4 ring-amber-300/60'
                      : 'border-emerald-200 hover:border-emerald-400'
                  }`}
                >
                  <CreatureIcon creature={item.creature} size={56} />
                  <span className="mt-2 font-display text-sm font-bold text-emerald-950">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-emerald-300 bg-emerald-50 p-6 text-center animate-pop-success">
          <div className="flex justify-center">
            <Sparkles className="h-10 w-10 text-amber-500" />
          </div>
          <h3 className="mt-2 font-display text-2xl font-bold text-emerald-950">
            Luar Biasa! Semua Komponen Berhasil Dikelompokkan!
          </h3>
          <p className="mt-2 text-base font-semibold text-emerald-900 tabular-nums">
            Ketepatan Pertama Kali: {cleanCorrectCount}/{GAME1_ITEMS.length} ({currentScorePercent}%) · Percobaan Salah: {wrongAttempts}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
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
              Lanjut ke Game 2
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Drop Target Boxes */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Biotik Box */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDropOnBox(e, 'biotik')}
          onClick={() => {
            if (selectedId) {
              const item = GAME1_ITEMS.find((i) => i.id === selectedId);
              if (item) handleSortAttempt(item, 'biotik');
            }
          }}
          className={`min-h-[210px] rounded-3xl border-2 border-dashed p-5 transition-colors ${
            wobbleBox === 'biotik' ? 'animate-wobble border-orange-500 bg-orange-50' : 'border-emerald-400 bg-emerald-50/70'
          } ${selectedId ? 'cursor-pointer hover:bg-emerald-100/70' : ''}`}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-bold text-emerald-950">
              KOMPONEN BIOTIK
            </h3>
            <span className="text-xs font-bold text-emerald-800">Makhluk Hidup</span>
          </div>
          {selectedId && (
            <p className="mt-1 text-xs font-semibold text-emerald-700">
              Klik kotak ini untuk memasukkan ke Komponen Biotik
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2.5">
            {biotikItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 rounded-xl border border-emerald-300 bg-white px-3 py-2 animate-pop-success"
              >
                <CreatureIcon creature={item.creature} size={32} />
                <span className="text-sm font-bold text-emerald-950">{item.name}</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
            ))}
          </div>
        </div>

        {/* Abiotik Box */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDropOnBox(e, 'abiotik')}
          onClick={() => {
            if (selectedId) {
              const item = GAME1_ITEMS.find((i) => i.id === selectedId);
              if (item) handleSortAttempt(item, 'abiotik');
            }
          }}
          className={`min-h-[210px] rounded-3xl border-2 border-dashed p-5 transition-colors ${
            wobbleBox === 'abiotik' ? 'animate-wobble border-orange-500 bg-orange-50' : 'border-sky-400 bg-sky-50/70'
          } ${selectedId ? 'cursor-pointer hover:bg-sky-100/70' : ''}`}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-bold text-sky-950">
              KOMPONEN ABIOTIK
            </h3>
            <span className="text-xs font-bold text-sky-800">Benda Tak Hidup</span>
          </div>
          {selectedId && (
            <p className="mt-1 text-xs font-semibold text-sky-700">
              Klik kotak ini untuk memasukkan ke Komponen Abiotik
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2.5">
            {abiotikItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 rounded-xl border border-sky-300 bg-white px-3 py-2 animate-pop-success"
              >
                <CreatureIcon creature={item.creature} size={32} />
                <span className="text-sm font-bold text-sky-950">{item.name}</span>
                <CheckCircle2 className="h-4 w-4 text-sky-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
