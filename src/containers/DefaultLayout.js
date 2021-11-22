import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import routes from "./../routes";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </>
  );
};

export default DefaultLayout;
