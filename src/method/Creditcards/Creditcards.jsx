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
import { getConfigCreditcards } from '../../../config';
import useOnSubmit from './hooks/useOnSubmit';
import creditcardsLogo from '../../../assets/creditcards.svg';
import BuckarooClientSideEncryption from '../../../assets/lib/ClientSideEncryption001';
import TextInput from './TextInput';

const PAYMENT_METHOD_CODE = 'buckaroo_magento2_creditcards';

function Creditcards({ method, actions }) {
  const { registerPaymentAction } = useCheckoutFormContext();

  const { formikData } = usePaymentMethodFormContext();
  const { appDispatch } = useAppContext();
  const { cart } = useCartContext();
  const { cartShippingAddress: address } = useShippingAddressCartContext();
  const { setPageLoader } = useCheckoutFormAppContext();

  const { paymentValues } = formikData;
  const { change } = actions;

  const creditCardsConfig = getConfigCreditcards(null);

  function getIssuers() {
    return creditCardsConfig.creditcards
      .filter((i) => i.active)
      .sort((a, b) => a.sort - b.sort);
  }

  // Formdata:
  const [issuer, setIssuer] = useState(null);
  const [cardholder, setCardholder] = useState('');
  const [cardnumber, setCardnumber] = useState('');
  const [cardmonth, setCardmonth] = useState('');
  const [cardyear, setCardyear] = useState('');
  const [securitycode, setSecuritycode] = useState('');
  const [validateErrors, setValidateErrors] = useState({});

  useEffect(() => {
    const cards = getIssuers();
    if (!cards || !cards.length) {
      return;
    }
    setIssuer(cards[0].code);
  }, [creditCardsConfig]);

  useEffect(() => {
    const { paymentSubmitHandler } = useOnSubmit();

    registerPaymentAction(PAYMENT_METHOD_CODE, (e) => {
      setPageLoader(true);
      paymentSubmitHandler(e, appDispatch, {
        issuer,
        cardholder,
        cardnumber,
        cardmonth,
        cardyear,
        securitycode,
      });
      setPageLoader(false);
    });
  }, [
    registerPaymentAction,
    issuer,
    cardholder,
    cardnumber,
    cardmonth,
    cardyear,
    securitycode,
  ]);

  const onChange = async (e) => {
    let selectedIssuer = null;
    if (typeof e === 'string') {
      selectedIssuer = e;
    } else {
      change(e);
    }

    const customerEmail = _get(cart, 'email', '');

    SetPaymentMethod(
      appDispatch,
      method.code,
      selectedIssuer,
      address,
      customerEmail
    );
  };

  const validate = async (e, submit = false, forceIssuer) => {
    const err = {};

    if (!BuckarooClientSideEncryption.V001.validateCardholderName(cardholder)) {
      if (submit || cardholder !== '') {
        err.cardholder = __('Please enter a valid cardholder name');
      }
    }

    if (
      !BuckarooClientSideEncryption.V001.validateCardNumber(
        cardnumber,
        forceIssuer || issuer
      )
    ) {
      if (submit || cardnumber !== '') {
        err.cardnumber = __('Please enter a valid card number');
      }
    }

    if (!BuckarooClientSideEncryption.V001.validateMonth(cardmonth)) {
      if (submit || cardmonth !== '') {
        err.cardmonth = __('Please enter a valid month');
      }
    }

    if (!BuckarooClientSideEncryption.V001.validateYear(cardyear)) {
      if (submit || cardyear !== '') {
        err.cardyear = __('Please enter a valid year');
      }
    }

    if (
      !BuckarooClientSideEncryption.V001.validateCvc(
        securitycode,
        forceIssuer || issuer
      )
    ) {
      if (submit || securitycode !== '') {
        err.securitycode = __('Please enter a valid security code');
      }
    }

    setValidateErrors(err);
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
          <div className="description">{__('Pay with your card')}</div>
        </div>

        <img src={creditcardsLogo} alt="Creditcards Logo" />
      </div>
      {method.code === paymentValues.code && (
        <div className="content">
          <div className="form-control">
            <div className="field my-2">
              <label className="label" htmlFor="issuer">
                {__('Issuer')}
              </label>
              <select
                className="form-input w-full"
                name="issuer"
                id="issuer"
                value={issuer}
                onChange={(e) => {
                  setIssuer(e.target.value);
                  validate(e, false, e.target.value);
                }}
              >
                {getIssuers().map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <TextInput
              name="cardholder"
              type="text"
              label={__('Cardholder')}
              value={cardholder}
              onChange={(e) => setCardholder(e.target.value)}
              onBlur={validate}
              error={validateErrors.cardholder}
            />
            <TextInput
              name="cardnumber"
              type="number"
              label={__('Cardnumber')}
              value={cardnumber}
              onChange={(e) => setCardnumber(e.target.value)}
              onBlur={validate}
              error={validateErrors.cardnumber}
            />
            <div className="date flex gap-4 w-full">
              <TextInput
                className="w-full"
                name="month"
                type="number"
                label={__('Month')}
                value={cardmonth}
                onChange={(e) => setCardmonth(e.target.value)}
                onBlur={validate}
                error={validateErrors.cardmonth}
              />
              <TextInput
                className="w-full"
                name="year"
                type="number"
                label={__('Year')}
                value={cardyear}
                onChange={(e) => setCardyear(e.target.value)}
                onBlur={validate}
                error={validateErrors.cardyear}
              />
            </div>
            <TextInput
              className="w-full"
              name="securitycode"
              type="number"
              label={__('Securitycode')}
              value={securitycode}
              onChange={(e) => setSecuritycode(e.target.value)}
              onBlur={validate}
              error={validateErrors.securitycode}
            />

            <PlaceOrder />
          </div>
        </div>
      )}
    </>
  );
}

export default Creditcards;

Creditcards.propTypes = {
  method: object.isRequired,
  actions: object.isRequired,
};
