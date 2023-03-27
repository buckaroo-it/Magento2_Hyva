import React from 'react';
import { object } from 'prop-types';
import PaymentMethodRadio from '../../lib/helpers/components/PaymentMethodRadio';
import PayPerEmailForm from './PayPerEmailForm';

function PayPerEmail({ method, selected, actions }) {
  const isSelected = method.code === selected.code;

  return (
    <div id={selected.code}>
      <PaymentMethodRadio
        method={method}
        isSelected={isSelected}
        onChange={actions.change}
      />
      {isSelected && <PayPerEmailForm method={method} />}
    </div>
  );
}

export default PayPerEmail;

PayPerEmail.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: object.isRequired,
};
