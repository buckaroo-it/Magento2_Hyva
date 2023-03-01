import IDeal from './src/method/IDeal';
import Creditcards from './src/method/Creditcards';
import Bancontact from './src/method/Bancontact';
import Giropay from './src/method/Giropay';
import Giftcards from './src/method/Giftcards';
import Afterpay from './src/method/Afterpay';
import Creditcard from './src/method/Creditcard';
import Applepay from './src/method/Applepay';
import Klarna from './src/method/Klarna';
import Default from './src/method/Default';
import SepaDirect from './src/method/SepaDirect/SepaDirect';
import PayPerEmail from './src/method/PayPerEmail';
import Tinka from './src/method/Tinka/Tinka';
import In3 from './src/method/In3';
import Billink from './src/method/Billink';
import Voucher from './src/method/Voucher/Voucher';
import AfterpayOld from './src/method/AfterpayOld/AfterpayOld';

export default {
  buckaroo_magento2_payconiq: Default,
  buckaroo_magento2_belfius: Default,
  buckaroo_magento2_sofortbanking: Default,
  buckaroo_magento2_alipay: Default,
  buckaroo_magento2_wechatpay: Default,
  buckaroo_magento2_trustly: Default,
  buckaroo_magento2_rtp: Default,
  buckaroo_magento2_paypal: Default,
  buckaroo_magento2_kbc: Default,
  buckaroo_magento2_eps: Default,
  buckaroo_magento2_transfer: Default,
  buckaroo_magento2_ideal: IDeal,
  buckaroo_magento2_idealprocessing: IDeal,
  buckaroo_magento2_creditcards: Creditcards,
  buckaroo_magento2_mrcash: Bancontact,
  buckaroo_magento2_giropay: Giropay,
  buckaroo_magento2_giftcards: Giftcards,
  buckaroo_magento2_afterpay20: Afterpay,
  buckaroo_magento2_afterpay: AfterpayOld,
  buckaroo_magento2_afterpay2: AfterpayOld,
  buckaroo_magento2_creditcard: Creditcard,
  buckaroo_magento2_applepay: Applepay,
  buckaroo_magento2_klarna: Klarna,
  buckaroo_magento2_klarnain: Klarna,
  buckaroo_magento2_klarnakp: Default,
  buckaroo_magento2_sepadirectdebit: SepaDirect,
  buckaroo_magento2_payperemail: PayPerEmail,
  buckaroo_magento2_tinka: Tinka,
  buckaroo_magento2_capayablein3: In3,
  buckaroo_magento2_p24: Default,
  buckaroo_magento2_billink: Billink,
  buckaroo_magento2_voucher: Voucher,
};
