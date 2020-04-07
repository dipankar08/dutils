declare type Item = {
    url: String;
    data: Object;
};
export declare class DTelemetry {
    static session: string;
    static app_id: string;
    static pendingItems: Array<Item>;
    static markAction(tag: string, extra?: Object): void;
    static markHits(extra?: Object): void;
    static markException(e: Error, extra?: Object): void;
    static init(napp_id: string): Promise<void>;
    static onDestory(): Promise<void>;
    private static pumpPending;
    private static pump;
}
export {};
