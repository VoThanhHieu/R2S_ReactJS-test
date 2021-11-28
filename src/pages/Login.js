import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import userService from "./../services/userService";

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    userService.login(username, password).then((res) => {
      if (res.errorCode === 0) navigate("/home");
      else {
        setMessage(res.message);
      }
    });
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);
  return (
    <div className="d-flex justify-content-center align-item-center vh-100">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-sm-8 col-lg-5">
            <div className="card bg-primary">
              <div className="card-header text-white">
                <h4 className="card-title mb-0">
                  <i className="fas fa-th"></i> Login
                </h4>
              </div>
              <div className="card-body bg-white rounded-bottom">
                <p className="text-center text-danger">{message}</p>
                <form onSubmit={formSubmitHandler}>
                  <Input
                    inputRef={usernameRef}
                    label="Username"
                    type="text"
                    id="inputUser"
                    placeholder="Enter UserName"
                  />
                  <Input
                    // labelSize="4"
                    inputRef={passwordRef}
                    rows="1"
                    label="Password"
                    type="password"
                    id="inputPassword"
                    placeholder="Enter Password"
                  />
                  <div className="row">
                    <div className="offset-sm-3 col-auto">
                      {/* <button type="button" className="btn btn-primary">
                      Sign in
                    </button> */}
                      <button type="submit" className="btn btn-primary" to="/">
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
