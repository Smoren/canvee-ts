import { DrawableStorageInterface, DrawerInterface, PositionalDrawableInterface, VectorArrayType } from '../types';
import { isPositional } from '../helpers/type-helpers';

/**
 * CurrentElementManager class
 */
export default class ElementContext {
  public element: PositionalDrawableInterface | null = null;
  public position: VectorArrayType | null = null;

  protected _drawer: DrawerInterface;
  protected _storage: DrawableStorageInterface;

  /**
   * CurrentElementManager constructor
   * @param drawer - drawer
   * @param storage - storage
   */
  constructor(drawer: DrawerInterface, storage: DrawableStorageInterface) {
    this._drawer = drawer;
    this._storage = storage;
  }

  /**
   * Search
   * @param mouseCoords - mouse coords
   */
  public search(mouseCoords: VectorArrayType): ElementContext {
    const transposedCoords: VectorArrayType = this._drawer.viewConfig.transposeForward(mouseCoords);

    const list = this._storage.list;
    for (let i=list.length-1; i>=0; --i) {
      const item = list[i];
      // TODO maybe only visible?
      if (isPositional(item) && (item as PositionalDrawableInterface).boundIncludes(transposedCoords)) {
        this.element = (item as PositionalDrawableInterface);
        this.position = this.element.getRelativePosition(transposedCoords);
        return this;
      }
    }

    this.lose();
    return this;
  }

  /**
   * Lose element
   */
  public lose() {
    this.element = null;
    this.position = null;
  }

  /**
   * If element has been found
   */
  public found(): boolean {
    return this.element !== null;
  }
}
