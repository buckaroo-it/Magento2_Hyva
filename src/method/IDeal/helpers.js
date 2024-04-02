import { string as YupString, object as YupObject } from 'yup';
import { __ } from '@hyva/react-checkout/i18n';

import { getConfig } from '../../../config';

export const validationSchema = YupObject({
  issuer: YupString().required(__('Please select a bank')),
});

const config = getConfig('buckaroo_magento2_ideal') || {};

const mapIssuer = (origIssuer) => ({
  name: origIssuer.name,
  value: origIssuer.code,
});

export function getIssuers() {
  if (Array.isArray(config.banks)) {
    return config.banks.map(mapIssuer);
  }
  return [];
}
