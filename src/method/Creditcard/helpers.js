import { object as YupObject, string as YupString } from 'yup';

import { __ } from '@hyva/react-checkout/i18n';

import { getConfig } from '../../../config';

const { selectionType, cards } = getConfig('creditcard');

const getCards = () => {
  if (Array.isArray(cards)) {
    return cards.map((card) => ({
      name: card.name,
      value: card.code,
    }));
  }
  return [];
};

export const validationSchema = YupObject({
  cardType: YupString().required(__('This is a required field.')),
});

export { selectionType, getCards };
