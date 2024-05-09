import { Size } from '../../utils/types';
export type CaptionToken = {
    id: string;
    args?: any;
};
export type CaptionLine = {
    id: string;
    start: number;
    end: number;
    content: string;
    speaker?: string;
};
export interface ICaptionRenderer {
    visible: boolean;
    start(): void;
    stop(): void;
    lineBegin(line: CaptionLine): void;
    lineEnd(line: CaptionLine): void;
    resize(size: Size): void;
}
export type CaptionData = {
    [key: string]: {
        content: string;
        start: number;
        end: number;
        speaker?: string;
    }[];
};
