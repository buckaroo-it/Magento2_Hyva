import React from 'react';
import { object } from 'prop-types';
import PaymentMethodRadio from '../../lib/helpers/components/PaymentMethodRadio';
import In3Form from './In3Form';

function In3({ method, selected, actions }) {
  const isSelected = method.code === selected.code;

  return (
    <div id={selected.code}>
      <PaymentMethodRadio
        method={method}
        isSelected={isSelected}
        onChange={actions.change}
      />

      {isSelected && <In3Form method={method} />}
    </div>
  );
}

export default In3;

In3.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
