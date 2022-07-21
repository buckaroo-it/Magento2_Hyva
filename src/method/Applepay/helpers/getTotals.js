import _get from 'lodash.get';
import { __ } from '@hyva/react-checkout/i18n';

export default function getTotals(cart) {
  const prices = _get(cart, 'prices', {}) || {};

  const { grandTotalAmount } = prices;
  return { label: __('Order Total'), amount: grandTotalAmount, type: 'final' };
}
