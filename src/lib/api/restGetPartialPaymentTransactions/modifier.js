import _get from 'lodash.get';

import { __ } from '@hyva/react-checkout/i18n';
import { SET_PAGE_MESSAGE } from '@hyva/react-checkout/context/App/page/types';

export default function restGetPartialPaymentTransactionsModifier(
  result,
  dispatch
) {
  const message = _get(result, 'message');

  if (message) {
    dispatch({
      type: SET_PAGE_MESSAGE,
      payload: { type: 'error', message },
    });

    throw new Error(
      __(
        'Payment method selected is not available. Please choose another payment method.'
      )
    );
  }

  return result;
}
