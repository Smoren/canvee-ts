import { VectorArrayType } from '../vector/types';
import { ViewConfigInterface } from '../../types';

/**
 * Filter config type
 * @public
 */
export type FilterConfigType = Record<string, unknown>;

/**
 * Base interface of a filter
 * @public
 */
export interface FilterInterface<T> {
  /**
   * Process data with filter
   * @param data - data to process
   * @param config - filter config
   */
  process(data: T, config: FilterConfigType): T;
}

/**
 * Interface of collection filter
 * @public
 */
export interface CollectionFilterInterface<T> extends FilterInterface<Array<T>> {

}

/**
 * Config interface of coords filter
 * @public
 */
export interface CoordsFilterConfigInterface extends ViewConfigInterface, FilterConfigType {

}

/**
 * Interface for coords filter
 * @public
 */
export interface CoordsFilterInterface extends FilterInterface<VectorArrayType> {
  /**
   * {@inheritDoc FilterInterface.process}
   */
  process(data: VectorArrayType, config: CoordsFilterConfigInterface): VectorArrayType;
}

/**
 * Interface for coords filter
 * @public
 */
export interface CoordsCollectionFilterInterface extends FilterInterface<VectorArrayType[]> {
  /**
   * {@inheritDoc FilterInterface.process}
   */
  process(data: VectorArrayType[], config: CoordsFilterConfigInterface): VectorArrayType[];
}
