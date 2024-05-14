---
editUrl: false
next: false
prev: false
title: "KeyboardManager"
---

Keyboard manager

## Constructors

### new KeyboardManager()

> **new KeyboardManager**(`app`): [`KeyboardManager`](/api/classes/keyboardmanager/)

#### Parameters

• **app**: [`Application`](/api/classes/application/)\<`any`\>

#### Returns

[`KeyboardManager`](/api/classes/keyboardmanager/)

#### Source

[src/input/KeyboardManager.ts:86](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/KeyboardManager.ts#L86)

## Accessors

### debug

> `set` **debug**(`pEnabled`): `void`

#### Parameters

• **pEnabled**: `boolean`

#### Source

[src/input/KeyboardManager.ts:139](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/KeyboardManager.ts#L139)

***

### isActive

> `get` **isActive**(): `boolean`

#### Returns

`boolean`

#### Source

[src/input/KeyboardManager.ts:143](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/KeyboardManager.ts#L143)

***

### numLayers

> `get` **numLayers**(): `number`

#### Returns

`number`

#### Source

[src/input/KeyboardManager.ts:147](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/KeyboardManager.ts#L147)

## Methods

### addDefaultBindings()

> **addDefaultBindings**(): `void`

#### Returns

`void`

#### Source

[src/input/KeyboardManager.ts:274](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/KeyboardManager.ts#L274)

***

### addKeyBinding()

> **addKeyBinding**(`pDirection`, `pKeyCode`, `pModifiers`?): `void`

#### Parameters

• **pDirection**: `"Enter"` \| [`Direction`](/api/enumerations/direction/)

• **pKeyCode**: [`KeyCodes`](/api/enumerations/keycodes/)

• **pModifiers?**: `Partial`\<`object`\>

#### Returns

`void`

#### Source

[src/input/KeyboardManager.ts:151](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/KeyboardManager.ts#L151)

***

### getAllKeyBindings()

> **getAllKeyBindings**(): `Readonly`\<`object`\>

#### Returns

`Readonly`\<`object`\>

#### Source

[src/input/KeyboardManager.ts:254](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/KeyboardManager.ts#L254)

***

### getKeyBindings()

> **getKeyBindings**(`pDirection`): `IKeyboardBinding`[]

#### Parameters

• **pDirection**: `"Enter"` \| [`Direction`](/api/enumerations/direction/)

#### Returns

`IKeyboardBinding`[]

#### Source

[src/input/KeyboardManager.ts:250](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/KeyboardManager.ts#L250)

***

### isKeyBound()

> **isKeyBound**(`pKeyCode`, `pModifiers`?): `false` \| `object`

returns an object which you can use for removeBinding, or false if not bound

#### Parameters

• **pKeyCode**: [`KeyCodes`](/api/enumerations/keycodes/)

• **pModifiers?**: `Partial`\<`object`\>

#### Returns

`false` \| `object`

#### Source

[src/input/KeyboardManager.ts:295](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/KeyboardManager.ts#L295)

***

### isKeyDown()

> **isKeyDown**(...`args`): `boolean`

#### Parameters

• ...**args**: (`string` \| [`KeyCodes`](/api/enumerations/keycodes/))[]

#### Returns

`boolean`

#### Source

[src/input/KeyboardManager.ts:319](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/KeyboardManager.ts#L319)

***

### printAllKeyBindings()

> **printAllKeyBindings**(): `void`

log key bindings to console, if this.debug is true

#### Returns

`void`

#### Source

[src/input/KeyboardManager.ts:266](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/KeyboardManager.ts#L266)

***

### removeAllKeyBindings()

> **removeAllKeyBindings**(): `void`

#### Returns

`void`

#### Source

[src/input/KeyboardManager.ts:245](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/KeyboardManager.ts#L245)

***

### removeKeyBinding()

> **removeKeyBinding**(`pDirection`, `pKeyCode`, `pModifiers`?): `void`

removes a specific key associated with the direction

#### Parameters

• **pDirection**: `"Enter"` \| [`Direction`](/api/enumerations/direction/)

• **pKeyCode**: [`KeyCodes`](/api/enumerations/keycodes/)

• **pModifiers?**: `Partial`\<`object`\>

#### Returns

`void`

#### Source

[src/input/KeyboardManager.ts:199](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/KeyboardManager.ts#L199)

***

### removeKeyBindings()

> **removeKeyBindings**(`pDirection`): `void`

removes all keys associated with the direction

#### Parameters

• **pDirection**: `"Enter"` \| [`Direction`](/api/enumerations/direction/)

#### Returns

`void`

#### Source

[src/input/KeyboardManager.ts:193](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/KeyboardManager.ts#L193)

***

### bindingToString()

> `static` **bindingToString**(`pBinding`): `string`

#### Parameters

• **pBinding**: `IKeyboardBinding`

#### Returns

`string`

#### Source

[src/input/KeyboardManager.ts:42](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/KeyboardManager.ts#L42)
