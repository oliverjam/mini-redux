import React from "react";
import { useSelector, useDispatch } from "./not-redux";

function TodoList() {
  const todos = useSelector(state => state.todos);
  const showCompleted = useSelector(state => state.showCompleted);
  const dispatch = useDispatch();
  return (
    <>
      <ul>
        {todos
          .filter(todo => (showCompleted ? true : !todo.complete))
          .map(todo => (
            <li key={todo.id}>
              <span
                style={{
                  textDecoration: todo.complete && "line-through",
                }}
              >
                {todo.text}
              </span>
              <input
                type="checkbox"
                onChange={() =>
                  dispatch({ type: "toggle_todo", payload: todo.id })
                }
                checked={todo.complete}
                aria-label="toggle complete"
              />
              <button
                onClick={() =>
                  dispatch({ type: "delete_todo", payload: todo.id })
                }
              >
                🗑
              </button>
            </li>
          ))}
      </ul>
      <button onClick={() => dispatch({ type: "toggle_completed" })}>
        {showCompleted ? "Hide" : "Show"} completed
      </button>
    </>
  );
}

export default TodoList;
