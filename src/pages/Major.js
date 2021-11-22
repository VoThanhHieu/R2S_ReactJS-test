import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Major = () => {
  const navigate = useNavigate();
  const showEditPage = (e, id) => {
    e.preventDefault();
    navigate(`/major/${id}`);
  };
  return (
    <div>
      <div className="container mt-4">
        <div className="card border-primary bt-5px">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="card-title">
                  Major <small className="text-muted">list</small>
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
                <button
                  type="button"
                  onClick={(e) => showEditPage(e, 0)}
                  className="btn btn-primary"
                >
                  <i className="fas fa-plus"></i> Add
                </button>
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
                    <th>Major Name</th>
                    <th style={{ width: "80px" }} className="text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="text-center">1</th>
                    <td>IT</td>
                    <td className="text-center">
                      <a href="/#" onClick={(e) => showEditPage(e, 1)}>
                        <i className="fas fa-edit text-primary"></i>
                      </a>
                      <a href="/#">
                        <i className="fas fa-trash-alt text-danger"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th className="text-center">2</th>
                    <td>Marketing</td>
                    <td className="text-center">
                      <a href="/#" onClick={(e) => showEditPage(e, 1)}>
                        <i className="fas fa-edit text-primary"></i>
                      </a>
                      <Link to="/#">
                        <i className="fas fa-trash-alt text-danger"></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th className="text-center">3</th>
                    <td>Network</td>
                    <td className="text-center">
                      <a href="/#" onClick={(e) => showEditPage(e, 1)}>
                        <i className="fas fa-edit text-primary"></i>
                      </a>
                      <Link to="/#">
                        <i className="fas fa-trash-alt text-danger"></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th className="text-center">4</th>
                    <td>Accounting</td>
                    <td className="text-center">
                      <a href="/#" onClick={(e) => showEditPage(e, 1)}>
                        <i className="fas fa-edit text-primary"></i>
                      </a>
                      <a href="/#">
                        <i className="fas fa-trash-alt text-danger"></i>
                      </a>
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
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New Major
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
                <div className="row">
                  <label htmlFor="txtMajor" className="col-sm-3 col-form-label">
                    Major name
                  </label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" id="txtMajor" />
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
    </div>
  );
};

export default Major;
