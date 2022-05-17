import React, { useEffect, useCallback } from 'react';
import { object } from 'prop-types';
import _set from 'lodash.set';

import { useFormik } from 'formik';

import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import { scrollToElement } from '@hyva/react-checkout/utils/form';
import PlaceOrder from '@hyva/react-checkout/components/placeOrder';
import { __ } from '@hyva/react-checkout/i18n';

import useOnSubmit from '../../lib/hooks/useOnSubmit';
import logo from '../../../assets/Creditcards.svg';
import { getConfig } from '../../../config';
import encryptCardData from '../../lib/helpers/EncryptCardData';
import { ADDITIONAL_DATA_KEY } from '../../lib/helpers/AdditionalBuckarooDataKey';
import { validationSchema } from './Validators';
import TextInput from '../../lib/helpers/components/TextInput';
import SelectInput from '../../lib/helpers/components/SelectInput';
import determineIssuer from './helpers/DetermineIssuer';

function Creditcards({ method, selected, actions }) {
  const isSelected = method.code === selected.code;

  const invoiceRadioInput = (
    <div className="title flex">
      <RadioInput
        value={method.code}
        name="paymentMethod"
        checked={isSelected}
        onChange={actions.change}
      />
      <div className="text">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor={`paymentMethod_${method.code}`}>{method.title}</label>
        <div className="description">{__('Pay with your card')}</div>
      </div>

      <img height="24px" width="24px" src={logo} alt="Creditcards Logo" />
    </div>
  );

  if (!isSelected) {
    return invoiceRadioInput;
  }

  const { registerPaymentAction } = useCheckoutFormContext();
  const { setErrorMessage } = useAppContext();
  const onSubmit = useOnSubmit();

  const creditCardsConfig = getConfig('creditcards');

  const getFirstCard = () => {
    const cards = creditCardsConfig.creditcards;
    if (!cards || !cards.length) {
      return '';
    }
    return cards[0].code;
  };

  const yearStart = new Date().getFullYear();

  const range = (size, startAt = 0) =>
    [...Array(size).keys()].map((i) => i + startAt);

  const formik = useFormik({
    initialValues: {
      cardholder: '',
      cardnumber: '',
      expirationmonth: '',
      expirationyear: '',
      cvc: '',
      issuer: getFirstCard(),
    },
    validationSchema,
  });

  const {
    validateForm,
    submitForm,
    values: formikValues,
    touched,
    setFieldValue,
  } = formik;

  useEffect(() => {
    const issuer = determineIssuer(formikValues.cardnumber);
    if (issuer) {
      setFieldValue('issuer', issuer);
    }
  }, [formikValues.cardnumber, touched.cardnumber, setFieldValue]);

  const placeOrderWithCreditcards = useCallback(
    async (values) => {
      const errors = await validateForm();
      submitForm();
      if (Object.keys(errors).length) {
        setErrorMessage(__('One or more fields are required'));
        scrollToElement(selected.code);
        return;
      }
      const encryptedCardData = await encryptCardData(formikValues);
      _set(values, ADDITIONAL_DATA_KEY, {
        customer_encrypteddata: encryptedCardData,
        customer_creditcardcompany: formikValues.issuer,
      });
      await onSubmit(values);
    },
    [onSubmit, setErrorMessage, formikValues]
  );

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithCreditcards);
  }, [method, registerPaymentAction, placeOrderWithCreditcards]);

  const mapIssuer = (issuer) => ({
    name: issuer.name,
    value: issuer.code,
  });
  const formatedIssuers = creditCardsConfig.creditcards.map(mapIssuer);

  return (
    <div id={selected.code}>
      {invoiceRadioInput}
      <div className="content py-2 px-10">
        <div className="form-control">
          <SelectInput
            className="w-full"
            name="issuer"
            label={__('Issuer')}
            formik={formik}
            options={formatedIssuers}
          />
          <TextInput
            className="w-full"
            name="cardholder"
            type="text"
            label={__('Cardholder')}
            formik={formik}
          />
          <TextInput
            className="w-full"
            name="cardnumber"
            type="text"
            label={__('Cardnumber')}
            formik={formik}
          />
          <div className="field my-2 flex">
            <SelectInput
              className="w-6/12 mr-1"
              name="expirationmonth"
              label={__('Month')}
              formik={formik}
              prependOption={<option>{__('Select month')}</option>}
              options={range(12, 1)}
            />

            <SelectInput
              className="w-6/12 ml-1"
              name="expirationyear"
              label={__('Year')}
              formik={formik}
              prependOption={<option>{__('Select year')}</option>}
              options={range(10, yearStart)}
            />
          </div>
          <TextInput
            className="w-full"
            name="cvc"
            type="number"
            label={__('Securitycode')}
            formik={formik}
          />
          <p>{__("You'll be redirected to finish the payment.")}</p>

          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}

export default Creditcards;

Creditcards.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
