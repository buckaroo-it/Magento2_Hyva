import { get as _get } from 'lodash-es';
import { useFormikContext } from 'formik';

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
import { __ } from '@hyva/react-checkout/i18n';
import usePlaceOrder from '@hyva/react-checkout/components/placeOrder/hooks/usePlaceOrder';
import useAddressSave from '@hyva/react-checkout/components/placeOrder/hooks/useAddressSave';
import useEmailInfoSave from '@hyva/react-checkout/components/placeOrder/hooks/useEmailInfoSave';
import usePlaceOrderAppContext from '@hyva/react-checkout/components/placeOrder/hooks/usePlaceOrderAppContext';
import usePlaceOrderCartContext from '@hyva/react-checkout/components/placeOrder/hooks/usePlaceOrderCartContext';
import {
  focusOnFormErrorElement,
  scrollToElement,
} from '@hyva/react-checkout/utils/form';

const customerWantsToSignInField = `${LOGIN_FORM}.customerWantsToSignIn`;

export default function usePlaceBuckarooOrder() {
  const { values, errors } = useFormikContext();
  const saveEmailAddressInfo = useEmailInfoSave();
  const saveBillingShippingAddress = useAddressSave();
  const validateThenPlaceOrder = usePlaceOrder();
  const { isVirtualCart } = usePlaceOrderCartContext();
  const { setMessage, setErrorMessage, setPageLoader } =
    usePlaceOrderAppContext();

  return async () => {
    setMessage(false);

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
      return;
    }

    if (hasShippingAddressErrors(errors)) {
      setErrorMessage(__('Please provide your shipping address information.'));
      focusOnFormErrorElement(SHIPPING_ADDR_FORM, errors);
      return;
    }

    if (hasBillingAddressErrors(errors, values, isVirtualCart)) {
      setErrorMessage(__('Please provide your billing address information.'));
      focusOnFormErrorElement(BILLING_ADDR_FORM, errors);
      return;
    }

    if (hasShippingMethodErrors(errors)) {
      setErrorMessage(__('Please select your shipping method.'));
      scrollToElement(SHIPPING_METHOD);
      return;
    }

    if (hasPaymentMethodErrors(errors)) {
      setErrorMessage(__('Please select your payment method.'));
      scrollToElement(PAYMENT_METHOD_FORM);
      return;
    }

    if (hasTermsAndConditionsAgreed(errors)) {
      setErrorMessage(__('Please agree with the terms & conditions'));
      scrollToElement(CHECKOUT_AGREEMENTS_FORM);
      return;
    }

    try {
      setPageLoader(true);
      await saveEmailAddressInfo(values);
      await saveBillingShippingAddress(values);
      await validateThenPlaceOrder(values);
      setPageLoader(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setPageLoader(false);
    }
  };
}
