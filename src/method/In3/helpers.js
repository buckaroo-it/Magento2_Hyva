import {
  string as YupString,
  object as YupObject,
  addMethod as YupAddMethod,
} from 'yup';
import { __ } from '@hyva/react-checkout/i18n';

const requiredMessage = __('This is a required field.');

const isValidPhone = (value, countryId) => {
  const lengths = {
    NL: {
      min: 10,
      max: 12,
    },
    BE: {
      min: 9,
      max: 12,
    },
    DE: {
      min: 11,
      max: 14,
    },
  };
  if (!value) {
    return false;
  }

  /* eslint-disable no-param-reassign */
  value = value.replace(/^\+|(00)/, '');
  value = value.replace(/\(0\)|\s|-/g, '');

  if (value.match(/\+/)) {
    return false;
  }

  if (value.match(/[^0-9]/)) {
    return false;
  }
  /* eslint-enable no-param-reassign */

  if (Object.prototype.hasOwnProperty.call(lengths, countryId)) {
    if (lengths[countryId].min && value.length < lengths[countryId].min) {
      return false;
    }
    if (lengths[countryId].max && value.length > lengths[countryId].max) {
      return false;
    }
  }

  return true;
};

YupAddMethod(YupString, 'bkValidatePhone', function (data) {
  return this.test(`test-bkValidatePhone`, data, function (value) {
    const { path, createError } = this;

    return (
      isValidPhone(value, data.country) ||
      createError({ path, message: data.errorMessage })
    );
  });
});

export const validationSchema = (showPhone, country) =>
  YupObject({
    dob: YupString().required(requiredMessage),
    phone: YupString().when('showPhone', {
      is: () => showPhone,
      then: YupString()
        .required(requiredMessage)
        .bkValidatePhone({
          errorMessage: __('Phone number should be correct.'),
          country,
        }),
      otherwise: YupString(),
    }),
  });
