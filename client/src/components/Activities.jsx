import React from 'react';
import ActivityTask from './ActivityTask';

const Activities = ({ 
  activities, 
  startDate,
  isExpanded,
  getDayNumber, 
  handleEditTask, 
  handleDeleteTask,
  isAddingTask,
  newTask,
  setNewTask,
  setIsAddingTask,
  handleAddTask 
}) => {
  if (!startDate) {
    return <div className="text-gray-500 py-4">Please set trip dates first</div>;
  }

  if (activities.length === 0 && !isAddingTask) {
    return <div className="text-gray-500 py-4 text-center">No activities planned yet</div>;
  }

  return (
    <div className="max-h-[360px] overflow-auto pr-2">
      {isAddingTask && (
        <div className="bg-white/50 p-4 rounded-lg mb-6">
          <input
            type="date"
            value={newTask.date}
            onChange={(e) => setNewTask(prev => ({ ...prev, date: e.target.value }))}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Task title"
            value={newTask.name}
            onChange={(e) => setNewTask(prev => ({ ...prev, name: e.target.value }))}
            className="border p-2 rounded w-full mb-2"
          />
          {newTask.descriptions.map((desc, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Description"
                value={desc}
                onChange={(e) => {
                  const newDesc = [...newTask.descriptions];
                  newDesc[idx] = e.target.value;
                  setNewTask(prev => ({ ...prev, descriptions: newDesc }));
                }}
                className="flex-1 border p-2 rounded"
              />
              <button
                onClick={() => {
                  const newDesc = [...newTask.descriptions];
                  if (idx === newTask.descriptions.length - 1) {
                    newDesc.push('');
                  } else {
                    newDesc.splice(idx, 1);
                  }
                  setNewTask(prev => ({ ...prev, descriptions: newDesc }));
                }}
                className="bg-amber-300 rounded text-white px-3 py-1"
              >
                {idx === newTask.descriptions.length - 1 ? '+' : '×'}
              </button>
            </div>
          ))}
          <div className="flex justify-end gap-2 mt-2">
            <button onClick={() => setIsAddingTask(false)} className="text-gray-600 px-4 py-2">
              Cancel
            </button>
            <button onClick={handleAddTask} className="bg-amber-300 rounded text-white px-4 py-2">
              Save
            </button>
          </div>
        </div>
      )}

      {Array.from(new Set(activities.map(task => task.date)))
        .sort((a, b) => new Date(a) - new Date(b))
        .map(date => {
          const dayNumber = getDayNumber(date);
          return (
            <div key={date} className="mb-6">
              <div className="flex gap-4 items-center mb-4">
                <span className="bg-[#0005] rounded-full font-semibold px-3 py-2">
                  Day {dayNumber}
                </span>
                <span className="text-gray-500 text-sm">
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric'
                  })}
                </span>
              </div>
              {activities
                .filter(task => task.date === date)
                .map(task => (
                  <ActivityTask
                    key={task._id}
                    task={{
                      ...task,
                      title: task.name,
                      descriptions: task.descriptions || []
                    }}
                    isExpanded={isExpanded}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
            </div>
          );
        })}
    </div>
  );
};

export default Activities;
