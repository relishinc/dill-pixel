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
import { TextureAtlas } from './TextureAtlas';
export class AssetManagerBase {
    pathPrefix = '';
    textureLoader;
    downloader;
    assets = {};
    errors = {};
    toLoad = 0;
    loaded = 0;
    constructor(textureLoader, pathPrefix = '', downloader = new Downloader()) {
        this.textureLoader = textureLoader;
        this.pathPrefix = pathPrefix;
        this.downloader = downloader;
    }
    dispose() {
        this.removeAll();
    }
    loadAll() {
        const promise = new Promise((resolve, reject) => {
            const check = () => {
                if (this.isLoadingComplete()) {
                    if (this.hasErrors())
                        reject(this.errors);
                    else
                        resolve(this);
                    return;
                }
                requestAnimationFrame(check);
            };
            requestAnimationFrame(check);
        });
        return promise;
    }
    setRawDataURI(path, data) {
        this.downloader.rawDataUris[this.pathPrefix + path] = data;
    }
    loadBinary(path, success = () => { }, error = () => { }) {
        path = this.start(path);
        this.downloader.downloadBinary(path, (data) => {
            this.success(success, path, data);
        }, (status, responseText) => {
            this.error(error, path, `Couldn't load binary ${path}: status ${status}, ${responseText}`);
        });
    }
    loadText(path, success = () => { }, error = () => { }) {
        path = this.start(path);
        this.downloader.downloadText(path, (data) => {
            this.success(success, path, data);
        }, (status, responseText) => {
            this.error(error, path, `Couldn't load text ${path}: status ${status}, ${responseText}`);
        });
    }
    loadJson(path, success = () => { }, error = () => { }) {
        path = this.start(path);
        this.downloader.downloadJson(path, (data) => {
            this.success(success, path, data);
        }, (status, responseText) => {
            this.error(error, path, `Couldn't load JSON ${path}: status ${status}, ${responseText}`);
        });
    }
    loadTexture(path, success = () => { }, error = () => { }) {
        path = this.start(path);
        const isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document);
        const isWebWorker = !isBrowser; // && typeof importScripts !== 'undefined';
        if (isWebWorker) {
            fetch(path, { mode: 'cors' })
                .then((response) => {
                if (response.ok)
                    return response.blob();
                this.error(error, path, `Couldn't load image: ${path}`);
                return null;
            })
                .then((blob) => {
                return blob ? createImageBitmap(blob, { premultiplyAlpha: 'none', colorSpaceConversion: 'none' }) : null;
            })
                .then((bitmap) => {
                if (bitmap)
                    this.success(success, path, this.textureLoader(bitmap));
            });
        }
        else {
            const image = new Image();
            image.crossOrigin = 'anonymous';
            image.onload = () => {
                this.success(success, path, this.textureLoader(image));
            };
            image.onerror = () => {
                this.error(error, path, `Couldn't load image: ${path}`);
            };
            if (this.downloader.rawDataUris[path])
                path = this.downloader.rawDataUris[path];
            image.src = path;
        }
    }
    loadTextureAtlas(path, success = () => { }, error = () => { }, fileAlias) {
        const index = path.lastIndexOf('/');
        const parent = index >= 0 ? path.substring(0, index + 1) : '';
        path = this.start(path);
        this.downloader.downloadText(path, (atlasText) => {
            try {
                const atlas = new TextureAtlas(atlasText);
                let toLoad = atlas.pages.length, abort = false;
                for (const page of atlas.pages) {
                    this.loadTexture(!fileAlias ? parent + page.name : fileAlias[page.name], (imagePath, texture) => {
                        if (!abort) {
                            page.setTexture(texture);
                            if (--toLoad == 0)
                                this.success(success, path, atlas);
                        }
                    }, (imagePath, message) => {
                        if (!abort)
                            this.error(error, path, `Couldn't load texture atlas ${path} page image: ${imagePath}`);
                        abort = true;
                    });
                }
            }
            catch (e) {
                this.error(error, path, `Couldn't parse texture atlas ${path}: ${e.message}`);
            }
        }, (status, responseText) => {
            this.error(error, path, `Couldn't load texture atlas ${path}: status ${status}, ${responseText}`);
        });
    }
    get(path) {
        return this.assets[this.pathPrefix + path];
    }
    require(path) {
        path = this.pathPrefix + path;
        const asset = this.assets[path];
        if (asset)
            return asset;
        const error = this.errors[path];
        throw Error('Asset not found: ' + path + (error ? '\n' + error : ''));
    }
    remove(path) {
        path = this.pathPrefix + path;
        const asset = this.assets[path];
        if (asset.dispose)
            asset.dispose();
        delete this.assets[path];
        return asset;
    }
    removeAll() {
        for (const key in this.assets) {
            const asset = this.assets[key];
            if (asset.dispose)
                asset.dispose();
        }
        this.assets = {};
    }
    isLoadingComplete() {
        return this.toLoad == 0;
    }
    getToLoad() {
        return this.toLoad;
    }
    getLoaded() {
        return this.loaded;
    }
    hasErrors() {
        return Object.keys(this.errors).length > 0;
    }
    getErrors() {
        return this.errors;
    }
    start(path) {
        this.toLoad++;
        return this.pathPrefix + path;
    }
    success(callback, path, asset) {
        this.toLoad--;
        this.loaded++;
        this.assets[path] = asset;
        if (callback)
            callback(path, asset);
    }
    error(callback, path, message) {
        this.toLoad--;
        this.loaded++;
        this.errors[path] = message;
        if (callback)
            callback(path, message);
    }
}
export class Downloader {
    rawDataUris = {};
    callbacks = {};
    dataUriToString(dataUri) {
        if (!dataUri.startsWith('data:')) {
            throw new Error('Not a data URI.');
        }
        let base64Idx = dataUri.indexOf('base64,');
        if (base64Idx != -1) {
            base64Idx += 'base64,'.length;
            return atob(dataUri.substr(base64Idx));
        }
        else {
            return dataUri.substr(dataUri.indexOf(',') + 1);
        }
    }
    base64ToUint8Array(base64) {
        const binary_string = window.atob(base64);
        const len = binary_string.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes;
    }
    dataUriToUint8Array(dataUri) {
        if (!dataUri.startsWith('data:')) {
            throw new Error('Not a data URI.');
        }
        let base64Idx = dataUri.indexOf('base64,');
        if (base64Idx == -1)
            throw new Error('Not a binary data URI.');
        base64Idx += 'base64,'.length;
        return this.base64ToUint8Array(dataUri.substr(base64Idx));
    }
    downloadText(url, success, error) {
        if (this.start(url, success, error))
            return;
        if (this.rawDataUris[url]) {
            try {
                const dataUri = this.rawDataUris[url];
                this.finish(url, 200, this.dataUriToString(dataUri));
            }
            catch (e) {
                this.finish(url, 400, JSON.stringify(e));
            }
            return;
        }
        const request = new XMLHttpRequest();
        request.overrideMimeType('text/html');
        request.open('GET', url, true);
        const done = () => {
            this.finish(url, request.status, request.responseText);
        };
        request.onload = done;
        request.onerror = done;
        request.send();
    }
    downloadJson(url, success, error) {
        this.downloadText(url, (data) => {
            success(JSON.parse(data));
        }, error);
    }
    downloadBinary(url, success, error) {
        if (this.start(url, success, error))
            return;
        if (this.rawDataUris[url]) {
            try {
                const dataUri = this.rawDataUris[url];
                this.finish(url, 200, this.dataUriToUint8Array(dataUri));
            }
            catch (e) {
                this.finish(url, 400, JSON.stringify(e));
            }
            return;
        }
        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        const onerror = () => {
            this.finish(url, request.status, request.response);
        };
        request.onload = () => {
            if (request.status == 200 || request.status == 0)
                this.finish(url, 200, new Uint8Array(request.response));
            else
                onerror();
        };
        request.onerror = onerror;
        request.send();
    }
    start(url, success, error) {
        let callbacks = this.callbacks[url];
        try {
            if (callbacks)
                return true;
            this.callbacks[url] = callbacks = [];
        }
        finally {
            callbacks.push(success, error);
        }
    }
    finish(url, status, data) {
        const callbacks = this.callbacks[url];
        delete this.callbacks[url];
        const args = status == 200 || status == 0 ? [data] : [status, data];
        for (let i = args.length - 1, n = callbacks.length; i < n; i += 2)
            callbacks[i].apply(null, args);
    }
}
