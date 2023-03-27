import { validationSchema } from './validators';
import { getConfig } from '../../../../config';

export { validationSchema };

export const yearStart = new Date().getFullYear();

export const range = (size, startAt = 0) =>
  [...Array(size).keys()].map((i) => i + startAt);

export const useClientSide = getConfig('mrcash.useClientSide');
