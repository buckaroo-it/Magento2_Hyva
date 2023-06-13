import {
  string as YupString,
  object as YupObject,
  addMethod as YupAddMethod,
} from 'yup';
import { __ } from '@hyva/react-checkout/i18n';

import { isValidIBAN } from '../../lib/helpers/isValidIBAN';

const isValidBic = (value) => {
  const regex = /^([a-zA-Z]){4}([a-zA-Z]){2}([0-9a-zA-Z]){2}([0-9a-zA-Z]{3})?$/;
  return regex.test(value);
};

const isValidHolder = (value) => String(value).split(' ').length >= 2;

YupAddMethod(YupString, 'bkValidateBankNumber', function (errorMessage) {
  return this.test(`test-bkValidateBankNumber`, errorMessage, function (value) {
    const { path, createError } = this;

    return isValidIBAN(value) || createError({ path, message: errorMessage });
  });
});

YupAddMethod(YupString, 'bkValidateBic', function (errorMessage) {
  return this.test(`test-bkValidateBic`, errorMessage, function (value) {
    const { path, createError } = this;

    return isValidBic(value) || createError({ path, message: errorMessage });
  });
});

YupAddMethod(YupString, 'bkValidateHolderName', function (errorMessage) {
  return this.test(`test-bkValidateHolderName`, errorMessage, function (value) {
    const { path, createError } = this;

    return isValidHolder(value) || createError({ path, message: errorMessage });
  });
});

export const validationSchema = (isNotNL) => {
  const requiredMessage = __('This is a required field.');
  return YupObject({
    bankAccountHolder: YupString()
      .required(requiredMessage)
      .bkValidateHolderName(__('Please enter at least 2 words')),
    bankAccountNumber: YupString()
      .required(requiredMessage)
      .bkValidateBankNumber(__('Please enter a valid account number')),
    bic: YupString().when([], {
      is: () => isNotNL,
      then: () =>
        YupString()
          .required(requiredMessage)
          .bkValidateBic(__('Please enter a valid bic number')),
      otherwise: () => YupString(),
    }),
  });
};
