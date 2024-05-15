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

[src/utils/HTMLTextStyleManager.ts:16](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/HTMLTextStyleManager.ts#L16)

***

### get()

> `static` **get**(`id`): `HTMLTextStyle`

#### Parameters

• **id**: `string` \| `number`

#### Returns

`HTMLTextStyle`

#### Source

[src/utils/HTMLTextStyleManager.ts:23](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/HTMLTextStyleManager.ts#L23)

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

[src/utils/HTMLTextStyleManager.ts:34](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/HTMLTextStyleManager.ts#L34)
