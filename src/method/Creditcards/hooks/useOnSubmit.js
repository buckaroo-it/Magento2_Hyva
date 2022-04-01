/* eslint-disable */
import _get from 'lodash.get';
import { GetBuckarooPaymentInformation } from '../../../lib/BuckarooPaymentMethod';
import BuckarooClientSideEncryption from '../../../../assets/lib/ClientSideEncryption001';

export default function useOnSubmit() {
  const paymentSubmitHandler = async (values, dispatch, data) => {
    const method = _get(values, 'payment_method.code', null);
    const billingAddress = _get(values, 'billing_address', null);
    const email = _get(values, 'login.email', null);

    const {
      issuer,
      cardholder,
      cardnumber,
      cardmonth,
      cardyear,
      securitycode,
    } = data;

    // Promisify the BuckarooClientSideEncryption
    let encrypteddata = await (new Promise((resolve, reject) => {
        BuckarooClientSideEncryption.V001.encryptCardData(
            cardnumber,
            cardyear,
            cardmonth,
            securitycode,
            cardholder,
          resolve
        );
    }));

    let outdata = {
        customer_creditcardcompany: issuer,
        customer_encrypteddata: encrypteddata
    };

    GetBuckarooPaymentInformation(
      dispatch,
      method,
      outdata,
      billingAddress,
      email
    );
  };

  return { paymentSubmitHandler };
}
