import {
  LinkedDataType,
  DrawableInterface,
  DrawerInterface,
  BasicFigureDrawableConfigInterface, DrawableIdType,
} from "../types";
import Drawable from "../structs/drawable";
import { createBlob, createUrlFromBlob } from "../helpers/base";

/**
 * Interface for config of rect figure
 * @public
 */
export interface SvgConfigInterface extends BasicFigureDrawableConfigInterface {
  /**
   * SVG data
   */
  data: string;
}

/**
 * Svg figure
 * @public
 */
export default class Svg extends Drawable implements DrawableInterface {
  /**
   * Object type
   * @protected
   */
  protected _type: string = 'Svg';
  /**
   * View config
   * @protected
   */
  protected _config: SvgConfigInterface;
  /**
   * Image DOM element
   * @protected
   */
  protected _img: HTMLImageElement | null = null;

  /**
   * Svg constructor
   * @param id - object ID
   * @param config - view config
   * @param data - linked extra data
   */
  constructor(id: DrawableIdType, config: SvgConfigInterface, data: LinkedDataType = {}) {
    super(id, config, data);
  }

  /**
   * {@inheritDoc DrawableInterface.draw}
   */
  draw(drawer: DrawerInterface): void {
    if (this._img !== null) {
      drawer.context.beginPath();
      drawer.context.drawImage(this._img, ...this._config.position);
      drawer.context.closePath();

      return;
    }

    // const svgElement: SVGElement = createElementFromHTML(this._config.data) as SVGElement;
    const blob: Blob = createBlob(this._config.data, 'image/svg+xml');
    const url: string = createUrlFromBlob(blob);
    const img = new Image();
    img.src = url;

    img.addEventListener('load', () => {
      // TODO возможно следует придумать более элегантное решение
      // как вариант, сделать единое хранилище всех ранее загруженных IMG
      this._img = img;
      this._observeHelper.processWithMuteHandlers();
    });
  }
}
