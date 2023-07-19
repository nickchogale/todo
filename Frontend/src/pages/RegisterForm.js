import React, { useState } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./formAll.css";

const RegisterForm = () => {
  //const [formData, setFormData] = useState({});
  const [error, setError] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
// }

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      //console.log({name, email, password});
      const result = await axios.post("http://localhost:5000/api/users/register", {
        name, 
        email,
        password
      });

      console.log(result);

      if (result.data.status === 'ok') {
        navigate('/login');
      }

  } catch (error) {
      console.log(error);
      setError({ message: error.response.data.message })
  }
}

    return (
      <div className="container center-form mt-5">
        <Form onSubmit={handleSubmit} action="POST" className="px-3 py-2 m-3">
          <div>
            {error && <div className="mb-3 text-center">{error.message}</div>}
          </div>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
};

export default RegisterForm;