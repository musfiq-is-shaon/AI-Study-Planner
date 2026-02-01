import { addDays, startOfDay } from 'date-fns';

// AI Study Plan Generator - Mock algorithm that creates smart study schedules
export const generateStudyPlan = (subjects, examDate, settings) => {
  if (!subjects.length || !examDate) return [];

  const today = startOfDay(new Date());
  const exam = typeof examDate === 'string' ? new Date(examDate) : examDate;
  
  // Calculate days available for studying
  const daysAvailable = Math.max(1, Math.ceil((exam - today) / (1000 * 60 * 60 * 24)));
  const dailyStudyHours = settings?.dailyStudyHours || 4;
  const totalStudyMinutes = daysAvailable * dailyStudyHours * 60;

  // Calculate priority weights
  const totalPriority = subjects.reduce((sum, s) => sum + (s.priority || 5), 0);
  const totalDifficulty = subjects.reduce((sum, s) => sum + (s.difficulty || 1), 0);

  // Distribute study time based on priority and difficulty
  const studyDistribution = subjects.map(subject => {
    const priorityWeight = (subject.priority || 5) / totalPriority;
    const difficultyWeight = (subject.difficulty || 1) / totalDifficulty;
    
    // Higher priority + higher difficulty = more study time
    const weight = (priorityWeight * 0.6) + (difficultyWeight * 0.4);
    const minutesAllocated = Math.round(totalStudyMinutes * weight);
    
    return {
      ...subject,
      totalMinutesAllocated: minutesAllocated,
      dailyMinutes: Math.ceil(minutesAllocated / daysAvailable)
    };
  });

  // Generate daily timetable
  const timetable = [];
  const topics = generateTopics(subjects);

  for (let day = 0; day < daysAvailable; day++) {
    const currentDate = addDays(today, day);
    let remainingMinutes = dailyStudyHours * 60;
    
    studyDistribution.forEach((subject, index) => {
      if (remainingMinutes <= 0) return;
      
      const sessionDuration = Math.min(subject.dailyMinutes, remainingMinutes);
      if (sessionDuration < 15) return; // Skip sessions less than 15 minutes
      
      const topicIndex = (day + index) % topics.length;
      const topic = topics[topicIndex].replace('{subject}', subject.name);
      
      timetable.push({
        id: `${subject.id}-${day}-${index}`,
        date: currentDate.toISOString(),
        subject: subject.name,
        subjectId: subject.id,
        topic: topic,
        duration: sessionDuration,
        completed: false,
        priority: subject.priority
      });
      
      remainingMinutes -= sessionDuration;
    });
  }

  // Sort by date and priority
  timetable.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA.getTime() - dateB.getTime();
    }
    return b.priority - a.priority;
  });

  return timetable;
};

// Generate mock topics for each subject
const generateTopics = (subjects) => {
  const baseTopics = [
    'Review fundamentals of {subject}',
    'Practice problems in {subject}',
    'Study advanced concepts in {subject}',
    'Complete exercises on {subject}',
    'Review notes and summarize key points',
    'Work on sample questions for {subject}',
    'Deep dive into tricky topics',
    'Group study session for {subject}',
    'Take practice test on {subject}',
    'Review and revise {subject} material'
  ];
  
  return baseTopics;
};

// Calculate progress percentage
export const calculateProgress = (timetable, completedTasks) => {
  if (!timetable.length) return 0;
  
  const completedCount = timetable.filter(task => 
    completedTasks.includes(task.id)
  ).length;
  
  return Math.round((completedCount / timetable.length) * 100);
};

// Get suggested study tips based on progress
export const getStudyTips = (progress, daysUntilExam) => {
  if (progress >= 80) {
    return [
      "🎉 Great progress! Focus on revision now",
      "📝 Take practice tests to boost confidence",
      "💪 Keep up the momentum!"
    ];
  } else if (progress >= 50) {
    return [
      "🔥 Halfway there! Maintain your pace",
      "📚 Review what you've learned daily",
      "⏰ Don't forget to rest before the exam"
    ];
  } else if (progress >= 25) {
    return [
      "💪 Good start! Try to increase study time",
      "🎯 Focus on high-priority subjects",
      "📅 Consider adjusting your schedule"
    ];
  } else {
    return [
      "🚀 Start strong! Every minute counts",
      "📖 Break topics into smaller chunks",
      "⏱️ Use Pomodoro to stay focused"
    ];
  }
};

