import { VectorArrayType } from '../vector/types';
import { CoordsCollectionFilterInterface, CoordsFilterConfigInterface } from './types';
import { transposeCoordsForward } from '../vector/helpers';

/**
 * Filter for backward transposing of the points collection
 */
export default class CoordsCollectionForwardFilter implements CoordsCollectionFilterInterface {
  /**
   * {@inheritDoc CoordsCollectionFilterInterface.process}
   */
  process(
    data: VectorArrayType[],
    config: CoordsFilterConfigInterface,
  ): VectorArrayType[] {
    const result = [];

    for (const coords of data) {
      result.push(transposeCoordsForward(coords, config.offset, config.scale));
    }

    return result;
  }
}
