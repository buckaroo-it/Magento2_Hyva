import React from 'react';
import { bool, func, object } from 'prop-types';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';

import GiftcardForm from './GiftcardForm';

function GiftcardItem({ giftcard, selected, giftcardCodeChange }) {
  const setSelected = () => {
    giftcardCodeChange(giftcard.code);
  };

  return (
    <div className="payment-method giftcard mt-3">
      <div className="flex justify-between">
        <RadioInput
          value={giftcard.code}
          name="paymentMethod"
          checked={selected}
          onChange={setSelected}
          label={giftcard.title}
        />
        {giftcard.logo !== false && (
          <img
            height="30"
            width="40"
            src={giftcard.logo}
            alt={giftcard.title}
          />
        )}
      </div>
      {selected && <GiftcardForm giftcardCode={giftcard.code} />}
    </div>
  );
}

GiftcardItem.propTypes = {
  giftcard: object.isRequired,
  selected: bool.isRequired,
  giftcardCodeChange: func.isRequired,
};

export default GiftcardItem;
