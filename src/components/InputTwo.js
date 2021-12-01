import React from "react";
import { Col, Row } from "react-bootstrap";

const InputTwo = (props) => {
  const {
    label,
    id,
    id2,
    type,
    name,
    name2,
    placeHolder,
    placeHolder2,
    frmField,
    frmField2,
    err,
    err2,
    errMessage,
    errMessage2,
    defaultChecked,
    ...other
  } = props;
  return (
    <Row className="mb-3">
      <Col sm={4} lg={2} required className="col-form-label">
        <label htmlFor={id}>{label}</label>
      </Col>
      {type === "radio" ? (
        <Col className="col-form-label">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type={type}
              name={name}
              id={id}
              defaultChecked={defaultChecked === 1}
              {...other}
              {...frmField}
            />
            <label className="form-check-label" htmlFor={id}>
              Male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type={type}
              id={id}
              defaultChecked={defaultChecked === 0}
              name={name}
              {...frmField}
              {...other}
            />
            <label className="form-check-label" htmlFor={id}>
              Female
            </label>
          </div>
        </Col>
      ) : other["rows"] > 1 ? (
        <>
          <Col sm={6} lg={5} required className="col-form-label">
            <input
              type={type}
              id={id}
              className={`form-control ${err ? "is-invalid" : ""}`}
              name={name}
              placeholder={placeHolder}
              {...frmField}
              {...other}
            />
            {err ? <div className="invalid-feedback">{errMessage}</div> : ""}
          </Col>
          <Col sm={6} lg={5} required className="col-form-label">
            <input
              type={type}
              className={`form-control ${err2 ? "is-invalid" : ""}`}
              id={id2}
              name={name2}
              placeholder={placeHolder2}
              {...frmField2}
              {...other}
            />
            {err2 ? <div className="invalid-feedback">{errMessage2}</div> : ""}
          </Col>
        </>
      ) : (
        <Col lg={5}>
          <input
            type={type}
            className={`form-control ${err ? "is-invalid" : ""}`}
            id={id}
            name={name}
            placeholder={placeHolder}
            {...frmField}
            {...other}
          />
          {err ? <div className="invalid-feedback">{errMessage}</div> : ""}
        </Col>
      )}
    </Row>
  );
};
export default InputTwo;
