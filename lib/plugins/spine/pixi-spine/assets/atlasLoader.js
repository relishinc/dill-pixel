/** ****************************************************************************
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
import { checkExtension, DOMAdapter, extensions, ExtensionType, LoaderParserPriority, path, TextureSource, } from 'pixi.js';
import { TextureAtlas } from '../../spine-core';
import { SpineTexture } from '../SpineTexture';
export const spineTextureAtlasLoader = {
    extension: ExtensionType.Asset,
    loader: {
        extension: {
            type: ExtensionType.LoadParser,
            priority: LoaderParserPriority.Normal,
            name: 'spineTextureAtlasLoader',
        },
        test(url) {
            return checkExtension(url, '.atlas');
        },
        async load(url) {
            const response = await DOMAdapter.get().fetch(url);
            const txt = await response.text();
            return txt;
        },
        testParse(asset, options) {
            const isExtensionRight = checkExtension(options.src, '.atlas');
            const isString = typeof asset === 'string';
            return Promise.resolve(isExtensionRight && isString);
        },
        unload(atlas) {
            atlas.dispose();
        },
        async parse(asset, options, loader) {
            const metadata = options.data || {};
            let basePath = path.dirname(options.src);
            if (basePath && basePath.lastIndexOf('/') !== basePath.length - 1) {
                basePath += '/';
            }
            // Retval is going to be a texture atlas. However we need to wait for it's callback to resolve this promise.
            const retval = new TextureAtlas(asset);
            // If the user gave me only one texture, that one is assumed to be the "first" texture in the atlas
            if (metadata.images instanceof TextureSource || typeof metadata.images === 'string') {
                const pixiTexture = metadata.images;
                metadata.images = {};
                metadata.images[retval.pages[0].name] = pixiTexture;
            }
            // we will wait for all promises for the textures at the same time at the end.
            const textureLoadingPromises = [];
            // fill the pages
            for (const page of retval.pages) {
                const pageName = page.name;
                const providedPage = metadata?.images ? metadata.images[pageName] : undefined;
                if (providedPage instanceof TextureSource) {
                    page.setTexture(SpineTexture.from(providedPage));
                }
                else {
                    // eslint-disable-next-line max-len
                    const url = providedPage ?? path.normalize([...basePath.split(path.sep), pageName].join(path.sep));
                    const pixiPromise = loader.load({ src: url, data: metadata.imageMetadata }).then((texture) => {
                        page.setTexture(SpineTexture.from(texture.source));
                    });
                    textureLoadingPromises.push(pixiPromise);
                }
            }
            await Promise.all(textureLoadingPromises);
            return retval;
        },
    },
};
extensions.add(spineTextureAtlasLoader);
