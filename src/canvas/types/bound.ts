import { PositionalInterface, VectorArrayType } from './base';

/**
 * Interface for bounds
 */
export interface BoundInterface {
  /**
   * Return true if the bound includes the point given as coords
   * @param coords - point coords
   */
  includes(coords: VectorArrayType): boolean;
}

/**
 * Type for config of bound
 */
export type BoundConfigType = Record<string, unknown>;

/**
 * Interface for config of rectangular bound
 */
export interface RectangularBoundConfig extends BoundConfigType, PositionalInterface {

}

/**
 * Interface for config of rectangular bound
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
 */
export interface PolygonalBoundConfig extends BoundConfigType {
  /**
   * Points of polygonal bound
   */
  points: VectorArrayType[];
}
