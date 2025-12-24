import useCartContext from '@hyva/react-checkout/hook/useCartContext';
import { useEffect, useMemo } from 'react';
import getGiftcardList from './giftcard_list/getGiftcardList';

const formatPaymentMethods = (paymentMethods) => {
  const formatedPaymentMethods = {};
  paymentMethods.forEach((method) => {
    formatedPaymentMethods[method.code] = method;
  });

  return formatedPaymentMethods;
};

const formatPayResponse = (paymentResponse) => {
  const {
    remainder_amount: remainderAmount,
    already_paid: alreadyPaid,
    available_payment_methods: availablePaymentMethods,
    transaction,
  } = paymentResponse;
  return {
    remainderAmount,
    alreadyPaid,
    availablePaymentMethods,
    transaction,
  };
};

export default function usePartialPayment() {
  const { appDispatch, setCartInfo, cart } = useCartContext();
  const cartPartialPayment = cart?.partialPayment;

  const formatedPaymentMethods = useMemo(() => {
    const newAvailablePaymentMethods =
      cartPartialPayment?.available_payment_methods || [];
    return formatPaymentMethods(newAvailablePaymentMethods);
  }, [cartPartialPayment]);

  const cartLoaded = cart.loaded;

  useEffect(() => {
    if (Object.keys(formatedPaymentMethods).length > 0 && cartLoaded) {
      setCartInfo({
        available_payment_methods: {
          ...formatedPaymentMethods,
        },
      });
    }
  }, [formatedPaymentMethods, setCartInfo, cartLoaded]);

  useEffect(() => {
    const initState = async () => {
      if (cartPartialPayment === undefined && cartLoaded) {
        setCartInfo({
          partialPayment: {
            ...(await getGiftcardList(appDispatch)),
          },
        });
      }
    };
    initState();
  }, [appDispatch, setCartInfo, cartPartialPayment, cartLoaded]);

  const updatePartialPayment = (paymentResponse) => {
    const {
      remainderAmount,
      alreadyPaid,
      availablePaymentMethods,
      transaction,
    } = formatPayResponse(paymentResponse);

    const transactions = cartPartialPayment?.transactions || [];

    if (transactions.find((tr) => tr === transaction) === undefined) {
      setCartInfo({
        partialPayment: {
          remainder_amount: remainderAmount,
          already_paid: alreadyPaid,
          available_payment_methods: availablePaymentMethods,
          transactions: [...transactions, transaction],
        },
      });
    }
  };

  const fetchPartialPayment = async () => {
    setCartInfo({
      partialPayment: {
        ...(await getGiftcardList(appDispatch)),
      },
    });
  };

  return {
    cartPartialPayment,
    updatePartialPayment,
    fetchPartialPayment,
  };
}
