import useCartContext from '@hyva/react-checkout/hook/useCartContext';
import { useEffect } from 'react';

export default function useUpdateFormFields(formik) {
  const { cart } = useCartContext();

  const {
    setFieldValue,
    touched: {
      firstName: firstNameTouched,
      lastName: lastNameTouched,
      email: emailTouched,
    },
  } = formik;

  const {
    billing_address: { firstname, lastname },
    email,
  } = cart;
  useEffect(() => {
    if (firstNameTouched !== true) {
      setFieldValue('firstName', firstname);
    }
  }, [setFieldValue, firstNameTouched, firstname]);

  useEffect(() => {
    if (lastNameTouched !== true) {
      setFieldValue('lastName', lastname);
    }
  }, [setFieldValue, lastNameTouched, lastname]);

  useEffect(() => {
    if (emailTouched !== true) {
      setFieldValue('email', email);
    }
  }, [setFieldValue, emailTouched, email]);
}
