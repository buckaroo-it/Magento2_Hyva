import React, { useCallback, useEffect, useState } from 'react';
import { func, shape, object } from 'prop-types';
import { set as _set, get as _get } from 'lodash-es';

import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import PlaceOrder from '@hyva/react-checkout/components/placeOrder';
import useCheckoutFormContext from '@hyva/react-checkout/hook/useCheckoutFormContext';
import useAppContext from '@hyva/react-checkout/hook/useAppContext';
import usePaymentMethodCartContext from '@hyva/react-checkout/components/paymentMethod/hooks/usePaymentMethodCartContext';
import usePaymentMethodFormContext from '@hyva/react-checkout/components/paymentMethod/hooks/usePaymentMethodFormContext';
import { __ } from '@hyva/react-checkout/i18n';
import useCartContext from '@hyva/react-checkout/hook/useCartContext';

import useOnSubmit from '../../lib/hooks/useOnSubmit';
import { ADDITIONAL_DATA_KEY } from '../../lib/helpers/AdditionalBuckarooDataKey';
import logo from '../../../assets/Giftcards.svg';
import { getConfig } from '../../../config';
import GiftcardItem from './GiftcardItem';
import usePartialPayment from '../../lib/helpers/PartialPayments/PartialPayment';
import onlyBuckaroo from '../../lib/helpers/PartialPayments/OnlyBuckarooPayments';
import usePlaceBuckarooOrder from '../../lib/helpers/PartialPayments/PlaceOrder';

function Giftcards({ method, selected, actions }) {
  const isSelected = method.code === selected.code;
  const { cart, setCartInfo } = useCartContext();
  const showAsList = getConfig('groupGiftcards') === '0';

  if (showAsList) {
    usePartialPayment();
  }
  const invoiceRadioInput = (
    <div className="title flex">
      <RadioInput
        value={method.code}
        label={method.title}
        name="paymentMethod"
        checked={isSelected}
        onChange={actions.change}
      />
      <img src={logo} className="w-12" alt={method.title} />
    </div>
  );

  const availableGiftcards = getConfig('avaibleGiftcards');

  const { registerPaymentAction } = useCheckoutFormContext();
  const { setErrorMessage } = useAppContext();
  const onSubmit = useOnSubmit();

  const defaultGiftcardCode = '';
  const [giftcardCode, setGiftcardCode] = useState(defaultGiftcardCode);
  const placeOrder = usePlaceBuckarooOrder();
  const [canPlaceOrder, setCanPlaceOrder] = useState(false);

  const {
    fields,
    formikData: { setFieldValue, setFieldTouched },
  } = usePaymentMethodFormContext();
  const { methodList } = usePaymentMethodCartContext();

  const placeOrderWithGiftcards = useCallback(
    async (values) => {
      if (showAsList && canPlaceOrder) {
        setErrorMessage(__('Cannot pay with giftcards'));
        return {};
      }
      _set(values, ADDITIONAL_DATA_KEY, {
        giftcard_method: giftcardCode,
      });
      return onSubmit(values);
    },
    [onSubmit, setErrorMessage, canPlaceOrder]
  );

  useEffect(() => {
    if (isSelected) {
      setCanPlaceOrder(
        cart.partial_payment && cart.partial_payment.remainder_amount === 0
      );
    }
  }, [cart, isSelected]);

  useEffect(() => {
    if (canPlaceOrder && isSelected) {
      placeOrder();
    }
  }, [canPlaceOrder, isSelected]);

  const giftcardCodeChange = async (selectedGiftcardCode) => {
    const methodSelected = _get(methodList, `${method.code}.code`);

    if (!methodSelected) {
      return;
    }

    await setFieldValue(fields.code, methodSelected);
    setFieldTouched(fields.code, true);
    setGiftcardCode(selectedGiftcardCode);
  };

  useEffect(() => {
    if (
      cart.partial_payment &&
      cart.partial_payment.transactions.length &&
      isSelected
    ) {
      setCartInfo({
        ...cart,
        available_payment_methods: {
          ...onlyBuckaroo(cart.available_payment_methods),
        },
      });
    }
  }, [cart.partial_payment, isSelected]);

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithGiftcards);
  }, [method, registerPaymentAction, placeOrderWithGiftcards]);

  if (!isSelected && !showAsList) {
    return invoiceRadioInput;
  }

  if (showAsList) {
    return availableGiftcards.map((giftcard) => (
      <GiftcardItem
        key={giftcard.code}
        giftcard={giftcard}
        selected={giftcard.code === giftcardCode && isSelected}
        giftcardCodeChange={giftcardCodeChange}
      />
    ));
  }
  return (
    <div id={selected.code}>
      {invoiceRadioInput}
      <PlaceOrder />
    </div>
  );
}

Giftcards.propTypes = {
  method: object.isRequired,
  selected: object.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default Giftcards;
