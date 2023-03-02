import React from 'react';
import { object } from 'prop-types';

import PaymentMethodRadio from '../../lib/helpers/components/PaymentMethodRadio';
import AfterpayOldForm from './AfterpayOldForm';

function AfterpayOld({ method, selected, actions }) {
  const isSelected = method.code === selected.code;

  return (
    <div id={selected.code}>
      <PaymentMethodRadio
        method={method}
        isSelected={isSelected}
        onChange={actions.change}
      />
      {isSelected && <AfterpayOldForm method={method} />}
    </div>
  );
}

export default AfterpayOld;

AfterpayOld.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
