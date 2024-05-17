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
import { Texture as PixiTexture } from 'pixi.js';
import { BlendMode, Texture, TextureFilter, TextureWrap } from '../spine-core';
export class SpineTexture extends Texture {
    static textureMap = new Map();
    texture;
    static from(texture) {
        if (SpineTexture.textureMap.has(texture)) {
            return SpineTexture.textureMap.get(texture);
        }
        return new SpineTexture(texture);
    }
    static toPixiMipMap(filter) {
        switch (filter) {
            case TextureFilter.Nearest:
            case TextureFilter.Linear:
                return false;
            case TextureFilter.MipMapNearestLinear:
            case TextureFilter.MipMapNearestNearest:
            case TextureFilter.MipMapLinearLinear: // TextureFilter.MipMapLinearLinear == TextureFilter.MipMap
            case TextureFilter.MipMapLinearNearest:
                return true;
            default:
                throw new Error(`Unknown texture filter: ${String(filter)}`);
        }
    }
    static toPixiTextureFilter(filter) {
        switch (filter) {
            case TextureFilter.Nearest:
            case TextureFilter.MipMapNearestLinear:
            case TextureFilter.MipMapNearestNearest:
                return 'nearest';
            case TextureFilter.Linear:
            case TextureFilter.MipMapLinearLinear: // TextureFilter.MipMapLinearLinear == TextureFilter.MipMap
            case TextureFilter.MipMapLinearNearest:
                return 'linear';
            default:
                throw new Error(`Unknown texture filter: ${String(filter)}`);
        }
    }
    static toPixiTextureWrap(wrap) {
        switch (wrap) {
            case TextureWrap.ClampToEdge:
                return 'clamp-to-edge';
            case TextureWrap.MirroredRepeat:
                return 'mirror-repeat';
            case TextureWrap.Repeat:
                return 'repeat';
            default:
                throw new Error(`Unknown texture wrap: ${String(wrap)}`);
        }
    }
    static toPixiBlending(blend) {
        switch (blend) {
            case BlendMode.Normal:
                return 'normal';
            case BlendMode.Additive:
                return 'add';
            case BlendMode.Multiply:
                return 'multiply';
            case BlendMode.Screen:
                return 'screen';
            default:
                throw new Error(`Unknown blendMode: ${String(blend)}`);
        }
    }
    constructor(image) {
        // Todo: maybe add error handling if you feed a video texture to spine?
        super(image.resource);
        this.texture = PixiTexture.from(image);
    }
    setFilters(minFilter, magFilter) {
        const style = this.texture.source.style;
        style.minFilter = SpineTexture.toPixiTextureFilter(minFilter);
        style.magFilter = SpineTexture.toPixiTextureFilter(magFilter);
        this.texture.source.autoGenerateMipmaps = SpineTexture.toPixiMipMap(minFilter);
        this.texture.source.updateMipmaps();
    }
    setWraps(uWrap, vWrap) {
        const style = this.texture.source.style;
        style.addressModeU = SpineTexture.toPixiTextureWrap(uWrap);
        style.addressModeV = SpineTexture.toPixiTextureWrap(vWrap);
    }
    dispose() {
        // I am not entirely sure about this...
        this.texture.destroy();
    }
}
