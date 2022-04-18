import { VectorArrayType } from '../../types';
import { BoundInterface, LineBoundConfig } from '../../types/bound';
import RectangularBound from './rectangular-bound';
import { createPolygonVectors } from '../vector';

/**
 * RectangularBound class
 */
export default class LineBound implements BoundInterface {
  /**
   * Bound config
   */
  protected _config: LineBoundConfig;

  /**
   * RectangularBound constructor
   * @param config - bound config
   */
  constructor(config: LineBoundConfig) {
    this._config = config;
  }

  /**
   * {@inheritDoc BoundInterface.includes}
   * @param coords - coords vector
   * @param scale - scale vector
   * @param extraDeviation - minimal deviation size
   */
  public includes(coords: VectorArrayType, scale: VectorArrayType, extraDeviation: number = 0): boolean {
    // TODO добавить в вектор укорачивание/удлиннение начала и конца
    const vectors = createPolygonVectors([
      [0, 0],
      [this._config.size[0], this._config.size[1]],
    ]);
    const deviation = this._config.scalable ? this._config.deviation : this._config.deviation / scale[0];

    for (const vector of vectors) {
      if (vector.getDistanceVector(coords).length <= deviation + extraDeviation) {
        return true;
      }
    }
    return false;
  }

  /**
   * {@inheritDoc BoundInterface.isNearEdge}
   */
  public isNearEdge(coords: VectorArrayType, scale: VectorArrayType, deviation: number): boolean {
    return !this.includes(coords, scale, 0) && this.includes(coords, scale, deviation);
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
  public specify(): BoundInterface {
    // line does not need bound scaling
    return this;
  }
}
