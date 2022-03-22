import MD5 from 'crypto-js/md5';
import { VectorArrayType } from '../types';

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
 * @param positions
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
 * @param positions
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
 * @param input
 */
export function hashString(input: string): string {
  return MD5(input).toString();
}
