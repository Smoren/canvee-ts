import { default as md5 } from 'crypto-js/md5';
import { VectorArrayType, VectorInterface } from '../types';
import { toVector } from '../structs/vector';

/**
 * Returns true if arrays are equal and false else
 * @public
 * @param lhs - first array to compare
 * @param rhs - second array to compare
 */
export function areArraysEqual(lhs: Array<unknown>, rhs: Array<unknown>): boolean {
  return lhs.length === rhs.length && lhs.every((v, i) => v === rhs[i]);
}

/**
 * Creates DOM element from HTML string
 * @public
 * @param htmlString - HTML string
 */
export function createElementFromHTML(htmlString: string): unknown {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  return div.firstChild;
}

/**
 * Creates blob from text
 * @public
 * @param data - text
 * @param type - type
 */
export function createBlob(data: string, type: string): Blob {
  return new Blob([data], { type });
}

/**
 * Interface for understanding method createObjectURL()
 */
interface UrlInterface {
  createObjectURL(blob: Blob): string;
}

/**
 * Creates URL from blob
 * @public
 * @param blob - blob
 */
export function createUrlFromBlob(blob: Blob): string {
  const URL: UrlInterface = (window.URL || window.webkitURL || window) as UrlInterface;
  return URL.createObjectURL(blob);
}

/**
 * Finds and returns minimal (left-top) position
 * @public
 * @param positions - input positions
 */
export function getMinPosition(positions: VectorArrayType[]): VectorArrayType {
  let minX: number = Infinity;
  let minY: number = Infinity;

  positions.forEach((position) => {
    if (position[0] < minX) {
      minX = position[0];
    }
    if (position[1] < minY) {
      minY = position[1];
    }
  });

  return [minX, minY];
}

/**
 * Finds and returns maximal (right-bottom) position
 * @public
 * @param positions - input positions
 */
export function getMaxPosition(positions: VectorArrayType[]): VectorArrayType {
  let maxX: number = -Infinity;
  let maxY: number = -Infinity;

  positions.forEach((position) => {
    if (position[0] > maxX) {
      maxX = position[0];
    }
    if (position[1] > maxY) {
      maxY = position[1];
    }
  });

  return [maxX, maxY];
}

/**
 * Creates an MD5 hash from string
 * @public
 * @param input - input string
 */
export function hashString(input: string): string {
  return md5(input).toString();
}

/**
 * Returns true if ellipse includes point
 * @param point - point coords vector
 * @param center - center vector
 * @param radius - radius vector
 */
export function isInEllipse(
  point: VectorArrayType | VectorInterface,
  center: VectorArrayType | VectorInterface,
  radius: VectorArrayType | VectorInterface,
): boolean {
  const [x, y] = toVector(point).sub(center).toArray();
  const [a, b] = toVector(radius).toArray();

  return (x**2) / (a**2) + (y**2) / (b**2) <= 1;
}

/**
 * Returns centered scaled position and size
 * @param position - position vector
 * @param size - size vector
 * @param scale - scale vector
 * @param offset - left top point relative offset
 */
export function translatePositionConfig(
  position: VectorArrayType, size: VectorArrayType, scale: VectorArrayType, offset: VectorArrayType,
): [VectorArrayType, VectorArrayType] {
  const mainPosition = toVector(position).sub(toVector(size).mulCoords(offset)).toArray();
  const newSize = toVector(size).mulCoords(scale).toArray();

  const newPosition = toVector(mainPosition).add(
    toVector(size).sub(newSize).mulCoords(offset),
  ).toArray();

  return [newPosition, newSize];
}
