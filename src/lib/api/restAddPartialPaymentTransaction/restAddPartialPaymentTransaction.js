import RootElement from '@hyva/react-checkout/utils/rootElement';
import LocalStorage from '@hyva/react-checkout/utils/localStorage';
import sendRequest, {
  RESPONSE_JSON,
} from '@hyva/react-checkout/api/sendRequest';
import modifier from './modifier';

export default async function restAddPartialPaymentTransaction(
  appDispatch,
  giftcardCode,
  data
) {
  const cartId = LocalStorage.getCartId();
  const { restUrlPrefix } = RootElement.getPaymentConfig();
  const setPaymentMethodUrl = `${restUrlPrefix}buckaroo/${cartId}/giftcard/${giftcardCode}/pay`;
  const { cardnumber, pin } = data;

  return modifier(
    await sendRequest(
      appDispatch,
      { payment: { card_number: cardnumber, card_pin: pin } },
      setPaymentMethodUrl,
      RESPONSE_JSON
    ),
    appDispatch
  );
}
