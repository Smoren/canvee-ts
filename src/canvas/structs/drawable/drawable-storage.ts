import {
  DrawableStorageInterface,
  DrawableInterface,
  DrawableIdType,
  DrawableStorageFilterCallbackType,
  DrawableStorageFilterConfigInterface,
  PositionalDrawableInterface,
  PositionalDrawableConfigInterface,
  ObserveHelperInterface,
  ViewObservableHandlerType,
  VectorArrayType,
  PositionalContextInterface,
  DrawableLayerInterface,
} from '../../types';
import ObserveHelper from '../../helpers/observe-helper';
import DrawableGroup from '../drawable/drawable-group';
import { getMaxPosition, getMinPosition } from '../../helpers/base';
import { createVector } from '../vector';
import PositionalDrawableGroup from '../drawable/positional-drawable-group';
import { isLayer, isPositional } from '../../helpers/type-helpers';
import PositionalContext from './positional-context';
import DrawableLayer from './drawable-layer';

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
   * @param items - batch list to cache
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
   * Stored drawable objects list getter
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
      (target, extra) => this._observeHelper.processWithMutingHandlers(extra),
    );
    this._list.push(item);
    this._sort();
    this._observeHelper.processWithMutingHandlers();
  }

  /**
   * {@inheritDoc DrawableStorageInterface.cache}
   */
  public addBatch(items: DrawableInterface[]): void {
    items.forEach((item) => {
      item.onViewChange(
        this._subscriberName,
        (target, extra) => this._observeHelper.processWithMutingHandlers(extra),
      );
      this._list.push(item);
    });
    this._sort();
    this._observeHelper.processWithMutingHandlers();
  }

  /**
   * Deletes objects found by config from storage
   * @param config - filter config
   */
  public delete(config: DrawableStorageFilterConfigInterface): DrawableInterface[] {
    const result: DrawableInterface[] = [];

    this._observeHelper.withMutingHandlers(() => {
      this.find(config).forEach((item) => {
        result.push(this.deleteById(item.id));
      });

      return [true, null];
    });

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
      this._observeHelper.processWithMutingHandlers();
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
    this._observeHelper.processWithMutingHandlers();
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
  public findByPosition(coords: VectorArrayType, interactiveOnly: boolean): PositionalContextInterface {
    for (let i=this._list.length-1; i>=0; --i) {
      const item: DrawableInterface = this._list[i];

      if (interactiveOnly && !item.isInteractive) {
        continue;
      }

      if (isLayer(item)) {
        const context = (item as DrawableLayer).storage.findByPosition(coords, interactiveOnly);
        if (!context.isEmpty()) {
          return context;
        }
      } else if (isPositional(item) && (item as PositionalDrawableInterface).boundIncludes(coords)) {
        const element = (item as PositionalDrawableInterface);
        const position = element.getRelativePosition(coords);
        return new PositionalContext(element, position);
      }
    }

    return new PositionalContext(null, null);
  }

  /**
   * {@inheritDoc DrawableStorageInterface.findByNearEdgePosition}
   */
  findByNearEdgePosition(
    coords: VectorArrayType,
    interactiveOnly: boolean,
    deviation: number,
  ): PositionalContextInterface {
    const positionContext = this.findByPosition(coords, interactiveOnly);

    for (let i=this._list.length-1; i>=0; --i) {
      const item = this._list[i];

      if (interactiveOnly && !item.isInteractive) {
        continue;
      }

      if (isLayer(item)) {
        const context = (item as DrawableLayer).storage.findByNearEdgePosition(coords, interactiveOnly, deviation);
        if (!context.isEmpty()) {
          return context;
        }
      } else if (
        isPositional(item)
        && (item as PositionalDrawableInterface).isNearBoundEdge(coords, deviation)
        && (
          positionContext.isEmpty()
          || positionContext.element === item
          || item.config.zIndex >= positionContext.element.config.zIndex
        )
      ) {
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
    const list = this.delete({ idsOnly: ids }) as PositionalDrawableInterface[];
    const minPosition = getMinPosition(list.map((item) => item.config.position));
    const maxPosition = getMaxPosition(list.map((item) => {
      return createVector(item.config.position)
        .add(createVector(item.config.size))
        .toArray();
    }));
    const groupSize = createVector(maxPosition).sub(createVector(minPosition)).toArray();
    const groupZIndex = Math.max(...list.map((item) => item.config.zIndex))+1;

    const config: PositionalDrawableConfigInterface = {
      position: minPosition,
      size: groupSize,
      zIndex: groupZIndex,
      display: true,
      visible: true,
      interactive: true,
    };

    const id = 'group-'+(new Date()).getTime()+'-'+Math.floor(Math.random()*100000);
    const group = new PositionalDrawableGroup({
      id,
      config,
      list,
    });
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
   * {@inheritDoc DrawableStorageInterface.addLayer}
   */
  public addLayer(id: string, name: string, list: DrawableInterface[] = []): DrawableLayerInterface {
    const layer = new DrawableLayer({
      id,
      list,
      config: {
        visible: true,
        display: true,
        interactive: true,
        zIndex: this._getMaxZIndex()+1,
        name: name,
      },
    });

    this.add(layer);

    return layer;
  }

  /**
   * {@inheritDoc DrawableStorageInterface.getLayer}
   */
  public getLayer(id: string): DrawableLayerInterface {
    try {
      const candidate = this.findById(id);

      if (!isLayer(candidate)) {
        // TODO customize exception
        throw new Error();
      }

      return (this.findById(id) as DrawableLayerInterface);
    } catch (e) {
      throw new Error(`cannot find layer with id '${id}'`);
    }
  }

  /**
   * {@inheritDoc DrawableStorageInterface.getLayers}
   */
  public getLayers(): DrawableLayerInterface[] {
    return (this._find((item) => isLayer(item)) as DrawableLayerInterface[]);
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
   * Returns the max zIndex of the first depth level items
   */
  protected _getMaxZIndex(): number {
    if (this._list.length === 0) {
      return 0;
    }

    return this._list[this._list.length - 1].config.zIndex;
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
    // TODO следить
    // console.log('sort');
    this._list.sort((lhs, rhs) => lhs.config.zIndex - rhs.config.zIndex);
  }
}
