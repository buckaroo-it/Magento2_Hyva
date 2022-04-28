import useCartContext from '@hyva/react-checkout/hook/useCartContext';
import { useEffect } from 'react';
import restGetPartialPaymentTransactions from '../../api/restGetPartialPaymentTransactions';

function usePartialPayment() {
  const { cart, setCartInfo, appDispatch } = useCartContext();

  useEffect(() => {
    const renderPartial = async () => {
      const partialPayment = await restGetPartialPaymentTransactions(
        appDispatch
      );

      setCartInfo({
        ...cart,
        available_payment_methods: {
          ...cart.available_payment_methods,
        },
        partial_payment: partialPayment,
      });
    };
    renderPartial();
  }, []);

  return null;
}

export default usePartialPayment;
