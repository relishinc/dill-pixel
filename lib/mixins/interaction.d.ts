import { AllFederatedEventMap, FederatedEvent } from 'pixi.js';
import { PIXIContainer } from '../pixi';
import { Signal } from '../signals';
import { Constructor } from '../utils';

type InteractionEventName = keyof AllFederatedEventMap;
type InteractionSignal = Signal<(event: FederatedEvent) => void>;
export interface IInteractive {
    onInteraction: (eventName: InteractionEventName) => InteractionSignal;
}
export declare function Interactive<TBase extends Constructor<PIXIContainer>>(Base: TBase): TBase & Constructor<IInteractive>;
export {};
//# sourceMappingURL=interaction.d.ts.map