---
editUrl: false
next: false
prev: false
title: "CopyManager"
---

Alias for the function signature of callbacks. Easier on the eyes than (() => void)[] :)

## Constructors

### new CopyManager()

> **new CopyManager**(`app`): [`CopyManager`](/api/classes/copymanager/)

Creates a manager to hold all copy data.

#### Parameters

• **app**: [`Application`](/api/classes/application/)\<`any`\>

#### Returns

[`CopyManager`](/api/classes/copymanager/)

#### Default

```ts
_languageId Set to "en_ca".
```

#### Source

[src/copy/CopyManager.ts:28](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/copy/CopyManager.ts#L28)

## Properties

### onCopyChanged

> **onCopyChanged**: `Signal`\<(`languageId`) => `void`\> = `Signals.onLanguageChanged`

#### Source

[src/copy/CopyManager.ts:10](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/copy/CopyManager.ts#L10)

***

### EN\_CA

> `static` `readonly` **EN\_CA**: `string` = `'en_ca'`

Id for English Canada. This is the default.

#### Source

[src/copy/CopyManager.ts:14](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/copy/CopyManager.ts#L14)

## Accessors

### currentLanguage

> `get` **currentLanguage**(): `string`

A getter for the current set language.

#### Returns

`string`

The current set language id.

#### Source

[src/copy/CopyManager.ts:38](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/copy/CopyManager.ts#L38)

## Methods

### changeLanguage()

> **changeLanguage**(`pNewLanguage`): `void`

Updates the current language and calls all registered callbacks.

#### Parameters

• **pNewLanguage**: `string`

The new language id.

#### Returns

`void`

#### Source

[src/copy/CopyManager.ts:80](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/copy/CopyManager.ts#L80)

***

### getCopy()

> **getCopy**(`pID`): `string`

Gets a line of copy.

#### Parameters

• **pID**: `string`

The id of the copy.

#### Returns

`string`

The found copy, or an error string.

#### Source

[src/copy/CopyManager.ts:59](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/copy/CopyManager.ts#L59)

***

### setData()

> **setData**(`pData`, `pLanguage`?): `void`

Sets the data object and, optionally, the language of the CopyManager. This should be a JSON object.

#### Parameters

• **pData**: `any`

The JSON data object.

• **pLanguage?**: `string`

The language code to use.

#### Returns

`void`

#### Source

[src/copy/CopyManager.ts:47](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/copy/CopyManager.ts#L47)
