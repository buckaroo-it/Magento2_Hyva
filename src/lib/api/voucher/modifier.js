import { get as _get } from 'lodash-es';

export default function modifyPlaceOrder(result) {
  const errors = _get(result, 'errors', undefined);
  if (errors !== undefined) {
    return errors;
  }
  return _get(result, 'data.buckarooProcessVoucherTransaction', errors);
}
