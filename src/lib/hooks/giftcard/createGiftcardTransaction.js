import sendRequest from '@hyva/react-checkout/api/sendRequest';
import LocalStorage from '@hyva/react-checkout/utils/localStorage';

import modifier from './modifier';

export default async function createGiftcardTransaction(
  dispatch,
  giftcardCode,
  data
) {
  const { cardnumber, pin } = data;

  const variables = {
    cart_id: LocalStorage.getCartId(),
    card_number: cardnumber,
    card_pin: pin,
    giftcard_id: giftcardCode,
  };

  return modifier(
    await sendRequest(dispatch, {
      query: `
    mutation buckarooProcessGiftcardTransactionMutation($cart_id: String!, $card_number: String!, $card_pin:String!, $giftcard_id:String!) {
      setPaymentMethodOnCart(
        input: {
          cart_id: $cart_id
          payment_method: {
            code: "buckaroo_magento2_giftcards"
          }
        }
      ) { cart { email } }
      buckarooProcessGiftcardTransaction(
        input: {
          cart_id: $cart_id,
          card_number: $card_number,
          card_pin: $card_pin
          giftcard_id: $giftcard_id
        }
      ) {
        remainder_amount,
        already_paid,
        transaction {
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
