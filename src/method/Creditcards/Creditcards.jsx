import React, { useEffect } from 'react';
import { object } from 'prop-types';

import { useFormik } from 'formik';

import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import { __ } from '@hyva/react-checkout/i18n';

import PaymentMethodRadio from '../../lib/helpers/components/PaymentMethodRadio';
import { validationSchema } from './helpers/validators';
import TextInput from '../../lib/helpers/components/TextInput';
import SelectInput from '../../lib/helpers/components/SelectInput';
import {
  determineIssuer,
  yearStart,
  range,
  getFirstCard,
  getIssuers,
} from './helpers';
import usePlaceOrder from './usePlaceOrder';

function Creditcards({ method, selected, actions }) {
  const isSelected = method.code === selected.code;
  const { registerPaymentAction } = useCheckoutFormContext();
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

  const { values: formikValues, touched, setFieldValue } = formik;

  useEffect(() => {
    if (isSelected && touched.cardnumber) {
      const issuer = determineIssuer(formikValues.cardnumber);
      if (issuer) {
        setFieldValue('issuer', issuer);
      }
    }
  }, [formikValues.cardnumber, touched.cardnumber, setFieldValue, isSelected]);

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
        <div className="content py-2 pl-6">
          <div className="form-control">
            <SelectInput
              className="w-full"
              name="issuer"
              label={__('Issuer')}
              formik={formik}
              options={getIssuers()}
            />
            <TextInput
              className="w-full"
              name="cardholder"
              type="text"
              label={__('Cardholder')}
              formik={formik}
            />
            <div className="form-control w-1/2 inline-block pr-1">
              <TextInput
                className="w-full"
                name="cardnumber"
                type="text"
                label={__('Cardnumber')}
                formik={formik}
              />
            </div>
            <div className="form-control w-1/2 inline-block pl-1">
              <TextInput
                className="w-full"
                name="cvc"
                type="number"
                label={__('Securitycode')}
                formik={formik}
              />
            </div>
            <div className="form-control w-1/2 inline-block pr-1">
              <SelectInput
                name="expirationmonth"
                label={__('Month')}
                formik={formik}
                prependOption={<option>{__('Select month')}</option>}
                options={range(12, 1)}
              />
            </div>
            <div className="form-control w-1/2 inline-block pl-1">
              <SelectInput
                name="expirationyear"
                label={__('Year')}
                formik={formik}
                prependOption={<option>{__('Select year')}</option>}
                options={range(10, yearStart)}
              />
            </div>
            <p className="mt-2">
              {__("You'll be redirected to finish the payment.")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Creditcards;

Creditcards.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
