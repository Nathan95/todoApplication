import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Store from "../context";
import TodoForm from "../components/TodoForm";

Enzyme.configure({ adapter: new Adapter() });

test("<TodoForm /> #addTodo", async () => {
  const dispatch = jest.fn();
  const form = mount(
    <Store.Provider value={{ dispatch }}>
      <TodoForm />
    </Store.Provider>
  );

  form
    .find("input")
    .simulate("change", {
      target: { value: [{ id: 1, title: "new todo", completed: false }] }
    });
  form.find("button").simulate("click");

  expect(dispatch).toBeCalledWith({
    type: "ADD_TODO",
    payload: [{ id: 1, title: "new todo", completed: false }]
  });
});
