import React, { useEffect, useCallback } from 'react';
import { object } from 'prop-types';

import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import PlaceOrder from '@hyva/react-checkout/components/placeOrder';
import { __ } from '@hyva/react-checkout/i18n';
import { set as _set } from 'lodash-es';

import { ADDITIONAL_DATA_KEY } from '../../lib/helpers/AdditionalBuckarooDataKey';
import logo from '../../../assets/Paypal.svg';
import useOnSubmit from '../../lib/hooks/useOnSubmit';

function PayPal({ method, selected, actions }) {
  const isSelected = method.code === selected.code;

  const invoiceRadioInput = (
    <div className="flex title">
      <RadioInput
        value={method.code}
        name="paymentMethod"
        checked={isSelected}
        onChange={actions.change}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        className="w-full cursor-pointer text"
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
  const placeOrder = useCallback(
    (values) => {
      _set(values, ADDITIONAL_DATA_KEY, {});
      return onSubmit(values);
    },
    [onSubmit]
  );

  useEffect(() => {
    registerPaymentAction(method.code, placeOrder);
  }, [method, placeOrder, registerPaymentAction]);

  if (!isSelected) {
    return invoiceRadioInput;
  }

  return (
    <div id={selected.code}>
      {invoiceRadioInput}
      <div className="py-2 pl-6 content">
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
