import React from 'react';
import { string, object, oneOfType, shape, arrayOf, number } from 'prop-types';
import isObject from '../isObject';

function RadioGroup({
  name,
  options,
  formik,
  className = '',
  inputProps = {},
}) {
  return (
    <div className={`${className}`}>
      {options.map((option) => {
        if (isObject(option)) {
          const { name: optionName, value: optionValue } = option;
          return (
            <div className="flex items-center" key={optionValue}>
              <input
                className="mr-2"
                type="radio"
                name={name}
                id={`${name}_${optionValue}`}
                {...formik.getFieldProps(name)}
                value={optionValue}
                {...inputProps}
              />
              <label
                className="custom-control-label"
                htmlFor={`${name}_${optionValue}`}
              >
                {optionName}
              </label>
            </div>
          );
        }
        return (
          <div className="flex items-center" key={option}>
            <input
              className="mr-2"
              type="radio"
              name={name}
              id={`${name}_${option}`}
              {...formik.getFieldProps(name)}
              value={option}
              {...inputProps}
            />
            <label
              className="custom-control-label"
              htmlFor={`${name}_${option}`}
            >
              {option}
            </label>
          </div>
        );
      })}
      {formik.touched[name] && formik.errors[name] ? (
        <div className="text-red-500 text-xs italic">{formik.errors[name]}</div>
      ) : null}
    </div>
  );
}

export default RadioGroup;

const optionShapeObject = shape({
  name: oneOfType([string, number]),
  value: oneOfType([string, number]).isRequired,
});

RadioGroup.propTypes = {
  name: string.isRequired,
  options: arrayOf(oneOfType([string, number, optionShapeObject])).isRequired,
  formik: object.isRequired,
  className: string,
  inputProps: object,
};

RadioGroup.defaultProps = {
  className: '',
  inputProps: {},
};
