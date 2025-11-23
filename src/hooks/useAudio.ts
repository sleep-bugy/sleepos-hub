import { useState, useEffect, useRef } from 'react';

interface UseAudioOptions {
  volume?: number;
  playbackRate?: number;
  loop?: boolean;
  autoplay?: boolean;
}

export const useAudio = (src: string, options: UseAudioOptions = {}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(options.volume || 0.7);
  const [playbackRate, setPlaybackRate] = useState(options.playbackRate || 1);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(src);
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.loop = options.loop || false;
      
      const setAudioData = () => setDuration(audioRef.current?.duration || 0);
      const setCurrentTimeData = () => setCurrentTime(audioRef.current?.currentTime || 0);
      const setErrorHandler = (e: any) => setError('Audio playback error');
      
      audioRef.current.addEventListener('loadeddata', setAudioData);
      audioRef.current.addEventListener('timeupdate', setCurrentTimeData);
      audioRef.current.addEventListener('error', setErrorHandler);

      // Cleanup
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('loadeddata', setAudioData);
          audioRef.current.removeEventListener('timeupdate', setCurrentTimeData);
          audioRef.current.removeEventListener('error', setErrorHandler);
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, [src, options.loop]);

  const play = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        setError('Playback failed: ' + (err as Error).message);
      }
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const togglePlay = async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  };

  const setVolumeHandler = (vol: number) => {
    const newVolume = Math.max(0, Math.min(1, vol)); // Clamp between 0 and 1
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const setCurrentTimeHandler = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  return {
    isPlaying,
    duration,
    currentTime,
    volume,
    playbackRate,
    error,
    play,
    pause,
    stop,
    togglePlay,
    setVolume: setVolumeHandler,
    setCurrentTime: setCurrentTimeHandler,
    audioRef
  };
};

export default useAudio;