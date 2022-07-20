import React, { useCallback, useEffect } from 'react';
import { func, shape, object } from 'prop-types';
import { set as _set } from 'lodash-es';
import { useFormik } from 'formik';
import { object as YupObject, string as YupString } from 'yup';

import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import { __ } from '@hyva/react-checkout/i18n';
import { scrollToElement } from '@hyva/react-checkout/utils/form';
import PlaceOrder from '@hyva/react-checkout/components/placeOrder';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import useAppContext from '@hyva/react-checkout/hook/useAppContext';

import useOnSubmit from '../../lib/hooks/useOnSubmit';
import { ADDITIONAL_DATA_KEY } from '../../lib/helpers/AdditionalBuckarooDataKey';
import logo from '../../../assets/Creditcards.svg';
import SelectInput from '../../lib/helpers/components/SelectInput';
import RadioGroup from '../../lib/helpers/components/RadioGroup';
import { getConfig } from '../../../config';

function Creditcard({ method, selected, actions }) {
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

  const { registerPaymentAction } = useCheckoutFormContext();
  const { setErrorMessage } = useAppContext();
  const onSubmit = useOnSubmit();

  const requiredMessage = __('This is a required field.');
  const { selectionType, cards } = getConfig('creditcard');

  const formattedCards = cards.map((card) => ({
    name: card.name,
    value: card.code,
  }));
  const validationSchema = YupObject({
    cardType: YupString().required(requiredMessage),
  });

  const formik = useFormik({
    initialValues: {
      cardType: '',
    },
    validationSchema,
  });

  const {
    validateForm,
    submitForm,
    values: { cardType },
  } = formik;

  console.warn(cardType);
  const placeOrderWithCreditcard = useCallback(
    async (values) => {
      const errors = await validateForm();
      submitForm();
      if (Object.keys(errors).length) {
        setErrorMessage(__('One or more fields are required'));
        scrollToElement(selected.code);
        return;
      }

      _set(values, ADDITIONAL_DATA_KEY, {
        card_type: cardType,
      });

      await onSubmit(values);
    },
    [onSubmit, setErrorMessage, cardType]
  );

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithCreditcard);
  }, [method, registerPaymentAction, placeOrderWithCreditcard]);

  if (!isSelected) {
    return invoiceRadioInput;
  }

  return (
    <div id={selected.code}>
      {invoiceRadioInput}

      {selectionType === '2' ? (
        <SelectInput
          name="cardType"
          label={__('Bank')}
          formik={formik}
          options={formattedCards}
          prependOption={
            <option disabled value="">
              {__('Select a bank')}
            </option>
          }
        />
      ) : null}

      {selectionType === '1' ? (
        <RadioGroup
          name="cardType"
          className="ml-5"
          formik={formik}
          options={formattedCards}
        />
      ) : null}
      <PlaceOrder />
    </div>
  );
}

Creditcard.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default Creditcard;
