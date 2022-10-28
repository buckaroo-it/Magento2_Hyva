import React, { useEffect, useCallback } from 'react';
import { func, shape, object } from 'prop-types';

import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import PlaceOrder from '@hyva/react-checkout/components/placeOrder';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import { __ } from '@hyva/react-checkout/i18n';
import { set as _set } from 'lodash-es';

import { ADDITIONAL_DATA_KEY } from '../../lib/helpers/AdditionalBuckarooDataKey';
import useOnSubmit from '../../lib/hooks/useOnSubmit';
import logo from '../../../assets/Kbc.svg';

function Kbc({ method, selected, actions }) {
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
      </label>
      <img height="24" width="24" src={logo} alt={method.title} />
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
