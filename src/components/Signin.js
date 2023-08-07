import React, { useState } from "react";
import axios from "axios";
import Alert from "./Alert";
import { Link } from "react-router-dom";

const Signin = ({ loadUser, onRouteChange }) => {
  const [state, setState] = useState({
    signInEmail: "",
    signInPassword: "",
    showAlert: false,
    alertMessage: "",
  });

  const onEmailChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      signInEmail: event.target.value,
    }));
  };

  const handleCloseAlert = () => {
    setState((prevState) => ({
      ...prevState,
      showAlert: false,
      alertMessage: "",
    }));
  };
  

  const onPasswordChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      signInPassword: event.target.value,
    }));
  };

  const onSubmitSignIn = () => {
    const { signInEmail, signInPassword } = state;
    if (!signInEmail || !signInPassword) {
      setState((prevState) => ({
        ...prevState,
        showAlert: true,
        alertMessage: "Please enter both email and password.",
      }));
      return;
    }
console.log(state)
    try {
      axios
        .post("http://localhost:3000/api/users/login", {
          email: signInEmail,
          password: signInPassword,
        })
        .then((response) => {
          const user = response.data;
          if (user._id) {
            loadUser(user);
            console.log('hello')
            onRouteChange("home");
          } else {
            setState((prevState) => ({
              ...prevState,
              showAlert: true,
              alertMessage: "Invalid Credentials.",
            }));
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
    <>
      <div className="display">
        <div className="homepage">
          <p className="heading">Sign In</p>
          <div>
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
          <div>
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
              onClick={onSubmitSignIn}
              type="submit"
              value="Sign in"
              className="signin-button"
            >
              Sign In
            </button>
            <p className="nav-text">
              Don't have an account?
              <Link to="/signup" onClick={()=>onRouteChange("signup")}>Register</Link>
            </p>
          </div>
          {state.showAlert && (
            <Alert message={state.alertMessage} onClose={handleCloseAlert} />
          )}
        </div>
      </div>
    </>
  );
};

export default Signin;
