import LocalStorage from '@hyva/react-checkout/utils/localStorage';

export function IsCustomer() {
  return !!LocalStorage.getCustomerToken();
}
