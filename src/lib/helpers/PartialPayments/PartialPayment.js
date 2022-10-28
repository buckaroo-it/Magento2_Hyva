import useCartContext from '@hyva/react-checkout/hook/useCartContext';
import { useEffect } from 'react';
import getGiftcardList from '../../hooks/giftcard_list/getGiftcardList';

function usePartialPayment() {
  const { cart, setCartInfo, appDispatch } = useCartContext();

  useEffect(() => {
    const renderPartial = async () => {
      const partialPayment = await getGiftcardList(appDispatch);

      const formatedPaymentMethods = {};
      partialPayment.available_payment_methods.forEach((method) => {
        formatedPaymentMethods[method.code] = method;
      });

      setCartInfo({
        ...cart,
        available_payment_methods: {
          ...formatedPaymentMethods,
        },
        partial_payment: partialPayment,
      });
    };
    renderPartial();
  }, [appDispatch, cart, setCartInfo]);

  return null;
}

export default usePartialPayment;
