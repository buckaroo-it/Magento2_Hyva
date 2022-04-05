import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import _get from 'lodash.get';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import usePaymentMethodFormContext from '@hyva/react-checkout/components/paymentMethod/hooks/usePaymentMethodFormContext';
import PlaceOrder from '@hyva/react-checkout/components/placeOrder';
import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import useCartContext from '@hyva/react-checkout/hook/useCartContext';
import useShippingAddressCartContext from '@hyva/react-checkout/components/shippingAddress/hooks/useShippingAddressCartContext';
import useCheckoutFormAppContext from '@hyva/react-checkout/components/CheckoutForm/hooks/useCheckoutFormAppContext';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import { __ } from '@hyva/react-checkout/i18n';
import { SetPaymentMethod } from '../../lib/PaymentMethod';
import useOnSubmit from './hooks/useOnSubmit';
import paypalLogo from '../../../assets/paypal.svg';

const PAYMENT_METHOD_CODE = 'buckaroo_magento2_paypal';

function PayPal({ method, actions }) {
  const { registerPaymentAction } = useCheckoutFormContext();

  const { formikData } = usePaymentMethodFormContext();
  const { appDispatch } = useAppContext();
  const { cart } = useCartContext();
  const { cartShippingAddress: address } = useShippingAddressCartContext();
  const { setPageLoader } = useCheckoutFormAppContext();

  const { paymentValues } = formikData;
  const { change } = actions;

  const [selectedIssuer, setSelectedIssuer] = useState(null);

  useEffect(() => {
    const { paymentSubmitHandler } = useOnSubmit();

    registerPaymentAction(PAYMENT_METHOD_CODE, async (e) => {
      setPageLoader(true);
      await paymentSubmitHandler(e, appDispatch, selectedIssuer);
      setPageLoader(false);
    });
  }, [registerPaymentAction, selectedIssuer]);

  const onChange = async (e) => {
    let issuer = null;
    if (typeof e === 'string') {
      issuer = e;
      setSelectedIssuer(e);
    } else {
      change(e);
    }

    const customerEmail = _get(cart, 'email', '');

    SetPaymentMethod(
      appDispatch,
      method.code,
      issuer || selectedIssuer,
      address,
      customerEmail
    );
  };

  return (
    <>
      <div className="title flex justify-between">
        <RadioInput
          value={method.code}
          label={method.title}
          name="paymentMethod"
          onChange={onChange}
          checked={method.code === paymentValues.code}
        />

        <img src={paypalLogo} alt="PayPal Logo" />
      </div>
      <div className="content">
        {method.code === paymentValues.code && (
          <>
            <p>{__("You'll be redirected to finish the payment.")}</p>

            <PlaceOrder />
          </>
        )}
      </div>
    </>
  );
}

export default PayPal;

PayPal.propTypes = {
  method: object.isRequired,
  actions: object.isRequired,
};
