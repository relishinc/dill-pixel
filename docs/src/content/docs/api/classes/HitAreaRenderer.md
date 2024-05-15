---
editUrl: false
next: false
prev: false
title: "HitAreaRenderer"
---

Hit area renderer

## Extends

- `Container`

## Constructors

### new HitAreaRenderer()

> **new HitAreaRenderer**(`pRoot`, `pActive`, `pInterval`): [`HitAreaRenderer`](/api/classes/hitarearenderer/)

#### Parameters

• **pRoot**: `DisplayObject`

• **pActive**: `boolean`= `false`

• **pInterval**: `number`= `0`

#### Returns

[`HitAreaRenderer`](/api/classes/hitarearenderer/)

#### Overrides

`Container.constructor`

#### Source

[src/input/HitAreaRenderer.ts:28](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/HitAreaRenderer.ts#L28)

## Accessors

### active

> `get` **active**(): `boolean`

Gets active

> `set` **active**(`pValue`): `void`

Sets active

#### Parameters

• **pValue**: `boolean`

#### Returns

`boolean`

#### Source

[src/input/HitAreaRenderer.ts:42](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/HitAreaRenderer.ts#L42)

***

### interval

> `set` **interval**(`pValue`): `void`

Sets interval

#### Parameters

• **pValue**: `number`

#### Source

[src/input/HitAreaRenderer.ts:61](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/HitAreaRenderer.ts#L61)

## Methods

### clear()

> **clear**(): `void`

Clears hit area renderer

#### Returns

`void`

#### Source

[src/input/HitAreaRenderer.ts:101](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/HitAreaRenderer.ts#L101)

***

### renderHitAreas()

> **renderHitAreas**(): `void`

Renders hit area renderer

#### Returns

`void`

#### Source

[src/input/HitAreaRenderer.ts:84](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/HitAreaRenderer.ts#L84)

***

### renderSingle()

> **renderSingle**(`target`): `void`

#### Parameters

• **target**: `DisplayObject`

#### Returns

`void`

#### Source

[src/input/HitAreaRenderer.ts:91](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/HitAreaRenderer.ts#L91)

***

### update()

> **update**(`pDeltaTime`): `void`

#### Parameters

• **pDeltaTime**: `number`

#### Returns

`void`

#### Source

[src/input/HitAreaRenderer.ts:69](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/HitAreaRenderer.ts#L69)
