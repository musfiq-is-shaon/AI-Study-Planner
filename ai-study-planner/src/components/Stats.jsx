import React from 'react';
import { BookOpen, Clock, Calendar, Target, Trophy, TrendingUp, Brain, Zap } from 'lucide-react';
import { formatDuration, getDaysUntilExam } from '../utils/dateUtils';
import { calculateProgress } from '../utils/aiPlanner';

const Stats = ({ subjects, timetable, completedTasks, pomodoroSessions, examDate }) => {
  const progress = calculateProgress(timetable, completedTasks);
  const daysUntilExam = getDaysUntilExam(examDate);
  
  const totalPlannedMinutes = timetable.reduce((sum, t) => sum + t.duration, 0);
  const completedMinutes = timetable
    .filter(t => completedTasks.includes(t.id))
    .reduce((sum, t) => sum + t.duration, 0);

  const stats = [
    {
      icon: BookOpen,
      label: 'Subjects',
      value: subjects.length,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Calendar,
      label: 'Days Until Exam',
      value: daysUntilExam !== null ? (daysUntilExam > 0 ? daysUntilExam : 0) : '-',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400'
    },
    {
      icon: Clock,
      label: 'Study Time',
      value: formatDuration(completedMinutes),
      subtext: `of ${formatDuration(totalPlannedMinutes)} planned`,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      icon: Target,
      label: 'Progress',
      value: `${progress}%`,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: Brain,
      label: 'AI Sessions',
      value: pomodoroSessions?.todayCompleted || 0,
      subtext: 'today',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50 dark:bg-pink-900/30',
      iconColor: 'text-pink-600 dark:text-pink-400'
    },
    {
      icon: Zap,
      label: 'Focus Time',
      value: formatDuration(pomodoroSessions?.todayMinutes || 0),
      subtext: 'today',
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="card p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${stat.color} opacity-60 group-hover:opacity-100 transition-opacity`}></div>
          </div>
          <div>
            <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </p>
            <p className="text-xs text-secondary-500 dark:text-secondary-400 font-semibold mt-1">{stat.label}</p>
            {stat.subtext && (
              <p className="text-xs text-secondary-400 dark:text-secondary-500 mt-1">{stat.subtext}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;

