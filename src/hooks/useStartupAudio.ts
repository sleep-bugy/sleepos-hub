import { useEffect, useRef } from 'react';

interface UseStartupAudio {
  playStartupSound: () => void;
  stopStartupSound: () => void;
}

// This is a placeholder implementation. In a real app, you would load actual audio files.
// For now, we'll simulate a subtle boot sound using the Web Audio API
export const useStartupAudio = (): UseStartupAudio => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const playStartupSound = () => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined' && window.AudioContext) {
      // Create audio context if it doesn't exist
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      // Create oscillator for the sound
      oscillatorRef.current = audioContextRef.current.createOscillator();
      gainNodeRef.current = audioContextRef.current.createGain();

      // Configure the oscillator
      oscillatorRef.current.type = 'sine'; // Use a subtle sine wave
      oscillatorRef.current.frequency.setValueAtTime(440, audioContextRef.current.currentTime); // A4 note
      
      // Configure the gain node for volume envelope
      gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(0.1, audioContextRef.current.currentTime + 0.01); // Quick fade in
      gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 1); // Fade out over 1 second

      // Connect nodes: oscillator -> gain -> output
      oscillatorRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContextRef.current.destination);

      // Start the sound
      oscillatorRef.current.start();
      
      // Stop the sound after 1 second
      oscillatorRef.current.stop(audioContextRef.current.currentTime + 1);
    }
  };

  const stopStartupSound = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopStartupSound();
    };
  }, []);

  return { playStartupSound, stopStartupSound };
};

export default useStartupAudio;