import {
  DrawableStorageFilterCallbackType,
  DrawableIdType,
  DrawableInterface,
  DrawableStorageInterface,
  ObserveHelperInterface,
  ViewObservableHandlerType, DrawableStorageFilterConfigInterface, DrawableConfigInterface,
} from "../types";
import ObserveHelper from "../helpers/observe-helper";
import { updateFileWithText } from "ts-loader/dist/servicesHost";
import DrawableGroup from "./drawable-group";
import { getMinPosition } from "../helpers/base";

/**
 * Storage for drawable objects
 * @public
 */
export default class DrawableStorage implements DrawableStorageInterface {
  /**
   * Name of class to use as subscriber name in observable logic
   * @protected
   */
  protected _subscriberName: 'DrawableStorage';
  /**
   * List of stored drawable objects
   * @protected
   */
  protected _list: DrawableInterface[] = [];
  /**
   * Helper for observable logic
   * @protected
   */
  protected _observeHelper: ObserveHelperInterface;

  /**
   * Drawable constructor
   * @param items - batch list to add
   */
  constructor(items: DrawableInterface[]) {
    this._observeHelper = new ObserveHelper();
    this.addBatch(items);
    this._sort();

    this._observeHelper.onChange(this._subscriberName, (target, extra) => {
      if (extra !== null && extra.hasOwnProperty('zIndexChanged') && extra.zIndexChanged) {
        this._sort();
      }
    });
  }

  /**
   * Stored drawable objects list getter
   */
  get list(): DrawableInterface[] {
    return this._list;
  }

  /**
   * {@inheritDoc DrawableStorageInterface.add}
   */
  public add(item: DrawableInterface): void {
    item.onViewChange(this._subscriberName, (target, extra) => {
      return this._observeHelper.processWithMuteHandlers(extra);
    });
    this._list.push(item);
    this._sort();
    this._observeHelper.processWithMuteHandlers();
  }

  /**
   * {@inheritDoc DrawableStorageInterface.add}
   */
  public addBatch(items: DrawableInterface[]): void {
    items.forEach(item => {
      item.onViewChange(this._subscriberName, (target, extra) => {
        return this._observeHelper.processWithMuteHandlers(extra);
      });
      this._list.push(item);
    });
    this._sort();
    this._observeHelper.processWithMuteHandlers();
  }

  /**
   * Deletes objects found by config from storage
   * @param config
   */
  public delete(config: DrawableStorageFilterConfigInterface): DrawableInterface[] {
    const result: DrawableInterface[] = [];

    this._observeHelper.withMuteHandlers(() => {
      this.find(config).forEach(item => {
        result.push(this.deleteById(item.id));
      });
    });

    this._observeHelper.processWithMuteHandlers();
    return result;
  }

  /**
   * Deletes object by ID from storage
   * @param id
   */
  public deleteById(id: DrawableIdType): DrawableInterface {
    const index = this._list.findIndex(item => item.id === id);

    if(index !== -1) {
      this._observeHelper.processWithMuteHandlers();
      const deletedItem = this._list.splice(index, 1)[0];
      deletedItem.offViewChange(this._subscriberName);
      return deletedItem;
    }

    // TODO customize exception
    throw new Error(`cannot find object with id '${id}'`);
  }

  /**
   * {@inheritDoc DrawableStorageInterface.clear}
   */
  clear(): void {
    this._list.length = 0;
    this._observeHelper.processWithMuteHandlers();
  }

  /**
   * {@inheritDoc DrawableStorageInterface.find}
   */
  public find(config: DrawableStorageFilterConfigInterface): DrawableInterface[] {
    return this._find(item => {
      if (config.idsOnly && config.idsOnly.indexOf(item.id) === -1) {
        return false;
      } else if (config.idsExcept && config.idsExcept.indexOf(item.id) !== -1) {
        return false;
      }

      if (config.typesOnly && config.typesOnly.indexOf(item.type) === -1) {
        return false;
      } else if (config.typesExcept && config.typesExcept.indexOf(item.type) !== -1) {
        return false;
      }

      return !(config.extraFilter && !config.extraFilter(item));
    });
  }

  /**
   * {@inheritDoc DrawableStorageInterface.findById}
   */
  public findById(id: DrawableIdType): DrawableInterface {
    const foundItems = this._find(candidate => candidate.id === id);
    if (foundItems.length) {
      return foundItems[0];
    }
    // TODO customize exception
    throw new Error(`cannot find object with id '${id}'`);
  }

  /**
   * {@inheritDoc DrawableStorageInterface.group}
   */
  public group(ids: DrawableIdType[]): DrawableGroup {
    const groupItems = this.delete({ idsOnly: ids });

    const config: DrawableConfigInterface = {
      position: getMinPosition(groupItems.map(item => item.config.position)),
      zIndex: Math.max(...groupItems.map(item => item.config.zIndex)),
      visible: true,
      selectable: true,
    };

    const groupId = 'group-'+(new Date()).getTime()+'-'+Math.floor(Math.random()*100000);
    const group = new DrawableGroup(groupId, config, {}, groupItems);
    this.add(group);

    return group;
  }

  /**
   * {@inheritDoc DrawableStorageInterface.ungroup}
   */
  public ungroup(groupId: DrawableIdType): void {
    const group: DrawableGroup = this.deleteById(groupId) as DrawableGroup;
    this.addBatch(group.list);
  }

  /**
   * {@inheritDoc DrawableStorageInterface.onViewChange}
   */
  onViewChange(subscriberName: string, handler: ViewObservableHandlerType): void {
    this._observeHelper.onChange(subscriberName, handler);
  }

  /**
   * Find objects in storage by filter callback function
   * @param filter - filter callback function
   */
  protected _find(filter: DrawableStorageFilterCallbackType): DrawableInterface[] {
    const result: DrawableInterface[] = [];

    this._list.forEach((item) => {
      if (filter(item)) {
        result.push(item);
      }
    })

    return result;
  }

  /**
   * Sorts the stored objects by z-index
   * @protected
   */
  protected _sort(): void {
    console.log('sort');
    this._list.sort((lhs, rhs) => lhs.config.zIndex - rhs.config.zIndex);
  }
}
