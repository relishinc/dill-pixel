---
editUrl: false
next: false
prev: false
title: "MatterPhysics"
---

## Extends

- [`PhysicsBase`](/api/classes/physicsbase/)

## Constructors

### new MatterPhysics()

> **new MatterPhysics**(`app`): [`MatterPhysics`](/api/classes/matterphysics/)

#### Parameters

• **app**: [`Application`](/api/classes/application/)\<`any`\>

#### Returns

[`MatterPhysics`](/api/classes/matterphysics/)

#### Overrides

[`PhysicsBase`](/api/classes/physicsbase/).[`constructor`](/api/classes/physicsbase/#constructors)

#### Source

[src/physics/matter/MatterPhysics.ts:15](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/matter/MatterPhysics.ts#L15)

## Properties

### \_factory

> **\_factory**: [`IPhysicsFactory`](/api/interfaces/iphysicsfactory/)

#### Inherited from

[`PhysicsBase`](/api/classes/physicsbase/).[`_factory`](/api/classes/physicsbase/#_factory)

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

### engine

> `get` **engine**(): `Engine`

#### Returns

`Engine`

#### Source

[src/physics/matter/MatterPhysics.ts:20](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/matter/MatterPhysics.ts#L20)

***

### factory

> `get` **factory**(): [`IPhysicsFactory`](/api/interfaces/iphysicsfactory/)

#### Returns

[`IPhysicsFactory`](/api/interfaces/iphysicsfactory/)

#### Source

[src/physics/PhysicsBase.ts:15](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/PhysicsBase.ts#L15)

## Methods

### addToWorld()

> **addToWorld**(...`objects`): `void`

#### Parameters

• ...**objects**: ([`MatterBodyLike`](/api/type-aliases/matterbodylike/) \| [`IMatterPhysicsObject`](/api/interfaces/imatterphysicsobject/))[]

#### Returns

`void`

#### Overrides

[`PhysicsBase`](/api/classes/physicsbase/).[`addToWorld`](/api/classes/physicsbase/#addtoworld)

#### Source

[src/physics/matter/MatterPhysics.ts:93](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/matter/MatterPhysics.ts#L93)

***

### createWorldBounds()

> **createWorldBounds**(`useStage`): `void`

#### Parameters

• **useStage**: `boolean`= `true`

#### Returns

`void`

#### Source

[src/physics/matter/MatterPhysics.ts:56](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/matter/MatterPhysics.ts#L56)

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

#### Overrides

[`PhysicsBase`](/api/classes/physicsbase/).[`destroy`](/api/classes/physicsbase/#destroy)

#### Source

[src/physics/matter/MatterPhysics.ts:24](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/matter/MatterPhysics.ts#L24)

***

### drawDebug()

> **drawDebug**(): `void`

#### Returns

`void`

#### Source

[src/physics/matter/MatterPhysics.ts:113](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/matter/MatterPhysics.ts#L113)

***

### init()

> **init**(`pAutoStart`, `pDebug`, `autoCreateBounds`, `pEngineOptions`): `Promise`\<`void`\>

Initializes the physics engine

#### Parameters

• **pAutoStart**: `boolean`= `false`

• **pDebug**: `boolean`= `false`

• **autoCreateBounds**: `boolean`= `true`

• **pEngineOptions**: `IEngineDefinition`= `{}`

#### Returns

`Promise`\<`void`\>

#### Overrides

[`PhysicsBase`](/api/classes/physicsbase/).[`init`](/api/classes/physicsbase/#init)

#### Source

[src/physics/matter/MatterPhysics.ts:32](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/matter/MatterPhysics.ts#L32)

***

### removeFromWorld()

> **removeFromWorld**(...`bodies`): `void`

#### Parameters

• ...**bodies**: [`MatterBodyLike`](/api/type-aliases/matterbodylike/)[]

#### Returns

`void`

#### Overrides

[`PhysicsBase`](/api/classes/physicsbase/).[`removeFromWorld`](/api/classes/physicsbase/#removefromworld)

#### Source

[src/physics/matter/MatterPhysics.ts:107](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/matter/MatterPhysics.ts#L107)

***

### start()

> **start**(): `void`

#### Returns

`void`

#### Source

[src/physics/matter/MatterPhysics.ts:85](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/matter/MatterPhysics.ts#L85)

***

### stop()

> **stop**(): `void`

#### Returns

`void`

#### Source

[src/physics/matter/MatterPhysics.ts:89](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/matter/MatterPhysics.ts#L89)

***

### update()

> **update**(`_deltaTime`): `void`

#### Parameters

• **\_deltaTime**: `number`

#### Returns

`void`

#### Overrides

[`PhysicsBase`](/api/classes/physicsbase/).[`update`](/api/classes/physicsbase/#update)

#### Source

[src/physics/matter/MatterPhysics.ts:135](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/matter/MatterPhysics.ts#L135)
