import React, { useState, useEffect, useCallback } from 'react';
import { object } from 'prop-types';
import { set as _set } from 'lodash-es';

import { useFormik } from 'formik';

import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import { scrollToElement } from '@hyva/react-checkout/utils/form';
import PlaceOrder from '@hyva/react-checkout/components/placeOrder';
import { __ } from '@hyva/react-checkout/i18n';

import useOnSubmit from '../../lib/hooks/useOnSubmit';
import logo from '../../../assets/Bancontact.svg';
import { getConfig } from '../../../config';
import CreditcardForm from './CreditcardForm';
import encryptCardData from '../../lib/helpers/EncryptCardData';
import { ADDITIONAL_DATA_KEY } from '../../lib/helpers/AdditionalBuckarooDataKey';
import { validationSchema } from './Validators';

function Bancontact({ method, selected, actions }) {
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

  const useClientSide = getConfig('mrcash.useClientSide');

  const [clientSideMode, setClientSideMode] = useState('cc');

  const formik = useFormik({
    initialValues: {
      cardholder: '',
      cardnumber: '',
      expirationmonth: '',
      expirationyear: '',
    },
    validationSchema,
  });

  const { validateForm, submitForm, values: formikValues } = formik;

  const placeOrderWithBancontact = useCallback(
    async (values) => {
      if (clientSideMode === 'cc') {
        const errors = await validateForm();
        submitForm();
        if (Object.keys(errors).length) {
          setErrorMessage(__('One or more fields are required'));
          scrollToElement(selected.code);
          return {};
        }
      }
      const encryptedCardData = await encryptCardData(formikValues);
      _set(values, ADDITIONAL_DATA_KEY, {
        client_side_mode: clientSideMode,
        customer_encrypteddata: encryptedCardData,
      });
      return onSubmit(values);
    },
    [onSubmit, setErrorMessage, clientSideMode, formikValues]
  );

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithBancontact);
  }, [method, registerPaymentAction, placeOrderWithBancontact]);

  if (!isSelected) {
    return invoiceRadioInput;
  }
  return (
    <div id={selected.code}>
      {invoiceRadioInput}
      {useClientSide && (
        <div className="p-2">
          <RadioInput
            value="cc"
            label={__('Bancontact card')}
            name="clientSideMode"
            checked={clientSideMode === 'cc'}
            onChange={(e) => {
              setClientSideMode(e.target.value);
            }}
          />
          <RadioInput
            value="mobile"
            label={__('Bancontact QR')}
            name="clientSideMode"
            checked={clientSideMode === 'mobile'}
            onChange={(e) => {
              setClientSideMode(e.target.value);
            }}
          />
          {clientSideMode === 'cc' && <CreditcardForm formik={formik} />}
        </div>
      )}
      <PlaceOrder />
    </div>
  );
}

export default Bancontact;

Bancontact.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
