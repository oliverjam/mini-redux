import React from "react";
import { useDispatch } from "./not-redux";

function AddTodo() {
  const dispatch = useDispatch();
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const text = e.target.elements.addTodo.value;
        const payload = { id: Date.now().toString(), text };
        dispatch({ type: "add_todo", payload });
        e.target.reset();
      }}
    >
      <label htmlFor="add-todo">
        Add todo
        <input id="add-todo" type="text" name="addTodo" />
      </label>
      <button type="submit">Add +</button>
    </form>
  );
}

export default AddTodo;
