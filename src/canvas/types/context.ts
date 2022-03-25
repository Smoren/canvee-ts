import { PositionalDrawableInterface } from './drawable';
import { VectorArrayType } from '../structs/vector/types';

/**
 * Interface for positional context
 */
export default interface PositionalContextInterface {
  element: PositionalDrawableInterface | null;
  position: VectorArrayType | null;

  isEmpty(): boolean;
}
