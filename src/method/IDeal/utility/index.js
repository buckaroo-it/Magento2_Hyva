import { string as YupString, object as YupObject } from 'yup';

import { __ } from '@hyva/react-checkout/i18n';
import { PAYMENT_METHOD_FORM } from '@hyva/react-checkout/config';

import { getConfig } from '../../../../config';

export const idealConfig = getConfig('ideal') || {};

export const issuerList = (idealConfig.banks || []).map((issuer) => ({
  label: issuer.name,
  value: issuer.code,
}));

export function getIssuerField(methodCode) {
  return `${PAYMENT_METHOD_FORM}.${methodCode}.issuer`;
}

export function prepareValidationSchema(methodCode) {
  return {
    [methodCode]: YupObject().when('code', {
      is: methodCode,
      then: YupObject().shape({
        issuer: YupString().required(__('Please select a bank')),
      }),
      otherwise: YupObject().shape({
        issuer: YupString().nullable(),
      }),
    }),
  };
}
