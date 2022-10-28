import React, { useEffect, useCallback } from 'react';
import { object } from 'prop-types';
import { get as _get, set as _set } from 'lodash-es';

import { __ } from '@hyva/react-checkout/i18n';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';

import SelectInput from '../../../../../components/common/Form/SelectInput';
import logo from '../../../assets/Ideal.svg';
import useOnSubmit from '../../lib/hooks/useOnSubmit';
import { useBuckarooIdealFormContext } from './hooks';
import { getIssuerField, issuerList, prepareValidationSchema } from './utility';
import { ADDITIONAL_DATA_KEY } from '../../lib/helpers/AdditionalBuckarooDataKey';

function IDeal({ method, selected, actions }) {
  const onSubmit = useOnSubmit();
  const { registerPaymentAction } = useCheckoutFormContext();
  const { setFieldValue, updateValidationSchema, formikData } =
    useBuckarooIdealFormContext();
  const idealMethodCode = method.code;
  const isSelected = idealMethodCode === selected.code;
  const issuerField = getIssuerField(idealMethodCode);

  const palaceOrderWithIdeal = useCallback(
    async (values) => {
      const issuer = _get(values, issuerField);
      _set(values, ADDITIONAL_DATA_KEY, {
        issuer,
      });
      return onSubmit(values);
    },
    [issuerField, onSubmit]
  );

  // Initializing ideal related fields; Also inject validation related to ideal.
  useEffect(() => {
    if (isSelected) {
      setFieldValue(issuerField, '');
      updateValidationSchema(prepareValidationSchema(idealMethodCode));
    }
  }, [
    isSelected,
    issuerField,
    setFieldValue,
    idealMethodCode,
    updateValidationSchema,
  ]);

  useEffect(() => {
    registerPaymentAction(method.code, palaceOrderWithIdeal);
  }, [method, registerPaymentAction, palaceOrderWithIdeal]);

  return (
    <>
      <div className="flex title">
        <RadioInput
          value={method.code}
          name="paymentMethod"
          checked={isSelected}
          onChange={actions.change}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          className="w-full cursor-pointer text"
          htmlFor={`paymentMethod_${method.code}`}
        >
          <strong>{method.title}</strong>
          <div className="cta">{__('Most often chosen')}</div>
          <div className="description">{__('Pay with online banking')}</div>
        </label>

        <img height="24" width="24" src={logo} alt="Ideal Logo" />
      </div>
      {isSelected && (
        <div className="py-2 pl-6 content">
          <SelectInput
            name={issuerField}
            label={__('Bank')}
            options={issuerList}
            formikData={formikData}
            defaultOptionLabel={__('Select a bank')}
          />
          <p className="mt-2">
            {__("You'll be redirected to finish the payment.")}
          </p>
        </div>
      )}
    </>
  );
}

export default IDeal;

IDeal.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
