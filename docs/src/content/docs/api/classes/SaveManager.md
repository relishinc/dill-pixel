---
editUrl: false
next: false
prev: false
title: "SaveManager"
---

## Constructors

### new SaveManager()

> **new SaveManager**(`app`): [`SaveManager`](/api/classes/savemanager/)

#### Parameters

• **app**: [`Application`](/api/classes/application/)\<`any`\>

#### Returns

[`SaveManager`](/api/classes/savemanager/)

#### Source

[src/save/SaveManager.ts:15](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/SaveManager.ts#L15)

## Accessors

### debug

> `set` **debug**(`pValue`): `void`

#### Parameters

• **pValue**: `boolean`

#### Source

[src/save/SaveManager.ts:28](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/SaveManager.ts#L28)

***

### hasCookieData

> `get` **hasCookieData**(): `boolean`

#### Returns

`boolean`

#### Source

[src/save/SaveManager.ts:24](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/SaveManager.ts#L24)

***

### hasLocalStorageData

> `get` **hasLocalStorageData**(): `boolean`

#### Returns

`boolean`

#### Source

[src/save/SaveManager.ts:20](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/SaveManager.ts#L20)

## Methods

### deleteAllData()

> **deleteAllData**(): `void`

Deletes all data saved in both the cookies and local storage

#### Returns

`void`

#### Source

[src/save/SaveManager.ts:185](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/SaveManager.ts#L185)

***

### deleteItem()

> **deleteItem**(`pID`, `pStorage`): `void`

Deletes an Item

#### Parameters

• **pID**: `string`

The ID to delete

• **pStorage**: [`Storage`](/api/enumerations/storage/)= `Storage.Cookie`

Where the item is stored

#### Returns

`void`

#### Source

[src/save/SaveManager.ts:147](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/SaveManager.ts#L147)

***

### printAll()

> **printAll**(`pStorage`): `void`

Prints all values of the Storage type passed in

#### Parameters

• **pStorage**: [`Storage`](/api/enumerations/storage/)

What storage to print all values from

#### Returns

`void`

#### Source

[src/save/SaveManager.ts:171](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/SaveManager.ts#L171)

***

### readBool()

> **readBool**(`pID`, `pDefault`, `pStorage`): `boolean`

Reads a Bool

#### Parameters

• **pID**: `string`

The ID to read the bool

• **pDefault**: `boolean`= `false`

The default value of the returned bool

• **pStorage**: [`Storage`](/api/enumerations/storage/)= `Storage.Cookie`

Where the bool should be stored

#### Returns

`boolean`

#### Source

[src/save/SaveManager.ts:59](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/SaveManager.ts#L59)

***

### readNumber()

> **readNumber**(`pID`, `pDefault`, `pStorage`): `number`

Reads a Number

#### Parameters

• **pID**: `string`

The ID to read the number

• **pDefault**: `number`= `0`

The default value of the returned number

• **pStorage**: [`Storage`](/api/enumerations/storage/)= `Storage.Cookie`

Where the number should be stored

#### Returns

`number`

#### Source

[src/save/SaveManager.ts:95](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/SaveManager.ts#L95)

***

### readString()

> **readString**(`pID`, `pDefault`, `pStorage`): `string`

Reads a String

#### Parameters

• **pID**: `string`

The ID to read the string

• **pDefault**: `string`= `''`

The default value of the returned string

• **pStorage**: [`Storage`](/api/enumerations/storage/)= `Storage.Cookie`

Where the string should be stored

#### Returns

`string`

#### Source

[src/save/SaveManager.ts:131](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/SaveManager.ts#L131)

***

### setCookieExpiration()

> **setCookieExpiration**(`pID`, `pExpiryDate`): `void`

Sets the Expiration date of a cookie

#### Parameters

• **pID**: `string`

The ID of the cookie

• **pExpiryDate**: `Date`

The expiry date at which this saved data will be deleted

#### Returns

`void`

#### Source

[src/save/SaveManager.ts:163](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/SaveManager.ts#L163)

***

### storeBool()

> **storeBool**(`pID`, `pValue`, `pStorage`): `void`

Stores a Bool

#### Parameters

• **pID**: `string`

The ID to store the bool

• **pValue**: `boolean`

The stored bool value

• **pStorage**: [`Storage`](/api/enumerations/storage/)= `Storage.Cookie`

Where the bool should be stored

#### Returns

`void`

#### Source

[src/save/SaveManager.ts:41](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/SaveManager.ts#L41)

***

### storeNumber()

> **storeNumber**(`pID`, `pValue`, `pStorage`): `void`

Stores a Number

#### Parameters

• **pID**: `string`

The ID to store the number

• **pValue**: `number`

The stored number value

• **pStorage**: [`Storage`](/api/enumerations/storage/)= `Storage.Cookie`

Where the number should be stored

#### Returns

`void`

#### Source

[src/save/SaveManager.ts:77](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/SaveManager.ts#L77)

***

### storeString()

> **storeString**(`pID`, `pValue`, `pStorage`): `void`

Stores a String

#### Parameters

• **pID**: `string`

The ID to store the string

• **pValue**: `string`

The stored string value

• **pStorage**: [`Storage`](/api/enumerations/storage/)= `Storage.Cookie`

Where the string should be stored

#### Returns

`void`

#### Source

[src/save/SaveManager.ts:113](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/SaveManager.ts#L113)
