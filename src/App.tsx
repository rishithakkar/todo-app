import React from "react";

import GlobalStyle from "./global";
import ContextProviders from "./contextProviders";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import CategoriePage from "./Pages/Categorie";
import ProtectedRoute from "./Routes/Route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./Pages/Registration";

function App() {
  return (
    <>
    <BrowserRouter>
      <ContextProviders>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute priv={true}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute priv={false}>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute priv={false}>
                  <Signup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categorie/:name"
              element={
                <ProtectedRoute priv={true}>
                  <CategoriePage />
                </ProtectedRoute>
              }></Route>
          </Routes>
        <GlobalStyle />
      </ContextProviders>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
