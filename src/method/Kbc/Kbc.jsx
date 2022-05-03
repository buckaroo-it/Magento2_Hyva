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
    <div className="title flex justify-between">
      <RadioInput
        value={method.code}
        label={method.title}
        name="paymentMethod"
        checked={isSelected}
        onChange={actions.change}
      />
      <img src={logo} className="w-12" alt={method.title} />
    </div>
  );

  if (!isSelected) {
    return invoiceRadioInput;
  }

  const { registerPaymentAction } = useCheckoutFormContext();
  const onSubmit = useOnSubmit();

  useEffect(() => {
    registerPaymentAction(method.code, onSubmit);
  }, [method, registerPaymentAction]);

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
