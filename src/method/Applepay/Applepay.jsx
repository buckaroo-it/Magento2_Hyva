import React, { useCallback, useEffect, useState } from 'react';
import { func, shape, object } from 'prop-types';

import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import { __ } from '@hyva/react-checkout/i18n';
import { scrollToElement } from '@hyva/react-checkout/utils/form';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import useCartContext from '@hyva/react-checkout/hook/useCartContext';

import logo from '../../../assets/Applepay.svg';
import { getConfig } from '../../../config';
import ApplePay from '../../../assets/lib/BuckarooApplepay';
import getTotals from './helpers/getTotals';
import getLineItems from './helpers/getLineItems';
import useCaptureFunds from './helpers/captureFunds';

function Applepay({ method, selected, actions }) {
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

  const [canPay, setCanPay] = useState(false);

  const { cart } = useCartContext();
  const config = getConfig('applepay');
  const captureFunds = useCaptureFunds();

  useEffect(() => {
    const canPayFunction = async () => {
      setCanPay(await ApplePay.checkPaySupport(config.guid));
    };
    canPayFunction();
  }, []);

  useEffect(() => {
    if (canPay) {
      const options = new ApplePay.PayOptions(
        config.storeName,
        config.country,
        config.currency,
        config.cultureCode,
        config.guid,
        getLineItems(cart),
        getTotals(cart),
        'shipping',
        [],
        (payment) => captureFunds(payment),
        null,
        null,
        ['email', 'postalAddress'],
        ['email']
      );
      ApplePay.PayPayment(options);
    }
  }, [canPay, config, cart]);
  const { registerPaymentAction } = useCheckoutFormContext();
  const { setErrorMessage } = useAppContext();

  const placeOrderWithApplepay = useCallback(() => {
    setErrorMessage(__('Please use the apple pay button for payment'));
    scrollToElement(selected.code);
    return {};
  }, [setErrorMessage]);

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithApplepay);
  }, [method, registerPaymentAction, placeOrderWithApplepay]);

  return canPay ? (
    <div id={selected.code}>
      {invoiceRadioInput}

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
    </div>
  ) : null;
}

Applepay.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default Applepay;
