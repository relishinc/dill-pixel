import * as PubSub from "pubsub-js";
export function broadcast(message, data) {
    return PubSub.publishSync(message, data);
}
export function subscribe(message, callback) {
    return PubSub.subscribe(message, callback);
}
export function subscribeOnce(message, callback) {
    return PubSub.subscribeOnce(message, callback);
}
export function unsubscribe(message) {
    return PubSub.unsubscribe(message);
}
//# sourceMappingURL=PubSub.js.map