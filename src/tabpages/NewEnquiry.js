import React, { useState } from 'react';
import SupportVisible from './supportvisible/SupportVisible';

const NewEnquiry = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  const toggleTaskCompletion = (index) => {
    setTasks(tasks.map((task, i) => i === index ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h1>Task Management</h1>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter a new task"
            style={{ width: '80%', padding: '10px' }}
          />
          <button onClick={addTask} style={{ padding: '10px', marginLeft: '10px' }}>Add Task</button>
        </div>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {tasks.map((task, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
                style={{ marginRight: '10px' }}
              />
              <span
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  flexGrow: 1,
                }}
              >
                {task.text}
              </span>
              <button onClick={() => deleteTask(index)} style={{ padding: '5px 10px', marginLeft: '10px' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ maxWidth: '600px', margin: '0 left', padding: '20px' }}>
        <SupportVisible />
      </div>
    </>
  );
};

export default NewEnquiry;
