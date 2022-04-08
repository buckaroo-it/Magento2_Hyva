import React, { useState, useEffect } from 'react';
import { func, object } from 'prop-types';
import { __ } from '@hyva/react-checkout/i18n';
import TextInput from '../../lib/helpers/components/TextInput';
import SelectInput from '../../lib/helpers/components/SelectInput';

import BuckarooClientSideEncryption from '../../../assets/lib/ClientSideEncryption001';

function CreditcardForm({ setStateFromForm, formData }) {
  const yearStart = new Date().getFullYear();

  console.log('redraw credicard form');
  const range = (size, startAt = 0) =>
    [...Array(size).keys()].map((i) => i + startAt);

  const [formState, setFormState] = useState(formData);

  const { cardholder, cardnumber, expirationmonth, expirationyear } = formState;
  const [validationErrors, setvalidationErrors] = useState({});

  const validateForm = () => {
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
      err.expirationyear = __('Please enter a valid year');
    }

    setvalidationErrors(err);
  };

  useEffect(async () => {
    setStateFromForm(Object.keys(validationErrors).length === 0, formState);
  }, [validationErrors]);

  useEffect(() => {
    validateForm();
  }, [formState]);

  return (
    <div>
      <div className="content py-2 px-2">
        <TextInput
          className="w-full"
          name="cardholdername"
          type="text"
          label={__('CARDHOLDER:')}
          value={cardholder}
          onChange={(e) =>
            setFormState({ ...formState, cardholder: e.target.value })
          }
          error={validationErrors.cardholder}
        />
        <TextInput
          className="w-full"
          name="cardnumber"
          type="text"
          label={__('CARD NUMBER:')}
          value={cardnumber}
          onChange={(e) =>
            setFormState({ ...formState, cardnumber: e.target.value })
          }
          error={validationErrors.cardnumber}
        />

        <div className="field my-2 flex">
          <SelectInput
            className="w-6/12 mr-1"
            name="month"
            label={__('MONTH:')}
            value={expirationmonth}
            onChange={(e) =>
              setFormState({ ...formState, expirationmonth: e.target.value })
            }
            prependOption={<option>{__('Select month')}</option>}
            options={range(12, 1)}
            error={validationErrors.expirationmonth}
          />

          <SelectInput
            className="w-6/12 mr-1"
            name="year"
            label={__('YEAR:')}
            value={expirationyear}
            onChange={(e) =>
              setFormState({ ...formState, expirationyear: e.target.value })
            }
            prependOption={<option>{__('Select year')}</option>}
            options={range(10, yearStart)}
            error={validationErrors.expirationyear}
          />
        </div>

        <p>{__("You'll be redirected to finish the payment.")}</p>
      </div>
    </div>
  );
}
export default CreditcardForm;

CreditcardForm.propTypes = {
  setStateFromForm: func.isRequired,
  formData: object.isRequired,
};
