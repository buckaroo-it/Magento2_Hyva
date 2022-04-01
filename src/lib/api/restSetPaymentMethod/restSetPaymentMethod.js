import RootElement from '@hyva/react-checkout/utils/rootElement';
import sendRequest, {
  RESPONSE_TEXT,
} from '@hyva/react-checkout/api/sendRequest';
import modifier from './modifier';

export default async function restSetPaymentMethod(dispatch, paymentData) {
  const { restUrlPrefix } = RootElement.getPaymentConfig();
  const setPaymentMethodUrl = `${restUrlPrefix}carts/mine/set-payment-information`;

  const _paymentData = {
    ...paymentData,
    paymentMethod: {
      ...paymentData.paymentMethod,
      extension_attributes: { agreement_ids: [] },
    },
  };

  return modifier(
    await sendRequest(
      dispatch,
      _paymentData,
      setPaymentMethodUrl,
      RESPONSE_TEXT
    ),
    dispatch
  );
}