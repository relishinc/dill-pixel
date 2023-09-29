import { jsx as _jsx } from "react/jsx-runtime";
import { DARK_GREEN } from '@/utils/Constants.ts';
import { Graphics } from '@pixi/react';
import { useHLF } from 'html-living-framework/react';
export const BasicStateBackground = ({ color = DARK_GREEN }) => {
    const size = useHLF((globalState) => globalState.size);
    return (_jsx(Graphics, { draw: (g) => {
            g.clear();
            g.beginFill(color, 1);
            g.drawRect(0, 0, size.width, size.height);
            g.endFill();
        } }));
};
//# sourceMappingURL=BasicStateBackground.js.map