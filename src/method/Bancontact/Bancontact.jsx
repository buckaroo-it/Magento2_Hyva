import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';

import { useFormik } from 'formik';

import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import { __ } from '@hyva/react-checkout/i18n';

import PaymentMethodRadio from '../../lib/helpers/components/PaymentMethodRadio';
import CreditcardForm from './CreditcardForm';
import { validationSchema, useClientSide } from './helpers';
import usePlaceOrder from './usePlaceOrder';

function Bancontact({ method, selected, actions }) {
  const isSelected = method.code === selected.code;
  const { registerPaymentAction } = useCheckoutFormContext();
  const [clientSideMode, setClientSideMode] = useState('cc');

  const formik = useFormik({
    initialValues: {
      cardholder: '',
      cardnumber: '',
      expirationmonth: '',
      expirationyear: '',
    },
    validationSchema,
  });

  const placeOrder = usePlaceOrder(selected.code, formik, clientSideMode);

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
      {isSelected && useClientSide && (
        <div className="p-2">
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
          {clientSideMode === 'cc' && <CreditcardForm formik={formik} />}
        </div>
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
