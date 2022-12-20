import React, { useEffect } from 'react';
import { object } from 'prop-types';

import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import { __ } from '@hyva/react-checkout/i18n';

import PaymentMethodRadio from '../../lib/helpers/components/PaymentMethodRadio';
import usePlaceOrder from './usePlaceOrder';

function PayPal({ method, selected, actions }) {
  const { registerPaymentAction } = useCheckoutFormContext();
  const placeOrder = usePlaceOrder();

  useEffect(() => {
    registerPaymentAction(method.code, placeOrder);
  }, [method.code, registerPaymentAction, placeOrder]);

  const isSelected = method.code === selected.code;

  return (
    <div id={selected.code}>
      <PaymentMethodRadio
        method={method}
        isSelected={isSelected}
        onChange={actions.change}
      />
      {isSelected && (
        <div className="content py-2 pl-6">
          <p>{__("You'll be redirected to finish the payment.")}</p>
        </div>
      )}
    </div>
  );
}

export default PayPal;

PayPal.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
