// Web Audio API music/SFX synthesizer & Web Speech API Indonesian female teacher narration

class AudioEngine {
  private audioCtx: AudioContext | null = null;
  private musicPlaying = false;
  private musicTimer: number | null = null;
  private stepIndex = 0;
  private speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (Ctx) {
        this.audioCtx = new Ctx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume = 0.12,
    delay = 0
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.03);
  }

  public playClickSound() {
    this.playTone(580, 0.08, 'triangle', 0.08, 0);
  }

  public playCorrectSound() {
    this.playTone(523.25, 0.14, 'triangle', 0.14, 0); // C5
    this.playTone(659.25, 0.14, 'triangle', 0.14, 0.09); // E5
    this.playTone(783.99, 0.24, 'triangle', 0.16, 0.18); // G5
  }

  public playWrongSound() {
    this.playTone(320, 0.18, 'sine', 0.12, 0);
    this.playTone(250, 0.24, 'sine', 0.12, 0.14);
  }

  public playVictorySound() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      this.playTone(n, 0.22, 'triangle', 0.15, idx * 0.11);
    });
  }

  // Cheerful gentle woodland marimba loop
  public toggleBackgroundMusic(shouldPlay: boolean): boolean {
    if (shouldPlay && !this.musicPlaying) {
      this.musicPlaying = true;
      const melody = [
        523.25, 659.25, 783.99, 659.25,
        587.33, 698.46, 880.0, 698.46,
        523.25, 659.25, 783.99, 1046.5,
        783.99, 659.25, 587.33, 523.25,
      ];
      this.stepIndex = 0;

      const tick = () => {
        if (!this.musicPlaying) return;
        const freq = melody[this.stepIndex % melody.length];
        this.playTone(freq, 0.32, 'sine', 0.035, 0);
        // Gentle bass note every 4 steps
        if (this.stepIndex % 4 === 0) {
          this.playTone(freq / 2, 0.45, 'triangle', 0.025, 0);
        }
        this.stepIndex += 1;
        this.musicTimer = window.setTimeout(tick, 440);
      };
      tick();
    } else if (!shouldPlay) {
      this.musicPlaying = false;
      if (this.musicTimer !== null) {
        clearTimeout(this.musicTimer);
        this.musicTimer = null;
      }
    }
    return this.musicPlaying;
  }

  public isMusicPlaying(): boolean {
    return this.musicPlaying;
  }

  public isSpeechSupported(): boolean {
    return this.speechSupported;
  }

  private pickIndonesianFemaleVoice(): SpeechSynthesisVoice | null {
    if (!this.speechSupported) return null;
    const voices = window.speechSynthesis.getVoices();
    const idVoices = voices.filter((v) =>
      v.lang.toLowerCase().startsWith('id')
    );
    if (idVoices.length === 0) return null;

    // Prefer named female voices or Google Bahasa Indonesia
    const preferred = idVoices.find((v) => {
      const n = v.name.toLowerCase();
      return (
        n.includes('female') ||
        n.includes('damayanti') ||
        n.includes('gadis') ||
        n.includes('google bahasa indonesia') ||
        n.includes('siti')
      );
    });
    return preferred || idVoices[0];
  }

  public speak(
    text: string,
    callbacks?: {
      onStart?: () => void;
      onEnd?: () => void;
      onError?: () => void;
    }
  ) {
    if (!this.speechSupported) {
      callbacks?.onError?.();
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.pitch = 1.12;
      utterance.rate = 0.94;
      utterance.volume = 1;

      const voice = this.pickIndonesianFemaleVoice();
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onstart = () => callbacks?.onStart?.();
      utterance.onend = () => {
        this.currentUtterance = null;
        callbacks?.onEnd?.();
      };
      utterance.onerror = () => {
        this.currentUtterance = null;
        callbacks?.onEnd?.();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      callbacks?.onError?.();
    }
  }

  public speakShortFeedback(text: string) {
    if (!this.speechSupported) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.pitch = 1.15;
      utterance.rate = 1.0;
      const voice = this.pickIndonesianFemaleVoice();
      if (voice) utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech errors silently
    }
  }

  public pauseSpeech() {
    if (this.speechSupported && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
  }

  public resumeSpeech() {
    if (this.speechSupported && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }

  public stopSpeech() {
    if (this.speechSupported) {
      window.speechSynthesis.cancel();
    }
    this.currentUtterance = null;
  }

  public isPaused(): boolean {
    return this.speechSupported ? window.speechSynthesis.paused : false;
  }
}

export const audioEngine = new AudioEngine();
