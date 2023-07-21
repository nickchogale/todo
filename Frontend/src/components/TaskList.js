import React from "react";
import TaskItem from "./TaskItem";
import "./taskList.css";

const TaskList = props => {
    return (
      <div className="tasklist-css grid-container">
        {props.tasks.map((task) => (
          <TaskItem
            key={task._id}
            id={task._id}
            title={task.title}
            status={task.status}
          />
        ))}
      </div>
    );
};

export default TaskList;