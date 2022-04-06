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
import { getConfigIdeal } from '../../../config';
import useOnSubmit from './hooks/useOnSubmit';
import idealLogo from '../../../assets/ideal.svg';

const PAYMENT_METHOD_CODE = 'buckaroo_magento2_ideal';

function IDeal({ method, actions }) {
  const { registerPaymentAction } = useCheckoutFormContext();

  const { formikData } = usePaymentMethodFormContext();
  const { appDispatch } = useAppContext();
  const { cart } = useCartContext();
  const { cartShippingAddress: address } = useShippingAddressCartContext();
  const { setPageLoader } = useCheckoutFormAppContext();

  const { paymentValues } = formikData;
  const { change } = actions;

  const idealConfig = getConfigIdeal();
  const paymentMethods = idealConfig.banks;
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

    const paymentIssuer = issuer || selectedIssuer;

    SetPaymentMethod(
      appDispatch,
      method.code,
      paymentIssuer
        ? { issuer: paymentIssuer }
        : { buckaroo_skip_validation: 'true' },
      address,
      customerEmail
    );
  };

  return (
    <>
      <div className="title flex">
        <RadioInput
          value={method.code}
          name="paymentMethod"
          onChange={onChange}
          checked={method.code === paymentValues.code}
        />
        <div className="text">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor={`paymentMethod_${method.code}`}>{method.title}</label>
          <div className="cta">{__('Most often chosen')}</div>
          <div className="description">{__('Pay with online banking')}</div>
        </div>

        <img src={idealLogo} alt="Ideal Logo" />
      </div>
      <div className="content pt-4">
        {method.code === paymentValues.code && (
          <>
            <select
              onChange={(e) => {
                onChange(e.target.value);
              }}
              className="form-select"
              name="issuer"
            >
              <option disabled value="">
                {__('Choose issuer')}
              </option>
              {paymentMethods.map((issuer) => (
                <option value={issuer.code} key={issuer.code}>
                  {issuer.name}
                </option>
              ))}
            </select>
            <small>{__("You'll be redirected to finish the payment.")}</small>

            <PlaceOrder />
          </>
        )}
      </div>
    </>
  );
}

export default IDeal;

IDeal.propTypes = {
  method: object.isRequired,
  actions: object.isRequired,
};
