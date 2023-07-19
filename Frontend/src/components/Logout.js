import React, { useContext } from 'react'
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    
     dispatch({ type: "USER", payload: false });
    // alert("Logged out Successfully");
    localStorage.removeItem("userID");
    localStorage.removeItem("userName");
    navigate("/login");
     //console.log("Logged out");
     

  return localStorage.removeItem("token");
}

export default Logout;
