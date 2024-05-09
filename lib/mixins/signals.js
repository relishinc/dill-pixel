import { SignalConnections } from '../signals';
export function WithSignals(Base) {
    return class extends Base {
        signalConnections = new SignalConnections();
        /**
         * Add signal connections to the container.
         * @param args - The signal connections to add.
         */
        addSignalConnection(...args) {
            for (const connection of args) {
                this.signalConnections.add(connection);
            }
        }
        destroy(options) {
            this.signalConnections.disconnectAll();
            super.destroy(options);
        }
    };
}
