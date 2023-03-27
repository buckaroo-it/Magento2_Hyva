import { __ } from '@hyva/react-checkout/i18n';
import { useFormikContext } from 'formik';
import { useCallback } from 'react';
import { get as _get } from 'lodash-es';

import {
  LOGIN_FORM,
  SHIPPING_METHOD,
  BILLING_ADDR_FORM,
  SHIPPING_ADDR_FORM,
  PAYMENT_METHOD_FORM,
  CHECKOUT_AGREEMENTS_FORM,
} from '@hyva/react-checkout/config';
import {
  hasLoginErrors,
  hasPaymentMethodErrors,
  hasBillingAddressErrors,
  hasShippingMethodErrors,
  hasShippingAddressErrors,
  hasTermsAndConditionsAgreed,
} from '@hyva/react-checkout/components/placeOrder/utility';

import usePlaceOrderAppContext from '@hyva/react-checkout/components/placeOrder/hooks/usePlaceOrderAppContext';
import usePlaceOrderCartContext from '@hyva/react-checkout/components/placeOrder/hooks/usePlaceOrderCartContext';

import {
  focusOnFormErrorElement,
  scrollToElement,
} from '@hyva/react-checkout/utils/form';

const customerWantsToSignInField = `${LOGIN_FORM}.customerWantsToSignIn`;
export function useValidateCart() {
  const { values, errors } = useFormikContext();

  const { isVirtualCart } = usePlaceOrderCartContext();
  const { setErrorMessage } = usePlaceOrderAppContext();
  return useCallback(() => {
    if (hasLoginErrors(errors)) {
      const customerWantsToSignIn = _get(values, customerWantsToSignInField);
      setErrorMessage(
        __(
          customerWantsToSignIn
            ? 'Please provide your login details.'
            : 'Please provide your email address.'
        )
      );
      focusOnFormErrorElement(LOGIN_FORM, errors);
      return false;
    }

    if (hasShippingAddressErrors(errors)) {
      setErrorMessage(__('Please provide your shipping address information.'));
      focusOnFormErrorElement(SHIPPING_ADDR_FORM, errors);
      return false;
    }

    if (hasBillingAddressErrors(errors, values, isVirtualCart)) {
      setErrorMessage(__('Please provide your billing address information.'));
      focusOnFormErrorElement(BILLING_ADDR_FORM, errors);
      return false;
    }

    if (hasShippingMethodErrors(errors)) {
      setErrorMessage(__('Please select your shipping method.'));
      scrollToElement(SHIPPING_METHOD);
      return false;
    }

    if (hasPaymentMethodErrors(errors)) {
      setErrorMessage(__('Please select your payment method.'));
      scrollToElement(PAYMENT_METHOD_FORM);
      return false;
    }

    if (hasTermsAndConditionsAgreed(errors)) {
      setErrorMessage(__('Please agree with the terms & conditions'));
      scrollToElement(CHECKOUT_AGREEMENTS_FORM);
      return false;
    }
    return true;
  }, [errors, values, isVirtualCart, setErrorMessage]);
}
