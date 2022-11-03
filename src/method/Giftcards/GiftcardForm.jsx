import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import { useFormik } from 'formik';
import { __ } from '@hyva/react-checkout/i18n';

import TextInput from '../../lib/helpers/components/TextInput';
import { validationSchema } from './helpers';
import { useOnGiftcardSubmit } from './hooks';
import paymentEvent from './helpers/partialPayment';

function GiftcardForm({ giftcardCode }) {
  const [paymentData, setPaymentData] = useState();
  const onSubmit = useOnGiftcardSubmit(
    giftcardCode,
    paymentData,
    paymentEvent.emit
  );

  useEffect(() => {
    const subscription = (data) => {
      setPaymentData(data);
    };
    paymentEvent.subscribe(subscription);
    return () => paymentEvent.unsubscribe(subscription);
  }, []);

  const formik = useFormik({
    initialValues: {
      cardnumber: '',
      pin: '',
    },
    validationSchema,
    onSubmit,
  });

  return (
    <div className="pl-6">
      <TextInput
        className="w-full"
        name="cardnumber"
        type="text"
        label={__('Card number:')}
        formik={formik}
      />
      <TextInput
        className="w-full"
        name="pin"
        type="text"
        label={__('PIN / Security code:')}
        formik={formik}
      />

      <div className="field my-2">
        <button
          className="btn btn-cta"
          type="button"
          onClick={formik.handleSubmit}
        >
          {__('Apply Gift Card')}
        </button>
      </div>
    </div>
  );
}

GiftcardForm.propTypes = {
  giftcardCode: string.isRequired,
};

export default GiftcardForm;
