export default function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      // return current state if empty
      if (!action.payload) {
        return state;
      }
      // return current state if duplicate
      if (state.includes(action.payload)) {
        return state;
      }
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 999999),
          title: action.payload,
          completed: false
        }
      ];
    case "EDIT_TODO":
      return state.map(todo => {
        return todo.id === action.payload.id ? action.payload : todo;
      });
    case "DELETE_TODO":
      return state.filter(todo => todo.id !== action.payload);
    case "COMPLETE_TODO":
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
}

export function DeleteTodo(id) {
  return { type: "DELETE_TODO", payload: id };
}
export function EditTodo(id, edit) {
  return { type: "EDIT_TODO", payload: { id, title: edit } };
}
export function CompleteTodo(id) {
  return { type: "COMPLETE_TODO", payload: id };
}
export function AddTodo(todo) {
  return { type: "ADD_TODO", payload: todo };
}
