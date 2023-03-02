import React from 'react';
import { object } from 'prop-types';

import PaymentMethodRadio from '../../lib/helpers/components/PaymentMethodRadio';
import TinkaForm from './TinkaForm';

function Tinka({ method, selected, actions }) {
  const isSelected = method.code === selected.code;

  return (
    <div id={selected.code}>
      <PaymentMethodRadio
        method={method}
        isSelected={isSelected}
        onChange={actions.change}
      />

      {isSelected && <TinkaForm method={method} />}
    </div>
  );
}

export default Tinka;

Tinka.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
