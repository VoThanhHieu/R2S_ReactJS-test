import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "./../components/Input";
const MajorEdit = (props) => {
  const navigate = useNavigate();
  const param = useParams();
  const [major, setMajor] = useState({ id: 0, name: "" });
  const [id, setId] = useState();
  useEffect(() => {
    setId(param.id);
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
                      {id > 0 ? "Edit" : "New"}
                    </small>
                  </h3>
                </div>
              </div>
            </div>
            <div className="card-body">
              <form>
                <Input
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
                href="/#"
                type="button"
                className="btn btn-secondary me-1"
              >
                Back
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

export default MajorEdit;
