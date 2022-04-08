import React, { useCallback, useEffect, useState } from 'react';
import { func, shape, object } from 'prop-types';
import _set from 'lodash.set';

import Card from '@hyva/react-checkout/components/common/Card';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import { __ } from '@hyva/react-checkout/i18n';
import { scrollToElement } from '@hyva/react-checkout/utils/form';
import PlaceOrder from '@hyva/react-checkout/components/placeOrder';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import useAppContext from '@hyva/react-checkout/hook/useAppContext';

import TextInput from '../../lib/helpers/components/TextInput';
import useOnSubmit from '../../lib/hooks/useOnSubmit';
import { ADDITIONAL_DATA_KEY } from '../../lib/helpers/AdditionalBuckarooDataKey';

function Giropay({ method, selected, actions }) {
  const isSelected = method.code === selected.code;

  const invoiceRadioInput = (
    <RadioInput
      value={method.code}
      label={method.title}
      name="paymentMethod"
      checked={isSelected}
      onChange={actions.change}
    />
  );

  if (!isSelected) {
    return invoiceRadioInput;
  }

  const { registerPaymentAction } = useCheckoutFormContext();
  const { setErrorMessage } = useAppContext();
  const onSubmit = useOnSubmit();

  const [bic, setBic] = useState('');
  const [validationErrors, setvalidationErrors] = useState({});

  const validateBic = () => {
    const err = {};

    if (bic.trim().length === 0) {
      err.bic = __('Bic is required');
    }
    setvalidationErrors(err);
  };

  const placeOrderWithGiropay = useCallback(
    async (values) => {
      validateBic();

      if (Object.keys(validationErrors).length !== 0) {
        setErrorMessage(__('One or more fields are required'));
        scrollToElement(selected.code);
        return;
      }

      _set(values, ADDITIONAL_DATA_KEY, {
        customer_bic: bic,
      });

      await onSubmit(values);
    },
    [onSubmit, setErrorMessage, validationErrors]
  );

  useEffect(() => {
    validateBic();
  }, [bic]);

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithGiropay);
  }, [method, registerPaymentAction, placeOrderWithGiropay]);

  return (
    <div id={selected.code}>
      {invoiceRadioInput}
      <Card>
        <TextInput
          className="w-full"
          name="bic"
          type="text"
          label={__('BIC:')}
          value={bic}
          onChange={(e) => setBic(e.target.value)}
          error={validationErrors.bic}
        />
      </Card>
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
