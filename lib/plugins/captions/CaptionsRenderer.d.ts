import { Container } from '../../display/Container';
import { Size } from '../../utils/types';
import { CaptionsPlugin } from './CaptionsPlugin';
import { PIXIContainer } from '../../pixi';
export type CaptionLine = {
    id: string;
    start: number;
    end: number;
    content: string;
    speaker?: string;
};
export interface ICaptionRenderer extends PIXIContainer {
    visible: boolean;
    start(): void;
    stop(): void;
    lineBegin(line: CaptionLine): void;
    lineEnd(line: CaptionLine): void;
    resize(size?: Size): void;
    updateSettings(): void;
    destroy(): void;
}
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
