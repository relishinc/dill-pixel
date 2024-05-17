/******************************************************************************
 * Spine Runtimes License Agreement
 * Last updated July 28, 2023. Replaces all prior versions.
 *
 * Copyright (c) 2013-2023, Esoteric Software LLC
 *
 * Integration of the Spine Runtimes into software or otherwise creating
 * derivative works of the Spine Runtimes is permitted under the terms and
 * conditions of Section 2 of the Spine Editor License Agreement:
 * http://esotericsoftware.com/spine-editor-license
 *
 * Otherwise, it is permitted to integrate the Spine Runtimes into software or
 * otherwise create derivative works of the Spine Runtimes (collectively,
 * "Products"), provided that each user of the Products must obtain their own
 * Spine Editor license and redistribution of the Products in any form must
 * include this license and copyright notice.
 *
 * THE SPINE RUNTIMES ARE PROVIDED BY ESOTERIC SOFTWARE LLC "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ESOTERIC SOFTWARE LLC BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES,
 * BUSINESS INTERRUPTION, OR LOSS OF USE, DATA, OR PROFITS) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THE
 * SPINE RUNTIMES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *****************************************************************************/
import { Texture } from './Texture';
import { TextureAtlas } from './TextureAtlas';
import { Disposable, StringMap } from './Utils';
export declare class AssetManagerBase implements Disposable {
    private pathPrefix;
    private textureLoader;
    private downloader;
    private assets;
    private errors;
    private toLoad;
    private loaded;
    constructor(textureLoader: (image: HTMLImageElement | ImageBitmap) => Texture, pathPrefix?: string, downloader?: Downloader);
    dispose(): void;
    loadAll(): Promise<AssetManagerBase>;
    setRawDataURI(path: string, data: string): void;
    loadBinary(path: string, success?: (path: string, binary: Uint8Array) => void, error?: (path: string, message: string) => void): void;
    loadText(path: string, success?: (path: string, text: string) => void, error?: (path: string, message: string) => void): void;
    loadJson(path: string, success?: (path: string, object: object) => void, error?: (path: string, message: string) => void): void;
    loadTexture(path: string, success?: (path: string, texture: Texture) => void, error?: (path: string, message: string) => void): void;
    loadTextureAtlas(path: string, success?: (path: string, atlas: TextureAtlas) => void, error?: (path: string, message: string) => void, fileAlias?: {
        [keyword: string]: string;
    }): void;
    get(path: string): any;
    require(path: string): any;
    remove(path: string): any;
    removeAll(): void;
    isLoadingComplete(): boolean;
    getToLoad(): number;
    getLoaded(): number;
    hasErrors(): boolean;
    getErrors(): StringMap<string>;
    private start;
    private success;
    private error;
}
export declare class Downloader {
    rawDataUris: StringMap<string>;
    private callbacks;
    dataUriToString(dataUri: string): string;
    base64ToUint8Array(base64: string): Uint8Array;
    dataUriToUint8Array(dataUri: string): Uint8Array;
    downloadText(url: string, success: (data: string) => void, error: (status: number, responseText: string) => void): void;
    downloadJson(url: string, success: (data: object) => void, error: (status: number, responseText: string) => void): void;
    downloadBinary(url: string, success: (data: Uint8Array) => void, error: (status: number, responseText: string) => void): void;
    private start;
    private finish;
}
