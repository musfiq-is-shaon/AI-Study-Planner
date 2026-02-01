import React from 'react';
import { Brain, Sun, Moon } from 'lucide-react';

const Header = ({ stats, isDarkMode, toggleDarkMode }) => {
  return (
    <header className="glass border-b border-secondary-100/50 dark:border-secondary-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 via-primary-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25 animate-float">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-secondary-800 to-secondary-600 dark:from-white dark:to-secondary-300 text-gradient bg-clip-text">
                AI Study Planner
              </h1>
              <p className="text-xs text-secondary-500 dark:text-secondary-400">Smart Learning Dashboard</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
              <span className="text-sm text-secondary-600 dark:text-secondary-300 font-medium">
                {stats?.daysUntilExam !== undefined ? (
                  stats.daysUntilExam > 0 ? (
                    `${stats.daysUntilExam} days until exam`
                  ) : (
                    'Exam day!'
                  )
                ) : (
                  'Add exam date'
                )}
              </span>
            </div>
            <div className="h-8 w-px bg-secondary-200 dark:bg-secondary-700"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary-600 dark:text-secondary-300 font-medium">
                {stats?.totalSubjects || 0} Subjects
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary-600 dark:text-secondary-300 font-medium">
                {stats?.completedToday || 0} Completed Today
              </span>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-secondary-100 dark:bg-secondary-700 hover:bg-secondary-200 dark:hover:bg-secondary-600 transition-all duration-300 group"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-90 transition-transform duration-300" />
            ) : (
              <Moon className="w-5 h-5 text-secondary-600 group-hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

