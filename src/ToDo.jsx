import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./ToDo.css";

export default function ToDo() {
  // ---------- STATE ----------
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all"); // all | pending | done
  const [isDark, setIsDark] = useState(true);

  // edit state
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // drag state
  const [dragId, setDragId] = useState(null);

  // ---------- LOCALSTORAGE LOAD ----------
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos-react");
    const savedTheme = localStorage.getItem("todo-theme");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    } else {
      // default example item
      setTodos([{ id: uuidv4(), text: "Sample Task", done: false }]);
    }
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    }
  }, []);

  // ---------- LOCALSTORAGE SAVE ----------
  useEffect(() => {
    localStorage.setItem("todos-react", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("todo-theme", isDark ? "dark" : "light");
  }, [isDark]);

  // ---------- HANDLERS ----------
  const handleChange = (e) => setNewTodo(e.target.value);

  const addTask = () => {
    if (newTodo.trim() === "") return;
    const newTask = {
      id: uuidv4(),
      text: newTodo.trim(),
      done: false,
    };
    setTodos([...todos, newTask]);
    setNewTodo("");
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const markDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const markAllDone = () => {
    setTodos(todos.map((todo) => ({ ...todo, done: true })));
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    if (editText.trim() === "") return;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText.trim() } : todo
      )
    );
    setEditId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  const changeFilter = (value) => setFilter(value);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // ---------- DRAG & DROP ----------
  const handleDragStart = (id) => {
    setDragId(id);
  };

  const handleDrop = (targetId) => {
    if (!dragId || dragId === targetId) return;

    const updated = [...todos];
    const fromIndex = updated.findIndex((t) => t.id === dragId);
    const toIndex = updated.findIndex((t) => t.id === targetId);
    if (fromIndex === -1 || toIndex === -1) return;

    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setTodos(updated);
    setDragId(null);
  };

  const handleDragEnd = () => setDragId(null);

  // ---------- FILTERED LIST ----------
  const filteredTodos = todos.filter((todo) => {
    if (filter === "pending") return !todo.done;
    if (filter === "done") return todo.done;
    return true; // all
  });

  return (
    <div className={`app ${isDark ? "dark" : "light"}`}>
      <div className="todo-container">
        <div className="header-row">
          <h2 className="title">✨ ToDo List</h2>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Input row */}
        <div className="input-container">
          <input
            className="todo-input"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button className="add-btn" onClick={addTask}>
            Add
          </button>
        </div>

        {/* Filter buttons */}
        <div className="filter-row">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => changeFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === "pending" ? "active" : ""}`}
            onClick={() => changeFilter("pending")}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${filter === "done" ? "active" : ""}`}
            onClick={() => changeFilter("done")}
          >
            Done
          </button>
        </div>

        {/* Task list */}
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.done ? "item-done" : ""}`}
              draggable
              onDragStart={() => handleDragStart(todo.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(todo.id)}
              onDragEnd={handleDragEnd}
            >
              {editId === todo.id ? (
                <>
                  <input
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="btn-group">
                    <button
                      className="save-btn"
                      onClick={() => saveEdit(todo.id)}
                    >
                      Save
                    </button>
                    <button className="cancel-btn" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className={`todo-text ${todo.done ? "done" : ""}`}>
                    {todo.text}
                  </span>

                  <div className="btn-group">
                    <button
                      className="done-btn"
                      onClick={() => markDone(todo.id)}
                    >
                      {todo.done ? "Undo" : "Mark Done"}
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => startEdit(todo)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Mark all as done */}
        {todos.length > 0 && (
          <button className="mark-all-btn" onClick={markAllDone}>
            Mark All as Done
          </button>
        )}
      </div>
    </div>
  );
}
