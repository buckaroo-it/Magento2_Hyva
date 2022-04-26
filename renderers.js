import IDeal from './src/method/IDeal';
import Creditcards from './src/method/Creditcards';
import PayPal from './src/method/PayPal';
import Bancontact from './src/method/Bancontact';
import Giropay from './src/method/Giropay';

export default {
  buckaroo_magento2_ideal: IDeal,
  buckaroo_magento2_creditcards: Creditcards,
  buckaroo_magento2_paypal: PayPal,
  buckaroo_magento2_mrcash: Bancontact,
  buckaroo_magento2_giropay: Giropay,
};
