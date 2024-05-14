---
editUrl: false
next: false
prev: false
title: "RapierPhysics"
---

## Extends

- [`PhysicsBase`](/api/classes/physicsbase/)

## Constructors

### new RapierPhysics()

> **new RapierPhysics**(`app`): [`RapierPhysics`](/api/classes/rapierphysics/)

#### Parameters

• **app**: [`Application`](/api/classes/application/)\<`any`\>

#### Returns

[`RapierPhysics`](/api/classes/rapierphysics/)

#### Overrides

[`PhysicsBase`](/api/classes/physicsbase/).[`constructor`](/api/classes/physicsbase/#constructors)

#### Source

[src/physics/rapier/RapierPhysics.ts:15](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/RapierPhysics.ts#L15)

## Properties

### \_factory

> **\_factory**: [`IPhysicsFactory`](/api/interfaces/iphysicsfactory/)

#### Inherited from

[`PhysicsBase`](/api/classes/physicsbase/).[`_factory`](/api/classes/physicsbase/#_factory)

#### Source

[src/physics/PhysicsBase.ts:7](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/PhysicsBase.ts#L7)

## Accessors

### SIFactor

> `get` **SIFactor**(): `number`

#### Returns

`number`

#### Source

[src/physics/rapier/RapierPhysics.ts:20](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/RapierPhysics.ts#L20)

***

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

[src/physics/rapier/RapierPhysics.ts:35](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/RapierPhysics.ts#L35)

***

### factory

> `get` **factory**(): [`IPhysicsFactory`](/api/interfaces/iphysicsfactory/)

#### Returns

[`IPhysicsFactory`](/api/interfaces/iphysicsfactory/)

#### Source

[src/physics/PhysicsBase.ts:15](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/PhysicsBase.ts#L15)

***

### world

> `get` **world**(): `World`

#### Returns

`World`

#### Source

[src/physics/rapier/RapierPhysics.ts:24](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/RapierPhysics.ts#L24)

## Methods

### addToWorld()

> **addToWorld**(...`objects`): `void`

#### Parameters

• ...**objects**: (`RigidBody` \| [`IRapierPhysicsObject`](/api/interfaces/irapierphysicsobject/))[]

#### Returns

`void`

#### Overrides

[`PhysicsBase`](/api/classes/physicsbase/).[`addToWorld`](/api/classes/physicsbase/#addtoworld)

#### Source

[src/physics/rapier/RapierPhysics.ts:129](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/RapierPhysics.ts#L129)

***

### createWorldBounds()

> **createWorldBounds**(`useStage`): `void`

#### Parameters

• **useStage**: `boolean`= `true`

#### Returns

`void`

#### Source

[src/physics/rapier/RapierPhysics.ts:97](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/RapierPhysics.ts#L97)

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

#### Overrides

[`PhysicsBase`](/api/classes/physicsbase/).[`destroy`](/api/classes/physicsbase/#destroy)

#### Source

[src/physics/rapier/RapierPhysics.ts:76](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/RapierPhysics.ts#L76)

***

### drawDebug()

> **drawDebug**(): `void`

#### Returns

`void`

#### Source

[src/physics/rapier/RapierPhysics.ts:143](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/RapierPhysics.ts#L143)

***

### init()

> **init**(`pAutoStart`, `pDebug`, `autoCreateBounds`, `pEngineOptions`?): `Promise`\<`void`\>

Initializes the physics engine

#### Parameters

• **pAutoStart**: `boolean`= `false`

• **pDebug**: `boolean`= `false`

• **autoCreateBounds**: `boolean`= `true`

• **pEngineOptions?**

• **pEngineOptions.gravity?**: `Vector2`

• **pEngineOptions.systemOfUnitsFactor?**: `number`

#### Returns

`Promise`\<`void`\>

#### Overrides

[`PhysicsBase`](/api/classes/physicsbase/).[`init`](/api/classes/physicsbase/#init)

#### Source

[src/physics/rapier/RapierPhysics.ts:39](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/RapierPhysics.ts#L39)

***

### makeWall()

> **makeWall**(`def`): `object`

#### Parameters

• **def**: [`IRapierWallDefinition`](/api/interfaces/irapierwalldefinition/)

#### Returns

`object`

##### body

> **body**: `RigidBody`

##### collider

> **collider**: `Collider`

##### definition

> **definition**: [`IRapierWallDefinition`](/api/interfaces/irapierwalldefinition/) = `def`

#### Source

[src/physics/rapier/RapierPhysics.ts:84](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/RapierPhysics.ts#L84)

***

### removeFromWorld()

> **removeFromWorld**(...`bodies`): `void`

#### Parameters

• ...**bodies**: `RigidBody`[]

#### Returns

`void`

#### Overrides

[`PhysicsBase`](/api/classes/physicsbase/).[`removeFromWorld`](/api/classes/physicsbase/#removefromworld)

#### Source

[src/physics/rapier/RapierPhysics.ts:137](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/RapierPhysics.ts#L137)

***

### start()

> **start**(): `void`

#### Returns

`void`

#### Source

[src/physics/rapier/RapierPhysics.ts:121](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/RapierPhysics.ts#L121)

***

### stop()

> **stop**(): `void`

#### Returns

`void`

#### Source

[src/physics/rapier/RapierPhysics.ts:125](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/RapierPhysics.ts#L125)

***

### update()

> **update**(`deltaTime`): `void`

#### Parameters

• **deltaTime**: `number`

#### Returns

`void`

#### Overrides

[`PhysicsBase`](/api/classes/physicsbase/).[`update`](/api/classes/physicsbase/#update)

#### Source

[src/physics/rapier/RapierPhysics.ts:159](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/RapierPhysics.ts#L159)
