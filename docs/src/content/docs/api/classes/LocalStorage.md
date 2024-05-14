---
editUrl: false
next: false
prev: false
title: "LocalStorage"
---

## Constructors

### new LocalStorage()

> **new LocalStorage**(): [`LocalStorage`](/api/classes/localstorage/)

#### Returns

[`LocalStorage`](/api/classes/localstorage/)

## Accessors

### debug

> `set` **debug**(`pValue`): `void`

#### Parameters

• **pValue**: `boolean`

#### Source

[src/save/LocalStorage.ts:10](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/LocalStorage.ts#L10)

***

### hasUserData

> `get` **hasUserData**(): `boolean`

#### Returns

`boolean`

#### Source

[src/save/LocalStorage.ts:6](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/LocalStorage.ts#L6)

## Methods

### deleteAllData()

> **deleteAllData**(): `void`

Deletes all data saved in local storage

#### Returns

`void`

#### Source

[src/save/LocalStorage.ts:131](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/LocalStorage.ts#L131)

***

### deleteItem()

> **deleteItem**(`pID`): `boolean`

Deletes an item

#### Parameters

• **pID**: `string`

The ID of the item to delete

#### Returns

`boolean`

#### Source

[src/save/LocalStorage.ts:103](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/LocalStorage.ts#L103)

***

### printAll()

> **printAll**(): `void`

Prints all values stored in local storage

#### Returns

`void`

#### Source

[src/save/LocalStorage.ts:116](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/LocalStorage.ts#L116)

***

### readBool()

> **readBool**(`pID`, `pDefault`): `boolean`

Reads a Bool

#### Parameters

• **pID**: `string`

The ID to read the bool

• **pDefault**: `boolean`= `false`

The default value of the returned bool

#### Returns

`boolean`

#### Source

[src/save/LocalStorage.ts:32](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/LocalStorage.ts#L32)

***

### readNumber()

> **readNumber**(`pID`, `pDefault`): `number`

Reads a Number

#### Parameters

• **pID**: `string`

The ID to read the number

• **pDefault**: `number`= `0`

The default value of the returned number

#### Returns

`number`

#### Source

[src/save/LocalStorage.ts:60](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/LocalStorage.ts#L60)

***

### readString()

> **readString**(`pID`, `pDefault`): `string`

Reads a String

#### Parameters

• **pID**: `string`

The ID to read the string

• **pDefault**: `string`= `''`

The default value of the returned string

#### Returns

`string`

#### Source

[src/save/LocalStorage.ts:88](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/LocalStorage.ts#L88)

***

### storeBool()

> **storeBool**(`pID`, `pValue`): `void`

Stores a Bool

#### Parameters

• **pID**: `string`

The ID to store the bool

• **pValue**: `boolean`

The stored bool value

#### Returns

`void`

#### Source

[src/save/LocalStorage.ts:20](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/LocalStorage.ts#L20)

***

### storeNumber()

> **storeNumber**(`pID`, `pValue`): `void`

Stores a Number

#### Parameters

• **pID**: `string`

The ID to store the number

• **pValue**: `number`

The stored number value

#### Returns

`void`

#### Source

[src/save/LocalStorage.ts:48](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/LocalStorage.ts#L48)

***

### storeString()

> **storeString**(`pID`, `pValue`): `void`

Stores a String

#### Parameters

• **pID**: `string`

The ID to store the string

• **pValue**: `string`

The stored string value

#### Returns

`void`

#### Source

[src/save/LocalStorage.ts:77](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/save/LocalStorage.ts#L77)
