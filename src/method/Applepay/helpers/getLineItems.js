import { get as _get } from 'lodash-es';
import { __ } from '@hyva/react-checkout/i18n';

export default function getLineItems(cart) {
  const shippingMethod = _get(cart, 'selected_shipping_method', {}) || {};
  const prices = _get(cart, 'prices', {}) || {};
  const { amount: shippingAmount } = shippingMethod;

  const { discounts, hasDiscounts, subTotalAmount } = prices;

  const items = [];

  if (subTotalAmount !== undefined) {
    items.push({
      label: __('Cart Subtotal'),
      amount: subTotalAmount,
      type: 'final',
    });
  }

  if (shippingAmount !== undefined) {
    items.push({
      label: __('Shipping'),
      amount: shippingAmount,
      type: 'final',
    });
  }

  let formatedDiscounts = [];
  if (hasDiscounts) {
    formatedDiscounts = discounts.map((discount) => {
      const { label, amount } = discount;
      return {
        label: __(label),
        amount,
        type: 'final',
      };
    });
  }
  return [...items, ...formatedDiscounts];
}
