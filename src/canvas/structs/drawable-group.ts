import {
  DrawableConfigInterface,
  DrawableGroupInterface,
  DrawableIdType,
  DrawableInterface,
  DrawerInterface,
  LinkedDataType, VectorArrayType
} from "../types";
import Drawable from "./drawable";
import { createVector } from "./vector";

export default class DrawableGroup extends Drawable implements DrawableGroupInterface {
  /**
   * List of objects in group
   * @protected
   */
  protected _list: DrawableInterface[];

  /**
   * DrawableGroup constructor
   * @param id - group ID
   * @param config - config
   * @param data - extra data
   * @param list - list of grouped objects
   */
  constructor(
    id: DrawableIdType,
    config: DrawableConfigInterface,
    data: LinkedDataType = {},
    list: DrawableInterface[]
  ) {
    super(id, config, data);

    // TODO нужен ли здесь Proxy?
    this._list = new Proxy(list as DrawableInterface[], {
      set: (target: DrawableInterface[], index, value): boolean => {
        (target[index as keyof DrawableInterface[]] as unknown) = value as unknown;
        return this._observeHelper.processWithMuteHandlers();
      },
    });
  }

  /**
   * {@inheritDoc DrawableInterface.setPosition}
   */
  public setPosition(coords: VectorArrayType) {
    const difference = createVector(coords)
      .sub(createVector(this._config.position))
      .toArray();

    this._observeHelper.withMuteHandlers(() => {
      this._list.forEach((item) => {
        item.movePosition(difference);
      });
    });

    super.setPosition(coords);
  }

  /**
   * {@inheritDoc DrawableInterface.draw}
   */
  public draw(drawer: DrawerInterface): void {
    if (!this._config.visible) {
      return;
    }

    this._list.forEach((item) => {
      item.draw(drawer);
    });
  }

  /**
   * List getter
   */
  public get list(): DrawableInterface[] {
    return this._list;
  }
}