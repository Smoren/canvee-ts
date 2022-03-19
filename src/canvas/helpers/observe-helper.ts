import { ObserveManagerInterface } from "../types";

export default class ObserveHelper implements ObserveManagerInterface {
    protected _handlerMap: Record<string, (target: unknown) => void> = {};
    protected _muteHandlers: boolean = false;

    public onChange(actorName: string, handler: (target: unknown) => void): void {
        this._handlerMap[actorName] = handler;
    }

    public processWithMuteHandlers(): boolean {
        return this.withMuteHandlers((mutedBefore: boolean) => {
            return this.processHandlers(mutedBefore);
        });
    }

    public withMuteHandlers(action: (mutedBefore: boolean, manager: ObserveManagerInterface) => void): boolean {
        if (this._muteHandlers) {
            action(true, this);
        } else {
            this._muteHandlers = true;
            action(false, this);
            this._muteHandlers = false;
        }

        return true;
    }

    public processHandlers(isMuted: boolean): boolean {
        if (!isMuted) {
            Object.values(this._handlerMap)
                .forEach(handler => handler(this));
        }

        return true;
    }
}
