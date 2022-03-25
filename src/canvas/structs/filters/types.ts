import { VectorArrayType } from '../vector/types';
import { ViewConfigInterface } from '../../types';

/**
 * Filter config type
 */
export type FilterConfigType = Record<string, unknown>;

/**
 * Base interface of a filter
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
 */
export interface CollectionFilterInterface<T> extends FilterInterface<Array<T>> {

}

/**
 * Config interface of coords filter
 */
export interface CoordsFilterConfigInterface extends ViewConfigInterface, FilterConfigType {

}

/**
 * Interface for coords filter
 */
export interface CoordsFilterInterface extends FilterInterface<VectorArrayType> {
  /**
   * {@inheritDoc FilterInterface.process}
   */
  process(data: VectorArrayType, config: CoordsFilterConfigInterface): VectorArrayType;
}
