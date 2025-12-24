import { useCallback } from 'react';
import { __ } from '@hyva/react-checkout/i18n';
import { formatPrice } from '@hyva/react-checkout/utils/price';
import usePaymentMethodAppContext from '@hyva/react-checkout/components/paymentMethod/hooks/usePaymentMethodAppContext';

import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import submitVoucher from '../../lib/api/voucher/submitVoucher';
import usePlaceBuckarooOrder from '../Giftcards/hooks/usePlaceOrder';
import usePartialPayment from '../../lib/hooks/usePartialPayment';
import { useValidateCart } from '../../lib/hooks/useValidateCart';

export default function useSubmitVoucher() {
  const { dispatch } = useAppContext();
  const { setPageLoader, setSuccessMessage, setErrorMessage } =
    usePaymentMethodAppContext();
  const placeOrder = usePlaceBuckarooOrder();

  const { updatePartialPayment, fetchPartialPayment } = usePartialPayment();

  const isCartValid = useValidateCart();
  return useCallback(
    async ({ voucher }, { resetForm }) => {
      if (!isCartValid()) {
        return;
      }
      setPageLoader(true);
      const response = await submitVoucher(dispatch, voucher).catch(() =>
        setPageLoader(false)
      );

      setPageLoader(false);
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
        fetchPartialPayment();
      } else {
        setErrorMessage('Cannot apply voucher');
      }

      resetForm();
    },
    [
      dispatch,
      setPageLoader,
      setSuccessMessage,
      setErrorMessage,
      placeOrder,
      updatePartialPayment,
      fetchPartialPayment,
      isCartValid,
    ]
  );
}
