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
 * @param data - text
 * @param type - type
 */
export function createBlob(data: string, type: string): Blob {
  return new Blob([data], {type: type});
}

/**
 * Creates URL from blob
 * @param blob - blob
 */
export function createUrlFromBlob(blob: Blob): string {
  const URL = window.URL || window.webkitURL || window;
  // @ts-ignore
  return URL.createObjectURL(blob);
}
