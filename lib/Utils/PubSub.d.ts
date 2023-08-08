/// <reference types="pubsub-js" />
export declare function broadcast(message: string, data?: any | undefined): boolean;
export declare function subscribe<T, M>(message: string, callback: (message: T, data: M) => void): string;
export declare function subscribeOnce<T, M>(message: string, callback: (message: T, data: M) => void): PubSubJS.Base<any, PubSubJS.Message>;
export declare function unsubscribe(message: string): string | boolean;
//# sourceMappingURL=PubSub.d.ts.map