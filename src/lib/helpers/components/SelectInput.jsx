import React from 'react';
import {
  string,
  object,
  oneOfType,
  shape,
  arrayOf,
  number,
  node,
} from 'prop-types';
import isObject from '../isObject';

function SelectInput({
  name,
  label,
  options,
  className = '',
  formik,
  prependOption = null,
  inputProps = {},
}) {
  return (
    <div className={className}>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <select
        className={`form-select w-full ${
          formik.touched[name] && formik.errors[name] ? 'border-red-500' : ''
        }`}
        name={name}
        id={name}
        {...formik.getFieldProps(name)}
        {...inputProps}
      >
        {prependOption}
        {options.map((option) => {
          if (isObject(option)) {
            const { name: optionName, value: optionValue } = option;
            return (
              <option key={optionValue} value={optionValue}>
                {optionName}
              </option>
            );
          }
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      {formik.touched[name] && formik.errors[name] ? (
        <div className="text-red-500 text-xs italic">{formik.errors[name]}</div>
      ) : null}
    </div>
  );
}

export default SelectInput;

const optionShapeObject = shape({
  name: oneOfType([string, number]),
  value: oneOfType([string, number]).isRequired,
});

SelectInput.propTypes = {
  className: string,
  name: string.isRequired,
  label: string.isRequired,
  options: arrayOf(oneOfType([string, number, optionShapeObject])).isRequired,
  formik: object.isRequired,
  prependOption: node,
  inputProps: object,
};

SelectInput.defaultProps = {
  className: '',
  inputProps: {},
  prependOption: null,
};
