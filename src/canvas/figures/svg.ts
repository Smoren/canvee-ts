import {
  PositionalDrawableInterface,
  PositionalDrawableConfigInterface,
  DrawableIdType,
  DrawerInterface,
  LinkedDataType,
} from '../types';
import PositionalDrawable from '../structs/drawable/positional-drawable';
import imageCacheHelper from '../helpers/image-cache-helper';

/**
 * Interface for config of rect figure
 * @public
 */
export interface SvgConfigInterface extends PositionalDrawableConfigInterface {
  /**
   * SVG data
   */
  data: string;
}

/**
 * Svg figure
 * @public
 */
export default class Svg extends PositionalDrawable implements PositionalDrawableInterface {
  /**
   * Object type
   */
  protected _type: string = 'Svg';
  /**
   * View config
   */
  protected _config: SvgConfigInterface;
  /**
   * Image DOM element
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
  public draw(drawer: DrawerInterface): void {
    if (!this._tryDraw(drawer)) {
      this._img = imageCacheHelper.cache(this._config.data, 'image/svg+xml', (img) => {
        this._img = img;
      });
      this._tryDraw(drawer);
    }
  }

  /**
   * Tries to draw the figure if the image is ready
   * @param drawer - drawer object
   */
  protected _tryDraw(drawer: DrawerInterface): boolean {
    if (this._img !== null) {
      drawer.context.beginPath();
      drawer.context.drawImage(this._img, ...this._config.position);
      drawer.context.closePath();

      return true;
    }

    return false;
  }
}
