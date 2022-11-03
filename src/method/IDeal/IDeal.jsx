import React, { useEffect } from 'react';
import { object } from 'prop-types';
import { __ } from '@hyva/react-checkout/i18n';
import { useFormik } from 'formik';

import PlaceOrder from '@hyva/react-checkout/components/placeOrder';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';

import PaymentMethodRadio from '../../lib/helpers/components/PaymentMethodRadio';
import SelectInput from '../../lib/helpers/components/SelectInput';
import usePlaceOrder from './usePlaceOrder';
import { getIssuers, validationSchema } from './helpers';

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
          <SelectInput
            name="issuer"
            label={__('Bank')}
            formik={formik}
            prependOption={
              <option disabled value="">
                {__('Select a bank')}
              </option>
            }
            options={getIssuers()}
          />
          <p className="mt-2">
            {__("You'll be redirected to finish the payment.")}
          </p>

          <PlaceOrder />
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
