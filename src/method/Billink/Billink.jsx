import React from 'react';
import { object } from 'prop-types';

import PaymentMethodRadio from '../../lib/helpers/components/PaymentMethodRadio';

import BillinkForm from './BillinkForm';

function Billink({ method, selected, actions }) {
  const isSelected = method.code === selected.code;
  return (
    <div id={selected.code}>
      <PaymentMethodRadio
        method={method}
        isSelected={isSelected}
        onChange={actions.change}
      />

      {isSelected && <BillinkForm method={method} />}
    </div>
  );
}

export default Billink;

Billink.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
