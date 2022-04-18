import { VectorArrayType, VectorInterface } from '../../types';
import { BoundInterface, EllipseBoundConfig } from '../../types/bound';
import RectangularBound from './rectangular-bound';
import { translatePositionConfig, isInEllipse } from '../../helpers/base';
import { toVector } from '../vector';

/**
 * RectangularBound class
 */
export default class EllipseBound implements BoundInterface {
  /**
   * Bound config
   */
  protected _config: EllipseBoundConfig;

  /**
   * RectangularBound constructor
   * @param config - bound config
   */
  constructor(config: EllipseBoundConfig) {
    this._config = config;
  }

  /**
   * Radius getter
   */
  public get center(): VectorArrayType {
    return toVector(this._config.position).add(this.radius).toArray();
  }

  /**
   * Radius getter
   */
  public get radius(): VectorArrayType {
    return toVector(this._config.size).div(2).toArray();
  }

  /**
   * {@inheritDoc BoundInterface.includes}
   */
  public includes(coords: VectorArrayType): boolean {
    return isInEllipse(coords, this.center, this.radius);
  }

  /**
   * {@inheritDoc BoundInterface.isNearEdge}
   */
  public isNearEdge(coords: VectorArrayType, scale: VectorArrayType, deviation: number): boolean {
    const deviationVector: VectorInterface = toVector([deviation, deviation]);

    const maxRadius = toVector(this.radius).add(deviationVector);
    const minRadius = toVector(this.radius).sub(deviationVector);

    return isInEllipse(coords, this.center, maxRadius)
      && !isInEllipse(coords, this.center, minRadius);
  }

  /**
   * {@inheritDoc BoundInterface.toArray}
   */
  public toArray(): [VectorArrayType, VectorArrayType] {
    return [this._config.position, this._config.size];
  }

  /**
   * {@inheritDoc BoundInterface.toRectBound}
   */
  public toRectBound(): BoundInterface {
    return new RectangularBound({
      position: this._config.position,
      size: this._config.size,
    });
  }

  /**
   * {@inheritDoc BoundInterface.specify}
   */
  public specify(scale: VectorArrayType, offset: VectorArrayType = [0, 0]): BoundInterface {
    const [position, size] = translatePositionConfig(this._config.position, this._config.size, scale, offset);

    this._config.position = position;
    this._config.size = size;

    return this;
  }
}
