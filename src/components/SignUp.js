import React, { useState } from "react";
import axios from "axios";
import Alert from "./Alert";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = ({ loadUser,setSignedin }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    name: "",
    showAlert: false,
    alertMessage: "",
  });

  const onNameChange = (event) => {
    setState((prevState) => ({ ...prevState, name: event.target.value }));
  };

  const onEmailChange = (event) => {
    setState((prevState) => ({ ...prevState, email: event.target.value }));
  };

  const onPasswordChange = (event) => {
    setState((prevState) => ({ ...prevState, password: event.target.value }));
  };

  const handleCloseAlert = () => {
    setState((prevState) => ({
      ...prevState,
      showAlert: false,
      alertMessage: "",
    }));
  };
  const onSubmitRegister = () => {
    const { email, password, name } = state;
    if (!email || !password || !name) {
      setState((prevState) => ({
        ...prevState,
        showAlert: true,
        alertMessage: "Please fill in all the fields.",
      }));
      return;
    }

    try {
      axios
        .post("http://localhost:8080/api/users/createuser", {
          email,
          password,
          name,
        })
        .then((response) => {
          const user = response.data;
          if (user._id) {
            loadUser(user);
            setSignedin(true)
            navigate("/");
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <div className="display">
      <div className="homepage">
        <p className="heading">Register</p>
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
            onChange={onNameChange}
            onFocus={(event) => {
              event.target.style.background = "black";
            }}
            onBlur={(event) => {
              event.target.style.background = "";
            }}
          />
        </div>
        <div className="container ">
          <label className="form-title" htmlFor="email-address">
            Email
          </label>
          <br />
          <input
            className="input-area"
            type="email"
            name="email-address"
            id="email-address"
            onChange={onEmailChange}
            onFocus={(event) => {
              event.target.style.background = "black";
            }}
            onBlur={(event) => {
              event.target.style.background = "";
            }}
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
            onChange={onPasswordChange}
            onFocus={(event) => {
              event.target.style.background = "black";
            }}
            onBlur={(event) => {
              event.target.style.background = "";
            }}
          />
        </div>
        <div>
          <button
            onClick={onSubmitRegister}
            type="submit"
            value="Sign in"
            className="signin-button"
          >
            Register
          </button>
          <p className="nav-text">
            Already Registered?
            <Link to="/signin" >Login</Link>
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
