import { config } from '@hyva/react-checkout/config';
import LocalStorage from '@hyva/react-checkout/utils/localStorage';

import restBuckarooGuestPaymentInformation from './api/restBuckarooGuestPaymentInformation';
import restBuckarooPaymentInformation from './api/restBuckarooPaymentInformation';
import { IsCustomer } from './helpers/Customer';
import { GetPaymentMethodBody } from './helpers/PaymentMethodBody';

export async function GetBuckarooPaymentInformation(
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

  const call = IsCustomer()
    ? restBuckarooPaymentInformation
    : restBuckarooGuestPaymentInformation;
  const body = GetPaymentMethodBody(method, address, email, additionalData);

  let resp = await call(dispatch, body);
  resp = JSON.parse(resp);

  if (resp.order_number) {
    LocalStorage.clearCheckoutStorage();
  }

  if (resp.order_number && config.isProductionMode) {
    window.location.replace(config.successPageRedirectUrl);
  }

  if (resp.RequiredAction && resp.RequiredAction.RedirectURL) {
    window.location.href = resp.RequiredAction.RedirectURL;
    return resp;
  }

  return resp;
}
