import useCartContext from '@hyva/react-checkout/hook/useCartContext';
import { useCallback } from 'react';
import getGiftcardList from '../../../lib/hooks/giftcard_list/getGiftcardList';

function usePartialPayment(showAsList) {
  const { appDispatch } = useCartContext();

  return useCallback(async () => {
    if (!showAsList) {
      return Promise.resolve();
    }
    const partialPayment = await getGiftcardList(appDispatch);

    const formatedPaymentMethods = {};
    partialPayment.available_payment_methods.forEach((method) => {
      formatedPaymentMethods[method.code] = method;
    });

    return {
      available_payment_methods: {
        ...formatedPaymentMethods,
      },
      partial_payment: { ...partialPayment },
    };
  }, [appDispatch, showAsList]);
}

export default usePartialPayment;
