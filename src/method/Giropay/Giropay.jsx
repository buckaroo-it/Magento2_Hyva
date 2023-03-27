import React, { useEffect } from 'react';
import { func, shape, object } from 'prop-types';
import { __ } from '@hyva/react-checkout/i18n';
import { useFormik } from 'formik';

import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';

import TextInput from '../../lib/helpers/components/TextInput';
import PaymentMethodRadio from '../../lib/helpers/components/PaymentMethodRadio';
import usePlaceOrder from './usePlaceOrder';
import { validationSchema } from './helpers';

function Giropay({ method, selected, actions }) {
  const isSelected = method.code === selected.code;

  const { registerPaymentAction } = useCheckoutFormContext();

  const formik = useFormik({
    initialValues: {
      bic: '',
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
        <TextInput
          className="w-full"
          name="bic"
          type="text"
          label={__('BIC:')}
          formik={formik}
        />
      )}
    </>
  );
}

Giropay.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default Giropay;
