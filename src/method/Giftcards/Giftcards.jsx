import React, { useEffect, useState } from 'react';
import { func, shape, object } from 'prop-types';

import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';

import PaymentMethodRadio from '../../lib/helpers/components/PaymentMethodRadio';
import GiftcardItem from './GiftcardItem';
import { showAsList, availableGiftcards } from './helpers';
import { usePlaceOrder } from './usePlaceOrder';
import { useSelectGiftcard } from './hooks';

function Giftcards({ method, selected, actions }) {
  const isSelected = method.code === selected.code;
  const { registerPaymentAction } = useCheckoutFormContext();
  const defaultGiftcardCode = '';
  const [giftcardCode, setGiftcardCode] = useState(defaultGiftcardCode);

  const placeOrderWithGiftcards = usePlaceOrder(giftcardCode);
  const giftcardCodeChange = useSelectGiftcard(method.code, setGiftcardCode);

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithGiftcards);
  }, [method.code, registerPaymentAction, placeOrderWithGiftcards]);

  if (showAsList) {
    return availableGiftcards.map((giftcard) => (
      <GiftcardItem
        key={giftcard.code}
        giftcard={giftcard}
        selected={giftcard.code === giftcardCode && isSelected}
        giftcardCodeChange={giftcardCodeChange}
      />
    ));
  }
  return (
    <div id={selected.code}>
      <PaymentMethodRadio
        method={method}
        isSelected={isSelected}
        onChange={actions.change}
      />
    </div>
  );
}

Giftcards.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default Giftcards;
