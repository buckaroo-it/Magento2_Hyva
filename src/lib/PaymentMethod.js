import restSetGuestPaymentMethod from './api/restSetGuestPaymentMethod';
import restSetPaymentMethod from './api/restSetPaymentMethod';
import { IsCustomer } from './helpers/Customer';
import { GetPaymentMethodBody } from './helpers/PaymentMethodBody';

export async function SetPaymentMethod(
  dispatch,
  method,
  additionalData = {},
  address,
  email
) {
  let additionalDataBody = additionalData;
  if (!additionalDataBody) {
    additionalDataBody = {
      buckaroo_skip_validation: 'true',
    };
  }

  const call = IsCustomer() ? restSetPaymentMethod : restSetGuestPaymentMethod;
  const body = GetPaymentMethodBody(method, address, email, additionalData);

  return call(dispatch, body);
}
