import useCartContext from '@hyva/react-checkout/hook/useCartContext';
import { __ } from '@hyva/react-checkout/i18n';
import { useEffect } from 'react';
import restGetPartialPaymentTransactions from '../../api/restGetPartialPaymentTransactions';

function usePartialPayment() {
  const { cart, setCartInfo, appDispatch } = useCartContext();

  useEffect(() => {
    const renderPartial = async () => {
      const partialPayment = await restGetPartialPaymentTransactions(
        appDispatch
      );

      const availablePaymentMethods = {
        buckaroo_magento2_partial_payment_info: {
          code: 'buckaroo_magento2_partial_payment_info',
          title: __('Payment status'),
        },
        ...cart.available_payment_methods,
      };
      setCartInfo({
        ...cart,
        available_payment_methods: {
          ...availablePaymentMethods,
        },
        partial_payment: partialPayment,
      });
    };
    renderPartial();
  }, []);

  return null;
}

export default usePartialPayment;
