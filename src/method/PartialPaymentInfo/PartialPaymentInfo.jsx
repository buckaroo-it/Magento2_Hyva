import React, { useEffect, useState } from 'react';
import useCartContext from '@hyva/react-checkout/hook/useCartContext';
import { __ } from '@hyva/react-checkout/i18n';
import { formatPrice } from '@hyva/react-checkout/utils/price';
import getGiftcardList from '../../lib/hooks/giftcard_list/getGiftcardList';

import paymentEvent from '../Giftcards/helpers/partialPayment';

function PartialPaymentInfo() {
  const { appDispatch, setCartInfo, cart } = useCartContext();
  const [paymentData, setPaymentData] = useState();

  useEffect(() => {
    const getData = async () => {
      const data = await getGiftcardList(appDispatch);
      paymentEvent.emit(data);
    };
    getData();
  }, [appDispatch]);

  useEffect(() => {
    const subscription = (data) => {
      setPaymentData(data);
    };
    paymentEvent.subscribe(subscription);
    return () => paymentEvent.unsubscribe(subscription);
  }, []);

  const availablePaymentMethods = paymentData?.available_payment_methods;
  const cartLoaded = cart.loaded === true;
  const hasTransactions =
    paymentData !== undefined && paymentData.transactions.length > 0;

  useEffect(() => {
    if (availablePaymentMethods && cartLoaded && hasTransactions) {
      const formatedPaymentMethods = {};
      availablePaymentMethods.forEach((method) => {
        formatedPaymentMethods[method.code] = method;
      });

      setCartInfo({
        available_payment_methods: {
          ...formatedPaymentMethods,
        },
      });
    }
  }, [availablePaymentMethods, setCartInfo, cartLoaded, hasTransactions]);

  if (hasTransactions) {
    const {
      remainder_amount: remainderAmount,
      already_paid: alreadyPaid,
      transactions,
    } = paymentData;

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
