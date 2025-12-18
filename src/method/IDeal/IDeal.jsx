import React, { useEffect } from 'react';
import { object } from 'prop-types';
import { __ } from '@hyva/react-checkout/i18n';
import { useFormik } from 'formik';

import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';

import PaymentMethodRadio from '../../lib/helpers/components/PaymentMethodRadio';
import usePlaceOrder from './usePlaceOrder';
import { validationSchema } from './helpers';

function IDeal({ method, selected, actions }) {
  const isSelected = method.code === selected.code;

  const { registerPaymentAction } = useCheckoutFormContext();

  const formik = useFormik({
    initialValues: {
      issuer: '',
    },
    validationSchema,
  });

  const palaceOrderWithIdeal = usePlaceOrder(selected.code, formik);
  useEffect(() => {
    registerPaymentAction(method.code, palaceOrderWithIdeal);
  }, [method.code, registerPaymentAction, palaceOrderWithIdeal]);

  return (
    <>
      <PaymentMethodRadio
        method={method}
        isSelected={isSelected}
        onChange={actions.change}
      />
      {isSelected && (
        <div className="content py-2 pl-6">
          <p className="mt-2">
            {__("You'll be redirected to finish the payment.")}
          </p>
        </div>
      )}
    </>
  );
}

export default IDeal;

IDeal.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
