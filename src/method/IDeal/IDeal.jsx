import React, { useEffect, useCallback } from 'react';
import { object } from 'prop-types';
import _set from 'lodash.set';

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
      <div className="text">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor={`paymentMethod_${method.code}`}>{method.title}</label>
        <div className="cta">{__('Most often chosen')}</div>
        <div className="description">{__('Pay with online banking')}</div>
      </div>

      <img height="24" width="24" src={logo} alt="Ideal Logo" />
    </div>
  );

  if (!isSelected) {
    return invoiceRadioInput;
  }

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

  const mapIssuer = (origIssuer) => ({
    name: origIssuer.name,
    value: origIssuer.code,
  });
  const formatedIssuers = paymentMethods.map(mapIssuer);
  return (
    <>
      {invoiceRadioInput}
      <div className="content py-2 px-10">
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
        <p>{__("You'll be redirected to finish the payment.")}</p>

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
