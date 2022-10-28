import React, { useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import { object } from 'prop-types';
import { set as _set } from 'lodash-es';
import { object as YupObject, string as YupString, bool as YupBool } from 'yup';

import { __ } from '@hyva/react-checkout/i18n';
import { scrollToElement } from '@hyva/react-checkout/utils/form';
import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import PlaceOrder from '@hyva/react-checkout/components/placeOrder';
import useCartContext from '@hyva/react-checkout/hook/useCartContext';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';

import TextInput from '../../lib/helpers/components/TextInput';
import CheckboxInput from '../../lib/helpers/components/CheckboxInput';
import { getConfig } from '../../../config';
import logo from '../../../assets/AfterPay.svg';
import { determineTosLink, showCOC } from './helper';
import useOnSubmit from '../../lib/hooks/useOnSubmit';
import { ADDITIONAL_DATA_KEY } from '../../lib/helpers/AdditionalBuckarooDataKey';

function Afterpay({ method, selected, actions }) {
  const isSelected = method.code === selected.code;

  const invoiceRadioInput = (
    <div className="flex title">
      <RadioInput
        value={method.code}
        name="paymentMethod"
        checked={isSelected}
        onChange={actions.change}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        className="w-full cursor-pointer text"
        htmlFor={`paymentMethod_${method.code}`}
      >
        <strong>{method.title}</strong>
      </label>

      <img height="24" width="24" src={logo} alt={method.title} />
    </div>
  );

  const { registerPaymentAction } = useCheckoutFormContext();
  const { setErrorMessage } = useAppContext();
  const { cart } = useCartContext();
  const onSubmit = useOnSubmit();

  const config = getConfig('afterpay20');

  const requiredMessage = __('This is a required field.');
  const validationSchema = YupObject({
    telephone: YupString().required(requiredMessage),
    dob: YupString()
      .required(requiredMessage)
      .bkIs18years(__('You should be at least 18 years old.')),
    tos: YupBool().oneOf([true], requiredMessage),
    identificationNumber: YupString().when('isCompany', {
      is: () => cart.billing_address.country === 'FI',
      then: YupString().required(requiredMessage),
      otherwise: YupString(),
    }),
    coc: YupString().when('isb2b', {
      is: () => showCOC(config.is_b2b, cart),
      then: YupString().required(requiredMessage),
      otherwise: YupString(),
    }),
  });

  const formik = useFormik({
    initialValues: {
      telephone: '',
      dob: '',
      identificationNumber: '',
      tos: false,
      coc: '',
    },
    validationSchema,
  });
  const { validateForm, submitForm, values: formikValues } = formik;

  const placeOrderWithCreditcards = useCallback(
    async (values) => {
      const errors = await validateForm();
      submitForm();
      if (Object.keys(errors).length) {
        setErrorMessage(__('One or more fields are required'));
        scrollToElement(selected.code);
        return {};
      }
      _set(values, ADDITIONAL_DATA_KEY, {
        customer_telephone: formikValues.telephone,
        customer_identificationNumber: formikValues.identificationNumber,
        customer_DoB: formikValues.dob,
        termsCondition: formikValues.tos,
        customer_coc: formikValues.coc,
        customer_billingName: cart.billing_address.fullName,
      });
      return onSubmit(values);
    },
    [
      onSubmit,
      submitForm,
      validateForm,
      selected.code,
      setErrorMessage,
      formikValues.dob,
      formikValues.tos,
      formikValues.coc,
      formikValues.telephone,
      cart.billing_address.fullName,
      formikValues.identificationNumber,
    ]
  );

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithCreditcards);
  }, [method, registerPaymentAction, placeOrderWithCreditcards]);

  if (!isSelected) {
    return invoiceRadioInput;
  }

  return (
    <div id={selected.code}>
      {invoiceRadioInput}
      <div className="py-2 pl-6 content">
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

          {showCOC(config.is_b2b, cart) ? (
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
    </div>
  );
}

export default Afterpay;

Afterpay.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
