import useCartContext from '@hyva/react-checkout/hook/useCartContext';
import { useEffect } from 'react';

export default function useSetFormFullName(formik) {
  const { cart } = useCartContext();
  useEffect(() => {
    const name = cart?.billing_address?.fullName;
    if (formik.values.name !== name) {
      formik.setFieldValue('name', name);
    }
  }, [formik, cart]);
}
