import { useCallback } from 'react';
import { __ } from '@hyva/react-checkout/i18n';

import usePaymentMethodAppContext from '@hyva/react-checkout/components/paymentMethod/hooks/usePaymentMethodAppContext';
import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import { formatPrice } from '@hyva/react-checkout/utils/price';
import createGiftcardTransaction from '../../../lib/hooks/giftcard/createGiftcardTransaction';
import usePlaceBuckarooOrder from './usePlaceOrder';

const format = (paymentResponse, partialPayment) => {
  if (paymentResponse === undefined || paymentResponse === null) {
    return {};
  }
  const {
    remainder_amount: remainderAmount,
    already_paid: alreadyPaid,
    available_payment_methods: availablePaymentMethods,
    transaction,
  } = paymentResponse;

  const transactions = partialPayment?.transactions || [];
  if (transactions.find((tr) => tr === transaction) === undefined) {
    return {
      remainder_amount: remainderAmount,
      already_paid: alreadyPaid,
      available_payment_methods: availablePaymentMethods,
      transactions: [...transactions, transaction],
    };
  }
  return {};
};

export default function useOnGiftcardSubmit(
  giftcardCode,
  partialPayment,
  emit
) {
  const { setPageLoader, setSuccessMessage, setErrorMessage } =
    usePaymentMethodAppContext();
  const { appDispatch } = useAppContext();
  const placeOrder = usePlaceBuckarooOrder();

  return useCallback(
    async (values, { resetForm }) => {
      setPageLoader(true);
      const response = await createGiftcardTransaction(
        appDispatch,
        giftcardCode,
        values
      ).catch(() => setPageLoader(false));
      setPageLoader(false);

      const formatedResponse = format(response, partialPayment);
      if (formatedResponse.transactions) {
        emit(formatedResponse);
      }

      resetForm();

      if (response?.transaction) {
        if (response.remainder_amount !== 0) {
          setSuccessMessage(
            __(
              `A partial payment of %1 was successfully performed on a requested amount. Remainder amount %1`,
              formatPrice(response.transaction.amount),
              formatPrice(response.remainder_amount)
            )
          );
        } else {
          placeOrder();
        }
      } else {
        setErrorMessage('Cannot apply giftcard');
      }
    },
    [
      appDispatch,
      setPageLoader,
      setSuccessMessage,
      setErrorMessage,
      giftcardCode,
      placeOrder,
      partialPayment,
      emit,
    ]
  );
}

// import { useCallback } from 'react';
// import { __ } from '@hyva/react-checkout/i18n';

// import usePaymentMethodAppContext from '@hyva/react-checkout/components/paymentMethod/hooks/usePaymentMethodAppContext';
// import useAppContext from '@hyva/react-checkout/hook/useAppContext';
// import useCartContext from '@hyva/react-checkout/hook/useCartContext';
// import { formatPrice } from '@hyva/react-checkout/utils/price';
// import createGiftcardTransaction from '../../../lib/hooks/giftcard/createGiftcardTransaction';
// import usePlaceBuckarooOrder from './usePlaceOrder';

// const updatePartialPaymentList = (
//   setCartInfo,
//   partialPayment,
//   paymentResponse
// ) => {
//   if (paymentResponse === undefined || paymentResponse === null) {
//     return;
//   }
//   const {
//     remainder_amount: remainderAmount,
//     already_paid: alreadyPaid,
//     transaction,
//     available_payment_methods: availablePaymentMethods,
//   } = paymentResponse;

//   const formatedPaymentMethods = {};
//   availablePaymentMethods.forEach((method) => {
//     formatedPaymentMethods[method.code] = method;
//   });

//   if (partialPayment !== undefined) {
//     if (
//       partialPayment.transactions.find((tr) => tr === transaction) === undefined
//     ) {
//       setCartInfo({
//         partial_payment: {
//           remainder_amount: remainderAmount,
//           already_paid: alreadyPaid,
//           transactions: [...partialPayment.transactions, transaction],
//         },
//       });
//     }
//   } else {
//     setCartInfo({
//       available_payment_methods: {
//         ...formatedPaymentMethods,
//       },
//       partial_payment: {
//         transactions: [transaction],
//         remainder_amount: remainderAmount,
//         already_paid: alreadyPaid,
//       },
//     });
//   }
// };

// export default function useOnGiftcardSubmit(giftcardCode) {
//   const { cart, setCartInfo } = useCartContext();
//   const { setPageLoader, setSuccessMessage, setErrorMessage } =
//     usePaymentMethodAppContext();
//   const { appDispatch } = useAppContext();
//   const placeOrder = usePlaceBuckarooOrder();

//   return useCallback(
//     async (values, { resetForm }) => {
//       setPageLoader(true);
//       const response = await createGiftcardTransaction(
//         appDispatch,
//         giftcardCode,
//         values
//       ).catch(() => setPageLoader(false));
//       setPageLoader(false);

//       updatePartialPaymentList(setCartInfo, cart?.partial_payment, response);
//       resetForm();

//       if (response?.transaction) {
//         if (response.remainder_amount !== 0) {
//           setSuccessMessage(
//             __(
//               `A partial payment of %1 was successfully performed on a requested amount. Remainder amount %1`,
//               formatPrice(response.transaction.amount),
//               formatPrice(response.remainder_amount)
//             )
//           );
//         } else {
//           placeOrder();
//         }
//       } else {
//         setErrorMessage('Cannot apply giftcard');
//       }
//     },
//     [
//       appDispatch,
//       setPageLoader,
//       setCartInfo,
//       cart,
//       setSuccessMessage,
//       setErrorMessage,
//       giftcardCode,
//       placeOrder,
//     ]
//   );
// }
