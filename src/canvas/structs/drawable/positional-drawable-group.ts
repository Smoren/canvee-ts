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
import { BoundInterface } from '../../types/bound';
import RectangularBound from '../bounds/rectangular-bound';
import { transposeCoordsBackward } from '../vector/helpers';
import { isPositional } from '../../helpers/type-helpers';
import PositionalDrawable from './positional-drawable';

interface ConstructorInterface {
  id: DrawableIdType;
  config: PositionalDrawableConfigInterface;
  data?: LinkedDataType;
  list?: PositionalDrawableInterface[];
}

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
   * @param list - list of grouped objects
   */
  constructor({
    id,
    config,
    data = {},
    list = [],
  }: ConstructorInterface) {
    super({
      id,
      config,
      data,
      list,
    });
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
   * {@inheritDoc DrawableInterface.getRelativePosition}
   */
  public getRelativePosition(point: VectorArrayType): VectorArrayType {
    return createVector(point)
      .sub(createVector(this.config.position))
      .toArray();
  }

  /**
   * {@inheritDoc DrawableInterface.boundIncludes}
   */
  public boundIncludes(coords: VectorArrayType): boolean {
    for (const child of this.list) {
      if (
        isPositional(child)
        && (child as PositionalDrawable).boundIncludes(transposeCoordsBackward(coords, this._config.position))
      ) {
        return true;
      }
    }

    return false;
  }

  /**
   * {@inheritDoc DrawableInterface.isNearBoundEdge}
   */
  isNearBoundEdge(coords: VectorArrayType, deviation: number): boolean {
    return this.bound.isNearEdge(
      transposeCoordsBackward(coords, this._config.position),
      deviation,
    );
  }

  /**
   * List getter
   */
  public get list(): PositionalDrawableInterface[] {
    return this._storage.list as PositionalDrawableInterface[];
  }

  /**
   * View config getter
   */
  public get config(): PositionalDrawableConfigInterface {
    return this._config;
  }

  /**
   * bound getter
   */
  public get bound(): BoundInterface {
    return new RectangularBound({
      position: [0, 0],
      size: this._config.size,
    });
  }

  /**
   * Some actions with list before grouping
   */
  protected _processListToGroup(list: PositionalDrawableInterface[]): PositionalDrawableInterface[] {
    list.forEach((item) => {
      item.movePosition(
        createVector(this._config.position).inverse().toArray(),
      );
    });
    return list;
  }

  /**
   * Some actions with list before ungrouping
   */
  protected _processListToUngroup(list: PositionalDrawableInterface[]): PositionalDrawableInterface[] {
    list.forEach((item) => {
      item.movePosition(this._config.position);
    });

    return list;
  }
}
