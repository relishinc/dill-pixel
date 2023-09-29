import React from 'react';
import { useHLF } from '../global';
export const useSetAppSize = (el) => {
    const setSize = useHLF((state) => state.setSize);
    React.useEffect(() => {
        window.addEventListener('resize', () => setSize(el));
        setSize(el);
        return () => {
            window.removeEventListener('resize', () => setSize(el));
        };
    }, [el, setSize]);
};
//# sourceMappingURL=useSetAppSize.js.map