import React, { useEffect } from 'react';
import { object } from 'prop-types';
import { __ } from '@hyva/react-checkout/i18n';
import { useFormik } from 'formik';

import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import useCartContext from '@hyva/react-checkout/hook/useCartContext';

import TextInput from '../../lib/helpers/components/TextInput';
import usePlaceOrder from './usePlaceOrder';
import { validationSchema } from './helpers';
import useSetFormFullName from '../../lib/hooks/useSetFormFullName';

function In3Form({ method }) {
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

  useSetFormFullName(formik);

  const placeOrder = usePlaceOrder(method.code, formik);

  useEffect(() => {
    registerPaymentAction(method.code, placeOrder);
  }, [method, registerPaymentAction, placeOrder]);

  return (
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
  );
}

export default In3Form;

In3Form.propTypes = {
  method: object.isRequired,
};
