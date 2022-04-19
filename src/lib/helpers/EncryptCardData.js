import BuckarooClientSideEncryption from '../../../assets/lib/ClientSideEncryption001';

const encryptCardData = async ({
  cardholder,
  cardnumber,
  expirationmonth,
  expirationyear,
  cvc = '',
}) =>
  new Promise((resolve) => {
    BuckarooClientSideEncryption.V001.encryptCardData(
      cardnumber,
      expirationyear,
      expirationmonth,
      cvc,
      cardholder,
      resolve
    );
  });
export default encryptCardData;
