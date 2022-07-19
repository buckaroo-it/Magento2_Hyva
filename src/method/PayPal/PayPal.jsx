import React, { useEffect } from 'react';
import { object } from 'prop-types';

import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import PlaceOrder from '@hyva/react-checkout/components/placeOrder';
import { __ } from '@hyva/react-checkout/i18n';

import logo from '../../../assets/Paypal.svg';
import useOnSubmit from '../../lib/hooks/useOnSubmit';

function PayPal({ method, selected, actions }) {
  const isSelected = method.code === selected.code;

  const invoiceRadioInput = (
    <div className="title flex">
      <RadioInput
        value={method.code}
        name="paymentMethod"
        checked={isSelected}
        onChange={actions.change}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        className="text w-full cursor-pointer"
        htmlFor={`paymentMethod_${method.code}`}
      >
        <strong>{method.title}</strong>
        <div className="description">{__('Credit or Debit')}</div>
      </label>
      <img height="24" width="24" src={logo} alt="PayPal Logo" />
    </div>
  );

  const { registerPaymentAction } = useCheckoutFormContext();
  const onSubmit = useOnSubmit();

  useEffect(() => {
    registerPaymentAction(method.code, onSubmit);
  }, [method, registerPaymentAction, onSubmit]);

  if (!isSelected) {
    return invoiceRadioInput;
  }

  return (
    <div id={selected.code}>
      {invoiceRadioInput}
      <div className="content py-2 pl-6">
        <p>{__("You'll be redirected to finish the payment.")}</p>

        <PlaceOrder />
      </div>
    </div>
  );
}

export default PayPal;

PayPal.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
