import {
  DrawableStorageFilterCallbackType,
  DrawableIdType,
  DrawableInterface,
  DrawableStorageInterface,
  ObserveHelperInterface,
  ViewObservableHandlerType,
  DrawableStorageFilterConfigInterface,
  DrawableConfigInterface,
} from "../types";
import ObserveHelper from "../helpers/observe-helper";
import DrawableGroup from "./drawable-group";
import { getMinPosition } from "../helpers/base";
import { createVector } from "./vector";

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
   * @param items - batch list to cache
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
   * {@inheritDoc DrawableStorageInterface.cache}
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
   * {@inheritDoc DrawableStorageInterface.cache}
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
      const deletedItem = this._list.splice(index, 1)[0];
      deletedItem.offViewChange(this._subscriberName);
      this._observeHelper.processWithMuteHandlers();
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
      } else if (config.idsExclude && config.idsExclude.indexOf(item.id) !== -1) {
        return false;
      }

      if (config.typesOnly && config.typesOnly.indexOf(item.type) === -1) {
        return false;
      } else if (config.typesExclude && config.typesExclude.indexOf(item.type) !== -1) {
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
    const minPosition = getMinPosition(groupItems.map(item => item.config.position));

    const config: DrawableConfigInterface = {
      position: minPosition,
      zIndex: Math.max(...groupItems.map(item => item.config.zIndex))+1,
      visible: true,
      selectable: true,
    };

    this._observeHelper.withMuteHandlers(() => {
      groupItems.forEach(item => {
        item.movePosition(
          createVector(minPosition).inverse().toArray()
        )
      });
    });

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

    this._observeHelper.withMuteHandlers(() => {
      group.list.forEach(item => {
        item.movePosition(group.config.position)
      });
    });

    this.addBatch(group.list);
    group.destruct();
  }

  /**
   * {@inheritDoc DrawableStorageInterface.onViewChange}
   */
  public onViewChange(subscriberName: string, handler: ViewObservableHandlerType): void {
    this._observeHelper.onChange(subscriberName, handler);
  }

  /**
   * {@inheritDoc DrawableStorageInterface.offViewChange}
   */
  public offViewChange(subscriberName: string): void {
    this._observeHelper.offChange(subscriberName);
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
