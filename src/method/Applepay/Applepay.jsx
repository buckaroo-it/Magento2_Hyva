import React, { useEffect, useState } from 'react';
import { func, shape, object } from 'prop-types';

import { __ } from '@hyva/react-checkout/i18n';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';

import PaymentMethodRadio from '../../lib/helpers/components/PaymentMethodRadio';

import ApplePay from '../../../assets/lib/BuckarooApplepay';
import { useGetPayOptions, config } from './helpers';
import usePlaceOrder from './usePlaceOrder';

function Applepay({ method, selected, actions }) {
  const isSelected = method.code === selected.code;

  const [canPay, setCanPay] = useState(false);
  const { registerPaymentAction } = useCheckoutFormContext();
  const placeOrder = usePlaceOrder(selected.code);
  const getPayOptions = useGetPayOptions();

  useEffect(() => {
    const canPayFunction = async () => {
      setCanPay(await ApplePay.checkPaySupport(config?.guid));
    };
    canPayFunction();
  }, []);

  useEffect(() => {
    if (canPay && isSelected) {
      ApplePay.PayPayment(getPayOptions());
    }
  }, [canPay, isSelected, getPayOptions]);

  useEffect(() => {
    registerPaymentAction(method.code, placeOrder);
  }, [method, registerPaymentAction, placeOrder]);

  return canPay ? (
    <div id={selected.code}>
      <PaymentMethodRadio
        method={method}
        isSelected={isSelected}
        onChange={actions.change}
      />

      {isSelected && (
        <button
          type="button"
          onClick={(e) => {
            ApplePay.beginPayment(e);
          }}
          lang={config.cultureCode}
          className={`pay-with-apple ${ApplePay.getButtonClass(
            config.buttonStyle,
            'buy'
          )}`}
          aria-label={__('Place order')}
          title={__('Place order')}
        />
      )}
    </div>
  ) : null;
}

Applepay.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default Applepay;
