import { string as YupString, object as YupObject } from 'yup';
import { __ } from '@hyva/react-checkout/i18n';

export const validationSchema = YupObject({
  issuer: YupString().required(__('Please select a bank')),
});
