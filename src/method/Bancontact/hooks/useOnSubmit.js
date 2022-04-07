import _get from 'lodash.get';
import { GetBuckarooPaymentInformation } from '../../../lib/BuckarooPaymentMethod';

export default function useOnSubmit() {
  const paymentSubmitHandler = async (values, dispatch, data) => {
    const method = _get(values, 'payment_method.code', null);
    const billingAddress = _get(values, 'billing_address', null);
    const email = _get(values, 'login.email', null);

    await GetBuckarooPaymentInformation(
      dispatch,
      method,
      data,
      billingAddress,
      email
    );
  };

  return { paymentSubmitHandler };
}
