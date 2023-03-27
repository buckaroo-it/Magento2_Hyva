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
    values: { name, dob, coc, tos, vat, phone, gender },
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
        customer_chamberOfCommerce: coc,
        customer_billingName: name,
        customer_telephone: phone,
        customer_gender: gender,
        customer_VATNumber: vat,
        termsCondition: tos,
        customer_DoB: dob,
      });
      return onSubmit(values);
    },
    [
      onSubmit,
      setErrorMessage,
      name,
      dob,
      coc,
      tos,
      vat,
      phone,
      gender,
      methodCode,
      submitForm,
      validateForm,
    ]
  );
}
