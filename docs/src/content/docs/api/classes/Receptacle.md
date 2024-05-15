---
editUrl: false
next: false
prev: false
title: "Receptacle"
---

Receptacle

## Extends

- `Container`

## Implements

- [`IFocusable`](/api/interfaces/ifocusable/)

## Constructors

### new Receptacle()

> **new Receptacle**(): [`Receptacle`](/api/classes/receptacle/)

#### Returns

[`Receptacle`](/api/classes/receptacle/)

#### Overrides

`Container.constructor`

#### Source

[src/input/Receptacle.ts:26](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/Receptacle.ts#L26)

## Accessors

### isActive

> `get` **isActive**(): `boolean`

Gets whether is active

> `set` **isActive**(`pValue`): `void`

Sets whether is active

#### Parameters

• **pValue**: `boolean`

#### Returns

`boolean`

#### Source

[src/input/Receptacle.ts:61](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/Receptacle.ts#L61)

## Methods

### destroy()

> **destroy**(): `void`

Destroys receptacle

#### Returns

`void`

#### Overrides

`Container.destroy`

#### Source

[src/input/Receptacle.ts:121](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/Receptacle.ts#L121)

***

### getFocusPosition()

> **getFocusPosition**(): `Point`

onFocusPosition

#### Returns

`Point`

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`getFocusPosition`](/api/interfaces/ifocusable/#getfocusposition)

#### Source

[src/input/Receptacle.ts:96](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/Receptacle.ts#L96)

***

### getFocusSize()

> **getFocusSize**(): `IPoint`

Gets focus size

#### Returns

`IPoint`

Point

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`getFocusSize`](/api/interfaces/ifocusable/#getfocussize)

#### Source

[src/input/Receptacle.ts:108](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/Receptacle.ts#L108)

***

### onFocusActivated()

> **onFocusActivated**(): `void`

onFocusActivated

#### Returns

`void`

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`onFocusActivated`](/api/interfaces/ifocusable/#onfocusactivated)

#### Source

[src/input/Receptacle.ts:89](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/Receptacle.ts#L89)

***

### onFocusBegin()

> **onFocusBegin**(): `void`

onFocusBegin

#### Returns

`void`

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`onFocusBegin`](/api/interfaces/ifocusable/#onfocusbegin)

#### Source

[src/input/Receptacle.ts:75](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/Receptacle.ts#L75)

***

### onFocusEnd()

> **onFocusEnd**(): `void`

onFocusEnd

#### Returns

`void`

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`onFocusEnd`](/api/interfaces/ifocusable/#onfocusend)

#### Source

[src/input/Receptacle.ts:82](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/Receptacle.ts#L82)
