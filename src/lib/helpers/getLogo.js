import RootElement from '@hyva/react-checkout/utils/rootElement';

export const logoPath = `${RootElement.getFilePath()}/Buckaroo_Magento2/images/svg`;

const logos = {
  afterpay2: 'afterpay',
  afterpay20: 'afterpay',
  capayablein3: 'in3',
  capayablepostpay: 'in3',
  creditcard: 'creditcards',
  creditcards: 'creditcards',
  giftcards: 'giftcards',
  idealprocessing: 'ideal',
  klarnain: 'klarna',
  klarnakp: 'klarna',
  mrcash: 'bancontact',
  p24: 'przelewy24',
  sepadirectdebit: 'sepa-directdebit',
  sofortbanking: 'sofort',
  emandate: 'emandate.png',
  pospayment: 'pos.png',
  transfer: 'sepa-credittransfer',
  voucher: 'vouchers',
};

export default function getLogo(methodCode) {
  let logoName = methodCode.replace('buckaroo_magento2_', '');

  if (logoName in logos) {
    logoName = logos[logoName];
  }

  return `${logoPath}/${logoName}.svg`;
}
