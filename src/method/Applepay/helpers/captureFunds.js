import { useCallback } from 'react';
import { set as _set } from 'lodash-es';
import { useFormikContext } from 'formik';

import useOnSubmit from '../../../lib/hooks/useOnSubmit';
import { ADDITIONAL_DATA_KEY } from '../../../lib/helpers/AdditionalBuckarooDataKey';

const formatTransactionResponse = function (response) {
  if (response === null || response === 'undefined') {
    return null;
  }

  const paymentData = { ...response.token.paymentData };

  return JSON.stringify({
    paymentData: {
      version: paymentData.version,
      data: paymentData.data,
      signature: paymentData.signature,
      header: {
        ephemeralPublicKey: paymentData.header.ephemeralPublicKey,
        publicKeyHash: paymentData.header.publicKeyHash,
        transactionId: paymentData.header.transactionId,
      },
    },
  });
};

export default function useCaptureFunds() {
  const onSubmit = useOnSubmit();
  const { values } = useFormikContext();

  return useCallback(
    async (payment) => {
      const data = {
        applepayTransaction: formatTransactionResponse(payment),
        billingContact:
          payment && payment.billingContact
            ? JSON.stringify(payment.billingContact)
            : '',
      };
      _set(values, ADDITIONAL_DATA_KEY, data);
      await onSubmit(values);
      return {
        status: window.ApplePaySession.STATUS_SUCCESS,
        errors: [],
      };
    },
    [values, onSubmit]
  );
}
