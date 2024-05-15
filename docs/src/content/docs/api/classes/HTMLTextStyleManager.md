---
editUrl: false
next: false
prev: false
title: "HTMLTextStyleManager"
---

## Constructors

### new HTMLTextStyleManager()

> **new HTMLTextStyleManager**(): [`HTMLTextStyleManager`](/api/classes/htmltextstylemanager/)

#### Returns

[`HTMLTextStyleManager`](/api/classes/htmltextstylemanager/)

## Methods

### add()

> `static` **add**(`id`, `pTextStyle`): `void`

#### Parameters

• **id**: `string` \| `number`

• **pTextStyle**: `HTMLTextStyle`

#### Returns

`void`

#### Source

[src/utils/HTMLTextStyleManager.ts:16](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/utils/HTMLTextStyleManager.ts#L16)

***

### get()

> `static` **get**(`id`): `HTMLTextStyle`

#### Parameters

• **id**: `string` \| `number`

#### Returns

`HTMLTextStyle`

#### Source

[src/utils/HTMLTextStyleManager.ts:23](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/utils/HTMLTextStyleManager.ts#L23)

***

### load()

> `static` **load**(`family`, `style`, `variants`): `Promise`\<`HTMLTextStyle`\>

#### Parameters

• **family**: `string`

• **style**: `Partial`\<`HTMLTextStyle`\>

• **variants**: `HTMLTextVariant`

#### Returns

`Promise`\<`HTMLTextStyle`\>

#### Source

[src/utils/HTMLTextStyleManager.ts:34](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/utils/HTMLTextStyleManager.ts#L34)
