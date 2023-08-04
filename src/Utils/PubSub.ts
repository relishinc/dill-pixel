import * as PubSub from "pubsub-js";

export function broadcast(message: string, data?: any | undefined) {
	return PubSub.publishSync(message, data);
}

export function subscribe<T, M>(
	message: string,
	callback: (message: T, data: M) => void
) {
	return PubSub.subscribe(message, callback as () => void);
}

export function subscribeOnce<T, M>(
	message: string,
	callback: (message: T, data: M) => void
) {
	return PubSub.subscribeOnce(message, callback as () => void);
}

export function unsubscribe(
	message: string
) {
	return PubSub.unsubscribe(message);
}
