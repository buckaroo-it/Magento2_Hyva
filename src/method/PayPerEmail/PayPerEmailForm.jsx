import React, { useEffect } from 'react';
import { object } from 'prop-types';
import { __ } from '@hyva/react-checkout/i18n';
import { useFormik } from 'formik';

import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import useCartContext from '@hyva/react-checkout/hook/useCartContext';

import SelectInput from '../../lib/helpers/components/SelectInput';
import TextInput from '../../lib/helpers/components/TextInput';
import usePlaceOrder from './usePlaceOrder';
import { validationSchema, getGenderList } from './helpers';

function PayPerEmailForm({ method }) {
  const { registerPaymentAction } = useCheckoutFormContext();
  const { cart } = useCartContext();
  const formik = useFormik({
    initialValues: {
      firstName: cart?.billing_address?.firstname,
      lastName: cart?.billing_address?.lastname,
      email: cart?.email,
      gender: '',
    },
    validationSchema,
  });

  const placeOrder = usePlaceOrder(method.code, formik);

  useEffect(() => {
    registerPaymentAction(method.code, placeOrder);
  }, [method, registerPaymentAction, placeOrder]);

  return (
    <div className="content py-2 pl-6">
      <SelectInput
        name="gender"
        label={__('Salutation')}
        formik={formik}
        prependOption={
          <option disabled value="">
            {__('Please Select Your Gender')}
          </option>
        }
        options={getGenderList()}
      />
      <TextInput
        className="w-full"
        name="firstName"
        type="text"
        label={__('Billing First Name:')}
        formik={formik}
      />
      <TextInput
        className="w-full"
        name="lastName"
        type="text"
        label={__('Billing Last Name:')}
        formik={formik}
      />
      <TextInput
        className="w-full"
        name="email"
        type="email"
        label={__('Email:')}
        formik={formik}
      />
    </div>
  );
}

export default PayPerEmailForm;

PayPerEmailForm.propTypes = {
  method: object.isRequired,
};
