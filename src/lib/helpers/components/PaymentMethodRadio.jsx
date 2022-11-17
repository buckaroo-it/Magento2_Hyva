import React from 'react';
import { string, bool, func, shape } from 'prop-types';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import getLogo from '../getLogo';

function PaymentMethodRadio({ method, isSelected, onChange }) {
  const { code: methodCode, title } = method;
  const logo = getLogo(methodCode);

  return (
    <div className="title flex">
      <RadioInput
        value={methodCode}
        name="paymentMethod"
        checked={isSelected}
        onChange={onChange}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        className="text w-full cursor-pointer"
        htmlFor={`paymentMethod_${methodCode}`}
      >
        <strong>{title}</strong>
      </label>

      {logo && <img height="24" width="24" src={logo} alt={title} />}
    </div>
  );
}

export default PaymentMethodRadio;

const methodShape = shape({
  code: string.isRequired,
  title: string.isRequired,
});

PaymentMethodRadio.propTypes = {
  method: methodShape.isRequired,
  isSelected: bool.isRequired,
  onChange: func.isRequired,
};
