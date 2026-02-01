import React from 'react';
import { Clock, CheckCircle2, Circle, BookOpen, Calendar } from 'lucide-react';
import { formatDate, getDayName } from '../utils/dateUtils';

const TimetableCard = ({ tasks, onToggleComplete, completedTasks }) => {
  if (!tasks.length) {
    return (
      <div className="card p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-700 dark:to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-10 h-10 text-secondary-400 dark:text-secondary-500" />
        </div>
        <h3 className="text-xl font-bold text-secondary-700 dark:text-secondary-300 mb-2">No Study Plan Yet</h3>
        <p className="text-secondary-500 dark:text-secondary-400 max-w-md mx-auto">
          Add subjects and set an exam date to generate your AI-powered personalized study schedule
        </p>
      </div>
    );
  }

  // Group tasks by date
  const groupedTasks = tasks.reduce((acc, task) => {
    const dateKey = task.date;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(task);
    return acc;
  }, {});

  // Sort dates
  const sortedDates = Object.keys(groupedTasks).sort();

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Your Study Timetable</h2>
            <p className="text-xs text-white/80">AI-generated daily study schedule</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {sortedDates.map((date, dateIndex) => {
          const dayTasks = groupedTasks[date];
          const completedInDay = dayTasks.filter(t => completedTasks.includes(t.id)).length;
          const totalInDay = dayTasks.length;
          const dayProgress = totalInDay > 0 ? Math.round((completedInDay / totalInDay) * 100) : 0;
          const isToday = dateIndex === 0;

          return (
            <div
              key={date}
              className={`rounded-xl overflow-hidden ${
                isToday 
                  ? 'bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/30 dark:to-purple-900/30 border-2 border-primary-200 dark:border-primary-700' 
                  : 'bg-secondary-50 dark:bg-secondary-800/50 border border-secondary-200 dark:border-secondary-700'
              }`}
            >
              {/* Day Header */}
              <div className={`px-4 py-3 flex items-center justify-between ${
                isToday 
                  ? 'bg-gradient-to-r from-primary-500/10 to-purple-500/10' 
                  : 'bg-secondary-100 dark:bg-secondary-700/50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isToday 
                      ? 'bg-gradient-to-br from-primary-500 to-purple-600 text-white shadow-lg shadow-primary-500/25' 
                      : 'bg-white dark:bg-secondary-600 text-secondary-600 dark:text-secondary-300 shadow'
                  }`}>
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className={`font-bold ${isToday ? 'text-primary-800 dark:text-primary-300' : 'text-secondary-700 dark:text-secondary-300'}`}>
                      {isToday ? '✨ Today' : getDayName(date)}
                    </p>
                    <p className={`text-xs ${isToday ? 'text-primary-600 dark:text-primary-400' : 'text-secondary-500 dark:text-secondary-400'}`}>
                      {formatDate(date, 'EEEE, MMMM d')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${isToday ? 'text-primary-700 dark:text-primary-300' : 'text-secondary-600 dark:text-secondary-400'}`}>
                    {completedInDay}/{totalInDay} tasks
                  </p>
                  <div className="w-24 h-3 bg-white dark:bg-secondary-700 rounded-full mt-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isToday 
                          ? 'bg-gradient-to-r from-primary-500 to-purple-500' 
                          : 'bg-gradient-to-r from-secondary-400 to-secondary-500 dark:from-secondary-500 dark:to-secondary-400'
                      }`}
                      style={{ width: `${dayProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="p-4 space-y-2">
                {dayTasks.map((task) => {
                  const isCompleted = completedTasks.includes(task.id);
                  
                  return (
                    <div
                      key={task.id}
                      className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                        isCompleted
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700'
                          : 'bg-white dark:bg-secondary-700 border border-secondary-200 dark:border-secondary-600 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md'
                      }`}
                    >
                      <button
                        onClick={() => onToggleComplete(task.id)}
                        className={`flex-shrink-0 w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
                          isCompleted
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 text-white shadow-lg shadow-green-500/25'
                            : 'border-secondary-300 dark:border-secondary-500 hover:border-primary-500 hover:shadow-md'
                        }`}
                      >
                        {isCompleted && <CheckCircle2 className="w-5 h-5" />}
                        {!isCompleted && <Circle className="w-5 h-5 text-secondary-400" />}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold truncate ${
                          isCompleted ? 'text-green-700 dark:text-green-400 line-through' : 'text-secondary-800 dark:text-secondary-200'
                        }`}>
                          {task.topic}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`badge ${isCompleted ? 'badge-success' : 'badge-primary'}`}>
                            {task.subject}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-secondary-500 dark:text-secondary-400 bg-secondary-100 dark:bg-secondary-600 px-3 py-1.5 rounded-lg">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-semibold">{task.duration}m</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimetableCard;

