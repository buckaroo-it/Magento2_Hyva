import React, { useEffect } from 'react';
import { __ } from '@hyva/react-checkout/i18n';
import { useFormik } from 'formik';
import { object } from 'prop-types';

import useCartContext from '@hyva/react-checkout/hook/useCartContext';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';

import CheckboxInput from '../../lib/helpers/components/CheckboxInput';
import SelectInput from '../../lib/helpers/components/SelectInput';
import TextInput from '../../lib/helpers/components/TextInput';
import usePlaceOrder from './usePlaceOrder';

import {
  validationSchema,
  getGenderList,
  determineTosLink,
  isB2b,
} from './helpers';

function BillinkForm({ method }) {
  const { cart } = useCartContext();
  const { registerPaymentAction } = useCheckoutFormContext();

  const showDob = ['NL', 'BE'].indexOf(cart?.billing_address?.country) !== -1;

  const fullName = cart?.billing_address?.fullName;

  const formik = useFormik({
    initialValues: {
      name: fullName,
      dob: '',
      gender: '',
      coc: '',
      vat: '',
      tos: false,
      phone: '',
    },
    validationSchema: validationSchema(showDob),
  });

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
      {showDob && (
        <>
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
            name="dob"
            type="date"
            label={__('Date of Birth:')}
            formik={formik}
          />
        </>
      )}
      {!isB2b() && (
        <TextInput
          className="w-full"
          name="phone"
          type="text"
          label={__('Telephone:')}
          formik={formik}
        />
      )}
      {isB2b() && (
        <>
          <TextInput
            className="w-full"
            name="coc"
            type="text"
            label={__('Chamber of Commerce number:')}
            formik={formik}
          />
          <TextInput
            className="w-full"
            name="vat"
            type="text"
            label={__('VAT number:')}
            formik={formik}
          />
        </>
      )}
      <CheckboxInput
        name="tos"
        label={__('Accept terms of use')}
        formik={formik}
        labelLink={determineTosLink()}
      />
    </div>
  );
}

export default BillinkForm;

BillinkForm.propTypes = {
  method: object.isRequired,
};
