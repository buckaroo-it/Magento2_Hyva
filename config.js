import _get from 'lodash.get';
import RootElement from '@hyva/react-checkout/utils/rootElement';

export function getConfigIdeal() {
  const KEY = 'payment.buckaroo.ideal';
  return _get(RootElement.getCheckoutConfig(), KEY);
}

export function getConfigCreditcards() {
  const KEY = 'payment.buckaroo.creditcards';
  return _get(RootElement.getCheckoutConfig(), KEY);
}

export function getConfigPaypal() {
  const KEY = 'payment.buckaroo.paypal';
  return _get(RootElement.getCheckoutConfig(), KEY);
}
export function getConfig(key) {
  const path = `payment.buckaroo.${key}`;
  return _get(RootElement.getCheckoutConfig(), path);
}
