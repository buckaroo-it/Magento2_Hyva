import { useCallback } from 'react';

import useCartContext from '@hyva/react-checkout/hook/useCartContext';

import ApplePay from '../../../../assets/lib/BuckarooApplepay';
import getTotals from './getTotals';
import getLineItems from './getLineItems';
import useCaptureFunds from './captureFunds';
import { getConfig } from '../../../../config';

const config = getConfig('applepay') || {};

const useGetPayOptions = () => {
  const { cart } = useCartContext();
  const captureFunds = useCaptureFunds();

  return useCallback(
    () =>
      new ApplePay.PayOptions(
        config?.storeName,
        config?.country,
        config?.currency,
        config?.cultureCode,
        config?.guid,
        getLineItems(cart),
        getTotals(cart),
        'shipping',
        [],
        (payment) => captureFunds(payment),
        null,
        null,
        ['email', 'postalAddress'],
        ['email']
      ),
    [cart, captureFunds]
  );
};

export { useCaptureFunds, useGetPayOptions, config };
