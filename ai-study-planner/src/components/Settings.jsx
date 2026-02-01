import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, RotateCcw, X } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, settings, onSave }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = () => {
    onSave(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const defaultSettings = {
      dailyStudyHours: 4,
      pomodoroDuration: 25,
      breakDuration: 5,
      longBreakDuration: 15,
      sessionsBeforeLongBreak: 4
    };
    setLocalSettings(defaultSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-2xl w-full max-w-md animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <SettingsIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Settings</h2>
                <p className="text-xs text-white/80">Customize your study experience</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Study Settings */}
          <div>
            <h3 className="text-sm font-bold text-secondary-700 dark:text-secondary-300 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              Study Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-secondary-600 dark:text-secondary-400 mb-2 font-medium">
                  Daily Study Hours
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={localSettings.dailyStudyHours}
                    onChange={(e) => setLocalSettings({ ...localSettings, dailyStudyHours: parseInt(e.target.value) })}
                    className="flex-1 h-2 bg-secondary-200 dark:bg-secondary-600 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                  <span className="w-14 text-center font-bold bg-gradient-to-r from-primary-500 to-purple-500 bg-clip-text text-transparent">
                    {localSettings.dailyStudyHours}h
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pomodoro Settings */}
          <div>
            <h3 className="text-sm font-bold text-secondary-700 dark:text-secondary-300 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Pomodoro Timer
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-secondary-600 dark:text-secondary-400 mb-2 font-medium">
                  Work Duration (minutes)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={localSettings.pomodoroDuration}
                    onChange={(e) => setLocalSettings({ ...localSettings, pomodoroDuration: parseInt(e.target.value) })}
                    className="flex-1 h-2 bg-secondary-200 dark:bg-secondary-600 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                  <span className="w-14 text-center font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    {localSettings.pomodoroDuration}m
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-secondary-600 dark:text-secondary-400 mb-2 font-medium">
                  Short Break Duration (minutes)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={localSettings.breakDuration}
                    onChange={(e) => setLocalSettings({ ...localSettings, breakDuration: parseInt(e.target.value) })}
                    className="flex-1 h-2 bg-secondary-200 dark:bg-secondary-600 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                  <span className="w-14 text-center font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                    {localSettings.breakDuration}m
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-secondary-600 dark:text-secondary-400 mb-2 font-medium">
                  Long Break Duration (minutes)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="10"
                    max="30"
                    value={localSettings.longBreakDuration}
                    onChange={(e) => setLocalSettings({ ...localSettings, longBreakDuration: parseInt(e.target.value) })}
                    className="flex-1 h-2 bg-secondary-200 dark:bg-secondary-600 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                  <span className="w-14 text-center font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {localSettings.longBreakDuration}m
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-secondary-600 dark:text-secondary-400 mb-2 font-medium">
                  Sessions Before Long Break
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="2"
                    max="8"
                    value={localSettings.sessionsBeforeLongBreak}
                    onChange={(e) => setLocalSettings({ ...localSettings, sessionsBeforeLongBreak: parseInt(e.target.value) })}
                    className="flex-1 h-2 bg-secondary-200 dark:bg-secondary-600 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                  <span className="w-14 text-center font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                    {localSettings.sessionsBeforeLongBreak}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-secondary-50 dark:bg-secondary-700/50 border-t border-secondary-100 dark:border-secondary-700 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="btn-secondary flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleSave}
            className="btn-primary flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

