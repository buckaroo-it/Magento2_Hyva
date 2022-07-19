import React, { useEffect } from 'react';
import { func, shape, object } from 'prop-types';

import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import PlaceOrder from '@hyva/react-checkout/components/placeOrder';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import { __ } from '@hyva/react-checkout/i18n';

import useOnSubmit from '../../lib/hooks/useOnSubmit';
import logo from '../../../assets/Kbc.svg';

function Kbc({ method, selected, actions }) {
  const isSelected = method.code === selected.code;

  const invoiceRadioInput = (
    <div className="title flex">
      <RadioInput
        value={method.code}
        name="paymentMethod"
        checked={isSelected}
        onChange={actions.change}
      />

      <div className="text">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor={`paymentMethod_${method.code}`}>{method.title}</label>
      </div>
      <img height="24" width="24" src={logo} alt={method.title} />
    </div>
  );

  const { registerPaymentAction } = useCheckoutFormContext();
  const onSubmit = useOnSubmit();

  useEffect(() => {
    registerPaymentAction(method.code, onSubmit);
  }, [method, registerPaymentAction]);

  if (!isSelected) {
    return invoiceRadioInput;
  }

  return (
    <div id={selected.code}>
      {invoiceRadioInput}
      <small>{__("You'll be redirected to finish the payment.")}</small>
      <PlaceOrder />
    </div>
  );
}

Kbc.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default Kbc;
