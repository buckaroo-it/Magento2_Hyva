import { get as _get } from 'lodash-es';

import { __ } from '@hyva/react-checkout/i18n';

export default function restSetGuestPaymentMethodModifier(result) {
  if (result && result.message) {
    throw new Error(result.message);
  }
  const _result = JSON.parse(result);
  const message = _get(_result, 'message');

  if (message) {
    throw new Error(
      __(
        'Payment method selected is not available. Please choose another payment method.'
      )
    );
  }

  return _result;
}
