import React from "react";
import PropTypes from "prop-types";
import "../css/TodoHeader.css";

export const TodoHeader = props => (
  <div className="container">
    <div className="header">
      <h1>Todo List</h1>
    </div>
    <h2>{props.children}</h2>
  </div>
);

TodoHeader.propTypes = {
  children: PropTypes.any.isRequired
};
