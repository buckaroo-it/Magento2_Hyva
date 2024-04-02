import determineIssuer from './determineIssuer';
import { getConfig } from '../../../../config';

const creditCardsConfig = getConfig('buckaroo_magento2_creditcards') || {};

const mapIssuer = (issuer) => ({
  name: issuer.name,
  value: issuer.code,
});

export const getIssuers = () => {
  if (Array.isArray(creditCardsConfig.creditcards)) {
    return creditCardsConfig.creditcards.map(mapIssuer);
  }
  return [];
};

export const getFirstCard = () => {
  if (
    Array.isArray(creditCardsConfig.creditcards) &&
    creditCardsConfig.creditcards.length > 0
  ) {
    return creditCardsConfig.creditcards[0].code;
  }
  return null;
};

export const yearStart = new Date().getFullYear();
export const range = (size, startAt = 0) =>
  [...Array(size).keys()].map((i) => i + startAt);

export { determineIssuer };
