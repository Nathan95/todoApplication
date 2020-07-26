import React, { useContext } from "react";
import Store from "../context";
import { TodoHeader } from "./TodoHeader";
import TodoLiItem from "./TodoLiItem";
import "../css/TodoList.css";
import { DeleteTodo, EditTodo, CompleteTodo } from "../reducer";

export default function TodoList() {
  const { state, dispatch } = useContext(Store);

  const pluralize = count =>
    count > 1
      ? `There are ${count} todos.`
      : `There is ${count} todo in the list.`;

  let header =
    state.length === 0 ? (
      <h3 className="h3Class">There is nothing left to do...</h3>
    ) : (
      <TodoHeader>{pluralize(state.length)}</TodoHeader>
    );

  const handleEdit = (id, initialValue) => {
    let edit = prompt("Enter new todo name", initialValue);

    if (edit != null) {
      dispatch(EditTodo(id, edit));
    }
  };

  const handleDelete = id => {
    dispatch(DeleteTodo(id));
  };

  const handleCompleted = id => {
    dispatch(CompleteTodo(id));
  };

  return (
    <div className="container">
      <div className="header">{header}</div>
      <div className="container">
        <ul className="list-group">
          {state.map(todo => (
            <TodoLiItem
              key={todo.id}
              completed={todo.completed}
              onHandleEdit={(id, title) => {
                handleEdit(todo.id, todo.title);
              }}
              onHandleDelete={id => {
                handleDelete(todo.id);
              }}
              onHandleComplete={id => {
                handleCompleted(todo.id);
              }}
              todo={todo.title}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
