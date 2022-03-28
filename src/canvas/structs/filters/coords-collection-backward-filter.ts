import { VectorArrayType } from '../vector/types';
import { CoordsCollectionFilterInterface, CoordsFilterConfigInterface } from './types';
import { transposeCoordsBackward } from '../vector/helpers';

/**
 * Filter for forward transposing of the points collection
 */
export default class CoordsCollectionBackwardFilter implements CoordsCollectionFilterInterface {
  /**
   * {@inheritDoc CoordsCollectionFilterInterface.process}
   */
  process(
    data: VectorArrayType[],
    config: CoordsFilterConfigInterface,
  ): VectorArrayType[] {
    const result = [];

    for (const coords of data) {
      result.push(transposeCoordsBackward(coords, config.offset, config.scale));
    }

    return result;
  }
}
