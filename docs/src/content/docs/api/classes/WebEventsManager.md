---
editUrl: false
next: false
prev: false
title: "WebEventsManager"
---

Maintains a list of callbacks for specific web events and invokes callbacks when event occurs.

## Constructors

### new WebEventsManager()

> **new WebEventsManager**(`app`): [`WebEventsManager`](/api/classes/webeventsmanager/)

Creates callback arrays and registers to web events.

#### Parameters

• **app**: [`Application`](/api/classes/application/)\<`any`\>

#### Returns

[`WebEventsManager`](/api/classes/webeventsmanager/)

#### Source

[src/utils/WebEventsManager.ts:28](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/utils/WebEventsManager.ts#L28)

## Methods

### registerResizeCallback()

> **registerResizeCallback**(`pCallback`): `boolean`

Registers a callback interested in browser resize.

#### Parameters

• **pCallback**: `ResizeCallback`

The callback to register.

#### Returns

`boolean`

False if the callback was previously added.

#### Source

[src/utils/WebEventsManager.ts:70](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/utils/WebEventsManager.ts#L70)

***

### registerVisibilityChangedCallback()

> **registerVisibilityChangedCallback**(`pCallback`): `boolean`

Registers a callback interested in visibility changes. Callbacks will be told if the page is visible.

#### Parameters

• **pCallback**: `VisibilityChangedCallback`

The callback to register.

#### Returns

`boolean`

False if the callback was previously added.

#### Source

[src/utils/WebEventsManager.ts:42](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/utils/WebEventsManager.ts#L42)

***

### unregisterResizeCallback()

> **unregisterResizeCallback**(`pCallback`): `void`

Unregisters a resize callback.

#### Parameters

• **pCallback**: `ResizeCallback`

The callback to unregister.

#### Returns

`void`

#### Source

[src/utils/WebEventsManager.ts:85](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/utils/WebEventsManager.ts#L85)

***

### unregisterVisibilityChangedCallback()

> **unregisterVisibilityChangedCallback**(`pCallback`): `void`

Unregisters a visibility change callback.

#### Parameters

• **pCallback**: `VisibilityChangedCallback`

The callback to unregister.

#### Returns

`void`

#### Source

[src/utils/WebEventsManager.ts:57](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/utils/WebEventsManager.ts#L57)
