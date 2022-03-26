import {
  ExtraDataType,
  ObserveHelperInterface,
  ViewObservableCallbackType,
  ViewObservableHandlerType,
} from '../types';

/**
 * Helper for observable logic
 * @public
 */
export default class ObserveHelper implements ObserveHelperInterface {
  /**
   * Handlers mapped by subscribers
   */
  protected _handlerMap: Record<string, ViewObservableHandlerType> = {};
  /**
   * Flag for muting handlers
   */
  protected _muteHandlers: boolean = false;

  /**
   * {@inheritDoc ObserveHelperInterface.onChange}
   */
  public onChange(subscriberName: string, handler: ViewObservableHandlerType): void {
    this._handlerMap[subscriberName] = handler;
  }

  /**
   * {@inheritDoc ObserveHelperInterface.offChange}
   */
  public offChange(subscriberName: string): void {
    delete this._handlerMap[subscriberName];
  }

  /**
   * {@inheritDoc ObserveHelperInterface.processWithMutingHandlers}
   */
  public processWithMutingHandlers(extra: ExtraDataType | null = null): boolean {
    return this.withMutingHandlers(() => [true, extra]);
  }

  /**
   * {@inheritDoc ObserveHelperInterface.withMutingHandlers}
   */
  public withMutingHandlers(action: ViewObservableCallbackType): boolean {
    if (this._muteHandlers) {
      action(this);
    } else {
      this._muteHandlers = true;
      const [processFlag, extra] = action(this);
      this._muteHandlers = false;

      if (processFlag) {
        return this._processHandlers(extra);
      }
    }

    return true;
  }

  /**
   * Process all registered handlers
   * @param extra - linked extra data
   */
  protected _processHandlers(extra: ExtraDataType | null = null): boolean {
    Object.values(this._handlerMap)
      .forEach((handler) => handler(this, extra));

    return true;
  }
}
