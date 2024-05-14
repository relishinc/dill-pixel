---
editUrl: false
next: false
prev: false
title: "PhysicsBase"
---

## Extended by

- [`MatterPhysics`](/api/classes/matterphysics/)
- [`RapierPhysics`](/api/classes/rapierphysics/)

## Implements

- [`IPhysicsBase`](/api/interfaces/iphysicsbase/)

## Constructors

### new PhysicsBase()

> **new PhysicsBase**(`app`): [`PhysicsBase`](/api/classes/physicsbase/)

#### Parameters

• **app**: [`Application`](/api/classes/application/)\<`any`\>

#### Returns

[`PhysicsBase`](/api/classes/physicsbase/)

#### Source

[src/physics/PhysicsBase.ts:13](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/PhysicsBase.ts#L13)

## Properties

### \_factory

> **\_factory**: [`IPhysicsFactory`](/api/interfaces/iphysicsfactory/)

#### Source

[src/physics/PhysicsBase.ts:7](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/PhysicsBase.ts#L7)

## Accessors

### add

> `get` **add**(): [`IPhysicsAddFactory`](/api/interfaces/iphysicsaddfactory/)

#### Returns

[`IPhysicsAddFactory`](/api/interfaces/iphysicsaddfactory/)

#### Source

[src/physics/PhysicsBase.ts:40](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/PhysicsBase.ts#L40)

***

### container

> `set` **container**(`value`): `void`

#### Parameters

• **value**: [`Container`](/api/classes/container/)\<[`Application`](/api/classes/application/)\<`any`\>\>

#### Source

[src/physics/PhysicsBase.ts:44](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/PhysicsBase.ts#L44)

***

### debug

> `get` **debug**(): `boolean`

> `set` **debug**(`value`): `void`

#### Parameters

• **value**: `boolean`

#### Returns

`boolean`

#### Source

[src/physics/PhysicsBase.ts:36](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/PhysicsBase.ts#L36)

***

### factory

> `get` **factory**(): [`IPhysicsFactory`](/api/interfaces/iphysicsfactory/)

#### Returns

[`IPhysicsFactory`](/api/interfaces/iphysicsfactory/)

#### Source

[src/physics/PhysicsBase.ts:15](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/PhysicsBase.ts#L15)

## Methods

### addToWorld()

> **addToWorld**(`body`): `void`

#### Parameters

• **body**: `any`

#### Returns

`void`

#### Source

[src/physics/PhysicsBase.ts:76](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/PhysicsBase.ts#L76)

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

#### Source

[src/physics/PhysicsBase.ts:59](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/PhysicsBase.ts#L59)

***

### init()

> **init**(`_autoStart`, `_debug`, `_autoCreateBounds`?, `_engineOptions`?): `void`

Initializes the physics engine

#### Parameters

• **\_autoStart**: `boolean`

• **\_debug**: `boolean`

• **\_autoCreateBounds?**: `boolean`

• **\_engineOptions?**: `any`

#### Returns

`void`

#### Implementation of

[`IPhysicsBase`](/api/interfaces/iphysicsbase/).[`init`](/api/interfaces/iphysicsbase/#init)

#### Source

[src/physics/PhysicsBase.ts:55](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/PhysicsBase.ts#L55)

***

### removeFromWorld()

> **removeFromWorld**(`body`): `void`

#### Parameters

• **body**: `any`

#### Returns

`void`

#### Source

[src/physics/PhysicsBase.ts:80](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/PhysicsBase.ts#L80)

***

### update()

> **update**(`pDeltaTime`): `void`

#### Parameters

• **pDeltaTime**: `number`

#### Returns

`void`

#### Implementation of

[`IPhysicsBase`](/api/interfaces/iphysicsbase/).[`update`](/api/interfaces/iphysicsbase/#update)

#### Source

[src/physics/PhysicsBase.ts:72](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/PhysicsBase.ts#L72)
