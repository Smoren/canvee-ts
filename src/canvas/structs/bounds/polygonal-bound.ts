import { VectorArrayType } from '../../types';
import { BoundInterface, PolygonalBoundConfig } from '../../types/bound';
import { createPolygonVectors, toVector } from '../vector';
import { getMaxPosition, getMinPosition, translatePositionConfig } from '../../helpers/base';
import RectangularBound from './rectangular-bound';

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
  public includes(coords: VectorArrayType): boolean {
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
  public isNearEdge(coords: VectorArrayType, scale: VectorArrayType, deviation: number): boolean {
    const vectors = createPolygonVectors(this._config.points);

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
  public toArray(): [VectorArrayType, VectorArrayType] {
    return this.toRectBound().toArray();
  }

  /**
   * {@inheritDoc BoundInterface.toRectBound}
   */
  public toRectBound(): BoundInterface {
    const minPosition = getMinPosition(this._config.points);
    const maxPosition = getMaxPosition(this._config.points);

    return new RectangularBound({
      position: minPosition,
      size: toVector(maxPosition).sub(minPosition).toArray(),
    });
  }

  /**
   * {@inheritDoc BoundInterface.specify}
   */
  public specify(scale: VectorArrayType, offset: VectorArrayType): BoundInterface {
    const [oldPosition, oldSize] = this.toRectBound().toArray();
    const [position, size] = translatePositionConfig(oldPosition, oldSize, scale, offset);
    const newScale: VectorArrayType = toVector(size).divCoords(oldSize).toArray();
    const newPosition: VectorArrayType = toVector(position).sub(oldPosition).toArray();

    for (const i in this._config.points) {
      this._config.points[i] = toVector(this._config.points[i])
        .mulCoords(newScale)
        .add(newPosition)
        .toArray();
    }

    return this;
  }
}
