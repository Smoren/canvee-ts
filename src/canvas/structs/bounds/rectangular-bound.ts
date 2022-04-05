import { VectorArrayType } from '../../types';
import { BoundInterface, RectangularBoundConfig } from '../../types/bound';
import { createPolygonVectors } from '../vector';

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

  /**
   * {@inheritDoc BoundInterface.isNearEdge}
   */
  isNearEdge(coords: VectorArrayType, deviation: number): boolean {
    const vectors = createPolygonVectors([
      [this._config.position[0], this._config.position[1]],
      [this._config.position[0] + this._config.size[0], this._config.position[1]],
      [this._config.position[0] + this._config.size[0], this._config.position[1] + this._config.size[1]],
      [this._config.position[0], this._config.position[1] + this._config.size[1]],
    ]);

    for (const vector of vectors) {
      if (vector.getDistanceVector(coords).length <= deviation) {
        return true;
      }
    }
    return false;
  }

  /**
   * {@inheritDoc BoundInterface.toArray}
   */
  toArray(): [VectorArrayType, VectorArrayType] {
    return [this._config.position, this._config.size];
  }

  /**
   * {@inheritDoc BoundInterface.toRectBound}
   */
  toRectBound(): BoundInterface {
    return new RectangularBound({
      position: this._config.position,
      size: this._config.size,
    });
  }
}
