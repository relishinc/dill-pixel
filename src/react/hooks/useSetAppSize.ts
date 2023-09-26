import React from 'react';
import { useHLF } from '../global';

export const useSetAppSize = (el: HTMLElement | Window) => {
  const setSize = useHLF((state) => state.setSize);
  React.useEffect(() => {
    window.addEventListener('resize', () => setSize(el));
    setSize(el);
    return () => {
      window.removeEventListener('resize', () => setSize(el));
    };
  }, [el, setSize]);
};
