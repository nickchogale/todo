import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./taskItem.css";

const TaskItem = (props) => {
  const [error, setError] = useState();
  //const [state, setState] = useState();
  const navigate = useNavigate();

  let response;

  const deleteHandle = async (id) => {
    console.log(id);
    try {
      response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/${id}`);

      console.log(response.data.message);
      //this.setState({ state: this.state });
      window.location.reload();

      navigate("/viewtask");
    } catch (error) {
      setError({ message: error.response.data.message });
    }
  };

  // useEffect(() => {
  //   setDeleteTask(response);
  // }, []);

  return (
    <Card style={{ width: "20rem" }} className="custCard float-left">
      <Card.Body>
        <Card.Text>
          <h5>Title: {props.title}</h5>
          <h5>Status: {props.status}</h5>
          
        </Card.Text>
        <Link to={`/updatetask/${props.id}`} className="btn btn-primary">
          Update
        </Link>
        <Button
          className="mx-2"
          onClick={() => deleteHandle(props.id)}
          variant="danger">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TaskItem;
