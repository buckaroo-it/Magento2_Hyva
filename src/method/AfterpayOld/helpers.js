import {
  string as YupString,
  addMethod as YupAddMethod,
  object as YupObject,
  bool as YupBool,
} from 'yup';

import { __ } from '@hyva/react-checkout/i18n';
import { getConfig } from '../../../config';
import { isValidIBAN } from '../../lib/helpers/isValidIBAN';

const calculateAge = (specifiedDate) => {
  if (specifiedDate && specifiedDate.length > 0) {
    const birthday = +new Date(
      specifiedDate.substr(0, 4),
      specifiedDate.substr(5, 2) - 1,
      specifiedDate.substr(8, 2),
      0,
      0,
      0
    );

    const ageDate = new Date(Date.now() - birthday);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  return 0;
};

const isOnlyNumeric = (value) => {
  if (value === undefined || value === null) {
    return false;
  }
  return !value.match(/[^0-9]/);
};

YupAddMethod(YupString, 'bkOnlyNumeric', function (errorMessage) {
  return this.test(`bk-only-numeric`, errorMessage, function (value) {
    const { path, createError } = this;

    return isOnlyNumeric(value) || createError({ path, message: errorMessage });
  });
});

YupAddMethod(YupString, 'bkValidateBankNumber', function (errorMessage) {
  return this.test(`test-bkValidateBankNumber`, errorMessage, function (value) {
    const { path, createError } = this;

    return isValidIBAN(value) || createError({ path, message: errorMessage });
  });
});

YupAddMethod(YupString, 'bkIs18years', function (errorMessage) {
  return this.test(`bk-is-18-years`, errorMessage, function (value) {
    const { path, createError } = this;

    return (
      calculateAge(value) > 18 || createError({ path, message: errorMessage })
    );
  });
});

export function determineTosLink(country) {
  let tosCountry = 'en_nl';

  switch (country) {
    case 'DE':
      tosCountry = 'de_de';
      break;
    case 'AT':
      tosCountry = 'de_at';
      break;
    case 'NL':
      tosCountry = 'nl_nl';
      break;
    case 'BE':
      tosCountry = 'nl_be';
      break;
    case 'FI':
      tosCountry = 'fi_fi';
      break;
    case 'FR_BE':
      tosCountry = 'fr_be';
      break;
    default:
      tosCountry = 'en_nl';
      break;
  }

  return `https://documents.myafterpay.com/consumer-terms-conditions/${tosCountry}/`;
}

export function canShowPhone(cart) {
  const phone = cart?.billing_address?.phone;
  return phone === null || phone === undefined || phone.trim().length === 0;
}

const getConfigValue = (paymentMethod) => {
  return getConfig(paymentMethod) || {};
};

export function isAcceptgiro(paymentMethod) {
  return getConfigValue(paymentMethod)?.paymentMethod === 1;
}

export function isDigiAccept(paymentMethod) {
  return getConfigValue(paymentMethod)?.paymentMethod === 2;
}

export function isB2B(paymentMethod, selectedBusinessType) {
  const businessMethod = getConfigValue(paymentMethod)?.businessMethod;
  return (
    businessMethod === 2 ||
    (businessMethod === 3 && selectedBusinessType === 'b2b')
  );
}

export function areBothBusinessMethod(paymentMethod) {
  return getConfigValue(paymentMethod)?.businessMethod === 3;
}

export function getBusinessModels() {
  return [
    {
      name: __('B2C - Business to Consumer'),
      value: 'b2c',
    },
    {
      name: __('B2B - Business to Business'),
      value: 'b2b',
    },
  ];
}

export function prepareValidationSchema(cart, paymentMethod) {
  const requiredMessage = __('This is a required field.');
  const onlyNumeric = __('This field is invalid');
  return YupObject({
    telephone: YupString().when('canShowPhone', {
      is: () => canShowPhone(cart),
      then: () =>
        YupString().required(requiredMessage).bkOnlyNumeric(onlyNumeric),
      otherwise: () => YupString(),
    }),
    dob: YupString()
      .required(requiredMessage)
      .bkIs18years(__('You should be at least 18 years old.')),
    tos: YupBool().oneOf([true], requiredMessage),
    businessType: YupString().oneOf(['b2b', 'b2c'], requiredMessage),
    coc: YupString().when('aaa', {
      is: () => isDigiAccept(paymentMethod),
      then: () =>
        YupString().required(requiredMessage).bkOnlyNumeric(onlyNumeric),
      otherwise: () => YupString(),
    }),
    iban: YupString().when('businessType', {
      is: (fields) => isB2B(paymentMethod, fields),
      then: () =>
        YupString()
          .required(requiredMessage)
          .bkValidateBankNumber(__('Please enter a valid account number')),
      otherwise: () => YupString(),
    }),
    companyName: YupString().when('businessType', {
      is: (fields) => isB2B(paymentMethod, fields),
      then: () => YupString().required(requiredMessage),
      otherwise: () => YupString(),
    }),
  });
}
