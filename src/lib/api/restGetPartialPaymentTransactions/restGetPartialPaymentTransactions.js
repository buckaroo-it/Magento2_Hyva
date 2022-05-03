import RootElement from '@hyva/react-checkout/utils/rootElement';
import LocalStorage from '@hyva/react-checkout/utils/localStorage';
import sendRequest, {
  RESPONSE_JSON,
} from '@hyva/react-checkout/api/sendRequest';
import modifier from './modifier';

export default async function restGetPartialPaymentTransactions(appDispatch) {
  const cartId = LocalStorage.getCartId();
  const { restUrlPrefix } = RootElement.getPaymentConfig();
  const setPaymentMethodUrl = `${restUrlPrefix}buckaroo/${cartId}/giftcard/transactions`;

  return modifier(
    await sendRequest(appDispatch, {}, setPaymentMethodUrl, RESPONSE_JSON),
    appDispatch
  );
}
