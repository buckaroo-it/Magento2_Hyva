import { get as _get } from 'lodash-es';

export default function modifyPlaceOrder(result) {
  const errors = _get(result, 'errors', undefined);
  console.warn(errors);
  if (errors !== undefined) {
    return errors;
  }
  return _get(result, 'data.buckarooProcessGiftcardTransaction', {});
}
