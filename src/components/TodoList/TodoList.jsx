import { useContext, useCallback } from "react";
import Todo from "../Todo/Todo";
import TodoContext from "../../contexts/TodoContext";

const TodoList = () => {
  const { todos, setTodos, setEditingTodo } = useContext(TodoContext);

  const handleToggle = useCallback(
    (id) => {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isFinished: !t.isFinished } : t))
      );
    },
    [setTodos]
  );

  const handleDelete = useCallback(
    (id) => {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    },
    [setTodos]
  );

  const handleEdit = useCallback(
    (todo) => {
      setEditingTodo(todo);
    },
    [setEditingTodo]
  );

  return (
    <div className="space-y-3">
      {todos.length === 0 ? (
        <p className="text-gray-500 text-center">No todos yet!</p>
      ) : (
        todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
