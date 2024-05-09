import { Container } from '../../display/Container';
import { CaptionsPlugin } from './CaptionsPlugin';
import { CaptionLine, ICaptionRenderer } from './types';
export declare class CaptionsRenderer extends Container implements ICaptionRenderer {
    private plugin;
    private readonly _bg;
    private readonly _text;
    private readonly _size;
    private readonly fontSize;
    constructor(plugin: CaptionsPlugin);
    start(): void;
    stop(): void;
    lineBegin(line: CaptionLine): void;
    lineEnd(_line: CaptionLine): void;
    resize(): void;
    updateSettings(): void;
    private getSizeMultiplier;
}
