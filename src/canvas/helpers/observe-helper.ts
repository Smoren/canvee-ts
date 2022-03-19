import { ObserveHelperInterface, ViewObservableHandlerType } from "../types";

/**
 * Helper for observable logic
 * @public
 */
export default class ObserveHelper implements ObserveHelperInterface {
    /**
     * Handlers mapped by subscribers
     * @protected
     */
    protected _handlerMap: Record<string, ViewObservableHandlerType> = {};
    /**
     * Flag for muting handlers
     * @protected
     */
    protected _muteHandlers: boolean = false;

    /**
     * @inheritDoc
     */
    public onChange(
        subscriberName: string,
        handler: ViewObservableHandlerType
    ): void {
        this._handlerMap[subscriberName] = handler;
    }

    /**
     * @inheritDoc
     */
    public processWithMuteHandlers(
        extra: Record<string, unknown> | null = null
    ): boolean {
        return this.withMuteHandlers((mutedBefore: boolean) => {
            return this.processHandlers(mutedBefore, extra);
        });
    }

    /**
     * @inheritDoc
     */
    public withMuteHandlers(
        action: (mutedBefore: boolean, manager: ObserveHelperInterface) => void
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
     * @inheritDoc
     */
    public processHandlers(
        isMuted: boolean,
        extra: Record<string, unknown> | null = null
    ): boolean {
        if (!isMuted) {
            Object.values(this._handlerMap)
                .forEach(handler => handler(this, extra));
        }

        return true;
    }
}
