import { useCallback } from 'react';
import { set as _set } from 'lodash-es';
import { __ } from '@hyva/react-checkout/i18n';

import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import useCartContext from '@hyva/react-checkout/hook/useCartContext';
import { scrollToElement } from '@hyva/react-checkout/utils/form';

import useOnSubmit from '../../lib/hooks/useOnSubmit';
import { ADDITIONAL_DATA_KEY } from '../../lib/helpers/additionalBuckarooDataKey';

export default function usePlaceOrder(methodCode, formik) {
  const { validateForm, submitForm, values: formValues } = formik;
  const { setErrorMessage } = useAppContext();
  const { cart } = useCartContext();
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

      const { telephone, dob, tos, coc, iban, companyName, businessType } =
        formValues;
      const fullName = cart?.billing_address?.fullName;

      _set(values, ADDITIONAL_DATA_KEY, {
        customer_telephone: telephone,
        customer_billingName: fullName,
        customer_DoB: dob,
        customer_iban: iban,
        termsCondition: tos,
        CompanyName: companyName,
        COCNumber: coc,
        selectedBusiness: businessType,
      });
      return onSubmit(values);
    },
    [
      onSubmit,
      setErrorMessage,
      formValues,
      cart,
      methodCode,
      submitForm,
      validateForm,
    ]
  );
}
