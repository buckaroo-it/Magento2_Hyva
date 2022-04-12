import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { object } from 'prop-types';
import _set from 'lodash.set';

import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import Card from '@hyva/react-checkout/components/common/Card';
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

function Bancontact({ method, selected, actions }) {
  const isSelected = method.code === selected.code;

  const invoiceRadioInput = (
    <div className="title flex justify-between">
      <RadioInput
        value={method.code}
        label={method.title}
        name="paymentMethod"
        checked={isSelected}
        onChange={actions.change}
      />
      <img src={logo} className="w-12" alt={method.title} />
    </div>
  );

  if (!isSelected) {
    return invoiceRadioInput;
  }

  const { registerPaymentAction } = useCheckoutFormContext();
  const { setErrorMessage } = useAppContext();
  const onSubmit = useOnSubmit();

  const useClientSide = getConfig('mrcash.useClientSide');

  const [methodState, setMethodState] = useState({
    clientSideMode: 'cc',
    formData: {
      cardholder: '',
      cardnumber: '',
      expirationmonth: '',
      expirationyear: '',
    },
    formValid: false,
  });

  const setClientSideMode = (checkboxClientSideMode) => {
    setMethodState({
      ...methodState,
      clientSideMode: checkboxClientSideMode,
    });
  };
  const setStateFromForm = (formIsValid, dataFromForm) => {
    setMethodState({
      ...methodState,
      formData: dataFromForm,
      formValid: formIsValid,
    });
  };

  const { clientSideMode, formData, formValid } = methodState;

  const placeOrderWithBancontact = useCallback(
    async (values) => {
      if (clientSideMode === 'cc' && !formValid) {
        setErrorMessage(__('One or more fields are required'));
        scrollToElement(selected.code);
        return;
      }
      const encryptedCardData = await encryptCardData(formData);
      _set(values, ADDITIONAL_DATA_KEY, {
        client_side_mode: clientSideMode,
        customer_encrypteddata: encryptedCardData,
      });
      await onSubmit(values);
    },
    [onSubmit, setErrorMessage, methodState]
  );

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithBancontact);
  }, [method, registerPaymentAction, placeOrderWithBancontact]);

  const credicardForm = useMemo(
    () => (
      <CreditcardForm setStateFromForm={setStateFromForm} formData={formData} />
    ),
    [formData]
  );
  return (
    <div id={selected.code}>
      {invoiceRadioInput}
      {useClientSide && (
        <Card>
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
          {clientSideMode === 'cc' && credicardForm}
        </Card>
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
