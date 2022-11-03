import { useCallback } from 'react';
import { set as _set } from 'lodash-es';
import { __ } from '@hyva/react-checkout/i18n';

import useAppContext from '@hyva/react-checkout/hook/useAppContext';

import useOnSubmit from '../../lib/hooks/useOnSubmit';
import { ADDITIONAL_DATA_KEY } from '../../lib/helpers/additionalBuckarooDataKey';
import { showAsList } from './helpers';

export function usePlaceOrder(giftcardCode, canPlaceOrder) {
  const { setErrorMessage } = useAppContext();
  const onSubmit = useOnSubmit();

  return useCallback(
    async (values) => {
      if (showAsList && !canPlaceOrder && values?.fromGiftcard !== true) {
        setErrorMessage(__('One or more fields are required'));
        return {};
      }
      if (!showAsList) {
        _set(values, ADDITIONAL_DATA_KEY, {
          giftcard_method: giftcardCode,
        });
      }
      return onSubmit(values);
    },
    [onSubmit, setErrorMessage, canPlaceOrder, giftcardCode]
  );
}
