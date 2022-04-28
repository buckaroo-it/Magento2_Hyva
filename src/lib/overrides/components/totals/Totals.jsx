import React from 'react';

import Card from '@hyva/react-checkout/components/common/Card';
import ToggleBox from '@hyva/react-checkout/components/common/ToggleBox';
import { __ } from '@hyva/react-checkout/i18n';
import useTotalsCartContext from '@hyva/react-checkout/components/totals/hooks/useTotalsCartContext';

import PartialPaymentInfo from '../../paymentMethods/buckaroo/src/method/PartialPaymentInfo';

function Totals() {
  const {
    subTotal,
    discounts,
    grandTotal,
    hasSubTotal,
    hasDiscounts,
    hasShippingRate,
    shippingMethodRate,
  } = useTotalsCartContext();

  return (
    <Card>
      <ToggleBox show title={__('Order Summary')}>
        <div className="py-4">
          <div>
            <div className="pb-2 space-y-3 border-b">
              {hasSubTotal && (
                <div className="flex justify-between">
                  <div>{__('Cart Subtotal')}</div>
                  <div>{subTotal}</div>
                </div>
              )}

              {hasShippingRate && (
                <div className="flex justify-between">
                  <div>{__('Shipping')}</div>
                  <div>{shippingMethodRate}</div>
                </div>
              )}
              {hasDiscounts &&
                discounts.map((discount) => (
                  <div key={discount.label} className="flex justify-between">
                    <div>{__(discount.label)}</div>
                    <div>{discount.price}</div>
                  </div>
                ))}
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xl font-bold">
                <div>{__('Order Total')}</div>
                <div>{grandTotal || '0'}</div>
              </div>
            </div>
          </div>
        </div>
        <PartialPaymentInfo />
      </ToggleBox>
    </Card>
  );
}

export default Totals;
