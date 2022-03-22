import {
  DrawableGroupInterface,
  DrawableConfigInterface,
  DrawableInterface,
  DrawableIdType,
  DrawableStorageInterface,
  DrawerInterface,
  LinkedDataType,
} from '../types';
import Drawable from './drawable';
import DrawableStorage from '../structs/drawable-storage';

export default class DrawableGroup extends Drawable implements DrawableGroupInterface {
  /**
   * Name of class to use as subscriber name in observable logic
   * @protected
   */
  protected _subscriberName: string = 'DrawableGroup';
  /**
   * Storage of the children objects
   * @protected
   */
  protected _storage: DrawableStorageInterface;

  /**
   * DrawableGroup constructor
   * @param id - group ID
   * @param config - config
   * @param data - extra data
   * @param children - children of grouped objects
   */
  constructor(
    id: DrawableIdType,
    config: DrawableConfigInterface,
    data: LinkedDataType = {},
    children: DrawableInterface[] = [],
  ) {
    super(id, config, data);

    this._storage = new DrawableStorage(this._processChildrenToGroup(children));
    this._storage.onViewChange(this._subscriberName, (target, extra) => {
      this._observeHelper.processWithMuteHandlers(extra);
    });
  }

  /**
   * {@inheritDoc DrawableInterface.draw}
   */
  public draw(drawer: DrawerInterface): void {
    this._storage.list.forEach((item) => {
      if (item.config.visible) {
        item.draw(drawer);
      }
    });
  }

  /**
   * {@inheritDoc DrawableInterface.destruct}
   */
  public destruct(): DrawableInterface[] {
    this._storage.list.forEach((item) => {
      item.offViewChange(this._subscriberName);
    });

    return this._processChildrenToUngroup(this.children);
  }

  /**
   * List getter
   */
  public get children(): DrawableInterface[] {
    return this._storage.list;
  }

  /**
   * Some actions with children before grouping
   */
  protected _processChildrenToGroup(children: DrawableInterface[]): DrawableInterface[] {
    return children;
  }

  /**
   * Some actions with children before ungrouping
   */
  protected _processChildrenToUngroup(children: DrawableInterface[]): DrawableInterface[] {
    return children;
  }
}
