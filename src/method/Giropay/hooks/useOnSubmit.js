import { useCallback } from 'react';
import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import { GetBuckarooPaymentInformation } from '../../../lib/BuckarooPaymentMethod';

export default function useOnSubmit() {
  const { isLoggedIn, setPageLoader, setErrorMessage, dispatch } =
    useAppContext();

  return useCallback(
    async (values) => {
      try {
        setPageLoader(true);
        await GetBuckarooPaymentInformation(
          dispatch,
          values.payment_method.code,
          values.payment_method.additional_data,
          values.billing_address,
          values.login.email
        );
        setPageLoader(false);
      } catch (error) {
        setErrorMessage(error.message);
        setPageLoader(false);
      }
    },
    [isLoggedIn, setPageLoader, setErrorMessage]
  );
}
