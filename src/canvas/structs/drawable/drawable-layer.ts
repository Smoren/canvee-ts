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
  list?: DrawableInterface[];
}

/**
 * DrawableLayer class
 */
export default class DrawableLayer extends DrawableGroup implements DrawableLayerInterface {
  /**
   * {@inheritDoc DrawableLayerInterface.isLayer}
   */
  public isLayer: boolean = true;
  /**
   * View config
   */
  protected _config: DrawableLayerConfigInterface;

  /**
   * DrawableLayer constructor
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
    });

    this._storage = new DrawableStorage(this._processListToGroup(list));
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
