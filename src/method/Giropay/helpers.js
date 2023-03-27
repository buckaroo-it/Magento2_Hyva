import { object as YupObject, string as YupString } from 'yup';
import { __ } from '@hyva/react-checkout/i18n';

export const validationSchema = YupObject({
  bic: YupString().required(__('This is a required field.')),
});
