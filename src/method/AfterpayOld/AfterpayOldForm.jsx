import React, { useEffect } from 'react';
import { object } from 'prop-types';

import { useFormik } from 'formik';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import { __ } from '@hyva/react-checkout/i18n';
import useCartContext from '@hyva/react-checkout/hook/useCartContext';

import TextInput from '../../lib/helpers/components/TextInput';
import CheckboxInput from '../../lib/helpers/components/CheckboxInput';
import SelectInput from '../../lib/helpers/components/SelectInput';

import {
  canShowPhone,
  determineTosLink,
  getBusinessModels,
  isAcceptgiro,
  isDigiAccept,
  prepareValidationSchema,
  areBothBusinessMethod,
  isB2B,
} from './helpers';
import usePlaceOrder from './usePlaceOrder';

function AfterpayOldForm({ method }) {
  const { registerPaymentAction } = useCheckoutFormContext();
  const { cart } = useCartContext();

  const formik = useFormik({
    initialValues: {
      telephone: '',
      dob: '',
      iban: '',
      tos: false,
      coc: '',
      companyName: '',
      businessType: 'b2c',
    },
    validationSchema: prepareValidationSchema(cart, method.code),
  });
  const placeOrder = usePlaceOrder(method.code, formik);

  useEffect(() => {
    registerPaymentAction(method.code, placeOrder);
  }, [method.code, registerPaymentAction, placeOrder]);

  return (
    <div className="content py-2 pl-6">
      <div className="form-control">
        {canShowPhone(cart) && (
          <TextInput
            className="w-full"
            name="telephone"
            type="text"
            label={__('Telephone:')}
            formik={formik}
          />
        )}
        <TextInput
          className="w-full"
          name="dob"
          type="date"
          label={__('Date of Birth:')}
          formik={formik}
        />

        {isAcceptgiro(method.code) && (
          <>
            {areBothBusinessMethod(method.code) && (
              <SelectInput
                name="businessType"
                label={__('Business Model:')}
                formik={formik}
                options={getBusinessModels()}
              />
            )}
            {isB2B(method.code, formik.values.businessType) && (
              <>
                <TextInput
                  className="w-full"
                  name="iban"
                  type="text"
                  label={__('Bank Account Number:')}
                  formik={formik}
                />
                <TextInput
                  className="w-full"
                  name="companyName"
                  type="text"
                  label={__('Company Name:')}
                  formik={formik}
                />
              </>
            )}
          </>
        )}

        {isDigiAccept(method.code) && (
          <TextInput
            className="w-full"
            name="coc"
            type="text"
            label={__('COC-number:')}
            formik={formik}
          />
        )}

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
      </div>
    </div>
  );
}

export default AfterpayOldForm;

AfterpayOldForm.propTypes = {
  method: object.isRequired,
};
