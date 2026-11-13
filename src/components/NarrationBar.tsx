import React, { useEffect, useState } from 'react';
import { Volume2, Pause, Play, Square } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { CreatureIcon } from './CreatureArt';

interface NarrationBarProps {
  title: string;
  script: string;
}

export const NarrationBar: React.FC<NarrationBarProps> = ({ title, script }) => {
  const [status, setStatus] = useState<'idle' | 'playing' | 'paused'>('idle');
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    audioEngine.stopSpeech();
    setStatus('idle');
    return () => {
      audioEngine.stopSpeech();
    };
  }, [script]);

  const handlePlayOrResume = () => {
    audioEngine.playClickSound();
    if (status === 'paused') {
      audioEngine.resumeSpeech();
      setStatus('playing');
      return;
    }
    audioEngine.speak(script, {
      onStart: () => setStatus('playing'),
      onEnd: () => setStatus('idle'),
      onError: () => setStatus('idle'),
    });
  };

  const handlePause = () => {
    audioEngine.playClickSound();
    audioEngine.pauseSpeech();
    setStatus('paused');
  };

  const handleStop = () => {
    audioEngine.playClickSound();
    audioEngine.stopSpeech();
    setStatus('idle');
  };

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50/90 p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white border border-amber-200">
            <CreatureIcon creature="kiki" size={42} />
          </div>
          <div>
            <p className="font-display text-base font-semibold text-amber-950">
              Suara Ibu Guru — {title}
            </p>
            <p className="text-sm text-amber-800">
              {status === 'playing'
                ? 'Ibu Guru sedang membacakan materi...'
                : status === 'paused'
                  ? 'Narasi suara dijeda sementara.'
                  : 'Tekan tombol Putar Suara untuk mendengarkan penjelasan.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {status !== 'playing' ? (
            <button
              type="button"
              onClick={handlePlayOrResume}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-amber-950 transition-transform hover:bg-amber-400 active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Play className="h-4 w-4 fill-current" />
              {status === 'paused' ? 'Lanjutkan Suara' : 'Putar Suara Guru'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePause}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition-transform hover:bg-sky-500 active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Pause className="h-4 w-4" />
              Jeda Suara
            </button>
          )}

          {status !== 'idle' && (
            <button
              type="button"
              onClick={handleStop}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-900 transition-colors hover:bg-amber-100 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Square className="h-4 w-4 fill-current" />
              Hentikan
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowText((v) => !v)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-900 transition-colors hover:bg-amber-100 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Volume2 className="h-4 w-4" />
            {showText ? 'Tutup Teks Narasi' : 'Baca Teks Narasi'}
          </button>
        </div>
      </div>

      {showText && (
        <p className="mt-3 rounded-xl bg-white p-3.5 text-sm leading-relaxed text-emerald-950 border border-amber-200">
          {script}
        </p>
      )}
    </div>
  );
};
