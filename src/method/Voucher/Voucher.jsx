import React, { useEffect } from 'react';
import { object } from 'prop-types';
import { __ } from '@hyva/react-checkout/i18n';
import { useFormik } from 'formik';

import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';

import PaymentMethodRadio from '../../lib/helpers/components/PaymentMethodRadio';
import TextInput from '../../lib/helpers/components/TextInput';
import usePlaceOrder from './usePlaceOrder';
import { validationSchema } from './helpers';
import useSubmitVoucher from './useSubmitVoucher';

function Voucher({ method, selected, actions }) {
  const isSelected = method.code === selected.code;
  const { registerPaymentAction } = useCheckoutFormContext();
  const onSubmit = useSubmitVoucher();
  const formik = useFormik({
    initialValues: {
      voucher: '',
    },
    validationSchema,
    onSubmit,
  });

  const placeOrder = usePlaceOrder();

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
            name="voucher"
            type="text"
            label={__('Voucher code:')}
            formik={formik}
          />
          <div className="field my-2">
            <button
              className="btn btn-cta"
              type="button"
              onClick={formik.handleSubmit}
            >
              {__('Apply Voucher')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Voucher;

Voucher.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
