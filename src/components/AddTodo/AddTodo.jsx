import { useState, useEffect, useContext } from "react";
import TodoContext from "../../contexts/TodoContext";

const AddTodo = () => {
  const { todos, setTodos, editingTodo, setEditingTodo } =
    useContext(TodoContext);

  const [text, setText] = useState("");

  // Load text when editing
  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text);
    } else {
      setText("");
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    if (editingTodo) {
      // Update existing
      const updatedTodos = todos.map((t) =>
        t.id === editingTodo.id ? { ...t, text } : t
      );
      setTodos(updatedTodos);
      setEditingTodo(null);
    } else {
      // Add new
      const newTodo = { id: todos.length + 1, text, isFinished: false };
      setTodos([...todos, newTodo]);
    }

    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo..."
        className="flex-1 p-2 border rounded-lg"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        {editingTodo ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default AddTodo;
