import {
  DrawableStorageInterface,
  DrawableInterface,
  DrawableIdType,
  DrawableStorageFilterCallbackType,
  DrawableStorageFilterConfigInterface,
  PositionalDrawableInterface,
  PositionalDrawableConfigInterface,
  ObserveHelperInterface,
  ViewObservableHandlerType, VectorArrayType, PositionalContextInterface,
} from '../../types';
import ObserveHelper from '../../helpers/observe-helper';
import DrawableGroup from '../drawable/drawable-group';
import { getMaxPosition, getMinPosition } from '../../helpers/base';
import { createVector } from '../vector';
import PositionalDrawableGroup from '../drawable/positional-drawable-group';
import { isPositional } from '../../helpers/type-helpers';
import PositionalContext from './positional-context';

/**
 * Storage for drawable objects
 * @public
 */
export default class DrawableStorage implements DrawableStorageInterface {
  /**
   * Name of class to use as subscriber name in observable logic
   */
  protected _subscriberName: string = 'DrawableStorage';
  /**
   * List of stored drawable objects
   */
  protected _list: DrawableInterface[] = [];
  /**
   * Helper for observable logic
   */
  protected _observeHelper: ObserveHelperInterface;

  /**
   * Drawable constructor
   * @param items - batch children to cache
   */
  constructor(items: DrawableInterface[]) {
    this._observeHelper = new ObserveHelper();
    this.addBatch(items);
    this._sort();

    this.onViewChange(this._subscriberName, (target, extra) => {
      if (extra !== null && extra.hasOwnProperty('zIndexChanged') && extra.zIndexChanged) {
        this._sort();
      }
    });
  }

  /**
   * Stored drawable objects children getter
   */
  get list(): DrawableInterface[] {
    return this._list;
  }

  /**
   * {@inheritDoc DrawableStorageInterface.cache}
   */
  public add(item: DrawableInterface): void {
    item.onViewChange(
      this._subscriberName,
      (target, extra) => this._observeHelper.processWithMuteHandlers(extra),
    );
    this._list.push(item);
    this._sort();
    this._observeHelper.processWithMuteHandlers();
  }

  /**
   * {@inheritDoc DrawableStorageInterface.cache}
   */
  public addBatch(items: DrawableInterface[]): void {
    items.forEach((item) => {
      item.onViewChange(
        this._subscriberName,
        (target, extra) => this._observeHelper.processWithMuteHandlers(extra),
      );
      this._list.push(item);
    });
    this._sort();
    this._observeHelper.processWithMuteHandlers();
  }

  /**
   * Deletes objects found by config from storage
   * @param config - filter config
   */
  public delete(config: DrawableStorageFilterConfigInterface): DrawableInterface[] {
    const result: DrawableInterface[] = [];

    this._observeHelper.withMuteHandlers(() => {
      this.find(config).forEach((item) => {
        result.push(this.deleteById(item.id));
      });
    });

    this._observeHelper.processWithMuteHandlers();
    return result;
  }

  /**
   * Deletes object by ID from storage
   * @param id - object ID
   */
  public deleteById(id: DrawableIdType): DrawableInterface {
    const index = this._list.findIndex((item) => item.id === id);

    if (index !== -1) {
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
    return this._find((item) => {
      if (config.idsOnly && config.idsOnly.indexOf(item.id) === -1) {
        return false;
      }
      if (config.idsExclude && config.idsExclude.indexOf(item.id) !== -1) {
        return false;
      }

      if (config.typesOnly && config.typesOnly.indexOf(item.type) === -1) {
        return false;
      }
      if (config.typesExclude && config.typesExclude.indexOf(item.type) !== -1) {
        return false;
      }

      return !(config.extraFilter && !config.extraFilter(item));
    });
  }

  /**
   * {@inheritDoc DrawableStorageInterface.findById}
   */
  public findById(id: DrawableIdType): DrawableInterface {
    const foundItems = this._find((candidate) => candidate.id === id);
    if (foundItems.length) {
      return foundItems[0];
    }
    // TODO customize exception
    throw new Error(`cannot find object with id '${id}'`);
  }

  /**
   * {@inheritDoc DrawableStorageInterface.findByPosition}
   */
  public findByPosition(coords: VectorArrayType): PositionalContextInterface {
    for (let i=this._list.length-1; i>=0; --i) {
      const item: DrawableInterface = this._list[i];
      // TODO maybe only visible?
      if (isPositional(item) && (item as PositionalDrawableInterface).boundIncludes(coords)) {
        const element = (item as PositionalDrawableInterface);
        const position = element.getRelativePosition(coords);
        return new PositionalContext(element, position);
      }
    }

    return new PositionalContext(null, null);
  }

  /**
   * {@inheritDoc DrawableStorageInterface.group}
   */
  public group(ids: DrawableIdType[]): DrawableGroup {
    const groupItems = this.delete({ idsOnly: ids }) as PositionalDrawableInterface[];
    const minPosition = getMinPosition(groupItems.map((item) => item.config.position));
    const maxPosition = getMaxPosition(groupItems.map((item) => {
      return createVector(item.config.position)
        .add(createVector(item.config.size))
        .toArray();
    }));
    const groupSize = createVector(maxPosition).sub(createVector(minPosition)).toArray();
    const groupZIndex = Math.max(...groupItems.map((item) => item.config.zIndex))+1;

    const config: PositionalDrawableConfigInterface = {
      position: minPosition,
      size: groupSize,
      zIndex: groupZIndex,
      visible: true,
    };

    const groupId = 'group-'+(new Date()).getTime()+'-'+Math.floor(Math.random()*100000);
    const group = new PositionalDrawableGroup(groupId, config, {}, groupItems);
    this.add(group);

    return group;
  }

  /**
   * {@inheritDoc DrawableStorageInterface.ungroup}
   */
  public ungroup(groupId: DrawableIdType): void {
    const group: DrawableGroup = this.deleteById(groupId) as DrawableGroup;
    this.addBatch(group.destruct());
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
    });

    return result;
  }

  /**
   * Sorts the stored objects by z-index
   */
  protected _sort(): void {
    console.log('sort');
    this._list.sort((lhs, rhs) => lhs.config.zIndex - rhs.config.zIndex);
  }
}
