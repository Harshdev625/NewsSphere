import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Signin from "./components/Signin";
import SignUp from "./components/SignUp";
import LoadingBar from "react-top-loading-bar";
import SavedArticle from "./components/SavedArticle";
import Protected from "./components/Protected";

const initialState = {
  user: {
    id: "",
    name: "",
    email: "",
    joined: "",
  },
};

const categories = [
  "general",
  "sports",
  "business",
  "entertainment",
  "technology",
  "science",
  "health",
];

const App = () => {
  const [state, setState] = useState(initialState);
  const [progress, setProgress] = useState(0);
  const [signedin, setSignedin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setSignedin(true);
    }
  }, []);

  const loadUser = (data) => {
    setState({
      user: {
        id: data._id,
        name: data.name,
        email: data.email,
        joined: data.joined,
      },
    });
    setSignedin(true);
  };

  const renderNews = (category) => (
    <>
      <Navbar setSignedin={setSignedin} initialState={initialState} />
      <LoadingBar color="#f11946" progress={progress} />
      <News
        state={state}
        setProgress={setProgress}
        signedin={signedin}
        key={category}
        pagesize={12}
        country={"us"}
        category={category}
      />
    </>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: signedin ? (
        <Navigate to="/homepage" replace />
      ) : (
        <Navigate to="/signin" replace />
      ),
    },
    {
      path: "/homepage",
      element: <Protected>{renderNews("general")}</Protected>,
    },
    ...categories.map((category) => ({
      path: `/${category.charAt(0).toUpperCase() + category.slice(1)}`,
      element: <Protected>{renderNews(category)}</Protected>,
    })),
    {
      path: "/signin",
      element: (
        <Signin
          loadUser={loadUser}
          setSignedin={setSignedin}
          signedin={signedin}
        />
      ),
    },
    {
      path: "/signup",
      element: (
        <SignUp
          loadUser={loadUser}
          setSignedin={setSignedin}
          signedin={signedin}
        />
      ),
    },
    {
      path: "/savedarticle",
      element: (
        <Protected>
          <Navbar setSignedin={setSignedin} initialState={initialState} />
          <LoadingBar color="#f11946" progress={progress} />
          <SavedArticle state={state} />
        </Protected>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
