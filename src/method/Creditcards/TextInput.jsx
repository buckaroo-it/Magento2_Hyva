import React from 'react';
import { string, func } from 'prop-types';

function TextInput({
  name,
  type,
  label,
  value,
  onChange,
  onBlur,
  error,
  className = '',
}) {
  return (
    <>
      <div className={`field my-2 ${className}`}>
        <div>
          <label className="label" htmlFor={name}>
            {label}
          </label>
        </div>
        <input
          className="form-input w-full"
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {error && <div className="text-red-500 text-xs italic">{error}</div>}
      </div>
    </>
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
  onBlur: func.isRequired,
  error: string,
};

TextInput.defaultProps = {
  className: '',
  error: null,
};
