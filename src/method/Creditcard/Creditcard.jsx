import React, { useEffect } from 'react';
import { func, shape, object } from 'prop-types';
import { useFormik } from 'formik';

import { __ } from '@hyva/react-checkout/i18n';
import PlaceOrder from '@hyva/react-checkout/components/placeOrder';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';

import PaymentMethodRadio from '../../lib/helpers/components/PaymentMethodRadio';
import SelectInput from '../../lib/helpers/components/SelectInput';
import RadioGroup from '../../lib/helpers/components/RadioGroup';
import { selectionType, getCards, validationSchema } from './helpers';
import usePlaceOrder from './usePlaceOrder';

function Creditcard({ method, selected, actions }) {
  const isSelected = method.code === selected.code;
  const { registerPaymentAction } = useCheckoutFormContext();
  const formattedCards = getCards();

  const formik = useFormik({
    initialValues: {
      cardType: '',
    },
    validationSchema,
  });

  const placeOrder = usePlaceOrder(selected.code, formik);

  useEffect(() => {
    registerPaymentAction(method.code, placeOrder);
  }, [method, registerPaymentAction, placeOrder]);

  return (
    <div id={selected.code}>
      <PaymentMethodRadio
        method={method}
        isSelected={isSelected}
        onChange={actions.change}
      />
      {isSelected && (
        <>
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
        </>
      )}
    </div>
  );
}

Creditcard.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default Creditcard;
