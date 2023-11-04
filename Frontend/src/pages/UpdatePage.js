import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import "./formAll.css";

const UpdatePage = () => {
    const [error, setError] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
    const[values, setValues] = useState({
        id:id, 
        title: '',
        status: ''
    });
    
            


    useEffect(() => {
        const getData = async () => {
          try {
            console.log(id);
            const res = await axios.get(
              `${process.env.REACT_APP_BACKEND_URL}/api/tasks/${id}`
            );
            console.log(res);

            setValues({
              ...values,
              title: res.data.title,
              status: res.data.status,
            });
          } catch (err) {
            setError({ message: error.response.data.message });
          }
        };
        getData();
    }, []
    )


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/${id}`, {
        title: values.title,
        status: values.status
      });
      if (result) {
        alert("Success");
      }
      navigate("/viewtask")
      
    } catch (error) {
      console.log(error);
      setError({ message: error.response.data.message });
    }
  };

  return (
    <div className="container center-form mt-5">
      <Form onSubmit={handleSubmit} action="POST" className="px-3 py-2 m-3">
        <div>
          {error && <div className="mb-3 text-center">{error.message}</div>}
        </div>

        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={values.title}
            onChange={(e) => {
              setValues({ ...values, title: e.target.value });
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Status</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={values.status}
            onChange={(e) => {
              setValues({ ...values, status: e.target.value });
            }}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Starting">Starting</option>
            <option value="Completed">completed</option>
          </Form.Select>
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">
          Update Task
        </Button>
      </Form>
    </div>
  );
};

export default UpdatePage;
