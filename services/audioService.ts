class AudioService {
  private audioCtx: AudioContext | null = null;
  private muted: boolean = false;
  private noiseBuffer: AudioBuffer | null = null;

  // Master bus — everything routes through here so muting is instant & global.
  private masterGain: GainNode | null = null;

  // Continuous engine (Hill-Climb-style putter that revs with speed)
  private engine: {
    osc1: OscillatorNode;
    osc2: OscillatorNode;
    sub: OscillatorNode;
    filter: BiquadFilterNode;
    gain: GainNode;
    lfo: OscillatorNode;
    lfoGain: GainNode;
  } | null = null;

  private getAudioContext() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioCtx;
  }

  // Lazily build the master bus; gain reflects current mute state.
  private getMaster(ctx: AudioContext) {
    if (!this.masterGain) {
      this.masterGain = ctx.createGain();
      this.masterGain.gain.value = this.muted ? 0 : 1;
      this.masterGain.connect(ctx.destination);
    }
    return this.masterGain;
  }

  // Cached white-noise buffer used to build the "click" + "clack" transients.
  private getNoiseBuffer(ctx: AudioContext) {
    if (!this.noiseBuffer) {
      const len = Math.floor(ctx.sampleRate * 0.12);
      const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < len; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      this.noiseBuffer = buffer;
    }
    return this.noiseBuffer;
  }

  initialize() {}

  toggleMute(muted: boolean) {
    this.muted = muted;
    if (this.masterGain && this.audioCtx) {
      // Smooth fade so muting/unmuting isn't a hard click
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 1, this.audioCtx.currentTime, 0.05);
    }
  }

  isMuted() {
    return this.muted;
  }

  async startAudio() {
    const ctx = this.getAudioContext();
    if (ctx.state === 'suspended') await ctx.resume();
    this.startEngine();
  }

  stopAudio() {
    this.stopEngine();
  }

  // --- ENGINE (continuous, revs with speed; subtle & peaceful) ---
  private startEngine() {
    const ctx = this.getAudioContext();
    if (this.engine) return;
    const master = this.getMaster(ctx);

    // Two slightly detuned saws + a sub give a warm "putter" without being loud.
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.value = 46;

    const osc2 = ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.value = 69; // a fifth up for body

    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 32;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 320;
    filter.Q.value = 5;

    const gain = ctx.createGain();
    gain.gain.value = 0.012; // very quiet idle

    // Gentle idle wobble so the idle feels alive (the "putt-putt")
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 6.5;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 5;
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);

    osc1.connect(filter);
    osc2.connect(filter);
    sub.connect(gain); // sub bypasses filter for a soft low end
    filter.connect(gain);
    gain.connect(master);

    osc1.start();
    osc2.start();
    sub.start();
    lfo.start();

    this.engine = { osc1, osc2, sub, filter, gain, lfo, lfoGain };
  }

  private stopEngine() {
    if (!this.engine) return;
    const { osc1, osc2, sub, lfo } = this.engine;
    try { osc1.stop(); osc2.stop(); sub.stop(); lfo.stop(); } catch { /* already stopped */ }
    this.engine = null;
  }

  // Map car velocity -> engine pitch/brightness/volume (smoothed)
  updateEngineSpeed(velocity: number, maxSpeed: number = 35) {
    if (!this.engine || !this.audioCtx) return;
    const t = this.audioCtx.currentTime;
    const ratio = Math.min(Math.abs(velocity) / maxSpeed, 1);

    const baseFreq = 46 + ratio * 90;       // 46 -> 136 Hz
    this.engine.osc1.frequency.setTargetAtTime(baseFreq, t, 0.09);
    this.engine.osc2.frequency.setTargetAtTime(baseFreq * 1.5, t, 0.09);
    this.engine.sub.frequency.setTargetAtTime(baseFreq * 0.5, t, 0.12);
    this.engine.filter.frequency.setTargetAtTime(260 + ratio * 1200, t, 0.09);
    this.engine.gain.gain.setTargetAtTime(0.012 + ratio * 0.05, t, 0.12); // stays subtle
  }

  // Soft, pleasant two-note chime when reaching a milestone
  playChime() {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    const master = this.getMaster(ctx);
    const t = ctx.currentTime;

    const notes = [660, 880];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const start = t + i * 0.09;
      g.gain.setValueAtTime(0.0001, start);
      g.gain.exponentialRampToValueAtTime(0.05, start + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, start + 0.5);
      osc.connect(g);
      g.connect(master);
      osc.start(start);
      osc.stop(start + 0.55);
    });
  }

  // A single filtered noise burst (the building block of a key switch sound)
  private burst(
    ctx: AudioContext,
    t: number,
    opts: { type: BiquadFilterType; freq: number; q: number; gain: number; duration: number; }
  ) {
    const src = ctx.createBufferSource();
    src.buffer = this.getNoiseBuffer(ctx);
    src.playbackRate.value = 0.85 + Math.random() * 0.3; // subtle variation per press

    const filter = ctx.createBiquadFilter();
    filter.type = opts.type;
    filter.frequency.value = opts.freq;
    filter.Q.value = opts.q;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(opts.gain, t + 0.0012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + opts.duration);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    src.start(t);
    src.stop(t + opts.duration + 0.02);
  }

  // Low "thock" body of the keycap bottoming out
  private thock(ctx: AudioContext, t: number, freq: number, gain: number) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * (0.95 + Math.random() * 0.1), t);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, t + 0.045);

    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);

    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.07);
  }

  // Full mechanical keyboard keystroke: sharp click jacket + clack + thock.
  playClickSound() {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const t = ctx.currentTime;

    // 1. The sharp high "click" (click-jacket snapping) — Cherry MX Blue character
    this.burst(ctx, t, { type: 'bandpass', freq: 2600, q: 1.1, gain: 0.5, duration: 0.012 });
    // 2. The "clack" — keycap plastic edge
    this.burst(ctx, t + 0.001, { type: 'highpass', freq: 1500, q: 0.7, gain: 0.22, duration: 0.02 });
    // 3. Bottom-out "thock" body
    this.thock(ctx, t + 0.002, 180, 0.5);
    // 4. A short release tick (key springs back up)
    this.burst(ctx, t + 0.055, { type: 'bandpass', freq: 2200, q: 1.2, gain: 0.16, duration: 0.01 });
  }

  // Lighter single-tap for hover (no bottom-out, just the switch contact)
  playHoverSound() {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const t = ctx.currentTime;
    this.burst(ctx, t, { type: 'bandpass', freq: 3200, q: 1.4, gain: 0.12, duration: 0.008 });
    this.thock(ctx, t + 0.001, 320, 0.06);
  }
}

export const audioService = new AudioService();
