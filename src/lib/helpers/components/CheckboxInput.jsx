import React from 'react';
import { string, object } from 'prop-types';

function CheckboxInput({
  name,
  label,
  className = '',
  formik,
  inputProps = {},
  labelLink = '',
}) {
  return (
    <div className={`${className}`}>
      <div className="flex items-center">
        <input
          className={`w-4 h-4 rounded mr-2 ${
            formik.touched[name] && formik.errors[name] ? 'border-red-500' : ''
          }`}
          type="checkbox"
          name={name}
          id={name}
          {...formik.getFieldProps(name)}
          {...inputProps}
        />
        <label
          className={`custom-control-label ${
            formik.touched[name] && formik.errors[name] ? 'text-red-500' : ''
          }`}
          htmlFor={name}
        >
          {labelLink.length === 0 ? (
            label
          ) : (
            <a target="_blank" rel="noreferrer" href={labelLink}>
              {label}
            </a>
          )}
        </label>
      </div>
      {formik.touched[name] && formik.errors[name] ? (
        <div className="text-red-500 text-xs italic">{formik.errors[name]}</div>
      ) : null}
    </div>
  );
}

export default CheckboxInput;

CheckboxInput.propTypes = {
  className: string,
  name: string.isRequired,
  label: string.isRequired,
  formik: object.isRequired,
  inputProps: object,
  labelLink: string,
};

CheckboxInput.defaultProps = {
  className: '',
  inputProps: {},
  labelLink: '',
};
