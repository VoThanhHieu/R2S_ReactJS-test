import React from "react";
import PropTypes from "prop-types";
import Validators from "../helpers/propTypeValidator";
const Input = (props) => {
  const {
    inputRef,
    label,
    id,
    labelSize,
    frmField,
    err,
    errMessage,
    ...other
  } = props;
  const labelClass = `col-sm-${labelSize} col-form-label`;
  //  const inputClass = `col-sm-${labelSize ? 12 - labelSize : 9}`;
  return (
    <div className="row mb-3">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="col-sm">
        {other["rows"] > 1 ? (
          <textarea
            ref={inputRef}
            className={`form-control ${err ? "is-invalid" : ""}`}
            id={id}
            {...frmField}
            {...other}
          />
        ) : (
          <input
            ref={inputRef}
            className={`form-control ${err ? "is-invalid" : ""}`}
            id={id}
            {...frmField}
            {...other}
          />
        )}
        {err ? <div className="invalid-feedback">{errMessage}</div> : ""}
      </div>
    </div>
  );
};

Input.propTypes = {
  inputRef: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelSize: Validators.numberBetween(1, 12),
  frmField: PropTypes.object,
  err: PropTypes.bool,
  errMessage: PropTypes.string,
  rows: PropTypes.number,
};
Input.defaultProps = {
  type: "text",
  labelSize: 3,
};

export default Input;
