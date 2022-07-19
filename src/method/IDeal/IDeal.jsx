import React, { useEffect, useCallback } from 'react';
import { object } from 'prop-types';
import { set as _set } from 'lodash-es';

import { useFormik } from 'formik';

import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import PlaceOrder from '@hyva/react-checkout/components/placeOrder';
import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import { scrollToElement } from '@hyva/react-checkout/utils/form';

import { __ } from '@hyva/react-checkout/i18n';
import { getConfig } from '../../../config';
import logo from '../../../assets/Ideal.svg';
import { ADDITIONAL_DATA_KEY } from '../../lib/helpers/AdditionalBuckarooDataKey';
import { validationSchema } from './Validators';
import SelectInput from '../../lib/helpers/components/SelectInput';
import useOnSubmit from '../../lib/hooks/useOnSubmit';

function IDeal({ method, selected, actions }) {
  const isSelected = method.code === selected.code;

  const invoiceRadioInput = (
    <div className="title flex">
      <RadioInput
        value={method.code}
        name="paymentMethod"
        checked={isSelected}
        onChange={actions.change}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        className="text w-full cursor-pointer"
        htmlFor={`paymentMethod_${method.code}`}
      >
        <strong>{method.title}</strong>
        <div className="cta">{__('Most often chosen')}</div>
        <div className="description">{__('Pay with online banking')}</div>
      </label>

      <img height="24" width="24" src={logo} alt="Ideal Logo" />
    </div>
  );

  const { registerPaymentAction } = useCheckoutFormContext();
  const { setErrorMessage } = useAppContext();
  const onSubmit = useOnSubmit();

  const { banks: paymentMethods } = getConfig('ideal');

  const formik = useFormik({
    initialValues: {
      issuer: '',
    },
    validationSchema,
  });

  const {
    validateForm,
    submitForm,
    values: { issuer },
  } = formik;

  const palaceOrderWithIdeal = useCallback(
    async (values) => {
      const errors = await validateForm();
      submitForm();
      if (Object.keys(errors).length) {
        setErrorMessage(__('One or more fields are required'));
        scrollToElement(selected.code);
        return;
      }
      _set(values, ADDITIONAL_DATA_KEY, {
        issuer,
      });
      await onSubmit(values);
    },
    [onSubmit, setErrorMessage, issuer]
  );

  useEffect(() => {
    registerPaymentAction(method.code, palaceOrderWithIdeal);
  }, [method, registerPaymentAction, palaceOrderWithIdeal]);

  if (!isSelected) {
    return invoiceRadioInput;
  }

  const mapIssuer = (origIssuer) => ({
    name: origIssuer.name,
    value: origIssuer.code,
  });
  const formatedIssuers = paymentMethods.map(mapIssuer);
  return (
    <>
      {invoiceRadioInput}
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
          options={formatedIssuers}
        />
        <p className="mt-2">
          {__("You'll be redirected to finish the payment.")}
        </p>

        <PlaceOrder />
      </div>
    </>
  );
}

export default IDeal;

IDeal.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
