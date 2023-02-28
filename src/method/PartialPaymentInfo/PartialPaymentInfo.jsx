import React from 'react';
import { __ } from '@hyva/react-checkout/i18n';
import { formatPrice } from '@hyva/react-checkout/utils/price';
import usePartialPayment from '../../lib/hooks/usePartialPayment';

function PartialPaymentInfo() {
  const { cartPartialPayment } = usePartialPayment();

  if ((cartPartialPayment?.transactions || []).length) {
    const {
      remainder_amount: remainderAmount,
      already_paid: alreadyPaid,
      transactions,
    } = cartPartialPayment;

    return (
      <>
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
