import React, { createContext, useReducer } from "react";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarApp from "./components/NavbarApp"
import RegisterForm from "./pages/RegisterForm";
import Task from "./pages/Task";
import LoginForm from "./pages/LoginForm";
import AddTask from "./pages/AddTask";
import Home from "./pages/Home";
import PrivateRoute  from "./privateRoutes/PrivateRoute";
import Logout from "./components/Logout";
import UpdatePage from "./pages/UpdatePage";
import {reducer, initialState} from "./components/UseReducer"

export const UserContext = createContext();
const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/logout"
        element={
          <PrivateRoute>
            <Logout />
          </PrivateRoute>
        }
      />
      <Route
        path="/viewtask"
        element={
          <PrivateRoute>
            <Task />
          </PrivateRoute>
        }
      />
      <Route
        path="/addtask"
        element={
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        }
      />
      <Route
        path="/updatetask/:id"
        element={
          <PrivateRoute>
            <UpdatePage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}


function App() {
  // const token = localStorage.getItem('token');
  // console.log(token);
  const [state, dispatch] = useReducer(reducer, initialState);

  
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <NavbarApp />
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
