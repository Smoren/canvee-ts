import { ViewObservableInterface } from './observable';
import { DrawableIdType } from './drawable-config';
import { DrawableGroupInterface, DrawableInterface, DrawableLayerInterface } from './drawable';
import { PositionalContextInterface, VectorArrayType } from './index';

/**
 * Filter callback for finding objects in storage
 * @public
 */
export type DrawableStorageFilterCallbackType = (candidate: DrawableInterface) => boolean;

/**
 * Filter config for finding objects in storage
 * @public
 */
export interface DrawableStorageFilterConfigInterface {
  idsOnly?: DrawableIdType[];
  idsExclude?: DrawableIdType[];
  typesOnly?: string[];
  typesExclude?: string[];
  extraFilter?: DrawableStorageFilterCallbackType,
}

/**
 * Interface for storage of drawable objects
 * @public
 */
export interface DrawableStorageInterface extends ViewObservableInterface {
  /**
   * List of drawable objects
   */
  list: DrawableInterface[];

  /**
   * Adds a new drawable object to the storage
   * @param item - new drawable object
   */
  add(item: DrawableInterface): void;

  /**
   * Adds the list of drawable objects to the storage
   */
  addBatch(items: DrawableInterface[]): void;

  /**
   * Clears the storage
   */
  clear(): void;

  /**
   * Find objects in storage by filter config
   * @param config - filter config object
   */
  find(config: DrawableStorageFilterConfigInterface): DrawableInterface[];

  /**
   * Returns one object found by ID
   * @param id - object ID
   * @throws Error if object is not found
   */
  findById(id: DrawableIdType): DrawableInterface;

  /**
   * Finds item by position and returns context
   * @param coords - coords
   * @param scale - scale vector
   * @param interactiveOnly - interactive only flag
   */
  findByPosition(coords: VectorArrayType, scale: VectorArrayType, interactiveOnly: boolean): PositionalContextInterface;

  /**
   * Finds item by position near it's bound edges and returns context
   * @param coords - coords
   * @param scale - scale vector
   * @param interactiveOnly - interactive only flag
   * @param deviation - deviation size
   */
  findByNearEdgePosition(
    coords: VectorArrayType, scale: VectorArrayType, interactiveOnly: boolean, deviation: number,
  ): PositionalContextInterface;

  /**
   * Make a group from objects by IDs
   * @param ids - id list of objects to group
   */
  group(ids: DrawableIdType[]): DrawableGroupInterface

  /**
   * Ungroup objects
   * @param groupId - group ID
   */
  ungroup(groupId: DrawableIdType): void;

  /**
   * Adds and returns a new layer
   * @param id - layer ID
   * @param name - name
   * @param list - list objects
   */
  addLayer(id: string, name: string, list?: DrawableInterface[]): DrawableLayerInterface;

  /**
   * Returns one layer found by ID
   * @param id - object ID
   * @throws Error if object is not found
   */
  getLayer(id: string): DrawableLayerInterface;

  /**
   * Returns all layers in this depth level
   */
  getLayers(): DrawableLayerInterface[]

  /**
   * Deletes objects found by config from storage
   * @param config - filter config
   */
  delete(config: DrawableStorageFilterConfigInterface): DrawableInterface[];

  /**
   * Deletes object by ID from storage
   * @param id - object ID
   */
  deleteById(id: DrawableIdType): DrawableInterface;
}
