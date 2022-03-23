import {
  PositionalDrawableInterface,
  PositionalDrawableConfigInterface,
  DrawableIdType,
  DrawerInterface,
  LinkedDataType,
  VectorArrayType,
  PositionalDrawableGroupInterface,
} from '../../types';
import DrawableGroup from '../drawable/drawable-group';
import { createVector } from '../vector';

/**
 * Positional drawable group class
 */
export default class PositionalDrawableGroup extends DrawableGroup implements PositionalDrawableGroupInterface {
  /**
   * Interface belonging flag
   */
  public isPositional: true = true;
  /**
   * Name of class to use as subscriber name in observable logic
   */
  protected _subscriberName: string = 'PositionalDrawableGroup';
  /**
   * View config
   */
  protected _config: PositionalDrawableConfigInterface;

  /**
   * DrawableGroup constructor
   * @param id - group ID
   * @param config - config
   * @param data - extra data
   * @param children - children of grouped objects
   */
  constructor(
    id: DrawableIdType,
    config: PositionalDrawableConfigInterface,
    data: LinkedDataType = {},
    children: PositionalDrawableInterface[] = [],
  ) {
    super(id, config, data, children);
  }

  /**
   * {@inheritDoc DrawableInterface.draw}
   */
  public draw(drawer: DrawerInterface): void {
    drawer.context.save();
    drawer.context.translate(...this.config.position);
    super.draw(drawer);
    drawer.context.restore();
  }

  /**
   * {@inheritDoc DrawableInterface.setPosition}
   */
  public setPosition(coords: VectorArrayType): void {
    this._config.position = coords;
  }

  /**
   * {@inheritDoc DrawableInterface.movePosition}
   */
  public movePosition(offset: VectorArrayType): void {
    this.setPosition(
      createVector(this._config.position)
        .add(createVector(offset))
        .toArray(),
    );
  }

  /**
   * List getter
   */
  public get children(): PositionalDrawableInterface[] {
    return this._storage.list as PositionalDrawableInterface[];
  }

  /**
   * View config getter
   */
  public get config(): PositionalDrawableConfigInterface {
    return this._config;
  }

  /**
   * Some actions with children before grouping
   */
  protected _processChildrenToGroup(children: PositionalDrawableInterface[]): PositionalDrawableInterface[] {
    children.forEach((item) => {
      item.movePosition(
        createVector(this._config.position).inverse().toArray(),
      );
    });
    return children;
  }

  /**
   * Some actions with children before ungrouping
   */
  protected _processChildrenToUngroup(children: PositionalDrawableInterface[]): PositionalDrawableInterface[] {
    children.forEach((item) => {
      item.movePosition(this._config.position);
    });

    return children;
  }
}
