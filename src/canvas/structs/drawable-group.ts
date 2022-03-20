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
   * Name of class to use as subscriber name in observable logic
   * @protected
   */
  protected _subscriberName: 'DrawableGroup';
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

    this._observeHelper.onChange(this._subscriberName, (target) => {
      console.log('asdasd', target);
    });

    // TODO нужен ли здесь Proxy?
    this._list = new Proxy(list as DrawableInterface[], {
      set: (target: DrawableInterface[], index, value): boolean => {
        (target[index as keyof DrawableInterface[]] as unknown) = value as unknown;
        return this._observeHelper.processWithMuteHandlers();
      },
    });
  }

  /**
   * {@inheritDoc DrawableInterface.draw}
   */
  public draw(drawer: DrawerInterface): void {
    if (!this._config.visible) {
      return;
    }

    drawer.context.save();
    drawer.context.translate(...this.config.position);
    this._list.forEach((item) => {
      item.draw(drawer);
    });
    drawer.context.restore();
  }

  /**
   * List getter
   */
  public get list(): DrawableInterface[] {
    return this._list;
  }
}