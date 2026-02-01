// LocalStorage utility for persisting study data
const STORAGE_KEY = 'ai-study-planner-data';

const defaultData = {
  subjects: [],
  examDate: null,
  timetable: [],
  completedTasks: [],
  pomodoroSessions: {
    todayCompleted: 0,
    todayMinutes: 0,
    totalCompleted: 0,
    totalMinutes: 0,
    lastResetDate: new Date().toDateString()
  },
  settings: {
    dailyStudyHours: 4,
    pomodoroDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    sessionsBeforeLongBreak: 4
  }
};

export const loadData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Check if it's a new day for pomodoro stats
      const today = new Date().toDateString();
      if (parsed.pomodoroSessions?.lastResetDate !== today) {
        parsed.pomodoroSessions = {
          ...parsed.pomodoroSessions,
          todayCompleted: 0,
          todayMinutes: 0,
          lastResetDate: today
        };
      }
      return parsed;
    }
    return defaultData;
  } catch (error) {
    console.error('Error loading data:', error);
    return defaultData;
  }
};

export const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const resetData = () => {
  localStorage.removeItem(STORAGE_KEY);
  return defaultData;
};

