---
editUrl: false
next: false
prev: false
title: "RapierPhysicsSprite"
---

## Extends

- `Container`

## Implements

- [`IPhysicsObject`](/api/interfaces/iphysicsobject/)

## Constructors

### new RapierPhysicsSprite()

> **new RapierPhysicsSprite**(`pTexture`, `pSheet`?, `pSize`?, `pBodyType`?): [`RapierPhysicsSprite`](/api/classes/rapierphysicssprite/)

#### Parameters

• **pTexture**: `string` \| `Texture`\<`Resource`\>

• **pSheet?**: [`SpritesheetLike`](/api/type-aliases/spritesheetlike/)

• **pSize?**: `number` \| [`number`, `number?`] \| `object`

• **pBodyType?**: [`PhysicsBodyType`](/api/enumerations/physicsbodytype/)= `PhysicsBodyType.RECTANGLE`

#### Returns

[`RapierPhysicsSprite`](/api/classes/rapierphysicssprite/)

#### Overrides

`Container.constructor`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsSprite.ts:26](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/rapier/gameobjects/RapierPhysicsSprite.ts#L26)

## Properties

### \_bodyType

> **\_bodyType**: [`PhysicsBodyType`](/api/enumerations/physicsbodytype/)

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsSprite.ts:24](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/rapier/gameobjects/RapierPhysicsSprite.ts#L24)

***

### \_size

> **\_size**: `object`

#### x

> **x**: `number`

#### y

> **y**: `number`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsSprite.ts:23](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/rapier/gameobjects/RapierPhysicsSprite.ts#L23)

***

### body

> **body**: `RigidBody`

#### Implementation of

[`IPhysicsObject`](/api/interfaces/iphysicsobject/).[`body`](/api/interfaces/iphysicsobject/#body)

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsSprite.ts:20](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/rapier/gameobjects/RapierPhysicsSprite.ts#L20)

***

### collider

> **collider**: `Collider`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsSprite.ts:21](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/rapier/gameobjects/RapierPhysicsSprite.ts#L21)

***

### visual

> **visual**: `Sprite`

#### Implementation of

[`IPhysicsObject`](/api/interfaces/iphysicsobject/).[`visual`](/api/interfaces/iphysicsobject/#visual)

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsSprite.ts:19](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/rapier/gameobjects/RapierPhysicsSprite.ts#L19)

***

### DEFAULT\_DEBUG\_COLOR

> `static` `readonly` **DEFAULT\_DEBUG\_COLOR**: `number` = `0x29c5f6`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsSprite.ts:18](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/rapier/gameobjects/RapierPhysicsSprite.ts#L18)

## Accessors

### activeCollisionTypes

> `get` **activeCollisionTypes**(): `ActiveCollisionTypes`

#### Returns

`ActiveCollisionTypes`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsSprite.ts:75](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/rapier/gameobjects/RapierPhysicsSprite.ts#L75)

***

### activeEvents

> `get` **activeEvents**(): `ActiveEvents`

#### Returns

`ActiveEvents`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsSprite.ts:80](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/rapier/gameobjects/RapierPhysicsSprite.ts#L80)

***

### activeHooks

> `get` **activeHooks**(): `ActiveHooks`

#### Returns

`ActiveHooks`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsSprite.ts:85](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/rapier/gameobjects/RapierPhysicsSprite.ts#L85)

***

### app

> `get` **app**(): [`Application`](/api/classes/application/)\<`any`\>

#### Returns

[`Application`](/api/classes/application/)\<`any`\>

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsSprite.ts:67](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/rapier/gameobjects/RapierPhysicsSprite.ts#L67)

***

### debugColor

> `get` **debugColor**(): `number`

#### Returns

`number`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsSprite.ts:63](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/rapier/gameobjects/RapierPhysicsSprite.ts#L63)

***

### physics

> `get` **physics**(): [`RapierPhysics`](/api/classes/rapierphysics/)

#### Returns

[`RapierPhysics`](/api/classes/rapierphysics/)

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsSprite.ts:59](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/rapier/gameobjects/RapierPhysicsSprite.ts#L59)

***

### world

> `get` **world**(): `World`

#### Returns

`World`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsSprite.ts:71](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/rapier/gameobjects/RapierPhysicsSprite.ts#L71)

## Methods

### createBody()

> **createBody**(): `void`

#### Returns

`void`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsSprite.ts:98](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/rapier/gameobjects/RapierPhysicsSprite.ts#L98)

***

### onAdded()

> **onAdded**(): `void`

#### Returns

`void`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsSprite.ts:89](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/rapier/gameobjects/RapierPhysicsSprite.ts#L89)

***

### onRemoved()

> **onRemoved**(): `void`

#### Returns

`void`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsSprite.ts:94](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/rapier/gameobjects/RapierPhysicsSprite.ts#L94)

***

### update()

> **update**(): `void`

#### Returns

`void`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsSprite.ts:142](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/rapier/gameobjects/RapierPhysicsSprite.ts#L142)
