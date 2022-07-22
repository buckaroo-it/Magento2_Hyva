import { useCallback } from 'react';
import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import placeOrder from './placeOrder';

export default function useOnSubmit() {
  const { dispatch } = useAppContext();
  return useCallback(async (values) => {
    const order = await placeOrder(
      dispatch,
      values.payment_method.code,
      values.payment_method.additional_data
    );
    if (
      order.buckaroo_additional &&
      order.buckaroo_additional.redirect !== undefined &&
      order.buckaroo_additional.redirect !== null
    ) {
      window.location.href = order.buckaroo_additional.redirect;
      return {};
    }
    return order;
  }, []);
}
