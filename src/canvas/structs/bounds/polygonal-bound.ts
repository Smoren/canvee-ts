import { VectorArrayType } from '../../types';
import { BoundInterface, NeighborhoodBoundConfig, PolygonalBoundConfig } from '../../types/bound';

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
    const x = coords[0];
    const y = coords[1];
    const vertexCount = this._config.points.length;
    let isInside = false;

    for (let i=0, j=vertexCount-1; i<vertexCount; j=i++) {
      const xi = this._config.points[i][0];
      const yi = this._config.points[i][1];
      const xj = this._config.points[j][0];
      const yj = this._config.points[j][1];

      const isIntersect = ((yi > y) !== (yj > y)) &&
        (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

      if (isIntersect) {
        isInside = !isInside;
      }
    }

    return isInside;
  }
}
