import React from 'react';
import { string } from 'prop-types';
import { useFormik } from 'formik';
import { object as YupObject, string as YupString } from 'yup';
import { __ } from '@hyva/react-checkout/i18n';
import useCartContext from '@hyva/react-checkout/hook/useCartContext';
import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import usePaymentMethodAppContext from '@hyva/react-checkout/components/paymentMethod/hooks/usePaymentMethodAppContext';
import { formatPrice } from '@hyva/react-checkout/utils/price';

import restAddPartialPaymentTransaction from '../../lib/api/restAddPartialPaymentTransaction/restAddPartialPaymentTransaction';
import useUpdatePartialPaymentList from '../../lib/helpers/PartialPayments/UpdatePartialPaymentList';
import usePlaceBuckarooOrder from '../../lib/helpers/PartialPayments/PlaceOrder';

function GiftcardForm({ giftcardCode }) {
  const { appDispatch } = useAppContext();
  const { setPageLoader, setSuccessMessage } = usePaymentMethodAppContext();
  const cartContext = useCartContext();
  const placeOrder = usePlaceBuckarooOrder();
  const requiredMessage = __('This is a required field.');

  const validationSchema = YupObject({
    cardnumber: YupString().required(requiredMessage),
    pin: YupString().required(requiredMessage),
  });

  const formik = useFormik({
    initialValues: {
      cardnumber: '',
      pin: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setPageLoader(true);
      const response = await restAddPartialPaymentTransaction(
        appDispatch,
        giftcardCode,
        values
      ).catch(() => setPageLoader(false));
      setPageLoader(false);
      useUpdatePartialPaymentList(cartContext, response);
      resetForm();

      if (response.remainder_amount === 0) {
        await placeOrder();
      } else {
        setSuccessMessage(
          __(
            `A partial payment of ${formatPrice(
              response.transaction.amount
            )} was successfully performed on a requested amount. Remainder amount ${formatPrice(
              response.remainder_amount
            )}`
          )
        );
      }
    },
  });

  return (
    <>
      <div className="field my-2">
        <label htmlFor="cardnumber">{__('Card number:')}</label>
        <input
          id="cardnumber"
          className={`form-input w-full ${
            formik.touched.cardnumber && formik.errors.cardnumber
              ? 'border-red-500'
              : ''
          }`}
          name="cardnumber"
          type="text"
          {...formik.getFieldProps('cardnumber')}
        />
        {formik.touched.cardnumber && formik.errors.cardnumber ? (
          <div className="text-red-500 text-xs italic">
            {formik.errors.cardnumber}
          </div>
        ) : null}
      </div>
      <div className="field my-2">
        <label htmlFor="pin">{__('PIN / Security code:')}</label>
        <input
          id="pin"
          className={`form-input w-full ${
            formik.touched.pin && formik.errors.pin ? 'border-red-500' : ''
          }`}
          name="pin"
          type="text"
          {...formik.getFieldProps('pin')}
        />
        {formik.touched.pin && formik.errors.pin ? (
          <div className="text-red-500 text-xs italic">{formik.errors.pin}</div>
        ) : null}
      </div>

      <div className="field my-2">
        <button
          className="btn btn-primary"
          type="button"
          onClick={formik.handleSubmit}
        >
          {__('Apply Gift Card')}
        </button>
      </div>
    </>
  );
}

GiftcardForm.propTypes = {
  giftcardCode: string.isRequired,
};

export default GiftcardForm;
