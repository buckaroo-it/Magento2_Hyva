import ideal from '../../../assets/Ideal.svg';
import creditcards from '../../../assets/Creditcards.svg';
import paypal from '../../../assets/Paypal.svg';
import kbc from '../../../assets/Kbc.svg';
import mrcash from '../../../assets/Bancontact.svg';
import giropay from '../../../assets/Giropay.svg';
import giftcards from '../../../assets/Giftcards.svg';
import eps from '../../../assets/EPS.svg';
import transfer from '../../../assets/sepa-credittransfer.svg';
import sepadirectdebit from '../../../assets/sepa-directdebit.svg';
import afterpay20 from '../../../assets/AfterPay.svg';
import applepay from '../../../assets/Applepay.svg';

import payconiq from '../../../assets/Payconiq.svg';
import belfius from '../../../assets/Belfius.svg';
import sofortbanking from '../../../assets/Sofort.svg';
import alipay from '../../../assets/Alipay.svg';
import wechatpay from '../../../assets/WeChatPay.svg';
import trustly from '../../../assets/Trustly.svg';
import rtp from '../../../assets/RequestToPay.svg';

import klarna from '../../../assets/klarna.svg';
import payperemail from '../../../assets/payperemail.svg';
import capayablein3 from '../../../assets/in3.svg';
import tinka from '../../../assets/tinka.svg';
import przelewy24 from '../../../assets/przelewy24.svg';
import billink from '../../../assets/billink.svg';

const logos = {
  ideal,
  idealprocessing: ideal,
  creditcards,
  paypal,
  kbc,
  mrcash,
  giropay,
  giftcards,
  eps,
  transfer,
  afterpay20,
  afterpay2: afterpay20,
  afterpay: afterpay20,
  creditcard: creditcards,
  applepay,
  payconiq,
  belfius,
  sofortbanking,
  alipay,
  wechatpay,
  trustly,
  rtp,
  klarna,
  klarnain: klarna,
  klarnakp: klarna,
  sepadirectdebit,
  payperemail,
  capayablein3,
  tinka,
  p24: przelewy24,
  billink,
};

export default function getLogo(methodCode) {
  const logoName = methodCode.replace('buckaroo_magento2_', '');
  if (logoName in logos) {
    return logos[logoName];
  }
  return undefined;
}
