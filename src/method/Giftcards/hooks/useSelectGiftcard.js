import { useCallback } from 'react';
import { get as _get } from 'lodash-es';
import usePaymentMethodCartContext from '@hyva/react-checkout/components/paymentMethod/hooks/usePaymentMethodCartContext';
import usePaymentMethodFormContext from '@hyva/react-checkout/components/paymentMethod/hooks/usePaymentMethodFormContext';

export default function useSelectGiftcard(methodCode, setGiftcardCode) {
  const {
    fields: { code },
    formikData: { setFieldValue, setFieldTouched },
  } = usePaymentMethodFormContext();
  const { methodList } = usePaymentMethodCartContext();

  return useCallback(
    async (selectedGiftcardCode) => {
      const methodSelected = _get(methodList, `${methodCode}.code`);

      if (!methodSelected) {
        return;
      }

      await setFieldValue(code, methodSelected);
      setFieldTouched(code, true);
      setGiftcardCode(selectedGiftcardCode);
    },
    [
      setGiftcardCode,
      code,
      methodCode,
      setFieldTouched,
      methodList,
      setFieldValue,
    ]
  );
}
