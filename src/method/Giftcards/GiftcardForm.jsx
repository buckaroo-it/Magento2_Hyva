import React from 'react';
import { string } from 'prop-types';
import { useFormik } from 'formik';
import { object as YupObject, string as YupString } from 'yup';
import { __ } from '@hyva/react-checkout/i18n';
// import useCartContext from '@hyva/react-checkout/hook/useCartContext';
import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import usePaymentMethodAppContext from '@hyva/react-checkout/components/paymentMethod/hooks/usePaymentMethodAppContext';
import { formatPrice } from '@hyva/react-checkout/utils/price';

// import useUpdatePartialPaymentList from '../../lib/helpers/PartialPayments/UpdatePartialPaymentList';
import TextInput from '../../lib/helpers/components/TextInput';
import createGiftcardTransaction from '../../lib/hooks/giftcard/createGiftcardTransaction';

function GiftcardForm({ giftcardCode }) {
  const { appDispatch } = useAppContext();
  const { setPageLoader, setSuccessMessage } = usePaymentMethodAppContext();
  // const cartContext = useCartContext();
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
      const response = await createGiftcardTransaction(
        appDispatch,
        giftcardCode,
        values
      ).catch(() => setPageLoader(false));
      setPageLoader(false);
      /**
       * @todo a hook should not be called like this. it should be at the top level.
       */
      // useUpdatePartialPaymentList(cartContext, response);
      resetForm();

      if (response.remainder_amount !== 0) {
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

      <div className="my-2 field">
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
