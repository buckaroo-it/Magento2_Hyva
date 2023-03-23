import { useCallback } from 'react';
import { set } from 'lodash-es';

import { useFormikContext } from 'formik';

import usePlaceOrder from '@hyva/react-checkout/components/placeOrder/hooks/usePlaceOrder';
import useAddressSave from '@hyva/react-checkout/components/placeOrder/hooks/useAddressSave';
import useEmailInfoSave from '@hyva/react-checkout/components/placeOrder/hooks/useEmailInfoSave';
import usePlaceOrderAppContext from '@hyva/react-checkout/components/placeOrder/hooks/usePlaceOrderAppContext';
import { useValidateCart } from '../../../lib/hooks/useValidateCart';

export default function usePlaceBuckarooOrder() {
  const { values } = useFormikContext();
  const saveEmailAddressInfo = useEmailInfoSave();
  const saveBillingShippingAddress = useAddressSave();
  const validateThenPlaceOrder = usePlaceOrder();
  const { setMessage, setPageLoader } = usePlaceOrderAppContext();

  const isCartValid = useValidateCart();

  return useCallback(async () => {
    setMessage(false);
    set(values, 'fromGiftcard', true);
    if (!isCartValid()) {
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
  }, [
    values,
    saveBillingShippingAddress,
    saveEmailAddressInfo,
    setMessage,
    setPageLoader,
    validateThenPlaceOrder,
    isCartValid,
  ]);
}
