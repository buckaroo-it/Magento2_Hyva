import {
  string as YupString,
  addMethod as YupAddMethod,
  object as YupObject,
  bool as YupBool,
} from 'yup';

import { __ } from '@hyva/react-checkout/i18n';
import { getConfig } from '../../../config';

const config = getConfig('afterpay20') || {};

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

export function showCOC(cart) {
  return (
    config?.is_b2b === true &&
    ((cart.shipping_address &&
      cart.shipping_address.country === 'NL' &&
      cart.shipping_address.company &&
      cart.shipping_address.company.trim().length > 0) ||
      (cart.billing_address &&
        cart.billing_address.country === 'NL' &&
        cart.billing_address.company &&
        cart.billing_address.company.trim().length > 0))
  );
}

export function prepareValidationSchema(cart) {
  const requiredMessage = __('This is a required field.');
  return YupObject({
    telephone: YupString().required(requiredMessage),
    dob: YupString()
      .required(requiredMessage)
      .bkIs18years(__('You should be at least 18 years old.')),
    tos: YupBool().oneOf([true], requiredMessage),
    identificationNumber: YupString().when('isCompany', {
      is: () => cart.billing_address.country === 'FI',
      then: YupString().required(requiredMessage),
      otherwise: YupString(),
    }),
    coc: YupString().when('isb2b', {
      is: () => showCOC(cart),
      then: YupString().required(requiredMessage),
      otherwise: YupString(),
    }),
  });
}
