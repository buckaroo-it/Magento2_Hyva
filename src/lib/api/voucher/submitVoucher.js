import sendRequest from '@hyva/react-checkout/api/sendRequest';
import LocalStorage from '@hyva/react-checkout/utils/localStorage';

import modifier from './modifier';

export default async function submitVoucher(dispatch, voucherCode) {
  const variables = {
    cart_id: LocalStorage.getCartId(),
    voucherCode,
  };

  return modifier(
    await sendRequest(dispatch, {
      query: `
    mutation buckarooProcessVoucherTransactionMutation($cart_id: String!, $voucherCode: String!) {
      setPaymentMethodOnCart(
        input: {
          cart_id: $cart_id
          payment_method: {
            code: "buckaroo_magento2_voucher"
          }
        }
      ) { cart { email } }
      buckarooProcessVoucherTransaction(
        input: {
          cart_id: $cart_id,
          voucher_code: $voucherCode
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
