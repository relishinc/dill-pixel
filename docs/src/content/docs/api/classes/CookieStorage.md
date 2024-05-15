---
editUrl: false
next: false
prev: false
title: "CookieStorage"
---

## Constructors

### new CookieStorage()

> **new CookieStorage**(): [`CookieStorage`](/api/classes/cookiestorage/)

#### Returns

[`CookieStorage`](/api/classes/cookiestorage/)

#### Source

[src/save/CookieStorage.ts:10](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/save/CookieStorage.ts#L10)

## Accessors

### debug

> `set` **debug**(`pValue`): `void`

#### Parameters

• **pValue**: `boolean`

#### Source

[src/save/CookieStorage.ts:26](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/save/CookieStorage.ts#L26)

***

### hasUserData

> `get` **hasUserData**(): `boolean`

#### Returns

`boolean`

#### Source

[src/save/CookieStorage.ts:21](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/save/CookieStorage.ts#L21)

***

### NEVER\_EXPIRE\_DATE

> `get` `static` **NEVER\_EXPIRE\_DATE**(): `Date`

#### Returns

`Date`

#### Source

[src/save/CookieStorage.ts:17](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/save/CookieStorage.ts#L17)

## Methods

### deleteAllData()

> **deleteAllData**(): `void`

Deletes all data saved in the cookies

#### Returns

`void`

#### Source

[src/save/CookieStorage.ts:159](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/save/CookieStorage.ts#L159)

***

### deleteItem()

> **deleteItem**(`pID`): `void`

#### Parameters

• **pID**: `string`

#### Returns

`void`

#### Source

[src/save/CookieStorage.ts:118](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/save/CookieStorage.ts#L118)

***

### printAll()

> **printAll**(): `void`

Prints all values stored in cookies

#### Returns

`void`

#### Source

[src/save/CookieStorage.ts:129](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/save/CookieStorage.ts#L129)

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

[src/save/CookieStorage.ts:49](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/save/CookieStorage.ts#L49)

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

[src/save/CookieStorage.ts:79](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/save/CookieStorage.ts#L79)

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

[src/save/CookieStorage.ts:108](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/save/CookieStorage.ts#L108)

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

[src/save/CookieStorage.ts:140](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/save/CookieStorage.ts#L140)

***

### storeBool()

> **storeBool**(`pID`, `pValue`, `pExpiryDate`?): `void`

Stores a Bool

#### Parameters

• **pID**: `string`

The ID to store the bool

• **pValue**: `boolean`

The stored bool value

• **pExpiryDate?**: `Date`

The expiry date at which this saved data will be deleted

#### Returns

`void`

#### Source

[src/save/CookieStorage.ts:37](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/save/CookieStorage.ts#L37)

***

### storeNumber()

> **storeNumber**(`pID`, `pValue`, `pExpiryDate`?): `void`

Stores a Number

#### Parameters

• **pID**: `string`

The ID to store the number

• **pValue**: `number`

The stored number value

• **pExpiryDate?**: `Date`

The expiry date at which this saved data will be deleted

#### Returns

`void`

#### Source

[src/save/CookieStorage.ts:67](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/save/CookieStorage.ts#L67)

***

### storeString()

> **storeString**(`pID`, `pValue`, `pExpiryDate`?): `void`

Stores a String

#### Parameters

• **pID**: `string`

The ID to store the string

• **pValue**: `string`

The stored string value

• **pExpiryDate?**: `Date`

The expiry date at which this saved data will be deleted

#### Returns

`void`

#### Source

[src/save/CookieStorage.ts:97](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/save/CookieStorage.ts#L97)
