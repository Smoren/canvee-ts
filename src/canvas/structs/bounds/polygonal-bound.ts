import { VectorArrayType } from '../../types';
import { BoundInterface, PolygonalBoundConfig } from '../../types/bound';
import { createPolygonVectors } from '../vector';

/**
 * PolygonalBound class
 */
export default class PolygonalBound implements BoundInterface {
  /**
   * Bound config
   */
  protected _config: PolygonalBoundConfig;

  /**
   * RectangularBound constructor
   * @param config - bound config
   */
  constructor(config: PolygonalBoundConfig) {
    this._config = config;
  }

  /**
   * {@inheritDoc BoundInterface.includes}
   */
  includes(coords: VectorArrayType): boolean {
    const precision = 0;
    const x = coords[0];
    const y = coords[1];
    let isInside = false;

    const polygonVectors = createPolygonVectors(this._config.points);

    for (const vector of polygonVectors) {
      if (vector.includes(coords, precision)) {
        return true;
      }

      const [xj, yj] = vector.position.toArray();
      const [xi, yi] = vector.target.toArray();

      const isIntersect = ((yi > y) !== (yj > y)) &&
        (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

      if (isIntersect) {
        isInside = !isInside;
      }
    }

    return isInside;
  }

  /**
   * {@inheritDoc BoundInterface.isNearEdge}
   */
  isNearEdge(coords: VectorArrayType, deviation: number): boolean {
    return false;
  }
}
