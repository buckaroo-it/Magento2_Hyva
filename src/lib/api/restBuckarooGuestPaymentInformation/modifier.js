import _get from 'lodash.get';

import { __ } from '@hyva/react-checkout/i18n';

export default function restSetGuestPaymentMethodModifier(result) {
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
