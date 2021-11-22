import React from "react";
import { Link } from "react-router-dom";

const Student = () => {
  return (
    <>
      <div className="container mt-4">
        <div className="card border-primary bt-5px">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="card-title">
                  Student <small className="text-muted">list</small>
                </h3>
              </div>
              <div className="col-auto">
                {/* <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                >
                  <i className="fas fa-plus"></i> Add
               </button> */}
                <Link to="/student/0" role="button" className="btn btn-primary">
                  <i className="fas fa-plus"></i> Add
                </Link>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover mb-0 border-primary">
                <thead className="table-primary border-primary">
                  <tr>
                    <th style={{ width: "50px" }} className="text-center">
                      #
                    </th>
                    <th>Student Id</th>
                    <th>Full name</th>
                    <th style={{ width: "50px" }}>Gender</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th style={{ width: "80px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="text-center">1</th>
                    <td>01-03-9384</td>
                    <td>Trần Minh Tâm</td>
                    <td className="text-center">
                      <i className="fas fa-male text-primary fa-lg"></i>
                    </td>
                    <td>0935875636</td>
                    <td>tamtm@yahoo.com</td>
                    <td className="text-center">
                      <Link to="/student/1">
                        <i className="fas fa-edit text-primary"></i>
                      </Link>
                      <Link to="/">
                        <i className="fas fa-trash-alt text-danger"></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th className="text-center">2</th>
                    <td>01-03-9344</td>
                    <td>Nguyễn Thị Thanh</td>
                    <td className="text-center">
                      <i className="fas fa-female text-warning fa-lg"></i>
                    </td>
                    <td>0937938573</td>
                    <td>thanhnt@yahoo.com</td>
                    <td className="text-center">
                      <Link to="/student/1">
                        <i className="fas fa-edit text-primary"></i>
                      </Link>
                      <Link to="/">
                        <i className="fas fa-trash-alt text-danger"></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th className="text-center">3</th>
                    <td>01-04-9846</td>
                    <td>Lê Thanh Tuấn</td>
                    <td className="text-center">
                      <i className="fas fa-male text-primary fa-lg"></i>
                    </td>
                    <td>0918373635</td>
                    <td>tuanlt@yahoo.com</td>
                    <td className="text-center">
                      <Link to="/student/1">
                        <i className="fas fa-edit text-primary"></i>
                      </Link>
                      <Link to="/">
                        <i className="fas fa-trash-alt text-danger"></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th className="text-center">4</th>
                    <td>01-04-8363</td>
                    <td>Đinh La Si</td>
                    <td className="text-center">
                      <i className="fas fa-male text-primary fa-lg"></i>
                    </td>
                    <td>0917628363</td>
                    <td>sidl@yahoo.com</td>
                    <td className="text-center">
                      <Link to="/student/1">
                        <i className="fas fa-edit text-primary"></i>
                      </Link>
                      <Link to="/">
                        <i className="fas fa-trash-alt text-danger"></i>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="editModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New Student
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                  <div className="col-sm">
                    <div className="col-form-label">
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
                <div className="row">
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
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
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
    </>
  );
};

export default Student;
