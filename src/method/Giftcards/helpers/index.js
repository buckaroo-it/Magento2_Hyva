import { object as YupObject, string as YupString } from 'yup';
import { __ } from '@hyva/react-checkout/i18n';
import { getConfig } from '../../../../config';

const requiredMessage = __('This is a required field.');

export const showAsList = getConfig('groupGiftcards') === '0';
export const availableGiftcards = getConfig('avaibleGiftcards') || [];

export const validationSchema = YupObject({
  cardnumber: YupString().required(requiredMessage),
  pin: YupString().required(requiredMessage),
});
