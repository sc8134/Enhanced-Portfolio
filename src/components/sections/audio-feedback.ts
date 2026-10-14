/**
 * Minimal Web Audio API synthesized tactile feedback.
 * Zero external audio files, zero bandwidth, lightweight, and fully optional.
 */

let audioCtx: AudioContext | null = null;
let isMuted = true; // default muted for respectful browsing

export function initAudio() {
  if (typeof window === "undefined") return;
  try {
    const saved = localStorage.getItem("sagar_portfolio_muted");
    if (saved !== null) {
      isMuted = saved === "true";
    }
  } catch {
    // ignore
  }
}

export function toggleAudioMute(): boolean {
  isMuted = !isMuted;
  try {
    localStorage.setItem("sagar_portfolio_muted", String(isMuted));
  } catch {
    // ignore
  }
  if (!isMuted) {
    playChime();
  }
  return isMuted;
}

export function getAudioMuted(): boolean {
  return isMuted;
}

function getContext(): AudioContext | null {
  if (isMuted || typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/** Soft mechanical click */
export function playClick() {
  const ctx = getContext();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // ignore audio failures
  }
}

/** Warm ambient chime for modal / milestone */
export function playChime() {
  const ctx = getContext();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.36);
  } catch {
    // ignore
  }
}
