import { get as _get } from 'lodash-es';
import RootElement from '@hyva/react-checkout/utils/rootElement';

export function getConfig(key) {
  const path = `payment.buckaroo.${key}`;
  return _get(RootElement.getCheckoutConfig(), path);
}
