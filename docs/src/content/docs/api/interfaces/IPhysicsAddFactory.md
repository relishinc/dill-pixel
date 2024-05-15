---
editUrl: false
next: false
prev: false
title: "IPhysicsAddFactory"
---

## Accessors

### container

> `set` **container**(`value`): `void`

#### Parameters

• **value**: `Container`\<`DisplayObject`\>

#### Source

[src/physics/interfaces/IPhysicsAddFactory.ts:8](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/physics/interfaces/IPhysicsAddFactory.ts#L8)

## Methods

### existing()

> **existing**(`pSprite`): [`IPhysicsObject`](/api/interfaces/iphysicsobject/)

#### Parameters

• **pSprite**: `DisplayObject`

#### Returns

[`IPhysicsObject`](/api/interfaces/iphysicsobject/)

#### Source

[src/physics/interfaces/IPhysicsAddFactory.ts:23](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/physics/interfaces/IPhysicsAddFactory.ts#L23)

***

### physicsSprite()

#### physicsSprite(settings)

> **physicsSprite**(`settings`): [`IPhysicsObject`](/api/interfaces/iphysicsobject/)

##### Parameters

• **settings**: [`PhysicsSpriteSettings`](/api/interfaces/physicsspritesettings/)

##### Returns

[`IPhysicsObject`](/api/interfaces/iphysicsobject/)

##### Source

[src/physics/interfaces/IPhysicsAddFactory.ts:10](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/physics/interfaces/IPhysicsAddFactory.ts#L10)

#### physicsSprite(asset, sheet, size, bodyType, alpha, position, scale, __namedParameters)

> **physicsSprite**(`asset`, `sheet`?, `size`?, `bodyType`?, `alpha`?, `position`?, `scale`?, `__namedParameters`?): [`IPhysicsObject`](/api/interfaces/iphysicsobject/)

##### Parameters

• **asset**: `string` \| `Texture`\<`Resource`\>

• **sheet?**: [`SpritesheetLike`](/api/type-aliases/spritesheetlike/)

• **size?**: [`PointLike`](/api/type-aliases/pointlike/)

• **bodyType?**: [`PhysicsBodyType`](/api/enumerations/physicsbodytype/)

• **alpha?**: `number`

• **position?**: [`PointLike`](/api/type-aliases/pointlike/)

• **scale?**: [`PointLike`](/api/type-aliases/pointlike/)

• **\_\_namedParameters?**: `any`

##### Returns

[`IPhysicsObject`](/api/interfaces/iphysicsobject/)

##### Source

[src/physics/interfaces/IPhysicsAddFactory.ts:12](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/physics/interfaces/IPhysicsAddFactory.ts#L12)
