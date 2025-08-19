Simple React Task README
Project Overview
This project is a simple React application that displays a list of tasks with the ability to add, delete, and filter them based on their completion status. The app demonstrates the use of React.memo, useMemo, useCallback, and Context to optimize performance and manage state efficiently.
The task is to create a to-do list where users can:

Add new tasks.
Mark tasks as completed or incomplete.
Filter tasks to show all, completed, or incomplete tasks.
Ensure the app is optimized to avoid unnecessary re-renders and improve performance.

Key React Concepts Explained
React.memo
What it is: React.memo is a higher-order component that prevents a functional component from re-rendering if its props haven't changed. It’s like memoizing a component to save rendering time.
Problem it solves: In a to-do list, if a parent component re-renders (e.g., when adding a new task), child components like the task list items might re-render unnecessarily, even if their props (like task name or status) remain unchanged. This can slow down the app, especially with many tasks.
Real-life analogy: Imagine you’re cooking dinner and have a recipe card for each dish. If you’re only adding a new dish to the menu, you don’t need to re-read the recipe cards for dishes you’ve already prepared. React.memo is like skipping the re-reading of unchanged recipe cards, saving time and effort.
When to use: Use React.memo for components that receive the same props frequently and don’t need to re-render unless those props change.
useMemo
What it is: useMemo is a hook that memoizes a computed value, recalculating it only when its dependencies change. It’s useful for expensive calculations.
Problem it solves: In the to-do list, filtering tasks (e.g., showing only completed tasks) might involve iterating over the task list. If the filter logic runs on every render, it can slow down the app, especially with a large task list. useMemo ensures the filtered list is recalculated only when the task list or filter criteria change.
Real-life analogy: Suppose you’re organizing your wardrobe and grouping clothes by season. You don’t re-sort the entire wardrobe every time you add a new shirt. Instead, you only update the sorting when you add new clothes or change the grouping criteria. useMemo is like caching the sorted wardrobe to avoid redundant work.
When to use: Use useMemo for computationally expensive operations, like filtering or transforming data, that don’t need to run on every render.
useCallback
What it is: useCallback is a hook that memoizes a function, returning the same function instance unless its dependencies change. It’s useful for passing stable function references to child components.
Problem it solves: In the to-do list, functions like handleDeleteTask or handleToggleTask are passed to child components. Without useCallback, these functions are recreated on every render, causing child components to re-render unnecessarily (even with React.memo). This can degrade performance.
Real-life analogy: Think of giving your friend a phone number to call you. If you keep changing your number every day, they’ll need to update their contacts constantly. useCallback is like giving them a stable number that only changes if necessary (e.g., you get a new phone).
When to use: Use useCallback for functions passed as props to memoized components or used in dependency arrays of other hooks.
Context
What it is: Context provides a way to share data (like state or functions) across components without passing props through every level of the component tree.
Problem it solves: In the to-do list, if multiple components (e.g., the task list, filter buttons, and task input form) need access to the task list or functions to modify it, passing props through every component can become cumbersome (known as prop drilling). Context allows these components to access shared data directly.
Real-life analogy: Imagine a family group chat where everyone can see the weekly grocery list. Instead of one person texting the list to each family member individually, the group chat (Context) makes the list accessible to everyone without extra effort. Context simplifies sharing data across the app.
When to use: Use Context when multiple components at different levels need access to the same data, like app-wide settings or state.
Syntax Examples
React.memo
import React from 'react';

const TaskItem = React.memo(({ task, onToggle, onDelete }) => {
  console.log(`Rendering ${task.name}`);
  return (
    <div>
      <span>{task.name}</span>
      <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
});

export default TaskItem;

Explanation: React.memo wraps the TaskItem component, ensuring it only re-renders if task, onToggle, or onDelete changes.
useMemo
import React, { useMemo } from 'react';

const TaskList = ({ tasks, filter }) => {
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'incomplete') return !task.completed;
      return true;
    });
  }, [tasks, filter]);

  return (
    <div>
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;

Explanation: useMemo caches the filtered task list, recalculating it only when tasks or filter changes.
useCallback
import React, { useState, useCallback } from 'react';

const TaskList = ({ tasks }) => {
  const [tasks, setTasks] = useState(tasks);

  const handleToggleTask = useCallback((id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }, [tasks]);

  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onToggle={handleToggleTask} />
      ))}
    </div>
  );
};

export default TaskList;

Explanation: useCallback ensures handleToggleTask is the same function instance unless tasks changes, preventing unnecessary re-renders of TaskItem.
Context
import React, { createContext, useContext, useState } from 'react';

// Create Context
const TaskContext = createContext();

// Context Provider
const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (name) => {
    setTasks([...tasks, { id: Date.now(), name, completed: false }]);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use Context
const useTasks = () => useContext(TaskContext);

// Usage in a component
const TaskInput = () => {
  const { addTask } = useTasks();
  const [taskName, setTaskName] = useState('');

  const handleAddTask = () => {
    if (taskName) {
      addTask(taskName);
      setTaskName('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

// App component
const App = () => (
  <TaskProvider>
    <TaskInput />
    <TaskList />
  </TaskProvider>
);

export default App;

Explanation: TaskContext provides tasks and addTask to any component in the tree. useTasks simplifies accessing the context in components like TaskInput.
Conclusion
This project showcases how React.memo, useMemo, useCallback, and Context work together to create an efficient to-do list app. By memoizing components, values, and functions, and using Context to share state, the app avoids unnecessary re-renders and simplifies state management, much like optimizing daily tasks in real life.
