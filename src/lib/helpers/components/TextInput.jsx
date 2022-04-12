import React from 'react';
import { string, func, object } from 'prop-types';

function TextInput({
  name,
  type,
  label,
  value,
  onChange,
  error,
  className = '',
  rest = {},
}) {
  return (
    <div className={`field my-2 ${className}`}>
      <div>
        <label className="label" htmlFor={name}>
          {label}
        </label>
      </div>
      <input
        className={`form-input w-full ${error ? 'border-red-500' : ''}`}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {error && <div className="text-red-500 text-xs italic">{error}</div>}
    </div>
  );
}

export default TextInput;

TextInput.propTypes = {
  className: string,
  name: string.isRequired,
  type: string.isRequired,
  label: string.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
  error: string,
  rest: object,
};

TextInput.defaultProps = {
  className: '',
  error: null,
  rest: {},
};
