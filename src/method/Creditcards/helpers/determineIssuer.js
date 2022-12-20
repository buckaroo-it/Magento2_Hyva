export default function determineIssuer(cardnumber) {
  const issuerIdentificationNumbers = {
    amex: '^3[47][0-9]{13}$',
    maestro: '^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$',
    dankort: '^(5019|4571)[0-9]{12}$',
    mastercard: '^(5[1-5]|2[2-7])[0-9]{14}$',
    visaelectron:
      '^(4026[0-9]{2}|417500|4508[0-9]{2}|4844[0-9]{2}|4913[0-9]{2}|4917[0-9]{2})[0-9]{10}$',
    visa: '^4[0-9]{12}(?:[0-9]{3})?$',
  };
  const foundIssuers = [];
  Object.keys(issuerIdentificationNumbers).forEach((issuer) => {
    if (cardnumber.match(issuerIdentificationNumbers[issuer])) {
      foundIssuers.push(issuer);
    }
  });
  if (foundIssuers.length) {
    return foundIssuers.pop();
  }
  return null;
}
