import React from 'react';
import { bool, func, object } from 'prop-types';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';

import GiftcardForm from './GiftcardForm';

function GiftcardItem({ giftcard, selected, giftcardCodeChange }) {
  const setSelected = () => {
    giftcardCodeChange(giftcard.code);
  };

  const giftcardRadio = (
    <div className="title flex">
      <RadioInput
        value={giftcard.code}
        name="paymentMethod"
        checked={selected}
        onChange={setSelected}
      />
      <div className="text">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor={`paymentMethod_${giftcard.code}`}>
          {giftcard.title}
        </label>
      </div>
      {giftcard.logo !== false && (
        <img src={giftcard.logo} className="w-12" alt={giftcard.title} />
      )}
    </div>
  );
  if (!selected) {
    return <div className="payment-method giftcard">{giftcardRadio}</div>;
  }
  return (
    <div className="payment-method giftcard">
      {giftcardRadio}
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
