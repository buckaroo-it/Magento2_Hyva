import React, { useState, useEffect, useCallback } from 'react';
import { object } from 'prop-types';
import _set from 'lodash.set';

import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import Card from '@hyva/react-checkout/components/common/Card';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import { scrollToElement } from '@hyva/react-checkout/utils/form';
import { PAYMENT_METHOD_FORM } from '@hyva/react-checkout/config';
import { __ } from '@hyva/react-checkout/i18n';

import useOnSubmit from '../Giropay/hooks/useOnSubmit';
import idealLogo from '../../../assets/ideal.svg';
import TextInput from '../Creditcards/TextInput';
import BuckarooClientSideEncryption from '../../../assets/lib/ClientSideEncryption001';
import { getConfig } from '../../../config';

const bancontactData = `${PAYMENT_METHOD_FORM}.additional_data`;
function Bancontact({ method, selected, actions }) {
  const { registerPaymentAction } = useCheckoutFormContext();
  const { setErrorMessage } = useAppContext();
  const onSubmit = useOnSubmit();

  const useClientSide = getConfig('mrcash.useClientSide');
  const isSelected = method.code === selected.code;

  const yearStart = new Date().getFullYear();

  const [cardholder, setCardholder] = useState('');
  const [cardnumber, setCardnumber] = useState('');
  const [expirationmonth, setExpirationmonth] = useState('');
  const [expirationyear, setExpirationyear] = useState('');
  const [validationErrors, setvalidationErrors] = useState({});
  const [clientSideMode, setClientSideMode] = useState('cc');
  const [formValid, setFormValid] = useState(false);

  const isValidData = () => {
    const err = {};

    console.log({
      cardnumber,
      expirationyear,
      expirationmonth,
      cardholder,
    });
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
      err.expirationyear = __('Please enter a valid year');
    }

    setvalidationErrors(err);

    setFormValid(Object.keys(err).length === 0);
  };

  const encrypt = async () =>
    new Promise((resolve) => {
      if (formValid) {
        /* eslint no-console: ["error", { allow: ["log"] }] */

        BuckarooClientSideEncryption.V001.encryptCardData(
          cardnumber,
          expirationyear,
          expirationmonth,
          '',
          cardholder,
          (encryptedCardData) => {
            resolve(encryptedCardData);
          }
        );
      }
    });
  const placeOrderWithBancontact = useCallback(
    async (values) => {
      let encryptCardData;
      console.log(clientSideMode, formValid);
      if (clientSideMode === 'cc') {
        if (!formValid) {
          setErrorMessage(__('One or more fields are required'));
          scrollToElement(selected.code);
          return;
        }
        encryptCardData = await encrypt();
      }

      _set(values, bancontactData, {
        client_side_mode: clientSideMode,
        customer_encrypteddata: encryptCardData,
      });
      console.log(values);
      await onSubmit(values);
    },
    [onSubmit, setErrorMessage, clientSideMode, formValid]
  );

  useEffect(() => {
    isValidData();
  }, [cardnumber, expirationyear, expirationmonth, cardholder, clientSideMode]);
  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithBancontact);
  }, [method, registerPaymentAction, placeOrderWithBancontact]);

  const range = (size, startAt = 0) =>
    [...Array(size).keys()].map((i) => i + startAt);

  const invoiceRadioInput = (
    <div className="title flex justify-between">
      <RadioInput
        value={method.code}
        label={method.title}
        name="paymentMethod"
        checked={isSelected}
        onChange={actions.change}
      />
      <img src={idealLogo} className="w-12" alt="Ideal Logo" />
    </div>
  );

  if (!isSelected) {
    return invoiceRadioInput;
  }

  return (
    <div>
      {invoiceRadioInput}
      {useClientSide && (
        <Card bg="darker">
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
          {clientSideMode === 'cc' && (
            <div id={selected.code}>
              <div className="content py-2 px-2">
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

                <div className="field my-2 md:flex">
                  <div className="w-6/12 sm:w-full mr-1">
                    <label className="label" htmlFor="month">
                      {__('MONTH:')}
                    </label>
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
                      <option>{__('Select month')}</option>
                      {range(12, 1).map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {validationErrors.expirationmonth && (
                      <div className="text-red-500 text-xs italic">
                        {validationErrors.expirationmonth}
                      </div>
                    )}
                  </div>

                  <div className="w-6/12 sm:w-full ml-1">
                    <label className="label" htmlFor="year">
                      {__('YEAR:')}
                    </label>
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
                      <option>{__('Select year')}</option>
                      {range(10, yearStart).map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {validationErrors.expirationyear && (
                      <div className="text-red-500 text-xs italic">
                        {validationErrors.expirationyear}
                      </div>
                    )}
                  </div>
                </div>

                <p>{__("You'll be redirected to finish the payment.")}</p>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

export default Bancontact;

Bancontact.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
