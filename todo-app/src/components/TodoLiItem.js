import React, { useState } from "react";
import PropTypes from "prop-types";
import "../css/TodoList.css";
import icon from "../images/Trash_font_awesome.png";
import pen from "../images/pen.png";

const TodoLiItem = ({
  completed,
  onHandleEdit,
  initialValues,
  todo,
  onHandleDelete,
  onHandleComplete
}) => {
  const [id] = useState(initialValues.id);
  const [title] = useState(initialValues.title);

  return (
    <li
      tabIndex={0}
      className={`list-group-item ${
        completed ? "list-group-item-opacity" : ""
      }`}
    >
      <input
        type="image"
        alt="Edit your todo"
        src={pen}
        title="Edit todo"
        onClick={() => onHandleEdit(id, title)}
      />
      <input
        type="image"
        id="deleteImage"
        alt="delete your todo"
        title="Delete todo"
        src={icon}
        onClick={() => {
          if (window.confirm("Are you sure you want to remove this todo?")) {
            onHandleDelete(id);
          }
        }}
      />
      <span tabIndex={0}>{todo}</span>
      <button
        aria-label={`Mark ${todo} as done`}
        onClick={() => onHandleComplete(id)}
        className={`completeButton ${
          completed ? "" : "completeButtonUnSelected"
        }`}
      >
        &#x2713;
      </button>
      <hr />
    </li>
  );
};

TodoLiItem.propTypes = {
  completed: PropTypes.bool,
  onHandleEdit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  todo: PropTypes.string.isRequired,
  onHandleDelete: PropTypes.func.isRequired,
  onHandleComplete: PropTypes.func.isRequired
};

TodoLiItem.defaultProps = {
  completed: false,
  initialValues: {
    id: 0,
    title: ""
  }
};

export default TodoLiItem;
