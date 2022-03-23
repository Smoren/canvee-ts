import { VectorArrayType } from '../../types';
import { BoundInterface, RectangularBoundConfig } from '../../types/bound';

/**
 * RectangularBound class
 */
export default class RectangularBound implements BoundInterface {
  /**
   * Bound config
   */
  protected _config: RectangularBoundConfig;

  /**
   * RectangularBound constructor
   * @param config - bound config
   */
  constructor(config: RectangularBoundConfig) {
    this._config = config;
  }

  /**
   * {@inheritDoc BoundInterface.includes}
   */
  includes(coords: VectorArrayType): boolean {
    return coords[0] >= this._config.position[0]
      && coords[0] <= this._config.position[0] + this._config.size[0]
      && coords[1] >= this._config.position[1]
      && coords[1] <= this._config.position[1] + this._config.size[1];
  }
}

