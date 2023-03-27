import { useCallback } from 'react';
import { __ } from '@hyva/react-checkout/i18n';

import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import { scrollToElement } from '@hyva/react-checkout/utils/form';

export default function usePlaceOrder(methodCode) {
  const { setErrorMessage } = useAppContext();

  return useCallback(() => {
    setErrorMessage(__('Please use the apple pay button for payment'));
    scrollToElement(methodCode);
    return {};
  }, [setErrorMessage, methodCode]);
}
