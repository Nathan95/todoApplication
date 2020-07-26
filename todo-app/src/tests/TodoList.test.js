import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Store from "../context";

import TodoList from "../components/TodoList";

Enzyme.configure({ adapter: new Adapter() });

let confirmSpy;
beforeAll(() => {
  confirmSpy = jest.spyOn(window, "confirm");
  confirmSpy.mockImplementation(jest.fn(() => true));
});
it("Displays a completed todo", async () => {
  const todos = [
    {
      id: 1,
      title: "a",
      completed: true
    }
  ];
  const dispatch = () => {};
  const list = mount(
    <Store.Provider value={{ state: todos, dispatch }}>
      <TodoList />
    </Store.Provider>
  );

  expect(list.find("li").length).toEqual(1);
  expect(
    list
      .find("li")
      .first()
      .html()
  ).toEqual(
    '<li tabindex="0" class="list-group-item list-group-item-opacity"><input type="image" alt="Edit your todo" src="pen.png" title="Edit todo"><input type="image" id="deleteImage" alt="delete your todo" title="Delete todo" src="Trash_font_awesome.png"><span tabindex="0">a</span><button aria-label="Mark a as done" class="completeButton ">✓</button><hr></li>'
  );
});

it("Displays a todo as not completed", async () => {
  const todos = [
    {
      id: 1,
      title: "a",
      completed: false
    }
  ];
  const dispatch = () => {};
  const list = mount(
    <Store.Provider value={{ state: todos, dispatch }}>
      <TodoList />
    </Store.Provider>
  );

  expect(list.find("li").length).toEqual(1);
  expect(
    list
      .find("li")
      .first()
      .html()
  ).toEqual(
    '<li tabindex="0" class="list-group-item "><input type="image" alt="Edit your todo" src="pen.png" title="Edit todo"><input type="image" id="deleteImage" alt="delete your todo" title="Delete todo" src="Trash_font_awesome.png"><span tabindex="0">a</span><button aria-label="Mark a as done" class="completeButton completeButtonUnSelected">✓</button><hr></li>'
  );
});

it("Deletes a todo", async () => {
  const todos = [
    {
      id: 1,
      title: "a",
      completed: true
    },
    {
      id: 2,
      title: "b",
      completed: false
    }
  ];
  const dispatch = jest.fn();
  const list = mount(
    <Store.Provider value={{ state: todos, dispatch }}>
      <TodoList />
    </Store.Provider>
  );

  list.find("input[id='deleteImage']").forEach(b => b.simulate("click"));

  expect(dispatch.mock.calls.length).toBe(2);
});
