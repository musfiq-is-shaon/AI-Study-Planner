import { format, differenceInDays, addDays, parseISO, isAfter, isBefore, startOfDay } from 'date-fns';

// Format date for display
export const formatDate = (date, formatStr = 'MMM d, yyyy') => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

// Get days until exam
export const getDaysUntilExam = (examDate) => {
  if (!examDate) return null;
  const exam = typeof examDate === 'string' ? parseISO(examDate) : examDate;
  const today = startOfDay(new Date());
  const examDay = startOfDay(exam);
  return differenceInDays(examDay, today);
};

// Check if exam date is in the past
export const isExamPast = (examDate) => {
  if (!examDate) return false;
  const exam = typeof examDate === 'string' ? parseISO(examDate) : examDate;
  return isBefore(exam, new Date());
};

// Get study days (excluding today if past)
export const getStudyDays = (examDate) => {
  const daysUntil = getDaysUntilExam(examDate);
  if (daysUntil === null || daysUntil <= 0) return 0;
  return daysUntil;
};

// Generate date range for timetable
export const generateDateRange = (startDate, days) => {
  const dates = [];
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  for (let i = 0; i < days; i++) {
    dates.push(addDays(start, i));
  }
  return dates;
};

// Get day name
export const getDayName = (date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'EEEE');
};

// Get short day name
export const getShortDayName = (date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'EEE');
};

// Format duration in minutes to hours and minutes
export const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

// Format minutes to display time
export const formatTime = (minutes) => {
  const mins = minutes % 60;
  const hours = Math.floor(minutes / 60);
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

