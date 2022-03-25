import {
  PositionalContextInterface,
  PositionalDrawableInterface,
  VectorArrayType,
} from '../../types';

/**
 * PositionalContext class
 */
export default class PositionalContext implements PositionalContextInterface {
  /**
   * Element in context
   */
  public element: PositionalDrawableInterface | null = null;
  /**
   * Relative event position's coords
   */
  public position: VectorArrayType | null = null;

  /**
   * PositionalContext constructor
   * @param element - element in context
   * @param position - relative context position
   */
  constructor(element: PositionalDrawableInterface | null, position: VectorArrayType | null) {
    this.element = element;
    this.position = position;
  }

  /**
   * Returns true if context is empty
   */
  public isEmpty(): boolean {
    return this.element === null;
  }
}
