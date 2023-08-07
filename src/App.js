import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Signin from "./components/Signin";
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const initialState = {
  input: "",
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    joined: "",
  },
};

const App = () => {
  const [state, setState] = useState(initialState);
  const [progress, setProgress] = useState(0);

  const loadUser = (data) => {
    setState({
      ...state,
      user: {
        id: data._id,
        name: data.name,
        email: data.email,
        joined: data.joined,
      },
    });
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setState(initialState);
    } else if (route === "home") {
      setState({ ...state, isSignedIn: true });
    }
    setState({ ...state, route: route });
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {state.route === "home" ? (
            <>
              <Navbar />
              <LoadingBar color="#f11946" progress={progress} />
              <Route
                path="/"
                element={
                  <News
                    setProgress={setProgress}
                    key=""
                    pagesize={12}
                    country={"in"}
                    category={"general"}
                  />
                }
              />
              <Route
                path="Sports"
                element={
                  <News
                    setProgress={setProgress}
                    key="sports"
                    pagesize={12}
                    country={"in"}
                    category={"sports"}
                  />
                }
              />
              <Route
                path="Business"
                element={
                  <News
                    setProgress={setProgress}
                    key="business"
                    pagesize={12}
                    country={"in"}
                    category={"business"}
                  />
                }
              />
              <Route
                path="Entertainment"
                element={
                  <News
                    setProgress={setProgress}
                    key="entertainment"
                    pagesize={12}
                    country={"in"}
                    category={"entertainment"}
                  />
                }
              />
              <Route
                path="Technology"
                element={
                  <News
                    setProgress={setProgress}
                    key="technology"
                    pagesize={12}
                    country={"in"}
                    category={"technology"}
                  />
                }
              />
              <Route
                path="Science"
                element={
                  <News
                    setProgress={setProgress}
                    key="science"
                    pagesize={12}
                    country={"in"}
                    category={"science"}
                  />
                }
              />
              <Route
                path="Health"
                element={
                  <News
                    setProgress={setProgress}
                    key="health"
                    pagesize={12}
                    country={"in"}
                    category={"health"}
                  />
                }
              />
              <Route
                path="General"
                element={
                  <News
                    setProgress={setProgress}
                    key="general"
                    pagesize={12}
                    country={"in"}
                    category={"general"}
                  />
                }
              />
            </>
          ) : state.route === "signin" ? (
            <Route
              path="/signin"
              element={
                <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
              }
            />
          ) : (
            <Route
              path="/signup"
              element={
                <SignUp loadUser={loadUser} onRouteChange={onRouteChange} />
              }
            />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
