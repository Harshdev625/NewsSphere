import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Signin from "./components/Signin";
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import SavedArticle from "./components/SavedArticle";
const initialState = {
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
  const [signedin, setSignedin] = useState(false);
  const loadUser = (data) => {
    setState({
      user: {
        id: data._id,
        name: data.name,
        email: data.email,
        joined: data.joined,
      },
    });
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              state.user.id ? (
                <>
                  <Navbar setSignedin={setSignedin} initialState={initialState} />
                  <LoadingBar color="#f11946" progress={progress} />
                  <News
                    state={state}
                    setProgress={setProgress}
                    setSignedin={setSignedin}
                    signedin={signedin}
                    key=""
                    pagesize={12}
                    country={"in"}
                    category={"general"}
                  />
                </>
              ) : (
                <Signin loadUser={loadUser} setSignedin={setSignedin} />
              )
            }
          />
          <Route
            path="Sports"
            element={
              <>
                <Navbar setSignedin={setSignedin} initialState={initialState} />
                <LoadingBar color="#f11946" progress={progress} />
                <News
                  state={state}
                  setProgress={setProgress}
                  setSignedin={setSignedin}
                  signedin={signedin}
                  key="sports"
                  pagesize={12}
                  country={"in"}
                  category={"sports"}
                />
              </>
            }
          />
          <Route
            path="Business"
            element={
              <>
                <Navbar setSignedin={setSignedin} initialState={initialState} />
                <LoadingBar color="#f11946" progress={progress} />
                <News
                  state={state}
                  setProgress={setProgress}
                  setSignedin={setSignedin}
                  signedin={signedin}
                  key="business"
                  pagesize={12}
                  country={"in"}
                  category={"business"}
                />
              </>
            }
          />
          <Route
            path="Entertainment"
            element={
              <>
                <Navbar setSignedin={setSignedin} initialState={initialState} />
                <LoadingBar color="#f11946" progress={progress} />
                <News
                  state={state}
                  setProgress={setProgress}
                  setSignedin={setSignedin}
                  signedin={signedin}
                  key="entertainment"
                  pagesize={12}
                  country={"in"}
                  category={"entertainment"}
                />
              </>
            }
          />
          <Route
            path="Technology"
            element={
              <>
                <Navbar setSignedin={setSignedin} initialState={initialState} />
                <LoadingBar color="#f11946" progress={progress} />
                <News
                  state={state}
                  setProgress={setProgress}
                  setSignedin={setSignedin}
                  signedin={signedin}
                  key="technology"
                  pagesize={12}
                  country={"in"}
                  category={"technology"}
                />
              </>
            }
          />
          <Route
            path="Science"
            element={
              <>
                <Navbar setSignedin={setSignedin} initialState={initialState} />
                <LoadingBar color="#f11946" progress={progress} />
                <News
                  state={state}
                  setProgress={setProgress}
                  setSignedin={setSignedin}
                  signedin={signedin}
                  key="science"
                  pagesize={12}
                  country={"in"}
                  category={"science"}
                />
              </>
            }
          />
          <Route
            path="Health"
            element={
              <>
                <Navbar setSignedin={setSignedin} initialState={initialState} />
                <LoadingBar color="#f11946" progress={progress} />
                <News
                  state={state}
                  setProgress={setProgress}
                  setSignedin={setSignedin}
                  signedin={signedin}
                  key="health"
                  pagesize={12}
                  country={"in"}
                  category={"health"}
                />
              </>
            }
          />
          <Route
            path="General"
            element={
              <>
                <Navbar setSignedin={setSignedin} initialState={initialState} />
                <LoadingBar color="#f11946" progress={progress} />
                <News
                  state={state}
                  setProgress={setProgress}
                  setSignedin={setSignedin}
                  signedin={signedin}
                  key="general"
                  pagesize={12}
                  country={"in"}
                  category={"general"}
                />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <Signin
                loadUser={loadUser}
                setSignedin={setSignedin}
                signedin={signedin}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignUp
                loadUser={loadUser}
                setSignedin={setSignedin}
                signedin={signedin}
              />
            }
          />
          <Route
            path="/savedarticle"
            element={
              <>
                <Navbar setSignedin={setSignedin} initialState={initialState} />
                <LoadingBar color="#f11946" progress={progress} />
                <SavedArticle state={state} />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
