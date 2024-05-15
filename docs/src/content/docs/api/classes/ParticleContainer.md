---
editUrl: false
next: false
prev: false
title: "ParticleContainer"
---

Enhanced PIXI Container that has:
a factory for adding children,
a reference to the Application instance,
a signal connection manager,
and auto update / resize capabilities
 ParticleContainer

## Extends

- `ParticleContainer`

## Constructors

### new ParticleContainer()

> **new ParticleContainer**(`props`, `autoResize`, `autoUpdate`): [`ParticleContainer`](/api/classes/particlecontainer/)

#### Parameters

• **props**: `Partial`\<`ParticleContainerProps`\>= `{}`

• **autoResize**: `boolean`= `true`

• **autoUpdate**: `boolean`= `false`

#### Returns

[`ParticleContainer`](/api/classes/particlecontainer/)

#### Overrides

`PIXIParticleContainer.constructor`

#### Source

[src/gameobjects/ParticleContainer.ts:40](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/ParticleContainer.ts#L40)

## Properties

### childrenEditable

> **childrenEditable**: `boolean` = `true`

#### Source

[src/gameobjects/ParticleContainer.ts:33](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/ParticleContainer.ts#L33)

***

### editable

> **editable**: `boolean` = `true`

#### Source

[src/gameobjects/ParticleContainer.ts:32](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/ParticleContainer.ts#L32)

***

### \_\_dill\_pixel\_top\_level\_class

> `static` **\_\_dill\_pixel\_top\_level\_class**: `boolean` = `true`

#### Source

[src/gameobjects/ParticleContainer.ts:31](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/ParticleContainer.ts#L31)

## Accessors

### add

> `get` **add**(): [`Add`](/api/classes/add/)

#### Returns

[`Add`](/api/classes/add/)

#### Source

[src/gameobjects/ParticleContainer.ts:81](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/ParticleContainer.ts#L81)

***

### app

> `get` **app**(): [`Application`](/api/classes/application/)\<`any`\>

#### Returns

[`Application`](/api/classes/application/)\<`any`\>

#### Source

[src/gameobjects/ParticleContainer.ts:89](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/ParticleContainer.ts#L89)

***

### editMode

> `get` **editMode**(): `boolean`

> `set` **editMode**(`value`): `void`

#### Parameters

• **value**: `boolean`

#### Returns

`boolean`

#### Source

[src/gameobjects/ParticleContainer.ts:68](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/ParticleContainer.ts#L68)

***

### make

> `get` **make**(): *typeof* [`Make`](/api/classes/make/)

#### Returns

*typeof* [`Make`](/api/classes/make/)

#### Source

[src/gameobjects/ParticleContainer.ts:85](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/ParticleContainer.ts#L85)

## Methods

### destroy()

> **destroy**(`_options`?): `void`

#### Parameters

• **\_options?**: `boolean` \| `IDestroyOptions`

#### Returns

`void`

#### Overrides

`PIXIParticleContainer.destroy`

#### Source

[src/gameobjects/ParticleContainer.ts:93](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/ParticleContainer.ts#L93)

***

### disableEditMode()

> **disableEditMode**(): `void`

#### Returns

`void`

#### Source

[src/gameobjects/ParticleContainer.ts:102](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/ParticleContainer.ts#L102)

***

### enableEditMode()

> **enableEditMode**(): `void`

#### Returns

`void`

#### Source

[src/gameobjects/ParticleContainer.ts:98](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/ParticleContainer.ts#L98)

***

### onResize()

> **onResize**(`_size`): `void`

#### Parameters

• **\_size**: `IPoint`

#### Returns

`void`

#### Source

[src/gameobjects/ParticleContainer.ts:108](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/ParticleContainer.ts#L108)

***

### update()

> **update**(`_deltaTime`): `void`

#### Parameters

• **\_deltaTime**: `number`

#### Returns

`void`

#### Source

[src/gameobjects/ParticleContainer.ts:112](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/ParticleContainer.ts#L112)
