import React, { useState } from "react";
import axios from "axios";
import Alert from "./Alert";
import { Link, useNavigate } from "react-router-dom";

const SignUp = ({ loadUser }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const onSubmitSignUp = async () => {
    const { name, email, password, confirmPassword } = state;

    if (!name || !email || !password || !confirmPassword) {
      setState((prevState) => ({
        ...prevState,
        showAlert: true,
        alertMessage: "All fields are required.",
      }));
      return;
    }

    if (password !== confirmPassword) {
      setState((prevState) => ({
        ...prevState,
        showAlert: true,
        alertMessage: "Passwords do not match.",
      }));
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/createuser",
        {
          name,
          email,
          password,
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
          alertMessage: "Signup failed. Please try again.",
        }));
      }
    } catch (error) {
      console.error("Error:", error);
      setState((prevState) => ({
        ...prevState,
        showAlert: true,
        alertMessage: "Signup failed. Please try again.",
      }));
    }
  };

  return (
    <div className="display">
      <div className="homepage">
        <p className="heading">Sign Up</p>
        <div className="container">
          <label className="form-title" htmlFor="name">
            Name
          </label>
          <br />
          <input
            className="input-area"
            type="text"
            name="name"
            id="name"
            onChange={onChangeHandler}
          />
        </div>
        <div className="container">
          <label className="form-title" htmlFor="email">
            Email
          </label>
          <br />
          <input
            className="input-area"
            type="email"
            name="email"
            id="email"
            onChange={onChangeHandler}
          />
        </div>
        <div className="container">
          <label className="form-title" htmlFor="password">
            Password
          </label>
          <br />
          <input
            className="input-area"
            type="password"
            name="password"
            id="password"
            onChange={onChangeHandler}
          />
        </div>
        <div className="container">
          <label className="form-title" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <br />
          <input
            className="input-area"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <button onClick={onSubmitSignUp} className="signup-button">
            Register
          </button>
          <p className="nav-text">
            Already have an account?
            <Link to="/signin"> Login</Link>
          </p>
        </div>
        {state.showAlert && (
          <Alert message={state.alertMessage} onClose={handleCloseAlert} />
        )}
      </div>
    </div>
  );
};

export default SignUp;
