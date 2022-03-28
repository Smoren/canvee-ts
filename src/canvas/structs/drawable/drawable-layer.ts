import {
  DrawableIdType,
  DrawableInterface,
  DrawableLayerConfigInterface,
  DrawableLayerInterface,
  DrawableStorageInterface,
  LinkedDataType,
} from '../../types';
import DrawableGroup from './drawable-group';
import DrawableStorage from './drawable-storage';

interface ConstructorInterface {
  id: DrawableIdType;
  config: DrawableLayerConfigInterface;
  data?: LinkedDataType;
  children?: DrawableInterface[];
}

/**
 * DrawableLayer class
 */
export default class DrawableLayer extends DrawableGroup implements DrawableLayerInterface {
  /**
   * {@inheritDoc DrawableLayerInterface.isLayer}
   */
  public isLayer: true = true;
  /**
   * View config
   */
  protected _config: DrawableLayerConfigInterface;

  /**
   * DrawableLayer constructor
   * @param id - group ID
   * @param config - config
   * @param data - extra data
   * @param children - children of grouped objects
   */
  constructor({
    id,
    config,
    data = {},
    children = [],
  }: ConstructorInterface) {
    super({
      id,
      config,
      data,
    });

    this._storage = new DrawableStorage(this._processChildrenToGroup(children));
    this._storage.onViewChange(this._subscriberName, (target, extra) => {
      this._observeHelper.processWithMutingHandlers(extra);
    });
  }

  /**
   * config getter
   */
  public get config(): DrawableLayerConfigInterface {
    return this._config;
  }

  /**
   * {@inheritDoc DrawableLayerInterface.storage}
   */
  public get storage(): DrawableStorageInterface {
    return this._storage;
  }
}
