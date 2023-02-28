import React, { useEffect } from 'react';
import { object } from 'prop-types';
import { __ } from '@hyva/react-checkout/i18n';
import { useFormik } from 'formik';

import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import useCartContext from '@hyva/react-checkout/hook/useCartContext';

import PaymentMethodRadio from '../../lib/helpers/components/PaymentMethodRadio';
import TextInput from '../../lib/helpers/components/TextInput';
import usePlaceOrder from './usePlaceOrder';
import { validationSchema } from './helpers';

function SepaDirect({ method, selected, actions }) {
  const isSelected = method.code === selected.code;
  const { registerPaymentAction } = useCheckoutFormContext();
  const { cart } = useCartContext();
  const isNotNL = cart?.billing_address?.country !== 'NL';
  const formik = useFormik({
    initialValues: {
      bankAccountHolder: '',
      bankAccountNumber: '',
      bic: '',
    },
    validationSchema: validationSchema(isNotNL),
  });

  const placeOrder = usePlaceOrder(selected.code, formik);

  useEffect(() => {
    registerPaymentAction(method.code, placeOrder);
  }, [method, registerPaymentAction, placeOrder]);

  return (
    <div id={selected.code}>
      <PaymentMethodRadio
        method={method}
        isSelected={isSelected}
        onChange={actions.change}
      />

      {isSelected && (
        <div className="content py-2 pl-6">
          <TextInput
            className="w-full"
            name="bankAccountHolder"
            type="text"
            label={__('Bank account holder:')}
            formik={formik}
          />
          <TextInput
            className="w-full"
            name="bankAccountNumber"
            type="text"
            label={__('Bank account number:')}
            formik={formik}
          />
          {isNotNL && (
            <TextInput
              className="w-full"
              name="bic"
              type="text"
              label={__('BIC Number:')}
              formik={formik}
            />
          )}
          <p>{__("You'll be redirected to finish the payment.")}</p>
        </div>
      )}
    </div>
  );
}

export default SepaDirect;

SepaDirect.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
