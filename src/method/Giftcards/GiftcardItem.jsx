import React from 'react';
import { bool, func, object } from 'prop-types';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';

import GiftcardForm from './GiftcardForm';

function GiftcardItem({ giftcard, selected, giftcardCodeChange }) {
  const setSelected = () => {
    giftcardCodeChange(giftcard.code);
  };

  return (
    <div className="payment-method giftcard">
      <div className="title flex">
        <RadioInput
          value={giftcard.code}
          name="paymentMethod"
          checked={selected}
          onChange={setSelected}
        />
        <label
          className="text w-full cursor-pointer"
          htmlFor={`paymentMethod_${giftcard.code}`}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <strong>{giftcard.title}</strong>
        </label>
        {giftcard.logo !== false && (
          <img
            width="24"
            height="24"
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
