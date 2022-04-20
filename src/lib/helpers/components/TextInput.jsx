import React from 'react';
import { string, object } from 'prop-types';

function TextInput({
  name,
  type,
  label,
  className = '',
  formik,
  inputProps = {},
}) {
  return (
    <div className={`field my-2 ${className}`}>
      <div>
        <label className="label" htmlFor={name}>
          {label}
        </label>
      </div>
      <input
        className={`form-input w-full ${
          formik.touched[name] && formik.errors[name] ? 'border-red-500' : ''
        }`}
        type={type}
        name={name}
        id={name}
        {...formik.getFieldProps(name)}
        {...inputProps}
      />
      {formik.touched[name] && formik.errors[name] ? (
        <div className="text-red-500 text-xs italic">{formik.errors[name]}</div>
      ) : null}
    </div>
  );
}

export default TextInput;

TextInput.propTypes = {
  className: string,
  name: string.isRequired,
  type: string.isRequired,
  label: string.isRequired,
  formik: object.isRequired,
  inputProps: object,
};

TextInput.defaultProps = {
  className: '',
  inputProps: {},
};
