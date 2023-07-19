import React, { useState } from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import "./formAll.css";

const AddTask = () => {
  const [error, setError] = useState();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  //const uid = localStorage.getItem("userID");
  //const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const result = await axios.post("http://localhost:5000/api/tasks/", {
          title, 
          status,
          uid: localStorage.getItem("userID")
        });
        if(result){
          alert("Success");
        }
  
    } catch (error) {
        console.log(error);
        setError({ message: error.response.data.message })
    }
  }

    return (
      <div className="container center-form mt-5" >
        <Form onSubmit={handleSubmit} action="POST" className="px-3 py-2 m-3" > 
          <div>
            {error && <div className="mb-3 text-center">{error.message}</div>}
          </div>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" onChange={(e)=>{setTitle(e.target.value)}} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Status</Form.Label>
          <Form.Select aria-label="Default select example" onChange={(e)=>{setStatus(e.target.value)}} >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Starting">Starting</option>
            <option value="Completed">completed</option>
          </Form.Select>
          </Form.Group>
          <Button className="mt-3" variant="primary" type="submit">
            Add Task
          </Button>
        </Form>
      </div>
    );
};

export default AddTask;