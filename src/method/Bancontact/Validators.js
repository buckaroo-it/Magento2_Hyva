import {
  string as YupString,
  addMethod as YupAddMethod,
  object as YupObject,
} from 'yup';
import { __ } from '@hyva/react-checkout/i18n';

import BuckarooClientSideEncryption from '../../../assets/lib/ClientSideEncryption001';

YupAddMethod(YupString, 'bkValidateCardholderName', function (errorMessage) {
  return this.test(
    `test-validateCardholderName`,
    errorMessage,
    function (value) {
      const { path, createError } = this;

      return (
        BuckarooClientSideEncryption.V001.validateCardholderName(value) ||
        createError({ path, message: errorMessage })
      );
    }
  );
});
YupAddMethod(YupString, 'bkValidateCardNumber', function (errorMessage) {
  return this.test(`test-validateCardNumber`, errorMessage, function (value) {
    const { path, createError } = this;

    return (
      BuckarooClientSideEncryption.V001.validateCardNumber(value) ||
      createError({ path, message: errorMessage })
    );
  });
});
YupAddMethod(YupString, 'bkValidateMonth', function (errorMessage) {
  return this.test(`test-validateMonth`, errorMessage, function (value) {
    const { path, createError } = this;

    return (
      BuckarooClientSideEncryption.V001.validateMonth(value) ||
      createError({ path, message: errorMessage })
    );
  });
});
YupAddMethod(YupString, 'bkValidateYear', function (errorMessage) {
  return this.test(`test-validateYear`, errorMessage, function (value) {
    const { path, createError } = this;

    return (
      BuckarooClientSideEncryption.V001.validateYear(value) ||
      createError({ path, message: errorMessage })
    );
  });
});

export const validationSchema = YupObject({
  cardholder: YupString().bkValidateCardholderName(
    __('Please enter a valid cardholder name')
  ),
  cardnumber: YupString().bkValidateCardNumber(
    __('Please enter a valid card number')
  ),
  expirationmonth: YupString().bkValidateMonth(
    __('Please enter a valid month')
  ),
  expirationyear: YupString().bkValidateYear(__('Please enter a valid year')),
});
