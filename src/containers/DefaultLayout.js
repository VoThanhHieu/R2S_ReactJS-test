import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import routes from "./../routes";
import { useSelector } from "react-redux";

const DefaultLayout = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      {!isLoggedIn ? (
        <Navigate to="/login" />
      ) : (
        <>
          <Header />
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
          </Routes>
        </>
      )}
    </>
  );
};

export default DefaultLayout;
