export default function onlyBuckaroo(availablePaymentMethods) {
  const newAvailablePaymentMethods = {};
  Object.keys(availablePaymentMethods).forEach((key) => {
    if (key.startsWith('buckaroo_magento2')) {
      newAvailablePaymentMethods[key] = {
        ...availablePaymentMethods[key],
      };
    }
  });
  return newAvailablePaymentMethods;
}
