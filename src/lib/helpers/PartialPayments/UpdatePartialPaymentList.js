export default function useUpdatePartialPaymentList(
  { cart, setCartInfo },
  paymentResponse
) {
  const {
    remainder_amount: remainderAmount,
    already_paid: alreadyPaid,
    transaction,
  } = paymentResponse;

  let partialPayment = {
    transactions: [transaction],
    remainder_amount: remainderAmount,
    already_paid: alreadyPaid,
  };

  if (cart.partial_payment) {
    partialPayment = {
      ...partialPayment,
      transactions: [...cart.partial_payment.transactions, transaction],
    };
  }

  setCartInfo({
    ...cart,
    partial_payment: partialPayment,
  });
}
