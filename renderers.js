import IDeal from './src/method/IDeal';
import Creditcards from './src/method/Creditcards';
import Bancontact from './src/method/Bancontact';
import Giropay from './src/method/Giropay';
import Giftcards from './src/method/Giftcards';
import Afterpay from './src/method/Afterpay';
import Creditcard from './src/method/Creditcard';
import Applepay from './src/method/Applepay';
import Default from './src/method/Default';

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
  buckaroo_magento2_creditcards: Creditcards,
  buckaroo_magento2_mrcash: Bancontact,
  buckaroo_magento2_giropay: Giropay,
  buckaroo_magento2_giftcards: Giftcards,
  buckaroo_magento2_afterpay20: Afterpay,
  buckaroo_magento2_creditcard: Creditcard,
  buckaroo_magento2_applepay: Applepay,

  // buckaroo_magento2_klarna: Default,
  // buckaroo_magento2_klarnain: Default,
  // buckaroo_magento2_klarnakp: Default,
  // buckaroo_magento2_sepadirectdebit: Default,
  // buckaroo_magento2_payperemail: Default,
  // buckaroo_magento2_capayablein3: Default,
  // buckaroo_magento2_tinka: Default,
};
