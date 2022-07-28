import sendRequest from '@hyva/react-checkout/api/sendRequest';
import LocalStorage from '@hyva/react-checkout/utils/localStorage';

import modifier from './modifier';

export default async function placeOrder(dispatch, code, additionalData) {
  const variables = { cartId: LocalStorage.getCartId() };

  let additionalDataQuery = '';

  if (additionalData != null && Object.keys(additionalData).length > 0) {
    const data = Object.keys(additionalData)
      .map((key) => `${key}: "${additionalData[key]}"`)
      .join(', \n');
    additionalDataQuery = `buckaroo_additional: {
      ${code} : { ${data}}
    }`;
  }

  return modifier(
    await sendRequest(dispatch, {
      query: `
    mutation setPaymentMethodAndPlaceOrderMutation($cartId: String!) {
      setPaymentMethodAndPlaceOrder(
        input: {
          cart_id: $cartId
          payment_method: {
            code: "${code}"
            ${additionalDataQuery}
          }
        }
      ) {
        order {
          order_number
          buckaroo_additional {
              redirect
          }
        }
      }
    }
    `,
      variables,
    })
  );
}
