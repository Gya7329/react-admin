import React from "react";
import { Login } from "react-admin";
import LoginForm from "../components/LoginForm";
const Loginpage=(props)=> {
  return (
    <Login {...props}>
      <LoginForm />
    </Login>
  );
}

export default Loginpage;
