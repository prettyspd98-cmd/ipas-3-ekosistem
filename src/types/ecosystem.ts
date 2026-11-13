export type AppView = 'home' | 'guide' | 'materi' | 'games' | 'scores' | 'closing';

export type MaterialId = 1 | 2 | 3 | 4;

export type GameId = 1 | 2 | 3 | 4 | 5;

export type CreatureKey =
  | 'kiki'
  | 'lebah'
  | 'bunga'
  | 'burung'
  | 'ulat'
  | 'katak'
  | 'serangga'
  | 'ikan'
  | 'kelinci'
  | 'pohon'
  | 'rumput'
  | 'jamur'
  | 'bakteri'
  | 'manusia'
  | 'air'
  | 'tanah'
  | 'udara'
  | 'matahari'
  | 'batu'
  | 'suhu'
  | 'kerbau'
  | 'jalak'
  | 'anggrek'
  | 'remora'
  | 'hiu'
  | 'benalu'
  | 'mangga'
  | 'kutu'
  | 'kucing'
  | 'cacing_pita'
  | 'hutan'
  | 'sawah'
  | 'sungai'
  | 'laut'
  | 'kebun';

export interface GameScoreRecord {
  played: boolean;
  score: number;
  maxScore: number;
  percentage: number;
  correctCount: number;
  wrongCount: number;
  stars: number;
}

export interface StudentProgress {
  studentName: string;
  completedMaterials: MaterialId[];
  gameScores: Record<GameId, GameScoreRecord>;
}
