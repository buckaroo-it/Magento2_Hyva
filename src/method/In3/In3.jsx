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

function In3({ method, selected, actions }) {
  const isSelected = method.code === selected.code;
  const { registerPaymentAction } = useCheckoutFormContext();
  const { cart } = useCartContext();

  const cartPhone = cart?.shipping_address?.phone;
  const showPhone =
    cartPhone === null ||
    cartPhone === undefined ||
    cartPhone.trim().length === 0;

  const formik = useFormik({
    initialValues: {
      name: cart?.billing_address?.fullName,
      dob: '',
      phone: '',
    },
    validationSchema: validationSchema(
      showPhone,
      cart?.shipping_address?.country
    ),
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
            name="name"
            type="text"
            inputProps={{ disabled: 'disabled' }}
            label={__('Billing Name:')}
            formik={formik}
          />
          <TextInput
            className="w-full"
            name="dob"
            type="date"
            label={__('Date of Birth:')}
            formik={formik}
          />
          {showPhone && (
            <TextInput
              className="w-full"
              name="phone"
              type="phone"
              label={__('Telephone:')}
              formik={formik}
            />
          )}
          <p>{__("You'll be redirected to finish the payment.")}</p>
        </div>
      )}
    </div>
  );
}

export default In3;

In3.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
