import { string as YupString, object as YupObject } from 'yup';
import { __ } from '@hyva/react-checkout/i18n';

import { getConfig } from '../../../config';

export const validationSchema = YupObject({
  gender: YupString().required(__('Please select a gender')),
});

const config = getConfig('klarna') || {};

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
