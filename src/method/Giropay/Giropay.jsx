import React, { useCallback, useEffect } from 'react';
import { func, shape, object } from 'prop-types';
import { set as _set } from 'lodash-es';
import { useFormik } from 'formik';
import { object as YupObject, string as YupString } from 'yup';

import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import { __ } from '@hyva/react-checkout/i18n';
import { scrollToElement } from '@hyva/react-checkout/utils/form';
import PlaceOrder from '@hyva/react-checkout/components/placeOrder';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import useAppContext from '@hyva/react-checkout/hook/useAppContext';

import useOnSubmit from '../../lib/hooks/useOnSubmit';
import { ADDITIONAL_DATA_KEY } from '../../lib/helpers/AdditionalBuckarooDataKey';
import logo from '../../../assets/Giropay.svg';
import TextInput from '../../lib/helpers/components/TextInput';

function Giropay({ method, selected, actions }) {
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
      </label>
      <img height="24" width="24" src={logo} alt={method.title} />
    </div>
  );

  const { registerPaymentAction } = useCheckoutFormContext();
  const { setErrorMessage } = useAppContext();
  const onSubmit = useOnSubmit();

  const requiredMessage = __('This is a required field.');

  const validationSchema = YupObject({
    bic: YupString().required(requiredMessage),
  });

  const formik = useFormik({
    initialValues: {
      bic: '',
    },
    validationSchema,
  });

  const {
    validateForm,
    submitForm,
    values: { bic },
  } = formik;

  const placeOrderWithGiropay = useCallback(
    async (values) => {
      const errors = await validateForm();
      submitForm();
      if (Object.keys(errors).length) {
        setErrorMessage(__('One or more fields are required'));
        scrollToElement(selected.code);
        return;
      }

      _set(values, ADDITIONAL_DATA_KEY, {
        customer_bic: bic,
      });

      await onSubmit(values);
    },
    [onSubmit, setErrorMessage, bic]
  );

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithGiropay);
  }, [method, registerPaymentAction, placeOrderWithGiropay]);

  if (!isSelected) {
    return invoiceRadioInput;
  }

  return (
    <div id={selected.code}>
      {invoiceRadioInput}
      <TextInput
        className="w-full"
        name="bic"
        type="text"
        label={__('BIC:')}
        formik={formik}
      />
      <PlaceOrder />
    </div>
  );
}

Giropay.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default Giropay;
