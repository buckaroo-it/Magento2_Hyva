import { useContext } from 'react';

import { PaymentMethodFormContext } from '@hyva/react-checkout/context/Form';

export default function useBuckarooIdealFormContext() {
  const { updateValidationSchema, formikData, setFieldValue } = useContext(
    PaymentMethodFormContext
  );

  return { updateValidationSchema, formikData, setFieldValue };
}
