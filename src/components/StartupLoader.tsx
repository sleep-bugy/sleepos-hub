import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAmbientAudio } from "@/hooks/useAmbientAudio";

interface StartupLoaderProps {
  onComplete: () => void;
}

const StartupLoader = ({ onComplete }: StartupLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const { playStartupSound, stopAllSounds, setVolume } = useAmbientAudio();

  useEffect(() => {
    // Set low volume for non-intrusive experience
    setVolume(0.3);

    // Play subtle startup sound when component mounts
    playStartupSound();

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Start fade out after reaching 100%
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              stopAllSounds(); // Stop all audio when loader completes
              onComplete();
            }, 300); // Match the transition duration
          }, 300); // Short delay before fade out
          return 100;
        }
        // Vary the increment speed to simulate real loading
        const increment = Math.random() * 8 + 1; // Random increment between 1-9
        return Math.min(prev + increment, 100);
      });
    }, 50); // Update every 50ms

    // Complete the loading after 2-3 seconds + small delay for animations
    const completionTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        stopAllSounds(); // Stop all audio when loader completes
        onComplete();
      }, 300); // Match the transition duration
    }, 2500); // Slightly shorter than 3 seconds to allow for transition

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completionTimer);
      stopAllSounds(); // Clean up audio on unmount
    };
  }, [onComplete, playStartupSound, stopAllSounds, setVolume]);

  return (
    <div className={`fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-300 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Logo with pulse animation */}
      <motion.div
        className="relative mb-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <motion.div
            className="w-24 h-24 rounded-xl bg-white flex items-center justify-center p-2"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0 0 rgba(59, 130, 246, 0.4)",
                "0 0 0 10px rgba(59, 130, 246, 0)",
                "0 0 0 0 rgba(59, 130, 246, 0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <img
              src="/logo.png"
              alt="Project Sleep"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Project Sleep Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          Project Sleep
        </h1>
        <p className="text-center text-muted-foreground mt-2 text-sm">
          Loading custom ROM experience...
        </p>
      </motion.div>

      {/* Progress bar container */}
      <div className="w-64 h-2 bg-muted rounded-full overflow-hidden relative">
        {/* Progress bar */}
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
        
        {/* Neon glow effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Progress percentage */}
      <motion.div 
        className="mt-4 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {Math.round(progress)}%
      </motion.div>
    </div>
  );
};

export default StartupLoader;