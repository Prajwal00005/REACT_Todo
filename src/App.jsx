import { useState } from "react";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import TodoContext from "./contexts/TodoContext";

const App = () => {
  const initialTodos = [
    { id: 1, text: "Learn React", isFinished: false },
    { id: 2, text: "Practice coding", isFinished: true },
  ];

  const [todos, setTodos] = useState(initialTodos);
  const [editingTodo, setEditingTodo] = useState(null);

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, editingTodo, setEditingTodo }}
    >
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl p-6 w-1/2 max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">
            ✅ Todo App
          </h1>
          <AddTodo />
          <TodoList />
        </div>
      </div>
    </TodoContext.Provider>
  );
};

export default App;
