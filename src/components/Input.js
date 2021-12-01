import React from "react";
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
  const labelClass = `col-sm-${labelSize ? labelSize : 3} col-form-label`;
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

export default Input;
