import {
  DrawableInterface,
  DrawableConfigInterface,
  DrawableIdType,
  DrawerInterface,
  LinkedDataType,
  ObserveHelperInterface,
  ViewObservableHandlerType,
} from '../../types';
import ObserveHelper from '../../helpers/observe-helper';
import { areArraysEqual } from '../../helpers/base';

interface ConstructorInterface {
  id: DrawableIdType;
  config: DrawableConfigInterface;
  data?: LinkedDataType;
}

/**
 * Abstract class for drawable objects
 * @public
 */
export default abstract class Drawable implements DrawableInterface {
  /**
   * Object ID
   */
  protected _id: DrawableIdType;
  /**
   * Object type
   */
  protected _type: string;
  /**
   * View config
   */
  protected _config: DrawableConfigInterface;
  /**
   * Extra linked data
   */
  protected _data: LinkedDataType;
  /**
   * Observe helper
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

    this._observeHelper.withMutingHandlers(() => {
      const isZIndexChanged = config.zIndex !== this._config.zIndex;

      Object.entries(config).forEach(([key, value]) => {
        (this._config[key as keyof DrawableConfigInterface] as unknown) = value as unknown;
      });

      return [isChanged, { zIndexChanged: isZIndexChanged }];
    });
  }

  /**
   * Linked data getter
   */
  public get data(): LinkedDataType {
    return this._data;
  }

  /**
   * isInteractive getter
   */
  public get isInteractive(): boolean {
    return this._config.interactive && this._config.display;
  }

  /**
   * {@inheritDoc DrawableInterface.onViewChange}
   */
  public onViewChange(subscriberName: string, handler: ViewObservableHandlerType): void {
    this._observeHelper.onChange(subscriberName, handler);
  }

  /**
   * {@inheritDoc DrawableInterface.offViewChange}
   */
  public offViewChange(subscriberName: string): void {
    this._observeHelper.offChange(subscriberName);
  }

  /**
   * Drawable constructor
   * @param id - object ID
   * @param config - view config
   * @param data - linked extra data
   */
  protected constructor({
    id,
    config,
    data = {},
  }: ConstructorInterface) {
    this._id = id;
    this._observeHelper = new ObserveHelper();
    this._config = new Proxy(config, {
      set: (target: DrawableConfigInterface, index, value): boolean => {
        const isChanged = target[index as keyof DrawableConfigInterface] !== value;
        (target[index as keyof DrawableConfigInterface] as unknown) = value as unknown;
        return isChanged ? this._observeHelper.processWithMutingHandlers({
          zIndexChanged: index === 'zIndex',
        }) : true;
      },
    });
    this._data = new Proxy(data, {
      set: (target: LinkedDataType, index, value): boolean => {
        const isChanged = target[index as keyof LinkedDataType] !== value;
        target[index as keyof LinkedDataType] = value;
        return isChanged ? this._observeHelper.processWithMutingHandlers() : true;
      },
    });
  }
}
