import { VectorArrayType } from '../../types';
import { BoundInterface, NeighborhoodBoundConfig } from '../../types/bound';

/**
 * NeighborhoodBound class
 */
export default class NeighborhoodBound implements BoundInterface {
  /**
   * Bound config
   */
  protected _config: NeighborhoodBoundConfig;

  /**
   * RectangularBound constructor
   * @param config - bound config
   */
  constructor(config: NeighborhoodBoundConfig) {
    this._config = config;
  }

  /**
   * {@inheritDoc BoundInterface.includes}
   */
  includes(coords: VectorArrayType): boolean {
    const x = coords[0];
    const y = coords[1];
    const centerX = this._config.position[0];
    const centerY = this._config.position[1];

    return (x - centerX) ** 2 + (y - centerY) ** 2 <= this._config.radius ** 2;
  }

  /**
   * {@inheritDoc BoundInterface.isNearEdge}
   */
  isNearEdge(coords: VectorArrayType, deviation: number): boolean {
    return false;
  }
}
