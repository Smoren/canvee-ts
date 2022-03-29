import {
  DrawableGroupInterface,
  DrawableConfigInterface,
  DrawableInterface,
  DrawableIdType,
  DrawableStorageInterface,
  DrawerInterface,
  LinkedDataType,
} from '../../types';
import Drawable from '../drawable/drawable';
import DrawableStorage from '../drawable/drawable-storage';

interface ConstructorInterface {
  id: DrawableIdType;
  config: DrawableConfigInterface;
  data?: LinkedDataType;
  list?: DrawableInterface[];
}

/**
 * Drawable group class
 */
export default class DrawableGroup extends Drawable implements DrawableGroupInterface {
  /**
   * Name of class to use as subscriber name in observable logic
   */
  protected _subscriberName: string = 'DrawableGroup';
  /**
   * Storage of the list objects
   */
  protected _storage: DrawableStorageInterface;

  /**
   * DrawableGroup constructor
   * @param id - group ID
   * @param config - config
   * @param data - extra data
   * @param list - list of grouped objects
   */
  constructor({
    id,
    config,
    data = {},
    list = [],
  }: ConstructorInterface) {
    super({
      id,
      config,
      data,
    });

    this._storage = new DrawableStorage(this._processListToGroup(list));
    this._storage.onViewChange(this._subscriberName, (target, extra) => {
      this._observeHelper.processWithMutingHandlers(extra);
    });
  }

  /**
   * {@inheritDoc DrawableInterface.draw}
   */
  public draw(drawer: DrawerInterface): void {
    this._storage.list.forEach((item) => {
      if (item.config.visible && item.config.display) {
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

    return this._processListToUngroup(this.list);
  }

  /**
   * List getter
   */
  public get list(): DrawableInterface[] {
    return this._storage.list;
  }

  /**
   * Some actions with list before grouping
   */
  protected _processListToGroup(list: DrawableInterface[]): DrawableInterface[] {
    return list;
  }

  /**
   * Some actions with list before ungrouping
   */
  protected _processListToUngroup(list: DrawableInterface[]): DrawableInterface[] {
    return list;
  }
}
