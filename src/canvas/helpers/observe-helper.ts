import { ObserveHelperInterface, ViewObservableHandlerType } from "../types";

export default class ObserveHelper implements ObserveHelperInterface {
    protected _handlerMap: Record<string, (target: unknown, extra: Record<string, unknown> | null) => void> = {};
    protected _muteHandlers: boolean = false;

    public onChange(
        subscriberName: string,
        handler: ViewObservableHandlerType
    ): void {
        this._handlerMap[subscriberName] = handler;
    }

    public processWithMuteHandlers(
        extra: Record<string, unknown> | null = null
    ): boolean {
        return this.withMuteHandlers((mutedBefore: boolean) => {
            return this.processHandlers(mutedBefore, extra);
        });
    }

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
