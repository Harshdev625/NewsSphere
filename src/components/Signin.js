import React, { useState } from "react";
import axios from "axios";
import Alert from "./Alert";
import { Link, useNavigate } from "react-router-dom";

const Signin = ({ loadUser, setSignedin }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    signInEmail: "",
    signInPassword: "",
    showAlert: false,
    alertMessage: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCloseAlert = () => {
    setState((prevState) => ({
      ...prevState,
      showAlert: false,
      alertMessage: "",
    }));
  };

  const onSubmitSignIn = async () => {
    const { signInEmail, signInPassword } = state;

    if (!signInEmail || !signInPassword) {
      setState((prevState) => ({
        ...prevState,
        showAlert: true,
        alertMessage: "Please enter both email and password.",
      }));
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email: signInEmail,
          password: signInPassword,
        }
      );

      const { token, user } = response.data;
      if (token && user) {
        localStorage.setItem("token", token);
        loadUser(user);
        navigate("/homepage");
      } else {
        setState((prevState) => ({
          ...prevState,
          showAlert: true,
          alertMessage: "Invalid credentials.",
        }));
      }
    } catch (error) {
      console.error("Error:", error);
      setState((prevState) => ({
        ...prevState,
        showAlert: true,
        alertMessage: "Login failed. Please try again.",
      }));
    }
  };

  return (
    <div className="display">
      <div className="homepage">
        <p className="heading">Login</p>
        <div className="container">
          <label className="form-title" htmlFor="signInEmail">
            Email
          </label>
          <br />
          <input
            className="input-area"
            type="email"
            name="signInEmail"
            id="signInEmail"
            onChange={onChangeHandler}
          />
        </div>
        <div className="container">
          <label className="form-title" htmlFor="signInPassword">
            Password
          </label>
          <br />
          <input
            className="input-area"
            type="password"
            name="signInPassword"
            id="signInPassword"
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <button onClick={onSubmitSignIn} className="signin-button">
            Login
          </button>
          <p className="nav-text">
            Not Registered?
            <Link to="/signup"> Register</Link>
          </p>
        </div>
        {state.showAlert && (
          <Alert message={state.alertMessage} onClose={handleCloseAlert} />
        )}
      </div>
    </div>
  );
};

export default Signin;
