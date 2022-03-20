import {
  DrawableConfigInterface,
  DrawableIdType,
  DrawableInterface,
  DrawerInterface,
  LinkedDataType,
  ObserveHelperInterface, VectorArrayType, ViewObservableHandlerType,
} from "../types";
import { areArraysEqual } from "../helpers/base";
import ObserveHelper from "../helpers/observe-helper";

/**
 * Abstract class for drawable objects
 * @public
 */
export default abstract class Drawable implements DrawableInterface {
  /**
   * Object ID
   * @protected
   */
  protected _id: DrawableIdType;
  /**
   * Object type
   * @protected
   */
  protected _type: string;
  /**
   * View config
   * @protected
   */
  protected _config: DrawableConfigInterface;
  /**
   * Extra linked data
   * @protected
   */
  protected _data: LinkedDataType;
  /**
   * Observe helper
   * @protected
   */
  protected _observeHelper: ObserveHelperInterface;

  /**
   * {@inheritDoc DrawableInterface.draw}
   */
  public abstract draw(drawer: DrawerInterface): void;

  /**
   * ID getter
   */
  public get id(): DrawableIdType {
    return this._id;
  }

  /**
   * Type getter
   */
  public get type(): string {
    return this._type;
  }

  /**
   * View config getter
   */
  public get config(): DrawableConfigInterface {
    return this._config;
  }

  /**
   * View config setter
   * @param config - view config
   */
  public set config(config: DrawableConfigInterface) {
    const isChanged = !areArraysEqual(Object.entries(config), Object.entries(this._config));

    this._observeHelper.withMuteHandlers(((mutedBefore: boolean, manager: ObserveHelperInterface) => {
      const isZIndexChanged = config.zIndex !== this._config.zIndex;

      Object.entries(config).forEach(([key, value]) => {
        this._config[key as keyof DrawableConfigInterface] = value;
      });

      manager.processHandlers(!isChanged || mutedBefore, {
        zIndexChanged: isZIndexChanged,
      });
    }))
  }

  /**
   * Linked data getter
   */
  public get data(): LinkedDataType {
    return this._data;
  }

  /**
   * {@inheritDoc DrawableInterface.onViewChange}
   */
  public onViewChange(subscriberName: string, handler: ViewObservableHandlerType): void {
    this._observeHelper.onChange(subscriberName, handler);
  }

  /**
   * Drawable constructor
   * @param id - object ID
   * @param config - view config
   * @param data - linked extra data
   * @protected
   */
  protected constructor(id: DrawableIdType, config: DrawableConfigInterface, data: LinkedDataType = {}) {
    this._id = id;
    this._observeHelper = new ObserveHelper();
    this._config = new Proxy(config, {
      set: (target: DrawableConfigInterface, index, value): boolean => {
        const isChanged = target[index as keyof DrawableConfigInterface] !== value;
        target[index as keyof DrawableConfigInterface] = value;
        return isChanged ? this._observeHelper.processWithMuteHandlers({
          zIndexChanged: index === 'zIndex',
        }) : true;
      },
    });
    this._data = new Proxy(data, {
      set: (target: LinkedDataType, index, value): boolean => {
        const isChanged = target[index as keyof LinkedDataType] !== value;
        target[index as keyof LinkedDataType] = value;
        return isChanged ? this._observeHelper.processWithMuteHandlers() : true;
      },
    });
  }
}
