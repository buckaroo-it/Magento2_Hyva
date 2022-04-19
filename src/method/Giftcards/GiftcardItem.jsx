import React from 'react';
import { bool, func, object } from 'prop-types';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';

import GiftcardForm from './GiftcardForm';

function GiftcardItem({ giftcard, selected, giftcardCodeChange }) {
  const setSelected = () => {
    giftcardCodeChange(giftcard.code);
  };

  const giftcardRadio = (
    <div className="title flex justify-between">
      <RadioInput
        value={giftcard.code}
        label={giftcard.title}
        name="paymentMethod"
        checked={selected}
        onChange={setSelected}
      />
      {giftcard.logo !== false && (
        <img src={giftcard.logo} className="w-12" alt={giftcard.title} />
      )}
    </div>
  );
  if (!selected) {
    return giftcardRadio;
  }
  return (
    <>
      {giftcardRadio}
      {selected && <GiftcardForm giftcardCode={giftcard.code} />}
    </>
  );
}

GiftcardItem.propTypes = {
  giftcard: object.isRequired,
  selected: bool.isRequired,
  giftcardCodeChange: func.isRequired,
};

export default GiftcardItem;
