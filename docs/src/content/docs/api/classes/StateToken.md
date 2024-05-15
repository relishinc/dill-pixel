---
editUrl: false
next: false
prev: false
title: "StateToken"
---

State token

## Constructors

### new StateToken()

> **new StateToken**(`idOrData`, `loadScreen`?, ...`transitionSteps`?): [`StateToken`](/api/classes/statetoken/)

#### Parameters

• **idOrData**: `string` \| `object`

• **loadScreen?**: `string`

• ...**transitionSteps?**: [`TransitionStep`](/api/enumerations/transitionstep/)[]

#### Returns

[`StateToken`](/api/classes/statetoken/)

#### Source

[src/state/StateToken.ts:22](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/StateToken.ts#L22)

## Properties

### data

> `readonly` **data**: `any`

#### Source

[src/state/StateToken.ts:20](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/StateToken.ts#L20)

***

### loadScreen

> `readonly` **loadScreen**: `undefined` \| `string`

The load screen to use to transition to this state. Only needed for transitions involving a load screen.

#### Source

[src/state/StateToken.ts:14](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/StateToken.ts#L14)

***

### stateId

> `readonly` **stateId**: `string`

The id of the state.

#### Source

[src/state/StateToken.ts:10](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/StateToken.ts#L10)

***

### transitionSteps

> `readonly` **transitionSteps**: [`TransitionStep`](/api/enumerations/transitionstep/)[]

The list of transition steps to perform.

#### Source

[src/state/StateToken.ts:18](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/StateToken.ts#L18)
