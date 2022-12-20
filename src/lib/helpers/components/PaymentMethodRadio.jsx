import React from 'react';
import { string, bool, func, shape } from 'prop-types';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import getLogo from '../getLogo';

function PaymentMethodRadio({ method, isSelected, onChange }) {
  const { code: methodCode, title } = method;
  const logo = getLogo(methodCode);

  return (
    <div className="title flex justify-between">
      <RadioInput
        value={methodCode}
        name="paymentMethod"
        label={title}
        checked={isSelected}
        onChange={onChange}
      />
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
