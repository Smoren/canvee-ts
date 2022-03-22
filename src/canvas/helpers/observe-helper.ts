import { ObserveHelperInterface, ViewObservableHandlerType } from '../types';

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
  public onChange(
    subscriberName: string,
    handler: ViewObservableHandlerType,
  ): void {
    this._handlerMap[subscriberName] = handler;
  }

  /**
   * {@inheritDoc ObserveHelperInterface.offChange}
   */
  public offChange(subscriberName: string): void {
    delete this._handlerMap[subscriberName];
  }

  /**
   * {@inheritDoc ObserveHelperInterface.processWithMuteHandlers}
   */
  public processWithMuteHandlers(
    extra: Record<string, unknown> | null = null,
  ): boolean {
    return this.withMuteHandlers((mutedBefore: boolean) => this.processHandlers(mutedBefore, extra));
  }

  /**
   * {@inheritDoc ObserveHelperInterface.withMuteHandlers}
   */
  public withMuteHandlers(
    action: (mutedBefore: boolean, manager: ObserveHelperInterface) => void,
  ): boolean {
    if (this._muteHandlers) {
      action(true, this);
    } else {
      this._muteHandlers = true;
      action(false, this);
      this._muteHandlers = false;
    }

    return true;
  }

  /**
   * {@inheritDoc ObserveHelperInterface.processHandlers}
   */
  public processHandlers(
    isMuted: boolean,
    extra: Record<string, unknown> | null = null,
  ): boolean {
    if (!isMuted) {
      Object.values(this._handlerMap)
        .forEach((handler) => handler(this, extra));
    }

    return true;
  }
}
