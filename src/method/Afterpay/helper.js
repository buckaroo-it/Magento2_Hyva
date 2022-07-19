import { string as YupString, addMethod as YupAddMethod } from 'yup';

const calculateAge = function (specifiedDate) {
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

export function showCOC(isB2B, cart) {
  return (
    isB2B === true &&
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
