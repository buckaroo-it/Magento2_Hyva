import React from 'react';
import {
  string,
  func,
  object,
  oneOfType,
  shape,
  arrayOf,
  number,
} from 'prop-types';

function SelectInput({
  name,
  label,
  value,
  onChange,
  error,
  options,
  className = '',
  prependOption = null,
  rest = {},
}) {
  const isObject = (maybeObject) =>
    typeof maybeObject === 'object' &&
    !Array.isArray(maybeObject) &&
    maybeObject !== null;

  const optionList = options.map((option) => {
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
  });

  return (
    <>
      <div className={className}>
        <label className="label" htmlFor={name}>
          {label}
        </label>
        <select
          className={`form-input w-full ${error ? 'border-red-500' : ''}`}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          {...rest}
        >
          {prependOption}
          {optionList}
        </select>
        {error && <div className="text-red-500 text-xs italic">{error}</div>}
      </div>
    </>
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
  value: string.isRequired,
  onChange: func.isRequired,
  options: arrayOf(oneOfType([string, number, optionShapeObject])).isRequired,
  error: string,
  prependOption: object,
  rest: object,
};

SelectInput.defaultProps = {
  className: '',
  error: null,
  rest: {},
  prependOption: null,
};
