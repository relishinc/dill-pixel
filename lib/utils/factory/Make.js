import { Geometry, State } from '@pixi/core';
import { Assets, BitmapText, DRAW_MODES, Graphics, HTMLText, Mesh, NineSlicePlane, Point, SimpleMesh, SimplePlane, SimpleRope, Sprite, Text, Texture, TilingSprite } from 'pixi.js';
import { Application } from '../../core';
import { Container, FlexContainer } from '../../gameobjects';
import { resolvePointLike, setObjectName } from './utils';
export class Make {
    static texture(asset, sheet) {
        // tslint:disable-next-line:no-shadowed-variable
        let texture;
        if (typeof asset === 'object') {
            const settings = asset;
            asset = settings.asset;
            sheet = settings?.sheet;
        }
        if (!sheet || sheet?.length === 0) {
            if (Assets.cache.has(asset)) {
                texture = Assets.get(asset);
            }
            else if (Assets.get(asset)) {
                texture = Assets.get(asset).texture;
            }
            else {
                throw new Error('Asset "' + asset + '" not loaded into Pixi cache');
            }
        }
        else {
            if (!Assets.get(sheet)) {
                throw new Error('Spritesheet "' + sheet + '" not loaded into Pixi cache');
            }
            else {
                const spriteSheet = Assets.get(sheet);
                const textures = spriteSheet.textures;
                if (textures !== undefined) {
                    // eslint-disable-next-line no-prototype-builtins
                    if (textures.hasOwnProperty(asset)) {
                        texture = textures[asset];
                    }
                    else if (spriteSheet.linkedSheets !== undefined && spriteSheet.linkedSheets.length > 0) {
                        for (const linkedSheet of spriteSheet.linkedSheets) {
                            // eslint-disable-next-line no-prototype-builtins
                            if (linkedSheet.textures !== undefined && linkedSheet.textures.hasOwnProperty(asset)) {
                                texture = linkedSheet.textures[asset];
                                break;
                            }
                        }
                        if (texture === undefined) {
                            throw new Error('Asset "' + asset + '" not found inside spritesheet "' + asset + "' or any of its linked sheets");
                        }
                    }
                    else {
                        throw new Error('Asset "' + asset + '" not found inside spritesheet "' + sheet + "'");
                    }
                }
                else {
                    throw new Error('Spritesheet "' + sheet + '" loaded but textures arent?!');
                }
            }
        }
        return texture || new Sprite().texture;
    }
    static coloredSprite(settingsOrColor = 0x0, size = {
        x: 1,
        y: 1,
    }, shape = 'rectangle', opts, alpha, position, anchor = 0.5, scale) {
        let color = settingsOrColor;
        const visible = true;
        let settings = {};
        if (typeof settingsOrColor === 'object') {
            settings = settingsOrColor;
            const { color: settingsColor = 0x0, size: settingsSize = 1, shape: settingsShape = 'rectangle', ...settingsOpts } = settings;
            color = settingsColor;
            size = settingsSize;
            shape = settingsShape;
            opts = settingsOpts;
        }
        else {
            settings.visible = visible;
            if (alpha !== undefined) {
                settings.alpha = alpha;
            }
            if (position !== undefined) {
                settings.position = position;
            }
            if (anchor !== undefined) {
                settings.anchor = anchor;
            }
            if (scale !== undefined) {
                settings.scale = scale;
            }
            if (settings.anchor === undefined) {
                settings.anchor = 0.5;
            }
        }
        const gfx = new Graphics();
        const resolvedSize = resolvePointLike(size);
        gfx.lineStyle({ width: 0, color: 0, alpha: 0 });
        gfx.beginFill(color, 1);
        switch (shape) {
            case 'circle':
                gfx.drawCircle(0, 0, resolvedSize.x);
                break;
            case 'rounded_rectangle':
                gfx.drawRoundedRect(0, 0, resolvedSize.x, resolvedSize.y, opts?.radius || 5);
                break;
            case 'rectangle':
            default:
                gfx.drawRect(0, 0, resolvedSize.x, resolvedSize.y);
                break;
        }
        gfx.endFill();
        const texture = Application.instance.renderer.generateTexture(gfx);
        const spriteSettings = {
            asset: texture,
            visible,
            ...settings,
        };
        return Make.sprite(spriteSettings);
    }
    static sprite(settingsOrAsset, sheet, alpha, position, anchor = 0.5, scale) {
        let visible = true;
        let sprite;
        let asset = settingsOrAsset;
        if (typeof settingsOrAsset === 'object' && !(settingsOrAsset instanceof Texture)) {
            const settings = settingsOrAsset;
            asset = settings?.asset;
            sheet = settings?.sheet;
            alpha = settings?.alpha;
            visible = settings?.visible !== false;
            position = settings?.position;
            anchor = settings?.anchor ?? 0.5;
            scale = settings?.scale;
        }
        if (!asset) {
            sprite = new Sprite();
        }
        else {
            sprite = new Sprite(typeof asset === 'string' ? this.texture(asset, sheet) : asset);
            setObjectName(sprite, asset, sheet);
        }
        if (alpha !== undefined) {
            sprite.alpha = alpha;
        }
        if (position !== undefined) {
            const resolvedPosition = resolvePointLike(position);
            sprite.position.set(resolvedPosition.x, resolvedPosition.y);
        }
        if (anchor !== undefined) {
            const resolvedAnchor = resolvePointLike(anchor);
            sprite.anchor.set(resolvedAnchor.x, resolvedAnchor.y);
        }
        if (scale !== undefined) {
            const resolvedScale = resolvePointLike(scale);
            sprite.scale.set(resolvedScale.x, resolvedScale.y);
        }
        sprite.visible = visible;
        return sprite;
    }
    static text(settingsOrValue = '', style, alpha, position, anchor, scale) {
        let value = settingsOrValue;
        let visible = true;
        if (typeof settingsOrValue === 'object') {
            const settings = settingsOrValue;
            value = settings?.value ?? '';
            style = settings?.style ?? {};
            alpha = settings?.alpha;
            position = settings?.position;
            anchor = settings?.anchor;
            scale = settings?.scale;
            visible = settings?.visible !== false;
        }
        const text = new Text(value, style);
        if (alpha !== undefined) {
            text.alpha = alpha;
        }
        if (position !== undefined) {
            const resolvedPosition = resolvePointLike(position);
            text.position.set(resolvedPosition.x, resolvedPosition.y);
        }
        if (anchor !== undefined) {
            const resolvedAnchor = resolvePointLike(anchor);
            text.anchor.set(resolvedAnchor.x, resolvedAnchor.y);
        }
        if (scale !== undefined) {
            const resolvedScale = resolvePointLike(scale);
            text.scale.set(resolvedScale.x, resolvedScale.y);
        }
        text.visible = visible;
        return text;
    }
    static htmlText(settingsOrValue = '', style, alpha, position, anchor, scale) {
        let value = settingsOrValue;
        let visible = true;
        if (typeof settingsOrValue === 'object') {
            const settings = settingsOrValue;
            value = settings?.value ?? '';
            style = settings?.style ?? {};
            alpha = settings?.alpha;
            position = settings?.position;
            anchor = settings?.anchor;
            scale = settings?.scale;
            visible = settings?.visible !== false;
        }
        const text = new HTMLText(value, style);
        if (alpha !== undefined) {
            text.alpha = alpha;
        }
        if (position !== undefined) {
            const resolvedPosition = resolvePointLike(position);
            text.position.set(resolvedPosition.x, resolvedPosition.y);
        }
        if (anchor !== undefined) {
            const resolvedAnchor = resolvePointLike(anchor);
            text.anchor.set(resolvedAnchor.x, resolvedAnchor.y);
        }
        if (scale !== undefined) {
            const resolvedScale = resolvePointLike(scale);
            text.scale.set(resolvedScale.x, resolvedScale.y);
        }
        text.visible = visible;
        return text;
    }
    static bitmapText(settingsOrValue = '', style, alpha, position, anchor, scale) {
        let value = settingsOrValue;
        let visible = true;
        if (typeof settingsOrValue === 'object') {
            const settings = settingsOrValue;
            value = settings?.value ?? '';
            style = settings?.style ?? {};
            alpha = settings?.alpha;
            position = settings?.position;
            anchor = settings?.anchor;
            scale = settings?.scale;
            visible = settings?.visible !== false;
        }
        const text = new BitmapText(value, style);
        if (alpha !== undefined) {
            text.alpha = alpha;
        }
        if (position !== undefined) {
            const resolvedPosition = resolvePointLike(position);
            text.position.set(resolvedPosition.x, resolvedPosition.y);
        }
        if (anchor !== undefined) {
            const resolvedAnchor = resolvePointLike(anchor);
            text.anchor.set(resolvedAnchor.x, resolvedAnchor.y);
        }
        if (scale !== undefined) {
            const resolvedScale = resolvePointLike(scale);
            text.scale.set(resolvedScale.x, resolvedScale.y);
        }
        text.visible = visible;
        return text;
    }
    static container(settingsOrAlpha, position, scale) {
        let visible = true;
        let alpha = settingsOrAlpha;
        if (typeof settingsOrAlpha === 'object') {
            const settings = settingsOrAlpha;
            if (settings.alpha !== undefined) {
                alpha = settings?.alpha;
            }
            position = settings?.position;
            visible = settings?.visible !== false;
        }
        const container = new Container();
        if (alpha !== undefined) {
            container.alpha = alpha;
        }
        if (position !== undefined) {
            const resolvedPosition = resolvePointLike(position);
            container.position.set(resolvedPosition.x, resolvedPosition.y);
        }
        if (scale !== undefined) {
            const resolvedScale = resolvePointLike(scale);
            container.scale.set(resolvedScale.x, resolvedScale.y);
        }
        container.visible = visible;
        return container;
    }
    static flexContainer(settingsOrAlpha, position, settings = {}, scale) {
        let visible = true;
        let alpha = settingsOrAlpha;
        let container;
        if (typeof settingsOrAlpha === 'object') {
            const settings = settingsOrAlpha;
            if (settings.alpha !== undefined) {
                alpha = settings?.alpha;
            }
            position = settings?.position;
            visible = settings?.visible !== false;
            container = new FlexContainer(settingsOrAlpha);
        }
        else {
            container = new FlexContainer(settings);
        }
        if (alpha !== undefined) {
            container.alpha = alpha;
        }
        if (position !== undefined) {
            const resolvedPosition = resolvePointLike(position);
            container.position.set(resolvedPosition.x, resolvedPosition.y);
        }
        if (scale !== undefined) {
            const resolvedScale = resolvePointLike(scale);
            container.scale.set(resolvedScale.x, resolvedScale.y);
        }
        container.visible = visible;
        return container;
    }
    static graphics(settingsOrAlpha, position, scale) {
        let visible = true;
        let alpha = settingsOrAlpha;
        if (typeof settingsOrAlpha === 'object') {
            const settings = settingsOrAlpha;
            alpha = settings?.alpha;
            position = settings?.position;
            visible = settings?.visible !== false;
            scale = settings?.scale;
        }
        const graphics = new Graphics();
        if (alpha !== undefined) {
            graphics.alpha = alpha;
        }
        if (position !== undefined) {
            const resolvedPosition = resolvePointLike(position);
            graphics.position.set(resolvedPosition.x, resolvedPosition.y);
        }
        if (scale !== undefined) {
            const resolvedScale = resolvePointLike(scale);
            graphics.scale.set(resolvedScale.x, resolvedScale.y);
        }
        graphics.visible = visible;
        return graphics;
    }
    static tilingSprite(settingsOrAsset, sheet, width = 1, height = 1, tilePosition, alpha, position, anchor, scale) {
        let visible = true;
        let asset = settingsOrAsset;
        if (typeof settingsOrAsset !== 'string' && !(settingsOrAsset instanceof Texture)) {
            const settings = settingsOrAsset;
            asset = settings?.asset;
            sheet = settings?.sheet;
            if (settings.width !== undefined) {
                width = settings.width;
            }
            if (settings.height !== undefined) {
                height = settings.height;
            }
            tilePosition = settings?.tilePosition;
            alpha = settings?.alpha;
            position = settings?.position;
            anchor = settings?.anchor;
            scale = settings?.scale;
            visible = settings?.visible !== false;
        }
        if (!asset) {
            asset = Texture.WHITE;
        }
        const tilingSprite = new TilingSprite(typeof asset === 'string' ? this.texture(asset, sheet) : asset, width, height);
        setObjectName(tilingSprite, asset ?? '', sheet);
        if (tilePosition !== undefined) {
            const resolvedTilePosition = resolvePointLike(tilePosition);
            tilingSprite.tilePosition.x = resolvedTilePosition.x;
            tilingSprite.tilePosition.y = resolvedTilePosition.y;
        }
        if (alpha !== undefined) {
            tilingSprite.alpha = alpha;
        }
        if (position !== undefined) {
            const resolvedPosition = resolvePointLike(position);
            tilingSprite.position.set(resolvedPosition.x, resolvedPosition.y);
        }
        if (anchor !== undefined) {
            const resolvedAnchor = resolvePointLike(anchor);
            tilingSprite.anchor.set(resolvedAnchor.x, resolvedAnchor.y);
        }
        if (scale !== undefined) {
            const resolvedScale = resolvePointLike(scale);
            tilingSprite.scale.set(resolvedScale.x, resolvedScale.y);
        }
        tilingSprite.visible = visible;
        return tilingSprite;
    }
    static mesh(settingsOrGeometry, shader, state = State.for2d(), drawMode = DRAW_MODES.LINE_LOOP) {
        let geometry = settingsOrGeometry;
        if (!(settingsOrGeometry instanceof Geometry)) {
            const settings = settingsOrGeometry;
            geometry = settings.geometry;
            shader = settings.shader;
            state = settings?.state ?? State.for2d();
            drawMode = settings?.drawMode ?? DRAW_MODES.LINE_LOOP;
        }
        return new Mesh(geometry, shader, state, drawMode);
    }
    static simpleRope(settingsOrAsset, sheet, numPoints = 25, segmentLength = 50, autoUpdate, alpha, position, scale) {
        let visible = true;
        let asset = settingsOrAsset;
        if (typeof settingsOrAsset !== 'string' && !(settingsOrAsset instanceof Texture)) {
            const settings = settingsOrAsset;
            asset = settings?.asset;
            sheet = settings?.sheet;
            numPoints = settings?.numPoints ?? 25;
            segmentLength = settings?.segmentLength ?? 50;
            autoUpdate = settings?.autoUpdate ?? true;
            alpha = settings?.alpha;
            position = settings?.position;
            scale = settings?.scale;
            visible = settings?.visible !== false;
        }
        if (!asset) {
            asset = Texture.WHITE;
        }
        const points = [];
        for (let i = 0; i < numPoints; i++) {
            points.push(new Point(i * segmentLength, 0));
        }
        const simpleRope = new SimpleRope(typeof asset === 'string' ? this.texture(asset, sheet) : asset, points);
        setObjectName(simpleRope, asset, sheet);
        simpleRope.autoUpdate = autoUpdate !== false;
        if (alpha !== undefined) {
            simpleRope.alpha = alpha;
        }
        if (position !== undefined) {
            const resolvedPosition = resolvePointLike(position);
            simpleRope.position.set(resolvedPosition.x, resolvedPosition.y);
        }
        if (scale !== undefined) {
            const resolvedScale = resolvePointLike(scale);
            simpleRope.scale.set(resolvedScale.x, resolvedScale.y);
        }
        simpleRope.visible = visible;
        return { rope: simpleRope, points };
    }
    static simplePlane(settingsOrAsset, sheet, vertsWidth = 1, vertsHeight = 1, alpha, position, scale) {
        let visible = true;
        let asset = settingsOrAsset;
        if (typeof settingsOrAsset !== 'string' && !(settingsOrAsset instanceof Texture)) {
            const settings = settingsOrAsset;
            asset = settings?.asset;
            sheet = settings?.sheet;
            vertsWidth = settings?.vertsWidth ?? 1;
            vertsHeight = settings?.vertsHeight ?? 1;
            alpha = settings?.alpha;
            position = settings?.position;
            scale = settings?.scale;
            visible = settings?.visible !== false;
        }
        if (!asset) {
            asset = Texture.WHITE;
        }
        const simplePlane = new SimplePlane(typeof asset === 'string' ? this.texture(asset, sheet) : asset, vertsWidth, vertsHeight);
        if (alpha !== undefined) {
            simplePlane.alpha = alpha;
        }
        if (position !== undefined) {
            const resolvedPosition = resolvePointLike(position);
            simplePlane.position.set(resolvedPosition.x, resolvedPosition.y);
        }
        if (scale !== undefined) {
            const resolvedScale = resolvePointLike(scale);
            simplePlane.scale.set(resolvedScale.x, resolvedScale.y);
        }
        setObjectName(simplePlane, asset, sheet);
        simplePlane.visible = visible;
        return simplePlane;
    }
    static simpleMesh(settingsOrAsset, sheet, vertices, uvs, indices, drawMode, alpha, position, scale) {
        let visible = true;
        let asset = settingsOrAsset;
        if (typeof settingsOrAsset !== 'string' && !(settingsOrAsset instanceof Texture)) {
            const settings = settingsOrAsset;
            asset = settings?.asset;
            sheet = settings?.sheet;
            vertices = settings?.vertices;
            uvs = settings?.uvs;
            indices = settings?.indices;
            drawMode = settings?.drawMode;
            alpha = settings?.alpha;
            position = settings?.position;
            scale = settings?.scale;
            visible = settings?.visible !== false;
        }
        if (!asset) {
            asset = Texture.WHITE;
        }
        const simpleMesh = new SimpleMesh(typeof asset === 'string' ? this.texture(asset, sheet) : asset, vertices, uvs, indices, drawMode);
        if (alpha !== undefined) {
            simpleMesh.alpha = alpha;
        }
        if (position !== undefined) {
            const resolvedPosition = resolvePointLike(position);
            simpleMesh.position.set(resolvedPosition.x, resolvedPosition.y);
        }
        if (scale !== undefined) {
            const resolvedScale = resolvePointLike(scale);
            simpleMesh.scale.set(resolvedScale.x, resolvedScale.y);
        }
        setObjectName(simpleMesh, asset, sheet);
        simpleMesh.visible = visible;
        return simpleMesh;
    }
    static nineSlice(settingsOrAsset, sheet, leftWidth = 10, topHeight = 10, rightWidth = 10, bottomHeight = 10, alpha, position, scale) {
        let visible = true;
        let asset = settingsOrAsset;
        if (typeof settingsOrAsset !== 'string' && !(settingsOrAsset instanceof Texture)) {
            const settings = settingsOrAsset;
            asset = settings?.asset;
            sheet = settings?.sheet;
            leftWidth = settings?.leftWidth ?? 10;
            topHeight = settings?.topHeight ?? 10;
            rightWidth = settings?.rightWidth ?? 10;
            bottomHeight = settings?.bottomHeight ?? 10;
            alpha = settings?.alpha;
            position = settings?.position;
            scale = settings?.scale;
            visible = settings?.visible !== false;
        }
        if (!asset) {
            asset = Texture.WHITE;
        }
        const ns = new NineSlicePlane(typeof asset === 'string' ? this.texture(asset, sheet) : asset, leftWidth, topHeight, rightWidth, bottomHeight);
        setObjectName(ns, asset, sheet);
        if (alpha !== undefined) {
            ns.alpha = alpha;
        }
        if (position !== undefined) {
            const resolvedPosition = resolvePointLike(position);
            ns.position.set(resolvedPosition.x, resolvedPosition.y);
        }
        if (scale !== undefined) {
            const resolvedScale = resolvePointLike(scale);
            ns.scale.set(resolvedScale.x, resolvedScale.y);
        }
        ns.visible = visible;
        return ns;
    }
}
//# sourceMappingURL=Make.js.map