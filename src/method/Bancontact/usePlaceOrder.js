import { useCallback } from 'react';
import { set as _set } from 'lodash-es';
import { __ } from '@hyva/react-checkout/i18n';

import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import { scrollToElement } from '@hyva/react-checkout/utils/form';

import useOnSubmit from '../../lib/hooks/useOnSubmit';
import { ADDITIONAL_DATA_KEY } from '../../lib/helpers/additionalBuckarooDataKey';
import encryptCardData from '../../lib/helpers/encryptCardData';

export default function usePlaceOrder(methodCode, formik, clientSideMode) {
  const { validateForm, submitForm, values: formikValues } = formik;

  const { setErrorMessage } = useAppContext();
  const onSubmit = useOnSubmit();

  return useCallback(
    async (values) => {
      if (clientSideMode === 'cc') {
        const errors = await validateForm();
        submitForm();
        if (Object.keys(errors).length) {
          setErrorMessage(__('One or more fields are required'));
          scrollToElement(methodCode);
          return {};
        }
      }
      const encryptedCardData = await encryptCardData(formikValues);
      _set(values, ADDITIONAL_DATA_KEY, {
        client_side_mode: clientSideMode,
        customer_encrypteddata: encryptedCardData,
      });
      return onSubmit(values);
    },
    [
      onSubmit,
      setErrorMessage,
      clientSideMode,
      formikValues,
      methodCode,
      submitForm,
      validateForm,
    ]
  );
}
