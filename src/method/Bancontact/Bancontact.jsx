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
import idealLogo from '../../../assets/ideal.svg';
import TextInput from '../Creditcards/TextInput';
import BuckarooClientSideEncryption from '../../../assets/lib/ClientSideEncryption001';

const PAYMENT_METHOD_CODE = 'buckaroo_magento2_mrcash';

function Bancontact({ method, actions }) {
  const { registerPaymentAction } = useCheckoutFormContext();

  const { formikData } = usePaymentMethodFormContext();
  const { appDispatch } = useAppContext();
  const { cart } = useCartContext();
  const { cartShippingAddress: address } = useShippingAddressCartContext();
  const { setPageLoader } = useCheckoutFormAppContext();

  const { paymentValues } = formikData;
  const { change } = actions;

  const yearStart = new Date().getFullYear();

  const [cardholder, setCardholder] = useState('');
  const [cardnumber, setCardnumber] = useState('');
  const [expirationmonth, setExpirationmonth] = useState('1');
  const [expirationyear, setExpirationyear] = useState(+yearStart);
  const [validationErrors, setvalidationErrors] = useState({});
  const [encryptCardData, setEncryptCardData] = useState('');

  const isValidData = () => {
    const err = {};

    if (!BuckarooClientSideEncryption.V001.validateCardholderName(cardholder)) {
      err.cardholder = __('Please enter a valid cardholder name');
    }

    if (!BuckarooClientSideEncryption.V001.validateCardNumber(cardnumber)) {
      err.cardnumber = __('Please enter a valid card number');
    }

    if (!BuckarooClientSideEncryption.V001.validateMonth(expirationmonth)) {
      err.expirationmonth = __('Please enter a valid month');
    }

    if (!BuckarooClientSideEncryption.V001.validateYear(expirationyear)) {
      err.cardyear = __('Please enter a valid year');
    }

    setvalidationErrors(err);
    return Object.keys(err).length === 0;
  };

  const encrypt = async () =>
    new Promise((resolve) => {
      if (isValidData()) {
        /* eslint no-console: ["error", { allow: ["log"] }] */
        console.log({
          cardnumber,
          expirationyear,
          expirationmonth,
          cardholder,
        });

        BuckarooClientSideEncryption.V001.encryptCardData(
          cardnumber,
          expirationyear,
          expirationmonth,
          '',
          cardholder,
          (encryptedCardData) => {
            setEncryptCardData(encryptedCardData);
            resolve(encryptedCardData);
          }
        );
      }
    });
  useEffect(() => {
    const customerEmail = _get(cart, 'email', '');
    SetPaymentMethod(
      appDispatch,
      method.code,
      {
        client_side_mode: 'cc',
        encryptCardData,
      },
      address,
      customerEmail
    );
  }, [encryptCardData]);

  useEffect(async () => {
    if (method.code === paymentValues.code) {
      await encrypt();
    }
  }, [cardholder, cardnumber, expirationmonth, expirationyear]);

  useEffect(async () => {
    const { paymentSubmitHandler } = useOnSubmit();

    registerPaymentAction(PAYMENT_METHOD_CODE, async (e) => {
      setPageLoader(true);
      await paymentSubmitHandler(e, appDispatch, {
        client_side_mode: 'cc',
        encryptCardData,
      });
      setPageLoader(false);
    });
  }, [registerPaymentAction]);

  const range = (size, startAt = 0) =>
    [...Array(size).keys()].map((i) => i + startAt);

  return (
    <>
      <div className="title flex justify-between">
        <RadioInput
          value={method.code}
          label={method.title}
          name="paymentMethod"
          onChange={change}
          checked={method.code === paymentValues.code}
        />

        <img src={idealLogo} className="w-12" alt="Ideal Logo" />
      </div>
      <div className="content py-2 px-10">
        {method.code === paymentValues.code && (
          <>
            <TextInput
              className="w-full"
              name="cardholdername"
              type="text"
              label={__('CARDHOLDER:')}
              value={cardholder}
              onChange={(e) => setCardholder(e.target.value)}
              onBlur={() => {}}
              error={validationErrors.cardholder}
            />
            <TextInput
              className="w-full"
              name="cardnumber"
              type="text"
              label={__('CARD NUMBER:')}
              value={cardnumber}
              onChange={(e) => setCardnumber(e.target.value)}
              onBlur={() => {}}
              error={validationErrors.cardnumber}
            />

            <div className="field my-2">
              <div>
                <label className="label" htmlFor="month">
                  {__('MONTH:')}
                </label>
              </div>
              <select
                className="form-input w-full"
                type="text"
                name="month"
                id="month"
                value={expirationmonth}
                onChange={(e) => {
                  setExpirationmonth(e.target.value);
                }}
              >
                {range(12, 1).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <div>
                <label className="label" htmlFor="year">
                  {__('YEAR:')}
                </label>
              </div>
              <select
                className="form-input w-full"
                type="text"
                name="year"
                id="year"
                value={expirationyear}
                onChange={(e) => {
                  setExpirationyear(e.target.value);
                }}
              >
                {range(10, yearStart).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <p>{__("You'll be redirected to finish the payment.")}</p>

            <PlaceOrder />
          </>
        )}
      </div>
    </>
  );
}

export default Bancontact;

Bancontact.propTypes = {
  method: object.isRequired,
  actions: object.isRequired,
};
