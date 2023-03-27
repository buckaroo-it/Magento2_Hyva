import { useCallback } from 'react';
import { __ } from '@hyva/react-checkout/i18n';

import usePaymentMethodAppContext from '@hyva/react-checkout/components/paymentMethod/hooks/usePaymentMethodAppContext';
import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import { formatPrice } from '@hyva/react-checkout/utils/price';
import createGiftcardTransaction from '../../../lib/hooks/giftcard/createGiftcardTransaction';
import usePlaceBuckarooOrder from './usePlaceOrder';
import usePartialPayment from '../../../lib/hooks/usePartialPayment';
import { useValidateCart } from '../../../lib/hooks/useValidateCart';

export default function useOnGiftcardSubmit(giftcardCode) {
  const { setPageLoader, setSuccessMessage, setErrorMessage } =
    usePaymentMethodAppContext();
  const { appDispatch } = useAppContext();
  const placeOrder = usePlaceBuckarooOrder();
  const { updatePartialPayment } = usePartialPayment();
  const isCartValid = useValidateCart();
  return useCallback(
    async (values, { resetForm }) => {
      if (!isCartValid()) {
        return;
      }
      setPageLoader(true);
      const response = await createGiftcardTransaction(
        appDispatch,
        giftcardCode,
        values
      ).catch(() => setPageLoader(false));
      setPageLoader(false);

      resetForm();

      if (response?.transaction) {
        updatePartialPayment(response);
        if (response.remainder_amount !== 0) {
          setSuccessMessage(
            __(
              `A partial payment of %1 was successfully performed on a requested amount. Remainder amount %1`,
              formatPrice(response.transaction.amount),
              formatPrice(response.remainder_amount)
            )
          );
        } else {
          placeOrder();
        }
      } else if (Array.isArray(response)) {
        response.forEach((error) => {
          setErrorMessage(error.message);
        });
      } else {
        setErrorMessage('Cannot apply voucher');
      }
    },
    [
      appDispatch,
      setPageLoader,
      setSuccessMessage,
      setErrorMessage,
      giftcardCode,
      placeOrder,
      updatePartialPayment,
      isCartValid,
    ]
  );
}
