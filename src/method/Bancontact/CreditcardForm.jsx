import React from 'react';
import { __ } from '@hyva/react-checkout/i18n';
import { object } from 'prop-types';

import TextInput from '../../lib/helpers/components/TextInput';
import SelectInput from '../../lib/helpers/components/SelectInput';

function CreditcardForm({ formik }) {
  const yearStart = new Date().getFullYear();

  const range = (size, startAt = 0) =>
    [...Array(size).keys()].map((i) => i + startAt);

  return (
    <div>
      <div className="content p-2">
        <TextInput
          className="w-full"
          name="cardholder"
          type="text"
          label={__('CARDHOLDER:')}
          formik={formik}
        />
        <TextInput
          className="w-full"
          name="cardnumber"
          type="text"
          label={__('CARD NUMBER:')}
          formik={formik}
        />

        <div className="field my-2 flex">
          <SelectInput
            className="w-6/12 mr-1"
            name="expirationmonth"
            label={__('MONTH:')}
            formik={formik}
            prependOption={<option>{__('Select month')}</option>}
            options={range(12, 1)}
          />

          <SelectInput
            className="w-6/12 ml-1"
            name="expirationyear"
            label={__('YEAR:')}
            formik={formik}
            prependOption={<option>{__('Select year')}</option>}
            options={range(10, yearStart)}
          />
        </div>

        <p>{__("You'll be redirected to finish the payment.")}</p>
      </div>
    </div>
  );
}
export default CreditcardForm;

CreditcardForm.propTypes = {
  formik: object.isRequired,
};
