import React, { useEffect } from 'react';
import { object } from 'prop-types';
import { __ } from '@hyva/react-checkout/i18n';
import { useFormik } from 'formik';

import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';

import PaymentMethodRadio from '../../lib/helpers/components/PaymentMethodRadio';
import SelectInput from '../../lib/helpers/components/SelectInput';
import usePlaceOrder from './usePlaceOrder';
import { getGenderList, validationSchema } from './helpers';

function Klarna({ method, selected, actions }) {
  const isSelected = method.code === selected.code;

  const { registerPaymentAction } = useCheckoutFormContext();

  const formik = useFormik({
    initialValues: {
      gender: '',
    },
    validationSchema,
  });

  const placeOrderWithKlarna = usePlaceOrder(selected.code, formik);
  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithKlarna);
  }, [method.code, registerPaymentAction, placeOrderWithKlarna]);

  return (
    <>
      <PaymentMethodRadio
        method={method}
        isSelected={isSelected}
        onChange={actions.change}
      />
      {isSelected && (
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
          <p className="mt-2">
            {__("You'll be redirected to finish the payment.")}
          </p>
        </div>
      )}
    </>
  );
}

export default Klarna;

Klarna.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
