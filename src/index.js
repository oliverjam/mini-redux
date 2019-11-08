import React from "react";
import ReactDOM from "react-dom";
import { StateProvider, DispatchProvider } from "./not-redux";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

const initialState = {
  todos: [
    { id: 0, text: "do a thing", complete: false },
    { id: 1, text: "Another stuff", complete: true },
  ],
  showCompleted: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "add_todo":
      return { ...state, todos: [...state.todos, action.payload] };
    case "delete_todo":
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload),
      };
    case "toggle_todo":
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload ? { ...t, complete: !t.complete } : t
        ),
      };
    case "toggle_completed":
      return { ...state, showCompleted: !state.showCompleted };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <StateProvider value={state}>
      <DispatchProvider value={dispatch}>
        <h1>My Todo List</h1>
        <TodoList />
        <AddTodo />
      </DispatchProvider>
    </StateProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
