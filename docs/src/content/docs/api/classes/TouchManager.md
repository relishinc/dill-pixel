---
editUrl: false
next: false
prev: false
title: "TouchManager"
---

TouchManager

## Constructors

### new TouchManager()

> **new TouchManager**(`pEventSystem`, `pTarget`): [`TouchManager`](/api/classes/touchmanager/)

#### Parameters

• **pEventSystem**: `EventSystem`

• **pTarget**: `DisplayObject`

#### Returns

[`TouchManager`](/api/classes/touchmanager/)

#### Source

[src/input/TouchManager.ts:51](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/TouchManager.ts#L51)

## Accessors

### onPinch

> `set` **onPinch**(`pValue`): `void`

Sets the callback to be fired when a pinch is updated

#### Parameters

• **pValue**: `undefined` \| (`pDelta`) => `void`

#### Source

[src/input/TouchManager.ts:106](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/TouchManager.ts#L106)

***

### onPinchEnd

> `set` **onPinchEnd**(`pValue`): `void`

Sets the callback to be fired when a pinch ends

#### Parameters

• **pValue**: `undefined` \| (`pDelta`) => `void`

#### Source

[src/input/TouchManager.ts:122](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/TouchManager.ts#L122)

***

### onPinchStart

> `set` **onPinchStart**(`pValue`): `void`

Sets the callback to be fired when a pinch starts

#### Parameters

• **pValue**: `undefined` \| (`pDelta`) => `void`

#### Source

[src/input/TouchManager.ts:114](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/TouchManager.ts#L114)

***

### onSwipe

> `set` **onSwipe**(`pValue`): `void`

Sets the callback to be fired when a swipe is updated

#### Parameters

• **pValue**: `undefined` \| (`pDelta`) => `void`

#### Source

[src/input/TouchManager.ts:81](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/TouchManager.ts#L81)

***

### onSwipeEnd

> `set` **onSwipeEnd**(`pValue`): `void`

Sets the callback to be fired when a swipe ends

#### Parameters

• **pValue**: `undefined` \| (`pDelta`) => `void`

#### Source

[src/input/TouchManager.ts:98](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/TouchManager.ts#L98)

***

### onSwipeStart

> `set` **onSwipeStart**(`pValue`): `void`

Sets the callback to be fired when a swipe starts

#### Parameters

• **pValue**: `undefined` \| (`pDelta`) => `void`

#### Source

[src/input/TouchManager.ts:90](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/TouchManager.ts#L90)

***

### pinchThreshhold

> `set` **pinchThreshhold**(`pValue`): `void`

Sets the minimum magnitude of a pinch. Pinches smaller than this value will be ignored

#### Parameters

• **pValue**: `number`

#### Source

[src/input/TouchManager.ts:138](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/TouchManager.ts#L138)

***

### swipeThreshhold

> `set` **swipeThreshhold**(`pValue`): `void`

Sets the minimum magnitude of a swipe. Swipes smaller than this value will be ignored

#### Parameters

• **pValue**: `number`

#### Source

[src/input/TouchManager.ts:130](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/TouchManager.ts#L130)

## Methods

### destroy()

> **destroy**(): `void`

destroy

#### Returns

`void`

#### Source

[src/input/TouchManager.ts:154](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/TouchManager.ts#L154)

***

### setCoordinateSystem()

> **setCoordinateSystem**(`pGesture`, `pCoord`): `void`

Sets what type of CoordinateSystem to use when determining positions for the specified Gesture

#### Parameters

• **pGesture**: [`GestureType`](/api/enumerations/gesturetype/)

• **pCoord**: [`CoordinateSystem`](/api/enumerations/coordinatesystem/)

#### Returns

`void`

#### Source

[src/input/TouchManager.ts:147](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/TouchManager.ts#L147)
