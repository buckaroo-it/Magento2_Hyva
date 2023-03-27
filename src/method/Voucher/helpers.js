import { string as YupString, object as YupObject } from 'yup';
import { __ } from '@hyva/react-checkout/i18n';

const requiredMessage = __('This is a required field.');

export const validationSchema = YupObject({
  voucher: YupString().required(requiredMessage),
});
