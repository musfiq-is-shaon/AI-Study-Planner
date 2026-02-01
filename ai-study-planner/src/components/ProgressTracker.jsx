import React from 'react';
import { Trophy, Target, TrendingUp, Flame, Award } from 'lucide-react';
import { calculateProgress, getStudyTips } from '../utils/aiPlanner';

const ProgressTracker = ({ timetable, completedTasks, daysUntilExam }) => {
  const progress = calculateProgress(timetable, completedTasks);
  const tips = getStudyTips(progress, daysUntilExam);
  
  const totalTasks = timetable.length;
  const completedCount = timetable.filter(t => completedTasks.includes(t.id)).length;
  const remainingTasks = totalTasks - completedCount;
  
  // Streak calculation (simplified)
  const streakDays = Math.floor(completedCount / 3);
  
  // Calculate estimated completion
  const avgTasksPerDay = 3;
  const estimatedDaysLeft = Math.ceil(remainingTasks / avgTasksPerDay);

  const getProgressColor = (p) => {
    if (p >= 80) return 'text-green-500';
    if (p >= 50) return 'text-primary-500';
    if (p >= 25) return 'text-amber-500';
    return 'text-secondary-500';
  };

  const getProgressBg = (p) => {
    if (p >= 80) return 'from-green-500 to-emerald-500';
    if (p >= 50) return 'from-primary-500 to-purple-500';
    if (p >= 25) return 'from-amber-500 to-orange-500';
    return 'from-secondary-400 to-secondary-500';
  };

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Progress Tracker</h2>
            <p className="text-xs text-white/80">Your learning journey</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Circular Progress */}
        <div className="flex justify-center mb-6">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="64"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-secondary-100 dark:text-secondary-700"
              />
              <circle
                cx="72"
                cy="72"
                r="64"
                stroke="url(#progressGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${progress * 4.02} 402`}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold bg-gradient-to-r ${getProgressBg(progress)} bg-clip-text text-transparent`}>
                {progress}%
              </span>
              <span className="text-xs text-secondary-500 dark:text-secondary-400 font-medium">Complete</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-4 text-center border border-amber-200 dark:border-amber-700">
            <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
              <Flame className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              {streakDays}
            </p>
            <p className="text-xs text-secondary-500 dark:text-secondary-400 font-medium">Day Streak</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-4 text-center border border-green-200 dark:border-green-700">
            <div className="flex items-center justify-center gap-1 text-green-500 mb-2">
              <Trophy className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              {completedCount}
            </p>
            <p className="text-xs text-secondary-500 dark:text-secondary-400 font-medium">Tasks Done</p>
          </div>
        </div>

        {/* Study Tips */}
        <div className="bg-gradient-to-r from-primary-50 via-purple-50 to-pink-50 dark:from-primary-900/30 dark:via-purple-900/30 dark:to-pink-900/30 rounded-xl p-4 border border-primary-200 dark:border-primary-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-bold text-secondary-800 dark:text-secondary-200">Study Tips</h3>
          </div>
          <ul className="space-y-2">
            {tips.map((tip, index) => (
              <li key={index} className="text-sm text-secondary-600 dark:text-secondary-300 flex items-start gap-2">
                <span className="text-primary-500 text-lg">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-secondary-600 dark:text-secondary-400 font-medium">{completedCount} completed</span>
            <span className="text-secondary-600 dark:text-secondary-400 font-medium">{remainingTasks} remaining</span>
          </div>
          <div className="h-4 bg-secondary-100 dark:bg-secondary-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${getProgressBg(progress)}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {remainingTasks > 0 && (
            <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              At this pace, you'll finish in ~{estimatedDaysLeft} days
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;

