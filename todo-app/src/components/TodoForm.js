import React, { useContext, useState } from "react";
import Store from "../context";
import "../css/TodoForm.css";
import { AddTodo } from "../reducer";

export default function TodoForm() {
  const { dispatch } = useContext(Store);

  // Creating a local state to have currently writing
  // todo item that will be sent to the global store.
  const [todo, setTodo] = useState("");
  const [error, setError] = useState("");

  function handleTodoChange(e) {
    setTodo(e.target.value);
  }

  function handleTodoAdd() {
    if (todo === "") {
      setError(true);
    } else {
      dispatch(AddTodo(todo));
      setError(false);
    }

    setTodo("");
  }

  function handleSubmitForm(event) {
    if (event.keyCode === 13) handleTodoAdd();
  }

  return (
    <div className="container">
      <div className="inputContainer">
        <div className="input-group">
          <input
            className="form-control"
            value={todo}
            autoFocus={true}
            aria-label="Enter the title of your todo"
            placeholder="Enter a new todo"
            onKeyUp={handleSubmitForm}
            onChange={handleTodoChange}
          />
          <div className="errorContainer">
            <span
              tabIndex={0}
              aria-label="Please enter a todo"
              className="error"
            >
              {error ? "Please enter a value" : null}
            </span>
          </div>
          <div className="input-group-append">
            <button
              aria-label="Add todo to your list"
              className="addButton"
              onClick={handleTodoAdd}
            >
              Add Todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
