---
editUrl: false
next: false
prev: false
title: "StateManager"
---

Manages all states.

## Extends

- [`Container`](/api/classes/container/)\<`T`\>

## Type parameters

• **T** *extends* [`Application`](/api/classes/application/) = [`Application`](/api/classes/application/)

## Constructors

### new StateManager()

> **new StateManager**\<`T`\>(`_app`): [`StateManager`](/api/classes/statemanager/)\<`T`\>

#### Parameters

• **\_app**: [`Application`](/api/classes/application/)\<`any`\>

#### Returns

[`StateManager`](/api/classes/statemanager/)\<`T`\>

#### Overrides

[`Container`](/api/classes/container/).[`constructor`](/api/classes/container/#constructors)

#### Source

[src/state/StateManager.ts:108](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/StateManager.ts#L108)

## Properties

### childrenEditable

> **childrenEditable**: `boolean` = `true`

#### Inherited from

[`Container`](/api/classes/container/).[`childrenEditable`](/api/classes/container/#childreneditable)

#### Source

[src/gameobjects/Container.ts:23](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L23)

***

### editable

> **editable**: `boolean` = `true`

#### Inherited from

[`Container`](/api/classes/container/).[`editable`](/api/classes/container/#editable)

#### Source

[src/gameobjects/Container.ts:22](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L22)

***

### \_\_dill\_pixel\_top\_level\_class

> `static` **\_\_dill\_pixel\_top\_level\_class**: `boolean` = `true`

#### Inherited from

[`Container`](/api/classes/container/).[`__dill_pixel_top_level_class`](/api/classes/container/#__dill_pixel_top_level_class)

#### Source

[src/gameobjects/Container.ts:21](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L21)

## Accessors

### add

> `get` **add**(): [`Add`](/api/classes/add/)

#### Returns

[`Add`](/api/classes/add/)

#### Source

[src/gameobjects/Container.ts:121](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L121)

***

### app

> `get` **app**(): `T`

#### Returns

`T`

#### Source

[src/gameobjects/Container.ts:129](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L129)

***

### current

> `get` **current**(): `undefined` \| [`State`](/api/classes/state/)\<[`Application`](/api/classes/application/)\<`any`\>\>

#### Returns

`undefined` \| [`State`](/api/classes/state/)\<[`Application`](/api/classes/application/)\<`any`\>\>

#### Source

[src/state/StateManager.ts:146](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/StateManager.ts#L146)

***

### currentId

> `get` **currentId**(): `string`

#### Returns

`string`

#### Source

[src/state/StateManager.ts:150](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/StateManager.ts#L150)

***

### debug

> `set` **debug**(`pEnabled`): `void`

Enabling this will print all debug logs.

#### Parameters

• **pEnabled**: `boolean`

#### Source

[src/state/StateManager.ts:141](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/StateManager.ts#L141)

***

### default

> `get` **default**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Source

[src/state/StateManager.ts:134](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/StateManager.ts#L134)

***

### defaultTransitionType

> `set` **defaultTransitionType**(`transitionType`): `void`

#### Parameters

• **transitionType**: [`TransitionStep`](/api/enumerations/transitionstep/)[]

#### Source

[src/state/StateManager.ts:130](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/StateManager.ts#L130)

***

### editMode

> `get` **editMode**(): `boolean`

> `set` **editMode**(`value`): `void`

#### Parameters

• **value**: `boolean`

#### Returns

`boolean`

#### Source

[src/gameobjects/Container.ts:108](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L108)

***

### focusPosition

> `get` **focusPosition**(): `Point`

> `set` **focusPosition**(`value`): `void`

#### Parameters

• **value**: `Point`

#### Returns

`Point`

#### Source

[src/gameobjects/Container.ts:84](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L84)

***

### focusSize

> `get` **focusSize**(): `Point`

> `set` **focusSize**(`value`): `void`

#### Parameters

• **value**: `Point`

#### Returns

`Point`

#### Source

[src/gameobjects/Container.ts:92](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L92)

***

### focusable

> `get` **focusable**(): `boolean`

> `set` **focusable**(`value`): `void`

#### Parameters

• **value**: `boolean`

#### Returns

`boolean`

#### Source

[src/gameobjects/Container.ts:100](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L100)

***

### make

> `get` **make**(): *typeof* [`Make`](/api/classes/make/)

#### Returns

*typeof* [`Make`](/api/classes/make/)

#### Source

[src/gameobjects/Container.ts:125](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L125)

***

### useAsCaptionTarget

> `get` **useAsCaptionTarget**(): `boolean`

> `set` **useAsCaptionTarget**(`value`): `void`

#### Parameters

• **value**: `boolean`

#### Returns

`boolean`

#### Source

[src/gameobjects/Container.ts:62](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L62)

***

### useHash

> `set` **useHash**(`value`): `void`

#### Parameters

• **value**: `boolean`

#### Source

[src/state/StateManager.ts:122](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/StateManager.ts#L122)

***

### voiceover

> `get` **voiceover**(): `string`

> `set` **voiceover**(`value`): `void`

#### Parameters

• **value**: `string`

#### Returns

`string`

#### Source

[src/gameobjects/Container.ts:70](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L70)

## Methods

### destroy()

> **destroy**(`_options`?): `void`

#### Parameters

• **\_options?**: `boolean` \| `IDestroyOptions`

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`destroy`](/api/classes/container/#destroy)

#### Source

[src/gameobjects/Container.ts:133](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L133)

***

### disableEditMode()

> **disableEditMode**(): `void`

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`disableEditMode`](/api/classes/container/#disableeditmode)

#### Source

[src/gameobjects/Container.ts:174](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L174)

***

### enableEditMode()

> **enableEditMode**(): `void`

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`enableEditMode`](/api/classes/container/#enableeditmode)

#### Source

[src/gameobjects/Container.ts:170](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L170)

***

### excludeFromDebugList()

> **excludeFromDebugList**(`name`): `void`

#### Parameters

• **name**: `string`

#### Returns

`void`

#### Source

[src/state/StateManager.ts:320](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/StateManager.ts#L320)

***

### getFocusPosition()

> **getFocusPosition**(): `Point`

Gets the position in global coordinate space that the focus should be centred around.

#### Returns

`Point`

The position that the focus should be centred around.

#### Inherited from

[`Container`](/api/classes/container/).[`getFocusPosition`](/api/classes/container/#getfocusposition)

#### Source

[src/gameobjects/Container.ts:158](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L158)

***

### getFocusSize()

> **getFocusSize**(): `IPoint`

Gets the size of the area in global coordinate space that the focus should surround.

#### Returns

`IPoint`

The size of the area that the focus should surround.

#### Inherited from

[`Container`](/api/classes/container/).[`getFocusSize`](/api/classes/container/#getfocussize)

#### Source

[src/gameobjects/Container.ts:162](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L162)

***

### getRegisteredStateIds()

> **getRegisteredStateIds**(): `string`[]

#### Returns

`string`[]

#### Source

[src/state/StateManager.ts:300](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/StateManager.ts#L300)

***

### getStateFromHash()

> **getStateFromHash**(): `null` \| `string`

#### Returns

`null` \| `string`

#### Source

[src/state/StateManager.ts:304](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/StateManager.ts#L304)

***

### isFocusable()

> **isFocusable**(): `boolean`

#### Returns

`boolean`

true if this focusable can be focused
Defaults to this.interactive && this.worldVisible

#### Inherited from

[`Container`](/api/classes/container/).[`isFocusable`](/api/classes/container/#isfocusable)

#### Source

[src/gameobjects/Container.ts:166](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L166)

***

### onFocusActivated()

> **onFocusActivated**(): `void`

Called when this Focusable is focussed and then activated.

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`onFocusActivated`](/api/classes/container/#onfocusactivated)

#### Source

[src/gameobjects/Container.ts:156](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L156)

***

### onFocusBegin()

> **onFocusBegin**(): `void`

Called when this Focusable is focussed.

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`onFocusBegin`](/api/classes/container/#onfocusbegin)

#### Source

[src/gameobjects/Container.ts:144](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L144)

***

### onFocusEnd()

> **onFocusEnd**(): `void`

Called when this Focusable is no longer focussed.

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`onFocusEnd`](/api/classes/container/#onfocusend)

#### Source

[src/gameobjects/Container.ts:150](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L150)

***

### onResize()

> **onResize**(`size`): `void`

Called when the window is resized.

#### Parameters

• **size**: `Point`

The new size.

#### Returns

`void`

#### Overrides

[`Container`](/api/classes/container/).[`onResize`](/api/classes/container/#onresize)

#### Source

[src/state/StateManager.ts:168](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/StateManager.ts#L168)

***

### register()

> **register**(`stateIdOrClass`, `creationMethod`?, `autoAddAssets`?): `void`

Registers a state so that it can be transitioned to.

#### Parameters

• **stateIdOrClass**: `string` \| *typeof* [`State`](/api/classes/state/) \| *typeof* [`State`](/api/classes/state/)

The id of the new state or the class of the new state.

• **creationMethod?**

A function that constructs the state.

• **autoAddAssets?**: `boolean`= `true`

whether to automatically register the asset group for this state - only works if stateIdOrClass is a class

#### Returns

`void`

#### Source

[src/state/StateManager.ts:184](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/StateManager.ts#L184)

***

### showDebugMenu()

> **showDebugMenu**(): `void`

#### Returns

`void`

#### Source

[src/state/StateManager.ts:211](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/StateManager.ts#L211)

***

### statesRegistered()

> **statesRegistered**(): `void`

#### Returns

`void`

#### Source

[src/state/StateManager.ts:201](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/StateManager.ts#L201)

***

### transitionTo()

> **transitionTo**(`stateIdAndData`, `loadScreen`?, `transitionSteps`?): `boolean`

Method to transition states
instead call this.app.state.transitionTo(stateId, loadScreenId)

#### Parameters

• **stateIdAndData**: `string` \| *typeof* [`State`](/api/classes/state/) \| `object`

• **loadScreen?**: `string`

• **transitionSteps?**: [`TransitionStep`](/api/enumerations/transitionstep/)[]

#### Returns

`boolean`

#### Source

[src/state/StateManager.ts:264](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/StateManager.ts#L264)

***

### update()

> **update**(`deltaTime`): `void`

Updates the current active state.

#### Parameters

• **deltaTime**: `number`

ticker.shared.elapsedMS / 1000.

#### Returns

`void`

#### Overrides

[`Container`](/api/classes/container/).[`update`](/api/classes/container/#update)

#### Source

[src/state/StateManager.ts:158](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/StateManager.ts#L158)
