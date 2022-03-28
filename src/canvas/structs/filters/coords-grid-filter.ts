import { CoordsFilterConfigInterface, CoordsFilterInterface } from './types';
import { VectorArrayType } from '../vector/types';

/**
 * Filter coords using grid
 */
export default class CoordsGridFilter implements CoordsFilterInterface {
  /**
   * {@inheritDoc CoordsFilterInterface.process}
   */
  public process(data: VectorArrayType, config: CoordsFilterConfigInterface): VectorArrayType {
    const [x, y] = data;
    const scale = config.scale[0];

    let step = config.gridStep;

    if (scale < 1) {
      step *= 2 ** Math.round(Math.log2(1 / scale));
    } else {
      step /= 2 ** Math.round(Math.log2(scale));
    }

    return [x-x%step, y-y%step];
  }
}
