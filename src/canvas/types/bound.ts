import { PositionalInterface, VectorArrayType } from '../structs/vector/types';

/**
 * Collection of VectorArrayType interface
 * @public
 */
export type VectorArrayCollectionType = Array<VectorArrayType>

/**
 * Interface for bounds
 * @public
 */
export interface BoundInterface {
  /**
   * Return true if the bound includes the point given as coords
   * @param coords - point coords
   */
  includes(coords: VectorArrayType): boolean;

  /**
   * Return true if point is near edge of the bound
   * @param coords - point coords
   * @param deviation - deviation size
   */
  isNearEdge(coords: VectorArrayType, deviation: number): boolean;

  /**
   * Converts bound to array of position and size vectors
   * (as rectangular bound)
   */
  toArray(): [VectorArrayType, VectorArrayType];

  /**
   * Converts bound to rectangular bound
   */
  toRectBound(): BoundInterface;
}

/**
 * Type for config of bound
 * @public
 */
export type BoundConfigType = Record<string, unknown>;

/**
 * Interface for config of rectangular bound
 * @public
 */
export interface RectangularBoundConfig extends BoundConfigType, PositionalInterface {

}

/**
 * Interface for config of ellipse bound
 * @public
 */
export interface EllipseBoundConfig extends BoundConfigType, PositionalInterface {

}

/**
 * Interface for config of rectangular bound
 * @public
 */
export interface NeighborhoodBoundConfig extends BoundConfigType {
  /**
   * Position coords of the center point
   */
  position: VectorArrayType;
  /**
   * Neighborhood radius
   */
  radius: number;
}

/**
 * Interface for config of polygonal bound
 * @public
 */
export interface PolygonalBoundConfig extends BoundConfigType {
  /**
   * Points of polygonal bound
   */
  points: VectorArrayType[];
}
