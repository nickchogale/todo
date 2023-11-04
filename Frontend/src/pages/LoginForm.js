import React, { useContext, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App";
import "./formAll.css";



const LoginForm = () => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [user, setUser] = useState();
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const user = {email, password};
    try {

      console.log('process.env.BACKEND_URL', process.env.REACT_APP_BACKEND_URL)
      const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, {
        email,
        password
      });

      

      if (result) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userID", result.data.userid);
        localStorage.setItem("userName", result.data.username);
        console.log(result.data.userid);
        console.log(result.data.token);
        //console.log(result.data.email);
        //console.log(result.data.password);
        //console.log(result.data.user);
        dispatch({ type: "USER", payload: true });
        alert("Login successful");
        navigate("/addtask");
      } else {
        alert('Please check your username and password')
      }

      // if(result){
      //   navigate("/addtask");
      // }
    } catch (error) {
      console.log(error);
      setError({ message: error.response.data.message });
    }
  };

  // if(user){
  //   navigate("/addtask")
  // }

  return (
    <div className="container center-form mt-5">
      <Form onSubmit={handleSubmit} action="POST" className="px-3 py-2 m-3">
        <div>
          {error && <div className="mb-3 text-center">{error.message}</div>}
        </div>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
