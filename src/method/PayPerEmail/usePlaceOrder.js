import { useCallback } from 'react';
import { set as _set } from 'lodash-es';
import { __ } from '@hyva/react-checkout/i18n';

import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import { scrollToElement } from '@hyva/react-checkout/utils/form';

import useOnSubmit from '../../lib/hooks/useOnSubmit';
import { ADDITIONAL_DATA_KEY } from '../../lib/helpers/additionalBuckarooDataKey';

export default function usePlaceOrder(methodCode, formik) {
  const {
    validateForm,
    submitForm,
    values: { firstName, lastName, email, gender },
  } = formik;
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
      _set(values, ADDITIONAL_DATA_KEY, {
        customer_billingFirstName: firstName,
        customer_billingLastName: lastName,
        customer_email: email,
        customer_gender: gender,
      });
      return onSubmit(values);
    },
    [
      onSubmit,
      setErrorMessage,
      firstName,
      lastName,
      email,
      gender,
      methodCode,
      submitForm,
      validateForm,
    ]
  );
}
