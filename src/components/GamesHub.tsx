import React from 'react';
import { ArrowLeft, CheckCircle2, Gamepad2 } from 'lucide-react';
import { AppView, GameId, GameScoreRecord, StudentProgress } from '../types/ecosystem';
import { Game1Sort } from './games/Game1Sort';
import { Game2SymbiosisMatch } from './games/Game2SymbiosisMatch';
import { Game3WhoAmI } from './games/Game3WhoAmI';
import { Game4TrueFalse } from './games/Game4TrueFalse';
import { Game5FinalMission } from './games/Game5FinalMission';
import { audioEngine } from '../utils/audioEngine';

interface GamesHubProps {
  activeGame: GameId;
  progress: StudentProgress;
  onSelectGame: (id: GameId) => void;
  onSaveGameScore: (id: GameId, record: GameScoreRecord) => void;
  onNavigate: (view: AppView) => void;
}

export const GamesHub: React.FC<GamesHubProps> = ({
  activeGame,
  progress,
  onSelectGame,
  onSaveGameScore,
  onNavigate,
}) => {
  const gameTabs: { id: GameId; shortLabel: string }[] = [
    { id: 1, shortLabel: 'Game 1: Biotik-Abiotik' },
    { id: 2, shortLabel: 'Game 2: Simbiosis' },
    { id: 3, shortLabel: 'Game 3: Siapa Aku?' },
    { id: 4, shortLabel: 'Game 4: Benar-Salah' },
    { id: 5, shortLabel: 'Game 5: Misi Akhir' },
  ];

  const completedGamesCount = Object.values(progress.gameScores).filter(
    (g) => g.played
  ).length;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Menu Utama
        </button>

        <div className="flex items-center gap-2 text-sm font-bold text-emerald-900">
          <Gamepad2 className="h-5 w-5 text-amber-600" />
          <span className="tabular-nums">Game Selesai: {completedGamesCount}/5</span>
        </div>
      </div>

      {/* Game Selector Bar */}
      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-amber-200 bg-white p-2 sm:grid-cols-5">
        {gameTabs.map((tab) => {
          const isActive = activeGame === tab.id;
          const isDone = progress.gameScores[tab.id].played;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                audioEngine.playClickSound();
                onSelectGame(tab.id);
              }}
              className={`flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors sm:text-sm cursor-pointer ${
                isActive
                  ? 'bg-amber-400 text-amber-950 shadow-xs'
                  : 'bg-amber-50/60 text-emerald-950 hover:bg-amber-100'
              }`}
            >
              {isDone && (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
              )}
              <span className="truncate">{tab.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {activeGame === 1 && (
        <Game1Sort
          onComplete={(rec) => onSaveGameScore(1, rec)}
          onNextGame={() => onSelectGame(2)}
        />
      )}
      {activeGame === 2 && (
        <Game2SymbiosisMatch
          onComplete={(rec) => onSaveGameScore(2, rec)}
          onNextGame={() => onSelectGame(3)}
        />
      )}
      {activeGame === 3 && (
        <Game3WhoAmI
          onComplete={(rec) => onSaveGameScore(3, rec)}
          onNextGame={() => onSelectGame(4)}
        />
      )}
      {activeGame === 4 && (
        <Game4TrueFalse
          onComplete={(rec) => onSaveGameScore(4, rec)}
          onNextGame={() => onSelectGame(5)}
        />
      )}
      {activeGame === 5 && (
        <Game5FinalMission
          onComplete={(rec) => onSaveGameScore(5, rec)}
          onGoToScores={() => onNavigate('scores')}
          onGoToClosing={() => onNavigate('closing')}
        />
      )}
    </div>
  );
};
