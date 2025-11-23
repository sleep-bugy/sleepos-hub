import { useEffect, useRef, useState } from 'react';

interface UseAmbientAudio {
  playStartupSound: () => void;
  playAmbientSound: () => void;
  stopAllSounds: () => void;
  isAmbientPlaying: boolean;
  setVolume: (volume: number) => void;
}

// This hook handles actual audio files for startup and ambient sounds
export const useAmbientAudio = (): UseAmbientAudio => {
  const startupAudioRef = useRef<HTMLAudioElement | null>(null);
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);

  // Initialize audio elements
  useEffect(() => {
    // Create audio elements for startup and ambient sounds
    startupAudioRef.current = new Audio('/startup.mp3');
    ambientAudioRef.current = new Audio('/startup.mp3'); // Using the same file, but could be different

    // Configure startup sound
    if (startupAudioRef.current) {
      startupAudioRef.current.volume = 0.3; // Low volume for non-intrusive effect
      startupAudioRef.current.preload = 'auto';
    }

    // Configure ambient sound
    if (ambientAudioRef.current) {
      ambientAudioRef.current.volume = 0.1; // Very low volume for ambient background
      ambientAudioRef.current.loop = true; // Loop for continuous background
      ambientAudioRef.current.preload = 'auto';
    }

    // Cleanup function
    return () => {
      if (startupAudioRef.current) {
        startupAudioRef.current.pause();
        startupAudioRef.current = null;
      }
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause();
        ambientAudioRef.current = null;
      }
    };
  }, []);

  const playStartupSound = async () => {
    if (startupAudioRef.current) {
      try {
        // Reset to beginning in case it was played before
        startupAudioRef.current.currentTime = 0;
        await startupAudioRef.current.play();
      } catch (error) {
        console.warn('Could not play startup sound:', error);
      }
    }
  };

  const playAmbientSound = async () => {
    if (ambientAudioRef.current && !isAmbientPlaying) {
      try {
        await ambientAudioRef.current.play();
        setIsAmbientPlaying(true);
      } catch (error) {
        console.warn('Could not play ambient sound:', error);
      }
    }
  };

  const stopAllSounds = () => {
    if (startupAudioRef.current) {
      startupAudioRef.current.pause();
      startupAudioRef.current.currentTime = 0;
    }
    if (ambientAudioRef.current) {
      ambientAudioRef.current.pause();
      ambientAudioRef.current.currentTime = 0;
      setIsAmbientPlaying(false);
    }
  };

  const setVolume = (volume: number) => {
    const vol = Math.max(0, Math.min(1, volume)); // Clamp between 0 and 1
    if (startupAudioRef.current) {
      startupAudioRef.current.volume = vol * 0.3; // Scale down for startup sound
    }
    if (ambientAudioRef.current) {
      ambientAudioRef.current.volume = vol * 0.1; // Scale down more for ambient
    }
  };

  return {
    playStartupSound,
    playAmbientSound,
    stopAllSounds,
    isAmbientPlaying,
    setVolume
  };
};

export default useAmbientAudio;