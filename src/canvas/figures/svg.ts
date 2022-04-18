import {
  PositionalDrawableInterface,
  PositionalDrawableConfigInterface,
  DrawableIdType,
  DrawerInterface,
  LinkedDataType, VectorArrayType,
} from '../types';
import PositionalDrawable from '../structs/drawable/positional-drawable';
import imageCacheHelper from '../helpers/image-cache-helper';
import { BoundInterface, VectorArrayCollectionType } from '../types/bound';
import PolygonalBound from '../structs/bounds/polygonal-bound';
import { CoordsCollectionFilterInterface } from '../structs/filters/types';
import CoordsCollectionForwardFilter from '../structs/filters/coords-collection-forward-filter';
import { toVector } from '../structs/vector';

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

interface ConstructorInterface {
  id: DrawableIdType;
  config: SvgConfigInterface;
  bound: VectorArrayCollectionType;
  data?: LinkedDataType;
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
   * Collection of the bound points
   */
  protected _bound: VectorArrayCollectionType;
  /**
   * Filter for scaling bound
   */
  protected _boundFilter: CoordsCollectionFilterInterface;

  /**
   * Svg constructor
   * @param id - object ID
   * @param config - view config
   * @param bound - collection of the bound points
   * @param data - linked extra data
   */
  constructor({
    id,
    config,
    bound,
    data = {},
  }: ConstructorInterface) {
    super({
      id,
      config,
      data,
    });
    this._bound = bound;
    this._boundFilter = new CoordsCollectionForwardFilter();
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
   * sourceWidth getter
   */
  public get sourceWidth(): number {
    return this._img !== null ? this._img.width : this._config.size[0];
  }

  /**
   * sourceHeight getter
   */
  public get sourceHeight(): number {
    return this._img !== null ? this._img.height : this._config.size[1];
  }

  /**
   * scale getter
   */
  public get scale(): VectorArrayType {
    return [
      this._config.size[0] / this.sourceWidth,
      this._config.size[1] / this.sourceHeight,
    ];
  }

  /**
   * bound getter
   */
  public get bound(): BoundInterface {
    return new PolygonalBound({
      points: this._boundFilter.process(this._bound, {
        scale: this.scale,
        offset: [0, 0],
        gridStep: 0,
      }),
    });
  }

  /**
   * {@inheritDoc DrawableInterface.getScaledBound}
   */
  getScaledBound(scale: VectorArrayType): BoundInterface {
    // TODO implement
    return super.getScaledBound(scale);
  }

  /**
   * Tries to draw the figure if the image is ready
   * @param drawer - drawer object
   */
  protected _tryDraw(drawer: DrawerInterface): boolean {
    if (this._img !== null) {
      // const scale = this.scale;
      // const position = this._config.position;
      // const scaledPosition: VectorArrayType = [position[0]/scale[0], position[1]/scale[1]];

      const [position, size] = this.translatePositionConfig(
        toVector(drawer.viewConfig.scale).reverse().toArray(),
      );
      const scale = toVector(this.scale)
        .divCoords(this._config.size)
        .mulCoords(size)
        .toArray();
      const scaledPosition: VectorArrayType = [position[0]/scale[0], position[1]/scale[1]];

      drawer.context.save();
      drawer.context.beginPath();
      drawer.context.scale(...scale);
      drawer.context.drawImage(this._img, ...scaledPosition);
      drawer.context.closePath();
      drawer.context.restore();

      return true;
    }

    return false;
  }
}
