import React from "react";

const Todo = ({ todo, onToggle, onEdit, onDelete }) => {
  console.log("Rendering Todo:", todo.text); // For demo, shows when it re-renders
  return (
    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.isFinished}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 text-blue-500 rounded"
        />
        <span
          className={`text-lg ${
            todo.isFinished ? "line-through text-gray-400" : "text-gray-700"
          }`}
        >
          {todo.text}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(todo)}
          className="px-3 py-1 text-sm bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// Memoize Todo component so it only re-renders if props change
export default React.memo(Todo);
