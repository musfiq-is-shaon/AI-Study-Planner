import React, { useState } from 'react';
import { Plus, Trash2, BookOpen, Star, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

const SubjectInput = ({ subjects, onAddSubject, onRemoveSubject }) => {
  const [name, setName] = useState('');
  const [priority, setPriority] = useState(5);
  const [difficulty, setDifficulty] = useState(3);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddSubject({
      id: Date.now().toString(),
      name: name.trim(),
      priority: priority,
      difficulty: difficulty
    });
    
    setName('');
    setPriority(5);
    setDifficulty(3);
  };

  const priorityLabels = {
    1: 'Very Low',
    2: 'Low',
    3: 'Medium',
    4: 'High',
    5: 'Very High'
  };

  const difficultyLabels = {
    1: 'Easy',
    2: 'Medium-Easy',
    3: 'Medium',
    4: 'Medium-Hard',
    5: 'Hard'
  };

  // Generate colors for subjects
  const getSubjectColor = (index) => {
    const colors = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-orange-500 to-amber-500',
      'from-green-500 to-emerald-500',
      'from-red-500 to-rose-500',
      'from-indigo-500 to-violet-500',
      'from-teal-500 to-blue-500',
      'from-pink-500 to-rose-500',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div 
        className="p-4 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Add Subjects</h2>
            <p className="text-xs text-white/80">Add subjects you need to study</p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-white" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                Subject Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Mathematics, Physics, Chemistry..."
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    Priority (1-5)
                  </div>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={priority}
                  onChange={(e) => setPriority(parseInt(e.target.value))}
                  className="w-full h-2 bg-secondary-200 dark:bg-secondary-600 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-secondary-500">{priorityLabels[1]}</span>
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{priorityLabels[priority]}</span>
                  <span className="text-xs text-secondary-500">{priorityLabels[5]}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-red-500" />
                    Difficulty (1-5)
                  </div>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={difficulty}
                  onChange={(e) => setDifficulty(parseInt(e.target.value))}
                  className="w-full h-2 bg-secondary-200 dark:bg-secondary-600 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-secondary-500">{difficultyLabels[1]}</span>
                  <span className="text-sm font-bold text-red-600 dark:text-red-400">{difficultyLabels[difficulty]}</span>
                  <span className="text-xs text-secondary-500">{difficultyLabels[5]}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Subject
            </button>
          </form>

          {/* Added Subjects List */}
          <div className="pt-6 border-t border-secondary-100 dark:border-secondary-700">
            <h3 className="text-sm font-bold text-secondary-700 dark:text-secondary-300 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Your Subjects ({subjects.length})
            </h3>
            
            {subjects.length === 0 ? (
              <div className="text-center py-8 bg-secondary-50 dark:bg-secondary-800/50 rounded-xl border-2 border-dashed border-secondary-200 dark:border-secondary-700">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-secondary-300 dark:text-secondary-600" />
                <p className="text-sm text-secondary-500 dark:text-secondary-400 font-medium">No subjects added yet</p>
                <p className="text-xs text-secondary-400 dark:text-secondary-500 mt-1">Add your first subject above!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {subjects.map((subject, index) => (
                  <div
                    key={subject.id}
                    className="group relative overflow-hidden rounded-xl bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 p-1 cursor-pointer hover:border-primary-300 dark:hover:border-primary-600 transition-all"
                    onClick={() => onRemoveSubject(subject.id)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${getSubjectColor(index)} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                    <div className="relative flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${getSubjectColor(index)} rounded-xl flex items-center justify-center shadow-lg`}>
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-secondary-800 dark:text-white">{subject.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="badge badge-primary text-xs">
                              Priority: {subject.priority}
                            </span>
                            <span className="badge bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 text-xs">
                              Diff: {subject.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveSubject(subject.id);
                        }}
                        className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
                        title="Remove subject"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectInput;

