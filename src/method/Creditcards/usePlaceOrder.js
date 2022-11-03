import { useCallback } from 'react';
import { set as _set } from 'lodash-es';
import { __ } from '@hyva/react-checkout/i18n';

import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import { scrollToElement } from '@hyva/react-checkout/utils/form';

import useOnSubmit from '../../lib/hooks/useOnSubmit';
import { ADDITIONAL_DATA_KEY } from '../../lib/helpers/additionalBuckarooDataKey';
import encryptCardData from '../../lib/helpers/encryptCardData';

export default function usePlaceOrder(methodCode, formik) {
  const { validateForm, submitForm, values: formikValues } = formik;

  const { setErrorMessage } = useAppContext();
  const onSubmit = useOnSubmit();

  return useCallback(
    async (values) => {
      const errors = await validateForm();
      submitForm();
      if (Object.keys(errors).length) {
        setErrorMessage(__('One or more fields are required'));
        scrollToElement(methodCode);
        return {};
      }
      const encryptedCardData = await encryptCardData(formikValues);
      _set(values, ADDITIONAL_DATA_KEY, {
        customer_encrypteddata: encryptedCardData,
        customer_creditcardcompany: formikValues.issuer,
      });
      return onSubmit(values);
    },
    [
      onSubmit,
      setErrorMessage,
      formikValues,
      methodCode,
      submitForm,
      validateForm,
    ]
  );
}
