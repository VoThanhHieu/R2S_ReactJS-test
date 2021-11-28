import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const StudentEdit = (props) => {
  const param = useParams();
  const navigate = useNavigate();
  const [id, setId] = useState();
  useEffect(() => {
    setId(param.id);
  }, [param.id]);
  const handleBack = (e) => {
    navigate("/student");
  };
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-10">
          <div className="card border-primary bt-5px">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h5 className="card-title">
                    Student
                    <small className="text-muted">
                      {" "}
                      {id > 0 ? "Edit" : "New"}{" "}
                    </small>
                  </h5>
                </div>
              </div>
            </div>
            <div className="card-body text-dark">
              <form>
                <div className="row mb-3">
                  <label
                    htmlFor="txtId"
                    className="col-sm-2 col-form-label required"
                  >
                    Student Id
                  </label>
                  <div className="col-sm col-lg-5">
                    <input
                      type="text"
                      className="form-control"
                      id="txtId"
                      placeholder="Student Id"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="txtLastName"
                    className="col-sm-2 col-form-label required"
                  >
                    Full name
                  </label>
                  <div className="col-sm-10 col-lg-5">
                    <input
                      type="text"
                      className="form-control"
                      id="txtLastName"
                      placeholder="Last name"
                    />
                  </div>
                  <div className="col-sm">
                    <input
                      type="text"
                      className="form-control"
                      id="txtFirstName"
                      placeholder="First name"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="radMale"
                    className="col-sm-2 col-form-label required"
                  >
                    Gender
                  </label>
                  <div className="col-sm ">
                    <div className="col-form-label ">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="Gender"
                          id="radMale"
                          value="1"
                        />
                        <label className="form-check-label" htmlFor="radMale">
                          Male
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="radFeMale"
                          name="Gender"
                          value="0"
                        />
                        <label className="form-check-label" htmlFor="radFeMale">
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="txtPhone"
                    className="col-sm-2 col-form-label required"
                  >
                    Phone
                  </label>
                  <div className="col-sm col-lg-5">
                    <input
                      type="tel"
                      className="form-control"
                      id="txtPhone"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <label htmlFor="txtEmail" className="col-sm-2 col-form-label">
                    Email
                  </label>
                  <div className="col-sm">
                    <input
                      type="email"
                      className="form-control"
                      id="txtEmail"
                      placeholder="Email address"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="card-footer bg-transparent d-flex justify-content-center pt-3">
              <button
                href="/#"
                className="btn btn-secondary me-1"
                onClick={handleBack}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEdit;
