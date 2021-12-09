import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./containers/DefaultLayout";
import Login from "./pages/Login";
import LoadingBar from "react-redux-loading-bar";

function App() {
  return (
    <>
      <div className="position-absolute w-100" style={{ zIndex: 1000 }}>
        <LoadingBar
          updateTime={100}
          className="bg-light"
          style={{ height: "2px" }}
        />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<DefaultLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
