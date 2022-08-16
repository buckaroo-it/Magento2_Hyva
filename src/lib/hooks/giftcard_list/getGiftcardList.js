import sendRequest from '@hyva/react-checkout/api/sendRequest';
import LocalStorage from '@hyva/react-checkout/utils/localStorage';

import modifier from './modifier';

export default async function getGiftcardList(dispatch) {
  const variables = {
    cart_id: LocalStorage.getCartId(),
  };

  return modifier(
    await sendRequest(dispatch, {
      query: `query buckarooProcessGiftcardTransactionMutation($cart_id: String!) {
        getBuckarooGiftcardTransactions(
              cart_id: $cart_id,
      ) {
        remainder_amount,
        already_paid,
        transactions {
          amount,
          currency,
          name,
          transaction_id
        },
        available_payment_methods {
          title,
          code
        }
      }
    }
    `,
      variables,
    })
  );
}
