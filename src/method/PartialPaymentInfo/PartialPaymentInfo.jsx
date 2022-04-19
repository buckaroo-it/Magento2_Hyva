import React, { useEffect, useState } from 'react';
import useCartContext from '@hyva/react-checkout/hook/useCartContext';
import { __ } from '@hyva/react-checkout/i18n';
import { formatPrice } from '@hyva/react-checkout/utils/price';

import onlyBuckaroo from '../../lib/helpers/PartialPayments/OnlyBuckarooPayments';

function PartialPaymentInfo() {
  const { cart, setCartInfo } = useCartContext();

  const [display, setDisplay] = useState(false);
  useEffect(() => {
    if (cart.partial_payment.transactions.length) {
      setCartInfo({
        ...cart,
        available_payment_methods: {
          ...onlyBuckaroo(cart.available_payment_methods),
        },
      });
      setDisplay(true);
    }
  }, [cart.partial_payment.transactions]);

  if (display) {
    const {
      remainder_amount: remainderAmount,
      already_paid: alreadyPaid,
      transactions,
    } = cart.partial_payment;
    return (
      <>
        <h4 className="font-bold border-b mb-2">{__('Payment summary:')}</h4>
        <div className="mt-3">
          <div className="flex justify-between font-bold border-b mb-2">
            <div>{__('Order Total')}</div>
            <div>{cart.prices.grandTotal || '0'}</div>
          </div>
        </div>
        {transactions.map((transaction) => {
          const { amount, name, transaction_id: transactionId } = transaction;
          return (
            <div className="pb-2 space-y-3" key={transactionId}>
              <div className="flex justify-between">
                <div>{name}</div>
                <div>{formatPrice(-amount, true)}</div>
              </div>
            </div>
          );
        })}
        <div className="pb-2 space-y-3 border-b border-t">
          <div className="flex justify-between">
            <div className="font-bold">{__('Total paid amount')}</div>
            <div>{formatPrice(alreadyPaid)}</div>
          </div>
        </div>
        <div className="pb-2 space-y-3 border-b">
          <div className="flex justify-between">
            <div className="font-bold">{__('Remaining amount')}</div>
            <div>{formatPrice(remainderAmount)}</div>
          </div>
        </div>
      </>
    );
  }
  return null;
}
export default PartialPaymentInfo;
