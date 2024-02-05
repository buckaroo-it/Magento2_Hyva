import { string as YupString, object as YupObject, bool as YupBool } from 'yup';
import { __ } from '@hyva/react-checkout/i18n';
import { getConfig } from '../../../config';

const requiredMessage = __('This is a required field.');
const config = getConfig('billink') || {};

export const isB2b = () => config?.b2b === true;

export const validationSchema = (showDob) => {
  const showB2b = isB2b();
  return YupObject({
    tos: YupBool().oneOf([true], requiredMessage),
    coc: YupString().when('showB2b', {
      is: () => showB2b,
      then: () => YupString().required(requiredMessage),
      otherwise: () => YupString(),
    }),
    phone: YupString().when('showB2b', {
      is: () => !showB2b,
      then: () => YupString().required(requiredMessage),
      otherwise: () => YupString(),
    }),
    gender: YupString().when('showDob', {
      is: () => showDob,
      then: () => YupString().required(requiredMessage),
      otherwise: () => YupString(),
    }),
    dob: YupString().when('showDob', {
      is: () => showDob,
      then: () => YupString().required(requiredMessage),
      otherwise: () => YupString(),
    }),
  });
};

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

export function determineTosLink() {
  return 'https://www.billink.nl/app/uploads/2021/05/Gebruikersvoorwaarden-Billink_V11052021.pdf';
}
