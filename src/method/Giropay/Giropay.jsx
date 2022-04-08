import React, { useCallback, useEffect } from 'react';
import { func, shape, object } from 'prop-types';
import _get from 'lodash.get';

import Card from '@hyva/react-checkout/components/common/Card';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import TextInput from '@hyva/react-checkout/components/common/Form/TextInput';
import { __ } from '@hyva/react-checkout/i18n';

import { PAYMENT_METHOD_FORM } from '@hyva/react-checkout/config';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import usePaymentMethodFormContext from '@hyva/react-checkout/components/paymentMethod/hooks/usePaymentMethodFormContext';
import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import useOnSubmit from './hooks/useOnSubmit';

const bicField = `${PAYMENT_METHOD_FORM}.additional_data.customer_bic`;

function Giropay({ method, selected, actions }) {
  const { formikData } = usePaymentMethodFormContext();
  const { registerPaymentAction } = useCheckoutFormContext();
  const { setErrorMessage } = useAppContext();
  const onSubmit = useOnSubmit();

  const isSelected = method.code === selected.code;
  const validateBic = (value) => {
    let error;

    if (value === undefined || value.length === 0) {
      error = __('Bic is required');
    }
    return error;
  };

  const placeOrderWithGiropay = useCallback(
    async (values) => {
      const error = validateBic(_get(values, bicField));

      if (error !== undefined) {
        setErrorMessage(error);
        return;
      }
      await onSubmit(values);
    },
    [onSubmit, setErrorMessage]
  );

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithGiropay);
  }, [method, registerPaymentAction, placeOrderWithGiropay]);

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

  return (
    <div>
      {invoiceRadioInput}
      <div className="mx-4 my-4">
        <Card bg="darker">
          <div className="container flex flex-col justify-center w-4/5">
            <TextInput
              label={__('BIC:')}
              name={bicField}
              required
              formikData={formikData}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

Giropay.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default Giropay;
