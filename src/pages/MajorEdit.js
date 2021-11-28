import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import majorService from "../services/majorService";
import Input from "./../components/Input";
const MajorEdit = (props) => {
  const navigate = useNavigate();
  const param = useParams();
  const [major, setMajor] = useState({ id: 0, name: "" });

  const [message, setMessage] = useState("");
  useEffect(() => {
    if (param.id > 0) {
      majorService.get(param.id).then((res) => {
        setMajor(res.data);
      });
    }
  }, [param.id]);
  const hanhdleBack = () => {
    navigate("/major");
  };

  const handleChangeData = (e) => {
    const newData = { ...major };
    newData[e.target.name] = e.target.value;
    setMajor(newData);
    console.log(newData);
  };
  const handleSave = () => {
    if (major.id === 0) {
      majorService.add(major).then((res) => {
        if (res.errorCode === 0) {
          setMessage("");
          navigate("/major");
        } else {
          setMessage(res.message);
        }
      });
    } else {
      majorService.update(major.id, major).then((res) => {
        if (res.errorCode === 0) {
          setMessage("");
          navigate("/major");
        } else {
          setMessage(res.message);
        }
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-primary bt-5px">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h3 className="card-title">
                    Major{" "}
                    <small className="text-muted">
                      {major.id > 0 ? "Edit" : "New"}
                    </small>
                  </h3>
                </div>
              </div>
            </div>
            <div className="card-body">
              <p className="text-center text-danger">{message}</p>
              <form>
                <Input
                  defaultValue={major.name}
                  label="Major name"
                  id="txtMajor"
                  type="text"
                  name="name"
                  onChange={handleChangeData}
                />
              </form>
            </div>
            <div className="card-footer text-center">
              <button
                onClick={hanhdleBack}
                type="button"
                className="btn btn-secondary me-1"
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

export default MajorEdit;
