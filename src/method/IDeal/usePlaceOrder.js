import { useCallback } from 'react';
import { set as _set } from 'lodash-es';

import useOnSubmit from '../../lib/hooks/useOnSubmit';
import { ADDITIONAL_DATA_KEY } from '../../lib/helpers/additionalBuckarooDataKey';

export default function usePlaceOrder() {
  const onSubmit = useOnSubmit();

  return useCallback(
    (values) => {
      _set(values, ADDITIONAL_DATA_KEY, {});
      return onSubmit(values);
    },
    [onSubmit]
  );
}
