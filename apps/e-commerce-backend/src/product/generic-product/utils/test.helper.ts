import { GenericProduct } from '../entities';

export function createGenericProduct(
  name: string,
  description: string,
  basePrice: number,
) {
  return new GenericProduct(name, description, basePrice);
}
