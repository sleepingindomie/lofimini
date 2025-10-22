import { useState, useCallback, useEffect } from 'react';
import { soundGenerator } from '../utils/soundGenerator';
import { AMBIENT_SOUNDS } from '../utils/constants';

export const useAmbientSound = () => {
  // Track which sounds are active
  const [activeSounds, setActiveSounds] = useState({});

  // Track volume for each sound
  const [volumes, setVolumes] = useState(() => {
    const initialVolumes = {};
    AMBIENT_SOUNDS.forEach(sound => {
      initialVolumes[sound.id] = 0.5; // Default volume 50%
    });
    return initialVolumes;
  });

  // Initialize audio context on first user interaction
  const [isInitialized, setIsInitialized] = useState(false);

  const initialize = useCallback(() => {
    if (!isInitialized) {
      soundGenerator.init();
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Toggle a sound on/off
  const toggleSound = useCallback((soundId) => {
    // Initialize if not already
    if (!isInitialized) {
      soundGenerator.init();
      setIsInitialized(true);
    }

    setActiveSounds((prev) => {
      const isActive = prev[soundId];

      if (isActive) {
        // Stop the sound
        soundGenerator.stop(soundId);
        return { ...prev, [soundId]: false };
      } else {
        // Start the sound
        soundGenerator.start(soundId, volumes[soundId]);
        return { ...prev, [soundId]: true };
      }
    });
  }, [isInitialized, volumes]);

  // Change volume for a specific sound
  const setVolume = useCallback((soundId, volume) => {
    setVolumes((prev) => ({ ...prev, [soundId]: volume }));

    // If sound is currently playing, update its volume
    if (activeSounds[soundId]) {
      soundGenerator.setVolume(soundId, volume);
    }
  }, [activeSounds]);

  // Mute/unmute a specific sound
  const muteSound = useCallback((soundId) => {
    if (activeSounds[soundId]) {
      soundGenerator.setVolume(soundId, 0);
    }
  }, [activeSounds]);

  const unmuteSound = useCallback((soundId) => {
    if (activeSounds[soundId]) {
      soundGenerator.setVolume(soundId, volumes[soundId]);
    }
  }, [activeSounds, volumes]);

  // Stop all sounds
  const stopAll = useCallback(() => {
    soundGenerator.stopAll();
    setActiveSounds({});
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      soundGenerator.stopAll();
    };
  }, []);

  return {
    activeSounds,
    volumes,
    isInitialized,
    initialize,
    toggleSound,
    setVolume,
    muteSound,
    unmuteSound,
    stopAll,
  };
};
