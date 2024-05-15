---
editUrl: false
next: false
prev: false
title: "IPhysicsMakeFactory"
---

## Methods

### physicsSprite()

#### physicsSprite(settings)

> **physicsSprite**(`settings`): [`IPhysicsObject`](/api/interfaces/iphysicsobject/)

##### Parameters

• **settings**: [`PhysicsSpriteSettings`](/api/interfaces/physicsspritesettings/)

##### Returns

[`IPhysicsObject`](/api/interfaces/iphysicsobject/)

##### Source

[src/physics/interfaces/IPhysicsMakeFactory.ts:10](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/interfaces/IPhysicsMakeFactory.ts#L10)

#### physicsSprite(asset, sheet, size, bodyType, alpha, position, scale)

> **physicsSprite**(`asset`, `sheet`?, `size`?, `bodyType`?, `alpha`?, `position`?, `scale`?): [`IPhysicsObject`](/api/interfaces/iphysicsobject/)

##### Parameters

• **asset**: `string` \| `Texture`\<`Resource`\>

• **sheet?**: [`SpritesheetLike`](/api/type-aliases/spritesheetlike/)

• **size?**: [`PointLike`](/api/type-aliases/pointlike/)

• **bodyType?**: [`PhysicsBodyType`](/api/enumerations/physicsbodytype/)

• **alpha?**: `number`

• **position?**: [`PointLike`](/api/type-aliases/pointlike/)

• **scale?**: [`PointLike`](/api/type-aliases/pointlike/)

##### Returns

[`IPhysicsObject`](/api/interfaces/iphysicsobject/)

##### Source

[src/physics/interfaces/IPhysicsMakeFactory.ts:12](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/interfaces/IPhysicsMakeFactory.ts#L12)
