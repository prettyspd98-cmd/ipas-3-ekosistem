import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Gamepad2,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { AppView, MaterialId } from '../types/ecosystem';
import {
  ASSETS,
  COMPONENT_EXAMPLES,
  ECOSYSTEM_EXAMPLES,
  MATERIAL_NARRATIONS,
  RELATIONSHIP_EXAMPLES,
  SYMBIOSIS_TYPES,
} from '../data/learningContent';
import { CreatureIcon, SceneImage } from './CreatureArt';
import { NarrationBar } from './NarrationBar';
import { audioEngine } from '../utils/audioEngine';

interface MateriViewProps {
  activeMaterial: MaterialId;
  completedMaterials: MaterialId[];
  onSelectMaterial: (id: MaterialId) => void;
  onCompleteMaterial: (id: MaterialId) => void;
  onNavigate: (view: AppView) => void;
}

export const MateriView: React.FC<MateriViewProps> = ({
  activeMaterial,
  completedMaterials,
  onSelectMaterial,
  onCompleteMaterial,
  onNavigate,
}) => {
  const [selectedEcoId, setSelectedEcoId] = useState<string>(ECOSYSTEM_EXAMPLES[0].id);
  const [selectedRelId, setSelectedRelId] = useState<string>(RELATIONSHIP_EXAMPLES[0].id);

  // Interactive tap-to-classify activity inside Materi 2
  const miniActivityItems = COMPONENT_EXAMPLES.filter((c) =>
    ['kelinci', 'air', 'tumbuhan', 'batu', 'jamur', 'matahari'].includes(c.id)
  );
  const [miniSelectedId, setMiniSelectedId] = useState<string>(miniActivityItems[0].id);
  const [miniAnswers, setMiniAnswers] = useState<Record<string, 'correct' | 'wrong'>>({});
  const [miniFeedback, setMiniFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);

  const materialTabs: { id: MaterialId; label: string }[] = [
    { id: 1, label: 'Materi 1: Ekosistem' },
    { id: 2, label: 'Materi 2: Biotik & Abiotik' },
    { id: 3, label: 'Materi 3: Hubungan' },
    { id: 4, label: 'Materi 4: Simbiosis' },
  ];

  const handleMiniGuess = (guess: 'biotik' | 'abiotik') => {
    const item = miniActivityItems.find((i) => i.id === miniSelectedId);
    if (!item) return;

    if (item.type === guess) {
      audioEngine.playCorrectSound();
      setMiniAnswers((prev) => ({ ...prev, [item.id]: 'correct' }));
      setMiniFeedback({
        correct: true,
        message: `Hebat! ${item.name} memang komponen ${item.type.toUpperCase()}. ${item.explanation}`,
      });
    } else {
      audioEngine.playWrongSound();
      setMiniAnswers((prev) => ({ ...prev, [item.id]: 'wrong' }));
      setMiniFeedback({
        correct: false,
        message: `Yuk coba lagi! Ingat: Biotik adalah makhluk hidup, sedangkan Abiotik adalah benda tak hidup.`,
      });
    }
  };

  const resetMiniActivity = () => {
    audioEngine.playClickSound();
    setMiniAnswers({});
    setMiniFeedback(null);
    setMiniSelectedId(miniActivityItems[0].id);
  };

  const handleNext = () => {
    audioEngine.playClickSound();
    onCompleteMaterial(activeMaterial);
    if (activeMaterial < 4) {
      onSelectMaterial((activeMaterial + 1) as MaterialId);
    } else {
      onNavigate('games');
    }
  };

  const handlePrev = () => {
    audioEngine.playClickSound();
    if (activeMaterial > 1) {
      onSelectMaterial((activeMaterial - 1) as MaterialId);
    } else {
      onNavigate('home');
    }
  };

  const selectedEco =
    ECOSYSTEM_EXAMPLES.find((e) => e.id === selectedEcoId) || ECOSYSTEM_EXAMPLES[0];
  const selectedRel =
    RELATIONSHIP_EXAMPLES.find((r) => r.id === selectedRelId) || RELATIONSHIP_EXAMPLES[0];
  const selectedMiniItem =
    miniActivityItems.find((i) => i.id === miniSelectedId) || miniActivityItems[0];

  const materialProgress = Math.round((completedMaterials.length / 4) * 100);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Top Bar Controls & Progress */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Menu Utama
        </button>

        <div className="flex items-center gap-3 text-sm font-semibold text-emerald-900">
          <span>Kemajuan Materi:</span>
          <div className="h-3 w-32 overflow-hidden rounded-full bg-emerald-100 sm:w-44">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${materialProgress}%` }}
            />
          </div>
          <span className="tabular-nums">{completedMaterials.length}/4</span>
        </div>
      </div>

      {/* Chapter Switcher Tabs */}
      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-emerald-200 bg-white p-2 sm:grid-cols-4">
        {materialTabs.map((tab) => {
          const isActive = activeMaterial === tab.id;
          const isDone = completedMaterials.includes(tab.id);
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                audioEngine.playClickSound();
                onSelectMaterial(tab.id);
              }}
              className={`flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors sm:text-sm cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50/60 text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              {isDone && (
                <CheckCircle2
                  className={`h-4 w-4 shrink-0 ${
                    isActive ? 'text-amber-300' : 'text-emerald-600'
                  }`}
                />
              )}
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Female Teacher Voice Narration */}
      <NarrationBar
        title={materialTabs.find((t) => t.id === activeMaterial)?.label || ''}
        script={MATERIAL_NARRATIONS[activeMaterial]}
      />

      {/* MATERI 1: MENGENAL EKOSISTEM */}
      {activeMaterial === 1 && (
        <section className="space-y-6 rounded-3xl border border-emerald-200 bg-white p-6 sm:p-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-emerald-950 sm:text-3xl">
              Materi 1: Mengenal Ekosistem
            </h1>
            <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 p-5">
              <p className="font-display text-lg font-semibold leading-relaxed text-sky-950 sm:text-xl">
                Ekosistem adalah hubungan timbal balik antara makhluk hidup dengan lingkungan tempat tinggalnya.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50">
            <SceneImage
              src={ASSETS.fiveEcosystems}
              alt="Ilustrasi 5 contoh ekosistem: hutan, sawah, sungai, laut, dan kebun"
              fallbackTitle="5 Contoh Ekosistem Alam"
              className="h-56 w-full object-cover sm:h-72 md:h-80"
            />
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-emerald-950">
              5 Contoh Ekosistem di Sekitar Kita (Klik untuk Menjelajah!)
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {ECOSYSTEM_EXAMPLES.map((eco) => {
                const selected = eco.id === selectedEco.id;
                return (
                  <button
                    key={eco.id}
                    type="button"
                    onClick={() => {
                      audioEngine.playClickSound();
                      setSelectedEcoId(eco.id);
                    }}
                    className={`flex flex-col items-center rounded-2xl border p-3 text-center transition-transform active:scale-95 cursor-pointer ${
                      selected
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/30'
                        : 'border-emerald-100 bg-white hover:bg-emerald-50/50'
                    }`}
                  >
                    <CreatureIcon creature={eco.creature} size={56} />
                    <span className="mt-2 font-display text-sm font-bold text-emerald-950">
                      {eco.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className={`mt-4 rounded-2xl border p-5 ${selectedEco.color}`}>
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <CreatureIcon creature={selectedEco.creature} size={76} className="shrink-0" />
                <div>
                  <h3 className="font-display text-xl font-bold text-emerald-950">
                    {selectedEco.name}
                  </h3>
                  <p className="mt-1 text-base text-emerald-900">
                    {selectedEco.description}
                  </p>
                  <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                    <p className="rounded-xl bg-white/80 px-3 py-2 text-emerald-950">
                      <strong>Makhluk hidup:</strong> {selectedEco.livingThings}
                    </p>
                    <p className="rounded-xl bg-white/80 px-3 py-2 text-emerald-950">
                      <strong>Lingkungan tak hidup:</strong> {selectedEco.nonLivingThings}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MATERI 2: KOMPONEN EKOSISTEM */}
      {activeMaterial === 2 && (
        <section className="space-y-6 rounded-3xl border border-emerald-200 bg-white p-6 sm:p-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-emerald-950 sm:text-3xl">
              Materi 2: Komponen Ekosistem
            </h1>
            <p className="mt-2 text-base text-emerald-900">
              Setiap ekosistem tersusun atas dua komponen utama yang saling melengkapi, yaitu <strong>Komponen Biotik</strong> dan <strong>Komponen Abiotik</strong>.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-sky-50">
            <SceneImage
              src={ASSETS.bioticAbiotic}
              alt="Ilustrasi perbandingan komponen biotik dan abiotik di alam"
              fallbackTitle="Perbandingan Komponen Biotik dan Abiotik"
              className="h-56 w-full object-cover sm:h-72"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Biotik */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5">
              <h2 className="font-display text-xl font-bold text-emerald-950">
                A. Komponen Biotik
              </h2>
              <p className="mt-1.5 text-base font-medium text-emerald-900">
                Komponen biotik adalah semua <strong>makhluk hidup</strong> yang ada dalam ekosistem.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {COMPONENT_EXAMPLES.filter((c) => c.type === 'biotik').map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-col items-center rounded-xl border border-emerald-200 bg-white p-3 text-center"
                  >
                    <CreatureIcon creature={c.creature} size={48} />
                    <span className="mt-1.5 text-sm font-bold text-emerald-950">
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Abiotik */}
            <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-5">
              <h2 className="font-display text-xl font-bold text-sky-950">
                B. Komponen Abiotik
              </h2>
              <p className="mt-1.5 text-base font-medium text-sky-900">
                Komponen abiotik adalah <strong>benda tidak hidup</strong> yang mendukung kehidupan dalam ekosistem.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {COMPONENT_EXAMPLES.filter((c) => c.type === 'abiotik').map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-col items-center rounded-xl border border-sky-200 bg-white p-3 text-center"
                  >
                    <CreatureIcon creature={c.creature} size={48} />
                    <span className="mt-1.5 text-sm font-bold text-sky-950">
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Mini Activity in Materi 2 */}
          <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/80 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-bold text-amber-950">
                  Aktivitas Seru: Tekan Gambar & Tentukan Jenisnya!
                </h3>
                <p className="text-sm text-amber-900">
                  Pilih salah satu gambar di bawah, lalu tekan tombol Biotik atau Abiotik!
                </p>
              </div>
              <button
                type="button"
                onClick={resetMiniActivity}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3 py-1.5 text-xs font-bold text-amber-950 hover:bg-amber-100 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Ulangi Aktivitas
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {miniActivityItems.map((item) => {
                const isSelected = item.id === selectedMiniItem.id;
                const status = miniAnswers[item.id];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      audioEngine.playClickSound();
                      setMiniSelectedId(item.id);
                      setMiniFeedback(null);
                    }}
                    className={`flex flex-col items-center rounded-2xl border p-3 text-center transition-transform active:scale-95 cursor-pointer ${
                      isSelected
                        ? 'border-amber-500 bg-white ring-2 ring-amber-400'
                        : status === 'correct'
                          ? 'border-emerald-300 bg-emerald-50'
                          : 'border-amber-200 bg-white/80 hover:bg-white'
                    }`}
                  >
                    <CreatureIcon creature={item.creature} size={48} />
                    <span className="mt-1 text-xs font-bold text-emerald-950">
                      {item.name}
                    </span>
                    {status === 'correct' && (
                      <span className="mt-1 text-[11px] font-bold text-emerald-700">
                        Benar!
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-col items-center justify-between gap-4 rounded-2xl border border-amber-200 bg-white p-4 sm:flex-row">
              <div className="flex items-center gap-3">
                <CreatureIcon creature={selectedMiniItem.creature} size={56} />
                <div>
                  <p className="text-xs font-semibold text-amber-800">Gambar terpilih:</p>
                  <p className="font-display text-lg font-bold text-emerald-950">
                    {selectedMiniItem.name}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handleMiniGuess('biotik')}
                  className="min-h-[46px] rounded-xl bg-emerald-600 px-5 py-2.5 font-display text-base font-bold text-white transition-transform hover:bg-emerald-700 active:scale-95 cursor-pointer"
                >
                  Komponen Biotik (Hidup)
                </button>
                <button
                  type="button"
                  onClick={() => handleMiniGuess('abiotik')}
                  className="min-h-[46px] rounded-xl bg-sky-600 px-5 py-2.5 font-display text-base font-bold text-white transition-transform hover:bg-sky-700 active:scale-95 cursor-pointer"
                >
                  Komponen Abiotik (Tak Hidup)
                </button>
              </div>
            </div>

            {miniFeedback && (
              <div
                className={`mt-3 rounded-xl border p-3.5 text-sm font-semibold animate-pop-success ${
                  miniFeedback.correct
                    ? 'border-emerald-300 bg-emerald-100 text-emerald-950'
                    : 'border-orange-300 bg-orange-100 text-orange-950'
                }`}
              >
                {miniFeedback.message}
              </div>
            )}
          </div>
        </section>
      )}

      {/* MATERI 3: HUBUNGAN ANTARMAKHLUK HIDUP */}
      {activeMaterial === 3 && (
        <section className="space-y-6 rounded-3xl border border-emerald-200 bg-white p-6 sm:p-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-emerald-950 sm:text-3xl">
              Materi 3: Hubungan Antarmakhluk Hidup
            </h1>
            <p className="mt-2 text-base leading-relaxed text-emerald-900">
              Tidak ada makhluk hidup yang dapat hidup sendirian. Di dalam ekosistem, makhluk hidup selalu <strong>saling berhubungan dan saling membutuhkan</strong> satu sama lain serta membutuhkan lingkungan abiotik.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            {/* Selector list */}
            <div className="space-y-2.5 lg:col-span-5">
              {RELATIONSHIP_EXAMPLES.map((rel, idx) => {
                const active = rel.id === selectedRel.id;
                return (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => {
                      audioEngine.playClickSound();
                      setSelectedRelId(rel.id);
                    }}
                    className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors cursor-pointer ${
                      active
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/25'
                        : 'border-emerald-100 bg-white hover:bg-emerald-50/50'
                    }`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-600 font-display text-sm font-bold text-white">
                      {idx + 1}
                    </span>
                    <span className="font-display text-base font-bold text-emerald-950">
                      {rel.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Animated Stage */}
            <div className="flex flex-col justify-between rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50 via-emerald-50 to-amber-50 p-6 lg:col-span-7">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {selectedRel.badge}
                </span>
                <Sparkles className="h-5 w-5 text-amber-500" />
              </div>

              <div className="my-6 flex items-center justify-center gap-6 rounded-2xl bg-white/85 p-6 border border-emerald-100">
                <div className="animate-fly-path">
                  <CreatureIcon creature={selectedRel.actorA} size={88} />
                </div>
                <ArrowRight className="h-8 w-8 shrink-0 text-amber-500" />
                <div className="animate-float-slow">
                  <CreatureIcon creature={selectedRel.actorB} size={88} />
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-emerald-950">
                  {selectedRel.title}
                </h2>
                <p className="mt-2 text-base font-medium text-emerald-900">
                  {selectedRel.summary}
                </p>
                <p className="mt-2 rounded-xl bg-white/90 p-3.5 text-sm leading-relaxed text-emerald-950 border border-emerald-100">
                  {selectedRel.detail}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MATERI 4: MENGENAL SIMBIOSIS */}
      {activeMaterial === 4 && (
        <section className="space-y-6 rounded-3xl border border-emerald-200 bg-white p-6 sm:p-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-emerald-950 sm:text-3xl">
              Materi 4: Mengenal Simbiosis
            </h1>
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="font-display text-lg font-semibold leading-relaxed text-amber-950 sm:text-xl">
                Simbiosis adalah hubungan erat antara dua makhluk hidup yang berbeda jenis.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50">
            <SceneImage
              src={ASSETS.symbiosisNature}
              alt="Ilustrasi simbiosis lebah dan bunga, burung jalak dan kerbau, serta anggrek dan pohon"
              fallbackTitle="Contoh Simbiosis di Alam"
              className="h-56 w-full object-cover sm:h-72"
            />
          </div>

          {/* 3 Jenis Simbiosis */}
          <div className="space-y-5">
            {SYMBIOSIS_TYPES.map((sym, index) => (
              <div
                key={sym.id}
                className={`rounded-2xl border p-5 sm:p-6 ${sym.cardStyle}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-xl font-bold text-emerald-950 sm:text-2xl">
                    {String.fromCharCode(65 + index)}. {sym.name}
                  </h2>
                  <span
                    className={`rounded-xl border px-3.5 py-1 font-display text-base font-bold ${sym.badgeStyle}`}
                  >
                    Simbol {sym.symbol}
                  </span>
                </div>

                <p className="mt-2 text-base font-medium text-emerald-950">
                  {sym.definition}
                </p>
                <p className="mt-1 text-sm font-bold text-emerald-800">
                  Arti simbol {sym.symbol}: {sym.symbolMeaning}
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {sym.examples.map((ex) => (
                    <div
                      key={ex.pair}
                      className="rounded-2xl border border-white bg-white p-4 shadow-xs"
                    >
                      <div className="flex items-center justify-center gap-3 py-2">
                        <CreatureIcon creature={ex.creatureA} size={56} />
                        <span className="font-display text-lg font-bold text-emerald-700">+</span>
                        <CreatureIcon creature={ex.creatureB} size={56} />
                      </div>
                      <h3 className="mt-2 text-center font-display text-base font-bold text-emerald-950">
                        {ex.pair}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-emerald-800">
                        {ex.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tabel Perbandingan Ketiga Jenis Simbiosis */}
          <div className="pt-2">
            <h2 className="font-display text-xl font-bold text-emerald-950">
              Tabel Perbandingan Tiga Jenis Simbiosis
            </h2>
            <div className="mt-3 overflow-x-auto rounded-2xl border border-emerald-200">
              <table className="w-full min-w-[640px] border-collapse bg-white text-left text-sm">
                <thead className="bg-emerald-600 text-white">
                  <tr>
                    <th className="px-4 py-3 font-display text-base">Jenis Simbiosis</th>
                    <th className="px-4 py-3 font-display text-base">Simbol</th>
                    <th className="px-4 py-3 font-display text-base">Pengaruh pada Makhluk Hidup</th>
                    <th className="px-4 py-3 font-display text-base">Contoh Gambar & Pasangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100">
                  {SYMBIOSIS_TYPES.map((sym) => (
                    <tr key={sym.id} className="align-middle hover:bg-emerald-50/40">
                      <td className="px-4 py-4 font-display text-base font-bold text-emerald-950">
                        {sym.name}
                      </td>
                      <td className="px-4 py-4 font-display text-lg font-bold text-emerald-800 tabular-nums">
                        {sym.symbol}
                      </td>
                      <td className="px-4 py-4 text-emerald-900">
                        {sym.symbolMeaning}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex shrink-0 items-center gap-1 rounded-xl bg-emerald-50 p-1.5">
                            <CreatureIcon creature={sym.examples[0].creatureA} size={36} />
                            <CreatureIcon creature={sym.examples[0].creatureB} size={36} />
                          </div>
                          <span className="font-semibold text-emerald-950">
                            {sym.examples.map((e) => e.pair).join(', ')}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Bottom Prev / Next Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={handlePrev}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl border border-emerald-200 bg-white px-5 py-3 font-display text-base font-bold text-emerald-900 hover:bg-emerald-50 cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" />
          {activeMaterial === 1 ? 'Kembali ke Beranda' : `Materi ${activeMaterial - 1}`}
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-display text-base font-bold text-white shadow-xs transition-transform hover:bg-emerald-700 active:scale-95 cursor-pointer"
        >
          {activeMaterial < 4 ? (
            <>
              Materi Selanjutnya ({activeMaterial + 1})
              <ArrowRight className="h-5 w-5" />
            </>
          ) : (
            <>
              <Gamepad2 className="h-5 w-5" />
              Lanjut ke Game Edukasi!
            </>
          )}
        </button>
      </div>
    </div>
  );
};
