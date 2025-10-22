// Web Audio API - Ambient Sound Generator (Improved)
// Generate high-quality procedural ambient sounds without audio files

class SoundGenerator {
  constructor() {
    this.audioContext = null;
    this.sounds = new Map();
  }

  // Initialize Audio Context (call this after user interaction)
  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return this.audioContext;
  }

  // Create Rain Sound - Enhanced
  createRain(volume = 0.5) {
    const ctx = this.audioContext;
    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      // White noise for realistic rain
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.8;
      }
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Multiple filters for realistic rain sound
    const filter1 = ctx.createBiquadFilter();
    filter1.type = 'lowpass';
    filter1.frequency.value = 1200;
    filter1.Q.value = 1;

    const filter2 = ctx.createBiquadFilter();
    filter2.type = 'highpass';
    filter2.frequency.value = 400;
    filter2.Q.value = 0.5;

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume * 0.4;

    source.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(gainNode);
    gainNode.connect(ctx.destination);

    source.start();
    return { source, gainNode };
  }

  // Create Thunder Sound
  createThunder(volume = 0.5) {
    const ctx = this.audioContext;
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Brown noise for deep rumble
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 4;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 180;
    filter.Q.value = 2;

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume * 0.25;

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    source.start();
    return { source, gainNode };
  }

  // Create Cafe Ambience - Enhanced
  createCafe(volume = 0.5) {
    const ctx = this.audioContext;
    const bufferSize = ctx.sampleRate * 5;
    const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      // Pink noise for cafe murmur
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.12;
        b6 = white * 0.115926;

        // Add occasional clinks
        if (Math.random() > 0.9995) {
          const clink = Math.random() * 0.3;
          for (let j = 0; j < 100 && i + j < bufferSize; j++) {
            data[i + j] += clink * Math.exp(-j / 20);
          }
        }
      }
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1500;
    filter.Q.value = 0.7;

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume * 0.45;

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    source.start();
    return { source, gainNode };
  }

  // Create Fireplace Crackling - Enhanced
  createFireplace(volume = 0.5) {
    const ctx = this.audioContext;
    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Base noise
    for (let i = 0; i < bufferSize; i++) {
      let value = (Math.random() * 2 - 1) * 0.3;

      // Crackling pops
      if (Math.random() > 0.997) {
        const popIntensity = Math.random() * 2 + 1;
        const popLength = Math.floor(Math.random() * 200 + 100);
        for (let j = 0; j < popLength && i + j < bufferSize; j++) {
          data[i + j] += popIntensity * Math.exp(-j / 50) * (Math.random() * 2 - 1);
        }
      }

      data[i] += value;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600;
    filter.Q.value = 1.5;

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume * 0.35;

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    source.start();
    return { source, gainNode };
  }

  // Create Ocean Waves - Enhanced
  createOcean(volume = 0.5) {
    const ctx = this.audioContext;
    const bufferSize = ctx.sampleRate * 8;
    const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      // Brown noise with wave modulation
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];

        // Multiple wave frequencies
        const wave1 = Math.sin(2 * Math.PI * i / (ctx.sampleRate * 5));
        const wave2 = Math.sin(2 * Math.PI * i / (ctx.sampleRate * 3.5));
        data[i] *= (1 + wave1 * 0.6 + wave2 * 0.3);
      }
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    filter.Q.value = 1.8;

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume * 0.4;

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    source.start();
    return { source, gainNode };
  }

  // Create Forest Birds - Enhanced
  createForest(volume = 0.5) {
    const ctx = this.audioContext;
    const bufferSize = ctx.sampleRate * 6;
    const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      // Very light background noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.05;

        // Bird chirps at random intervals
        if (Math.random() > 0.9993) {
          const chirpLength = Math.floor(Math.random() * 3000 + 1500);
          const freq = Math.random() * 1500 + 2500;
          const freqMod = Math.random() * 500 + 200;

          for (let j = 0; j < chirpLength && i + j < bufferSize; j++) {
            const envelope = Math.exp(-j / 800);
            const frequency = freq + Math.sin(j / 100) * freqMod;
            data[i + j] += Math.sin(2 * Math.PI * frequency * j / ctx.sampleRate) * envelope * 0.4;
          }
        }
      }
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1200;
    filter.Q.value = 0.7;

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume * 0.5;

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    source.start();
    return { source, gainNode };
  }

  // Create Keyboard Typing - Enhanced
  createKeyboard(volume = 0.5) {
    const ctx = this.audioContext;
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Rhythmic mechanical keyboard sounds
    const typingRhythm = [0.15, 0.12, 0.18, 0.14, 0.25, 0.16, 0.11, 0.35, 0.13];
    let currentTime = 0;
    let rhythmIndex = 0;

    while (currentTime < bufferSize / ctx.sampleRate) {
      const startSample = Math.floor(currentTime * ctx.sampleRate);
      const clickLength = Math.floor(Math.random() * 30 + 40);
      const clickIntensity = Math.random() * 0.3 + 0.5;

      // Create click with slight variation
      for (let i = 0; i < clickLength && startSample + i < bufferSize; i++) {
        const envelope = Math.exp(-i / 8);
        data[startSample + i] = (Math.random() * 2 - 1) * envelope * clickIntensity;
      }

      currentTime += typingRhythm[rhythmIndex % typingRhythm.length];
      rhythmIndex++;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 2200;
    filter.Q.value = 1.2;

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume * 0.3;

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    source.start();
    return { source, gainNode };
  }

  // Start a sound
  start(soundType, volume = 0.5) {
    if (!this.audioContext) {
      this.init();
    }

    // Resume audio context if suspended
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    // Stop if already playing
    if (this.sounds.has(soundType)) {
      this.stop(soundType);
    }

    let sound;
    switch (soundType) {
      case 'rain':
        sound = this.createRain(volume);
        break;
      case 'thunder':
        sound = this.createThunder(volume);
        break;
      case 'cafe':
        sound = this.createCafe(volume);
        break;
      case 'fireplace':
        sound = this.createFireplace(volume);
        break;
      case 'ocean':
        sound = this.createOcean(volume);
        break;
      case 'forest':
        sound = this.createForest(volume);
        break;
      case 'keyboard':
        sound = this.createKeyboard(volume);
        break;
      default:
        return;
    }

    this.sounds.set(soundType, sound);
  }

  // Stop a sound
  stop(soundType) {
    if (this.sounds.has(soundType)) {
      const sound = this.sounds.get(soundType);
      sound.source.stop();
      this.sounds.delete(soundType);
    }
  }

  // Change volume
  setVolume(soundType, volume) {
    if (this.sounds.has(soundType)) {
      const sound = this.sounds.get(soundType);
      // Adjust base multiplier based on sound type
      const multipliers = {
        rain: 0.4,
        thunder: 0.25,
        cafe: 0.45,
        fireplace: 0.35,
        ocean: 0.4,
        forest: 0.5,
        keyboard: 0.3,
      };
      sound.gainNode.gain.value = volume * (multipliers[soundType] || 0.3);
    }
  }

  // Stop all sounds
  stopAll() {
    this.sounds.forEach((sound, type) => {
      this.stop(type);
    });
  }
}

// Export singleton instance
export const soundGenerator = new SoundGenerator();
