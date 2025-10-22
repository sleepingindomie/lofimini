// Generate notification sound using Web Audio API
// No audio files needed!

class NotificationSound {
  constructor() {
    this.audioContext = null;
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return this.audioContext;
  }

  // Play pleasant notification bell sound
  playCompletionSound() {
    if (!this.audioContext) {
      this.init();
    }

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    // Resume context if suspended
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Create oscillator for bell tone
    const oscillator1 = ctx.createOscillator();
    const oscillator2 = ctx.createOscillator();
    const oscillator3 = ctx.createOscillator();

    // Create gain nodes for volume control
    const gainNode = ctx.createGain();

    // Bell-like frequencies (C major chord)
    oscillator1.frequency.value = 523.25; // C5
    oscillator2.frequency.value = 659.25; // E5
    oscillator3.frequency.value = 783.99; // G5

    // Use sine wave for pleasant tone
    oscillator1.type = 'sine';
    oscillator2.type = 'sine';
    oscillator3.type = 'sine';

    // Connect oscillators to gain node
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    oscillator3.connect(gainNode);

    // Connect to output
    gainNode.connect(ctx.destination);

    // Envelope: Attack-Decay-Sustain-Release
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05); // Attack
    gainNode.gain.exponentialRampToValueAtTime(0.1, now + 0.2); // Decay
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8); // Release

    // Start all oscillators
    oscillator1.start(now);
    oscillator2.start(now);
    oscillator3.start(now);

    // Stop after 1 second
    oscillator1.stop(now + 1);
    oscillator2.stop(now + 1);
    oscillator3.stop(now + 1);
  }

  // Play double ding for emphasis
  playDoubleChime() {
    this.playCompletionSound();
    setTimeout(() => {
      this.playCompletionSound();
    }, 200);
  }
}

// Export singleton
export const notificationSound = new NotificationSound();
