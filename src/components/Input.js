import React from "react";
const Input = (props) => {
  const { inputRef, label, id, labelSize, ...other } = props;
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
            className="form-control"
            id={id}
            {...other}
          />
        ) : (
          <input ref={inputRef} className="form-control" id={id} {...other} />
        )}
      </div>
    </div>
  );
};

export default Input;
