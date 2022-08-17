export default function useUpdatePartialPaymentList(
  { cart, setCartInfo },
  paymentResponse
) {
  const {
    remainder_amount: remainderAmount,
    already_paid: alreadyPaid,
    transaction,
    available_payment_methods: availablePaymentMethods,
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

  const formatedPaymentMethods = {};
  availablePaymentMethods.forEach((method) => {
    formatedPaymentMethods[method.code] = method;
  });

  setCartInfo({
    ...cart,
    available_payment_methods: {
      ...formatedPaymentMethods,
    },
    partial_payment: partialPayment,
  });
}
