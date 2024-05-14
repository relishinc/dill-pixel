---
editUrl: false
next: false
prev: false
title: "RapierPhysicsComposite"
---

## Extends

- `Container`

## Implements

- [`IPhysicsObject`](/api/interfaces/iphysicsobject/)

## Constructors

### new RapierPhysicsComposite()

> **new RapierPhysicsComposite**(): [`RapierPhysicsComposite`](/api/classes/rapierphysicscomposite/)

#### Returns

[`RapierPhysicsComposite`](/api/classes/rapierphysicscomposite/)

#### Overrides

`Container.constructor`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:26](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L26)

## Properties

### bodies

> **bodies**: `RigidBody`[] = `[]`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:21](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L21)

***

### body

> **body**: `RigidBody`

#### Implementation of

[`IPhysicsObject`](/api/interfaces/iphysicsobject/).[`body`](/api/interfaces/iphysicsobject/#body)

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:20](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L20)

***

### collider

> **collider**: `Collider`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:22](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L22)

***

### colliderRef

> **colliderRef**: `object`[] = `[]`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:24](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L24)

***

### colliders

> **colliders**: `Collider`[] = `[]`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:23](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L23)

***

### visual

> **visual**: `Sprite`

#### Implementation of

[`IPhysicsObject`](/api/interfaces/iphysicsobject/).[`visual`](/api/interfaces/iphysicsobject/#visual)

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:18](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L18)

***

### visuals

> **visuals**: `Sprite`[] = `[]`

#### Implementation of

[`IPhysicsObject`](/api/interfaces/iphysicsobject/).[`visuals`](/api/interfaces/iphysicsobject/#visuals)

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:19](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L19)

***

### DEFAULT\_DEBUG\_COLOR

> `static` `readonly` **DEFAULT\_DEBUG\_COLOR**: `number` = `0x29c5f6`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:17](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L17)

## Accessors

### activeCollisionTypes

> `get` **activeCollisionTypes**(): `ActiveCollisionTypes`

#### Returns

`ActiveCollisionTypes`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:46](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L46)

***

### activeEvents

> `get` **activeEvents**(): `ActiveEvents`

#### Returns

`ActiveEvents`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:51](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L51)

***

### activeHooks

> `get` **activeHooks**(): `ActiveHooks`

#### Returns

`ActiveHooks`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:56](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L56)

***

### app

> `get` **app**(): [`Application`](/api/classes/application/)\<`any`\>

#### Returns

[`Application`](/api/classes/application/)\<`any`\>

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:38](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L38)

***

### debugColor

> `get` **debugColor**(): `number`

#### Returns

`number`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:60](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L60)

***

### physics

> `get` **physics**(): [`RapierPhysics`](/api/classes/rapierphysics/)

#### Returns

[`RapierPhysics`](/api/classes/rapierphysics/)

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:34](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L34)

***

### world

> `get` **world**(): `World`

#### Returns

`World`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:42](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L42)

## Methods

### addVisual()

> **addVisual**(`color`, `size`, `position`, `type`): `Sprite`

#### Parameters

• **color**: `number`

• **size**: [`number`, `number`]

• **position**: [`number`, `number`]= `undefined`

• **type**: [`PhysicsBodyType`](/api/enumerations/physicsbodytype/)= `PhysicsBodyType.RECTANGLE`

#### Returns

`Sprite`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:64](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L64)

***

### createBody()

> **createBody**(): `void`

#### Returns

`void`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:143](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L143)

***

### createCollider()

> **createCollider**(`visual`, `body`, `type`): `Collider`

#### Parameters

• **visual**: `Sprite`

• **body**: `RigidBody`

• **type**: [`PhysicsBodyType`](/api/enumerations/physicsbodytype/)= `PhysicsBodyType.RECTANGLE`

#### Returns

`Collider`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:86](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L86)

***

### createPiece()

> **createPiece**(`color`, `size`, `position`, `angle`, `type`, `data`?): `object`

#### Parameters

• **color**: `number`

• **size**: [`number`, `number`]

• **position**: [`number`, `number`]= `undefined`

• **angle**: `number`= `0`

• **type**: [`PhysicsBodyType`](/api/enumerations/physicsbodytype/)= `PhysicsBodyType.RECTANGLE`

• **data?**: `any`

#### Returns

`object`

##### body

> **body**: `RigidBody`

##### collider

> **collider**: `Collider`

##### visual

> **visual**: `Sprite`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:115](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L115)

***

### onAdded()

> **onAdded**(): `void`

#### Returns

`void`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:77](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L77)

***

### onRemoved()

> **onRemoved**(): `void`

#### Returns

`void`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:82](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L82)

***

### update()

> **update**(): `void`

#### Returns

`void`

#### Source

[src/physics/rapier/gameobjects/RapierPhysicsComposite.ts:224](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/physics/rapier/gameobjects/RapierPhysicsComposite.ts#L224)
