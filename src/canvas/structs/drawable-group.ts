import {
  DrawableConfigInterface,
  DrawableGroupInterface,
  DrawableIdType,
  DrawableInterface,
  DrawerInterface,
  LinkedDataType,
} from '../types';
import Drawable from './drawable';

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
    list: DrawableInterface[] = [],
  ) {
    super(id, config, data);

    list.forEach((item) => {
      item.onViewChange(this._subscriberName, () => this._observeHelper.processWithMuteHandlers());
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
    drawer.context.save();
    drawer.context.translate(...this.config.position);
    this._list.forEach((item) => {
      if (item.config.visible) {
        item.draw(drawer);
      }
    });
    drawer.context.restore();
  }

  /**
   * {@inheritDoc DrawableInterface.destruct}
   */
  public destruct(): void {
    this._list.forEach((item) => {
      item.offViewChange(this._subscriberName);
    });
  }

  /**
   * List getter
   */
  public get list(): DrawableInterface[] {
    return this._list;
  }
}
