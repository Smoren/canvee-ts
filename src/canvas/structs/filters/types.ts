import { VectorArrayType } from '../vector/types';
import { ViewConfigInterface } from '../../types';

export type FilterConfigType = Record<string, unknown>;

export interface FilterInterface<T> {
  process(data: T, config: FilterConfigType): T;
}

export interface CollectionFilterInterface<T> extends FilterInterface<Array<T>> {

}

export interface CoordsFilterConfigInterface extends ViewConfigInterface, FilterConfigType {
  bounds: [VectorArrayType, VectorArrayType];
}

export interface CoordsFilterInterface extends FilterInterface<VectorArrayType> {
  process(data: VectorArrayType, config: CoordsFilterConfigInterface): VectorArrayType;
}
