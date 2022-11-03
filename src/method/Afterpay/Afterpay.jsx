import React, { useEffect } from 'react';
import { object } from 'prop-types';

import { useFormik } from 'formik';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import PlaceOrder from '@hyva/react-checkout/components/placeOrder';
import { __ } from '@hyva/react-checkout/i18n';
import useCartContext from '@hyva/react-checkout/hook/useCartContext';

import TextInput from '../../lib/helpers/components/TextInput';
import CheckboxInput from '../../lib/helpers/components/CheckboxInput';
import { determineTosLink, prepareValidationSchema, showCOC } from './helpers';
import PaymentMethodRadio from '../../lib/helpers/components/PaymentMethodRadio';
import usePlaceOrder from './usePlaceOrder';

function Afterpay({ method, selected, actions }) {
  const { registerPaymentAction } = useCheckoutFormContext();
  const { cart } = useCartContext();

  const isSelected = method.code === selected.code;

  const formik = useFormik({
    initialValues: {
      telephone: '',
      dob: '',
      identificationNumber: '',
      tos: false,
      coc: '',
    },
    validationSchema: prepareValidationSchema(cart),
  });
  const placeOrder = usePlaceOrder(selected.code, formik);

  useEffect(() => {
    registerPaymentAction(method.code, placeOrder);
  }, [method.code, registerPaymentAction, placeOrder]);

  return (
    <div id={selected.code}>
      <PaymentMethodRadio
        method={method}
        isSelected={isSelected}
        onChange={actions.change}
      />
      {isSelected && (
        <div className="content py-2 pl-6">
          <div className="form-control">
            <TextInput
              className="w-full"
              name="telephone"
              type="text"
              label={__('Telephone:')}
              formik={formik}
            />
            <TextInput
              className="w-full"
              name="dob"
              type="date"
              label={__('Date of Birth:')}
              formik={formik}
            />
            {cart.billing_address.country === 'FI' ? (
              <TextInput
                className="w-full"
                name="identificationNumber"
                type="text"
                label={__('Identification number:')}
                formik={formik}
              />
            ) : null}

            {showCOC(cart) ? (
              <TextInput
                className="w-full"
                name="coc"
                type="text"
                label={__('CoC-number:')}
                formik={formik}
              />
            ) : null}

            <CheckboxInput
              name="tos"
              label={__(
                'Yes, I accept the terms and condition for the use of Afterpay.'
              )}
              formik={formik}
              labelLink={determineTosLink(cart.billing_address.country)}
            />

            {cart.billing_address.country === 'BE' ? (
              <>
                (Or click here for the French translation:
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={determineTosLink('FR_BE')}
                >
                  terms and condition
                </a>
                )
              </>
            ) : null}

            <PlaceOrder />
          </div>
        </div>
      )}
    </div>
  );
}

export default Afterpay;

Afterpay.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
