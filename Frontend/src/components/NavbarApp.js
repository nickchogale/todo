import React, { useContext, useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from "../App";

import './NavbarApp.css'

const NavbarApp = () => {
  //const { state, dispatch } = useContext(UserContext);
  const tokenAv = localStorage.getItem("token");

  //console.log(tokenAv);

  // const removeToken = () => {
    
  // }


  const RenderMenu = () => {
    if (tokenAv) {
      return (
        <>
          <NavLink className="nav__link" to="/viewtask">
            View Task
          </NavLink>
          <NavLink className="nav__link" to="/addtask">
            Add Task
          </NavLink>
          <NavLink className="nav__link" to="/logout">
            Logout
          </NavLink>
        </>
      );
    } else {
      return (
        <>
          <NavLink className="nav__link" to="/register">
            Register
          </NavLink>
          <NavLink className="nav__link" to="/login">
            Login
          </NavLink>
        </>
      );
    }
  }

  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>
            <Link className="nav__link1" to="/">
              TO-DO
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "200px" }}
              navbarScroll>
              
              <RenderMenu />
              
            </Nav>
            {/* <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavbarApp;
