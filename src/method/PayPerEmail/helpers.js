import { string as YupString, object as YupObject } from 'yup';
import { __ } from '@hyva/react-checkout/i18n';
import { getConfig } from '../../../config';

const requiredMessage = __('This is a required field.');

export const validationSchema = YupObject({
  firstName: YupString().required(requiredMessage),
  lastName: YupString().required(requiredMessage),
  email: YupString().required(requiredMessage),
  gender: YupString().required(requiredMessage),
});

const config = getConfig('payperemail') || {};

const mapGenders = (genderObject) => ({
  name: genderObject.genderTitle,
  value: genderObject.genderType,
});

export function getGenderList() {
  if (Array.isArray(config.genderList)) {
    return config.genderList.map(mapGenders);
  }
  return [];
}
