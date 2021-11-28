import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import instructorsService from "../services/instructorService";

export const InstructorEdit = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState({
    id: "",
    code: "",
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    email: "",
  });
  useEffect(() => {
    if (param.id > 0) {
      instructorsService.get(param.id).then((res) => {
        setInstructor(res.data);
      });
    }
  }, [param.id]);
  const hanhdleBack = () => {
    navigate("/instructor");
  };
  const handleChangeData = (e) => {
    const newData = { ...instructor };
    newData[e.target.name] = e.target.value;
    setInstructor(newData);
    console.log(newData);
  };

  const handleSave = () => {
    if (instructor.id === 0) {
      instructorsService.add(instructor).then((res) => {
        if (res.errorCode === 0) {
          navigate("/instructor");
        }
      });
    } else {
      instructorsService.update(instructor.id, instructor).then((res) => {
        if (res.errorCode === 0) {
          navigate("/instructor");
        }
      });
    }
  };
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-7">
          <div className="card border-primary bt-5px">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h3 className="card-title">
                    Instructor{" "}
                    <small className="text-muted">
                      {instructor.id > 0 ? "Edit" : "New"}
                    </small>
                  </h3>
                </div>
              </div>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label
                    htmlFor="txtId"
                    className="col-sm-2 col-form-label required"
                  >
                    Instructor Id
                  </label>
                  <div className="col-sm col-lg-5">
                    <input
                      onChange={handleChangeData}
                      defaultValue={instructor.code}
                      type="text"
                      className="form-control"
                      id="txtId"
                      name="code"
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
                      onChange={handleChangeData}
                      name="lastName"
                      defaultValue={instructor.lastName}
                      type="text"
                      className="form-control"
                      id="txtLastName"
                      placeholder="Last name"
                    />
                  </div>
                  <div className="col-sm">
                    <input
                      onChange={handleChangeData}
                      name="firstName"
                      defaultValue={instructor.firstName}
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
                  <div className="col-sm">
                    {instructor.gender === 0 ? (
                      <div className="col-form-label">
                        <div className="form-check form-check-inline">
                          <input
                            onChange={handleChangeData}
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="radMale"
                            value="1"
                            defaultChecked={instructor.gender === 1}
                          />
                          <label className="form-check-label" htmlFor="radMale">
                            Male
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            onChange={handleChangeData}
                            className="form-check-input"
                            type="radio"
                            id="radFeMale"
                            name="gender"
                            value="0"
                            defaultChecked={instructor.gender === 0}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="radFeMale"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div className="col-form-label">
                        <div className="form-check form-check-inline">
                          <input
                            onChange={handleChangeData}
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="radMale"
                            value="1"
                            defaultChecked={instructor.gender === 1}
                          />
                          <label className="form-check-label" htmlFor="radMale">
                            Male
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            onChange={handleChangeData}
                            className="form-check-input"
                            type="radio"
                            id="radFeMale"
                            name="gender"
                            value="0"
                            defaultChecked={instructor.gender === 0}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="radFeMale"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    )}
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
                      onChange={handleChangeData}
                      name="phone"
                      defaultValue={instructor.phone}
                      type="tel"
                      className="form-control"
                      id="txtPhone"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="txtEmail" className="col-sm-2 col-form-label">
                    Email
                  </label>
                  <div className="col-sm">
                    <input
                      onChange={handleChangeData}
                      name="email"
                      defaultValue={instructor.email}
                      type="email"
                      className="form-control"
                      id="txtEmail"
                      placeholder="Email address"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="card-footer text-center">
              <button
                type="button"
                className="btn btn-secondary me-1"
                onClick={hanhdleBack}
              >
                Back
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
