import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Coffee, CheckCircle2, Volume2, VolumeX } from 'lucide-react';

const PomodoroTimer = ({ onSessionComplete, sessions, onUpdateSessions }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isMuted, setIsMuted] = useState(false);
  const [customDuration, setCustomDuration] = useState(25);

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pomodoro-settings');
    if (saved) {
      const { workDuration, breakDuration } = JSON.parse(saved);
      if (workDuration) {
        setCustomDuration(workDuration);
        setTimeLeft(workDuration * 60);
      }
    }
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const playSound = useCallback(() => {
    if (isMuted) return;
    
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = isBreak ? 880 : 660;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }, [isMuted, isBreak]);

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      playSound();
      setIsRunning(false);
      
      if (!isBreak) {
        // Work session completed
        onSessionComplete('work');
      } else {
        // Break completed
        onSessionComplete('break');
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, isBreak, playSound, onSessionComplete]);

  const startTimer = () => setIsRunning(true);
  
  const pauseTimer = () => setIsRunning(false);
  
  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(customDuration * 60);
  };

  const skipBreak = () => {
    setIsBreak(false);
    setTimeLeft(customDuration * 60);
    setIsRunning(false);
  };

  const startBreak = () => {
    setIsBreak(true);
    setTimeLeft(5 * 60);
    setIsRunning(false);
  };

  const setWorkDuration = (minutes) => {
    setCustomDuration(minutes);
    if (!isRunning && !isBreak) {
      setTimeLeft(minutes * 60);
    }
  };

  const progress = ((isBreak ? 300 : customDuration * 60) - timeLeft) / (isBreak ? 300 : customDuration * 60) * 100;

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Coffee className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Pomodoro Timer</h2>
            <p className="text-xs text-white/80">Stay focused with timed sessions</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Timer Display */}
        <div className="flex justify-center mb-6">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-secondary-100 dark:text-secondary-700"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="url(#timerGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${progress * 5.53} 553`}
                className="transition-all duration-1000 ease-linear"
              />
              <defs>
                <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={isBreak ? '#22c55e' : '#ef4444'} />
                  <stop offset="100%" stopColor={isBreak ? '#14b8a6' : '#f97316'} />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-bold font-mono bg-gradient-to-r ${isBreak ? 'from-green-500 to-teal-500' : 'from-red-500 to-orange-500'} bg-clip-text text-transparent`}>
                {formatTime(timeLeft)}
              </span>
              <span className={`text-sm font-semibold mt-2 px-3 py-1 rounded-full ${isBreak ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'}`}>
                {isBreak ? '☕ Break Time' : '🎯 Focus Time'}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3 mb-6">
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-red-500/25 transition-all hover:scale-110"
            >
              <Play className="w-7 h-7 ml-1" />
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-amber-500/25 transition-all hover:scale-110"
            >
              <Pause className="w-7 h-7" />
            </button>
          )}
          
          <button
            onClick={resetTimer}
            className="w-16 h-16 bg-secondary-100 dark:bg-secondary-700 hover:bg-secondary-200 dark:hover:bg-secondary-600 text-secondary-600 dark:text-secondary-400 rounded-2xl flex items-center justify-center transition-all hover:scale-110"
          >
            <RotateCcw className="w-6 h-6" />
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all hover:scale-110 ${
              isMuted 
                ? 'bg-secondary-100 dark:bg-secondary-700 text-secondary-400' 
                : 'bg-primary-100 dark:bg-primary-900/50 text-primary-600'
            }`}
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
        </div>

        {/* Break Button */}
        {!isBreak && (
          <button
            onClick={startBreak}
            className="w-full btn-success flex items-center justify-center gap-2 mb-6"
          >
            <Coffee className="w-5 h-5" />
            Take a Break
          </button>
        )}

        {isBreak && (
          <button
            onClick={skipBreak}
            className="w-full btn-primary flex items-center justify-center gap-2 mb-6"
          >
            <Play className="w-5 h-5" />
            Skip Break
          </button>
        )}

        {/* Session Stats */}
        <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-800 dark:to-secondary-700 rounded-xl p-4">
          <h3 className="text-sm font-bold text-secondary-700 dark:text-secondary-300 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Today's Sessions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white dark:bg-secondary-600 rounded-xl shadow-sm">
              <div className="flex items-center justify-center gap-1 text-red-500 mb-1">
                <Coffee className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                {sessions.todayCompleted}
              </p>
              <p className="text-xs text-secondary-500 dark:text-secondary-400 font-medium">Sessions</p>
            </div>
            <div className="text-center p-3 bg-white dark:bg-secondary-600 rounded-xl shadow-sm">
              <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                {Math.floor(sessions.todayMinutes / 60)}h {sessions.todayMinutes % 60}m
              </p>
              <p className="text-xs text-secondary-500 dark:text-secondary-400 font-medium">Focus Time</p>
            </div>
          </div>
        </div>

        {/* Duration Presets */}
        {!isBreak && (
          <div className="mt-4">
            <p className="text-xs text-secondary-500 dark:text-secondary-400 mb-2 font-medium">Duration presets:</p>
            <div className="flex gap-2">
              {[15, 25, 45, 60].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setWorkDuration(mins)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    customDuration === mins
                      ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-lg shadow-primary-500/25'
                      : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-600'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PomodoroTimer;

