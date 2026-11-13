/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import {
  AppView,
  GameId,
  GameScoreRecord,
  MaterialId,
  StudentProgress,
} from './types/ecosystem';
import { TopNav } from './components/TopNav';
import { HomeView } from './components/HomeView';
import { GuideView } from './components/GuideView';
import { MateriView } from './components/MateriView';
import { GamesHub } from './components/GamesHub';
import { ScoresView } from './components/ScoresView';
import { ClosingView } from './components/ClosingView';
import { audioEngine } from './utils/audioEngine';

const STORAGE_KEY = 'dunia_ekosistem_progress_v1';

const EMPTY_GAME_SCORE: GameScoreRecord = {
  played: false,
  score: 0,
  maxScore: 100,
  percentage: 0,
  correctCount: 0,
  wrongCount: 0,
  stars: 0,
};

const INITIAL_PROGRESS: StudentProgress = {
  studentName: '',
  completedMaterials: [],
  gameScores: {
    1: { ...EMPTY_GAME_SCORE },
    2: { ...EMPTY_GAME_SCORE, maxScore: 60 },
    3: { ...EMPTY_GAME_SCORE },
    4: { ...EMPTY_GAME_SCORE },
    5: { ...EMPTY_GAME_SCORE, maxScore: 150 },
  },
};

export default function App() {
  const [view, setView] = useState<AppView>('home');
  const [activeMaterial, setActiveMaterial] = useState<MaterialId>(1);
  const [activeGame, setActiveGame] = useState<GameId>(1);
  const [musicOn, setMusicOn] = useState(false);

  const [progress, setProgress] = useState<StudentProgress>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as StudentProgress;
      }
    } catch {
      // Ignore storage errors
    }
    return INITIAL_PROGRESS;
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage errors
    }
  }, [progress]);

  useEffect(() => {
    return () => {
      audioEngine.toggleBackgroundMusic(false);
      audioEngine.stopSpeech();
    };
  }, []);

  const navigate = (nextView: AppView) => {
    audioEngine.playClickSound();
    audioEngine.stopSpeech();
    setView(nextView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openMaterial = (id: MaterialId) => {
    audioEngine.playClickSound();
    audioEngine.stopSpeech();
    setActiveMaterial(id);
    setView('materi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openGame = (id: GameId) => {
    audioEngine.playClickSound();
    audioEngine.stopSpeech();
    setActiveGame(id);
    setView('games');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completeMaterial = (id: MaterialId) => {
    setProgress((prev) => {
      if (prev.completedMaterials.includes(id)) return prev;
      return {
        ...prev,
        completedMaterials: [...prev.completedMaterials, id],
      };
    });
  };

  const saveGameScore = (id: GameId, record: GameScoreRecord) => {
    setProgress((prev) => ({
      ...prev,
      gameScores: {
        ...prev.gameScores,
        [id]: record,
      },
    }));
  };

  const updateStudentName = (studentName: string) => {
    setProgress((prev) => ({ ...prev, studentName }));
  };

  const resetAllScores = () => {
    audioEngine.playClickSound();
    setProgress({
      ...INITIAL_PROGRESS,
      studentName: progress.studentName,
    });
  };

  const handleToggleMusic = () => {
    const next = !musicOn;
    audioEngine.toggleBackgroundMusic(next);
    setMusicOn(next);
  };

  const completedTasks =
    progress.completedMaterials.length +
    Object.values(progress.gameScores).filter((g) => g.played).length;
  const overallPercent = Math.round((completedTasks / 9) * 100);

  return (
    <div className="min-h-screen bg-[#F4FBF7] text-[#173026] flex flex-col">
      <TopNav
        currentView={view}
        onNavigate={navigate}
        musicOn={musicOn}
        onToggleMusic={handleToggleMusic}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {view === 'home' && (
          <HomeView
            progress={progress}
            overallPercent={overallPercent}
            onNavigate={navigate}
            onOpenMaterial={openMaterial}
            onOpenGame={openGame}
          />
        )}

        {view === 'guide' && (
          <GuideView
            onNavigate={navigate}
            onStartLearning={() => openMaterial(1)}
          />
        )}

        {view === 'materi' && (
          <MateriView
            activeMaterial={activeMaterial}
            completedMaterials={progress.completedMaterials}
            onSelectMaterial={(id) => {
              audioEngine.stopSpeech();
              setActiveMaterial(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCompleteMaterial={completeMaterial}
            onNavigate={navigate}
          />
        )}

        {view === 'games' && (
          <GamesHub
            activeGame={activeGame}
            progress={progress}
            onSelectGame={(id) => {
              setActiveGame(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSaveGameScore={saveGameScore}
            onNavigate={navigate}
          />
        )}

        {view === 'scores' && (
          <ScoresView
            progress={progress}
            onUpdateName={updateStudentName}
            onOpenGame={openGame}
            onResetScores={resetAllScores}
            onNavigate={navigate}
          />
        )}

        {view === 'closing' && <ClosingView onNavigate={navigate} />}
      </main>

      <footer className="no-print border-t border-emerald-200/70 bg-white/80 py-4 text-center text-xs text-emerald-800 sm:text-sm">
        <p>
          Petualangan Seru di Dunia Ekosistem · Media Pembelajaran IPAS Kelas 3 SD bersama Kiki si Kupu-Kupu
        </p>
      </footer>
    </div>
  );
}
