import {
  DrawableInterface,
  DrawableConfigInterface,
  DrawableIdType,
  DrawerInterface,
  LinkedDataType,
  VectorArrayType,
} from '../types';
import Drawable from '../structs/drawable';

/**
 * Interface for config of grid
 * @public
 */
export interface GridConfigInterface extends DrawableConfigInterface {
  mainLineColor: string;
  subLineColor: string;
  lineWidth: number;
  linesInBlock: number;
}

/**
 * Grid figure
 * @public
 */
export default class Grid extends Drawable implements DrawableInterface {
  /**
   * Object type
   */
  protected _type: string = 'Grid';
  /**
   * View config
   */
  protected _config: GridConfigInterface;

  /**
   * Grid constructor
   * @param id - object ID
   * @param config - view config
   * @param data - linked extra data
   */
  constructor(id: DrawableIdType, config: GridConfigInterface, data: LinkedDataType = {}) {
    super(id, config, data);
  }

  /**
   * {@inheritDoc DrawableInterface.draw}
   */
  draw(drawer: DrawerInterface): void {
    drawer.context.save();
    drawer.context.beginPath();

    const [fromBound, toBound] = drawer.getBounds();
    const scale = drawer.viewConfig.scale[0];

    drawer.context.lineWidth = this._config.lineWidth / scale;

    let step = drawer.viewConfig.gridStep;

    if (scale < 1) {
      step *= 2 ** Math.round(Math.log2(1 / scale));
    } else {
      step /= 2 ** Math.round(Math.log2(scale));
    }

    const mainLineDistance = step * this._config.linesInBlock;
    let xGap = (fromBound[0] % mainLineDistance);
    if (xGap < 0) {
      xGap += mainLineDistance;
    }
    let yGap = (fromBound[1] % mainLineDistance);
    if (yGap < 0) {
      yGap += mainLineDistance;
    }

    {
      let j = 0;
      for (let i=fromBound[1]-yGap; i<=toBound[1]; i+=step) {
        const color = (j++ % this._config.linesInBlock === 0)
          ? this._config.mainLineColor
          : this._config.subLineColor;
        this._drawHorizontalLine(i, drawer, color, [fromBound, toBound]);
      }
    }

    {
      let j = 0;
      for (let i=fromBound[0]-xGap; i<=toBound[0]; i+=step) {
        const color = (j++ % this._config.linesInBlock === 0)
          ? this._config.mainLineColor
          : this._config.subLineColor;
        this._drawVerticalLine(i, drawer, color, [fromBound, toBound]);
      }
    }

    drawer.context.closePath();
    drawer.context.restore();
  }

  /**
   * Draw horizontal line
   * @param yOffset - vertical offset
   * @param drawer - drawer object
   * @param color - color
   * @param fromBound - left-top bound
   * @param toBound - right-bottom bound
   */
  protected _drawHorizontalLine(
    yOffset: number,
    drawer: DrawerInterface,
    color: string,
    [fromBound, toBound]: [VectorArrayType, VectorArrayType],
  ) {
    const lineFrom = [fromBound[0], yOffset];
    const lineTo = [toBound[0], yOffset];

    drawer.context.beginPath();
    drawer.context.strokeStyle = color;
    drawer.context.moveTo(lineFrom[0], lineFrom[1]);
    drawer.context.lineTo(lineTo[0], lineTo[1]);
    drawer.context.stroke();
    drawer.context.closePath();

    return this;
  }

  /**
   * Draw vertical line
   * @param drawer - drawer object
   * @param xOffset - horizontal offset
   * @param color - color
   * @param fromBound - left-top bound
   * @param toBound - right-bottom bound
   */
  protected _drawVerticalLine(
    xOffset: number,
    drawer: DrawerInterface,
    color: string,
    [fromBound, toBound]: [VectorArrayType, VectorArrayType],
  ) {
    const lineFrom = [xOffset, fromBound[1]];
    const lineTo = [xOffset, toBound[1]];

    drawer.context.beginPath();
    drawer.context.strokeStyle = color;
    drawer.context.moveTo(lineFrom[0], lineFrom[1]);
    drawer.context.lineTo(lineTo[0], lineTo[1]);
    drawer.context.stroke();
    drawer.context.closePath();

    return this;
  }
}
