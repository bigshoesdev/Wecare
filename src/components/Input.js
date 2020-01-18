import React from "react";
import classNames from "classnames";
import { string, func, bool } from "prop-types";

const Input = ({
                   label,
                   type,
                   value,
                   name,
                   placeHolder,
                   extraClass,
                   onChange,
                   onBlur,
                   required,
                   validationError
               }) => {
    return (
        <div
            className={classNames("form-group", extraClass, {
                "has-danger": validationError
            })}
        >
            {label ? <label>{label}</label> : null}
            <input
                type={type}
                value={value}
                name={name}
                placeholder={placeHolder}
                onChange={onChange}
                onBlur={onBlur}
                className="form-control"
                required={required}
            />
            {validationError && (
                <div className="form-control-feedback">{validationError}</div>
            )}
        </div>
    );
};

Input.propTypes = {
    label: string,
    type: string,
    value: string,
    name: string,
    placeHolder: string,
    extraClass: string,
    onChange: func.isRequired,
    onBlur: func,
    validationError: string,
    required: bool
};

export default Input;
