import React from 'react';
import { object } from 'prop-types';

import PaymentMethodRadio from '../../lib/helpers/components/PaymentMethodRadio';
import AfterpayForm from './AfterpayForm';

function Afterpay({ method, selected, actions }) {
  const isSelected = method.code === selected.code;

  return (
    <div id={selected.code}>
      <PaymentMethodRadio
        method={method}
        isSelected={isSelected}
        onChange={actions.change}
      />
      {isSelected && <AfterpayForm method={method} />}
    </div>
  );
}

export default Afterpay;

Afterpay.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
