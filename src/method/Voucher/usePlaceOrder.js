import { useCallback } from 'react';
import { __ } from '@hyva/react-checkout/i18n';

import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import useOnSubmit from '../../lib/hooks/useOnSubmit';

export default function usePlaceOrder() {
  const { setErrorMessage } = useAppContext();
  const onSubmit = useOnSubmit();

  return useCallback(
    async (values) => {
      if (values?.fromGiftcard !== true) {
        setErrorMessage(__('One or more fields are required'));
        return {};
      }

      return onSubmit(values);
    },
    [setErrorMessage, onSubmit]
  );
}
