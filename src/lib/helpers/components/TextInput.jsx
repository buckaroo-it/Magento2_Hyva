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
  const getClassName = () => {
    let formClassName = 'form-input w-full';
    if (formik.touched[name] && formik.errors[name]) {
      formClassName += ' border-red-500';
    }
    if (inputProps.disabled === 'disabled') {
      formClassName += ' bg-gray-200';
    }
    return formClassName;
  };
  return (
    <div className={`field my-2 ${className}`}>
      <div>
        <label className="label" htmlFor={name}>
          {label}
        </label>
      </div>
      <input
        className={getClassName()}
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
